from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from data.models import Province, City
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = (
        ('male', 'اقا'),
        ('female', 'خانم')
    )
    # personal
    full_name = models.CharField(max_length=356)
    national_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=11, unique=True)
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(choices=GENDER_CHOICES)
    
    # living
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")

    # date
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ['full_name']

    @property
    def is_staff(self):
        return self.is_admin



