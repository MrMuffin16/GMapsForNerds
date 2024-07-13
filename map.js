var map = L.map('map').setView([-27.4705,153.0260],12); // setup the map

L.tileLayer('https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', { // base layer, zoom, attribution
    maxZoom: 17,
    minZoom: 12,
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map);

//var debug = L.layerGroup([debugMarker]);

var debugMarker = L.marker([-27.4584,153.0343]).addTo(map);
debugMarker.bindPopup("This is where you are right now.")

var debugCircle = L.circle([-27.3943, 153.1178], {
    color: '#ADD8E6',
    fillColor: '#ADD8E6',
    fillOpacity: '0.25',
    radius: 2500
}).addTo(map);
debugCircle.bindPopup("This is the airport.")

