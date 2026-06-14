from rest_framework.generics import ListAPIView
from .serializers import BeltSerializer
from rest_framework.permissions import IsAuthenticated
from certificates.models import Belt
from agents.api.serializers import GetTeachersSerializer
from agents.models import Teacher


class GetBeltsView(ListAPIView):
    """returns list of all the belts user can pick"""
    serializer_class = BeltSerializer
    queryset = Belt.objects.all()


class GetTeachersView(ListAPIView):
    """returns list of all teachers."""
    serializer_class = GetTeachersSerializer
    queryset = Teacher.objects.all()