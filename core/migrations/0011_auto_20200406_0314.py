# Generated by Django 3.0.4 on 2020-04-05 20:14

import core.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20200404_1807'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company_aids',
            name='emp_company_id',
        ),
        migrations.RemoveField(
            model_name='users',
            name='type_account',
        ),
        migrations.AlterField(
            model_name='company_aids',
            name='aids_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.Aid'),
        ),
        migrations.AlterField(
            model_name='company_aids',
            name='company_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.Company'),
        ),
        migrations.AlterField(
            model_name='employer',
            name='id_user',
            field=models.ForeignKey(null=True, on_delete=models.SET(core.models.get_sentinel_user), to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Employer_company',
        ),
    ]
