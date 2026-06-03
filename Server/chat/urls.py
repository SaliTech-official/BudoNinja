from django.urls import path, include


app_name = "chat"
urlpatterns = [
    path('', include('chat.api.urls'))
]