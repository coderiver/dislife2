$(document).ready(function() {
  //map
  function setMap() {
    const map = document.getElementById('map');
    if (map) {
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
    };

  };
  setMap();
  

  //slider
  function setMobSlider() {
    const $slider = $('.js-mob-slider');
    $slider.slick({
      nextArrow: $('.js-mob-slider-next'),
      prevArrow: $('.js-mob-slider-prev'),
      slidesToScroll: 1,
      slidesToShow: 1,
      responsive: [
      {
       breakpoint: 660,
       settings: {
       }
     },
     ]
   });
  };
  setMobSlider();


});