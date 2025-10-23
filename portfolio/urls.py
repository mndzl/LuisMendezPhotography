from django.urls import path
from django.urls import include
from .views import landing_page

urlpatterns = [
    path('', landing_page, name='landing_page'),
]
