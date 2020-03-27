from rest_framework.routers import DefaultRouter 
from .views import *
from django.urls import include, path

from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')

urlpatterns = router.urls 