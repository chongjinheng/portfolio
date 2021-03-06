(function() {
    'use strict';
    // iPad and iPod detection
    var isiPad = function() {
        return (navigator.platform.indexOf('iPad') != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf('iPhone') != -1) ||
            (navigator.platform.indexOf('iPod') != -1)
        );
    };

    var fullHeight = function() {
        if (!isiPad() || !isiPhone()) {
            $('.js-fullheight-home').css('height', $(window).height());
            $(window).resize(function() {
                $('.js-fullheight-home').css('height', $(window).height());
            });
        }
    };

    // Loading page
    var loaderPage = function() {
        $(".fh5co-loader").fadeOut("slow");
    };

    // Particle ground effect
    var particleGround = function() {
        $('#particle-ground').particleground({
            parallax: true,
            dotColor: '#a5abc0',
            lineColor: '#969db6'
        });
    };

    var fh5coTabs = function() {
        // $('.fh5co-tabs-container').
        $('.fh5co-tabs li a').click(function(event) {
            event.preventDefault();
            var $this = $(this),
                tab = $this.data('tab');
            $('.fh5co-tabs li').removeClass('active');
            $this.closest('li').addClass('active');
            $this.closest('.fh5co-tabs-container').find('.fh5co-tab-content').removeClass('active');
            $this.closest('.fh5co-tabs-container').find('.fh5co-tab-content[data-tab-content="' + tab + '"]').addClass('active');
        });
    };

    var gridAutoHeight = function() {
        if (!isiPhone() || !isiPad()) {
            $('.fh5co-grid-item').css('height', $('.fh5co-2col-inner').outerHeight() / 2);
        }
        $(window).resize(function() {
            if (!isiPhone() && !isiPad()) {
                $('.fh5co-grid-item').css('height', $('.fh5co-2col-inner').outerHeight() / 2);
            }
        });
    };

    // var sliderSayings = function() {
    //     $('#fh5co-sayings .flexslider').flexslider({
    //         animation: "slide",
    //         slideshowSpeed: 5000,
    //         directionNav: false,
    //         controlNav: true,
    //         smoothHeight: true,
    //         reverse: true
    //     });
    // }

    var offcanvasMenu = function() {
        $('body').prepend('<div id="fh5co-offcanvas" />');
        $('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');

        $('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function() {
            var $this = $(this);
            $('#fh5co-offcanvas').append($this.clone());
        });
        // $('#fh5co-offcanvas').append
    };

    var mainMenuSticky = function() {

        $('.sticky').scrollToFixed();
        $(window).scroll(function() {

            if ($(window).scrollTop() > 1) {
                $('.js-top').addClass('active');
                // $('.fh5co-main-nav').animate({ backgroundColor: "white" }, "medium");
                $('.fh5co-main-nav').addClass('main-nav-leavehome');

                $('.fh5co-main-nav').css({
                    'position': 'fixed',
                    'top': 0,
                    'width': '100%',
                    'z-index': 99999
                }).addClass('fh5co-shadow');

                $('#down-arrow').hide();
            } else {
                $('.js-top').removeClass('active');
                // $('.fh5co-main-nav').css({ backgroundColor: "transparent" });
                $('.fh5co-main-nav').removeClass('main-nav-leavehome');
                $('.fh5co-main-nav').removeClass('fh5co-shadow');
                $('#down-arrow').show();
            }
        });
    };

    // Burger Menu
    var burgerMenu = function() {

        $('body').on('click', '.js-fh5co-nav-toggle', function(event) {

            var $this = $(this);

            if ($('body').hasClass('offcanvas-visible')) {
                $('body').removeClass('offcanvas-visible fh5co-overflow');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-visible fh5co-overflow');
                $this.addClass('active');
            }
            event.preventDefault();
        });
    };

    var scrolledWindow = function() {

        $(window).scroll(function() {

            var scrollPos = $(this).scrollTop();
            if ($('body').hasClass('offcanvas-visible')) {
                $('body').removeClass('offcanvas-visible');
                $('.js-fh5co-nav-toggle').removeClass('active');
            }
        });

        $(window).resize(function() {
            if ($('body').hasClass('offcanvas-visible')) {
                $('body').removeClass('offcanvas-visible');
                $('.js-fh5co-nav-toggle').removeClass('active');
            }
        });
    };

    // Click outside of offcanvass
    var mobileMenuOutsideClick = function() {

        $(document).click(function(e) {
            var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ($('body').hasClass('offcanvas-visible')) {

                    $('body').removeClass('offcanvas-visible');
                    $('.js-fh5co-nav-toggle').removeClass('active');
                }
            }
        });
    };

    var goToTop = function() {

        $('.js-gotop').on('click', function(event) {

            event.preventDefault();

            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500, 'easeInOutExpo');

            return false;
        });

        $(window).scroll(function() {

            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.js-top').addClass('active');
            } else {
                $('.js-top').removeClass('active');
            }
        });
    };

    // Page Nav
    var clickNavigations = function() {
        var topVal = ($(window).width() < 769) ? 0 : 58;

        $(window).resize(function() {
            topVal = ($(window).width() < 769) ? 0 : 58;
        });
        $('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"]), #down-arrow, .btn-goto-leave-msg').click(function(event) {
            var section = $(this).data('nav-section');

            if ($('div[data-section="' + section + '"]').length) {
                $('html, body').animate({
                    scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
                }, 500, 'easeInOutExpo');
            }
            event.preventDefault();
        });


    };

    // Reflect scrolling in navigation
    var navActive = function(section) {
        $('.fh5co-main-nav a[data-nav-section], #fh5co-offcanvas a[data-nav-section]').removeClass('active');
        $('.fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="' + section + '"]').addClass('active');

    };

    var navigationSection = function() {
        var $section = $('div[data-section]');

        $section.waypoint(function(direction) {
            if (direction === 'down') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: '150px'
        });

        $section.waypoint(function(direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function() {
                return -$(this.element).height() + 155;
            }
        });
    };

    var fadeInOnScroll = function() {

        /* Every time the window is scrolled ... */
        $(window).scroll(function() {

            /* Check the location of each desired element */
            $('.animate-on-scroll').each(function(i) {

                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                /* If the object is completely visible in the window, fade it it */
                if (bottom_of_window > bottom_of_object) {
                    $(this).addClass('animated fadeInUp');
                    // $(this).animate({
                    //     'opacity': '1'
                    // }, 1000);
                }
            });
        });
    };

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var submitMessageForm = function() {

        $('#submitBtn').click(function() {
            var name = $('#name').val();
            var email = $('#email').val();
            var message = $('#message').val();
            if ((name !== "") && (email !== "") && ((message !== "") && (validateEmail(email)))) {
                $.ajax({
                    url: "https://docs.google.com/forms/d/e/1FAIpQLScwrNZWUuLWfrHgT7XuCe9upEgrAJq5Bd6QcBUgZ69Ro3X8eA/formResponse",
                    data: {
                        "entry.1293050557": name,
                        "entry.1206154886": email,
                        "entry.1692134080": message
                    },
                    type: "POST",
                    dataType: "xml",
                    statusCode: {
                        0: function() {
                            alert('Thank you for your response!');
                            //Success message
                        },
                        200: function() {
                            alert('Thank you for your response!');
                            //Success Message
                        }
                    }
                });
            } else {
              alert('There is something wrong with the system, please try again');
                //Error message
            }
        })
    }

    // Document on load.
    $(function() {
        fullHeight();
        loaderPage();
        particleGround();
        fh5coTabs();
        gridAutoHeight();
        // sliderMain();
        // sliderSayings();
        offcanvasMenu();
        mainMenuSticky();
        burgerMenu();
        scrolledWindow();
        mobileMenuOutsideClick();
        clickNavigations();
        navigationSection();
        fadeInOnScroll();
        submitMessageForm();
        goToTop();
    });
}());
