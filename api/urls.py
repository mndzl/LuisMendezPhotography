from django.urls import path
from . import views

urlpatterns = [
    path('', views.SessionsListCreate.as_view(), name="getSessions"),
    path('newsession/', views.SessionsListCreate.as_view(), name="newSession")
]
