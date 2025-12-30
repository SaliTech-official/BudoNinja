from django.urls import path, include


app_name = "data"
urlpatterns = [
    path('', include('data.api.urls'))
]