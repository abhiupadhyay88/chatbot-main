from django.shortcuts import render, render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from main_bot.chatbot import chatbotter

import json

def home(request, template_name="home.html"):
	context = {'title': 'Chatbot'}
	request.session.set_test_cookie()
	return render_to_response(template_name, context)

@csrf_exempt
def update_entry(request):
	session_id = request.COOKIES.get('sessionid')
	update_field_name = request.GET.get('update_field_name')
	update_field_value = request.GET.get('update_field_value')
	cb = chatbotter(session_id=session_id,update_field_name=update_field_name,update_field_value=update_field_value)
	res = {'next_question':cb.next_question,'next_question_id':cb.next_question_id}
	return HttpResponse(json.dumps(res))

