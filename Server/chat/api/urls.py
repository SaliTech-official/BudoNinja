from django.urls import path
from . import views


urlpatterns = [
    path('create_conversation/', views.CreateConversationView.as_view()),

]