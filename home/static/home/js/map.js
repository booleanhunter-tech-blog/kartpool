mapboxgl.accessToken = 'your-secret-key';


function addMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [77.645296, 12.978624],
        zoom: 2
    });
    
    map.addControl(new mapboxgl.NavigationControl());

    return map;
}

function addGeocoder(map, geocoderCallback) {
    const geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl });
    map.addControl(geocoder);
    
    geocoder.on("result", (data) => {
        geocoderCallback(data);
    });
}

/**
 * Converts array of stores to GeoJSON format
 * @param {Store[]} stores
 * @return {Object} Stores GeoJSON
 */
function convertToGeoJson(stores) {
    return {
        type: "FeatureCollection",
        features: stores.map(store => {
            return {
                type: "Feature",
                geometry: {
                    type: 'Point',
                    coordinates: [store.longitude, store.latitude]
                },
                properties: {
                    id: store.id,
                    name: store.name,
                    address: store.address,
                    phone: store.phone,
                    distance: store.distance,
                    rating: store.rating,                                                                                                                                                                                                                                                                                                                                                                                                                                       
                }
            }
        })
    }
}

function plotStoresOnMap(map, storesGeoJson) {
    storesGeoJson.features.forEach((store) => {
        // create a HTML element for each feature
        let el = document.createElement('div');
        el.className = 'store';
        el.title = `${store.properties.name}\n` +
        `approximately ${store.properties.distance.toFixed(2)} km away\n` +
        `Address: ${store.properties.address || "N/A"}\n` +
        `Phone: ${store.properties.phone || "N/A"}\n` +
        `Rating: ${store.properties.rating || "N/A"}`;
      
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(store.geometry.coordinates)
          .addTo(map);

        el.addEventListener('click', function(e) {
            /* Fly to the point */
            flyToStore(map, store);
            /* Close all other popups and display popup for clicked store */
            displayStoreDetails(map, store);
            STORE = store.properties.id;
        });
    });
}

function flyToStore(map, point) {
    map.flyTo({
        center: point.geometry.coordinates,
        zoom: 20
    });
}

function displayStoreDetails(map, point) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]){
        popUps[0].remove();
    }

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(point.geometry.coordinates)
        .setHTML(
            `<h3>${point.properties.name}</h3>` +
            `<h4>Approximately ${point.properties.distance.toFixed(2)} km away</h4>` +
            `<h4>Address: ${point.properties.address || "N/A"}</h4>` +
            `<h4>Phone: ${point.properties.phone || "N/A"}</h4>` +
            `<h4>Rating: ${point.properties.rating || "N/A"}</h4>`
        )
        .addTo(map);
    return popup;
}
