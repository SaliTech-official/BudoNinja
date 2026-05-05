from django.urls import path, include


app_name = "agents"
urlpatterns = [
    path('', include('agents.api.urls'))
]