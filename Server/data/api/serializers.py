from rest_framework import serializers
from data.models import City, Province


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ("name",)

class CitySrializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ("name",)
