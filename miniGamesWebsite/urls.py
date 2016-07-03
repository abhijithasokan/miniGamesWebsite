from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from registration import urls as registrationUrls
urlpatterns = [
    # Examples:
    # url(r'^$', 'miniGamesWebsite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^snake_game/$','snakeGame.views.game',name="snakeGame"),
    url(r'^snake_game/glb$','snakeGame.views.getLeaderBoard',name="snakeGame"),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^',include(registrationUrls)),
 
] 

if settings.DEBUG == True:
	urlpatterns+= static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
