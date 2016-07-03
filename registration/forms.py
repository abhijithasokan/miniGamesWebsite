from django import forms
from django.contrib.auth.models import User
from .models import GamerUser
from django.contrib.auth.forms import UserCreationForm  
class UserData(UserCreationForm):
	class Meta:
		fields = ('username','fullname','email', 'password1', 'password2')  
		model = GamerUser 

	
