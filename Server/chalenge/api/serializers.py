from rest_framework import serializers
from chalenge.models import Chalenge, ChallengeRegistration


class GetChalengeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chalenge
        fields = "__all__"


class UserChallengesSerializer(serializers.ModelSerializer):
    chalenge = GetChalengeSerializer()
    created_at = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = ChallengeRegistration
        fields = "__all__"
