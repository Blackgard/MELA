# Generated by Django 3.0.4 on 2020-04-18 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_auto_20200418_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='aid',
            name='additional_req',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
