from rest_framework import serializers
from chalenge.models import Chalenge


class GetChalengeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chalenge
        fields = "__all__"
