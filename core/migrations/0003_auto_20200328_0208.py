# Generated by Django 3.0.4 on 2020-03-27 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200328_0150'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='aids',
            field=models.ManyToManyField(blank=True, null=True, through='core.company_aids', to='core.Aid', verbose_name='list aids'),
        ),
        migrations.AlterUniqueTogether(
            name='company_aids',
            unique_together={('aids_id', 'company_id')},
        ),
    ]