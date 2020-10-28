from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
WISHLIST_STATUSES = [
	("PENDING", "PENDING"),
	("ACCEPTED", "ACCEPTED"),
	("FULFILLED", "FULFILLED")
]

class Wishlist(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    buyer = models.CharField(max_length=100)
    wishmaster = models.CharField(max_length=100)
    items = ArrayField(models.CharField(max_length=100))
    status = models.CharField(
        choices=WISHLIST_STATUSES,
        default="PENDING",
        max_length=10
    )
    store = models.ForeignKey(
        "stores.Store",
        related_name="wishlists",
        on_delete=models.SET_NULL,
        null=True
    )
