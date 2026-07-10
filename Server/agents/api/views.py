from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .serializers import GetTeachersSerializer
from rest_framework.exceptions import ValidationError
from agents.models import Teacher
from rest_framework import status


class GetProvinceTeachersView(ListAPIView):
    """returns list of teachers for the given province
    province most be in url query params"""
    serializer_class = GetTeachersSerializer

    def get_queryset(self):
        queryset = Teacher.objects.all()

        province = self.request.query_params.get("province")
        is_senior = self.request.query_params.get("senior")

        if province:
            queryset = queryset.filter(province_id=province)

        if is_senior is not None:
            is_senior = is_senior.lower() == "true"
            queryset = queryset.filter(is_senior=is_senior)
    
        return queryset
    