from django.contrib import admin

# Register your models here.
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Store

@admin.register(Store)
class StoreAdmin(OSMGeoAdmin):
    list_display = ('name', 'location')
