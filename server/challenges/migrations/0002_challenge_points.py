# Generated by Django 2.0 on 2018-01-04 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('challenges', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenge',
            name='points',
            field=models.IntegerField(default=0),
        ),
    ]