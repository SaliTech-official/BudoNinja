from rest_framework import serializers


class CustomMessageSenderField(serializers.RelatedField):
    def to_representation(self, value):
        return value.phone_number