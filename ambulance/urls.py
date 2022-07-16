from rest_framework import routers
from .views import ambulanceViewset
router = routers.DefaultRouter()
router.register(r'v1', ambulanceViewset)
urlpatterns = router.urls