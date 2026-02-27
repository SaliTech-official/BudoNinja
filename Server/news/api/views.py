from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .serializers import GetNewsSerializer
from news.models import News


class GetNewsView(ListAPIView):
    """returns list of newses (only publics)."""
    serializer_class = GetNewsSerializer

    def get_queryset(self):
        category = self.request.query_params.get("search")
        if category:
            return News.objects.filter(category__name=category, is_public=True)
        return News.objects.filter(is_public=True)