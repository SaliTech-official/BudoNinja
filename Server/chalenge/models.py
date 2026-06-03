from django.db import models
from django_jalali.db import models as jmodels


class Chalenge(models.Model):
    TYPE_CHOICES = (
        ('solo', 'انفرادی'),
        ('team', 'تیمی'),
    )

    GENDER_CHOICES = (
        ('male', 'اقایان'),
        ('female', 'بانوان'),
    )

    title = models.CharField(max_length=128)
    explain = models.TextField()
    place = models.CharField(max_length=128)
    chalenge_type = models.CharField(choices=TYPE_CHOICES, default='solo')
    gender = models.CharField(choices=GENDER_CHOICES)

    is_open = models.BooleanField(default=True)

    date = jmodels.jDateField()
    deadline = jmodels.jDateField()

    def __str__(self):
        return f"{self.title} - {self.place}"