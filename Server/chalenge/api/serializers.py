from rest_framework import serializers
from chalenge.models import Chalenge, ChallengeRegistration, AgeGroup, WeightCategory


class AgeGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgeGroup
        fields = "__all__"


class WeightCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightCategory
        fields = "__all__"


class GetChalengeSerializer(serializers.ModelSerializer):
    weight_categories = WeightCategorySerializer(many=True)
    age_groups = AgeGroupsSerializer(many=True)

    class Meta:
        model = Chalenge
        fields = "__all__"


class UserChallengesSerializer(serializers.ModelSerializer):
    chalenge = GetChalengeSerializer()
    created_at = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = ChallengeRegistration
        fields = "__all__"
