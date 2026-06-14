from django.urls import path
from . import views


urlpatterns = [
    path('get_belts/', views.GetBeltsView.as_view()),
    path('get_teachers/', views.GetBeltsView.as_view()),
]