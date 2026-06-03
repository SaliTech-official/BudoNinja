from rest_framework import serializers


class CustomProvinceRelationalField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    