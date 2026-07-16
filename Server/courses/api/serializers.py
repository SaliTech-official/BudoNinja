from rest_framework import serializers
from courses.models import Course, Category
from courses.custom_relational_fields import (CustomTeacherRelationalField,
                                              CustomCategoryRelationalField,
                                              CustomAgeGroupRelationalField)


class CourseSerializer(serializers.ModelSerializer):
    teacher = CustomTeacherRelationalField(read_only=True)
    category = CustomCategoryRelationalField(read_only=True)
    age_group = CustomAgeGroupRelationalField(read_only=True)
    class Meta:
        model = Course
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"