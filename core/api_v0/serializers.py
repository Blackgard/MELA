from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

from django.core.files.base import ContentFile

from ..models import Users

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