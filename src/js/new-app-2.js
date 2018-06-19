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

    $slider.each(function(index, el) {
      let $sliderWrap = $(el).parent();
      let $sliderNext = $sliderWrap.find('.js-mob-slider-next');
      let $sliderPrev = $sliderWrap.find('.js-mob-slider-prev');
      let type = $(el).data('mob-slider');

      const sliderOpt = {
        helpersSlider: {
          nextArrow: $sliderNext,
          prevArrow: $sliderPrev,
          slidesToScroll: 1,
          slidesToShow: 2,
          responsive: [
          {
           breakpoint: 660,
           settings: {
            slidesToShow: 1,
          }
        },
        ]
      },
      partnersSlider: {
        nextArrow: $sliderNext,
        prevArrow: $sliderPrev,
        slidesToScroll: 1,
        slidesToShow: 3,
        responsive: [
        {
         breakpoint: 660,
         settings: {
          slidesToShow: 1,
        }
      },
      ]
    },

  }

      if ($(window).outerWidth() <= 990 ) {
        $(el).slick(sliderOpt[type]);
      } else {
        $(el).slick('unslick');
      };
    });    
  };

  setMobSlider();
  $(window).on('resize', setMobSlider);
  
  


});