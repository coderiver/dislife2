$(document).ready(function() {

	$('.js-tab').click(function() {
		$(this).addClass('is-active');
		$(this).siblings().removeClass('is-active');
	});

	$('.js-mini-search-btn').click(function() {
		$('.js-mini-search-input').toggleClass('is-active');
	});

});