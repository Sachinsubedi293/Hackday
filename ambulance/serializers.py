from pyexpat import model
from attr import fields
from rest_framework import serializers
from .models import ambulanceModal


class AmbulanceSerializer(serializers.ModelSerializer):
    class Meta:
      model = ambulanceModal
      fields="__all__"