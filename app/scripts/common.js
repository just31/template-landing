$(function () {

	'use strict';

    // Слайдер, переключение между картинками 'os-x' и 'windows'.

	$(document).ready(function(){
	    $('.header__button a').click(function(e){
		    e.preventDefault();
			$('.header__button .header__button_active').removeClass('header__button_active');
			$(this).addClass('header__button_active');
			var tab = $(this).attr('href');
            $('.header__choose-devices__tab').not(tab).animate({'z-index' : 100 , 'opacity' : 1}, 1000);
			$(tab).animate({'z-index' : 10 , 'opacity' : .01}, 1000);

            $('#tab2__img').css({'margin-top' : '-180px', 'margin-left' : '42px'});
		});

	});

    /*
    $(document).ready(function(){
	    $('.header__button a').click(function(e){
		    e.preventDefault();
			$('.header__button .header__button_active').removeClass('header__button_active');
			$(this).addClass('header__button_active');
			var tab = $(this).attr('href');
            $('.header__choose-devices__tab').not(tab).css({'display' : 'none'});
			$(tab).fadeIn(1000);

            $('#tab2__img').css({'margin-top' : '0', 'margin-left' : '0'});
		});
	});
    */

});
