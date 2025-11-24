import json
from rest_framework import serializers
from base.models import Session, Category, Client


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(  # Return this when POST. Accepts primary key as int
        queryset=Category.objects.all(), write_only=True)

    category_detail = CategorySerializer(  # Return this when GET
        source="category", read_only=True)

    class Meta:
        model = Session
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
