from django.shortcuts import render
from registration.models import GamerUser
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

guser = None
max_score=0

def game(request):
	if not request.user.is_authenticated():
		print 'Here'
		return HttpResponseRedirect('/')

	context={
		'board':GamerUser.objects.all(),
		'title':'Snake',
	}
	return render(request,"snake_game.html",context)

@csrf_exempt
def getLeaderBoard(request):
	print request.user.username
	if request.method=='POST':
		try:
			guser = GamerUser.objects.get(username=request.user.username)
			max_score = int(guser.score)
			new_score = int(request.POST['score'])
			if new_score>max_score:
				guser.score=new_score
				max_score = new_score
				guser.save()
		except:
			print 'Unsuccesfful POST'
			pass

	table_html=''
	for gamer in GamerUser.objects.all():
		table_html=table_html+'{},{},{}|'.format(gamer.username,gamer.fullname,gamer.score)
	
	return HttpResponse(table_html[:-1])

	
