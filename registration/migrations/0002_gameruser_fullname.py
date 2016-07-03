# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gameruser',
            name='fullname',
            field=models.CharField(default='Anonymous', max_length=50),
        ),
    ]
