from rest_framework import routers
from .views import emergencyViewset
router = routers.DefaultRouter()
router.register(r'v1', emergencyViewset)
urlpatterns = router.urls