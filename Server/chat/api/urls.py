from django.urls import path
from . import views


urlpatterns = [
    path('create_conversation/', views.CreateConversationView.as_view()),
    path('conversation_list/', views.ConversationListView.as_view()),
    path('create_message/', views.CreateMessageView.as_view()),
    path('conversation_messages/', views.ConversationMessgesView.as_view()),
]