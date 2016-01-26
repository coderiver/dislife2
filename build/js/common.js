$(document).ready(function() {

	$('.js-tab').click(function(event) {
		event.preventDefault();
		$(this).addClass('is-active');
		$(this).siblings().removeClass('is-active');
	});

	$('.js-mini-search-btn').click(function() {
		$('.js-mini-search-input').toggleClass('is-active');
	});

	$('.js-nav').each(function() {
		$('.js-nav-btn').click(function() {
			if ($(this).hasClass('is-active')) {
				$('.js-nav-btn').removeClass('is-active');
				$('.js-nav').removeClass('is-active');
				$('body').removeClass('overflow-hidden');
			}
			else {
				$('.js-nav-btn').addClass('is-active');
				$('.js-nav').addClass('is-active');
				$('body').addClass('overflow-hidden');
			}
			return false;
		});
		$('body').on('click', function() {
			$('.js-nav-btn').removeClass('is-active');
			$('.js-nav').removeClass('is-active');
			$('body').removeClass('overflow-hidden');
		});
		$(this).on('click', function(event) {
			event.stopPropagation();
		});
	});

});