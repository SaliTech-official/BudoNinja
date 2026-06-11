from django.urls import path, include


app_name = "certificates"
urlpatterns = [
    path('', include('certificates.api.urls'))
]