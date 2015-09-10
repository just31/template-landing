$(function () {

	'use strict';

    // Слайдер, переключение между картинками 'os-x' и 'windows'.
	$('.header__button a').click(function(e){
	    e.preventDefault();
		$('.header__button .header__button_active').removeClass('header__button_active');
		$(this).addClass('header__button_active');
		var tab = $(this).attr('href');
		$('.header__choose-devices__tab').not(tab).css({'display':'none'});
		$(tab).fadeIn(400);

        $('#tab2__img').css({'margin-top' : '0', 'margin-left' : '0'});
	});

});
