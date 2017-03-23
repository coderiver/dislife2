$(document).ready(function() {
	(function() {
		var toggle = $('.js-toggle');

		toggle.each(function() {
			console.log('toggle');
			var $this = $(this);
			var button = $this.find('.js-toggle-button');
			var container = $this.find('.js-toggle-container');
			container.hide();
			button.click(function(e) {
				e.preventDefault();
				container.stop(true,true,true).slideToggle(400);
			});
		});
	})();
});