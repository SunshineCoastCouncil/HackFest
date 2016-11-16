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

    function adjustViewTopMargin() {
        var topNavHeight = $("nav.navbar-fixed-top").height();
        $("div.view").css("margin-top", topNavHeight + "px");
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
            $pageView.load(pageUrl(pageName) + " #pageContent", function() {
                $("button.google-search").click(function() {
                    var $button = $(this);
                    var $input = $button.siblings("input.google-search");
                    var $link = $button.siblings("a.google-search");
                    var searchLink = $link.prop("host") + $link.prop("pathname");
                    var searchTerm = '"' + searchLink + '" ' + $input.val();
                    $input.val("");
                    window.open("https://www.google.com/search?q=" + encodeURIComponent(searchTerm), "_blank").focus();
                });
            });
            $("html, body").animate({ scrollTop: 0 }, "fast");
        } else {
            $("#homeView").show();
            syncFAQHeights();
            if (window.location.hash) {
                var $section = $(window.location.hash);
                $section[0].scrollIntoView();
            } else {
                $("html, body").animate({ scrollTop: 0 }, "fast");
            }
        }
    }

    window.onhashchange = renderView;
    $(window).resize(adjustViewTopMargin);
    $(window).resize(syncFAQHeights);

    function faqClickHandler() {
        $(this).toggleClass("selected");
    }

    $(document).ready(function() {
        safariHacks();
        renderView();
        adjustViewTopMargin();
        syncFAQHeights();
        for (var i=1; i<6; i++) window.setTimeout(adjustViewTopMargin, i * 1000);
        $("#faq .panel").click(faqClickHandler);
    });

    // hide expanded menu after click on small screens
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });

})(window.disaster = window.disaster || {}, jQuery);