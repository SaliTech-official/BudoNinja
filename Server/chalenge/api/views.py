from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import GetChalengeSerializer
from chalenge.models import Chalenge
from chalenge.pagination import ChalengeSmallPagePagination


class GetChalengeView(ListAPIView):
    """returns list of chalenges
    open chalenge only or all the chalenges
    open_only=yes most be in query params for showing open chalenges"""
    serializer_class = GetChalengeSerializer
    pagination_class = ChalengeSmallPagePagination

    def get_queryset(self):
        open_only = self.request.query_params.get('open_only')

        if open_only and open_only == "yes":
            return Chalenge.objects.filter(is_open=True)
        
        return Chalenge.objects.all()
    

class GetChalengeDetailView(APIView):
    """returns one chalenge details(all the fields) via chalenge id
    id most be in url params"""
    serializer_class = GetChalengeSerializer

    def get(self, request, chalenge_id):
        chalenge_instance = get_object_or_404(Chalenge, id=chalenge_id)
        ser_data = self.serializer_class(instance=chalenge_instance)
        return Response(ser_data.data,
                        status=status.HTTP_200_OK)