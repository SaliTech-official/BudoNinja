from django.db import models



class Belt(models.Model):
    name = models.CharField(max_length=258)

    def __str__(self):
        return f"{self.name}"
    

class BeltCertificate(models.Model):
    pass