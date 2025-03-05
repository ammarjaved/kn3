var map;
var proxy_url = "services/proxy.php";
var server_url = "http://3.17.36.216";
var currentLanguage = selected_lang_global;
var no_construction_orders = "";
var no_construction_order_not_ab = "";
var expropriation_orders = "";
var expropriation_orders_ab = "";
var seizure = "";
var seizure_ab = "";
var demolitions = "";
var area_b_training = "";
var security_orders = "";
var violation1;
var doa = 0;
var agri = 0;
var road_c = 0;
var setl = 0;
var violation2;
var wmsLayers = [];
var baseLayers;
var ytube_layer;
var geoserver_config = {
    url: "http://localhost:8080/geoserver/",
    namespace: "simca",
};
var poi_cluster_obj = {
    area_b_violations_clusters: L.markerClusterGroup({
        clusterPane: "right_layers",
        showCoverageOnHover: false,
    }),
    area_b_demolitions_clusters: L.markerClusterGroup({
        clusterPane: "right_layers",
        showCoverageOnHover: false,
    }),
};
var data_config_right = {
    area_b_violations: {
        name: language.Area_B_Violations,
        trans_name: "AreaB",
        type: "cluster_new",
        url: "http://3.17.36.216/kn_api/area_b_violations",
        cluster: "area_b_violations_clusters",
        geojson_options: {
            onEachFeature: function(feature, layer) {
                var properties = feature.properties;
                if (language_type == "en") {
                    var category_english =
                        properties.category_english == null ?
                        " " :
                        properties.category_english;
                    var settlement_english =
                        properties.settlement_english == null ?
                        " " :
                        properties.settlement_english;
                    var palestinia_english =
                        properties.palestinia_english == null ?
                        " " :
                        properties.palestinia_english;

                    var html =
                        '<table class="table">' +
                        "<tr><td>category</td><td>" +
                        category_english +
                        "</td></tr>" +
                        "<tr><td>settlement</td><td>" +
                        settlement_english +
                        "</td></tr>" +
                        "<tr><td>palestinia</td><td>" +
                        palestinia_english +
                        "</td></tr>" +
                        "<tr><td>Affected Palestinian Community</td><td>N/A</td></tr>" +
                        "<tr><td>URL</td><td>N/A</td></tr>" +
                        "</table>";
                    layer.bindPopup(html, {
                    });
                }
                if (language_type == "arb") {
                    var category_arabic =
                        properties.category_arabic == null ?
                        " " :
                        properties.category_arabic;
                    var settlement_arabic =
                        properties.settlement_arabic == null ?
                        " " :
                        properties.settlement_arabic;
                    var palestinia_arabic =
                        properties.palestinia_arabic == null ?
                        " " :
                        properties.palestinia_arabic;
                    var html =
                        '<table class="table">' +
                        "<tr><td>الفئة</td><td>" +
                        category_arabic +
                        "</td></tr>" +
                        "<tr><td>مستوطنة</td><td>" +
                        settlement_arabic +
                        "</td></tr>" +
                        "<tr><td>فلسطين العربية</td><td>" +
                        palestinia_arabic +
                        "</td></tr>" +
                        "<tr><td>المجتمع الفلسطيني المتضرر</td><td>N/A</td></tr>" +
                        "<tr><td>URL</td><td>N/A</td></tr>" +
                        "</table>";
                    layer.bindPopup(html, {
                    });
                }
                if (language_type == "heb") {
                    var category_hebrew =
                        properties.category_hebrew == null ?
                        " " :
                        properties.category_hebrew;
                    var settlement_hebrew =
                        properties.settlement_hebrew == null ?
                        " " :
                        properties.settlement_hebrew;
                    var palestinia_hebrew =
                        properties.palestinia_hebrew == null ?
                        " " :
                        properties.palestinia_hebrew;
                    var html =
                        '<table class="table">' +
                        "<tr><td>קטגוריה</td><td>" +
                        category_hebrew +
                        "</td></tr>" +
                        "<tr><td>התנחלויות</td><td>" +
                        settlement_hebrew +
                        "</td></tr>" +
                        "<tr><td>קהילה פלסטינית מושפעת</td><td>" +
                        palestinia_hebrew +
                        "</td></tr>" +
                        "<tr><td></td><td>N/A</td></tr>" +
                        "<tr><td>URL</td><td>N/A</td></tr>" +
                        "</table>";
                    layer.bindPopup(html, {
                    });
                }
                layer.addTo(
                    poi_cluster_obj[data_config_right.area_b_violations.cluster]
                );
            },
            pointToLayer: function(feature, latlng) {
                console.log("features=" + feature);
                if (language_type == "en") {
                    if (
                        feature.properties.classfication_english == "Prevention of Access"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/Icon material-do-not-disturb-on.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else if (
                        feature.properties.classfication_english ==
                        "Settlers Agricultural Takeover"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/Icon awesome-truck-pickup.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else if (
                        feature.properties.classfication_english == "Roads and Construction"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/awesome-road.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else if (
                        feature.properties.classfication_english == "Settler Visit"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/material-group.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else {
                        return L.circleMarker(latlng, {
                            pane: "right_layers",
                            radius: 5,
                            fillColor: "#232323",
                            fillOpacity: 1,
                            color: "#232323",
                            weight: 1,
                        });
                    }
                } else if (language_type == "heb") {
                    if (feature.properties.classfication_hebrew == "מניעת גישה") {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/Icon material-do-not-disturb-on.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else if (
                        feature.properties.classfication_hebrew == "השתלטויות חקלאיות"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/Icon awesome-truck-pickup.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else if (
                        feature.properties.classfication_hebrew == "פריצת דרכים ובנייה"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/awesome-road.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else if (
                        feature.properties.classfication_hebrew == " ביקורי מתנחלים"
                    ) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: "assets/img/material-group.png",
                                iconSize: [24, 28],
                                iconAnchor: [12, 28],
                                popupAnchor: [0, -25],
                            }),
                            pane: "right_layers",
                            riseOnHover: true,
                        });
                    } else {
                        return L.circleMarker(latlng, {
                            pane: "right_layers",
                            radius: 5,
                            fillColor: "#232323",
                            fillOpacity: 1,
                            color: "#232323",
                            weight: 1,
                        });
                    }
                } else if (language_type == "arb") {
                    return L.circleMarker(latlng, {
                        pane: "right_layers",
                        radius: 5,
                        fillColor: "#232323",
                        fillOpacity: 1,
                        color: "#232323",
                        weight: 1,
                    });
                }
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":Area_B",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
    },
    area_b_training: {
        name: "Training",
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/area_b_training",
        geojson_options: {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    pane: "right_layers",
                    radius: 8,
                    fillColor: "#D9E440",
                    fillOpacity: 1,
                    color: "#D9E440",
                    weight: 1,
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" + language.training + "</td></tr></table>", {
                    }
                );
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 2,
                        fill: true,
                        fillColor: "#D9E440",
                        fillOpacity: 0,
                        color: "#D9E440",
                    },
                    sliced: {
                        weight: 2,
                        fill: true,
                        fillColor: "#D9E440",
                        fillOpacity: 0,
                        color: "#D9E440",
                    },
                },
            },
        },
    },
    security_orders: {
        name: "Security",
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/security_orders",
        geojson_options: {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    pane: "right_layers",
                    radius: 8,
                    fillColor: "#FF0000",
                    fillOpacity: 1,
                    color: "#FF0000",
                    weight: 1,
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<table><tr><td>security order</td></tr></table>", {
                });
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 2,
                        fill: true,
                        fillColor: "#D9E440",
                        fillOpacity: 0,
                        color: "#D9E440",
                    },
                    sliced: {
                        weight: 2,
                        fill: true,
                        fillColor: "#D9E440",
                        fillOpacity: 0,
                        color: "#D9E440",
                    },
                },
            },
        },
    },
    area_b_demolitions: {
        name: language.Area_B_Demolities,
        trans_name: "AreaB",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/area_b_demolitions",
        cluster: "area_b_demolitions_clusters",
        geojson_options: {
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" + language.Area_B_Demolities + "</td></tr></table>", {
                    }
                );
            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    pane: "right_layers",
                    radius: 7,
                    fillColor: "#E15989",
                    fillOpacity: 1,
                    color: "#e15989",
                    weight: 1,
                });
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":Area_B",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
    },
    tbl_expropriation_orders_ab: {
        name: language.Expropriation_Orders_AB,
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/expropriation_orders_ab",
        geojson_options: {
            pane: "right_layers",
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" +
                    language.Expropriation_Orders +
                    "</td></tr></table>", {
                    }
                );
            },
            style: {
                fillColor: "#EEBB33",
                fillOpacity: 0.8,
                color: "#EEBB33",
                weight: 1,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 0,
                        fill: true,
                        fillColor: "#EEBB33",
                        fillOpacity: 1,
                        color: "#EEBB33",
                    },
                    sliced: {
                        weight: 0,
                        fill: true,
                        fillColor: "#EEBB33",
                        fillOpacity: 1,
                        color: "#EEBB33",
                    },
                },
            },
        },
    },
    tbl_expropriation_orders: {
        name: language.Expropriation_Orders,
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/expropriation_orders",
        geojson_options: {
            pane: "right_layers",
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" +
                    language.Expropriation_Orders +
                    "</td></tr></table>", {
                        //  className: custom_classname
                    }
                );
            },
            style: {
                fillColor: "#F39F02",
                fillOpacity: 0.5,
                color: "#F39F02",
                weight: 2,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 2,
                        fill: true,
                        fillColor: "#EEBB33",
                        fillOpacity: 0,
                        color: "#EEBB33",
                    },
                    sliced: {
                        weight: 2,
                        fill: true,
                        fillColor: "#EEBB33",
                        fillOpacity: 0,
                        color: "#EEBB33",
                    },
                },
            },
        },
    },
    tbl_no_construction_order: {
        name: language.No_Construction_Order,
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/no_construction_order_ab",
        geojson_options: {
            pane: "right_layers",
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" +
                    language.No_Construction_Order +
                    "</td></tr></table>", {
                    }
                );
            },
            style: {
                fillColor: "#4F1885",
                fillOpacity: 0,
                color: "#4F1885",
                weight: 2,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 2,
                        fill: true,
                        fillColor: "#4F1885",
                        fillOpacity: 0,
                        color: "#4F1885",
                    },
                    sliced: {
                        weight: 2,
                        fill: true,
                        fillColor: "#4F1885",
                        fillOpacity: 0,
                        color: "#4F1885",
                    },
                },
            },
        },
    },
    tbl_no_construction_order_not_ab: {
        name: "tbl_no_construction_order_not_ab",
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/no_construction_order_not_ab",
        geojson_options: {
            pane: "right_layers",
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" +
                    language.No_Construction_Order +
                    "</td></tr></table>", {
                        //  className: custom_classname
                    }
                );
            },
            style: {
                fillColor: "#9B1FE8",
                fillOpacity: 0.5,
                color: "#9B1FE8",
                weight: 2,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 2,
                        fill: true,
                        fillColor: "#4F1885",
                        fillOpacity: 0,
                        color: "#4F1885",
                    },
                    sliced: {
                        weight: 2,
                        fill: true,
                        fillColor: "#4F1885",
                        fillOpacity: 0,
                        color: "#4F1885",
                    },
                },
            },
        },
    },
    tbl_seizure_ab: {
        name: language.Seizure_AB,
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/seizure_ab",
        geojson_options: {
            pane: "right_layers",
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" + language.Seizure + "</td></tr></table>", {
                        //  className: custom_classname
                    }
                );
            },
            style: {
                fillColor: "#F70000",
                fillOpacity: 0.5,
                color: "#F70000",
                weight: 1,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 0,
                        fill: true,
                        fillColor: "#F70000",
                        fillOpacity: 1,
                        color: "#F70000",
                    },
                    sliced: {
                        weight: 0,
                        fill: true,
                        fillColor: "#FD0101",
                        fillOpacity: 1,
                        color: "#F70000",
                    },
                },
            },
        },
    },
    tbl_seizure: {
        name: language.Seizure,
        trans_name: "Areas",
        type: "geojson_vg_new",
        url: "http://3.17.36.216/kn_api/seizure_not_ab",
        geojson_options: {
            pane: "right_layers",
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<table><tr><td>" + language.Seizure + "</td></tr></table>", {
                    }
                );
            },
            style: {
                fillColor: "#AA101C",
                fillOpacity: 0,
                color: "#AA101C",
                weight: 2,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "right_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 2,
                        fill: true,
                        fillColor: "#AB0501",
                        fillOpacity: 0,
                        color: "#AB0501",
                    },
                    sliced: {
                        weight: 2,
                        fill: true,
                        fillColor: "#AB0501",
                        fillOpacity: 0,
                        color: "#AB0501",
                    },
                },
            },
        },
    },
};
var data_config_left = {
    Area_B_Nature_Reserve: {
        name: "Area B Nature Reserve",
        trans_name: "Areas",
        type: "geojson_vg_pattern",
        url: server_url + "/kn_api/area_b_nature_reserve",
        pattern: "stripe_pattern_0",
        geojson_options: {
            pane: "left_layers",
            style: {
                fillColor: "#ffc9a6",
                fillOpacity: 0.5,
                color: "",
                weight: 1,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "left_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 1,
                        fill: true,
                        fillColor: "#4DA244",
                        fillOpacity: 0.5,
                        color: "#4DA244",
                    },
                    sliced: {
                        weight: 1,
                        fill: true,
                        fillColor: "#4DA244",
                        fillOpacity: 0.5,
                        color: "#4DA244",
                    },
                },
            },
        },
    },
    Green_Line: {
        name: "Green Line",
        trans_name: "Areas",
        type: "geojson_vg_pattern",
        url: server_url + "/kn_api/green_line",
        pattern: "circle_pattern",
        geojson_options: {
            pane: "left_layers",
            style: {
                fillColor: "green",
                fillOpacity: 0.5,
                color: "green",
                weight: 8,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "left_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 1,
                        fill: true,
                        fillColor: "green",
                        fillOpacity: 0.5,
                        color: "green",
                    },
                    sliced: {
                        weight: 1,
                        fill: true,
                        fillColor: "green",
                        fillOpacity: 0.5,
                        color: "green",
                    },
                },
            },
        },
    },
    Jerusalem: {
        name: "Jerusalem ",
        trans_name: "Areas",
        type: "geojson_vg_pattern",
        url: server_url + "/kn_api/jerusalem_municipal_border_gis_line",
        pattern: "circle_pattern",
        geojson_options: {
            pane: "left_layers",
            style: {
                fillColor: "yellow",
                fillOpacity: 0.5,
                color: "yellow",
                weight: 1,
            },
        },
        wms: {
            url: geoserver_config.url + geoserver_config.namespace + "/wms",
            gwc_url: geoserver_config.url + geoserver_config.namespace + "/gwc/service/wms",
            wms_options: {
                layers: geoserver_config.namespace + ":a_b_area_itm",
                format: "image/png8",
                transparent: true,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "left_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 1,
                        fill: true,
                        fillColor: "yellow",
                        fillOpacity: 0.5,
                        color: "yellow",
                    },
                    sliced: {
                        weight: 1,
                        fill: true,
                        fillColor: "yellow",
                        fillOpacity: 0.5,
                        color: "yellow",
                    },
                },
            },
        },
    },
    area_b: {
        name: "Area B",
        trans_name: "Areas",
        type: "wms",
        url: server_url + "/kn_api/area_b_poly",
        pattern: "stripe_pattern_0",
        geojson_options: {
            style: {
                fillColor: "#ffc9a6",
                fillOpacity: 0.5,
                color: "",
                weight: 1,
            },
        },
        wms: {
            url: "http://3.17.36.216:8080/geoserver/cite/wms",
            wms_options: {
                layers: "cite:tbl_area_b_poly",
                format: "image/png8",
                transparent: true,
                tileSize: 512,
                zIndex: 10,
                tiled: true,
            },
        },
    },
    area_a: {
        name: "Area A",
        trans_name: "Areas",
        type: "wms",
        url: server_url + "/kn_api/area_a_poly",
        pattern: "circle_pattern",
        geojson_options: {
            style: {
                fillColor: "#e6b396",
                fillOpacity: 0.5,
                color: "",
                weight: 1,
            },
        },
        wms: {
            url: "http://3.17.36.216:8080/geoserver/cite/wms",
            wms_options: {
                layers: "cite:tbl_area_a_poly",
                format: "image/png8",
                transparent: true,
                tileSize: 512,
                zIndex: 10,
                tiled: true,
            },
        },
    },
    Palestinian_Localities_WestBank: {
        name: "Palestinian Localities WestBank",
        trans_name: "Areas",
        type: "wms",
        url: "data/Palestinian_Localities_WestBank_4326.geojson",
        pattern: "",
        geojson_options: {
            style: {
                fillColor: "#b87d73",
                fillOpacity: 0.5,
                color: "#b87d73",
                weight: 1,
            },
        },
        wms: {
            url: "http://3.17.36.216:8080/geoserver/cite/wms",
            wms_options: {
                layers: "cite:palestinian_localities_westbank",
                format: "image/png8",
                transparent: true,
                tileSize: 512,
                opacity: 1,
                zIndex: 10,
                tiled: true,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "left_layers",
                maxNativeZoom: 16,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 1,
                        fill: true,
                        fillColor: "#b87d73",
                        fillOpacity: 0.5,
                        color: "#b87d73",
                    },
                    sliced: {
                        weight: 1,
                        fill: true,
                        fillColor: "#b87d73",
                        fillOpacity: 0.5,
                        color: "#b87d73",
                    },
                },
            },
        },
    },
    Settlements: {
        name: "Settlements",
        trans_name: "Areas",
        type: "wms",
        url: "data/Settlements_4326.geojson",
        pattern: "",
        geojson_options: {
            pane: "left_layers",
            style: {
                fillColor: "#649DC3",
                fillOpacity: 0.5,
                color: "",
                weight: 1,
            },
        },
        wms: {
            url: "http://3.17.36.216:8080/geoserver/cite/wms",
            wms_options: {
                layers: "cite:tbl_settlements",
                format: "image/png8",
                transparent: true,
                tileSize: 512,
                tiled: false,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "left_layers",
                maxNativeZoom: 18,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 1,
                        fill: true,
                        fillColor: "#649DC3",
                        fillOpacity: 0.5,
                        color: "",
                    },
                    sliced: {
                        weight: 1,
                        fill: true,
                        fillColor: "#649DC3",
                        fillOpacity: 0.5,
                        color: "",
                    },
                },
            },
        },
    },
    Settlements_english: {
        name: "Settlements",
        trans_name: "Areas",
        type: "wms",
        url: "data/Settlements_4326.geojson",
        pattern: "",
        geojson_options: {
            pane: "left_layers",
            style: {
                fillColor: "#649DC3",
                fillOpacity: 0.5,
                color: "",
                weight: 1,
            },
        },
        wms: {
            url: "http://3.17.36.216:8080/geoserver/cite/wms",
            wms_options: {
                layers: "cite:settlements_english",
                format: "image/png8",
                transparent: true,
                tileSize: 512,
                tiled: false,
            },
        },
        vg: {
            tile_url: "data/tiles/area_poly/{z}/{x}/{y}.pbf",
            options: {
                rendererFactory: L.svg.tile, // canvas was pixelated with tooltip artifacts
                interactive: true,
                pane: "left_layers",
                maxNativeZoom: 18,
                vectorTileLayerStyles: {
                    area_poly: {
                        weight: 1,
                        fill: true,
                        fillColor: "#649DC3",
                        fillOpacity: 0.5,
                        color: "",
                    },
                    sliced: {
                        weight: 1,
                        fill: true,
                        fillColor: "#649DC3",
                        fillOpacity: 0.5,
                        color: "",
                    },
                },
            },
        },
    },
};
var basemaps = [
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }),
    L.tileLayer("//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png", {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: "abcd",
        label: "Toner Lite", // optional label used for tooltip
    }),
    L.tileLayer("//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png", {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: "abcd",
        label: "Toner",
    }),
    L.tileLayer("//{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png", {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: "abcd",
        label: "Watercolor",
    }),
    L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }),
    L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a> | Map Authored by <a href="https://bazini627.github.io/" target="blank">Matthew Bacinskas</a> | <a href="https://getbounds.com">Malcolm Meyer</a>',
            subdomains: "abcd",
        }
    ),
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }),
    L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }),
    L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }),
    L.tileLayer("http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }),
];
var panes = {
    right_layers: {
        name: "right_layers",
        zIndex: 1002,
    },
    left_layers: {
        name: "left_layers",
        zIndex: 1001,
    },
};
var baseLayers = {};

