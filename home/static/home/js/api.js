/**
 * Store object
 * @typedef {Object} Store
 * @property {string} id
 * @property {string} name - Name of the store
 * @property {string} address
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} phone
 * @property {number} distance
 * @property {number} rating
 */

/**
 * Wishlist object
 * @typedef {Object} Wishlist
 * @property {string} id
 * @property {string} buyer - User who needs the items
 * @property {Date} created_at
 * @property {string[]} items - List of items to purchase
 * @property {'PENDING' | 'ACCEPTED' | 'FULFILLED' } status
 * @property {string} [wishmaster] - User purchasing the items on behalf of buyer
 * @property {string} store - ID of the store
 */

/**
 * Fetch list of nearby stores from a given latitude and longitude
 * @param {number} latitude
 * @param {number} longitude
 * @return {Promise<Store[]>} Array of stores
 */
async function fetchNearbyStores(latitude, longitude) {
    const response = await fetch(`/stores?lat=${latitude}&lng=${longitude}`, {
        method: "GET"
    });

    return response.json();
}

/**
 * Fetch list of nearby wishlists
 * @param {number} latitude
 * @param {number} longitude
 * @param {Wishlist} [options]
 * @return {Promise<Wishlist[]>} Array of wishlists
 */
async function fetchNearbyWishlists(
    latitude,
    longitude,
    options,
) {
    let url = `/wishlists?lat=${latitude}&lng=${longitude}`;
    if (options) {
        if (options.buyer) {
            url += `&buyer=${options.buyer}`
        }
    
        if (options.wishmaster) {
            url += `&wishmaster=${options.wishmaster}`
        }
    }
    
    const response = await fetch(url, {
        method: "GET"
    });

    return response.json();
}

/**
 * Add a wishlist
 * @param {string} buyer
 * @param {string[]} items
 * @param {string} ID of the store
 * @return {Promise<Wishlist>}
 */
async function addWishlist(buyer, items, store) {
    const response = await fetch("/wishlists/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            buyer,
            items,
            store
        })
    });

    return response.json();
}

/**
 * Update a wishlist
 * @param {string} id - ID of the wishlist to update
 * @param {Wishlist} data - Wishlist fields to update
 * @return {Promise<Wishlist>}
 */
async function updateWishlist(id, data) {
    const response = await fetch(`/wishlists/${id}/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response.json();
}
