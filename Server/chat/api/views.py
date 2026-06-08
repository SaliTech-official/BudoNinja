from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from chat.permissions import IsConversationParticipant
from django.contrib.auth import get_user_model
from .serializers import (CreateConversationSerializer, ConversationSerializer,
                          ConversationListSerializer, CreateMessageSerializer,
                          MessageSerializer, CreateForwardMessageSerializer)
from chat.models import (Conversation, ConversationParticipant,
                         Message)
from django.shortcuts import get_object_or_404


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


class ForwardMessageView(GenericAPIView):
    """forward message from one conversation to another."""
    serializer_class = CreateForwardMessageSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        ser_data = self.get_serializer(data=request.data)
        ser_data.is_valid(raise_exception=True)

        message = Message.objects.get(id=ser_data.validated_data['message_id'])
        target_conversation = Conversation.objects.get(id=ser_data.validated_data['conversation_id'])

        is_participant = ConversationParticipant.objects.filter(
            conversation__id=target_conversation.id,
            user=request.user
        ).exists()

        if not is_participant:
            raise self.permission_denied()
        
        forwarded_message = Message.objects.create(
            conversation=target_conversation,
            sender=request.user,
            text=message.text,
            file=message.file,
            forwarded_from=message
        )
        forwarded_message.is_forwarded = True
        forwarded_message.save(update_fields=['is_forwarded'])


        target_conversation.last_message = forwarded_message
        target_conversation.save(update_fields=['last_message'])

        return Response({'id': forwarded_message.id},
                        status=status.HTTP_200_OK)


class ConversationMessgesView(ListAPIView):
    """return all messages from conversation."""
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        conversation = self.request.query_params.get('conversation')
        return Message.objects.filter(conversation=conversation, is_deleted=False,
                                      conversation__participants__user=self.request.user).select_related('sender', 'forwarded_from')
    

class DeleteConversationView(APIView):
    """delete conversation via id.
    id most be in path parameters."""
    permission_classes = [IsAuthenticated, IsConversationParticipant]

    def delete(self, request, conversation_id):
        conversation = get_object_or_404(Conversation, id=conversation_id)
        self.check_object_permissions(request, conversation)
        conversation.delete()
        return Response({'detail': "conversation deleted successfully."},
                        status=status.HTTP_204_NO_CONTENT)