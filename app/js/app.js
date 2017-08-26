;(function (win, doc, $) {
    'use strict';

    var body = doc.querySelectorAll("body")[0];
    var html = doc.querySelectorAll("html")[0];

    // function slideOut() {
    //     var slideout = new Slideout({
    //         'panel': document.getElementById('site-wrapper'),
    //         'menu': document.getElementById('slide-menu'),
    //         'padding': 320,
    //         'tolerance': 70
    //     });
    //     var toggle = document.getElementById('filter');
    //     slideout.disableTouch();
    //     var offcanvas = document.getElementById('offcanvas');
    //     var wrapper = document.getElementById('site-wrapper');
    //     var mobileFilter = document.getElementById('mobile-filter');
    //     var overlay = document.getElementById('site-wrapper-overlay');
    //     var b = $('body');
    //
    //     var jumpFix = function () {
    //         var bWidth = b.outerWidth();
    //         var scrollbar = window.innerWidth - bWidth;
    //
    //         slideout.on('beforeopen', function() {
    //             overlay.classList.add("open");
    //             overlay.classList.add("open");
    //             if (window.innerWidth - bWidth !=0){
    //                 b.css({"padding-right" : scrollbar});
    //             }
    //         });
    //
    //         slideout.on('close', function() {
    //             overlay.classList.remove("open");
    //             b.css({"padding-right" : "0"});
    //         });
    //     };
    //
    //     overlay.addEventListener('click', function() {
    //         slideout.close();
    //     });
    //
    //     if (toggle){
    //         toggle.addEventListener('click', function() {
    //             slideout.on('beforeopen', function() {
    //                 slideout.menu.classList.add("open");
    //                 mobileFilter.classList.add("open");
    //                 offcanvas.classList.remove("open");
    //             });
    //             slideout.toggle();
    //         });
    //     }
    //
    //     jumpFix();
    //
    //     window.addEventListener("resize", function () {
    //         jumpFix();
    //         // $(".page-header__logo-panel").css({"position" : "fixed"});
    //         cardMobileContent();
    //     });
    //
    //
    //     // overlay.addEventListener('click', function() {
    //     //     slideout.close($(".page-header__logo-panel").outerHeight() + " :height suka");
    //     // });
    //
    //     var burgers = document.querySelectorAll('.hamburger');
    //     var closes = document.querySelectorAll('.slide-menu__close');
    //     for (var j = 0; j < closes.length; j++) {
    //         var close = closes[j];
    //         close.addEventListener('click', function() {
    //             slideout.close();
    //         });
    //     }
    //     for (var i = 0; i < burgers.length; i++) {
    //         var burger = burgers[i];
    //         burger.addEventListener('click', function() {
    //             slideout.on('beforeopen', function() {
    //                 slideout.menu.classList.add("open");
    //                 mobileFilter.classList.remove("open");
    //                 offcanvas.classList.add("open");
    //             });
    //             slideout.toggle();
    //         });
    //     }
    //
    //
    //
    // }
    function carousels(){
        var portfolio = $(".portfolio-slider ");
        var clients = $(".clients-slider");
        portfolio.owlCarousel({
            items: 3,
            nav: true,
            dots: true,
            autoplay: false,
            loop: true,
            margin: 20,
            responsive: {
                0: {
                    items: 1
                },

                480: {
                    items: 2
                },

                650: {
                    items: 3
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
            margin: 20
        });

    }

    function navbarNav(){
        var navbars = doc.querySelectorAll(".sidebar-navbar__nav");
        var navbarsLength = navbars.length;



        function eventHandler(navbar){
            var target = event.target;
            // console.log(navbar + " :navbar");
            // console.log(target.innerText + " :target");
            // console.log(this + " :targetThis");
            event.preventDefault();
            while (target != navbar) {
                if (target.classList.contains("navbar-nav-parent")) {
                    // console.log(target.classList + " :iskomoe");
                    var dropdown = target.querySelector(".navbar-nav-dropdown");
                    if (dropdown.classList.contains("active")){
                        dropdown.classList.remove("active");
                        $(dropdown).velocity('slideUp' , {
                            easing: "none",
                            duration: 500
                        });
                    }
                    else{
                        dropdown.classList.add("active");
                        var height = dropdown.offsetHeight;
                        console.log(dropdown.classList + " :dropdown");
                        $(dropdown).velocity('slideDown', {
                            easing: "none",
                            duration: 500
                        });
                    }
                    return;
                }
                // console.log(target.classList + " :iskomoe");
                target = target.parentNode;
            }
        }

        for (var i = 0; i < navbarsLength; i++) {
            var navbar = navbars[i];
            if (navbar.querySelector(".navbar-nav-dropdown")){
                // console.log("yes");
                navbar.addEventListener("click", eventHandler.bind(false, navbar), false);
            }
            else {
                // console.log("no");
            }
        }
    }

    function mobileDD(){
        var toggle =  doc.querySelectorAll(".page-header__number-toggle")[0];
        var overlay = doc.querySelectorAll(".page-header__number-overlay")[0];
        var dropdown = doc.querySelectorAll(".page-header__number-dd")[0];
        var bWidth = $("body").outerWidth();
        var scrollbar = win.innerWidth - bWidth;

        var add = function(){
            toggle.classList.add("active");
            overlay.classList.add("active");
            dropdown.classList.add("active");
            html.style.overflow = "hidden";
            if (win.innerWidth - bWidth !=0 ){
                body.style.paddingRight = scrollbar + "px";
            }
        };

        var remove = function(){
            toggle.classList.remove("active");
            overlay.classList.remove("active");
            dropdown.classList.remove("active");
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
            if(!(toggle.classList.contains("active"))){
                create();
            }
            else {
                destroy();
            }
        });

    }

    win.addEventListener("load", function () {
        carousels();
        mobileDD();
        navbarNav();
    });

})(window, document, window.jQuery);



