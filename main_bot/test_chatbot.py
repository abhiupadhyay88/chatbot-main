import unittest
from random import randint
from main_bot.chatbot import chatbotter
from main_bot.models import UserEntry


class TestChatbotter(unittest.TestCase):

    def test_name(self):
        session_id = randint(1000,10000)
        cb = chatbotter(update_field_name='name',update_field_value='abhishek',session_id=session_id)
        user_entry_name = UserEntry.objects.filter(session_id=session_id).first().name
        self.assertEqual(user_entry_name,'abhishek')

    def test_birth_date(self):
        session_id = randint(1000,10000)
        cb = chatbotter(update_field_name='birth_date',update_field_value='14-02-1988',session_id=session_id)
        user_birth_date = UserEntry.objects.filter(session_id=session_id).first().birth_date
        self.assertEqual(user_birth_date,'14-02-1988')


