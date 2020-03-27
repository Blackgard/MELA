from rest_framework import viewsets
from manageMELA.settings import ADMIN_NAME
from .serializers import UserSerializer
from ..models import *

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer 
         
    def get_queryset(self):
        return Users.objects.all() 
