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
    const wishlist = document.createElement("div");
    wishlist.className = "wishlist";
    wishlist.title = `Created at ${new Date(createdAt)}`;
    wishlist.setAttribute("data-id", id);
    wishlist.setAttribute("data-store-id", store);

    const wishlistContent = document.createElement("div");
    wishlistContent.className = "content";

    const createdBy = document.createElement("h4");
    createdBy.innerHTML = buyer;
    createdBy.title = `Created at ${new Date(createdAt)}`;
    wishlistContent.appendChild(createdBy);

    const wishlistItems = document.createElement("ul");
    
    for (let idx=0; idx<items.length; idx++) {
        let item = document.createElement("li");
        item.innerHTML = items[idx];
        wishlistItems.appendChild(item);
    }
    wishlistContent.appendChild(wishlistItems);

    const actions = document.createElement("div");
    actions.className = "actions";

    const action = document.createElement("span");
    action.setAttribute("data-id", id);
    switch(status) {
        case "PENDING":
            action.className = "accept";
            action.title = "Make a trip";
            break;
        case "ACCEPTED":
            action.className = "accepted";
            action.title = `Wishlist picked up by ${wishmaster}`;
            wishlist.className += " accepted";
            break;
        default:
            action.className = "fulfilled";
            action.title = `Wishlist fulfilled by ${wishmaster}`;
            wishlist.className += " fulfilled";
            break;
    }
    actions.appendChild(action);

    wishlist.appendChild(wishlistContent);
    wishlist.appendChild(actions);

    return wishlist;
}

function updateWishlistNode(element, status) {
    if (status === "ACCEPTED") {
        element.className = "accepted";
        element.title = `Wishlist picked up by ${USERNAME}`;
    } else if (status === "FULFILLED") {
        element.className = "fulfilled";
        element.title = `Wishlist fulfilled by ${USERNAME}`;
    }
}
