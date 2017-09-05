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
                    items: 2
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

                },

                480: {
                    items: 4
                },

                650: {
                    items: 5,

                },

                870: {
                    items: 7
                }
            }
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

        function eventHandler(navbar) {
            var target = event.target;
            event.preventDefault();
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

    function autoHeight() {
        var containers = doc.querySelectorAll('[data-autoheight-target]');
        if (containers) {


            var containersLength = containers.length;


            for (var j = 0; j < containersLength; j++) {
                var container = containers[j];
                var maxSize = 0;

                var sizerClass = container.getAttribute('data-autoheight-sizer');
                var targetClass = container.getAttribute('data-autoheight-target');
                var targets = $(container).find(targetClass);
                var sizers = $(container).find(sizerClass);

                var targetsLength = targets.length;
                for (var i = 0; i < targetsLength; i++) {
                    var target = targets[i];
                    var sizer = sizers[i];
                    if (sizer.clientHeight >= maxSize) {
                        maxSize = sizer.clientHeight;
                    }
                }
                for (var i = 0; i < targetsLength; i++) {
                    var target = targets[i];
                    var sizer = sizers[i];
                    target.style.height = maxSize + "px";
                }
            }
        }
    };

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

    function autoHeightJq() {
        var target = $('.thumbnails-banner .thumbnail');
        var target2 = $('.thumbnails-services .thumbnail-text');
        var target1 = $('.thumbnails-services .thumbnail-caption');
        var targetArr = [target, target1, target2];

        function doIt() {

            for (var j = 0; j < targetArr.length; j++) {
                var targetEl = targetArr[j];
                var highestBox = 0;
                if (win.innerWidth >= 480) {
                    targetEl.each(function () {
                        if ($(this).height() > highestBox) {
                            highestBox = $(this).height();
                        }
                    });
                    targetEl.height(highestBox);
                }
                else {
                    targetEl.height("");
                }
                highestBox = 0;
            }

        }

        doIt();
        win.addEventListener("resize", function () {
            doIt();
        });


    }

    (function () {
        var Shuffle = win.Shuffle;
        var Filter = function (filterContainer, elementContainer) {
            this.filterContainer = filterContainer;
            this.elementContainer = elementContainer;
            this.getFilterBtns = function () {
                var arr = filterContainer.children;
                var arrLength = arr.length;
                this.filterBtns = [];
                for (var i = 0; i < arrLength; i++) {
                    var btn = arr[i];
                    this.filterBtns.push(btn);
                }
            }.bind(this);
            this.getFilterBtns();
            this.handleClick();
            this.initialize();
        };

        Filter.prototype.reset = function () {
            var arr = this.filterBtns;
            var arrlength = arr.length;
            for (var i = 0; i < arrlength; i++) {
                var item = arr[i];
                item.classList.remove("active");
            }
        };

        Filter.prototype.initialize = function () {
            this.myShuffle = new Shuffle(this.elementContainer, {
                itemSelector: '.portfolio-item',
                sizer: '.portfolio-sizer-element',
                buffer: 1
            });
        };


        Filter.prototype.handleClick = function () {
            this.filterContainer.addEventListener('click', function () {
                var target = event.target;


                if (target.getAttribute('data-filter-value')) {
                    if (!(target.classList.contains('active'))) {
                        this.reset();
                        target.classList.add("active");
                        console.log(target.getAttribute('data-filter-value') + " :values");
                        this.myShuffle.filter(target.getAttribute('data-filter-value'));
                    }
                }

            }.bind(this));

        };


        doc.addEventListener("DOMContentLoaded", function () {
            var PortfolioFilter = new Filter(doc.querySelector(".js-portfolio-filter"), doc.querySelector(".js-portfolio-container"));
        });
    })();


    win.addEventListener("load", function () {
        autoHeightJq();
        $('input[name="phone"]').mask('+7 (999) 999-99-99');
        carousels();
        mobileDD();
        filterSidebar();
        navbarNav();
        autoHeight();
        slideOut();
        tabletNavbar();
    });


    doc.addEventListener("DOMContentLoaded", function () {
        // var Shuffle = window.Shuffle;
        // var btn = doc.querySelectorAll(".portfolio-block__filter-btn.avto")[0];
        // var item = doc.querySelectorAll(".portfolio-block__item");
        //
        // var myShuffle = new Shuffle(document.querySelector('.js-shuffle-container'), {
        //     itemSelector: '.portfolio-item',
        //     sizer: '.portfolio-sizer-element',
        //     buffer: 1
        // });
        //
        // btn.addEventListener('click', function () {
        //     myShuffle.filter('car');
        // });
        //
        // var elems = doc.querySelectorAll(".portfolio-block__item");
        // imagesLoaded( elems, function () {
        //     myShuffle.layout();
        // } );

    });


})(window, document, window.jQuery);



