var video_geojson = {
    "type": "FeatureCollection",
    "name": "mapqgis",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "name": "סבסטיה", "video_id": "R8yiK-sWCUM" }, "geometry": { "type": "Point", "coordinates": [ 35.1892886, 32.2765727 ] } },
        { "type": "Feature", "properties": { "name": "עצירה אל קבליה", "video_id": "5zN-YWfUGJ8" }, "geometry": { "type": "Point", "coordinates": [ 35.21891518, 32.1741657 ] } },
        { "type": "Feature", "properties": { "name": "ברכת כרמל ", "video_id": "yVdbwlqLDQQ" }, "geometry": { "type": "Point", "coordinates": [ 35.13439969, 31.423709 ] } },
        { "type": "Feature", "properties": { "name": "ואדי אל חומוס", "video_id": "24wUGZaRXfk" }, "geometry": { "type": "Point", "coordinates": [ 35.2550472, 31.7180417 ] } }
    ]
};


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var philosophy_player;


 function playytube(id) {
    philosophy_player = new YT.Player('philosophyVideo_modal', {
        height: ($(window).width()*0.8)*0.56,
        width: $(window).width()*0.8,
        videoId: id,
        playerVars: {
            rel: 0
        },
        events: {
            // onReady: onReadyYT
        }
    });


}

var myIcon = L.icon({
    iconUrl: 'assets/NewPNG/Video_Icon_OP2.svg',
    iconSize: [44, 44],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28],
    className :'iconleaflet'
});

function onEachFeaturevideo(feature, layer) {
    layer.on('click', function (e) {
        // e = event
        console.log(e.target.feature.properties.video_id);
        playytube(e.target.feature.properties.video_id)
        $('#philosophyVideo').modal()

        // You can make your ajax call declaration here
        //$.ajax(...
    });
}


