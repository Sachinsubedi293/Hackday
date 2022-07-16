from django.shortcuts import render
from rest_framework import viewsets
from .serializers import emergencySerializer
from .models import emergencyModal
# Create your views here.

class emergencyViewset(viewsets.ViewSet):
    queryset = emergencyModal.objects.all()
    serializer_class = emergencySerializer