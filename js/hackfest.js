// IE polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

(function(hackfest, $, undefined) {

    function pageUrl(pageName) {
        return encodeURI("page/" + pageName + ".html");
    }

    function renderView() {
        $("div.view").hide();
        $("#mainNav").find("li.active").removeClass("active");

        var view = window.location.hash.substring(1);
        if (view.startsWith("page-")) {
            var $pageView = $("#pageView");
            var pageName = view.substring(view.indexOf("-") + 1);
            $pageView.children().remove();
            $pageView.show();
            $pageView.load(pageUrl(pageName) + " #pageContent");
        } else {
            $("#homeView").show();
            $("#mainNav ul.nav li").first().addClass("active");
        }
    }

    window.onhashchange = renderView;

    function faqClickHandler() {
        $(this).toggleClass("selected");
    }

    $(document).ready(function() {
        renderView();
        $(".faq .panel").click(faqClickHandler);
    });

    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });

})(window.disaster = window.disaster || {}, jQuery);