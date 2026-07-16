from django.db import models
from agents.models import Teacher
from chalenge.models import AgeGroup
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
    explain = models.TextField()
    place = models.CharField(max_length=512)
    image = models.ImageField(upload_to="courses/", null=True, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="courses")
    duration = models.DurationField()
    capacity = models.SmallIntegerField(default=0)
    price = models.DecimalField(max_digits=13, decimal_places=0)
    participants = models.SmallIntegerField(default=0)
    age_group = models.ForeignKey(AgeGroup, on_delete=models.SET_NULL, related_name="courses", null=True, blank=True)

    start_date = jmodels.jDateField()
    end_date = jmodels.jDateField()
    deadline = jmodels.jDateField()

    created_at = jmodels.jDateTimeField(auto_now_add=True)
    updated_at = jmodels.jDateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"