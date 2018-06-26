
$(document).ready(function() {

  //map
  function setMap() {
    var $maps = $('.js-map');


    if ($maps.length) {
      $maps.each(function(index, elem) {
        var latitude = $(elem).data('latitude');
        var longitude = $(elem).data('longitude');


        if (typeof ymaps === 'undefined') {
          return;
        } else {
          ymaps.ready(function () {
            var myMap = new ymaps.Map(elem, {
              center: [latitude, longitude],
              zoom: 14,
              scrollZoom: false,
            }, {
              searchControlProvider: 'yandex#search'
            });
            myMap.behaviors.disable('scrollZoom');

            var $applModals = $('.js-appl-modal');

            $applModals.each(function(index, el) {
              var $modalItem = $(el);
              var applLatitude = $modalItem.data('latitude');
              var applLongitude = $modalItem.data('longitude');
              var dataLink = $modalItem.data('popup');
              var dataTitle = $modalItem.data('title');

              var markerElHTML = '<div class="map-icon js-open-popup" data-link="'+dataLink+'"><img src="img/volonter/location.png" alt="" /><div class="map-icon__title">'+dataTitle+'</div></div>';

              var markerLayout = ymaps.templateLayoutFactory.createClass(markerElHTML, {

                build: function () {
                  markerLayout.superclass.build.call(this);

                  this._events = ymaps.domEvent.manager.group(this.getElement());
                  var el = this._events;
                  el.add('click', function () {
                    var icon = el.events.htmlElement.firstChild;
                    var link = $(icon).data('link');
                    var popup = $('[data-popup="' + link + '"]');
                    popup.addClass('is-open');              
                    return false;

                  });
                },

                clear: function () {
                  this._events.removeAll();
                  markerLayout.superclass.clear.call(this);
                }
              });

              var myPlacemark = new ymaps.Placemark(
                [applLatitude, applLongitude], {}, {
                  iconLayout: markerLayout,
                  iconPane: 'overlaps'
                }
                );


              if (!$(myMap.container._parentElement).hasClass('map_in-item')) {
                myMap.geoObjects.add(myPlacemark);
              };

            });

            if ($(myMap.container._parentElement).hasClass('map_in-item')){
              var dataIconTitle = $(myMap.container._parentElement).data('icon-title');              
              var markerElHTML = '<div class="map-icon js-open-popup"><img src="img/volonter/location.png" alt="" /><div class="map-icon__title">'+dataIconTitle+'</div></div>';
              var markerLayout = ymaps.templateLayoutFactory.createClass(markerElHTML, {

                build: function () {
                  markerLayout.superclass.build.call(this);
                },
                clear: function () {
                  markerLayout.superclass.clear.call(this);
                }
              });
              var myPlacemark2 = new ymaps.Placemark(
                [latitude, longitude], {}, {
                  iconLayout: markerLayout,
                  iconPane: 'overlaps'
                }
                );
              myMap.geoObjects.add(myPlacemark2);
            };                     

            
          });
          
        }        
      });
      
    };

  };
  setMap();


  //slider
  function setMobSlider() {
    var $slider = $('.js-mob-slider');

    if ($slider.length) {   

      $slider.each(function(index, el) {
        var $sliderWrap = $(el).parent();
        var $sliderNext = $sliderWrap.find('.js-mob-slider-next');
        var $sliderPrev = $sliderWrap.find('.js-mob-slider-prev');
        var type = $(el).data('mob-slider');

        var sliderOpt = {
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

    var $tab = $('.js-tabs-btn');
    var $item = $('.js-tabs-item');

    $tab.on('click', function(e) {
      e.preventDefault();
      var tabData = $(this).data('target-tab');

      var $tabTargetItem = $('[data-tab="'+tabData+'"]');
      var $tabTargetItemElse = $('.js-tabs-item:not([data-tab="'+tabData+'"])');
      var $tabElse = $('.js-tabs-btn').not($(this));

      $(this).addClass('is-active');
      $tabTargetItem.addClass('is-active');
      $tabElse.removeClass('is-active');
      $tabTargetItemElse.removeClass('is-active');
      if ($tabTargetItem.hasClass('is-active')) {
        var tabTargetItemData = $tabTargetItem.data('tab');
        var $tabBtn = $('[data-target-tab="'+tabTargetItemData+'"');
        $tabBtn.addClass('is-active');
     }   
    });

  };
  tabs();


  //filter-tags
  function filterTags() {
    var $filterTag = $('.js-filter-tag');
    var $filterTagParent = $filterTag.closest('.filter-tags');    

    $filterTag.each(function(index, el) {
      var $tag = $(el);
      var $close = $tag.closest('.filter-tag__wrap').find('.js-filter-tag-close');  

      $tag.on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var $wrap = $(this).closest('.js-filter-tags');
        var $tags = $wrap.find('.js-filter-tag');


          
          if ($(this).hasClass('js-filter-tag-single')) {
            $tags.removeClass('is-active');
            $(this).addClass('is-active');
          } else {
            $(this).addClass('is-active');
          }
        
      });

      $close.on('click', function(e){
        e.preventDefault();
        var $tag = $(this).closest('.filter-tag__wrap').find('.js-filter-tag');
        $tag.removeClass('is-active');
      });

    });

    $filterTagParent.each(function(index, el) {
      var $wrap = $(el);
      var $moreBtn = $wrap.find('.js-filter-tag-more');

      

      function setMobFilterTags() {
        if ($moreBtn.length && $(window).outerWidth() <= 660) {
          var $tags = $wrap.find('.js-filter-tag');
          var tagsHidden = [];
          $moreBtn.addClass('is-active');
          for (var i = 0; i < $tags.length; i++) {
            if (i>=4) {
              tagsHidden.push($tags[i]);
            }          
          };
          $(tagsHidden).addClass('is-hidden');
          $moreBtn.on('click', function(e) {
            e.preventDefault();
            $(tagsHidden).removeClass('is-hidden');
            $(this).removeClass('is-active');
          });
        } else {
          $moreBtn.removeClass('is-active');
          $filterTag.removeClass('is-hidden');
        };
      };       


      setMobFilterTags();
      $(window).on('resize', setMobFilterTags);

    });
  };

  filterTags();

  //items-map

  function toggleItemsMap() {
    var $toggleMapShow = $('.js-item-map-show');
    var $toggleMapHide = $('.js-item-map-hide');


    $toggleMapShow.on('click', function(event) {
      event.preventDefault();
      var $item = $(this).closest('.request-item');
      var $map = $item.find('.js-item-map');
      var $hideBtn = $item.find('.js-item-map-hide');

      // $(this).removeClass('is-active');
      // $hideBtn.addClass('is-active');
      $map.toggleClass('is-active');
    });
    // $toggleMapHide.on('click', function(event) {
    //   event.preventDefault();
    //   let $item = $(this).closest('.request-item');
    //   let $map = $item.find('.js-item-map');
    //   let $showBtn = $item.find('.js-item-map-show');

    //   $(this).removeClass('is-active');
    //   $showBtn.addClass('is-active');
    //   $map.removeClass('is-active');
    // });
  };

  toggleItemsMap();

  //toggle text

  function hidetext() {
    var $hiddenDescr = $('.js-descr');

    $hiddenDescr.each(function(index, el) {
      var $descr = $(el);
      var $descrHtml = $descr.html();
      var $descrEls = $descr.find('p');
      var descrText = $descrEls.text();
      var charactersNmb = 100;
      var shortText = descrText.slice(0, charactersNmb);
      var $item = $descr.closest('.request-item');
      var $showLink = $item.find('.js-show-link');
      var $hideLink = $item.find('.js-hide-link');


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