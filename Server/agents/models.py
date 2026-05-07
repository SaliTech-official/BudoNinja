from django.db import models
from data.models import Province


class Teacher(models.Model):
    ROLE_CHOICES = (
        ('senior', 'Senior'),
        ('normal', 'Normal')
    )

    full_name = models.CharField(max_length=258)
    level = models.CharField(max_length=258)
    branch = models.CharField(max_length=128)
    role = models.CharField(max_length=68, choices=ROLE_CHOICES, default='normal')
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True, blank=True, related_name='Teachers')
