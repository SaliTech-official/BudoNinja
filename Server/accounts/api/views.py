from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer, OTPInputSerializer
from django.contrib.auth import get_user_model
from accounts.models import OTP

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
            
