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

    function show(el, dd){
        dd.classList.add("active");
    }

    function hide(el, dd) {
        dd.classList.remove("active");
    }

    // window.addEventListener("load", showcaseInit);

})(window, document);



