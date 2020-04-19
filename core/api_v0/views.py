from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from manageMELA.settings import ADMIN_NAME
from .serializers import *
from ..models import *

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer 
         
    def get_queryset(self):
        return Users.objects.all() 
    
class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer 
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        creator_sql = self.request.user.username
        employer_id = self.request.GET.get('employer_id', '') 
        if employer_id:
            return Company.objects.filter(id_employer=employer_id)

        return Company.objects.all() 

class AidViewSet(viewsets.ModelViewSet):
    serializer_class = AidSerializer 
         
    def get_queryset(self):
        creator_sql = self.request.user.username
        employer_id = self.request.GET.get('employer_id', '') 
        storage_id  = self.request.GET.get('storage_id', '') 
        
        if employer_id:
            return Aid.objects.filter(employer_id=employer_id)
        if storage_id:
            return Aid.objects.filter(storage_id=storage_id)
        
        return Aid.objects.all() 

class EmployerViewSet(viewsets.ModelViewSet):
    serializer_class = EmployerSerializer 
         
    def get_queryset(self):
        return Employer.objects.all() 

class StorageViewSet(viewsets.ModelViewSet):
    serializer_class = StorageSerializer 
         
    def get_queryset(self):
        return Storage.objects.all() 

class CompanyAidsViewSet(viewsets.ModelViewSet):
    serializer_class = CompanyAidsSerializer
         
    def get_queryset(self):
        return company_aids.objects.all() 
    
class StatusAidViewSet(viewsets.ModelViewSet):
    serializer_class = StatusAidSerializer
    
    def get_queryset(self):
        return status_aid.objects.all() 

class TypeAidViewSet(viewsets.ModelViewSet):
    serializer_class = TypeAidsSerializer
    
    def get_queryset(self):
        return type_aid.objects.all() 

class TypeStorageViewSet(viewsets.ModelViewSet):
    serializer_class = TypeStoragesSerializer
    
    def get_queryset(self):
        return type_storage.objects.all() 
    
class TypeCompanyViewSet(viewsets.ModelViewSet):
    serializer_class = TypeCompanySerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return type_company.objects.all() 