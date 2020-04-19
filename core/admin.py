from django.contrib import admin
from .models import *

admin.site.register(
    [
        Users, Company, Employer, 
        Operation, Aid, status_aid, Storage, type_aid, 
        type_company, type_operation, type_storage
    ]
)
