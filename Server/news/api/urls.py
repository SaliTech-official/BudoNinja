from django.urls import path
from . import views


urlpatterns = [
    path('get_news/', views.GetNewsView.as_view()),
    path('get_categories/', views.GetCategoriesView.as_view()),
    path('get_news_detail/<int:news_id>/', views.GetNewsDetailView.as_view())
]