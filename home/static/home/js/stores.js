async function displayNearbyStores(map, latitude, longitude) {
    const stores = await fetchNearbyStores(latitude, longitude);
    const storesGeoJson = convertToGeoJson(stores);
    plotStoresOnMap(map, storesGeoJson);
    return storesGeoJson;
}

function setStoreNavigation(map, storesGeoJson) {
    const wishlistElements = document.getElementsByClassName("wishlist");

    for (let i=0; i<wishlistElements.length; i++) {
        wishlistElements[i].onclick = (event) => {
            const storeId = event.currentTarget.getAttribute("data-store-id");

            for (let j=0; j<storesGeoJson.features.length; j++) {
                if (storeId === storesGeoJson.features[j].properties.id) {
                    flyToStore(map, storesGeoJson.features[j]);
                    displayStoreDetails(map, storesGeoJson.features[j]);
                    STORE = storeId;
                    break;
                }
            }
        }
    }
}
