from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'national_code', 'phone_number',
                  'password', 'birthday', 'gender', 'province', 'city')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create(**validated_data)


class OTPInputSerializer(serializers.Serializer):
    code = serializers.CharField()