from django.conf.urls import include, url

urlpatterns = [
    url(r'games/$','registration.views.games'),
    url(r'signup/$','registration.views.home'),
    url(r'logout/$','registration.views.logOut'),
    url(r'login/$','registration.views.login'),
    url(r'aboutus/$','registration.views.aboutUs'),
    url(r'^.*$','registration.views.home')
] 

