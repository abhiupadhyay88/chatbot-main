from main_bot.models import UserEntry
from datetime import datetime
import json
from main_bot.settings import BASE_DIR

##assigning keyword arguments to object
def obj_attr_set(obj,**kwargs):
    for k,v in kwargs.items():
        setattr(obj,k,v)
    return

##Fetching Question List Data
f = open(BASE_DIR + '/main_bot/questions_details.json','r')
val = f.read()
questions_info = json.loads(val)
QUESTION_LIST = questions_info.get('question_list',[])
QUESTION_INDEX_MAPPING = questions_info.get('question_index_mappng',[])


class chatbotter():
    def __init__(self,**kwargs):
        self.session_id = ''
        self.update_field_name = None
        self.update_field_value = None
        self.next_question = ''
        self.next_question_id = ''
        obj_attr_set(self,**kwargs)
        self.update_field()

    ##creating a user entry by updating the field
    def update_field(self):
        user_entry = UserEntry.objects.filter(session_id=self.session_id).first()
        if not user_entry:
            user_entry = UserEntry.objects.create(session_id=self.session_id,created_at=datetime.now(),updated_at=datetime.now())
        user_entry.__dict__[self.update_field_name]=self.update_field_value
        user_entry.updated_at = datetime.now()
        user_entry.save()
        self.get_next_question()

    ##Setting up next question
    def get_next_question(self):
        if self.update_field_name != 'result':
            ques_index = QUESTION_INDEX_MAPPING.index(self.update_field_name)
            self.next_question = QUESTION_LIST[ques_index+1]
            self.next_question_id = QUESTION_INDEX_MAPPING[ques_index+1]
        else:
            user_entry = UserEntry.objects.filter(session_id = self.session_id).first()
            self.next_question = user_entry.name + " was born in " + user_entry.birth_date + " and is a "\
                                 + user_entry.sex + " , " + user_entry.smoking_status
            self.next_question_id = 'End'


