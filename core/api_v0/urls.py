from rest_framework.routers import DefaultRouter 
from .views import *
from django.urls import include, path

from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')

router.register(r'type_company',TypeCompanyViewSet, basename='type_company')
router.register(r'company', CompanyViewSet, basename='company')


router.register(r'aid', AidViewSet, basename='aid')
router.register(r'employer', EmployerViewSet, basename='employer')

router.register(r'type_store',TypeStorageViewSet, basename='type_store')
router.register(r'storage', StorageViewSet, basename='storage')

router.register(r'company_aids',CompanyAidsViewSet, basename='company_aids')

router.register(r'type_aids',TypeAidViewSet, basename='type_aids')
router.register(r'status_aids',StatusAidViewSet, basename='status_aids')

urlpatterns = router.urls 