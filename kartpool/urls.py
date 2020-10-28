"""kartpool URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stores import views as stores_views
from wishlists import views as wishlists_views
from home import views as home_views

# Create a router and register viewsets with it
router = DefaultRouter()
router.register(r'stores', stores_views.StoreView, basename='stores')
router.register(r'wishlists', wishlists_views.WishlistView, basename='wishlists')
router.register(r'home', home_views.HomePage, basename='home')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
