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

    const LocationBlue = new ol.style.Icon({
        src:'./data/icon/g280.png',
        oppacity:1,
        scale:0.04
    })

    const Locationselect = new ol.style.Icon({
        src: './data/icon/locationred.svg',
        oppacity:1,
        scale:0.05
    })

    const fallstyle = new ol.style.Style({
        image:LocationBlue
    })

    const fallstyleselected = new ol.style.Style({
        image: Locationselect
    })

    const kerWaterfalls = new ol.layer.Vector({
        source:new ol.source.Vector({
            format:new ol.format.GeoJSON(),
            url:"./data/Geojson/KeralaWaterfalls.geojson"
        }),
        title:'Waterfalls',
        style: fallstyle
    })
    map.addLayer(kerWaterfalls)

    const overlayContainerelement = document.querySelector('.overlay-container')
    const overlaylayer = new ol.Overlay({
        element:overlayContainerelement
    })
    map.addOverlay(overlaylayer);

    //Map click logic
    const naviElements = document.querySelector('.dots');
    const sitenameElement = document.getElementById('fallname');
    const siteImageElement = document.getElementById('infoimage');
    const mapView =  map.getView();

    map.on('singleclick',function(evnt){        
        map.forEachFeatureAtPixel(evnt.pixel,function(feature,layer){
            let sitename = feature.get('fallname');
            let naviElement =  naviElements.children.namedItem(sitename);
            //console.log(naviElement)
            mainLogic(feature,naviElement)
        })
    })

    function mainLogic(feature,clickedNewElemnt){
        let currentActiveElemnt = document.querySelector('.active');
        console.log(currentActiveElemnt)
        currentActiveElemnt.className = currentActiveElemnt.className.replace('active','')
        clickedNewElemnt.className = 'active'

        //Zoom in feature
        let featurecoordinate = feature.get('geometry').getCoordinates();
        mapView.animate({center: featurecoordinate},{zoom:9})

        let fallfeatures = kerWaterfalls.getSource().getFeatures();
        fallfeatures.forEach(function(feature){
            feature.setStyle(fallstyle)
        })
        feature.setStyle(fallstyleselected)

    }


    //Map pointer/*
    /*const overlayFeatName = document.getElementById('waterfall-name');

    map.on('pointermove', function(e){
        overlaylayer.setPosition(undefined)
        map.forEachFeatureAtPixel(e.pixel,function(feature,layer){
            let coordinateclicked = e.coordinate;
            let WFName = feature.get('Name');

                overlaylayer.setPosition(coordinateclicked);
                overlayFeatName.innerHTML = WFName;

        
        },{
            layerFilter: function(layerCandidate){
                return layerCandidate.get('title') === 'Waterfalls'
            }
        } 
        )
    })*/


    /*map.on("click",function(e){
        console.log(e.coordinate)
    })*/



}