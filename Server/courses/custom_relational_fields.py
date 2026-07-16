from rest_framework import serializers


class CustomTeacherRelationalField(serializers.RelatedField):
    def to_representation(self, value):
        return value.full_name


class CustomCategoryRelationalField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    

class CustomAgeGroupRelationalField(serializers.RelatedField):
    def to_representation(self, value):
        return value.title