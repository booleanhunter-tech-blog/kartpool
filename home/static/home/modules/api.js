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
export async function fetchNearbyStores(latitude, longitude) {
    const response = await fetch(`/stores?lat=${latitude}&lng=${longitude}`, {
        method: 'GET'
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(Error(response.statusText));
    }
}

/**
 * Fetch list of nearby wishlists
 * @param {number} latitude
 * @param {number} longitude
 * @param {{buyer: Wishlist['buyer'], wishmaster: Wishlist['wishmaster']}} [options]
 * @return {Promise<Wishlist[]>} Array of wishlists
 */
export async function fetchNearbyWishlists(
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
        method: 'GET'
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(Error(response.statusText));
    }

}

/**
 * Add a wishlist
 * @param {Wishlist['buyer']} buyer
 * @param {Wishlist['items']} items
 * @param {string} store ID of the store
 * @return {Promise<Wishlist>}
 */
export async function addWishlist(buyer, items, store) {
    const response = await fetch('/wishlists/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            buyer,
            items,
            store
        })
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(Error(response.statusText));
    }
}

/**
 * Update a wishlist
 * @param {string} id - ID of the wishlist to update
 * @param {Wishlist} data - Wishlist fields to update
 * @return {Promise<Wishlist>}
 */
export async function updateWishlist(id, data) {
    const response = await fetch(`/wishlists/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(Error(response.statusText));
    }
}
