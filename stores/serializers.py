from rest_framework import serializers
from django.contrib.auth.models import User
from stores.models import (Store, StoreType)


class StoreTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreType
        fields = ['id', 'name']


class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = [
            'id', 'name', 'rating', 'opening_hour', 'closing_hour', 'store_type',
            'address', 'latitude', 'longitude', 'city', 'address'
        ]

class NearbyStoreSerializer(StoreSerializer):

    distance = serializers.SerializerMethodField()

    def get_distance(self, instance):
        return instance.distance.km if instance else 'N/A'

    class Meta:
        model = Store
        fields = [
            'id', 'name', 'rating', 'opening_hour', 'closing_hour', 'store_type',
            'address', 'latitude', 'longitude', 'distance',
        ]
