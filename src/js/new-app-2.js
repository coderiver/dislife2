$(document).ready(function() {
  //map
  function setMap() {
    const maps = document.querySelectorAll('.js-map');
    if (maps.length) {
      for (let i = 0; i < maps.length; i++) {
        let latitude = maps[i].dataset.latitude;
        let longitude = maps[i].dataset.longitude;

        if (typeof ymaps === 'undefined') {
          return;
        } else {
          ymaps.ready(function () {
            var myMap = new ymaps.Map(maps[i], {
              center: [latitude, longitude],
              zoom: 14,
              scrollZoom: false,
              controls: []
            }, {
              searchControlProvider: 'yandex#search'
            });
            myMap.behaviors.disable('scrollZoom');
            myMap.behaviors.disable('drag');
          });
        }

        
      }
      
    };

  };
  setMap();
  

  //slider
  function setMobSlider() {
    const $slider = $('.js-mob-slider');

    if ($slider.length) {   

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
      if ($(el).hasClass('slick-initialized')) {
        $(el).slick('unslick');
      };      
    };
  });
    }   
  };

  setMobSlider();
  $(window).on('resize', setMobSlider);

  //tabs
  function tabs() {

    const $tab = $('.js-tabs-btn');
    const $item = $('.js-tabs-item');


    $tab.on('click', function(e) {
      e.preventDefault();
      let tabData = $(this).data('target-tab');

      let $tabTargetItem = $('[data-tab="'+tabData+'"]');
      let $tabTargetItemElse = $('.js-tabs-item:not([data-tab="'+tabData+'"])');
      let $tabElse = $('.js-tabs-btn').not($(this));

      $(this).addClass('is-active');
      $tabTargetItem.addClass('is-active');
      $tabElse.removeClass('is-active');
      $tabTargetItemElse.removeClass('is-active');    
    });

  };
  tabs();

  //filter-tags
  function filterTags() {
    const $filterTag = $('.js-filter-tag');
    const $filterTagParent = $filterTag.closest('.filter-tags');    

    $filterTag.each(function(index, el) {
      let $tag = $(el);
      let $close = $tag.closest('.filter-tag__wrap').find('.js-filter-tag-close');  

      $tag.on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        let $wrap = $(this).closest('.js-filter-tags');
        let $tags = $wrap.find('.js-filter-tag');


          
          if ($(this).hasClass('js-filter-tag-single')) {
            $tags.removeClass('is-active');
            $(this).addClass('is-active');
          } else {
            $(this).addClass('is-active');
          }
        
      });

      $close.on('click', function(e){
        e.preventDefault();
        let $tag = $(this).closest('.filter-tag__wrap').find('.js-filter-tag');
        $tag.removeClass('is-active');
      });

    });

    $filterTagParent.each(function(index, el) {
      let $wrap = $(el);
      let $moreBtn = $wrap.find('.js-filter-tag-more');

      

      function setMobFilterTags() {
        if ($moreBtn.length && $(window).outerWidth() <= 660) {
          let $tags = $wrap.find('.js-filter-tag');
          let tagsHidden = [];
          $moreBtn.addClass('is-active');
          for (let i = 0; i < $tags.length; i++) {
            if (i>=4) {
              tagsHidden.push($tags[i]);
            }          
          }
          $(tagsHidden).addClass('is-hidden');
          $moreBtn.on('click', function(e) {
            e.preventDefault();
            $(tagsHidden).removeClass('is-hidden');
            $(this).removeClass('is-active');
          });
        } else {
          $moreBtn.removeClass('is-active');
          $filterTag.removeClass('is-hidden');
        }
      };       


      setMobFilterTags();
      $(window).on('resize', setMobFilterTags);

    });
  };

  filterTags();

  //items-map

  function toggleItemsMap() {
    const $toggleMapShow = $('.js-item-map-show');
    const $toggleMapHide = $('.js-item-map-hide');


    $toggleMapShow.on('click', function(event) {
      event.preventDefault();
      let $item = $(this).closest('.request-item');
      let $map = $item.find('.js-item-map');
      let $hideBtn = $item.find('.js-item-map-hide');

      $(this).removeClass('is-active');
      $hideBtn.addClass('is-active');
      $map.addClass('is-active');
    });
    $toggleMapHide.on('click', function(event) {
      event.preventDefault();
      let $item = $(this).closest('.request-item');
      let $map = $item.find('.js-item-map');
      let $showBtn = $item.find('.js-item-map-show');

      $(this).removeClass('is-active');
      $showBtn.addClass('is-active');
      $map.removeClass('is-active');
    });
  };

  toggleItemsMap();

  //toggle text

  function hidetext() {
    const $hiddenDescr = $('.js-descr');

    $hiddenDescr.each(function(index, el) {
      let $descr = $(el);
      let $descrHtml = $descr.html();
      let $descrEls = $descr.find('p');
      let descrText = $descrEls.text();
      let charactersNmb = 100;
      let shortText = descrText.slice(0, charactersNmb);
      let $item = $descr.closest('.request-item');
      let $showLink = $item.find('.js-show-link');
      let $hideLink = $item.find('.js-hide-link');


      function hideText() {
        $descr.html('<p>'+shortText+'...</p>');
        $showLink.addClass('is-active');
        $hideLink.removeClass('is-active');
      };

      function showText() {
        $descr.html($descrHtml);
        $showLink.removeClass('is-active');
        $hideLink.addClass('is-active');
      };

      if (descrText.length > charactersNmb) {
        hideText();
      };

      $showLink.on('click', function(e) {
        e.preventDefault();
        showText();
      });

      $hideLink.on('click', function(e) {
        e.preventDefault();
        hideText();
      });
    });    


  };

  hidetext();

  //detect ie

  if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
  {
    $('.catalog-item').addClass('is-ie');
  }
  
  


});