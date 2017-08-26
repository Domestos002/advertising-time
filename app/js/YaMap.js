
ymaps.ready(init);
var myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [51.684484555213984,39.16403117790984],
        zoom: 18,
        controls: ['zoomControl']
    });
    myMap.behaviors.disable('scrollZoom');
    myPlacemark = new ymaps.Placemark([51.68409775042362,39.164052635581946], {
    });

    myMap.geoObjects.add(myPlacemark);
}