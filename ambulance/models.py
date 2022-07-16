from turtle import title
from django.db import models

# Create your models here.
class ambulanceModal(models.Model):
    lat = models.FloatField(blank=True)
    lon=models.FloatField(blank=True)
    book=models.BooleanField(default=False)
    title=models.CharField(max_length=50,default="Ambulance")
    dis=models.TextField(max_length=100)
    created=models.DateTimeField(auto_now=True)