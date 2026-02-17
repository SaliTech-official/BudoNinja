from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer, OTPInputSerializer, UserLoginSerializer
from django.contrib.auth import get_user_model, authenticate
from accounts.models import OTP
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

User = get_user_model()


class UserRegisterView(APIView):
    """create uer without verifying it and send otp to phone number."""
    serializer_class = UserRegisterSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        if ser_data.is_valid(raise_exception=True):
            user_phone = ser_data.validated_data['phone_number']
            user = User.objects.filter(phone_number=user_phone).first()
            if user:
                return Response({"error": "user with phone number is already exists."},
                                status=status.HTTP_409_CONFLICT)
            ser_data.save()
            request.session['user_register_info'] = {'phone': user_phone}
            request.session.modified = True
            request.session.save()
            
            otp = OTP.create_otp(phone_number=user_phone)
            try:
                # send otp code with kavenegar
                otpf = None
            except Exception:
                return Response({'error': "faild to send code."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({'message': "user created and code was sent."},
                            status=status.HTTP_201_CREATED)
        

class UserVerifyView(APIView):
    """after creating user user most verify via this endpoint.
    otp most be in body. field name: code"""
    serializer_class = OTPInputSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        if ser_data.is_valid(raise_exception=True):
            user_session = request.session['user_register_info']
            otp = ser_data.validated_data['code'] 
            user = User.objects.filter(phone_number=user_session['phone']).first()
            if not user:
                return Response({'error': "user with this credential not found."},
                                status=status.HTTP_404_NOT_FOUND)
            if OTP.verify_otp(user_session['phone'], otp):
                user.is_verified = True
                user.save()
                del request.session['user_register_info']
                request.session.modified = True
                hash_code = OTP._hash_otp(otp)
                OTP.objects.filter(hashed_code=hash_code).first().delete()
                return Response({'message': "user verified successfuly."},
                                status=status.HTTP_200_OK)
            
            del request.session['user_register_info']
            request.session.modified = True
            return Response({'error': "invalid OTP code"},
                            status=status.HTTP_400_BAD_REQUEST) 
        

class UserLoginView(APIView):
    """login users to their account."""
    serializer_class = UserLoginSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        if ser_data.is_valid(raise_exception=True):
            user_phone = ser_data.validated_data['phone_number']
            password = ser_data.validated_data['password']

            try:
                user_obj = User.objects.get(phone_number=user_phone)
            except User.DoesNotExist:
                return Response({'message': "user with this phone number not exists."},
                                status=status.HTTP_404_NOT_FOUND)
            print("user found.:", user_obj.phone_number)
            print("user raw pass.:", password)
            print("user pass stored:", user_obj.password)
            print("check pass:", user_obj.check_password(password))
            user = authenticate(phone_number=user_phone, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    'access': str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            return Response({'user credetials are invalid.'},
                            status=status.HTTP_400_BAD_REQUEST)



                

            
