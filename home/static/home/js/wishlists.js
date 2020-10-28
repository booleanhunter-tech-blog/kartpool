async function displayNearbyWishlists(latitude, longitude) {
    const nearbyWishlists = await fetchNearbyWishlists(latitude, longitude);
    renderWishlists("nearby-wishlists", nearbyWishlists);
}
  
async function displayMyRequests(latitude, longitude) {
    const myWishlists = await fetchNearbyWishlists(latitude, longitude, {buyer: USERNAME});
    renderWishlists("my-wishlists", myWishlists);
}
  
async function displayMyTrips(latitude, longitude) {
    const myTrips = await fetchNearbyWishlists(latitude, longitude, {wishmaster: USERNAME});
    renderWishlists("my-trips", myTrips);
}

async function createWishlist() {
    const wishlistInput = document.getElementById("wishlist-items").value.trim();
    if (STORE && wishlistInput) {
        addWishlist(USERNAME, wishlistInput.split(","), STORE);
    }
}

async function updateWishlistStatus(event) {
    switch(event.target.className) {
        case "accept":
            event.preventDefault();
            await updateWishlist(
                event.target.getAttribute("data-id"),
                {
                    status: "ACCEPTED",
                    wishmaster: USERNAME
                }
            )

            updateWishlistNode(event.target, "ACCEPTED");
            break;
        case "accepted":
            event.preventDefault();
            await updateWishlist(
                event.target.getAttribute("data-id"),
                {
                    status: "FULFILLED",
                    wishmaster: USERNAME
                }
            )

            updateWishlistNode(event.target, "FULFILLED")
            break;
    }
}
