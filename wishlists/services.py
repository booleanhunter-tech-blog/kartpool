from django.core.exceptions import ObjectDoesNotExist

from .models import Wishlist
from stores.models import Store
from stores.services import get_nearby_stores_within

def get_wishlists(latitude: float, longitude: float, options: dict):
    return Wishlist.objects.filter(
        **options,
        store__in=get_nearby_stores_within(
            latitude=latitude,
            longitude=longitude,
            km=10,
            limit=100
        )
    ).order_by(
        'created_at'
    )


def create_wishlist(buyer: str, items: list, store: Store):
    wishlist = Wishlist(
        buyer=buyer,
        items=items,
        store_id=store
    )

    wishlist.save()
    return wishlist

def update_wishlist(pk: str, wishmaster: str=None, status: str="ACCEPTED"):
    try:  
        wishlist = Wishlist.objects.get(pk=pk)

        wishlist.wishmaster = wishmaster
        wishlist.status = status

        wishlist.save(update_fields=['wishmaster', 'status'])
        return wishlist
    except ObjectDoesNotExist:
        print("Wishlist does not exist")
