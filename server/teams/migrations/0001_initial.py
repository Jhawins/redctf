from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('challenges', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SolvedChallenge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('challenge', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='challenges.Challenge')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
                ('token', models.CharField(default=None, max_length=150, unique=True)),
                ('points', models.IntegerField(default=0)),
                ('hidden', models.BooleanField(default=False)),
                ('correct_flags', models.IntegerField(default=0)),
                ('wrong_flags', models.IntegerField(default=0)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('solved', models.ManyToManyField(to='teams.SolvedChallenge')),
            ],
        ),
    ]
