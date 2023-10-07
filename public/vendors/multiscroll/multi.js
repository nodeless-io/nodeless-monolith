;
(function ($) {
    "use strict";
    $(window).on('load', function () {
        var onMobile = false;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            onMobile = true;
        }

        if ((onMobile === false)) {
            $('#multiscroll').multiscroll({
                verticalCentered: true,
                scrollingSpeed: 1200,
                easing: 'easeInOutQuint',
                menu: '#navigation',
                sectionsColor: [],
                navigation: true,
                navigationPosition: 'right',
                navigationColor: '#fff',
                navigationTooltips: [],
                loopTop: true,
                loopBottom: true,
                touchSensitivity: 5,
                responsiveWidth: 1024,
                responsiveExpand: true,
                afterLoad: function (anchorLink, index) {
                    if (index == '3') {
                        $(this).find("div.skillbar-bg").each(function () {
                            $(this).find(".custom-skillbar").delay(200).animate({
                                width: $(this).attr("data-percent")
                            }, 1500);
                        });
                    }
                    if (index == '2' || index == '4' || index == '6') {
                        $('#multiscroll-nav').removeClass('white');
                        $('.bar_menu span').css("background-color", "#051441");
                    } else {
                        $('#multiscroll-nav').addClass('white');
                        $('.bar_menu span').css("background-color", "#fff");
                    }
                    if (index == '3' || index == '5') {
                        $('.full_header').removeClass('content-white');
                    } else {
                        $('.full_header').addClass('content-white');
                    }
                    new WOW({
                        offset: 100,
                        mobile: true
                    }).init()
                }

            });
            $('#multiscroll-nav').addClass('white');
            $('.full_header').addClass('content-white');
        } else {
            $('#multiscroll').multiscroll({
                //                    menu: '#navigation',
                loopTop: true,
                loopBottom: true,
            });
            $('#multiscroll').multiscroll.destroy();
        }
    });
    
    if ($(window).width() < 1199) {
        $(".section_3").find("div.skillbar-bg").each(function () {
            $(this).find(".custom-skillbar").delay(200).animate({
                width: $(this).attr("data-percent")
            }, 1500);
        });
    }
})(jQuery)