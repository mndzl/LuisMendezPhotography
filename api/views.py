from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Session
from .serializers import SessionSerializer
from rest_framework import generics


class SessionsListCreate(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
