from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import TicketSerializer
from inbox.models import Ticket


class CreateTicketView(APIView):
    """create a ticket via given data"""
    serializer_class = TicketSerializer

    def post(self, request):
        ser_data = self.serializer_class(data=request.data)
        ser_data.is_valid(raise_exception=True)
        ser_data.save()
        return Response({
            'message': "ticket created successfully.",
            'data': ser_data.data,
        },status=status.HTTP_201_CREATED)