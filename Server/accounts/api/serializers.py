from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import Profile


User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'national_code', 'phone_number',
                  'password', 'birthday', 'gender', 'province', 'city')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class OTPInputSerializer(serializers.Serializer):
    code = serializers.CharField()


class UserLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11)
    password = serializers.CharField(write_only=True)


class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if user.check_password(value):
            return value
        raise serializers.ValidationError("password is invalid.")
    
    def validate(self, attrs):
        if attrs['new_password'] == attrs['new_password2']:
            return attrs
        raise serializers.ValidationError("new passwords most match together.")
    

class UserProfileSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(source="user.phone_number", read_only=True)
    full_name = serializers.CharField(source="user.full_name", read_only=True)
    birthday = serializers.DateField(source="user.birthday", read_only=True)
    gender = serializers.CharField(source="user.gender", read_only=True)
    national_code = serializers.CharField(source="user.national_code", read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"


