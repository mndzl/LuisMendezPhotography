from django.contrib import admin
from base.models import Category, Client, Session, Model

# Register your models here.
admin.site.register(Category)
admin.site.register(Client)
admin.site.register(Session)
admin.site.register(Model)
