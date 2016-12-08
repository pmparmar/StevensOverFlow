(function($, location) {
    // Let"s start writing AJAX calls!


    console.log("location.hash is ");
    console.log(location.hash)
   
    window.onhashchange = (function() {
        load(location["hash"]);
        /* body... */
    })
    var tag1 = $("#tag1");
    var tag2 = $("#tag2");
    var tag3 = $("#tag3");
    var tag4 = $("#tag4");
    var body1 = $("#tag1content");
    var body2 = $("#tag2content");
    var body3 = $("#tag3content");
    var body4 = $("#tag4content");
    var loginmode = $("#loginModal");

    var body =$("#bodycontainer");

    body.css('margin-top','40px');

    load(location["hash"]);


    function load(arg) {
        console.log('load called, arg is '+arg);
        switch (arg) {
            case "#profile":
                hiddenall();
                body1.removeClass("hidden");
                tag1.addClass("active");

                // statements_1
                break;
            case "#edit":
                hiddenall();
                body2.removeClass("hidden");
                tag2.addClass("active");

                // statements_1
                break;
            case "#question":
                hiddenall();
                body3.removeClass("hidden");
                tag3.addClass("active");

                // statements_1
                break;
            case "#answer":
                hiddenall();
                body4.removeClass("hidden");
                tag4.addClass("active");

                // statements_1
                break;
            default:
                // statements_def
                break;
        }
        // body... 
    }

    function hiddenall() {
        console.log('hiddenall called');
        body1.addClass("hidden");
        body2.addClass("hidden");
        body3.addClass("hidden");
        body4.addClass("hidden");
        tag1.removeClass("active");
        tag2.removeClass("active");
        tag3.removeClass("active");
        tag4.removeClass("active");
        /* body... */
    }


})(window.jQuery, window.location);