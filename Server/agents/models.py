from django.db import models
from data.models import Province, City


class Teacher(models.Model):
    ROLE_CHOICES = (
        ('senior', 'Senior'),
        ('normal', 'Normal')
    )

    phone_number = models.CharField(max_length=11)
    image = models.ImageField(upload_to="agents_avatar")
    full_name = models.CharField(max_length=258)
    level = models.CharField(max_length=258)
    branch = models.CharField(max_length=128)
    role = models.CharField(max_length=68, choices=ROLE_CHOICES, default='normal')
    province = models.ForeignKey(Province, on_delete=models.SET_NULL, null=True, blank=True, related_name='Teachers')
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, related_name='Teachers')

    def __str__(self):
        return f"{self.full_name}"
