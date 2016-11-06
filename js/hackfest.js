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

    function safariHacks() {
        var userAgent = window.navigator.userAgent;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            $("body").addClass("safari");
        }
    }

    function adjustViewTopPadding() {
        var topNavHeight = $("nav.navbar-fixed-top").height();
        $("div.view").css("padding-top", topNavHeight + "px");
    }

    function syncFAQHeights() {
        var $headings = $("#faq").find(".panel-heading");
        $headings.css("height", "");
        var headingHeight = 0;
        $headings.each(function() {
            headingHeight = Math.max(headingHeight, $(this).outerHeight());
        });
        $headings.css("height", headingHeight);
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
            $("html, body").animate({ scrollTop: 0 }, "fast");
        } else {
            $("#homeView").show();
            syncFAQHeights();
            var $section = $(window.location.hash || "#homeView");
            if ($section.length == 0) $section = $("#homeView");
            $section[0].scrollIntoView();
        }
    }

    window.onhashchange = renderView;
    $(window).resize(adjustViewTopPadding);
    $(window).resize(syncFAQHeights);

    function faqClickHandler() {
        $(this).toggleClass("selected");
    }

    $(document).ready(function() {
        safariHacks();
        renderView();
        adjustViewTopPadding();
        syncFAQHeights();
        for (var i=1; i<6; i++) window.setTimeout(adjustViewTopPadding, i * 1000);
        $("#faq .panel").click(faqClickHandler);
    });

    // hide expanded menu after click on small screens
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });

})(window.disaster = window.disaster || {}, jQuery);