//https://heictojpg.com/
let mapContainer;

function setup() {
//createCanvas(400, 400);

  //create map
  mapContainer = new L.map('myMap');
  mapContainer.setView(new L.LatLng(47.497913,19.040236),4);
  //let url = 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
  //let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  let url = 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png'
  //let url = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
  //let url = 'https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png'

  let mapLayer = new L.TileLayer(url);

  //load tilelayer and add to map
  mapContainer.addLayer(mapLayer);

  //load data
  loadJSON('gps_all_jpg_v01.json',readyCallback)
}

// fekete icon
var blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function readyCallback(dataArray){
  console.log(dataArray)
  dataArray.forEach(photo => {
    //console.log(photo)
        
    let photoMarker = new L.marker([photo.GPSLatitude, photo.GPSLongitude], {icon: blackIcon});
    mapContainer.addLayer(photoMarker);

    let pop = new L.popup({minWidth: 200})
    //pop.setContent(photo.FileName + "<img src= photostomap/" + photo.FileName + " WIDTH="+ 200 +" HEIGHT=" + 150 + "/>")
    //pop.setContent("<img src= photostomap/"+photo.FileName+" style='width:auto; height:200px'"+"/>")
    pop.setContent("<img src= photostomap/"+photo.FileName+" style='max-width:100%'"+"/>");
    photoMarker.bindPopup(pop)
    
  })
}