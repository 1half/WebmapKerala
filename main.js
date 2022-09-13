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
    map.on("click",function(e){
        console.log(e.coordinate)
    })


}