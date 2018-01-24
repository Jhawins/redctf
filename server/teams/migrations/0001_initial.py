# Generated by Django 2.0 on 2018-01-24 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('challenges', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
                ('token', models.CharField(default=None, max_length=150, unique=True)),
                ('points', models.IntegerField(default=0)),
                ('correct_flags', models.IntegerField(default=0)),
                ('wrong_flags', models.IntegerField(default=0)),
                ('solved', models.ManyToManyField(to='challenges.Challenge')),
            ],
        ),
    ]
