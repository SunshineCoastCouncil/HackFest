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

    function adjustViewTopPadding() {
        var topNavHeight = $("nav.navbar-fixed-top").height();
        $("div.view").css("padding-top", topNavHeight + "px");
    }

    function renderView() {
        $("div.view").hide();
        $("#mainNav ul.nav li.active").removeClass("active");
        $("#mainNav ul.nav li").each(function() {
            var $this = $(this);
            if ($this.find("a").attr("href") == (window.location.hash || "#")) {
                $this.addClass("active");
            }
        });

        var view = window.location.hash.substring(1);
        if (view.startsWith("page-")) {
            var $pageView = $("#pageView");
            var pageName = view.substring(view.indexOf("-") + 1);
            $pageView.children().remove();
            $pageView.show();
            $pageView.load(pageUrl(pageName) + " #pageContent");
        } else {
            $("#homeView").show();
            $(window.location.hash || "#homeView").get(0).scrollIntoView();
        }
    }

    window.onhashchange = renderView;
    $(window).resize(adjustViewTopPadding);

    function faqClickHandler() {
        $(this).toggleClass("selected");
    }

    $(document).ready(function() {
        renderView();
        adjustViewTopPadding();
        $(".faq .panel").click(faqClickHandler);
    });

    // hide expanded menu after click on small screens
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });

})(window.disaster = window.disaster || {}, jQuery);