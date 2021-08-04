/**
 * Renders a list of wishlists
 * @param {string} containerElementId - The DOM element ID where you want to render the wishlist
 * @param {Wishlist[]} wishlists - Array containing wishlist data
 */
function renderWishlists(containerElementId, wishlists) {
    const wishlistContainer = document.getElementById(containerElementId);

    for (let idx=0; idx<wishlists.length; idx++) {
        wishlistContainer.appendChild(
            createWishlistNode(
                wishlists[idx].id,
                wishlists[idx].buyer,
                wishlists[idx].created_at,
                wishlists[idx].items,
                wishlists[idx].status,
                wishlists[idx].store,
                wishlists[idx].wishmaster,
            )
        );
    }
}

function createWishlistNode(
    id,
    buyer,
    createdAt,
    items,
    status,
    store,
    wishmaster,
) {
    const wishlist = document.createElement("li");
    wishlist.className = "wishlist";
    wishlist.title = `Created at ${new Date(createdAt)}`;
    wishlist.setAttribute("data-id", id);
    wishlist.setAttribute("data-store-id", store);

    const wishlistContent = document.createElement("section");

    const createdBy = document.createElement("h1");
    createdBy.textContent = buyer;
    wishlistContent.appendChild(createdBy);

    const wishlistItems = document.createElement("ul");
    wishlistItems.setAttribute("aria-label", "Wishlist items")
    
    for (let idx=0; idx<items.length; idx++) {
        let item = document.createElement("li");
        item.textContent = items[idx];
        wishlistItems.appendChild(item);
    }
    wishlistContent.appendChild(wishlistItems);

    const actions = document.createElement("section");
    actions.className = "actions";
    actions.setAttribute("aria-label", "Change status")

    const actionButton = document.createElement("button");
    actionButton.setAttribute("data-id", id);
    
    switch(status) {
        case "PENDING":
            actionButton.className = "accept";
            actionButton.textContent = "Make a trip";
            actionButton.title = "Make a trip";
            break;
        case "ACCEPTED":
            actionButton.className = "accepted";
            actionButton.textContent = `Wishlist picked up by ${wishmaster}`;
            actionButton.title = `Wishlist picked up by ${wishmaster}`;
            wishlist.className += " accepted";
            break;
        default:
            actionButton.className = "fulfilled";
            actionButton.textContent = `Wishlist fulfilled by ${wishmaster}`;
            actionButton.title = `Wishlist fulfilled by ${wishmaster}`;
            wishlist.className += " fulfilled";
            break;
    }
    actions.appendChild(actionButton);

    wishlist.appendChild(wishlistContent);
    wishlist.appendChild(actions);

    return wishlist;
}

function updateWishlistNode(element, status) {
    if (status === "ACCEPTED") {
        element.className = "accepted";
        element.textContent = `Wishlist picked up by ${USERNAME}`;
        element.title = `Wishlist picked up by ${USERNAME}`;
    } else if (status === "FULFILLED") {
        element.className = "fulfilled";
        element.textContent = `Wishlist fulfilled by ${USERNAME}`;
        element.title = `Wishlist fulfilled by ${USERNAME}`;
    }
}
