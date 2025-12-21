from django.urls import path
from . import views

urlpatterns = [
    # Sessions
    path('getsessions/', views.SessionsListCreate.as_view(), name="getSessions"),
    path('newsession/', views.SessionsListCreate.as_view(), name="newSession"),
    path('getsession/<int:pk>/', views.SessionRUD.as_view(),
         name="getSession"),
    path('updatesession/<int:pk>/', views.SessionRUD.as_view(),
         name="updateSession"),
    path('deletesession/<int:pk>/', views.SessionRUD.as_view(),
         name="deleteSession"),

    # Clients
    path('newclient/', views.ClientListCreate.as_view(), name="newClient"),
    path('getclients/', views.ClientListCreate.as_view(), name="getClients"),

    path('deleteclient/<int:pk>/', views.ClientRUD.as_view(),
         name="deleteClient"),

    # Categories
    path('getcategories/', views.CategoryListCreate.as_view(), name="getCategories"),
    path('deletecategory/<int:pk>/',
         views.CategoryRUD.as_view(), name="deleteCategory"),
    path('newcategory/', views.CategoryListCreate.as_view(), name="newCategory"),


    # Models
    path('getmodels/<int:sessionID>/', views.ModelListCreate.as_view(),
         name="getModels"),


    # Images
    path('getimages/', views.ImageListCreate.as_view(),
         name="getImages"),
    path('getimages/<int:galleryID>', views.ImageListCreate.as_view(),
         name="getImages"),
    path('newimage/', views.ImageListCreate.as_view(),
         name="newImage"),

    #  Galleries
    path('getgalleries/', views.GalleryListCreate.as_view(),
         name="getGalleries"),
    path('getgallery/<int:pk>', views.GalleryListCreate.as_view(),
         name="getGalleries"),
    path('getsessiongalleries/<int:sessionID>', views.GalleryListCreate.as_view(),
         name="getSessionGalleries"),
]
