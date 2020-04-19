import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from django.conf import settings
from django.contrib.auth import get_user_model

def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

# Основные таблицы
class Storage(models.Model):
    name = models.CharField(max_length=500)
    
    identifying_number = models.UUIDField(
        verbose_name='Идентификационный номер',
        default=uuid.uuid4, editable=False, null=True, blank=True
    )
    
    ip = models.GenericIPAddressField(verbose_name='ipv4')
    
    type_id = models.ForeignKey(
        'type_storage', 
        on_delete=models.SET_NULL,
        null=True,
    )
    class Answer(models.IntegerChoices):
        NO = 0, _('Выключен')
        YES = 1, _('Включен')
        
        
    status = models.IntegerField(
        verbose_name='Состояние включенности', 
        choices=Answer.choices,
        default=0
    )
    
    class Meta:
        verbose_name = "Хранилище"
        verbose_name_plural = "Хранилища"
    
    def __str__(self):
        return self.name

class Users(AbstractUser):
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

class Company(models.Model):
    name     = models.CharField(
        max_length=2000,
        verbose_name='Название организации'
    )
    location = models.CharField(
        max_length=400, 
        verbose_name='Город организации'
    )
    email        = models.EmailField(verbose_name='Почта организации')
    
    type_company = models.ForeignKey(
        'type_company',
        on_delete=models.SET_NULL,
        null=True
    )
    
    id_employer = models.ForeignKey(
        'users',
        on_delete=models.CASCADE,
        null=True
    )
    
    aids = models.ManyToManyField(
        'aid',
        through='company_aids',
        blank=True, 
        verbose_name="list aids",
        null=True
    )
    
    class Meta:
        verbose_name = "Компания"
        verbose_name_plural = "Компании"
    
    def __str__(self):
        return self.name

class Operation(models.Model):
    TYPE_STATUS = (
        ('ok','Успешно'),
        ('err', 'Ошибка'),
        ('wait', 'Обработка'),
    )
    
    aid_id = models.ForeignKey(
        'Aid',
        on_delete=models.CASCADE,
        verbose_name='id ЭОП'
    )
    type_id = models.ForeignKey(
        'type_aid',
        on_delete=models.SET_NULL,
        null=True
    )
    employer_id = models.ForeignKey(
        'Employer',
        on_delete=models.SET_NULL,
        null=True
    )
    date_operation = models.DateTimeField(
        auto_now_add=True
    )
    status = models.CharField(max_length=50, choices=TYPE_STATUS)
    
    class Meta:
        verbose_name = "Операция"
        verbose_name_plural = "Операции"
    
    def __str__(self):
        return f'{self.aid_id.short_title} {self.type_id.short_name}'

