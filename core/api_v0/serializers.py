from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

from django.db.models import Q

from django.contrib.sites.models import Site
from django.core.files.base import ContentFile

from ..models import *

class TypeAidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_aid
        fields = '__all__'
        

class TypeStoragesSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_storage
        fields = '__all__'
        
class TypeCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = type_company
        fields = '__all__'


class StatusAidSerializer(serializers.ModelSerializer):
    class Meta:
        model = status_aid
        fields = '__all__'

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
        
        user.first_name = request.data.get('first_name', '')
        user.last_name  = request.data.get('last_name', '')
        user.is_staff   = request.data.get('is_staff', False)
        user.brith_date = request.data.get('brith_date', None)
        user.phone      = request.data.get('phone', None)
        
        user.save()
        
        return user

class CustomRegisterCompanySerializer(RegisterSerializer):
    def save(self): 
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
        
class CompanyAidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = company_aids
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):      
    class Meta:
        model = Users

        fields = '__all__'
        
        extra_kwargs = {
            'password' : {
                'write_only' : True
            }
        }

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = '__all__'
        extra_kwargs = {
            'Identifying_number' : {
                'read_only' : True
            }
        }
        
class AidSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField('getType', read_only=True) 
    employer = serializers.SerializerMethodField('getEmployerInfo', read_only=True) 
    eula     = serializers.FileField(
        use_url=True, allow_empty_file=True, allow_null=True, default=None
    )
    status  = serializers.CharField(source='get_status_id_display', read_only=True)
    device  = serializers.CharField(source='get_type_device_display', read_only=True)
    access  = serializers.CharField(source='get_type_access_display', read_only=True)
    media_r = serializers.CharField(source='get_media_display', read_only=True)
    
    company = serializers.SerializerMethodField(read_only=True)
    storage = serializers.SerializerMethodField(read_only=True)
    
    def get_storage(self, aid):
        if aid.storage_id:
            return {
                'id'   : aid.storage_id.id,
                'name' : aid.storage_id.name,
                'in' : aid.storage_id.identifying_number,
                'ip' : aid.storage_id.ip,
                'type' : aid.storage_id.type_id.name
            }
    
    def get_company(self, aid):
        for company in company_aids.objects.filter(aids_id=aid):
            dict_info = company.get_info_company()
            return {
                **dict_info, 
                **{ 'date_create_rq' : company.date_appeal}
            }
        
    def getType(self, obj):
        if obj.type_id:
            return { 
                'id'   : obj.type_id.id,
                'name' : obj.type_id.name,
                'description' : obj.type_id.description
            }
    
    def getEmployerInfo(self, obj):
        try:
            user = obj.employer_id.id_user;
        except:
            user = False
        if user:
            return {
                'id'    : obj.employer_id.id,
                'name'  : f"{user.first_name} {user.last_name}",
                'email' : user.email,
                'phone' : user.phone
            }
    class Meta:
        model = Aid
        fields = '__all__'
        
        extra_kwargs = {
            'id' : {
                'read_only' : True
            },
            'serial_number' : {
                'read_only' : True
            },
            'type_id' : {
                'write_only' : True
            },
            'employer_id' : {
                'write_only' : True
            },
            'status_id' : {
                'write_only' : True
            },
            'type_access' : {
                'write_only' : True
            },
            'media' : {
                'write_only' : True
            },
            'type_device' : {
                'write_only' : True
            },
            'storage_id' : {
                'write_only' : True
            }
        }

class EmployerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('getDetailInfo', read_only=True)
    
    def getDetailInfo(self, obj):
        return {
            'full_name'   : f"{obj.id_user.first_name} {obj.id_user.last_name}",
            'name'        : {
                'first'   : obj.id_user.first_name,
                'last'    : obj.id_user.last_name,
            },
            'email'       : obj.id_user.email,
            'phone'       : obj.id_user.phone,
            'username'    : obj.id_user.username,
            'brith_date'  : obj.id_user.brith_date,
            'is_superuser': obj.id_user.is_superuser,
            'id_obj_user' : obj.id_user.id
        }
    class Meta:
        model = Employer
        fields = ['id', 'user', 'id_user' ]
        extra_kwargs = {
            'id_user' : {
                'write_only' : True
            },
            'id' : {
                'read_only' : True
            }
        }


class CompanySerializer(serializers.ModelSerializer):
    employer = serializers.SerializerMethodField(method_name='getEmployerInfo')
    id_employer = CustomRegisterSerializer(write_only=True)
    type = serializers.CharField(source='type_company.name', read_only=True)
    aids = AidSerializer(read_only=True, many=True)
    
    
    def getEmployerInfo(self, obj):
        return {
            'id' : obj.id_employer.id,
            'name' : obj.id_employer.username,
            'email' : obj.id_employer.email
        }
        
    class Meta:
        model = Company
        fields = [
            'id','name', 'location',
            'aids', 'type', 'type_company', 
            'employer', 'id_employer', 'email'
        ]
        extra_kwargs = {
            'email' : {
                'allow_null' : True
            },
            'type_company' : {
                'write_only' : True
            }
        }
        
    def create(self, valid_data):
        new_company = CustomRegisterCompanySerializer(data=valid_data.get('id_employer'))
        if new_company.is_valid():
            user = new_company.save()
            
        return Company.objects.create(
            name=valid_data.get('name'),
            location=valid_data.get('location'),
            type_company=valid_data.get('type_company'),
            email=user.email,
            id_employer=user
        )
        

