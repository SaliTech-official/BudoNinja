from rest_framework import serializers
from agents.models import Teacher
from agents.custoom_relational_field import CustomProvinceRelationalField


class GetTeachersSerializer(serializers.ModelSerializer):
    province = CustomProvinceRelationalField(read_only=True)
    
    class Meta:
        model = Teacher
        fields = "__all__"