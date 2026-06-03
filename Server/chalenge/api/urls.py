from django.urls import path
from . import views


urlpatterns = [
    path('get_chalenges/', views.GetChalengeView.as_view()),
    path('get_chalenge/<int:chalenge_id>/', views.GetChalengeDetailView.as_view()),
]