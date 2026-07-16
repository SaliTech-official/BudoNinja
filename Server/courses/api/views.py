from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import status
from .serializers import CourseSerializer
from courses.models import Course


class GetCoursesView(ListAPIView):
    """returns list of courses filter by category.
    category: query_params"""
    serializer_class = CourseSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        queryset = Course.objects.select_related('teacher', 'category')

        if category:
            queryset = queryset.filter(category__name=category)

        return queryset
    

class GetCoursDetailView(RetrieveAPIView):
    """returns course all informations via course id"""
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_url_kwarg = "id"
 