from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class CreateConversationSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

    def validate_user_id(self, value):
        if not User.objects.get(id=value).exists():
            raise serializers.ValidationError(
                "user not found."
            )
        return value