class Aid(models.Model):
    TYPE_STATUS = (
        ('ok'   , 'Работает'),
        ('err'  , 'Ошибка'),
        ('comp' , 'Доработка'),
        ('wait' , 'Обработка'),
        ('start', 'Создано')
    )
    
    TYPE_DEVICES = (
        ('Phone'         , 'Телефон'),
        ('Pc'            , 'ПК'),
        ('Tablet'        , 'Планшет'),
        ('PhoneTablet'   , 'Телефон и планшет'),
        ('PhonePc'       , 'Телефон и ПК'),
        ('PhoneTabletPc' , 'Все гаджеты')
    )
    
    TYPE_ACCESS = (
        ('free', 'Бесплатное'),
        ('buy' , 'Платное'),
        ('demo', 'Демо'),
    )
    
    MEDIA = (
        ('Photo', 'Фото'),
        ('Video', 'Видео'),
        ('Flash', 'Флеш'),
        ('Other', 'Другое'),
        ('All',   'Смешанное'),
        
        ('PhotoVideo', 'Фото и видео'),
        ('PhotoFlash', 'Фото и флеш'),
        ('PhotoOther', 'Фото и другое'),
        
        ('VideoFlash', 'Видео и флеш'),
        ('VideoOther', 'Видео и другое'),
        
        ('FlashOther', 'Флеш и другое'),
        
        ('PhotoVideoOther', 'Фото, видео и другое'),
        ('PhotoFlashOther', 'Фото, флеш и другое'),
        ('PhotoVideoFlashOther', 'Фото, видео, флеш и другое'),
    )
    
    title = models.TextField()
    short_title = models.CharField(max_length=200)
    authors = models.CharField(max_length=2000)
    date_public = models.DateField(null=True)
    description = models.TextField(null=True, blank=True)
    language = models.CharField(max_length=5)
    serial_number = models.UUIDField(default=uuid.uuid4, editable=False, null=True, blank=True)
    eula = models.FileField(upload_to='license/', null=True, blank=True)
    cost = models.CharField(max_length=400)
    body = models.TextField(null=True, blank=True)
    
    key_words   = models.CharField(max_length=2000, default=None, null=True)
    
    type_device = models.CharField(max_length=200, default='PhoneTabletPc', choices=TYPE_DEVICES)
    type_access = models.CharField(max_length=200, default='free', choices=TYPE_ACCESS)
    media       = models.CharField(max_length=200, default='All', choices=MEDIA)
    
    publisher      = models.CharField(max_length=2000, default=None, null=True, blank=True)
    additional_req = models.TextField(null=True, default=None, blank=True)
    
    type_id = models.ForeignKey(
        'type_aid',
        on_delete=models.SET_NULL,
        null=True
    )
    
    status_id = models.CharField(max_length=50, default='start', choices=TYPE_STATUS)
    
    employer_id = models.ForeignKey(
        'Employer',
        on_delete=models.SET_NULL,
        null=True
    )
    
    storage_id = models.ForeignKey(
        'storage',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    class Meta:
        verbose_name = "Электронное обучающее пособие"
        verbose_name_plural = "Электронные обучающие пособия"
    
    def __str__(self):
        return f'{self.short_title}'


# Подтаблицы Users

class Employer(models.Model):
    id_user    = models.ForeignKey(
        'Users',
        on_delete=models.SET(get_sentinel_user),
        null=True
    )
    
    class Meta:
        verbose_name = "Работники"
        verbose_name_plural = "Работник"
    
    def __str__(self):
        if self.id_user: return f'{self.id_user.username}'
        else: return 'deleted'


# Составные таблицы

class company_aids(models.Model):
    aids_id = models.ForeignKey(
        'Aid', 
        on_delete=models.CASCADE,
        null=True
    )
    
    company_id = models.ForeignKey(
        'Company', 
        on_delete=models.CASCADE,
        null=True
    )
    
    date_appeal = models.DateField(auto_now=True)
    
    def get_info_company(self):
        return {
            'id'   : self.company_id.id,
            'name' : self.company_id.name,
            'location' : self.company_id.location,
            'email'    : self.company_id.email,
            'type_company' : self.company_id.type_company.name
        }
    class Meta:
        verbose_name = "Список ЭОП компаний"
        verbose_name_plural = "ЭОП компании"
        unique_together = (("aids_id", "company_id"),) 
    
    def __str__(self):
        return f'{self.aids_id.short_title} {self.company_id.name}'


# Дополнительные таблицы

class type_company(models.Model):
    name = models.CharField(max_length=500)
    
    class Meta:
        verbose_name = "Типы компаний"
        verbose_name_plural = "Тип компании"
        
    def __str__(self):
        return self.name

class type_storage(models.Model):
    name = models.CharField(max_length=200, verbose_name='Имя типа')
    description = models.TextField(verbose_name='Описание', null=True)
    
    class Meta:
        verbose_name = "Типы хранилищ"
        verbose_name_plural = "Тип хранилища"
        
    def __str__(self):
        return self.name
    
class status_aid(models.Model):
    name = models.CharField(max_length=200, verbose_name='Наименование статуса')
    
    class Meta:
        verbose_name = "Статусы ЭОП"
        verbose_name_plural = "Статус ЭОП"
        
    def __str__(self):
        return self.name
    
class type_aid(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название типа ЭОП')
    description = models.TextField(verbose_name='Описание', null=True)
    
    class Meta:
        verbose_name = "Типы ЭОП"
        verbose_name_plural = "Тип ЭОП"
        
    def __str__(self):
        return self.name

class type_operation(models.Model):
    name        = models.CharField(max_length=200, verbose_name='Название операции')
    short_name  = models.CharField(max_length=50, verbose_name='Короткое название операции')
    description = models.TextField(verbose_name='Описание', null=True)
    key         = models.PositiveSmallIntegerField(verbose_name='Ключ операции')
    
    class Meta:
        verbose_name = "Типы операций"
        verbose_name_plural = "Тип операции"
        
    def __str__(self):
        return self.short_name