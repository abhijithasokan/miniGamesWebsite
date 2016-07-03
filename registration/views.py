from django.shortcuts import render
from .forms import UserData
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm  
from django.contrib.auth import authenticate,logout
from django.contrib.auth import login as auth_login
from django.http import HttpResponseRedirect
# Create your views here.
def home(request):
	context={
	'form': UserData(),
	}
	if request.method == 'POST':
		signup_data = UserData(request.POST)
		if signup_data.is_valid():
			signup_data.save()
			context={'message':"Registration Successfull. You can Login Now."}
		else:
			print signup_data.cleaned_data
			if 'username' not in signup_data.cleaned_data:
				context['message'] = "Username already exist! Try another one."
			else:
				context['message'] = "Invalid Password!"

	return render(request,'home.html',context)

def games(request):
	return render(request,'games.html',{})

def login(request):
	if request.method=='POST':
		user = authenticate(username=request.POST['username'],password=request.POST['password'])
		if user is not None:
			auth_login(request,user)
	return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def logOut(request):
	logout(request)
	return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

def aboutUs(request):
	return render(request,'aboutus.html',{})



