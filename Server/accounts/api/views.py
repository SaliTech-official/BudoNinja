from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (UserRegisterSerializer, OTPInputSerializer,
                          UserLoginSerializer, UserChangePasswordSerializer,
                          UserProfileSerializer, UserResetPasswordInputSerializer,
                          UserResetPasswordConfirmSerializer, UserSetNewPasswordSerializer,
                          UserProfileUpdateSerializer)
from django.contrib.auth import get_user_model, authenticate
from accounts.models import OTP, Profile
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404

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
            user = authenticate(phone_number=user_phone, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    'access': str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            return Response({'user credetials are invalid.'},
                            status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    """log out user. put token in blacklist."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({'detail': "no refresh token provided."},
                                status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            res = Response({'detail': "user loged out successfuly."},
                           status=status.HTTP_200_OK)
            return res
        except Exception as e:
            return Response({'detail': "invalid token or already loged out(token in blacklist)"},
                            status=status.HTTP_400_BAD_REQUEST)
        

class UserChangePasswordView(APIView):
    """changes user password.
    user most login again after doing that."""
    permission_classes = [IsAuthenticated]
    serializer_class = UserChangePasswordSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data,
                                         context={'request': request})
        ser_data.is_valid(raise_exception=True)
        user = request.user
        user.set_password(ser_data.validated_data['new_password'])
        user.save()

        user_tokens = OutstandingToken.objects.filter(user=user)
        try:
            for token in user_tokens:
                BlacklistedToken.objects.get_or_create(token)
        except:
            return Response({'error': "error in puting user old token in blacklist."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': "user password changed successfuly."},
                        status=status.HTTP_200_OK)
    

class UserProfileView(RetrieveUpdateAPIView):
    """give and update user profile."""
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.select_related("user")
    
    def get_object(self):
        return get_object_or_404(self.get_queryset(), user=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserProfileUpdateSerializer
        return UserProfileSerializer        
    

class UserResetPasswordView(APIView):
    """set new password instead old one
    user need to verify with OTP sms"""
    serializer_class = UserResetPasswordInputSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        if ser_data.is_valid(raise_exception=True):
            user_phone = ser_data.validated_data['phone_number']
            otp = OTP.create_otp(user_phone)
            request.session['user_reset_pass_info'] = {
                "phone_number": user_phone
            }
            request.session.modified = True
            print(request.session['user_reset_pass_info'])

            # send otp code via sms
            return Response({"message": "otp code sent."},
                            status=status.HTTP_200_OK)
    

class UserResetPasswordConfirmView(APIView):
    """confirm user with otp code that created in UserResetPasswordView.
    and aloow user to set new password"""
    serializer_class = UserResetPasswordConfirmSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        if ser_data.is_valid(raise_exception=True):
            user_sessin = request.session['user_reset_pass_info']
            user_code = ser_data.validated_data['code']
            user_phone = user_sessin['phone_number']
            if OTP.verify_otp(user_phone, user_code):
                user_sessin['can_reset'] = True
                request.session.modified = True
                return Response({'message': "otp accepted. user can reset password."},
                                status=status.HTTP_200_OK)
            return Response({'error': "otp was inccorect. try again"},
                            status=status.HTTP_400_BAD_REQUEST)
        

class UserSetNewPasswordView(APIView):
    """user set new password instead of old password if  verified"""
    serializer_class = UserSetNewPasswordSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        if ser_data.is_valid(raise_exception=True):
            user_session = request.session['user_reset_pass_info']
            if 'can_reset' in user_session and user_session['can_reset'] == True:
                user_instance = User.objects.filter(phone_number=user_session['phone_number']).first()
                user_instance.set_password(ser_data.validated_data['confirm_password'])
                user_instance.save()
                del user_session
                request.session.modified = True
                return Response({'message': "user password changed successfuly."},
                                status=status.HTTP_200_OK)
            return Response({'error': "user not verified for reset password."},
                            status=status.HTTP_403_FORBIDDEN)