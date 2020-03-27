from rest_framework import viewsets
from manageMELA.settings import ADMIN_NAME
from .serializers import *
from ..models import *

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer 
         
    def get_queryset(self):
        return Users.objects.all() 
    
class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer 
         
    def get_queryset(self):
        return Company.objects.all() 

class AidViewSet(viewsets.ModelViewSet):
    serializer_class = AidSerializer 
         
    def get_queryset(self):
        return Aid.objects.all() 

class EmployerViewSet(viewsets.ModelViewSet):
    serializer_class = EmployerSerializer 
         
    def get_queryset(self):
        return Employer.objects.all() 
    
class EmployerCompanyViewSet(viewsets.ModelViewSet):
    serializer_class = EmployerCompanySerializer 
         
    def get_queryset(self):
        return Employer_company.objects.all() 
    
class StorageViewSet(viewsets.ModelViewSet):
    serializer_class = StorageSerializer 
         
    def get_queryset(self):
        return Storage.objects.all() 

class CompanyAidsViewSet(viewsets.ModelViewSet):
    serializer_class = CompanyAidsSerializer
         
    def get_queryset(self):
        return company_aids.objects.all() 
    
