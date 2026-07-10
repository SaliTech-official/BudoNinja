from rest_framework import serializers


class CustomCityOrProvinceRelationalField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    