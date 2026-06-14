from rest_framework import serializers
from certificates.models import Belt

class BeltSerializer(serializers.ModelSerializer):
    class Meta:
        model = Belt
        fields = '__all__'