$(document).ready(function() {
    getLanguage();
    if (currentLanguage == "en") {
        $("#en").css("color", "snow");
    } else if (currentLanguage == "arb") {
        $("#arb").css("color", "snow");
    } else {
        $("#heb").css("color", "snow");
    }
    var map_bounds = [
        [31.12584816072006, 32.62115478515626],
        [32.7872745269555, 37.89184570312501],
    ];
    map = L.map("map", {
        maxBoundsViscocity: 1.0,
        minZoom: 9.3,
        attributionControl: true,
        maxBounds: map_bounds
    });
    map.fitBounds(map_bounds);

   // map.on('drag', function() {
     //   map.panInsideBounds(map_bounds, { animate: false });
    //});

    Object.keys(panes).forEach(function(pane) {
        map.createPane(panes[pane].name);
        map.getPane(panes[pane].name).style.zIndex = panes[pane].zIndex;
    });
    patterns_obj = generate_patterns_obj(map);

    var ai = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
            maxZoom: 16,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/satellite-v9",
            tileSize: 512,
            zoomOffset: -1,
        }
    );

    var st = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Vvc3BhdGlhbHNvbHV0aW9ucyIsImEiOiJja2VwazRubHYwcmdoMnFudGEyMzF5MjdkIn0.Ms5pe0d_UcJ841ICxw2xtQ", {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "geospatialsolutions/ckg9svtq50kqb19qu57uqhjx8",
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(map);

    baseLayers = {
        Street: st,
        satellite: ai,
    };

    var map1 = language.base_map1;
    var map2 = language.base_map2;
    baseLayers = {};
    baseLayers[map1] = ai;
    baseLayers[map2] = st;

    add_left_layers();
});

function add_right_layers() {
    Object.keys(data_config_right).forEach(function(key, i) {
        var lyr_config = data_config_right[key];
        var is_last = false;
        if (i === Object.keys(data_config_right).length - 1) {
            is_last = true;
            rangeSlider();
            translate();
        }
        if (lyr_config.type === "vg") {
            load_vector_grid(lyr_config, key, is_last, true);
        }
        if (lyr_config.type === "geojson_vg") {
            load_vector_grid_from_geojson(lyr_config, key, is_last, true);
        }
        if (lyr_config.type === "cluster") {
            load_poi_cluster_layer(
                lyr_config,
                key,
                is_last,
                poi_cluster_obj[lyr_config.cluster],
                true
            );
        }
        if (lyr_config.type === "cluster_new") {
            load_poi_cluster_layer_new(
                lyr_config,
                key,
                is_last,
                poi_cluster_obj[lyr_config.cluster],
                true
            );
        }
        if (lyr_config.type === "geojson_vg_new") {
            load_geojson_layer_left(
                lyr_config,
                key,
                is_last,
                true,
                poi_cluster_obj[lyr_config.cluster]
            );
        }
    });
}

function load_geojson_layer_left(
    lyr_config,
    lyr_key,
    is_last,
    generate_ui,
    cluster
) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }
            if (lyr_key == "tbl_no_construction_order") {
                no_construction_orders = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "tbl_no_construction_order_not_ab") {
                no_construction_order_not_ab = L.geoJSON(
                    res,
                    lyr_config.geojson_options
                );
            }
            if (lyr_key == "tbl_expropriation_orders") {
                expropriation_orders = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "tbl_expropriation_orders_ab") {
                expropriation_orders_ab = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "tbl_seizure_ab") {
                seizure_ab = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "tbl_seizure") {
                seizure = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "area_b_training") {
                area_b_training = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "security_orders") {
                security_orders = L.geoJSON(res, lyr_config.geojson_options);
            }
            if (lyr_key == "area_b_demolitions") {
                demolitions = L.geoJSON(res, lyr_config.geojson_options);
            }
        },
    });
}

var layer_status = true;

function addAndRemoveLayer(layer, id) {
    if ($("#" + id).prop("checked") == true) {
        map.addLayer(layer);
        $('#fa-' + id).css("display", "none");
    } else if ($("#" + id).prop("checked") == false) {
        map.removeLayer(layer);
        $('#fa-' + id).css("display", "initial");
    }
}

var groupedOverlays = {
    POI: {
    },
};

function add_left_layers() {
    Object.keys(data_config_left).forEach(function(key, i) {
        var lyr_config = data_config_left[key];
        var is_last = false;
        if (i === Object.keys(data_config_left).length - 1) {
            is_last = true;
            rangeSlider();
            translate();
            add_right_layers();
        }
        if (lyr_config.type === "geojson_vg_pattern") {
            load_geojson_layer_with_pattern(lyr_config, key, is_last, false);
        }
        if (lyr_config.type === "wms") {
            load_wms_layer(lyr_config, key, is_last, false);
        }
        if (lyr_config.type === "geojson_vg") {
            load_vector_grid_from_geojson(lyr_config, key, is_last, false);
        }
        if (lyr_config.type === "geojson") {
            load_geojson_layer(lyr_config, key, is_last, false);
        }
    });

    ytube_layer = L.geoJSON(video_geojson, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, { icon: myIcon });
        },
        onEachFeature: onEachFeaturevideo
    }).addTo(map);

    setTimeout(function() {
        ytube_layer.bringToFront();
    }, 3000)

}

function translate() {
    $("[data-translate]").each(function() {
        var key = $(this).data("translate");
        console.log(key);
        console.log(language[key]);
        $(this).html(language[key]);
    });
}

function load_geojson_layer(lyr_config, lyr_key, is_last, generate_ui) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }
            var lyr = L.geoJSON(res, lyr_config.geojson_options);
            lyr.addTo(map);
            groupedOverlays.POI[
                currentLanguage == "en" ?
                '<span style="color: #649DC3;">▉</span>' + language.Settlements :
                '<span style="color: #649DC3;float:right">▉</span>' +
                '<span style="float:right">&nbsp' +
                language.Settlements +
                "&nbsp</span>"
            ] = lyr;

            lyr_config.actual_lyr = lyr;
            if (generate_ui) {
                var html_lyr_config_obj = {
                    name: lyr_config.name,
                    trans_name: lyr_config.trans_name,
                    opacity: 1,
                };
                generate_layer_html(html_lyr_config_obj, lyr_key, lyr);
            }
            if (is_last) {
                map.fitBounds(lyr.getBounds());
            }
        },
    });
}

