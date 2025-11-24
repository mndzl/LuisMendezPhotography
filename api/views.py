from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Session, Client, Category
from .serializers import SessionSerializer, ClientSerializer, CategorySerializer
from rest_framework import generics


class SessionsListCreate(generics.ListCreateAPIView):
    queryset = Session.objects.select_related("category")
    serializer_class = SessionSerializer


class ClientListCreate(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
