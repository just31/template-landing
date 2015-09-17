$(document).ready(function() {

    // Заполнение топ-меню, данными с помощью ajax-запроса.

    // Вариант I, заполняется div.header__link, данными ul-элемента из файла menu1.html:

    // найдем в div'ax дочерний div-элемент, с классом .header__link. найдем его id.
    var id = $("div").children(".header__link").attr('id');
    $.ajax({
        url: 'ajax/'+id+'.html',
        success: function(data) {
            // найдем и сохраним div-элемент, с классом .header__link
            var $matched = $(".row").find(".header__link");

            // заполним его данными из файла menu1.html
            $matched.append(data);

            // выделим в найденном div, ul-элемент
            $matched_ul = $matched.find("ul")
                .addClass('matched');

            // найдем внутри уже выбранного ul-элемента, все добавленные li
            // и выделим их добавив класс result
            $matched_ul.find("li")
                .addClass("result");
        }
    });


    // Вариант II, заполняются li внутри найденного ul:

    // найдем атрибут id, первого ul-элемента
    // var id = $('ul:first').attr('id');
    /*
    $.ajax({
    url: 'ajax/'+id+'.html',
        success: function(data) {
            // найдем и сохраним первый ul-элемент
            var $matched = $('ul:first');

            // выделим его и заполним его список, данными из файла menu1.html
            $matched
                .addClass('matched').append(data);

            // найдем внутри уже выбранного ul-элемента, все добавленные li
            // и выделим их добавив класс result
            $matched.find("li")
                .addClass("result");
        }
    });
    */


    // Слайдер, переключение между картинками 'os-x' и 'windows'.
	$('.header__menu a').click(function(e){
	    e.preventDefault();
		$('.header__menu .header__menu_active').removeClass('header__menu_active');
		$(this).addClass('header__menu_active');
		var tab = $(this).attr('href');
        $('.header__choose-devices__tab').not(tab).animate({'z-index' : 100 , 'opacity' : 1}, 1000);
		$(tab).animate({'z-index' : 10 , 'opacity' : .01}, 1000);
	});

    // Определим текущее значение, ширины экрана
    var widthR = $(window).width();
    //console.log(widthR);
    if(widthR < '1265') {
        $('#tab2__img').css({'margin-top' : '-180px', 'margin-left' : '42px'});
    }

    /* $('.header__button a').click(function(e){
	    e.preventDefault();
		$('.header__button .header__button_active').removeClass('header__button_active');
		$(this).addClass('header__button_active');
		var tab = $(this).attr('href');
        $('.header__choose-devices__tab').not(tab).css({'display' : 'none'});
		$(tab).fadeIn(1000);

        $('#tab2__img').css({'margin-top' : '0', 'margin-left' : '0'});
	});*/
});