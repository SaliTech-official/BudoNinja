from django.db import models
from django.contrib.auth import get_user_model
from django_jalali.db import models as jmodels


User = get_user_model()


class WeightCategory(models.Model):
    title = models.CharField(max_length=50)

    min_weight = models.DecimalField(max_digits=5, decimal_places=2)
    max_weight = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.title} - {self.min_weight}/{self.max_weight}"

class AgeGroup(models.Model):
    title = models.CharField(max_length=68)
    min_age = models.PositiveSmallIntegerField()
    max_age = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.title} - {self.min_age}/{self.max_age}"
    

class Chalenge(models.Model):
    TYPE_CHOICES = (
        ('solo', 'انفرادی'),
        ('team', 'تیمی'),
    )

    GENDER_CHOICES = (
        ('male', 'اقایان'),
        ('female', 'بانوان'),
    )

    LEVEL_CHOICES = (
        ('country', 'کشوری'),
        ('provincial', 'استانی'),
        ('regional', 'منطقه ای')
    )

    

    title = models.CharField(max_length=128)
    explain = models.TextField()
    place = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=13, decimal_places=0, null=True, blank=True)
    image = models.ImageField(upload_to="chalenges/", null=True, blank=True)
    chalenge_type = models.CharField(choices=TYPE_CHOICES, default='solo')
    gender = models.CharField(choices=GENDER_CHOICES)
    level = models.CharField(choices=LEVEL_CHOICES)
    age_groups = models.ManyToManyField(AgeGroup)
    weight_categories = models.ManyToManyField(WeightCategory, blank=True, null=True)

    is_open = models.BooleanField(default=True)

    date = jmodels.jDateField()
    deadline = jmodels.jDateField()

    def __str__(self):
        return f"{self.title} - {self.place}"
    

class ChallengeRegistration(models.Model):
    STATUS_CHOICES = (
        ("pending", "در انتظار تایید"),
        ("accepted", "تایید شده"),
        ("rejected", "رد شده"),
        ("cancelled", "لغو شده"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chalenges")
    chalenge = models.ForeignKey(Chalenge, on_delete=models.CASCADE, related_name="users")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = jmodels.jDateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "chalenge"],
                name="unique_user_challenge"
            )
        ]