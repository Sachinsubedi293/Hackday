from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AmbulanceSerializer
from .models import ambulanceModal
# Create your views here.

class ambulanceViewset(viewsets.ViewSet):
    queryset = ambulanceModal.objects.all()
    serializer_class = AmbulanceSerializer