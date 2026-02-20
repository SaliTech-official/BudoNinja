from django.urls import path
from . import views


urlpatterns = [
    path("user_register/", views.UserRegisterView.as_view()),
    path("user_verify/", views.UserVerifyView.as_view()),
    path("user_login/", views.UserLoginView.as_view()),
    path("user_logout/", views.UserLogoutView.as_view()),
    path("user_change_password/", views.UserChangePasswordView.as_view())
]