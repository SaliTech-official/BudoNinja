from rest_framework import serializers


class CustomTeacherRelationalField(serializers.RelatedField):
    def to_representation(self, value):
        return value.full_name