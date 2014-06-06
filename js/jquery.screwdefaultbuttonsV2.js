/*!
 * ScrewDefaultButtons v2.0.6
 * http://screwdefaultbuttons.com/
 *
 * Licensed under the MIT license.
 * Copyright 2013 Matt Solano http://mattsolano.com
 *
 * Date: Mon February 25 2013
 */

;(function( $, window, document, undefined ){

	var methods = {

		init : function(options) {

			var defaults = $.extend( {
				image:	null,
				width:	50,
				height:	50,
				disabled: false
			}, options);

			return this.each(function(i){

				var $this = $(this);

				var $thisImage = defaults.image;
				var dataImage = $this.data('sdb-image');
				if (dataImage){
					$thisImage = dataImage;
				}

				if (!$thisImage){
					$.error( 'There is no image assigned for ScrewDefaultButtons' );
				}

				$this.wrap('<div >').css({'display': 'none'});

				var buttonClass = $this.attr('class');
				var buttonClick = $this.attr('onclick');

				var $thisParent = $this.parent('div');

				var inputId = $this.attr('id');
				var assocLabel = inputId && $('label[for="' + inputId + '"]');
				if (assocLabel) {
					$thisParent.attr('title', assocLabel.text());
				}

				$thisParent.addClass(buttonClass);
				$thisParent.attr('onclick',buttonClick );
				$thisParent.css({
					'background-image': $thisImage,
					width:	defaults.width,
					height: defaults.height,
					cursor: 'pointer'
				});

				var uncheckedPos = 0;
				var checkedPos = -(defaults.height);
				if ($this.is(':disabled')){
					uncheckedPos = -(defaults.height * 2);
					checkedPos = -(defaults.height * 3);
				}

				$this.on('disableBtn', function(){
					$this.attr('disabled', 'disabled');
					uncheckedPos = -(defaults.height * 2);
					checkedPos = -(defaults.height * 3);
					$this.trigger('resetBackground');
				});

				$this.on('enableBtn', function(){
					$this.removeAttr('disabled');
					uncheckedPos = 0;
					checkedPos = -(defaults.height);
					$this.trigger('resetBackground');
				});

				$this.on('resetBackground', function(){
					if ($this.is(':checked')){
						$thisParent.css({
							backgroundPosition: '0 ' + checkedPos + "px"
						});
					}
					else {
						$thisParent.css({
							backgroundPosition: '0 ' + uncheckedPos + "px"
						});
					}
				});

				$this.trigger('resetBackground');

				if ($this.is(':checkbox')){

					$thisParent.on('click', function(){
						if (!($this.is(':disabled'))){
							$this.change();
						}
					});

					$thisParent.on('keydown', function (e) {
						if (e.which === 32) {
							e.preventDefault();
							$thisParent.trigger('click');
						}
					});

					$thisParent.addClass('styledCheckbox');
					$thisParent.attr('tabindex', '0');
					$thisParent.attr('role', 'checkbox');

					$this.on('change', function(){
						if ($this.prop('checked')){
							$this.prop("checked", false);
							$thisParent.css({
								backgroundPosition: '0 ' + uncheckedPos + "px"
							});

							$thisParent.attr('aria-checked', 'false');
						}
						else {
							$this.prop("checked", true);
							$thisParent.css({
								backgroundPosition:  '0 ' + checkedPos + "px"
							});
							$thisParent.attr('aria-checked', 'true');
						}
					});

				}
				else if ($this.is(':radio')) {
					$thisParent.addClass('styledRadio');

					var $thisName = $this.attr('name');
					var checkedRadio = $('input[name="' + $thisName + '"]:checked');

					$thisParent.attr('tabindex', '-1');

					if (checkedRadio.length > 0) {
						$(checkedRadio[0].parentNode).attr('tabindex', '0');
					} else if (i === 0) {
						$thisParent.attr('tabindex', '0');
					}

					$thisParent.attr('role', 'radio');

					$thisParent.on('click', function(){
						if (!($this.prop('checked')) && !($this.is(':disabled'))){
							$this.change();
						}

						$('input[name="' + $thisName + '"]').each(function (){
							$(this).parent()
								.attr('tabindex', '-1')
								.attr('aria-checked', 'false');
						});

						$thisParent
							.attr('tabindex', '0')
							.attr('aria-checked', 'true');
						$thisParent[0].focus();
					});

					var $radioGroup = $('input[name="' + $thisName + '"]');

					$thisParent.on('keydown', function (e){
						var nextUp;
						var thisIndex = $.inArray($this[0], $radioGroup);

						var which = e.which;
						if (which == 13 || which === 32) {
							e.preventDefault();
							$thisParent.trigger('click');
						} else if (which === 37 || which === 38) {
							if (thisIndex > -1 && $radioGroup[thisIndex - 1]) {
								nextUp = $radioGroup[thisIndex - 1].parentNode;
								e.preventDefault();
								$(nextUp).trigger('click');
							}
						} else if (which === 39 || which === 40) {
							if (thisIndex > -1 && $radioGroup[thisIndex + 1]) {
								nextUp = $radioGroup[thisIndex + 1].parentNode;
								e.preventDefault();
								$(nextUp).trigger('click');
							}
						}
					});


					$this.on('change', function(){
						if ($this.prop('checked')){
							$this.prop("checked", false);
								$thisParent.css({
									backgroundPosition:  '0 ' + uncheckedPos + "px"
								});
						}
						else {
							$this.prop("checked", true);
								$thisParent.css({
									backgroundPosition:  '0 ' + checkedPos + "px"
								});

							var otherRadioBtns = $('input[name="'+ $thisName +'"]').not($this);
							otherRadioBtns.trigger('radioSwitch');
						}
					});

					$this.on('radioSwitch', function(){
						$thisParent.css({
							backgroundPosition: '0 ' + uncheckedPos  + "px"
						});

					});

					var $thisId = $(this).attr('id');
					var $thisLabel = $('label[for="' + $thisId + '"]');
					$thisLabel.on('click', function(){
						$thisParent.trigger('click');
					});
				}

				if(!$.support.leadingWhitespace){
					var $thisId = $(this).attr('id');
					var $thisLabel = $('label[for="' + $thisId + '"]');
					$thisLabel.on('click', function(){
						$thisParent.trigger('click');
					});
				}

			});

		},
		check : function() {
			return this.each(function(){
				var $this = $(this);
				if (!methods.isChecked($this)){
					$this.change();
				}
			});
		},
		uncheck : function() {
			return this.each(function(){
				var $this = $(this);
				if (methods.isChecked($this)){
					$this.change();
				}
			});
		},
		toggle: function(){
			return this.each(function(){
				var $this = $(this);
				$this.change();
			});
		},
		disable : function() {
			return this.each(function(){
				var $this = $(this);
				$this.trigger('disableBtn');
			});
		},
		enable: function(){
			return this.each(function(){
				var $this = $(this);
				$this.trigger('enableBtn');
			});
		},
		isChecked: function($this){
				if ($this.prop('checked')){
					return true;
				}
				return false;
		}
	};

	$.fn.screwDefaultButtons = function( method, options) {

		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.screwDefaultButtons' );
		}

	};

	return this;

})( jQuery );
