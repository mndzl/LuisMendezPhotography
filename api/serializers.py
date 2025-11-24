import json
from rest_framework import serializers
from base.models import Session, Category, Client


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Session
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
