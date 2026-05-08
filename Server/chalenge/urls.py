from django.urls import path, include


app_name = "chaleng"
urlpatterns = [
    path('', include('chalenge.api.urls'))
]