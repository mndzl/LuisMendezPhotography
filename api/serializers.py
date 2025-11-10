import json
from rest_framework import serializers
from base.models import Session, Category


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Add a new field or modify an existing one
        category = Category.objects.get(pk=representation["category"])
        representation['category'] = category.name
        return representation


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
