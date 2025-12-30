from django.urls import path
from . import views


urlpatterns = [
    path('get_provinces/', views.GetProvincesView.as_view()),
    path('get_cities/', views.GetCitiesView.as_view()),
]