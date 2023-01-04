mapboxgl.accessToken = mapToken; // the mapbox token we defined in a seperate script in map.ejs
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 6, // starting zoom
});

// adding a marker to the location point
new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map)