# Generated by Django 3.0.4 on 2020-04-04 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20200403_2355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aid',
            name='eula',
            field=models.FileField(blank=True, null=True, upload_to='static/license'),
        ),
    ]
