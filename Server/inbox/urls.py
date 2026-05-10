from django.urls import path, include


app_name = "inbox"
urlpatterns = [
    path('', include('inbox.api.urls'))
]