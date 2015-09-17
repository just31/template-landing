$(document).ready(function() {

    // ���������� ���-����, ������� � ������� ajax-�������.

    // ������� I, ����������� div.header__link, ������� ul-�������� �� ����� menu1.html:

    // ������ � div'ax �������� div-�������, � ������� .header__link. ������ ��� id.
    var id = $("div").children(".header__link").attr('id');
    $.ajax({
        url: 'ajax/'+id+'.html',
        success: function(data) {
            // ������ � �������� div-�������, � ������� .header__link
            var $matched = $(".row").find(".header__link");

            // �������� ��� ������� �� ����� menu1.html
            $matched.append(data);

            // ������� � ��������� div, ul-�������
            $matched_ul = $matched.find("ul")
                .addClass('matched');

            // ������ ������ ��� ���������� ul-��������, ��� ����������� li
            // � ������� �� ������� ����� result
            $matched_ul.find("li")
                .addClass("result");
        }
    });


    // ������� II, ����������� li ������ ���������� ul:

    // ������ ������� id, ������� ul-��������
    // var id = $('ul:first').attr('id');
    /*
    $.ajax({
    url: 'ajax/'+id+'.html',
        success: function(data) {
            // ������ � �������� ������ ul-�������
            var $matched = $('ul:first');

            // ������� ��� � �������� ��� ������, ������� �� ����� menu1.html
            $matched
                .addClass('matched').append(data);

            // ������ ������ ��� ���������� ul-��������, ��� ����������� li
            // � ������� �� ������� ����� result
            $matched.find("li")
                .addClass("result");
        }
    });
    */


    // �������, ������������ ����� ���������� 'os-x' � 'windows'.
	$('.header__menu a').click(function(e){
	    e.preventDefault();
		$('.header__menu .header__menu_active').removeClass('header__menu_active');
		$(this).addClass('header__menu_active');
		var tab = $(this).attr('href');
        $('.header__choose-devices__tab').not(tab).animate({'z-index' : 100 , 'opacity' : 1}, 1000);
		$(tab).animate({'z-index' : 10 , 'opacity' : .01}, 1000);
	});

    // ��������� ������� ��������, ������ ������
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