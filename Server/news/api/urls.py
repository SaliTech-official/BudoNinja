from django.urls import path
from . import views


urlpatterns = [
    path('get_news/', views.GetNewsView.as_view())
]