from rest_framework import serializers
from .models import emergencyModal


class emergencySerializer(serializers.ModelSerializer):
    class Meta:
      model = emergencyModal
      fields="__all__"