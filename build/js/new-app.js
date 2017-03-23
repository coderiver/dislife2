$(document).ready(function() {

	var desktopMD = function() {
		return window.matchMedia('(max-width: 1320px)').matches;
	};

	(function() {
		//MAP
		ymaps.ready(function () {
			var myMap = new ymaps.Map('big-map', {
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
		//SCROLL
		var requestScroll = $('[data-scrollable]');

		$(window).on('resize', function() {
			setCurrentHeight();
		});
		setCurrentHeight();

		function setCurrentHeight() {
			if (desktopMD()) {
				requestScroll.removeAttr('style');
				requestScroll.perfectScrollbar('destroy');
				requestScroll.scrollInited = false;
				return;
			}

			if (!requestScroll.scrollInited) {
				requestScroll.scrollInited = true;
				requestScroll.perfectScrollbar();
			}

			requestScroll.each(function() {
				var $this = $(this);
				$this.css('max-height', '100%');
				var target = $this.data('scrollable');
				var container = $this.closest('[data-scroll-parent="' + target + '"]');
				var scrollEnd = container.find('[data-scrollend="' + target + '"]');
				var parentHeight = container.height();
				var positionTop = $this.position().top;
				if (scrollEnd.length) {
					var height = parentHeight - positionTop - scrollEnd.outerHeight();
					$this.css('max-height', height);
				} else {
					if ($this.outerHeight() + positionTop <= parentHeight) return;
					var height = parentHeight - positionTop;
					$this.css('max-height', height);
				}
			});
			requestScroll.perfectScrollbar('update');
		}

		//almost tabs
		var changeStateButton = $('.js-show-button');
		var changeStateContainer = $('.js-show-container');

		changeStateButton.click(function(e) {
			e.preventDefault();
			var $this = $(this);
			var currentState = $this.data('target');

			changeStateContainer.attr('data-state', currentState);
			setCurrentHeight();

			//update selectbox
			var allSelects = changeStateContainer.find('.js-select-box');
			if (allSelects.length) {
				allSelects.selectBox('destroy');
				allSelects.selectBox();
			}

			//reset form on close
			if ($this.attr('type') !== 'reset') return;
			var form = $this.closest('form');
			if (!form.length) return;
			$this.closest('form').get(0).reset();
		});
	})();

	//tooltip
	(function() {
		var tooltipItem = $('.js-tooltip-item');
		var tooltipHint = $('.js-tooltip-hint');
		var activeHint = null;
		var activeItem = null;

		tooltipItem.hover(function() {
			activeItem = $(this);
			var target = activeItem.data('tooltip');
			var text = activeItem.data('title');
			activeHint = tooltipHint.filter('[data-tooltip="' + target + '"]');
			activeHint.html('<div>' + text + '</div><span></span>');
			var arrow = activeHint.find('span');

			var hintRight = activeHint.offset().left + activeHint.outerWidth();
			var itemCenter = activeItem.offset().left + activeItem.outerWidth()/2;
			var arrowPosition = hintRight - itemCenter;

			arrow.css('right', arrowPosition);
			activeHint.addClass('is-active');
		}, function() {
			activeHint.removeClass('is-active');
		});
	})();

	//show on input focus
	(function() {
		var field = $('.js-show-onfocus-field');
		var container = $('.js-show-onfocus-container');
		var parent = $('.js-show-onfocus-parent');
		var activeContainer = null;
		var activeField = null;

		parent.on('scroll', function(e) {
			if (activeField && activeContainer) changeContainerPositon();
		});

		field.on({
			focus: function(e) {
				activeField = $(this);
				var target = activeField.data('field');
				activeContainer = container.filter('[data-container="' + target + '"]');
				changeContainerPositon();
				activeContainer.addClass('is-active');
			},
			blur: function(e) {
				container.removeClass('is-active');
			}
		});

		function changeContainerPositon() {
			var position = activeField.offset().top - parent.offset().top;
			activeContainer.css('top', position);
		}
	})();

});