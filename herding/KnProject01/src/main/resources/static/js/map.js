$(document).ready(function(){
   
$.get("/cargaPuntos",function(data){
    console.log(data)
    data.forEach(element => {
        console.log(element)
    });
  //  const pasedGeoJson = JSON.parse(data);
   // console.log(JSON.parse(data))
    let mymap = L.map('myMap').setView([224540.86418151855, 19.4303341116379], 13);

    const tileProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileProvider, { maxZoom: 18, }).addTo(mymap);
    var geotool = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                224540.86418151855,
                19.4303341116379
              ]
            }
          }
        ]
      };
    L.geoJSON(geotool).addTo(mymap);
   // L.marker([51.5, -0.09]).addTo(mymap).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();


})
 

})