function load_poi_cluster_layer(
    lyr_config,
    lyr_key,
    is_last,
    poi_clusters,
    generate_ui
) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }

            var lyr = L.geoJSON(res, lyr_config.geojson_options);
            poi_clusters.addTo(map);
            poi_clusters.disableClustering();

            lyr_config.actual_lyr = poi_clusters;
            if (generate_ui) {
                var html_lyr_config_obj = {
                    name: lyr_config.name,
                    trans_name: lyr_config.trans_name,
                    opacity: 1,
                };
                generate_layer_html(html_lyr_config_obj, lyr_key, poi_clusters);
            }
            if (is_last) {
                map.fitBounds(lyr.getBounds());
            }
        },
    });
}

function load_poi_cluster_layer_new(
    lyr_config,
    lyr_key,
    is_last,
    poi_clusters,
    generate_ui
) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }
            violation1 = L.geoJson(res, {
                    onEachFeature: function(feature, layer) {
                        var properties = feature.properties;

                        if (language_type == "en") {
                            var category_english =
                                properties.cat_eng == null ? " " : properties.cat_eng;
                            var settlement_english =
                                properties.set_eng == null ? " " : properties.set_eng;
                            var palestinia_english =
                                properties.pal_eng == null ? " " : properties.pal_eng;
                            var link1 = properties.art_eng == null ? " " : properties.art_eng;
                            var link2 = properties.titt_eng == null ? " " : properties.titt_eng;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px;" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div">' +
                                "<p>" +
                                category_english +
                                "<br />" +
                                "<b>" +
                                language.Settlements +
                                "</b>:" +
                                settlement_english +
                                "<br />" +
                                "<b>" +
                                language.apc +
                                "</b>:" +
                                palestinia_english +
                                "<br />" +
                                "</p>" +
                                "</div>";
                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                         str +
                                            '<div class="popupcontentDiv">' +

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>';
1
                                    }
                                    str =
                                         str + '<div class="popuptwitterDiv">' +
                                            '<div class="popuptwittersubDiv">' +
                                            '<div class="col-md-12 leaflet-popup-content-fb">' +
                                            '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.photoid +
                                            '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.photoid +
                                            '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                            "</div>" +
                                            '<div class="col-md-12 leaflet-popup-content-tw">' +
                                            '<a target="_blank" class=" twitter-share-button"' +
                                            '  href="https://twitter.com/intent/tweet?text=' +
                                            twitter_url +
                                            '"' +
                                            " >" +
                                            '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                            "</div>" +
                                            "</div>" +
                                            "</div>";
                                            str =
                                                str + '<div class="popupimgDiv">' +
                                                    '<div class="slideshow-container">';
                                    if (images.length > 0) {
                                            str =
                                                str + '<div class="popupimgDiv">' +
                                                    '<div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div></div>";

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>';

                                    }
                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12">' +
                                        "<p>" +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p>" +
                                        "</div>" +
                                        "</div>" +
                                        ' <h4 style="text-align: center;margin-bottom: 0px!important;background-color: #F7B538;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class1 +

                                        "</h4><div class='Denial-triangle'></div></div>";


                                    //console.log(properties.fid+","+layer._latlng.lat+","+layer._latlng.lng);
                                    // '<table class="table">' +
                                    // '<tr><td><b>category</b></td><td>'+language.violation_class1+'</td>' +
                                    // '<td><b>settlement</b></td><td>'+settlement_english+'</td>' +
                                    // '<td><b>palestinia</b></td><td>'+palestinia_english+'</td></tr>' +
                                    // '<tr><td>Affected Palestinian Community</td><td>N/A</td></tr>' +
                                    // '<tr><td>URL</td><td>http://3.17.36.216/index.php?lat='+layer._latlng.lat+'&lng='+layer._latlng.lng+'&fid='+properties.fid+'</td></tr>' +
                                    // '</table>';
                                    // </div>';

                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "arb") {
                            var category_arabic =
                                properties.cat_arb == null ? " " : properties.cat_arb;
                            var settlement_arabic =
                                properties.set_arb == null ? " " : properties.set_arb;
                            var palestinia_arabic =
                                properties.pal_arb == null ? " " : properties.pal_arb;
                            var link1 = properties.art_arb == null ? " " : properties.art_arb;
                            var link2 = properties.titt_arb == null ? " " : properties.titt_arb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px;" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div" style="float: right;">' +
                                '<p style="float: right;">' +
                                category_arabic +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.Settlements +
                                "</b>" +
                                settlement_arabic +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_arabic +
                                "<br />" +
                                "</p>" +
                                "</div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div  class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }
                                        str = str + "</div></div>";
                                    }
                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        '<div class="popuptwitterDiv">' +
                                        '<div class="popuptwittersubDiv">' +
                                        '<div class="col-md-12 leaflet-popup-content-fb">' +
                                        '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                        "</div>" +
                                        '<div class="col-md-12 leaflet-popup-content-tw">' +
                                        '<a target="_blank" class=" twitter-share-button"' +
                                        'href="https://twitter.com/intent/tweet?text=' +
                                        twitter_url +
                                        '"' +
                                        " >" +
                                        '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                        "</div>" +
                                        '<div style="padding-top: 10px;" class="link_div">' +
                                        '<div class="col-md-12">' +
                                        "<p>" +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "<br />" +
                                        "</p>" +
                                        "</div>" +
                                        "</div>" +
                                        '<h4 style="text-align: center;margin-bottom: 0px!important;background-color:#F7B538;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class1 +
                                        "</h4><div class='Denial-triangle'></div></div>";

                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "heb") {
                            var category_hebrew =
                                properties.cat_heb == null ? " " : properties.cat_heb;
                            var settlement_hebrew =
                                properties.set_heb == null ? " " : properties.set_heb;
                            var palestinia_hebrew =
                                properties.pal_heb == null ? " " : properties.pal_heb;
                            var link1 = properties.art_heb == null ? " " : properties.art_heb;
                            var link2 = properties.titt_heb == null ? " " : properties.titt_heb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px;" class="container-fluid">' +
                                '<div style="float: right;" class="col-md-12 container-fluid-title-div">' +
                                '<p style="float: right;">' +
                                category_hebrew +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.Settlements +
                                "</b>" +
                                settlement_hebrew +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_hebrew +
                                "<br />" +
                                "</p>" +
                                "</div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }
                                        str = str + "</div></div>";
                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        '<div class="popuptwitterDiv">' +
                                        '<div class="popuptwittersubDiv">' +
                                        '<div class="col-md-12 leaflet-popup-content-fb">' +
                                        '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                        "</div>" +
                                        '<div class="col-md-12 leaflet-popup-content-tw">' +
                                        '<a target="_blank" class=" twitter-share-button"' +
                                        '  href="https://twitter.com/intent/tweet?text=' +
                                        twitter_url +
                                        '"' +
                                        " >" +
                                        '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                        "</div>" +
                                        '<div style="padding-top: 10px;" class="link_div">' +
                                        '<div class="col-md-12">' +
                                        '<p style="float: right;">' +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color: #F7B538;color:snow;border-radius: 5px 5px 0px 0px;" >' +
                                        language.violation_class1 +
                                        "</h4><div class='Denial-triangle'></div></div>";
                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                    },
                    pointToLayer: function(feature, latlng) {
                        if (language_type == "en") {
                            if (feature.properties.categoryid == "0") {
                                doa++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/Icon material-do-not-disturb-on.png",
                                        iconSize: [19.69, 19.69],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),

                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "heb") {
                            if (feature.properties.categoryid == "0") {
                                doa++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/Icon material-do-not-disturb-on.png",
                                        iconSize: [19.69, 19.69],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "arb") {
                            if (feature.properties.categoryid == "0") {
                                doa++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/Icon material-do-not-disturb-on.png",
                                        iconSize: [19.69, 19.69],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                    },
                })

            setTimeout(function() {
                $("#checkmarkNoViolation1").append(
                    '<span class="badge badge-danger" ' +
                    'style="position: absolute;padding: 4px 0px 0px 4px;">' +
                    doa +
                    "</span>"
                );
            }, 3000);

            violation2 = L.geoJson(res, {
                    onEachFeature: function(feature, layer) {
                        var properties = feature.properties;
                        if (language_type == "en") {
                            var category_english =
                                properties.cat_eng == null ? " " : properties.cat_eng;
                            var settlement_english =
                                properties.set_eng == null ? " " : properties.set_eng;
                            var palestinia_english =
                                properties.pal_eng == null ? " " : properties.pal_eng;
                            var link1 = properties.art_eng == null ? " " : properties.art_eng;
                            var link2 = properties.titt_eng == null ? " " : properties.titt_eng;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div">' +
                                "<p>" +
                                "<b>" +
                                language.Settlements +
                                "</b>:" +
                                settlement_english +
                                "<br />" +
                                "<b>" +
                                language.apc +
                                "</b>:" +
                                palestinia_english +
                                "<br />" +
                              //  '<a href="' +
                               // link1 +
                                //'">' +
                              //  link2 +
                              //  "</a>" +
                                "</p></div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">' +

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popuptwitterDiv">' +
                                            '<div class="popuptwittersubDiv">' +
                                            '<div class="col-md-12 leaflet-popup-content-fb">' +
                                            '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                            "</div>" +
                                            '<div class="col-md-12 leaflet-popup-content-tw">' +
                                            '<a target="_blank" class=" twitter-share-button"' +
                                            'href="https://twitter.com/intent/tweet?text=' +
                                            twitter_url +
                                            '"' +
                                            " >" +
                                            '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                            "</div>" +
                                            "</div>" +
                                            "</div>" +
                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }
                                        str = str + "</div></div>";
                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p>' +
                                        '<a href="' +
                                        link1 +
                                        '">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color:#FF8838;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class2 +
                                        "</h4><div class='Agr-triangle'></div></div>";
                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "arb") {
                            var category_arabic =
                                properties.cat_arb == null ? " " : properties.cat_arb;
                            var settlement_arabic =
                                properties.set_arb == null ? " " : properties.set_arb;
                            var palestinia_arabic =
                                properties.pal_arb == null ? " " : properties.pal_arb;
                            var link1 = properties.art_arb == null ? " " : properties.art_arb;
                            var link2 = properties.titt_arb == null ? " " : properties.titt_arb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px" class="container-fluid">' +
                                '<di style="float: right;" class="col-md-12 container-fluid-title-div">' +
                                '<p style="float: right;">' +
                                category_arabic +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.Settlements +
                                "</b>" +
                                settlement_arabic +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_arabic +
                                "<br />" +
                                "</p></div>";
                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div></div>";
                                    }
                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        '<div class="popuptwitterDiv">' +
                                        '<div class="popuptwittersubDiv">' +
                                        '<div class="col-md-12 leaflet-popup-content-fb">' +
                                        '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                        "</div>" +
                                        '<div class="col-md-12 leaflet-popup-content-tw">' +
                                        '<a target="_blank" class=" twitter-share-button"' +
                                        'href="https://twitter.com/intent/tweet?text=' +
                                        twitter_url +
                                        '"' +
                                        " >" +
                                        '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p>' +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color:#FF8838;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class2 +
                                        "</h4><div class='Agr-triangle'></div></div>";
                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "heb") {
                            var category_hebrew =
                                properties.cat_heb == null ? " " : properties.cat_heb;
                            var settlement_hebrew =
                                properties.set_heb == null ? " " : properties.set_heb;
                            var palestinia_hebrew =
                                properties.pal_heb == null ? " " : properties.pal_heb;
                            var link1 = properties.art_heb == null ? " " : properties.art_heb;
                            var link2 = properties.titt_heb == null ? " " : properties.titt_heb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px" class="container-fluid">' +
                                '<div style="float: right;" class="col-md-12 container-fluid-title-div"><p style="float: right;">' +
                                category_hebrew +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.Settlements +
                                "</b>" +
                                settlement_hebrew +
                                "<br />" +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_hebrew +
                                "<br />" +
                                '<a href="' +
                                link1 +
                                '" target="_blank">' +
                                link2 +
                                "</a>" +
                                "</p></div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div></div>";

                                        var twitter_url = encodeURIComponent(
                                            "http://3.17.36.216/index.php?" +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.photoid
                                        );

                                        var html =
                                            str +
                                            '<div class="popuptwitterDiv">' +
                                            '<div class="popuptwittersubDiv">' +
                                            '<div class="col-md-12 leaflet-popup-content-fb">' +
                                            '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                            "</div>" +
                                            '<div class="col-md-12 leaflet-popup-content-tw">' +
                                            '<a target="_blank" class=" twitter-share-button"' +
                                            'href="https://twitter.com/intent/tweet?text=' +
                                            twitter_url +
                                            '"' +
                                            " >" +
                                            '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                            "</div>" +
                                            "</div>" +
                                            "</div>" +

                                            // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                            "</div>" +
                                            '<div style="padding-top: 10px" class="link_div">' +
                                            '<div class="col-md-12"><p style="float: right;">' +
                                            '<a href="' +
                                            link1 +
                                            '" target="_blank">' +
                                            link2 +
                                            "</a>" +
                                            "</p></div>" +
                                            '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color: #FF8838;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                            language.violation_class2 +

                                            "</h4><div class='Agr-triangle'></div></div>";

                                        //'<div>'+str+'<table dir="rtl" class="table">' +
                                        //'<tr><td>'+category_hebrew+'</td><td>קטגוריה</td></tr>' +
                                        //'<tr><td>'+settlement_hebrew+'</td><td>התנחלויות</td></tr>' +
                                        //'<tr><td>'+palestinia_hebrew+'</td><td>קהילה פלסטינית מושפעת</td></tr>' +
                                        //'<tr><td>N/A</td><td>URL</td></tr>' +
                                        //'</table>';

                                        layer.bindPopup(html, {
                                        });
                                    }
                                },
                            });
                        }
                    },
                    pointToLayer: function(feature, latlng) {
                        if (language_type == "en") {
                            if (feature.properties.categoryid == "1") {
                                agri++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/Icon awesome-truck-pickup.png",
                                        iconSize: [29.53, 20.67],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),

                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "heb") {
                            if (feature.properties.categoryid == "1") {
                                agri++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/Icon awesome-truck-pickup.png",
                                        iconSize: [29.53, 20.67],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "arb") {
                            if (feature.properties.categoryid == "1") {
                                agri++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/Icon awesome-truck-pickup.png",
                                        iconSize: [29.53, 20.67],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                    },
                })
            setTimeout(function() {
                $("#checkmarkNoViolation2").append(
                    '<span style="position: absolute;' +
                    'padding: 4px 0px 0px 8px;" class="badge badge-danger" style="">' +
                    agri +
                    "</span>"
                );
            }, 3000);
            violation3 = L.geoJson(res, {
                    onEachFeature: function(feature, layer) {
                        var properties = feature.properties;
                        if (language_type == "en") {
                            var category_english =
                                properties.cat_eng == null ? " " : properties.cat_eng;
                            var settlement_english =
                                properties.set_eng == null ? " " : properties.set_eng;
                            var palestinia_english =
                                properties.pal_eng == null ? " " : properties.pal_eng;
                            var link4 = properties.art_eng == null ? " " : properties.art_eng;
                            var link5 = properties.titt_eng == null ? " " : properties.titt_eng;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px;" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div"><p>' +
                                // category_english +
                                // "<br />" +
                                // "<b>" +
                                // language.Settlements +
                                // "</b>:" +
                                // settlement_english +
                                // "<br />" +
                                "<b>" +
                                language.apc +
                                "</b>:" +
                                palestinia_english +
                                "<br />" +
                                "</p></div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +

                                            '<div class="popupcontentDiv">';

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>';

                                    }
                                    str=
                                        str + '<div  class="popuptwitterDiv">' +
                                            '<div  class="popuptwittersubDiv">' +
                                            '<div class="col-md-12 leaflet-popup-content-fb">' +
                                            '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                            "</div>" +
                                            '<div class="col-md-12 leaflet-popup-content-tw">' +
                                            '<a target="_blank" class=" twitter-share-button"' +
                                            'href="https://twitter.com/intent/tweet?text=' +
                                            twitter_url +
                                            '"' +
                                            " >" +
                                            '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                            "</div>" +
                                            "</div>" +
                                            "</div>";
                                    if (images.length > 0) {
                                        str=
                                        str + '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div></div>";

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>';

                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p>' +
                                        '<a href="' +
                                        link4 +
                                        '" target="_blank">' +
                                        link5 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color:#C32F27;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class3 +
                                        "</h4><div class='Road-triangle'></div></div>";

                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "arb") {
                            var category_arabic =
                                properties.cat_arb == null ? " " : properties.cat_arb;
                            var settlement_arabic =
                                properties.set_arb == null ? " " : properties.set_arb;
                            var palestinia_arabic =
                                properties.pal_arb == null ? " " : properties.pal_arb;
                            var link1 = properties.art_arb == null ? " " : properties.art_arb;
                            var link2 = properties.titt_arb == null ? " " : properties.titt_arb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px" class="container-fluid">' +
                                '<div style="float: right;" class="col-md-12 container-fluid-title-div">' +
                                '<p style="float: right;">' +
                                // category_arabic +
                                // "<br />" +
                                // "<b style='float: right'>:" +
                                // settlement_arabic +
                                // "</b>" +
                                // language.Settlements +
                                // "<br />" +
                                "<b style='float: right'>:" +
                                palestinia_arabic +
                                "</b>" +
                                language.apc +
                                "<br />" +
                                "</p></div>";
                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }
                                        str = str + "</div></div>";
                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        '<div class="popuptwitterDiv">' +
                                        '<div  class="popuptwittersubDiv">' +
                                        '<div class="col-md-12">' +
                                        '<div class="fb-share-button leaflet-popup-content-fb" data-href="http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                        "</div>" +
                                        '<div class="col-md-12">' +
                                        '<a target="_blank" class=" twitter-share-button"' +
                                        '  href="https://twitter.com/intent/tweet?text=' +
                                        twitter_url +
                                        '"' +
                                        " >" +
                                        '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p style="float: right;">' +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color:#C32F27;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class3 +
                                        "</h4><div class='Road-triangle'></div></div>";
                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "heb") {
                            var category_hebrew =
                                properties.cat_heb == null ? " " : properties.cat_heb;
                            var settlement_hebrew =
                                properties.set_heb == null ? " " : properties.set_heb;
                            var palestinia_hebrew =
                                properties.pal_heb == null ? " " : properties.pal_heb;
                            var link1 = properties.art_heb == null ? " " : properties.art_heb;
                            var link2 = properties.titt_heb == null ? " " : properties.titt_heb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div" style="float: right;">' +
                                '<p style="float: right">' +
                                // category_hebrew +
                                // "<br />" +
                                // "<b style='float: right'>:" +
                                // language.Settlements +
                                // "</b>" +
                                // settlement_hebrew +
                                // "<br />" +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_hebrew +
                                "<br />" +
                                "</p>" +
                                "</div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br/>" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div></div>";

                                        var twitter_url = encodeURIComponent(
                                            "http://3.17.36.216/index.php?" +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.photoid
                                        );
                                        var html =
                                            str +
                                            '<div class="popuptwitterDiv">' +
                                            '<div  class="popuptwittersubDiv">' +
                                            '<div class="col-md-12 leaflet-popup-content-fb">' +
                                            '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                            "</div>" +
                                            '<div class="col-md-12 leaflet-popup-content-tw">' +
                                            '<a target="_blank" class=" twitter-share-button"' +
                                            '  href="https://twitter.com/intent/tweet?text=' +
                                            twitter_url +
                                            '"' +
                                            " >" +
                                            '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                            "</div>" +
                                            "</div>" +
                                            "</div>" +

                                            // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +

                                            "</div>" +
                                            '<div style="padding-top: 10px" class="link_div">' +
                                            '<div class="col-md-12"><p>' +
                                            '<a href="' +
                                            link1 +
                                            '" target="_blank">' +
                                            link2 +
                                            "</a>" +
                                            "<br />" +
                                            "</p></div>" +
                                            '</div><h4 style="text-align: center;margin-bottom: 0px!important;background-color:#C32F27;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                            language.violation_class3 +
                                            "</h4><div class='Road-triangle'></div></div>";
                                        layer.bindPopup(html, {
                                        });
                                    }
                                },
                            });
                        }
                    },
                    pointToLayer: function(feature, latlng) {
                        if (language_type == "en") {
                            if (feature.properties.categoryid == "2") {
                                road_c++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/awesome-road.png",
                                        iconSize: [26.58, 17.72],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "heb") {
                            if (feature.properties.categoryid == "2") {
                                road_c++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/awesome-road.png",
                                        iconSize: [26.58, 17.72],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "arb") {
                            if (feature.properties.categoryid == "2") {
                                road_c++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/awesome-road.png",
                                        iconSize: [26.58, 17.72],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),

                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                    },
                })

            setTimeout(function() {
                $("#checkmarkNoViolation3").append(
                    '<span  style="position: absolute;' +
                    'padding: 4px 0px 0px 8px;"  class="badge badge-danger">' +
                    road_c +
                    "</span>"
                );
            }, 3000);
            violation4 = L.geoJson(res, {
                    onEachFeature: function(feature, layer) {
                        var properties = feature.properties;
                        if (language_type == "en") {
                            var category_english =
                                properties.cat_eng == null ? " " : properties.cat_eng;
                            var settlement_english =
                                properties.set_eng == null ? " " : properties.set_eng;
                            var palestinia_english =
                                properties.pal_eng == null ? " " : properties.pal_eng;
                            var link1 = properties.art_eng == null ? " " : properties.art_eng;
                            var link2 = properties.titt_eng == null ? " " : properties.titt_eng;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div"><p>' +
                                "<b>" +
                                language.apc +
                                "</b>:" +
                                palestinia_english +
                                "<br />" +
                                '<a href="' +
                                link1 +
                                '" target="_blank">' +
                                link2 +
                                "</a>" +
                                "</p></div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +

                                            '<div class="popupcontentDiv">';
                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>';

                                    }
                                    str=
                                        str + '<div class="popuptwitterDiv">' +
                                            '<div class="popuptwittersubDiv">' +
                                            '<div class="col-md-3 leaflet-popup-content-fb">' +
                                            '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                            "lat=" +
                                            layer._latlng.lat +
                                            "&lng=" +
                                            layer._latlng.lng +
                                            "&fid=" +
                                            properties.fid +
                                            '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                            "</div>" +
                                            '<div class="col-md-3 leaflet-popup-content-tw">' +
                                            '<a target="_blank" class=" twitter-share-button"' +
                                            'href="https://twitter.com/intent/tweet?text=' +
                                            twitter_url +
                                            '"' +
                                            " >" +
                                            '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                            "</div>" +
                                            "</div>" +
                                            "</div>";
                                    if (images.length > 0) {
                                            str =
                                            str + '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div></div>";

                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>';

                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p>' +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 class="entestclass" style="text-align: center;margin-bottom: 0px!important;background-color:#780116;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class4 +

                                        "</h4><div class='Settler-triangle'></div></div>";

                                    //'<div>'+str+'<table class="table">' +
                                    //'<tr><td>category</td><td>'+category_english+'</td></tr>' +
                                    //'<tr><td>settlement</td><td>'+settlement_english+'</td></tr>' +
                                    //'<tr><td>palestinia</td><td>'+palestinia_english+'</td></tr>' +
                                    //'<tr><td>Affected Palestinian Community</td><td>N/A</td></tr>' +
                                    //'<tr><td>URL</td><td>N/A</td></tr>' +
                                    //'</table>';

                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
             if (language_type == "arb") {
                            var category_arabic =
                                properties.cat_arb == null ? " " : properties.cat_arb;
                            var settlement_arabic =
                                properties.set_arb == null ? " " : properties.set_arb;
                            var palestinia_arabic =
                                properties.pal_arb == null ? " " : properties.pal_arb;
                            var link1 = properties.art_arb == null ? " " : properties.art_arb;
                            var link2 = properties.titt_arb == null ? " " : properties.titt_arb;
                                var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px;" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div" style="float: right;"><p style="float: right;">' +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_arabic +
                                "<br />" +
                                '<a href="' +
                                link1 +
                                '" target="_blank">' +
                                link2 +
                                "</a>" +
                                "</p></div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div>"+
                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +
                                        "</div>";

                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        '<div  class="popuptwitterDiv">' +
                                        '<div class="popuptwittersubDiv">' +
                                        '<div class="col-md-12 leaflet-popup-content-fb">' +
                                        '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                        "</div>" +
                                        '<div class="col-md-12 leaflet-popup-content-tw">' +
                                        '<a target="_blank" class=" twitter-share-button"' +
                                        'href="https://twitter.com/intent/tweet?text=' +
                                        twitter_url +
                                        '"' +
                                        " >" +
                                        '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p style="float: right;">' +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 class="hebtestclass" style="text-align: center;margin-bottom: 0px!important;background-color: #780116;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class4 +

                                        "</h4><div class='Settler-triangle'></div></div>";

                                    //'<div>'+str+'<table dir="rtl" class="table">' +
                                    //'<tr><td>'+category_hebrew+'</td><td>קטגוריה</td></tr>' +
                                    //'<tr><td>'+settlement_hebrew+'</td><td>התנחלויות</td></tr>' +
                                    //'<tr><td>'+palestinia_hebrew+'</td><td>קהילה פלסטינית מושפעת</td></tr>' +
                                    //'<tr><td>N/A</td><td>URL</td></tr>' +
                                    //'</table>';

                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                        if (language_type == "heb") {
                            var category_hebrew =
                                properties.cat_heb == null ? " " : properties.cat_heb;
                            var settlement_hebrew =
                                properties.set_heb == null ? " " : properties.set_heb;
                            var palestinia_hebrew =
                                properties.pal_heb == null ? " " : properties.pal_heb;
                            var link1 = properties.art_heb == null ? " " : properties.art_heb;
                            var link2 = properties.titt_heb == null ? " " : properties.titt_heb;
                            var str =
                                '<div style="min-width: 300px;max-width: none;padding-bottom:0px;" class="container-fluid">' +
                                '<div class="col-md-12 container-fluid-title-div" style="float: right;"><p style="float: right;">' +
                                "<b style='float: right'>:" +
                                language.apc +
                                "</b>" +
                                palestinia_hebrew +
                                "<br />" +
                                '<a href="' +
                                link1 +
                                '" target="_blank">' +
                                link2 +
                                "</a>" +
                                "</p></div>";

                            $.ajax({
                                url: "/getimages.php?id=" + properties.picture_id,
                                type: "GET",
                                success: function(res) {
                                    var images = JSON.parse(res);
                                    if (images.length > 0) {
                                        str =
                                            str +
                                            '<div class="popupcontentDiv">'+

                                            // '<div class="popupprev"><a class="prev" onclick="plusSlides(-1)">&#10094;</a></div>' +

                                            '<div class="popupimgDiv"><div class="slideshow-container">';
                                        for (var i = 0; i < images.length; i++) {
                                            if (i == 0) {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display: block">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            } else {
                                                str =
                                                    str +
                                                    '<div class="mySlides" style="display:none;">' +
                                                    '<a href="' +
                                                    images[i] +
                                                    '" data-lightbox="example-set" data-title="My caption"><img src="' +
                                                    images[i] +
                                                    '" style="width:100%"></a>' +
                                                    "</div>";
                                            }
                                        }
                                        str =
                                            str +
                                            "</div><br />" +
                                            '<div style="text-align:center">';
                                        for (var j = 0; j < images.length; j++) {
                                            var sum = j + 1;
                                            str =
                                                str +
                                                '<span class="dot" onclick="currentSlide(' +
                                                sum +
                                                ')"></span>';
                                        }

                                        str = str + "</div>"+
                                        // '<div class="popupnext"><a class="next" onclick="plusSlides(1)">&#10095;</a></div>' +
                                        "</div>";

                                    }

                                    var twitter_url = encodeURIComponent(
                                        "http://3.17.36.216/index.php?" +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.photoid
                                    );
                                    var html =
                                        str +
                                        '<div  class="popuptwitterDiv">' +
                                        '<div class="popuptwittersubDiv">' +
                                        '<div class="col-md-12 leaflet-popup-content-fb">' +
                                        '<div class="fb-share-button" data-href="http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://3.17.36.216/index.php?' +
                                        "lat=" +
                                        layer._latlng.lat +
                                        "&lng=" +
                                        layer._latlng.lng +
                                        "&fid=" +
                                        properties.fid +
                                        '" class="fb-xfbml-parse-ignore"><img src="assets/img/facebook-logo-in-circular-button-outlined-social-symbol.png" width="10px" height="18px"></a></div>' +
                                        "</div>" +
                                        '<div class="col-md-12 leaflet-popup-content-tw">' +
                                        '<a target="_blank" class=" twitter-share-button"' +
                                        'href="https://twitter.com/intent/tweet?text=' +
                                        twitter_url +
                                        '"' +
                                        " >" +
                                        '<img src="assets/img/twitter-circular-button.png" width="18px" height="15px"></a>' +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        '<div style="padding-top: 10px" class="link_div">' +
                                        '<div class="col-md-12"><p style="float: right;">' +
                                        '<a href="' +
                                        link1 +
                                        '" target="_blank">' +
                                        link2 +
                                        "</a>" +
                                        "</p></div>" +
                                        '</div><h4 class="hebtestclass" style="text-align: center;margin-bottom: 0px!important;background-color: #780116;color:snow;border-radius: 5px 5px 0px 0px;">' +
                                        language.violation_class4 +

                                        "</h4><div class='Settler-triangle'></div></div>";

                                    //'<div>'+str+'<table dir="rtl" class="table">' +
                                    //'<tr><td>'+category_hebrew+'</td><td>קטגוריה</td></tr>' +
                                    //'<tr><td>'+settlement_hebrew+'</td><td>התנחלויות</td></tr>' +
                                    //'<tr><td>'+palestinia_hebrew+'</td><td>קהילה פלסטינית מושפעת</td></tr>' +
                                    //'<tr><td>N/A</td><td>URL</td></tr>' +
                                    //'</table>';

                                    layer.bindPopup(html, {
                                    });
                                },
                            });
                        }
                    },
                    pointToLayer: function(feature, latlng) {
                        if (language_type == "en") {
                            if (feature.properties.categoryid == "3") {
                                setl++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/material-group.png",
                                        iconSize: [33, 21],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),

                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "heb") {
                            if (feature.properties.categoryid == "3") {
                                setl++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/material-group.png",
                                        iconSize: [33, 21],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                        if (language_type == "arb") {
                            if (feature.properties.categoryid == "3") {
                                setl++;
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: "assets/img/material-group.png",
                                        iconSize: [33, 21],
                                        iconAnchor: [12, 28],
                                        popupAnchor: [0, -25],
                                    }),
                                    pane: "right_layers",
                                    riseOnHover: true,
                                });
                            }
                        }
                    },
                })
            setTimeout(function() {
                $("#checkmarkNoViolation4").append(
                    '<span  style="position: absolute;' +
                    'padding: 4px 0px 0px 4px;"  class="badge badge-danger">' +
                    setl +
                    "</span>"
                );
            }, 3000);
            lyr_config.actual_lyr = poi_clusters;
            if (generate_ui) {
                var html_lyr_config_obj = {
                    name: lyr_config.name,
                    trans_name: lyr_config.trans_name,
                    opacity: 1,
                };
                generate_layer_html(html_lyr_config_obj, lyr_key, poi_clusters);
            }
            if (is_last) {
                map.fitBounds(lyr.getBounds());
            }
        },
    });
}

