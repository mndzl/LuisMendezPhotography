from django.urls import path
from . import views

urlpatterns = [
    path('getsessions/', views.SessionsListCreate.as_view(), name="getSessions"),
    path('newsession/', views.SessionsListCreate.as_view(), name="newSession"),
    path('getclients/', views.ClientListCreate.as_view(), name="getClients"),
    path('getcategories/', views.CategoryListCreate.as_view(), name="getCategories")

]
