import {
    fetchNearbyStores
} from './api.js';

import {
    convertToGeoJson,
    plotStoresOnMap,
    flyToStore,
    displayStoreDetails,
} from './map.js';

/**
 * Current selected store's ID
 * @type {string}
 */
export let SELECTED_STORE_ID;

/**
 * Update selected store
 * @param {string} storeId
 */
export function updateSelectedStore(storeId) {
    SELECTED_STORE_ID = storeId;
}

/**
 * Fetch and display nearby stores
 * @typedef {import('./map').StoresGeoJSON} StoresGeoJSON
 * @param {Object} map
 * @param {number} latitude
 * @param {number} longitude
 * @return {Promise<StoresGeoJSON>} Stores in GeoJSON
 */
export async function displayNearbyStores(map, latitude, longitude) {
    try {
        const stores = await fetchNearbyStores(latitude, longitude);
        const storesGeoJson = convertToGeoJson(stores);
        plotStoresOnMap(map, storesGeoJson);
        return storesGeoJson;
    } catch(error) {
        console.error(error);
    }
    
}

/**
 * Set-up event handlers for each wishlist element
 * @param {Object} map
 * @param {StoresGeoJSON} storesGeoJson
 */
export function setStoreNavigation(map, storesGeoJson) {
    const wishlistElements = document.getElementsByClassName('wishlist');

    for (let i=0; i<wishlistElements.length; i++) {
        wishlistElements[i].onclick = (event) => {
            const storeId = event.currentTarget.getAttribute('data-store-id');

            for (let point of storesGeoJson.features) {
                if (storeId === point.properties.id) {
                    flyToStore(map, point);
                    displayStoreDetails(map, point);
                    updateSelectedStore(storeId);
                    break;
                }
            }
        }
    }
}