function violationFilter(feature) {
    if (feature.properties.classfication_english === "Prevention of Access") {
        return true;
    }
}

function violationFilter1(feature) {
    if (
        feature.properties.classfication_english ===
        "Settlers Agricultural Takeover"
    ) {
        return true;
    }
}

function violationFilter2(feature) {
    if (feature.properties.classfication_english === "Roads and Construction") {
        return true;
    }
}

function violationFilter3(feature) {
    if (feature.properties.classfication_english === "Settler Visit") {
        return true;
    }
}

var aa = "";
var ab = "";

function load_geojson_layer_with_pattern(
    lyr_config,
    lyr_key,
    is_last,
    generate_ui
) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }
            var options = lyr_config.geojson_options;
            if (lyr_key == "Area_B_Nature_Reserve") {
                options.fillPattern = patterns_obj[lyr_config.pattern];
            }
            wmsLayers[lyr_key] = L.geoJSON(res, options);

            wmsLayers[lyr_key].addTo(map);
            if (lyr_key == "area_a") {
                wmsLayers[lyr_key].setZIndex(0);
                aa = wmsLayers[lyr_key];
            }
            if (lyr_key == "area_b") {
                wmsLayers[lyr_key].setZIndex(0);
                ab = wmsLayers[lyr_key];
            }

            lyr_config.actual_lyr = wmsLayers[lyr_key];
            if (generate_ui) {
                var html_lyr_config_obj = {
                    name: lyr_config.name,
                    trans_name: lyr_config.trans_name,
                    opacity: 1,
                };
                generate_layer_html(html_lyr_config_obj, lyr_key, lyr);
            }
        },
    });
}

