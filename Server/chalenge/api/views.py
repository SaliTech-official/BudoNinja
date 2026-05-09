from rest_framework.generics import ListAPIView
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