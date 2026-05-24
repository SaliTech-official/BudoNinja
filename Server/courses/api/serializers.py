from rest_framework import serializers
from courses.models import Course
from courses.custom_relational_fields import CustomTeacherRelationalField


class GetCoursesSerializer(serializers.ModelSerializer):
    teacher = CustomTeacherRelationalField(read_only=True)
    class Meta:
        model = Course
        fields = "__all__"