var plw = "";

function load_wms_layer(lyr_config, lyr_key, is_last, generate_ui) {
    if (language_type == "en" || language_type == "arb") {
        if (lyr_key != "Settlements") {
            wmsLayers[lyr_key] = L.tileLayer
                .wms(lyr_config.wms.url, lyr_config.wms.wms_options)
                .addTo(map);
            wmsLayers[lyr_key].bringToFront();
            if (lyr_key == "Palestinian_Localities_WestBank") {
                plw = wmsLayers[lyr_key];
            }
        }
    } else if (language_type == "heb") {
        if (lyr_key != "Settlements_english") {
            wmsLayers[lyr_key] = L.tileLayer
                .wms(lyr_config.wms.url, lyr_config.wms.wms_options)
                .addTo(map);
            wmsLayers[lyr_key].bringToFront();
            if (lyr_key == "Palestinian_Localities_WestBank") {
                plw = wmsLayers[lyr_key];
            }
        }
    }

    lyr_config.actual_lyr = wmsLayers[lyr_key];
}

function load_vector_grid(lyr_config, lyr_key, is_last, generate_ui) {
    var lyr = L.vectorGrid
        .protobuf(lyr_config.vg.tile_url, lyr_config.vg.options)
        .addTo(map);

    lyr.on("click", function(e) {
        var properties = e.layer.properties;
        if (Object.keys(properties).length) {
            var custom_classname = "custom-popup-info";
        } else {
            var custom_classname = "custom-popup-info-no-attr";
        }
        var html = popup_props_html(properties);
        L.popup({
                className: custom_classname,
            })
            .setContent(html)
            .setLatLng(e.latlng)
            .openOn(map);
    });
    lyr_config.actual_lyr = lyr;
    if (generate_ui) {
        var html_lyr_config_obj = {
            name: lyr_config.name,
            trans_name: lyr_config.trans_name,
            opacity: lyr_config.vg.options.vectorTileLayerStyles[lyr_key].fillOpacity,
        };
        generate_layer_html(html_lyr_config_obj, lyr_key, lyr);
    }
    if (is_last) {
    }
}

function load_vector_grid_from_geojson(
    lyr_config,
    lyr_key,
    is_last,
    generate_ui
) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }
            var lyr = L.geoJSON(res, lyr_config.geojson_options);
            lyr.addTo(map);

            if (
                lyr_key == "tbl_seizure" ||
                lyr_key == "tbl_seizure_ab" ||
                lyr_key == "tbl_expropriation_orders" ||
                lyr_key == "tbl_expropriation_orders_ab" ||
                lyr_key == "tbl_no_construction_order_roads" ||
                lyr_key == "tbl_no_construction_order_roads_ab" ||
                lyr_key == "tbl_no_construction_order_barrier" ||
                lyr_key == "tbl_no_construction_order_barrier_ab"
            ) {} else {
                if (lyr_key == "Palestinian_Localities_WestBank") {
                    groupedOverlays.POI[
                        currentLanguage == "en" ?
                        '<span style="color: #AF8E78;">▉</span>' +
                        language.Palestinian_Localities_WestBank :
                        '<span style="color: #AF8E78;float:right">▉</span>' +
                        '<span style="float:right">&nbsp' +
                        language.Palestinian_Localities_WestBank +
                        "&nbsp</span>"
                    ] = lyr;
                } else if (lyr_key == "Settlements") {
                    groupedOverlays.POI[
                        currentLanguage == "en" ?
                        '<span style="color: #649DC3;">▉</span>' + language.Settlements :
                        '<span style="color: #649DC3;float:right">▉</span>' +
                        '<span style="float:right">&nbsp' +
                        language.Settlements +
                        "&nbsp</span>"
                    ] = lyr;
                }

                opacitySlider.setOpacityLayer(lyr);
            }

            lyr.on("click", function(e) {
                var properties = e.layer.properties;
                if (Object.keys(properties).length) {
                    var custom_classname = "custom-popup-info";
                } else {
                    var custom_classname = "custom-popup-info-no-attr";
                }
                var html = popup_props_html(properties);
                L.popup({
                        className: custom_classname,
                    })
                    .setContent(html)
                    .setLatLng(e.latlng)
                    .openOn(map);
            });
            lyr_config.actual_lyr = lyr;
            if (generate_ui) {
                var html_lyr_config_obj = {
                    name: lyr_config.name,
                    trans_name: lyr_config.trans_name,
                    opacity: lyr_config.vg.options.vectorTileLayerStyles.sliced.fillOpacity,
                };
                generate_layer_html(html_lyr_config_obj, lyr_key, lyr);
            }
            if (is_last) {
            }
        },
    });
}

function load_vector_grid_from_geojson_with_pattern(
    lyr_config,
    lyr_key,
    is_last,
    generate_ui
) {
    $.ajax({
        url: lyr_config.url,
        type: "GET",
        success: function(res) {
            if (typeof res === "string") {
                res = JSON.parse(res);
            }
            var options = lyr_config.vg.options;
            options.vectorTileLayerStyles.sliced.fillPattern =
                patterns_obj[lyr_config.pattern];
            var lyr = L.vectorGrid.slicer(res, lyr_config.vg.options).addTo(map);

            lyr.on("click", function(e) {
                var properties = e.layer.properties;
                if (Object.keys(properties).length) {
                    var custom_classname = "custom-popup-info";
                } else {
                    var custom_classname = "custom-popup-info-no-attr";
                }
                var html = popup_props_html(properties);
                L.popup({
                        className: custom_classname,
                    })
                    .setContent(html)
                    .setLatLng(e.latlng)
                    .openOn(map);
            });
            lyr_config.actual_lyr = lyr;
            if (generate_ui) {
                var html_lyr_config_obj = {
                    name: lyr_config.name,
                    trans_name: lyr_config.trans_name,
                    opacity: lyr_config.vg.options.vectorTileLayerStyles.sliced.fillOpacity,
                };
                generate_layer_html(html_lyr_config_obj, lyr_key, lyr);
            }
            if (is_last) {
            }
        },
    });
}

function fitMapToLayer(namespace, layername) {
    var geoserver_url =
        geoserver_config.url +
        namespace +
        "/wms?service=wms&version=1.1.0&request=GetCapabilities";
    var url = proxy_url + "?url=" + encodeURIComponent(geoserver_url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            var xml = $.parseXML(response);
            var features = $(xml).find("Capability > Layer > Layer");
            features.each(function(i) {
                var f = $(this);
                var name = f.find("Name")[0].textContent;
                if (name === layername) {
                    var latlng_obj = f.find("LatLonBoundingBox");
                    var bbox = new L.LatLngBounds(
                        new L.LatLng(latlng_obj.attr("miny"), latlng_obj.attr("minx")),
                        new L.LatLng(latlng_obj.attr("maxy"), latlng_obj.attr("maxx"))
                    );
                    map.fitBounds(bbox);
                }
            });
        },
    });
}

