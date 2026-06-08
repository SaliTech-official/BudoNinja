from django.db import models
from django_jalali.db import models as jmodels
from django.contrib.auth import get_user_model


User = get_user_model()


class Conversation(models.Model):
    created_at = jmodels.jDateTimeField(auto_now_add=True)
    updated_at = jmodels.jDateTimeField(auto_now=True)

    last_message = models.ForeignKey('message', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')

    def __str__(self):
        return f"Conversation - {self.id}"
    

class ConversationParticipant(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="participants")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="conversations")

    joined_at = jmodels.jDateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('conversation', 'user')

    def __str__(self):
        return f"{self.user.full_name} - in {self.conversation.id}"
    

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    is_deleted = models.BooleanField(default=False)

    text = models.TextField(null=True, blank=True)
    file = models.FileField(null=True, blank=True, upload_to='chat/fiels')

    is_forwarded = models.BooleanField(default=False)
    forwarded_from = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='forwarded_messages')

    created_at = jmodels.jDateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ('created_at',)
        indexes = [
            models.Index(fields=['conversation', 'created_at'])
        ]
    
    def __str__(self):
        return f"message {self.id} for {self.sender.full_name}"