from django.urls import path
from . import views


urlpatterns = [
    path("user_register/", views.UserRegisterView.as_view()),
    path("user_verify/", views.UserVerifyView.as_view()),
    path("user_login/", views.UserLoginView.as_view()),
    path("user_logout/", views.UserLogoutView.as_view()),
    path("user_change_password/", views.UserChangePasswordView.as_view()),
    path("user_profile/", views.UserProfileView.as_view()),
    path("user_reset_password/", views.UserResetPasswordView.as_view()),
    path("user_reset_password_confirm/", views.UserResetPasswordConfirmView.as_view()),
    path("user_set_new_password/", views.UserSetNewPasswordView.as_view()),

]