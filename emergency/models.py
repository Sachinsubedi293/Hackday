from django.db import models

# Create your models here.
class emergencyModal(models.Model):
    lat = models.FloatField(blank=True)
    lon=models.FloatField(blank=True)
    solved=models.BooleanField(default=False)
    created=models.DateTimeField(auto_now=True)