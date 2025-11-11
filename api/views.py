from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Session
from .serializers import SessionSerializer
from rest_framework import generics


class SessionsListCreate(generics.ListCreateAPIView):
    queryset = Session.objects.select_related("category")
    serializer_class = SessionSerializer

    def __init__(self):
        print(self.queryset)
