from django.db import models
from django_jalali.db import models as jmodels
from django.utils import timezone


class Ticket(models.Model):
    STATUS_CHOICE = (
        ('open', 'Open'),
        ('closed', 'Closed'),
    )

    full_name = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=11)
    title = models.CharField(max_length=128)
    content = models.TextField()

    status = models.CharField(max_length=68, choices=STATUS_CHOICE, default='open')

    created_at = jmodels.jDateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.title}"