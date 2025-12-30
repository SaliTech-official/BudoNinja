from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import ProvinceSerializer, CitySrializer
from data.models import Province, City


class GetProvincesView(ListAPIView):
    """endpoint for getting all cities."""

    serializer_class = ProvinceSerializer
    queryset = Province.objects.all()


class GetCitiesView(ListAPIView):
    """endpoint for getting cities from a province
    province comes from query params in url.
    """

    serializer_class = CitySrializer

    def get_queryset(self):
        province = self.request.query_params.get("province")
        return City.objects.filter(province__name=province)