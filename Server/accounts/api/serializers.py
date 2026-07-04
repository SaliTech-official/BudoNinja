from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import Profile, Membership


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'full_name')

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'national_code', 'phone_number',
                  'password', 'birthday', 'gender', 'province', 'city')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_national_code(self, value):
        if User.objects.filter(national_code=value).exists():
            raise serializers.ValidationError("user with this national code already exists.")
        return value
    
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


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = (
            "id",
            "user",
            "created_at",
            "updated_at",
        )


class UserDashbordSerializer(serializers.ModelSerializer):
    technical_workshops = serializers.SerializerMethodField()
    jurisprudence = serializers.SerializerMethodField()
    chalenge_participated = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('technical_workshops', 'jurisprudence', 'chalenge_participated')

    def get_technical_workshops(self, obj):
        return obj.technical_workshops

    def get_jurisprudence(self, obj):
        return obj.jurisprudence

    def get_chalenge_participated(self, obj):
        return obj.chalenge_participated
    

class GetMemberShipInfoSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    national_code = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()
    class Meta:
        model = Membership
        fields = ('full_name', 'national_code', 'level', 'public_id', 'deadline', 'is_active')

    def get_full_name(self, obj):
        return obj.user.full_name
    
    def get_level(self, obj):
        return obj.user.profile.level
    
    def get_national_code(self, obj):
        return obj.user.national_code


class UserResetPasswordInputSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11)


class UserResetPasswordConfirmSerializer(serializers.Serializer):
    code = serializers.CharField()


class UserSetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("password most match together.")
        return attrs