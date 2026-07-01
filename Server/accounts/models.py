from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from data.models import Province, City
from django_jalali.db import models as jmodels
from .managers import UserManager
from django.utils.timezone import now
from django.utils.text import slugify
from datetime import timedelta
import os
import hashlib
import string
import secrets
import uuid



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
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    
    # living
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")

    # date
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ['full_name']

    @property
    def is_staff(self):
        return self.is_admin
    

def user_profile_path(instance, file_name):
    user_name = f"{instance.user.full_name}-{instance.user.phone_number}"
    ext = os.path.splitext(file_name)[1]
    unique_name = f"{uuid.uuid4().hex}{ext}"

    return os.path.join("profile_images", user_name, unique_name)


class Profile(models.Model):
    EDUCATION_CHOICES = (
        ("diploma", "دیپلم"),
        ("associate", "کاردانی"),
        ("bachelor", "کارشناسی"),
        ("master", "کارشناسی ارشد"),
        ("phd", "دکتری"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    email = models.EmailField(null=True, blank=True)
    father_name = models.CharField(max_length=64, null=True, blank=True)
    level = models.CharField(max_length=128, null=True, blank=True, default="")
    is_maried = models.BooleanField(default=False)

    education = models.CharField(max_length=20, choices=EDUCATION_CHOICES, null=True, blank=True)
    job = models.CharField(max_length=258, null=True, blank=True)

    birth_certificate_serial = models.CharField(max_length=6, null=True, blank=True)
    issue_place = models.CharField(max_length=128, null=True, blank=True)

    landline_phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    personal_photo = models.ImageField(upload_to=user_profile_path, null=True, blank=True)
    id_card_image = models.ImageField(upload_to=user_profile_path, null=True, blank=True)
    birth_certificate_image = models.ImageField(upload_to=user_profile_path, null=True, blank=True)
    sport_insurance_image = models.ImageField(upload_to=user_profile_path, null=True, blank=True)

    technical_workshops = models.PositiveSmallIntegerField(default=0)
    jurisprudence = models.PositiveSmallIntegerField(default=0)
    chalenge_participated = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return self.user.full_name
    

class OTP(models.Model):
    phone_number = models.CharField(max_length=11)
    hashed_code = models.CharField(max_length=64)
    used = models.BooleanField(default=False)
    attempts = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"{self.phone_number} - used={self.used}"
    
    @staticmethod
    def _hash_otp(otp):
        return hashlib.sha256(otp.encode()).hexdigest()
    
    @classmethod
    def create_otp(cls, phone_number, length=6):
        digits = string.digits
        otp_code = ''.join(secrets.choice(digits) for _ in range(length))
        # THIS IS JUST FOR NOW UNTIL SMS PANEL CONNECT.............
        print(f"{'*'*20}otp code{'*'*20}")
        print(otp_code)
        print("*"*90)
        # .........................................................
        expiry_time = now() + timedelta(minutes=3)
        otp_hash = cls._hash_otp(otp_code)

        cls.objects.create(phone_number=phone_number, hashed_code=otp_hash, expires_at=expiry_time)
        return otp_code
    
    @classmethod
    def verify_otp(cls, phone_number, code, max_attempts=5):
        otp_instance = cls.objects.filter(phone_number=phone_number, used=False, expires_at__gte=now()).order_by('-created_at').first()
        if not otp_instance:
            return False
        
        if otp_instance.attempts >= max_attempts:
            return False
        
        if otp_instance.hashed_code == cls._hash_otp(code):
            otp_instance.used = True
            otp_instance.save()
            return True
        
        otp_instance.attempts += 1
        otp_instance.save()
        return False
    

class Membership(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE, related_name="membership")
    public_id = models.UUIDField(default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)

    # date
    created_at = jmodels.jDateTimeField(auto_now_add=True)
    deadline = jmodels.jDateField()