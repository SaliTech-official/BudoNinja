from django.db import models
from agents.models import Teacher
from django_jalali.db import models as jmodels


class Category(models.Model):
    name = models.CharField(max_length=68)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

class Course(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='courses', null=True, blank=True)
    title = models.CharField(max_length=128)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="courses")
    duration = models.DurationField()
    capasity = models.SmallIntegerField(default=0)
    price = models.DecimalField(max_digits=13, decimal_places=0)
    participants = models.SmallIntegerField(default=0)


    created_at = jmodels.jDateTimeField(auto_now_add=True)
    updated_at = jmodels.jDateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"