from rest_framework.generics import ListAPIView
from .serializers import BeltSerializer
from rest_framework.permissions import IsAuthenticated
from certificates.models import Belt


class GetBeltsView(ListAPIView):
    """returns list of all the belts user can pick"""
    serializer_class = BeltSerializer
    permission_classes = [IsAuthenticated]
    queryset = Belt.objects.all()