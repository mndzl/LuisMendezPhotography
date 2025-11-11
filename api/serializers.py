import json
from rest_framework import serializers
from base.models import Session, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Session
        fields = '__all__'
