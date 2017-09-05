(function (win, doc) {
    'use strict';

    var parents = doc.querySelectorAll('.nav-parent');
    var parentsLength = parents.length;
    var body = doc.querySelectorAll("body")[0];


    function loop(){
        for (var i = 0; i < parentsLength; i++) {
            var parent = parents[i];
            var dd = parent.querySelector('.nav-dropdown');
            parent.addEventListener("mouseenter", show.bind(false, parent, dd), false);
            parent.addEventListener("mouseleave", hide.bind(false, parent, dd), false);
        }
    }

    loop();

    function reset(callback) {
        for (var i = 0; i < parentsLength; i++) {
            var parent = parents[i];
            var dd = parent.querySelector('.nav-dropdown');
            dd.classList.remove("active");
        }
        callback();
    }

    function show(el, dd){
        reset(function (){
            dd.classList.add("active");
        });

    }

    function hide(el, dd) {
        setTimeout(function () {
            dd.classList.remove("active");
        }, 400);

    }

    // window.addEventListener("load", showcaseInit);

})(window, document);



