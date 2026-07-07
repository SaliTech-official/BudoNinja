from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .serializers import GetNewsSerializer, CategoriesSerializer
from news.models import News, Category
from news.pagination import SmallPagePagination
from rest_framework import status


class GetNewsView(ListAPIView):
    """returns list of newses (only publics)."""
    serializer_class = GetNewsSerializer
    pagination_class = SmallPagePagination

    def get_queryset(self):
        category = self.request.query_params.get("search")
        if category:
            return News.objects.filter(category__name=category, is_public=True)
        return News.objects.filter(is_public=True)
    

class GetNewsDetailView(APIView):
    """returns news detail(information)."""
    serializer_class = GetNewsSerializer

    def get(self, request, news_id):
        try:
            news_instance = News.objects.get(id=news_id)
        except News.DoesNotExist:
            return Response({'error': "news with this id not exists."},
                            status=status.HTTP_404_NOT_FOUND)
        ser_data = self.serializer_class(instance=news_instance)
        return Response({'data': ser_data.data},
                        status=status.HTTP_200_OK)


class GetCategoriesView(ListAPIView):
    """returns list of all categories"""
    serializer_class = CategoriesSerializer
    queryset = Category.objects.all()