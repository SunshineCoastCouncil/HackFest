// IE polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

(function(hackfest, $, undefined) {

    function renderView() {
        $("div.view").hide();
        var view = window.location.hash.substring(1);
        if (view.startsWith("page-")) {
            var $pageView = $("#pageView");
            var pageName = view.substring(view.indexOf("-") + 1);
            $pageView.children().remove();
            $pageView.show();
            $pageView.load(pageUrl(pageName) + " #pageContent");
        } else {
            $("#homepageView").show();
        }
    }

    window.onhashchange = renderView;

    function faqClickHandler() {
        $(this).toggleClass("selected");
    }

    $(document).ready(function() {
        $(".faq .panel").click(faqClickHandler);
    });

})(window.disaster = window.disaster || {}, jQuery);