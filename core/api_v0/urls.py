from rest_framework.routers import DefaultRouter 
from .views import *
from django.urls import include, path

from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'company', CompanyViewSet, basename='company')
router.register(r'aid', AidViewSet, basename='aid')
router.register(r'employer', EmployerViewSet, basename='employer')
router.register(r'employer_company', EmployerCompanyViewSet, basename='employer_company')
router.register(r'storage', StorageViewSet, basename='storage')
router.register(r'company_aids',CompanyAidsViewSet, basename='company_aids')

urlpatterns = router.urls 