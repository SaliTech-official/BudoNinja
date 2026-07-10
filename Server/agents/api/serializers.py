from rest_framework import serializers
from agents.models import Teacher
from agents.custoom_relational_field import CustomCityOrProvinceRelationalField


class GetTeachersSerializer(serializers.ModelSerializer):
    province = CustomCityOrProvinceRelationalField(read_only=True)
    city = CustomCityOrProvinceRelationalField(read_only=True)
    
    class Meta:
        model = Teacher
        fields = "__all__"