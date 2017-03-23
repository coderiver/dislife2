//=include lib/jquery.datetimepicker.full.min.js

$(document).ready(function() {
	$.datetimepicker.setLocale('ru');

	var datepicker = $('.js-datepicker');

	datepicker.each(function() {
		var $this = $(this);
		$this.datetimepicker({
			format: 'd.m.Y H:i'
		});
	});
});