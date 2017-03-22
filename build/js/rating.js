

//RATING
(function() {

	var ACTIVE = 'is-active';

	function Rating(config) {
		this._section = config.section;
		this._item = this._section.find(config.item);
		this._radio = this._section.find(config.radio);
		this._init();
	}

	Rating.prototype._init = function() {
		this._setItemNumber(this._item);
		this._setItemNumber(this._radio);
		this._setActive();
		this._toggleStateHover();
		this._setActiveOnChange();
	};

	Rating.prototype._setItemNumber = function(item) {
		item.each(function(index, el) {
			$(this).data('index', index);
		});
	};

	Rating.prototype._setActive = function() {
		this._active = this._radio.filter('[checked]');
		this._activeNumber = this._active.length
			? +this._active.data('index')
			: -1;

		this._addActiveState(this._activeNumber);
	};

	Rating.prototype._toggleStateHover = function() {
		var that = this;

		this._item.hover(function() {
			let index = +$(this).data('index');
			that._addActiveState(index);
		}, function() {
			that._addActiveState(that._activeNumber);
		});
	};

	Rating.prototype._setActiveOnChange = function() {
		var that = this;

		this._radio.on('change', function() {
			let _this = $(this);
			that._activeNumber = _this.data('index');
			that._addActiveState(that._activeNumber);
		});
	};

	Rating.prototype._addActiveState = function(currentNumber) {
		var that = this;

		this._item
			.removeClass(ACTIVE)
			.filter(function() {
				let index = +$(this).data('index');
				if (index <= currentNumber) return $(this);
			})
			.addClass(ACTIVE);
	};

	var rating = $('.js-rating');

	rating.each(function() {
		new Rating({
			section: $(this),
			item: '.js-rating-item',
			radio: '.js-rating-radio'
		});
	});

})();