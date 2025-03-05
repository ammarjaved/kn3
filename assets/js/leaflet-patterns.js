function generate_patterns_obj(map) {
    var circle_shape = new L.PatternCircle({
        x: 2.5,
        y: 2.5,
        radius: 0.3,
        color: '#000000',
        fill: true
    });
    var circle_pattern = new L.Pattern({width: 5, height: 5});
    circle_pattern.addShape(circle_shape);
    circle_pattern.addTo(map);
    var stripe_pattern_0 = new L.StripePattern({
        //2 stripes defined as color + space
        weight: 4,
        spaceWeight: 4,
        color: '#008000',
        spaceColor: '#DBAF8D',
         spaceOpacity: 0.5,
        angle: 0
    }).addTo(map);
    var stripe_pattern_90 = new L.StripePattern({
        //2 stripes defined as color + space
        weight: 4,
        spaceWeight: 1,
        color: '#008000',
        spaceColor: '#DBAF8D',
        // spaceOpacity: 0.3,
        angle: 90
    }).addTo(map);

    return {
        circle_pattern: circle_pattern,
        stripe_pattern_0: stripe_pattern_0,
        stripe_pattern_90: stripe_pattern_90
    }
}










// $.ajax({
//     url: 'data/area_a.geojson',
//     type: 'GET',
//     success: function (res) {
//         if (typeof res === 'string') {
//             res = JSON.parse(res);
//         }
//         // var lyr = L.vectorGrid.slicer(res, {
//         //     rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
//         //     interactive: true,
//         //     maxNativeZoom: 16,
//         //     vectorTileLayerStyles: {
//         //         sliced: {
//         //             fillPattern: circle_pattern,
//         //             weight: 1,
//         //             fill: true,
//         //             fillColor: '#becf50',
//         //             fillOpacity: 0.5,
//         //             color: '#232323',
//         //         }
//         //     }
//         // }).addTo(map);
//         var lyr = L.geoJSON(res, {
//             style: {
//                 fillPattern: patterns_obj.circle_pattern,
//                 fillColor: '#becf50',
//                 fillOpacity: 0.8,
//                 color: '#232323',
//                 weight: 1,
//             }
//         }).addTo(map);
//     }
// });
// $.ajax({
//     url: 'data/area_b.geojson',
//     type: 'GET',
//     success: function (res) {
//         if (typeof res === 'string') {
//             res = JSON.parse(res);
//         }
//         // var lyr = L.vectorGrid.slicer(res, {
//         //     rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
//         //     interactive: true,
//         //     maxNativeZoom: 16,
//         //     vectorTileLayerStyles: {
//         //         sliced: {
//         //             fillPattern: stripe_pattern_0,
//         //             weight: 1,
//         //             fill: true,
//         //             fillColor: '#becf50',
//         //             fillOpacity: 0.5,
//         //             color: '#232323',
//         //         }
//         //     }
//         // }).addTo(map);
//         var lyr = L.geoJSON(res, {
//             style: {
//                 fillPattern: patterns_obj.stripe_pattern_0,
//                 fillColor: '#becf50',
//                 fillOpacity: 0.5,
//                 color: '#232323',
//                 weight: 1,
//             }
//         }).addTo(map);
//     }
// });