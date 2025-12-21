import json
from django.utils import timezone
from rest_framework import serializers
from base.models import Session, Category, Client, Model, Image, Gallery


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(  # Return this when POST. Accepts primary key as int
        queryset=Category.objects.all(), write_only=True)

    category_detail = CategorySerializer(  # Return this when GET
        source="category", read_only=True)

    client = serializers.PrimaryKeyRelatedField(  # Return this when POST. Accepts primary key as int
        queryset=Client.objects.all(), write_only=True)
    client_detail = ClientSerializer(  # Return this when GET
        source="client", read_only=True, allow_null=True)

    class Meta:
        model = Session
        fields = '__all__'


class ModelSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), write_only=True)
    client_detail = ClientSerializer(source="client", read_only=True)

    class Meta:
        model = Model
        fields = '__all__'


class GallerySerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), write_only=True)
    client_detail = ClientSerializer(source="client", read_only=True)

    session = serializers.PrimaryKeyRelatedField(
        queryset=Session.objects.all(), write_only=True)
    session_detail = SessionSerializer(source="session", read_only=True)

    class Meta:
        model = Gallery
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    gallery = serializers.PrimaryKeyRelatedField(
        queryset=Gallery.objects.all(), write_only=True)
    gallery_detail = GallerySerializer(source="gallery", read_only=True)

    class Meta:
        model = Image
        fields = '__all__'
