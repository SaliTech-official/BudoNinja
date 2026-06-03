from rest_framework import serializers


class CustomCategoryField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name