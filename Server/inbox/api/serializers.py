from rest_framework import serializers
from inbox.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('full_name', 'title', 'phone_number', 'content')