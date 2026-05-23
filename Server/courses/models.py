from django.db import models
from agents.models import Teacher


class course(models.Model):
    title = models.CharField(max_length=128)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="courses")
    duration = models.DurationField()
    capasity = models.SmallIntegerField(default=0)