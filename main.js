window.onload = init

function init(){
    const map = new ol.Map({
        view: new ol.View({
            
            zoom: 1,
            projection: 'EPSG:3857',
            center:[8567632.418462602, 1216139.9929669618] ,
            extent:[7671084.328048979, 653002.4943791988, 9229601.321082244, 1647148.8951564338 ]
        }),

        layers:[
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        
        target:"openlayers-map"
        
    })
    // Waterfalls

    const LociconBlue = new ol.style.Icon({
        src:'./data/icon/g280.png',
        oppacity:1,
        scale:0.04
    })

    const waterfallstyle = function(feature){
        console.log(feature.get('Name'))
        let wfname = feature.get('Name');
        let wfnameTostr = wfname.toString();
        const styles = [
            new ol.style.Style({
                image: new ol.style.Circle({
                    fill:new ol.style.Fill({
                        color:[77,219,105,0.6]
                    }),
                    stroke:new ol.style.Stroke({
                        color:[6,125,34,1],
                        width:2
                    }),
                    radius:5
                })/*,
                text:new ol.style.Text({
                    text:wfnameTostr,
                    scale:1.5,
                    fill:new ol.style.Fill({
                        color:[232,26,26,1]
                    }),
                    storke:new ol.style.Stroke({
                        color:[232,26,26,1],
                        width:0.3
                    })
                })*/
            })
            
        ]

        return styles


    }

    const kerWaterfalls = new ol.layer.Vector({
        source:new ol.source.Vector({
            format:new ol.format.GeoJSON(),
            url:"./data/Geojson/KeralaWaterfalls.geojson"
        }),
        title:'Waterfalls',
        style: new ol.style.Style({
            image:LociconBlue
        })
    })
    map.addLayer(kerWaterfalls)

    const overlayContainerelement = document.querySelector('.overlay-container')
    const overlaylayer = new ol.Overlay({
        element:overlayContainerelement
    })
    map.addOverlay(overlaylayer);

    const overlayFeatName = document.getElementById('waterfall-name');

    map.on('pointermove', function(e){
        overlaylayer.setPosition(undefined)
        map.forEachFeatureAtPixel(e.pixel,function(feature,layer){
            let coordinateclicked = e.coordinate;
            console.log(feature.get('Name'))
            let WFName = feature.get('Name');

                overlaylayer.setPosition(coordinateclicked);
                overlayFeatName.innerHTML = WFName;

        
        },{
            layerFilter: function(layerCandidate){
                return layerCandidate.get('title') === 'Waterfalls'
            }
        } 
        )
    })


    map.on("click",function(e){
        console.log(e.coordinate)
    })



}