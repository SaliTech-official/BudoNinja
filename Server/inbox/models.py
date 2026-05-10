from django.db import models


class Ticket(models.Model):
    full_name = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=11)
    title = models.CharField(max_length=128)
    content = models.TextField()

    def __str__(self):
        return f"{self.full_name} - {self.title}"