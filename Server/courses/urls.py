from django.urls import path, include


app_name = "courses"
urlpatterns = [
    path('', include('courses.api.urls'))
]