from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import (CreateConversationSerializer, ConversationSerializer,
                          ConversationListSerializer, CreateMessageSerializer)
from chat.models import Conversation, ConversationParticipant


User = get_user_model()


class CreateConversationView(GenericAPIView):
    """endpoint for createing a conversation between two users if it not exists before.
    if it is returns the conversation else create one."""
    serializer_class = CreateConversationSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        ser_data = self.get_serializer(data=request.data)
        ser_data.is_valid(raise_exception=True)

        target_user = User.objects.get(id=ser_data.validated_data['user_id'])
        courrent_user = request.user

        if target_user == courrent_user:
            return Response({'detail': "you cannot chat with yourself."},
                            status=status.HTTP_400_BAD_REQUEST)
        
        conversations = Conversation.objects.filter(
            participants__user=courrent_user
        ).filter(participants__user=target_user).distinct()

        if conversations.exists():
            conversation = conversations.first()

            return Response(ConversationSerializer(instance=conversation).data,
                            status=status.HTTP_200_OK)
        
        conversation = Conversation.objects.create()
        ConversationParticipant.objects.bulk_create([
            ConversationParticipant(conversation=conversation, user=courrent_user),
            ConversationParticipant(conversation=conversation, user=target_user)
        ])

        return Response(ConversationSerializer(conversation).data,
                        status=status.HTTP_201_CREATED)
    

class ConversationListView(ListAPIView):
    """returns list of user chats. jwt required."""
    serializer_class = ConversationListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(
            participants__user=self.request.user
        ).prefetch_related(
            "participants__user"
        ).order_by("-updated_at")
    

class CreateMessageView(CreateAPIView):
    """endpoint for createing message for conversation that user have."""
    serializer_class = CreateMessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        conversation = serializer.validated_data['conversation']

        is_participant = ConversationParticipant.objects.filter(conversation=conversation,
                                                     user=self.request.user).exists()
        if not is_participant:
            raise PermissionError("you are not participant of this conversation.")
        
        message = serializer.save(sender=self.request.user)
        conversation.last_message = message
        conversation.save(update_fields=['last_message', 'updated_at'])