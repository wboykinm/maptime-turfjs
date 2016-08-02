// CONFIGURE THE MAP
let map = L.map('map')
  .setView([42.35070, -71.08102], 15);

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{ 
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>' 
}).addTo(map);

// CONFIGURE THE DRAWING BEHAVIOR AND LAYERS
let featureGroup = L.featureGroup().addTo(map);
let pointLayer;

let drawControl = new L.Control.Draw({
  position: 'topright',
  edit: {
    featureGroup: featureGroup
  },
  draw: {
    polyline: false,
    marker: false,
    circle: false,
    rectangle: false
  }
}).addTo(map);

drawControl.setDrawingOptions({
  polygon: {
    shapeOptions: {
      weight: 0.2,
      opacity: 0.7,
      color: '#e2e3e3',
      fillOpacity: 0
    }
  }
});

map.on('draw:created', function(e) {
  // ADD THE DRAWN LAYER TO THE COLLECTION
  featureGroup.addLayer(e.layer);
  // TURN IT INTO GEOJSON TO USE W/ TURF
  let data = featureGroup.toGeoJSON();
  //LOAD UP SOME STARTER POLYGONS (TODO: pull from google drive)
  for (let j = 0; j < starter.features.length; j++) {
    data.features.push(starter.features[j]);
  }
  // CALCULATE THE BOUNDING BOX TO GENERATE THE GRID
  let bbox = turf.bbox(data);
  // GENERATE THE GRID
  let pointGrid = turf.pointGrid(bbox, 50, 'meters');
  // PREPARE THE DRAWINGS FOR TOPOLOGY TESTS
  let featureUnion = turf.combine(data);
  // CREATE A SHELL GEOJSON FOR THE PROCESSED POINT GRID
  let finalGrid = {"type": "FeatureCollection","features": []};
  // ADD POINTS TO THE GRID ONLY IF THEY OVERLAP A DRAWING
  for (let i = 0; i < pointGrid.features.length; i++) {
    if (turf.inside(pointGrid.features[i], featureUnion.features[0]) == true ) {
      let pointHere = pointGrid.features[i];
      // ITERATE THROUGH THE DRAWINGS, SUMMING UP THE AGREEMENT
      pointHere.properties.drawings = 0;
      for (let d = 0; d < data.features.length; d++) {
        if (turf.inside(pointHere, data.features[d]) == true ) {
          pointHere.properties.drawings++
        }
      }
      finalGrid.features.push(pointHere);
    }
  }
  // SCALE THE POINTS IN THE GRID ACCORDING TO PERCENT AGREEMENT
  let countMin = d3.min(finalGrid.features, function(d) { return d.properties.drawings; });
  let countMax = d3.max(finalGrid.features, function(d) { return d.properties.drawings; });
  // SET A RADIUS BETWEEN 2 AND 10
  let radiusScale = d3.scaleLog()
    .domain([countMin,countMax])
    .range([2,12])
    
  let percentScale = d3.scaleLinear()
    .domain([countMin,countMax])
    .range([0,1])
  
  // ADD THE POINT GRID TO THE MAP (OR REFRESH IT)
  if (map.hasLayer(pointLayer)) {
    map.removeLayer(pointLayer);
  }
  
  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.drawings) {
      layer.bindPopup((Math.floor(percentScale(feature.properties.drawings) * 100)) + '% agreement');
    }
  }
  pointLayer = L.geoJson(finalGrid, {

    style: function (feature) {
      return feature.properties && feature.properties.style;
    },
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      // STYLE THE GRID USING THE AGREEMENT METRICS
      return L.circleMarker(latlng, {
        radius: radiusScale(feature.properties.drawings),
        fillColor: "#E9D03D",
        color: "#E9D03D",
        weight: 0.2,
        opacity: 0.9,
        fillOpacity: percentScale(feature.properties.drawings) - 0.1
      });
    }
  }).addTo(map);

});