function popup_props_html(properties) {
    if (Object.keys(properties).length) {
        var html = '<div class="popup-info">';
        html += '<h1 class="popup-title">Feature Info</h1>';
        Object.keys(properties).forEach(function(key, i) {
            html +=
                "<p><span>" + key + ":</span><span>" + properties[key] + "</span></p>";
        });
        html += "</div>";
    } else {
        var html = "No attributes founds.";
    }
    return html;
}

function generate_layer_html(lyr_config, lyr_key, lyr) {
    var range_slider = "";
    var clustering_toggler = "";

    if (lyr_key == "tbl_seizure" || lyr_key == "tbl_seizure_ab") {
        if (lyr_key == "tbl_seizure") {
            if (lyr instanceof L.MarkerClusterGroup) {
                clustering_toggler =
                    '<div class="clustering_toggler"><span>Toggle Clustering</span></div>';
            } else {
                range_slider =
                    '<div class="w-75 d-none"><div class="range-slider"><input class="range-slider__range" type="range" value="' +
                    lyr_config.opacity * 100 +
                    '" min="0" max="100"><span class="range-slider__value">' +
                    lyr_config.opacity * 100 +
                    "</span></div></div>";
            }
            console.log(lyr_config);
            html =
                '<div data-lyr-key="tbl_seizure,tbl_seizure_ab" class="layer-box mb-2 d-flex flex-column align-items-center justify-content-between"><div class="d-flex justify-content-between w-100"><div class="layer-box-right d-flex align-items-center"><span class="layer-toggler active"></span><span class="layer-title" data-translate="' +
                lyr_config.trans_name +
                '">' +
                lyr_config.name +
                '<i style="color: #AB0501;padding-left: 10px;" class="fas fa-cloud"></i> <i style="color: #F70000;padding-left: 10px;" class="fas fa-cloud"></i> </div><div class="layer-box-left d-flex align-items-center"><span class="reveal-layer-options" data-toggle="collapse" data-target="#collapse-' +
                lyr_key +
                '" aria-expanded="false" aria-controls="collapse-' +
                lyr_key +
                '"><i class="fas fa-chevron-right"></i></span></div></div><div class="layer-collapse-options collapse py-2 w-100" id="collapse-' +
                lyr_key +
                '">' +
                range_slider +
                clustering_toggler +
                "</div></div>";
            $("#layer-container").append(html);
        } else {
            return false;
        }
    } else if (
        lyr_key == "tbl_expropriation_orders" ||
        lyr_key == "tbl_expropriation_orders_ab"
    ) {
        if (lyr_key == "tbl_expropriation_orders") {
            if (lyr instanceof L.MarkerClusterGroup) {
                clustering_toggler =
                    '<div class="clustering_toggler"><span>Toggle Clustering</span></div>';
            } else {
                range_slider =
                    '<div class="w-75 d-none"><div class="range-slider"><input class="range-slider__range" type="range" value="' +
                    lyr_config.opacity * 100 +
                    '" min="0" max="100"><span class="range-slider__value">' +
                    lyr_config.opacity * 100 +
                    "</span></div></div>";
            }
            console.log(lyr_config);
            html =
                '<div data-lyr-key="tbl_expropriation_orders,tbl_expropriation_orders_ab" class="layer-box mb-2 d-flex flex-column align-items-center justify-content-between"><div class="d-flex justify-content-between w-100"><div class="layer-box-right d-flex align-items-center"><span class="layer-toggler active"></span><span class="layer-title" data-translate="' +
                lyr_config.trans_name +
                '">' +
                lyr_config.name +
                '</span><i style="color: #726B41;padding-left: 10px;" class="fas fa-gavel"></i> <i style="color: #EEBB33;padding-left: 10px;" class="fas fa-gavel"></i></div><div class="layer-box-left d-flex align-items-center"><span class="reveal-layer-options" data-toggle="collapse" data-target="#collapse-' +
                lyr_key +
                '" aria-expanded="false" aria-controls="collapse-' +
                lyr_key +
                '"><i class="fas fa-chevron-right"></i></span></div></div><div class="layer-collapse-options collapse py-2 w-100" id="collapse-' +
                lyr_key +
                '">' +
                range_slider +
                clustering_toggler +
                "</div></div>";
            $("#layer-container").append(html);
        } else {
            return false;
        }
    } else if (
        lyr_key == "tbl_no_construction_order_roads" ||
        lyr_key == "tbl_no_construction_order_roads_ab"
    ) {
        if (lyr_key == "tbl_no_construction_order_roads") {
            if (lyr instanceof L.MarkerClusterGroup) {
                clustering_toggler =
                    '<div class="clustering_toggler"><span>Toggle Clustering</span></div>';
            } else {
                range_slider =
                    '<div class="w-75 d-none"><div class="range-slider"><input class="range-slider__range" type="range" value="' +
                    lyr_config.opacity * 100 +
                    '" min="0" max="100"><span class="range-slider__value">' +
                    lyr_config.opacity * 100 +
                    "</span></div></div>";
            }
            console.log(lyr_config);
            html =
                '<div data-lyr-key="tbl_no_construction_order_roads,tbl_no_construction_order_roads_ab" class="layer-box mb-2 d-flex flex-column align-items-center justify-content-between"><div class="d-flex justify-content-between w-100"><div class="layer-box-right d-flex align-items-center"><span class="layer-toggler active"></span><span class="layer-title" data-translate="' +
                lyr_config.trans_name +
                '">' +
                lyr_config.name +
                '</span><i style="padding-left: 10px;" class="fas fa-road"></i> <i style="color: #697037;padding-left: 10px;" class="fas fa-road"></i></div><div class="layer-box-left d-flex align-items-center"><span class="reveal-layer-options" data-toggle="collapse" data-target="#collapse-' +
                lyr_key +
                '" aria-expanded="false" aria-controls="collapse-' +
                lyr_key +
                '"><i class="fas fa-chevron-right"></i></span></div></div><div class="layer-collapse-options collapse py-2 w-100" id="collapse-' +
                lyr_key +
                '">' +
                range_slider +
                clustering_toggler +
                "</div></div>";
            $("#layer-container").append(html);
        } else {
            return false;
        }
    } else if (
        lyr_key == "tbl_no_construction_order_barrier" ||
        lyr_key == "tbl_no_construction_order_barrier_ab"
    ) {
        if (lyr_key == "tbl_no_construction_order_barrier") {
            if (lyr instanceof L.MarkerClusterGroup) {
                clustering_toggler =
                    '<div class="clustering_toggler"><span>Toggle Clustering</span></div>';
            } else {
                range_slider =
                    '<div class="w-75 d-none"><div class="range-slider"><input class="range-slider__range" type="range" value="' +
                    lyr_config.opacity * 100 +
                    '" min="0" max="100"><span class="range-slider__value">' +
                    lyr_config.opacity * 100 +
                    "</span></div></div>";
            }
            console.log(lyr_config);
            html =
                '<div data-lyr-key="tbl_no_construction_order_barrier,tbl_no_construction_order_barrier_ab" class="layer-box mb-2 d-flex flex-column align-items-center justify-content-between"><div class="d-flex justify-content-between w-100"><div class="layer-box-right d-flex align-items-center"><span class="layer-toggler active"></span><span class="layer-title" data-translate="' +
                lyr_config.trans_name +
                '">' +
                lyr_config.name +
                '</span><i style="color: #4F1885;padding-left: 10px;" class="fas fa-stop-circle"></i> <i style="color: #8A3882;padding-left: 10px;" class="fas fa-stop-circle"></i></div><div class="layer-box-left d-flex align-items-center"><span class="reveal-layer-options" data-toggle="collapse" data-target="#collapse-' +
                lyr_key +
                '" aria-expanded="false" aria-controls="collapse-' +
                lyr_key +
                '"><i class="fas fa-chevron-right"></i></span></div></div><div class="layer-collapse-options collapse py-2 w-100" id="collapse-' +
                lyr_key +
                '">' +
                range_slider +
                clustering_toggler +
                "</div></div>";
            $("#layer-container").append(html);
        } else {
            return false;
        }
    } else if (lyr_key == "area_b_violations") {
        if (lyr instanceof L.MarkerClusterGroup) {
            clustering_toggler =
                '<div class="clustering_toggler"><span>Toggle Clustering</span></div>';
        } else {
            range_slider =
                '<div class="w-75 d-none"><div class="range-slider"><input class="range-slider__range" type="range" value="' +
                lyr_config.opacity * 100 +
                '" min="0" max="100"><span class="range-slider__value">' +
                lyr_config.opacity * 100 +
                "</span></div></div>";
        }
        console.log(lyr_config);
        var html =
            '<div style="border: unset;" data-lyr-key="' +
            lyr_key +
            '" class="layer-box mb-2 d-flex flex-column align-items-center justify-content-between">' +
            '<div class="d-flex justify-content-between">' +
            '<div class="col-md-12 col-sm-4">' +
            '<span style="display: none;" class="layer-toggler active"></span>' +
            "</div>" +
            "</div>" +
            '<div class="row rightPanelRow" style="margin-left: -30px;margin-right: -30px;">' +
            '<div class="col-md-12" style="border-bottom: 1px solid rgba(0,0,0,.125);">' +
            '<div class="row" style="margin-left: 10px;">' +
            '<div id="violation11" class="col-md-2" style="position:absolute;right:0">' +
            '<img src="assets/img/Icon material-do-not-disturb-on.png" width="30px" height="30px" style="position: absolute;right: 40px;">' +
            '<label class="customCheckBoxRightDoNot customCheckBoxRight"><input class="form-check-input" onclick=addAndRemoveLayer(violation1,"violation1") type="checkbox" id="violation1"  value=""><span class="checkmarkNo" id="checkmarkNoViolation1"></span>' +
            "</label></div>" +
            '<div  class="col-md-7 rightPanelFont">' +
            '<p data-translate="violation_class1" id="vc1" style="color: rgba(94,94,94,1);">' +
            language.violation_class1 +
            "</p>" +
            "</div>" +
            '<div id="violation11Tooltip" class="col-md-2" style="position:absolute;left:0">' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="col-md-12" style="border-bottom: 1px solid rgba(0,0,0,.125);">' +
            '<div class="row rightPanelRow" style="margin-left: 10px;">' +
            '<div id="violation12" class="col-md-2" style="position:absolute;right:0">' +
            '<img src="assets/img/Icon awesome-truck-pickup.png" width="30px" height="30px" style="position: absolute;right: 40px;">' +
            '<label class="customCheckBoxRightPickup customCheckBoxRight"><input class="form-check-input" type="checkbox" onclick=addAndRemoveLayer(violation2,"violation2") id="violation2"  value=""><span class="checkmarkNo" id="checkmarkNoViolation2" style="top: 14px;"></span>' +
            "</div>" +
            '<div class="col-md-7 rightPanelFont"><p data-translate="violation_class2" id="vc2">' +
            language.violation_class2 +
            "</p>" +
            "</div>" +
            '<div id="violation12Tooltip" class="col-md-2"  style="position:absolute;left:0">' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="col-md-12" style="border-bottom: 1px solid rgba(0,0,0,.125);">' +
            '<div class="row rightPanelRow" style="margin-left: 10px;">' +
            '<div id="violation13" class="col-md-2" style="position:absolute;right:0">' +
            '<img src="assets/img/awesome-road.png" width="20px" height="20x" style="position: absolute;right: 40px;">' +
            '<label class="customCheckBoxRightRoad customCheckBoxRight"><input class="form-check-input" type="checkbox" id="violation3" onclick=addAndRemoveLayer(violation3,"violation3")  value=""><span class="checkmarkNo" id="checkmarkNoViolation3" style="top: 14px;"></span>' +
            "</div>" +
            '<div class="col-md-7 rightPanelFont"><p data-translate="violation_class3" id="vc3">' +
            language.violation_class3 +
            "</p></div>" +
            '<div id="violation13Tooltip" class="col-md-2"  style="position:absolute;left:0">' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="col-md-12">' +
            '<div class="row rightPanelRow" style="margin-left: 10px;">' +
            '<div id="violation14" class="col-md-2" style="position:absolute;right:0">' +
            '<img src="assets/img/material-group.png" width="20px" height="20px" style="position: absolute;right: 40px;">' +
            '<label class="customCheckBoxRightGroup customCheckBoxRight"><input class="form-check-input" type="checkbox" id="violation4" onclick=addAndRemoveLayer(violation4,"violation4")  value=""><span class="checkmarkNo" id="checkmarkNoViolation4" style="top: 14px;"></span>' +
            "</div>" +
            '<div class="col-md-7 rightPanelFont"><p data-translate="violation_class4" id="vc4">' +
            language.violation_class4 +
            "</p></div>" +
            '<div id="violation14Tooltip" class="col-md-2"  style="position:absolute;left:0">' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        $("#layer-container").append(html);
    } else {
        if (lyr instanceof L.MarkerClusterGroup) {
            clustering_toggler =
                '<div class="clustering_toggler"><span>Toggle Clustering</span></div>';
        } else {
            range_slider =
                '<div class="w-75 d-none"><div class="range-slider"><input class="range-slider__range" type="range" value="' +
                lyr_config.opacity * 100 +
                '" min="0" max="100"><span class="range-slider__value">' +
                lyr_config.opacity * 100 +
                "</span></div></div>";
        }
        console.log(lyr_config);
        var html =
            '<div data-lyr-key="' +
            lyr_key +
            '" class="layer-box mb-2 d-flex flex-column align-items-center justify-content-between"><div class="d-flex justify-content-between w-100"><div class="layer-box-right d-flex align-items-center"><span class="layer-toggler active"></span><span class="layer-title" data-translate="' +
            lyr_config.trans_name +
            '">' +
            lyr_config.name +
            '</span> <i style="color: #8A3882;padding-left: 10px;" class="fas fa-circle"></i></div><div class="layer-box-left d-flex align-items-center"><span class="reveal-layer-options" data-toggle="collapse" data-target="#collapse-' +
            lyr_key +
            '" aria-expanded="false" aria-controls="collapse-' +
            lyr_key +
            '"><i class="fas fa-chevron-right"></i></span></div></div><div class="layer-collapse-options collapse py-2 w-100" id="collapse-' +
            lyr_key +
            '">' +
            range_slider +
            clustering_toggler +
            "</div></div>";
        $("#layer-container").append(html);
    }
}

