from django.db import models

##User Entry model
class UserEntry(models.Model):
    name = models.CharField(max_length=50)
    sex = models.CharField(max_length=20)
    smoking_status = models.CharField(max_length=15)
    birth_date = models.CharField(max_length=15)
    session_id = models.CharField(max_length=35)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    meta = {
        'indexes' : ['session_id']
    }
