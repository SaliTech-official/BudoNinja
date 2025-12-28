from django.db import models


class Province(models.Model):
    name = models.CharField(max_length=100)


class City(models.Model):
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField(max_length=100)

    