$(document).ready(function() {
  //map
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [55.7555282, 37.6144813],
      zoom: 14,
      scrollZoom: false,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
  });
});