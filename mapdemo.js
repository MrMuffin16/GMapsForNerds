window.onload = start();

data_sets = [["Bike Rack Locations","bike_rack_locations"],["Boat Ramp Locations","boat_ramp_location"],["Free Public Wifi Locations","free_wifi_location"],["Park Locations","park_location"],["Art Installation Locations","art_location"]];

//display custom icons using values taken from database - includes use of overlays
// function start() {
//     webucate.db.init('eHLLLYmUkDTK7JIWhC5p')
//     .then(() => {
//         var overlayMaps;
//         var baseMaps;
//         var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
//         data_sets.map((n) => {
//             var results = webucate.db.run(`SELECT latitude,longitude FROM ${n[1]}`);
//             console.log(results[0]);
//             var bike_racks = [];
//             var icon = n[1];
//             results[0].map((c) => {
//                 var location = L.marker([c.latitude, c.longitude], {icon: bike_rack_locations_icon});
//                 bike_racks.push(location);
//             });
//             var locations = L.layerGroup(bike_racks);
//             console.log(locations);
//             layerControl.addOverlay(locations, `${n[0]}`);
//         })
//     });
// }

//without cluster
// function start() {
//     webucate.db.init('eHLLLYmUkDTK7JIWhC5p')
//     .then(() => {
//         var results = webucate.db.run(`SELECT latitude,longitude FROM bike_rack_locations`);
//         console.log(results[0]);
//         var bike_racks = [];
//         results[0].map((c) => {
//             var location = L.marker([c.latitude, c.longitude], {icon: bikeIcon});
//             bike_racks.push(location);
//         })
//         var bike_rack_locations = L.layerGroup(bike_racks);
//         var overlayMaps = {
//             "Bike Rack Locations": bike_rack_locations
//         };
//         var baseMaps;
//         var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
//     });
// }

//with cluster - doesn't work
function start() {
    webucate.db.init('eHLLLYmUkDTK7JIWhC5p')
    .then(() => {
        var overlayMaps;
        var baseMaps;
        var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
        data_sets.map((n) => {
            var results = webucate.db.run(`SELECT latitude,longitude,description,suburb,street FROM ${n[1]}`);
            console.log(results[0]);
            var locations = new L.MarkerClusterGroup();
            results[0].map((c) => {
                if (n[1] == "bike_rack_locations") {
                    locations.addLayer(L.marker([c.latitude, c.longitude], {icon: bike_rack_locations_icon}).bindPopup(`${c.description}. ${c.street}, ${c.suburb}.`));
                }
                else if (n[1] == "boat_ramp_location") {
                    locations.addLayer(L.marker([c.latitude, c.longitude], {icon: boat_ramp_location_icon}).bindPopup(`${c.description}. ${c.street}, ${c.suburb}.`));  
                }
                else if (n[1] == "free_wifi_location") {
                    locations.addLayer(L.marker([c.latitude, c.longitude], {icon: free_wifi_location_icon}).bindPopup(`${c.description}. ${c.street}, ${c.suburb}.`));  
                }
                else if (n[1] == "park_location") {
                    locations.addLayer(L.marker([c.latitude, c.longitude], {icon: park_location_icon}).bindPopup(`${c.description}. ${c.street}, ${c.suburb}.`));  
                }
                else if (n[1] == "art_location") {
                    locations.addLayer(L.marker([c.latitude, c.longitude], {icon: art_location_icon}).bindPopup(`${c.description}. ${c.street}, ${c.suburb}.`));  
                }
            });
            console.log(`${n[0]}`);
            layerControl.addOverlay(locations, `${n[0]}`);
        })
    });
}

var map = L.map('map').setView([-27.4705,153.0260],12); // setup the map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // base layer, zoom, attribution
    maxZoom: 18,
    minZoom: 0,
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map);

//custom icons
var bike_rack_locations_icon = L.icon({
    iconUrl: 'images/cat-riding-bicycle.png',

    iconSize:     [88, 70], // size of the icon
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var boat_ramp_location_icon = L.icon({
    iconUrl: 'images/cat_boat.png',

    iconSize:     [80, 87], // size of the icon
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var free_wifi_location_icon = L.icon({
    iconUrl: 'images/1000_F_174774450_efETS9ALZgtH8snuOhQsKTuresiE3RwY-removebg-preview.png',

    iconSize:     [100, 100], // size of the icon
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var park_location_icon = L.icon({
    iconUrl: 'images/plant_cat.png',

    iconSize:     [80, 80], // size of the icon
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var art_location_icon = L.icon({
    iconUrl: 'images/cute-cat-simple-illustration-white-background-free-vector-removebg-preview.png',

    iconSize:     [60, 60], // size of the icon
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// L.marker([51.5, -0.09], {icon: bikeIcon}).addTo(map); 

// var debugMarker = L.marker([-27.4584,153.0343]).addTo(map);
// debugMarker.bindPopup("This is where you are right now.")

// var debugCircle = L.circle([-27.3943, 153.1178], {
//     color: '#ADD8E6',
//     fillColor: '#ADD8E6',
//     fillOpacity: '0.25',
//     radius: 2500
// }).addTo(map);
// debugCircle.bindPopup("This is the airport.")

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