from base.models import Session, Client, Category, Model, Image, Gallery
from .serializers import SessionSerializer, ClientSerializer, CategorySerializer, ModelSerializer, ImageSerializer, GallerySerializer
from rest_framework import generics


class SessionsListCreate(generics.ListCreateAPIView):
    queryset = Session.objects.select_related(
        "category", "client").order_by('-date')
    serializer_class = SessionSerializer


class ClientListCreate(generics.ListCreateAPIView):
    queryset = Client.objects.all().order_by('first_name', 'last_name')
    serializer_class = ClientSerializer


class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class SessionRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class ClientRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class CategoryRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ModelListCreate(generics.ListCreateAPIView):
    queryset = Model.objects.select_related("client", "session")
    serializer_class = ModelSerializer

    def get_queryset(self):
        session_id = self.kwargs.get("sessionID")
        if session_id:
            try:
                session = Session.objects.get(id=session_id)
            except Session.DoesNotExist:
                return Model.objects.none()
            return Model.objects.filter(session=session)
        else:
            return Model.objects.all()


class ImageListCreate(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def get_queryset(self):
        gallery_id = self.kwargs.get("galleryID")
        if gallery_id:
            try:
                gallery = Gallery.objects.get(id=gallery_id)
            except Gallery.DoesNotExist:
                return Image.objects.none()
            return Image.objects.filter(gallery=gallery)
        else:
            return Image.objects.all()


class GalleryListCreate(generics.ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    def get_queryset(self):
        session_id = self.kwargs.get("sessionID")
        if session_id:
            try:
                session = Session.objects.get(id=session_id)
            except Session.DoesNotExist:
                return Gallery.objects.none()
            return Gallery.objects.filter(session=session)
        else:
            return Gallery.objects.all()
