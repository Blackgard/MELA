from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('api/signup/', include('rest_auth.registration.urls')),
    path('api/login/', obtain_jwt_token),
    path('admin/', admin.site.urls),
    path('api/', include('core.api_v0.urls')),
    path('', include('core.urls'))
]