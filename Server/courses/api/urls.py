from django.urls import path
from . import views


urlpatterns = [
    path('get_categories/', views.GetCategoriesView.as_view()),
    path('get_courses/', views.GetCoursesView.as_view()),
    path('get_course_detail/<int:id>/', views.GetCoursDetailView.as_view()),
]