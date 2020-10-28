from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

# Create your views here.
class HomePage(viewsets.GenericViewSet):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'home/index.html'
    
    def list(self, request):
        username = self.request.query_params.get('username')
        return Response({'username': username})