window.onload = start();

function start() {
    webucate.db.init('eHLLLYmUkDTK7JIWhC5p')
    .then(() => {
        var results = webucate.db.run(`SELECT latitude,longitude FROM bike_rack_locations`);
        console.log(results[0]);
        results[0].map((c) => {
            L.marker([c.latitude, c.longitude], {icon: bikeIcon}).addTo(map);
        })
    });
}

var map = L.map('map').setView([-27.4705,153.0260],12); // setup the map

L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { // base layer, zoom, attribution
    maxZoom: 18,
    minZoom: 0,
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map);

//var debug = L.layerGroup([debugMarker]);

//custom icons
var bikeIcon = L.icon({
    iconUrl: 'images/cat-riding-bicycle.png',

    iconSize:     [88, 70], // size of the icon
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([51.5, -0.09], {icon: bikeIcon}).addTo(map); 

var debugMarker = L.marker([-27.4584,153.0343]).addTo(map);
debugMarker.bindPopup("This is where you are right now.")

var debugCircle = L.circle([-27.3943, 153.1178], {
    color: '#ADD8E6',
    fillColor: '#ADD8E6',
    fillOpacity: '0.25',
    radius: 2500
}).addTo(map);
debugCircle.bindPopup("This is the airport.")

function testLoop() {
    var map = L.map('map').setView([-27.4705,153.0260],12); // setup the map
    L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { // base layer, zoom, attribution
        maxZoom: 17,
        minZoom: 0,
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    var testValues = [[2.02881,30.58052],[44.18567, -147.80254],[-22.65011, 17.67293]];
    console.log(testValues);
    
    testValues = L.circle([c[0], c[1]], {
        color: '#ADD8E6',
        fillColor: '#ADD8E6',
        fillOpacity: '0.25',
        radius: 25
    }).addTo(map);

}