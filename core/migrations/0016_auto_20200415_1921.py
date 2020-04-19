# Generated by Django 3.0.4 on 2020-04-15 12:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_company_id_employer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aid',
            name='status_id',
            field=models.CharField(choices=[('ok', 'Работает'), ('err', 'Ошибка'), ('comp', 'Доработка'), ('wait', 'Обработка'), ('start', 'Создано')], default='start', max_length=50),
        ),
        migrations.AlterField(
            model_name='company_aids',
            name='aids_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Aid'),
        ),
        migrations.AlterField(
            model_name='company_aids',
            name='company_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Company'),
        ),
    ]
