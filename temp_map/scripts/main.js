
var map;
var baseLayers;
var dp;
var selectedId;
var identifyme='';

$(document).ready(function() {
       
    setTimeout(function(){
        map = L.map('map').setView([23.627117361620932,58.19162428379059], 16);
		document.getElementById('map').style.cursor = 'pointer'

        var st=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            //.addTo(map);
        var st1=L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 21,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);


       var customer1 = L.tileLayer.wms("http://3.17.36.216:8080/geoserver/cite/wms", {
            layers: 'cite:alkhoud_plotnumbers',
            format: 'image/png',
			maxZoom: 21,
            transparent: true
        }, {buffer: 10});
        customer1.addTo(map);

        var customer = L.tileLayer.wms("http://3.17.36.216:8080/geoserver/cite/wms", {
            layers: 'cite:alkhoud_plots',
            format: 'image/png',
            maxZoom: 21,
            transparent: true
        }, {buffer: 10});
        customer.addTo(map);
		





        baseLayers = {
            "Street": st,
            "Satellite": st1
        };
		
		
		
        var groupedOverlays = {
            "POI": {
                "plots":customer,
                "plots no":customer1,
            }
        };




        var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
            collapsed: true,
            position: 'topright'
            // groupCheckboxes: true
        }).addTo(map);



    },1000)
});


