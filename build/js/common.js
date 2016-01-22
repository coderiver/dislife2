$(document).ready(function() {

	$('.js-tab').click(function() {
		$(this).addClass('is-active');
		$(this).siblings().removeClass('is-active');
	});

});