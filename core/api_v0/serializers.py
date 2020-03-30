from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

from django.core.files.base import ContentFile

from ..models import *

class CustomRegisterSerializer(RegisterSerializer):
    def save(self, request):
        userName = self.validated_data.get('username', None)
        userPass = self.validated_data.get('password1', None)
        userMail = self.validated_data.get('email', None)
        
        user = Users.objects.create_user(
            username=userName,
            password=userPass,
            email=userMail
        )
        user.save()
        
        return user

class UserSerializer(serializers.ModelSerializer):      
    class Meta:
        model = Users

        fields = '__all__'
        
        extra_kwargs = {
            'password' : {
                'write_only' : True
            }
        }

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class AidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aid
        fields = [
            'title', 'short_title', 'authors', 
            'date_public', 'description', 'language',
            'serial_number', 'cost', 'body', 'type_id',
            'status_id', 'employer_id'
        ]

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class EmployerCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer_company
        fields = '__all__'

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = '__all__'
        
class CompanyAidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = company_aids
        fields = '__all__'
