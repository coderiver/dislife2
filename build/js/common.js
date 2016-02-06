$(document).ready(function() {

	$('.js-tab').click(function(event) {
		event.preventDefault();
		$(this).addClass('is-active');
		$(this).siblings().removeClass('is-active');
	});


	function navClose() {
		$('.js-nav-btn').removeClass('is-active');
		$('.js-nav').removeClass('is-active');
		$('body').removeClass('overflow-hidden');
	};

	$('.js-nav').each(function() {
		$('.js-nav-btn').click(function() {
			if ($(this).hasClass('is-active')) {
				navClose();
			}
			else {
				$('.js-nav-btn').addClass('is-active');
				$('.js-nav').addClass('is-active');
				$('body').addClass('overflow-hidden');
			}
			return false;
		});
		$('body').on('click', function() {
			navClose();
		});
		$(this).on('click', function(event) {
			event.stopPropagation();
		});
	});

	$(window).resize(function() {
		if ($(window).width() >= 990) {
			navClose();
		};
	});

	//slider
	$('.js-slider').slick({
		fade: true,
		dots: true,
		nextArrow: $('.js-slider-next'),
		prevArrow: $('.js-slider-prev'),
		adaptiveHeight: true,
		autoplay: true,
  		autoplaySpeed: 5000,
		pauseOnHover: false,
		responsive: [
		   {
			 breakpoint: 660,
			 settings: {
				 autoplay: false,
			 }
		   },
	   ]
	});
	$('.js-slider-images').each(function() {

		var prev = $(this).siblings('.js-slider-prev'),
			next = $(this).siblings('.js-slider-next');;

		$(this).slick({
			fade: true,
			dots: true,
			nextArrow: next,
			prevArrow: prev,
			adaptiveHeight: true
		});
	});
	//select
	$('.js-select').each(function() {
		var selectField = $(this),
			select = selectField.find('select'),
			selectText = selectField.find('.js-select-text'),
			selectList = selectField.find('.js-select-list li');

		selectText.click(function() {
			if (selectField.hasClass('is-active')) {
				$('.js-select').removeClass('is-active');
			}
			else {
				$('.js-select').removeClass('is-active');
				selectField.addClass('is-active');
			}
			return false;
		});

		$('body').click(function() {
			$('.js-select').removeClass('is-active');
		});

		selectList.click(function() {
			var id = $(this).data('val');

			select.find('option').removeAttr('selected');

			select.find('option[value="' + id + '"]').attr('selected', 'selected');

			selectText.text($(this).text());

			$('.js-select').removeClass('is-active');

			return false;
		});

		select.change(function() {
			selectText.text($(this).find('option:selected').text());
		});

	});

	// expand img
	// function launchIntoFullscreen(element) {
	// 	if (element.requestFullscreen) {
	// 		element.requestFullscreen();
	// 	} else if (element.mozRequestFullScreen) {
	// 		element.mozRequestFullScreen();
	// 	} else if (element.webkitRequestFullscreen) {
	// 		element.webkitRequestFullscreen();
	// 	} else if (element.msRequestFullscreen) {
	// 		element.msRequestFullscreen();
	// 	}
	// }

	// $('.js-expand').click(function(e) {
	// 	e.preventDefault();
	// 	var img = this.closest('.expand').querySelector('img');

	// 	launchIntoFullscreen(img);
	// });

	//header
	if ($('.js-header').length) {
		function getScrollTop(){
			if(typeof pageYOffset!= 'undefined'){
				return pageYOffset;
			}
			else{
				var b = document.body;
				var d = document.documentElement;
				d = (d.clientHeight)? d : b;
				return d.scrollTop;
			}
		}

		var scrollTop = 0;

		function headerScroll() {
			var scrollNow = $(window).scrollTop();

			if (scrollNow > scrollTop) {
				if(getScrollTop() > $('.js-header').offset().top) {
					$('.js-header').addClass('is-hidden');
				}
			}
			else {
				if (scrollTop - scrollNow > 10) {
					if(getScrollTop() > 10) {
						$('.js-header').removeClass('is-hidden');
					}
					else {
						$('.js-header').removeClass('is-hidden');
					}
				};
			}

			scrollTop = scrollNow;

			if (getScrollTop() < $('.js-header').offset().top + $('.js-header').outerHeight()) {
				$('.js-header').removeClass('is-hidden');
			}

			if ($(window).scrollTop() > $('.js-header').offset().top) {
				$('.js-header').addClass('is-fixed');
			}
			else {
				$('.js-header').removeClass('is-fixed');
			}

			$('.js-header').css('min-height', $('.js-header').find('.header__fixed').outerHeight());
		}

		$(window).on('scroll', function() {
			headerScroll();
		});
		$(window).on('load', function() {
			headerScroll();
		});
		$(window).on('resize', function() {
			headerScroll();
		});
	}

	//scroll
	$('.js-scroll').perfectScrollbar();

	//social fixed
	function stickySocial() {
		if ($('.js-sticky').length) {
			var el = $('.js-sticky');
			var stickyTop = $('.js-sticky').offset().top;
			var footerTop = $('.js-sticky-end').offset().top;
			var stickyHeight = $('.js-sticky').outerHeight();
			var limit = footerTop - stickyHeight - 90;
			$(window).scroll(function(){
				var windowTop = $(window).scrollTop();
				if ($(window).width() >= 1150) {

					if (stickyTop-90 < windowTop){
						el.css({ position: 'fixed', top: 0 });
						el.addClass('is-active');
					}
					else {
						el.css('position','static');
						el.removeClass('is-active');
					}

					if (limit < windowTop) {
						var diff = limit - windowTop;
						el.css({top: diff});
					}
				}
			});
		}
	}
	$(window).load(function() {
		if ($(window).width() > 1150) {
			stickySocial();
		}
	});
	$(window).resize(function() {
		if ($(window).width() >= 1150) {
			stickySocial();
		}
		else {
			$('.js-sticky').removeAttr('style');
		}
	});
	//accordion
	$('.js-accordion-title').click(function() {
		var el = $(this),
			elBlock = $(this).siblings('.js-accordion-block');

		el.parents('.js-accordion').find('.js-slider-images').slick('unslick');
		elBlock.slideToggle('slow', function() {
			el.parents('.js-accordion').find('.js-slider-images').each(function() {

				var prev = $(this).siblings('.js-slider-prev'),
					next = $(this).siblings('.js-slider-next');;

				$(this).slick({
					fade: true,
					dots: true,
					nextArrow: next,
					prevArrow: prev,
					adaptiveHeight: true
				});
			});
		});
		return false;
	});

	// tabs
	function tabsLoad() {
       $(".js-tabs").each(function(){
         if ($(this).find('.js-tabs-link.is-active').length) {
            var index = $(this).find(".is-active").index();
         	$(this).find(".js-tabs-content").eq(index).show();
         }
         else {
           $(this).find('.js-tabs-link').eq(0).addClass("is-active");
           $(this).find(".js-tabs-content").eq(0).show();
         }
       });
   }
   tabsLoad();
    $('.js-tabs-link').on("click",function () {
		console.log('was')
			var tabs = $(this).parents(".js-tabs");
			var tabsCont = tabs.find(".js-tabs-content");
			var index = $(this).index();
			tabs.find(".js-tabs-link").removeClass("is-active");
	      	$(this).addClass("is-active");
			tabsCont.hide();
			tabsCont.eq(index).show();
			return false;
    });

	// popup

	$('.js-open-popup').on('click', function () {
		var link = $(this).data('link');
		var popup = $('[data-popup="' + link + '"]');
		popup.addClass('is-open');
		return false;
	});

	$('.js-close-popup').on('click', function () {
		var popup = $(this).parents('.js-popup');

		popup.removeClass('is-open');
	});

});
