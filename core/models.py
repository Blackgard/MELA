from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    type_account = models.IntegerField(
        verbose_name="Тип аккаунта", 
        blank=True, 
        default=1,
        null=True
    )
    
    location = models.CharField(
        verbose_name="Родной город", 
        max_length=500, 
        blank=True, 
        null=True
    )

    brith_date = models.DateField(
        verbose_name="Дата рождения", 
        blank=True, 
        null=True    
    )
    
    phone = models.CharField(
        verbose_name="Номер телефона", 
        max_length=20, 
        blank=True, 
        null=True
    )
    
    about = models.TextField(
        verbose_name="Дополнительно", 
        blank=True, 
        null=True
    )
     
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
    
    def __str__(self):
        return self.username