function toggle_layer(lyr_key, is_active) {
    if (
        lyr_key == "tbl_seizure,tbl_seizure_ab" ||
        lyr_key == "tbl_expropriation_orders,tbl_expropriation_orders_ab" ||
        lyr_key ==
        "tbl_no_construction_order_roads,tbl_no_construction_order_roads_ab" ||
        lyr_key ==
        "tbl_no_construction_order_barrier,tbl_no_construction_order_barrier_ab"
    ) {
        var lk = lyr_key.split(",");
        for (var i = 0; i < lk.length; i++) {
            var lyr_config = data_config_right[lk[i]];
            if (is_active) {
                map.addLayer(lyr_config.actual_lyr);
            } else {
                map.removeLayer(lyr_config.actual_lyr);
            }
        }
    } else {
        var lyr_config = data_config_right[lyr_key];
        if (is_active) {
            map.addLayer(lyr_config.actual_lyr);
        } else {
            map.removeLayer(lyr_config.actual_lyr);
        }
    }
}

(function() {
    var originalInitTile = L.GridLayer.prototype._initTile;
    L.GridLayer.include({
        _initTile: function(tile) {
            originalInitTile.call(this, tile);

            var tileSize = this.getTileSize();

            tile.style.width = tileSize.x + 1 + "px";
            tile.style.height = tileSize.y + 1 + "px";
        },
    });
})();

$(document).on(
    "click",
    ".sidebar-container-left div.sidebar-toggler-btn",
    function(e) {
        e.preventDefault();
        $(".sidebar-container.sidebar-container-left div.sidebar-toggler-btn")
            .not(this)
            .find("i")
            .removeClass("fa-chevron-up fa-chevron-down");
        $(".sidebar-container.sidebar-container-left div.sidebar-toggler-btn")
            .not(this)
            .find("i")
            .addClass("fa-chevron-up");
        $(this)
            .closest(".sidebar-container")
            .toggleClass("sidebar-container-open-left");
        $(this).find("i").toggleClass("fa-chevron-up fa-chevron-down");
        $(".sidebar-container-right").removeClass("sidebar-container-open-right");
    }
);

$(document).on(
    "click",
    ".sidebar-container-right div.sidebar-toggler-btn",
    function(e) {
        e.preventDefault();
        $(".sidebar-container.sidebar-container-right div.sidebar-toggler-btn")
            .not(this)
            .find("i")
            .removeClass("fa-chevron-up fa-chevron-down");
        $(".sidebar-container.sidebar-container-right div.sidebar-toggler-btn")
            .not(this)
            .find("i")
            .addClass("fa-chevron-up");
        $(this)
            .closest(".sidebar-container")
            .toggleClass("sidebar-container-open-right");
        $(this).find("i").toggleClass("fa-chevron-up fa-chevron-down");
        $(".sidebar-container-left").removeClass("sidebar-container-open-left");
    }
);

$(document).on("click", "#en", function(e) {
    window.location.href = '/?lang=en';
});
$(document).on("click", "#arb", function(e) {
    window.location.href = '/?lang=arb';
});
$(document).on("click", "#heb", function(e) {
    window.location.href = '/?lang=heb';
});

$(document).on("click", ".reveal-layer-options", function(e) {
    $(this).find("i").toggleClass("fa-chevron-down fa-chevron-right");
});
$(document).on("click", ".layer-toggler", function(e) {
    $(this).toggleClass("active");
    toggle_layer(
        $(this).closest(".layer-box").data("lyr-key"),
        $(this).hasClass("active")
    );
});
$(document).on("click", ".layer-title", function(e) {
    $(this).siblings(".layer-toggler").toggleClass("active");
    toggle_layer(
        $(this).closest(".layer-box").data("lyr-key"),
        $(this).hasClass("active")
    );
});
$(document).on("input change", ".range-slider__range", function(e) {
    var lyr_config =
        data_config_right[$(this).closest(".layer-box").data("lyr-key")];
    if (lyr_config.actual_lyr instanceof L.MarkerClusterGroup) {} else {
        lyr_config.actual_lyr.setOpacity($(this).val() / 100);
    }
});

$(document).on("click", ".clustering_toggler span", function(e) {
    $(this).toggleClass("off");
    var lyr_config_key = $(this).closest(".layer-box").attr("data-lyr-key");
    if (typeof data_config_left[lyr_config_key] !== "undefined") {
        var poi_clusters =
            poi_cluster_obj[data_config_left[lyr_config_key].cluster];
    } else {
        var poi_clusters =
            poi_cluster_obj[data_config_right[lyr_config_key].cluster];
    }
    if ($(this).hasClass("off")) {
        poi_clusters.disableClustering();
    } else {
        poi_clusters.enableClustering();
    }
});
var l1 =
    currentLanguage == "en" ?
    '<span style="color: #b87d73;">▉</span>' +
    language.Palestinian_Localities_WestBank :
    '<span style="color: #b87d73;float:right">▉</span>' +
    '<span style="float:right">&nbsp' +
    language.Palestinian_Localities_WestBank +
    "&nbsp</span><br />";
var l2 =
    currentLanguage == "en" ?
    '<span style="color: #dbc29f;">▉</span>' + language.AreaA :
    '<span style="color: #dbc29f;float:right">▉</span>' +
    '<span style="float:right"> &nbsp' +
    language.AreaA +
    "&nbsp</span><br />";
var l3 =
    currentLanguage == "en" ?
    '<span style="color: #ffc9a6;">▉</span>' + language.AreaB :
    '<span style="color: #ffc9a6;float:right">▉</span>' +
    '<span style="float:right"> &nbsp' +
    language.AreaB +
    "&nbsp</span><br />";
var l4 =
    currentLanguage == "en" ?
    '<span style="color: green;">▉</span>' + language.line :
    '<span style="color: green;float:right">▉</span>' +
    '<span style="float:right"> &nbsp' +
    language.line +
    "&nbsp</span><br />";

var l5 =
    currentLanguage == "en" ?
    '<span style="color: #ffc9a6;"><img src="assets/img/nrs.png" width="12px" height="12px"/></span>' +
    language.areabn :
    '<span style="color: #ffc9a6;float:right"><img src="assets/img/nrs.png" width="12px" height="12px"/></span>' +
    '<span style="float:right"> &nbsp' +
    language.areabn +
    "&nbsp</span><br />";
var l6 =
    currentLanguage == "en" ?
    '<span style="color: #649DC3;">▉</span>' + language.Settlements :
    '<span style="color: #649DC3;float:right">▉</span>' +
    '<span style="float:right">&nbsp' +
    language.Settlements +
    "&nbsp</span><br />";
var l7 =
    currentLanguage == "en" ?
    '<span style="color: yellow;">▉</span>' + language.Jerusalem :
    '<span style="color: yellow;float:right">▉</span>' +
    '<span style="float:right"> &nbsp' +
    language.Jerusalem +
    "&nbsp</span><br />";

var l8 =
    '<div class="row">' +
    '<div class="col-md-5">' +
    l1 +
    "</div>" +
    '<div class="col-md-2">' +
    l2 +
    "</div>" +
    '<div class="col-md-2">' +
    l3 +
    "</div>" +
    '<div class="col-md-3">' +
    l4 +
    "</div>" +
    "</div>";
var l9 =
    '<div class="row">' +
    '<div class="col-md-7">' +
    l5 +
    "</div>" +
    '<div class="col-md-5 ">' +
    l6 +
    "</div></div>";
var l10 =
    '<div class="row">' +
    '<div class="col-md-7">' +
    l7 +
    "</div>" +
    '<div class="col-md-5"><input z-index="100000000" type="range" id="opacityRange" min="1" max="10" value="9"><br /><h6>Transparency Scroll</h6></div></div>';

groupedOverlays1 = {
    POI: {},
};
groupedOverlays1.POI[l8] = {};
groupedOverlays1.POI[l9] = {};
groupedOverlays1.POI[l10] = {};

