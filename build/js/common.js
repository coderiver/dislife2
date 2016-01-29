$(document).ready(function() {

	$('.js-tab').click(function(event) {
		event.preventDefault();
		$(this).addClass('is-active');
		$(this).siblings().removeClass('is-active');
	});

	$('.js-mini-search-btn').click(function() {
		$('.js-mini-search-input').toggleClass('is-active');
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
		adaptiveHeight: true
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
	function launchIntoFullscreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}

	$('.js-expand').click(function(e) {
		e.preventDefault();
		var img = this.closest('.expand').querySelector('img');

		launchIntoFullscreen(img);
	});

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

});