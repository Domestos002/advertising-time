;(function (win, doc, $) {
    'use strict';

    var body = doc.querySelectorAll("body")[0];
    var html = doc.querySelectorAll("html")[0];

    function slideOut() {
        var slideout = new Slideout({
            'panel': document.getElementById('site-wrapper'),
            'menu': document.getElementById('slide-menu'),
            'padding': 320,
            'tolerance': 70
        });
        var toggle = document.getElementById('filter');
        slideout.disableTouch();
        var offcanvas = document.getElementById('offcanvas');
        var wrapper = document.getElementById('site-wrapper');
        var btnFilter = document.querySelectorAll(".btn-filter")[0];
        var mobileFilter = document.getElementById('mobile-filter');
        var overlay = document.getElementById('site-wrapper-overlay');
        var b = $('body');

        var jumpFix = function () {
            var bWidth = b.outerWidth();
            var scrollbar = window.innerWidth - bWidth;

            slideout.on('beforeopen', function () {
                overlay.classList.add("open");
                overlay.classList.add("open");
                if (window.innerWidth - bWidth != 0) {
                    b.css({"padding-right": scrollbar});
                }
            });

            slideout.on('close', function () {
                overlay.classList.remove("open");
                b.css({"padding-right": "0"});
            });
        };

        overlay.addEventListener('click', function () {
            slideout.close();
        });
        if (btnFilter) {

            btnFilter.addEventListener('click', function () {
                slideout.toggle();
                offcanvas.classList.add("hidden");
                mobileFilter.classList.remove("hidden");
            });

        }


        if (toggle) {
            toggle.addEventListener('click', function () {
                slideout.on('beforeopen', function () {
                    slideout.menu.classList.add("open");


                });
                slideout.toggle();
            });
        }

        jumpFix();

        win.addEventListener("resize", function () {
            jumpFix();
            // $(".page-header__logo-panel").css({"position" : "fixed"});
        });


        overlay.addEventListener('click', function () {
            slideout.close($(".page-header__logo-panel").outerHeight() + " :height suka");
        });

        var burgers = doc.querySelectorAll('.hamburger.hamburger-slide-toggle');
        var closes = doc.querySelectorAll('.slide-menu__close');
        for (var j = 0; j < closes.length; j++) {
            var close = closes[j];
            close.addEventListener('click', function () {
                slideout.close();
            });
        }
        for (var i = 0; i < burgers.length; i++) {
            var burger = burgers[i];
            burger.addEventListener('click', function () {
                offcanvas.classList.remove("hidden");
                mobileFilter.classList.add("hidden");
                slideout.on('beforeopen', function () {
                    slideout.menu.classList.add("open");

                });
                slideout.toggle();
            });
        }
    }

    function carousels() {
        var portfolio = $(".portfolio-slider ");
        var clients = $(".clients-slider");
        var banner = $(".banner-carousel");
        portfolio.owlCarousel({
            items: 3,
            nav: true,
            dots: true,
            autoplay: false,
            loop: true,
            margin: 20,
            responsive: {
                0: {
                    items: 1,
                    dots: false
                },

                480: {
                    items: 2,
                    dots: false
                },

                650: {
                    items: 3,
                    dots: true
                },

                870: {
                    items: 4
                }
            }
        });
        clients.owlCarousel({
            items: 7,
            nav: true,
            autoplay: false,
            loop: true,
            dots: false,
            margin: 20,
            responsive: {
                0: {
                    items: 2,
                    nav: false
                },

                480: {
                    items: 4,
                    nav: false
                },

                650: {
                    items: 5,
                    nav: false
                },

                870: {
                    items: 7,
                    nav: false
                },

                1300: {
                    nav: true
                }
            }
        });
        banner.owlCarousel({
            items: 1,
            nav: false,
            autoplay: false,
            loop: true,
            dots: true,
            margin: 20,
        });
        win.addEventListener("resize", function () {
            portfolio.trigger('refresh.owl.carousel');
            clients.trigger('refresh.owl.carousel');
        });
    }

    function filterSidebar() {
        var sidebar = $('.services-block__sidebar');
        var menu = $(".offcanvas-menu");
        var sidebarFilter = $("#mobile-filter");

        function wdwdw() {
            if (window.innerWidth <= 959) {
                sidebar.children().appendTo(sidebarFilter);

            }
            else {
                sidebarFilter.children().appendTo(sidebar);
            }
        }
        wdwdw();
        window.addEventListener('resize', function () {
            wdwdw();
        }, true);
    };

    function navbarNav() {
        var navbars = doc.querySelectorAll(".sidebar-navbar__nav");
        var navbarsLength = navbars.length;

        function open(dropdown) {
            $(dropdown).velocity('slideDown', {
                easing: "none",
                duration: 500,
                complete: function () {
                    dropdown.classList.add("active");
                }
            });
        }

        function close(dropdown) {
            $(dropdown).velocity('slideUp', {
                easing: "none",
                duration: 500,
                complete: function () {
                    dropdown.classList.remove("active");
                }
            });
        }

        function eventHandler(navbar ,event) {
            var target = event.target;
            event.preventDefault();
            // console.log(target + " :target");
            while (target != navbar) {
                if (target.classList.contains("navbar-nav-parent")) {
                    var dropdown = target.querySelector(".navbar-nav-dropdown");
                    if (!(dropdown.classList.contains("active")) && !(dropdown.classList.contains("velocity-animating"))) {
                        open(dropdown);
                    }
                    else if (dropdown.classList.contains("active") && !(dropdown.classList.contains("velocity-animating"))) {
                        close(dropdown);
                    }
                    return;
                }
                target = target.parentNode;
            }
        }

        for (var i = 0; i < navbarsLength; i++) {
            var navbar = navbars[i];
            if (navbar.querySelector(".navbar-nav-dropdown")) {
                // console.log("yes");
                navbar.addEventListener("click", eventHandler.bind(false, navbar), false);
            }
            else {
                // console.log("no");
            }
        }
    }

    function mobileDD() {
        var toggle = doc.querySelectorAll(".page-header__number-toggle")[0];
        var overlay = doc.querySelectorAll(".page-header__number-overlay")[0];
        var dropdown = doc.querySelectorAll(".page-header__number-dd")[0];
        var bWidth = $("body").outerWidth();
        var scrollbar = win.innerWidth - bWidth;

        var add = function () {
            toggle.classList.add("active");
            $(".page-header__number-toggle").trigger('openIt');
            $(overlay).velocity('fadeIn', {
                duration: 30,
                complete: function () {

                    overlay.classList.add("active");
                }
            });

            $(dropdown).velocity('fadeIn', {
                duration: 30,
                complete: function () {
                    dropdown.classList.add("active");
                }
            });

            // $(dropdown).fadeIn(500, dropdown.classList.add("active"));
            html.style.overflow = "hidden";
            if (win.innerWidth - bWidth != 0) {
                body.style.paddingRight = scrollbar + "px";
            }
        };

        var remove = function () {
            toggle.classList.remove("active");
            $(overlay).velocity('fadeOut', {
                duration: 30,
                complete: function () {

                    overlay.classList.remove("active");
                }
            });

            $(dropdown).velocity('fadeOut', {
                duration: 30,
                complete: function () {
                    dropdown.classList.remove("active");
                }
            });
            html.style.overflow = "initial";
            body.style.paddingRight = "0";
        };

        function create() {
            add();
            overlay.addEventListener("click", function () {
                remove();
            });
        }

        function destroy() {
            remove();
            overlay.removeEventListener("click", function () {
                add();
            });

        }

        toggle.addEventListener("click", function () {
            if (!(toggle.classList.contains("active"))) {
                create();
            }
            else {
                destroy();
            }
        });

    }
    var triggered = false;
    function portfolioMobile(){
        function initFb() {
            $().fancybox({
                selector : '.portfolio-item',
                loop     : false,
                arrows : true,
                beforeShow: function( instance, slide ) {
                    if (window.innerWidth - bWidth != 0) {

                        body.style.paddingRight = scrollbar + "px";
                    }
                },

                touch : {
                    vertical : false,  // Allow to drag content vertically
                    momentum : false   // Continue movement after releasing mouse/touch when panning
                },

                afterClose: function( instance, slide ) {
                    body.style.paddingRight = "";
                }
            });
        }
        var target = $(".portfolio-block .portfolio-item");
        var targetLength = target.length;
        function doIt() {
            if (win.innerWidth <= 767 && triggered == false){
                for (var i = 0; i < targetLength; i++) {
                    var el = target[i];
                    var mob = el.getAttribute("data-src-mobile");
                    var src = el.getAttribute("data-src");
                    el.setAttribute('data-src', mob);
                    el.setAttribute('data-src-mobile', src);
                }
                triggered = true;
            }

            else if (win.innerWidth > 767 && triggered == true) {
                for (var i = 0; i < targetLength; i++) {
                    var el = target[i];
                    var mob = el.getAttribute("data-src-mobile");
                    var src = el.getAttribute("data-src");
                    el.setAttribute('data-src', mob);
                    el.setAttribute('data-src-mobile', src);
                }
                triggered = false;
            }
        }

        doIt();
        win.addEventListener("resize", function () {
            doIt();
        });
        var bWidth = $(body).outerWidth();
        var scrollbar = window.innerWidth - bWidth;
        initFb();
    }

    function tabletNavbar() {
        var wrapDesktop = doc.querySelector(".page-header__number-wrapper-desktop");
        var wrapMobile = doc.querySelector(".page-header__number-wrapper-mobile");
        var number = doc.querySelector(".page-header__number");

        function move() {
            if (window.innerWidth <= 959) {
                wrapMobile.appendChild(number);
            }
            else {
                wrapDesktop.appendChild(number);
            }
        }

        move();
        win.addEventListener("resize", function () {
            move();
        });
    }


    function showcase(){
        var thumbnail = $(".showcase-thumbnail");
        function init(){
            var arr = doc.querySelectorAll(".showcase-thumbnails");
            for (var j = 0; j < arr.length; j++) {
                var arrEl = arr[j];
                arrEl.children[0].classList.add("active");
            }
        }
        init();
        thumbnail.click(function () {
           var el = $(this);
           var data = el.data("img");

           var thumbnails = el.parents(".showcase-thumbnails").find(".showcase-thumbnail");
            el.parents(".showcase").find(".showcase-main img").attr('src',data);
            if (!el.hasClass("active")) {
                thumbnails.removeClass("active");
                el.addClass("active");
            }
        });
    }
    
    win.addEventListener("load", function () {

        $('input[name="phone"]').mask('+7 (999) 999-99-99');
        carousels();
        mobileDD();
        filterSidebar();
        navbarNav();
        portfolioMobile();
        showcase();
        slideOut();
        tabletNavbar();
        // $(".page-header__number-toggle").on( "openIt", function( event ) {
        //     console.log("wdwdwd");
        // });

        // $('#modal-order').on({
        //
        //     'hide.uk.modal': function(){
        //         console.log("Element is not visible.");
        //     }
        // });
    });


    doc.addEventListener("DOMContentLoaded", function () {
        $('.thumbnails-banner .thumbnail').matchHeight({
            byRow: false
        });
    });

    $( window ).on( "orientationchange", function( event ) {
        win.location.reload(false);
    });



})(window, document, window.jQuery);



