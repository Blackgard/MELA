# Generated by Django 3.0.4 on 2020-04-18 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0020_auto_20200418_1728'),
    ]

    operations = [
        migrations.RenameField(
            model_name='aid',
            old_name='type_divice',
            new_name='type_device',
        ),
    ]
