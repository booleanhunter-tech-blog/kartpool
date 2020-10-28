from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

from .models import Store
from .services import get_nearby_stores_within
from .serializers import (StoreSerializer, NearbyStoreSerializer)

# Create your views here.

class StoreView(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

    def list(self, request):
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lng')

        radius = 10 # in kilometres
        number_of_stores_to_return = 100
        
        stores = get_nearby_stores_within(
            latitude=float(latitude),
            longitude=float(longitude),
            km=radius,
            limit=number_of_stores_to_return
        )

        stores_data = NearbyStoreSerializer(stores, many=True)
        return Response(stores_data.data)


class StorePageView(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'stores/index.html'
    
    def list(self, request):
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lng')

        radius = 10 # in kilometres
        number_of_stores_to_return = 100
        
        stores = get_nearby_stores_within(
            latitude=float(latitude),
            longitude=float(longitude),
            km=radius,
            limit=number_of_stores_to_return
        )

        stores_data = NearbyStoreSerializer(stores, many=True)
        return Response({'stores': stores_data.data})
