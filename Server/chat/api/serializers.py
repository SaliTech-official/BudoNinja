from rest_framework import serializers
from django.contrib.auth import get_user_model
from chat.models import Conversation, Message
from accounts.api.serializers import UserSerializer
from chat.custom_relational_fields import CustomMessageSenderField


User = get_user_model()


class ConversationSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ('id', 'participants', 'created_at', 'updated_at')

    def get_participants(self, obj):
        users = User.objects.filter(conversations__conversation=obj)
        return UserSerializer(instance=users, many=True).data
    

class ConversationListSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d")
    updated_at = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Conversation
        fields = ('id', 'participants', 'created_at', 'updated_at', 'last_message')

    def get_participants(self, obj):
        users = User.objects.filter(conversations__conversation=obj)
        return UserSerializer(instance=users, many=True).data


class CreateConversationSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                "user not found."
            )
        return value
    

class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('conversation', 'text', 'file')

    def validate(self, attrs):
        if not attrs.get('text') and not attrs.get('file'):
            raise serializers.ValidationError("message or file is required.")
        return attrs
    

class ForwardMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'text', 'sender')


class MessageSerializer(serializers.ModelSerializer):
    sender = CustomMessageSenderField(read_only=True)
    created_at = serializers.DateTimeField(format='%H:%M')
    forwarded_from = ForwardMessageSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'sender', 'text', 'file', 'created_at', 'is_forwarded', 'forwarded_from')


class CreateForwardMessageSerializer(serializers.Serializer):
    message_id = serializers.IntegerField()
    conversation_id = serializers.IntegerField()