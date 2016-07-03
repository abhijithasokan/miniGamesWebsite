from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class GamerUser(User):
	class Meta:
		ordering=('-score','lastPlayed')
	fullname = models.CharField(max_length=50,default="Anonymous")
	score = models.PositiveSmallIntegerField(default=0)
	lastPlayed = models.DateTimeField(auto_now_add=False,auto_now=True,null=True)