$(document).ready(function() {

    $(".box").animate({
        width: "toggle",
    });
    $("#landing").modal();

    var layerControl = L.control
        .groupedLayers(baseLayers, groupedOverlays1, {
            collapsed: true,
            position: "bottomright",
        })
        .addTo(map);

    $(".leaflet-control-layers-selector").hide();
    $("[name='leaflet-base-layers']").show();
    $(".leaflet-control-layers-group-name").hide();
    $(".leaflet-control-layers-base").addClass("row");
    $(".leaflet-control-layers-base").addClass(language_type + "-row");
    $(".leaflet-control-layers-base").css("padding-left", "20px");
    $(".leaflet-control-layers-base >label").css("padding-left", "20px");
    $("#opacityRange").change(function() {
        var val = $(this).val();
        for (wmsLayer in wmsLayers) {
            if (wmsLayers.hasOwnProperty(wmsLayer)) {
                if (wmsLayer == "Jerusalem") {
                    var val1 = val / 10;
                    wmsLayers[wmsLayer].setStyle({ opacity: val1 });
                } else if (wmsLayer == "Green_Line") {
                    var val1 = val / 10;
                    wmsLayers[wmsLayer].setStyle({ opacity: val1 });
                } else if (wmsLayer == "Area_B_Nature_Reserve") {
                    var val1 = val / 10;
                    wmsLayers[wmsLayer].setStyle({ opacity: val1 });
                } else {
                    wmsLayers[wmsLayer].setOpacity(val / 10);
                }
            }
        }
    });
    $(".slide-toggle").click(function() {
        $(".box").animate({
            width: "toggle",
        });
    });
    setTimeout(function() {
        $("#demolitions1").append(
            '<div style="margin-top: -14px;position: absolute;font-size:20px;" class="tooltip-custom text-justify" title="' +
            language.Area_B_Demolitions_info +
            '<span class=\'close\'></span>" style="width: 40%; margin: 0 auto;margin-left:110px"><i class="infoCss" id="tooltip-custom"><img src="assets/img/info.png"></i></div>'
        );
        $("#area_b_training1").append(
            '<div style="margin-top: -14px;position: absolute;font-size:20px;" class="tooltip-custom2 text-justify" title="' +
            language.Military_Training_info +
            '<span class=\'close2\'></span>" style="width: 40%; margin: 0 auto;margin-left:110px"><i class="infoCss" style="cursor: pointer" id="tooltip-custom2"><img src="assets/img/info.png"></i></div>'
        );
        $("#security_orders1").append(
            '<div style="margin-top: -14px;position: absolute;font-size:20px;" class="tooltip-custom3 text-justify" title="' +
            language.Security_Orders +
            '<span class=\'close3\'></span>" style="width: 40%; margin: 0 auto;margin-left:110px"><i class="infoCss" style="cursor: pointer" id="tooltip-custom3"><img src="assets/img/info.png"></i></div>'
        );
        $("#no_construction_orders1").append(
            '<div style="margin-top: -12px;position: absolute;font-size:20px;" class="tooltip-custom4 text-justify" title="' +
            language.No_Construction_Order_info +
            '<span class=\'close4\'></span>" style="width: 100%; margin: 0 auto;margin-left:175px;margin-top:-30px;"><i class="infoCss" style="cursor: pointer" id="tooltip-custom4"><img src="assets/img/info.png"></i></div>'
        );
        $("#expropriation_orders_ab1").append(
            '<div style="margin-top: -12px;position: absolute;font-size:20px;" class="tooltip-custom5 text-justify" title="' +
            language.Expropriation_Orders_info +
            '<span class=\'close5\'></span>" style="width: 100%; margin: 0 auto;margin-left:150px;margin-top:-30px;"><i class="infoCss" style="cursor: pointer" id="tooltip-custom5"><img src="assets/img/info.png"></i></div>'
        );
        $("#seizure1").append(
            '<div style="margin-top: -12px;position: absolute;font-size:20px;" class="tooltip-custom6 text-justify" title="' +
            language.miltary_seizure_order +
            '<span class=\'close6\'></span>" style="width: 100%; margin: 0 auto;margin-left:110px;margin-top:-30px;"><i class="infoCss" id="tooltip-custom6" style="cursor: pointer"><img src="assets/img/info.png"></i></div>'
        );
        $("#violation11Tooltip").append(
            '<div style="position: absolute;font-size:20px;margin-top: -5px;" class="tooltip-custom7 text-justify" title="' +
            language.Denial_of_Access +
            '<span class=\'close7\'></span>" style="width: 100%; margin: 0 auto;"><i class="infoCss" id="tooltip-custom7" style="cursor: pointer"><img src="assets/img/info.png"></i></div>'
        );
        $("#violation12Tooltip").append(
            '<div style="position: absolute;font-size:20px;margin-top: -5px;" class="tooltip-custom8 text-justify" title="' +
            language.Agricultural_Takeover +
            '<span class=\'close8\'></span>" style="width: 100%; margin: 0 auto;"><i class="infoCss" id="tooltip-custom8" style="cursor: pointer"><img src="assets/img/info.png"></i></div>'
        );
        $("#violation13Tooltip").append(
            '<div style="position: absolute;font-size:20px;margin-top: -5px;" class="tooltip-custom9 text-justify" title="' +
            language.Road_Building_and_Construction +
            '<span class=\'close9\'></span>" style="width: 100%; margin: 0 auto;"><i class="infoCss" id="tooltip-custom9" style="cursor: pointer"><img src="assets/img/info.png"></i></div>'
        );
        $("#violation14Tooltip").append(
            '<div style="position: absolute;font-size:20px;margin-top: -5px;" class="tooltip-custom10 text-justify" title="' +
            language.Settler_Visits +
            '<span class=\'close10\'></span>" style="width: 100%; margin: 0 auto;"><i class="infoCss" id="tooltip-custom10" style="cursor: pointer"><img src="assets/img/info.png"></i></div>'
        );
        $('[data-toggle="tooltip"]').tooltip();

        $(".tooltip-custom").tooltipster({
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            trigger: "custom",
            onlyOne: true,
        });
        $(".tooltip-custom2").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
        });
        $(".tooltip-custom3").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
            position: "right",
        });
        $(".tooltip-custom4").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
            position: "right",
        });
        $(".tooltip-custom5").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
            position: "right",
        });
        $(".tooltip-custom6").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
        });
        $(".tooltip-custom7").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
            position: "right",
        });
        $(".tooltip-custom8").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
            position: "right",
        });
        $(".tooltip-custom9").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
            position: "right",
        });
        $(".tooltip-custom10").tooltipster({
            trigger: "custom",
            interactive: true,
            contentAsHTML: true,
            interactiveTolerance: 500000,
            onlyOne: true,
        });

        $(document).on("click", "#tooltip-custom", function() {
            $(".tooltip-custom").tooltipster("show");
            $(".tooltipster-base").addClass("leftside-tooltip");
            document
                .getElementById("sidebar-container-symbology")
                .classList.remove("sidebar-container-open-left");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-leftside-bar'><span data-translate='Polygons' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Polygons + "</span></div>"
            $(".leftside-tooltip").append(snapcode);
        });

        $(document).on("click", "#tooltip-custom2", function() {
            $(".tooltip-custom2").tooltipster("show");
            $(".tooltipster-base").addClass("leftside-tooltip");
            document
                .getElementById("sidebar-container-symbology")
                .classList.remove("sidebar-container-open-left");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-leftside-bar'><span data-translate='Polygons' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Polygons + "</span></div>"
            $(".leftside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom3", function() {
            $(".tooltip-custom3").tooltipster("show");
            $(".tooltipster-base").addClass("leftside-tooltip");
            document
                .getElementById("sidebar-container-symbology")
                .classList.remove("sidebar-container-open-left");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-leftside-bar'><span data-translate='Polygons' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Polygons + "</span></div>"
            $(".leftside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom4", function() {
            $(".tooltip-custom4").tooltipster("show");
            $(".tooltipster-base").addClass("leftside-tooltip");
            document
                .getElementById("sidebar-container-symbology")
                .classList.remove("sidebar-container-open-left");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-leftside-bar'><span data-translate='Polygons' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Polygons + "</span></div>"
            $(".leftside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom5", function() {
            $(".tooltip-custom5").tooltipster("show");
            $(".tooltipster-base").addClass("leftside-tooltip");
            document
                .getElementById("sidebar-container-symbology")
                .classList.remove("sidebar-container-open-left");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-leftside-bar'><span data-translate='Polygons' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Polygons + "</span></div>"
            $(".leftside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom6", function() {
            $(".tooltip-custom6").tooltipster("show");
            $(".tooltipster-base").addClass("leftside-tooltip");
            document
                .getElementById("sidebar-container-symbology")
                .classList.remove("sidebar-container-open-left");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-leftside-bar'><span data-translate='Polygons' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Polygons + "</span></div>"
            $(".leftside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom7", function() {
            $(".tooltip-custom7").tooltipster("show");
            $(".sidebar-container-right").removeClass("sidebar-container-open-right");
            $(".tooltipster-base").addClass("rightside-tooltip");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-rightside-bar'><span data-translate='Layers' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Layers + "</span></div>"
            $(".rightside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom8", function() {
            $(".tooltip-custom8").tooltipster("show");
            $(".sidebar-container-right").removeClass("sidebar-container-open-right");
            $(".tooltipster-base").addClass("rightside-tooltip");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-rightside-bar'><span data-translate='Layers' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Layers + "</span></div>"
            $(".rightside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom9", function() {
            $(".tooltip-custom9").tooltipster("show");
            $(".sidebar-container-right").removeClass("sidebar-container-open-right");
            $(".tooltipster-base").addClass("rightside-tooltip");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-rightside-bar'><span data-translate='Layers' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Layers + "</span></div>"
            $(".rightside-tooltip").append(snapcode);
        });
        $(document).on("click", "#tooltip-custom10", function() {
            $(".tooltip-custom10").tooltipster("show");
            $(".sidebar-container-right").removeClass("sidebar-container-open-right");
            $(".tooltipster-base").addClass("rightside-tooltip");
            tooltipTextDirection(language_type);
            var snapcode = "<div style='' class='custom-rightside-bar'><span data-translate='Layers' class='" + language_type + "-custom-rightside-bar-title'>" +
                language.Layers + "</span></div>"
            $(".rightside-tooltip").append(snapcode);
        });

        $(document).on("click", ".custom-rightside-bar", function() {
            $(".tooltip-custom7").tooltipster("hide");
            $(".tooltip-custom8").tooltipster("hide");
            $(".tooltip-custom9").tooltipster("hide");
            $(".tooltip-custom10").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-layers");
            sidebar.classList.add("sidebar-container-open-right");
        });

        $(document).on("click", ".custom-leftside-bar", function() {
            $(".tooltip-custom").tooltipster("hide");
            $(".tooltip-custom2").tooltipster("hide");
            $(".tooltip-custom3").tooltipster("hide");
            $(".tooltip-custom4").tooltipster("hide");
            $(".tooltip-custom5").tooltipster("hide");
            $(".tooltip-custom6").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });

        $(document).on("click", ".close", function() {
            $(".tooltip-custom").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });
        $(document).on("click", ".close2", function() {
            $(".tooltip-custom2").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });
        $(document).on("click", ".close3", function() {
            $(".tooltip-custom3").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });
        $(document).on("click", ".close4", function() {
            $(".tooltip-custom4").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });
        $(document).on("click", ".close5", function() {
            $(".tooltip-custom5").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });
        $(document).on("click", ".close6", function() {
            $(".tooltip-custom6").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-symbology");
            sidebar.classList.add("sidebar-container-open-left");
        });
        $(document).on("click", ".close7", function() {
            $(".tooltip-custom7").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-layers");
            sidebar.classList.add("sidebar-container-open-right");
        });
        $(document).on("click", ".close8", function() {
            $(".tooltip-custom8").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-layers");
            sidebar.classList.add("sidebar-container-open-right");
        });
        $(document).on("click", ".close9", function() {
            $(".tooltip-custom9").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-layers");
            sidebar.classList.add("sidebar-container-open-right");
        });
        $(document).on("click", ".close10", function() {
            $(".tooltip-custom10").tooltipster("hide");
            var sidebar = document.getElementById("sidebar-container-layers");
            sidebar.classList.add("sidebar-container-open-right");
        });
        $('.tooltip-custom').addClass(language_type + "-tooltip-custom");
        $('.tooltip-custom2').addClass(language_type + "-tooltip-custom");
        $('.tooltip-custom3').addClass(language_type + "-tooltip-custom");
        $('.tooltip-custom4').addClass(language_type + "-tooltip-custom");
        $('.tooltip-custom5').addClass(language_type + "-tooltip-custom");
        $('.tooltip-custom6').addClass(language_type + "-tooltip-custom");
    }, 3000);
});

function tooltipTextDirection(prm) {
    if (prm == "en") {
        $(".tooltipster-content").css("direction", "ltr");
    } else if (prm == "arb") {
        $(".tooltipster-content").css("direction", "rtl");
    } else {
        $(".tooltipster-content").css("direction", "rtl");
    }
    $('.tooltipster-content').addClass(prm + "-tooltipster-content");
}

function closeDiclaration() {
    $(".box").animate({
        width: "toggle",
    });
}

var slideIndex = 1;

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function popuponthefly(fid, lat, lng) {
    var marker = L.circleMarker([lat, lng], {
        pane: "right_layers",
        radius: 1,
        fillColor: "#00158C",
        fillOpacity: 0,
        color: "#232323",
        weight: 1,
    }).addTo(map);
    var cat = "";
    var set = "";
    var pal = "";
    var lk1 = "";
    var lk2 = "";

    $.ajax({
        url: "http://3.17.36.216/kn_api/area_b_violations",
        type: "GET",
        success: function(res) {
            var rs = res;
            for (var i = 0; i < rs.features.length; i++) {
                if (rs.features[i].properties.fid == parseInt(fid)) {
                    if (language_type == "en") {
                        cat = rs.features[i].properties.cat_eng;
                        set = rs.features[i].properties.set_eng;
                        pal = rs.features[i].properties.pal_eng;
                        lk1 = rs.features[i].properties.art_eng1;
                        lk2 = rs.features[i].properties.art_eng2;
                    }
                    if (language_type == "arb") {
                        cat = rs.features[i].properties.cat_arb;
                        set = rs.features[i].properties.set_arb;
                        pal = rs.features[i].properties.pal_arb;
                        lk1 = rs.features[i].properties.art_arb1;
                        lk2 = rs.features[i].properties.art_arb2;
                    }
                    if (language_type == "heb") {
                        cat = rs.features[i].properties.cat_heb;
                        set = rs.features[i].properties.set_heb;
                        pal = rs.features[i].properties.pal_heb;
                        lk1 = rs.features[i].properties.art_heb1;
                        lk2 = rs.features[i].properties.art_heb2;
                    }
                    var str =
                        '<div class="container-fluid" style="max-width: 300px;max-width: none;"><h3>' +
                        language.violation_class1 +
                        "</h3>";
                    $.ajax({
                        url: "/getimages.php?id=" + fid,
                        type: "GET",
                        success: function(res) {
                            var images = JSON.parse(res);
                            if (images.length > 0) {
                                str = str + '<div class="slideshow-container">';
                                for (var i = 0; i < images.length; i++) {
                                    str =
                                        str +
                                        '<div class="mySlides">' +
                                        '<img src="' +
                                        images[i] +
                                        '" style="width:100%">' +
                                        "</div>";
                                }
                                str =
                                    str +
                                    '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>' +
                                    '<a class="next" onclick="plusSlides(1)">&#10095;</a>' +
                                    "</div><br />" +
                                    '<div style="text-align:center">';
                                for (var j = 0; j < images.length; j++) {
                                    var sum = j + 1;
                                    str =
                                        str +
                                        '<span class="dot" onclick="currentSlide(' +
                                        sum +
                                        ')"></span>';
                                }

                                var category_hebrew = cat == null ? " " : cat;
                                var settlement_hebrew = set == null ? " " : set;
                                var palestinia_hebrew = pal == null ? " " : pal;
                                var link1 = lk1 == null ? " " : lk1;
                                var link2 = lk2 == null ? " " : lk2;
                                str =
                                    str +
                                    "</div>" +
                                    '<div style="padding-top: 10px;" class="row">' +
                                    '<div class="col-md-12"><p>' +
                                    category_hebrew +
                                    "<br />" +
                                    "<b>" +
                                    language.Settlements +
                                    "</b>:" +
                                    settlement_hebrew +
                                    "<br />" +
                                    "<b>" +
                                    language.apc +
                                    "</b>:" +
                                    palestinia_hebrew +
                                    "<br />" +
                                    '<a href="' +
                                    link1 +
                                    '" target="_blank">' +
                                    link2 +
                                    "</a>" +
                                    "</p></div>" +
                                    "</div></div>";
                            }

                            var html = str;
                            marker
                                .bindPopup(html, {
                                })
                                .openPopup();
                        },
                    });
                }
            }
        },
    });
}



// Added classes to show left popup style

$(document).ready(function() {
    $("body").click(function(e) {
        //checks if link is not same of base url will open in new tab

        $("a").each(function() {
            var a = new RegExp("/" + window.location.host + "/");
            if (!a.test(this.href)) {
                $(this).attr("target", "_blank");
            }
        });

        var target = $(e.target),
            left_popup;

        if (target.is(".leaflet-interactive")) {
            left_popup = $(".leaflet-container");
        }

        if (left_popup) {
            $(".leaflet-container").addClass("left-leaflet-container");
            $(".leaflet-popup-content").addClass("left-leaflet-popup-content");
            $('.container-fluid').addClass(language_type+"-container-fluid");
            $('.popuptwitterDiv').addClass(language_type+"-popuptwitterDiv");
            $('.container-fluid-title-div').addClass(language_type+"-container-fluid-title-div");
            $(".leaflet-popup-content-wrapper").addClass(
                "left-leaflet-popup-content-wrapper"
            );
            $(".leaflet-popup-tip").addClass("left-leaflet-popup-tip");
            $(".leaflet-popup-close-button").addClass(
                "left-leaflet-popup-close-button"
            );
        }
    });
});