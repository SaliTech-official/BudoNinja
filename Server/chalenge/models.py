from django.db import models


class Chalenge(models.Model):
    TYPE_CHOICES = (
        ('solo', 'انفرادی'),
        ('team', 'تیمی'),
    )

    GENDER_CHOICES = (
        ('male', 'اقایان'),
        ('female', 'بانوان'),
        ('ob', 'کونی'),
    )

    title = models.CharField(max_length=128)
    explain = models.TextField()
    place = models.CharField(max_length=128)
    chalenge_type = models.CharField(choices=TYPE_CHOICES, default='solo')
    gender = models.CharField(choices=GENDER_CHOICES)

    is_open = models.BooleanField(default=True)

    date = models.DateField()
    deadline = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.place}"