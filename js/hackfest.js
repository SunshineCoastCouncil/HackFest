// IE polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

(function(hackfest, $, undefined) {

    var pageList;

    function pageUrl(page) {
        return encodeURI("page/" + page + ".html");
    }

    function renderHomepagePanels() {
        var template = $("#homepagePanelTemplate").html();
        var $panelContainer = $("#homepagePanelContainer");
        Mustache.parse(template);
        $.each(pageList, function(index, page) {
            var $panel = $(Mustache.render(template, {
                title: page
            }));
            $panel.appendTo($panelContainer);
            $panel.find("div.panel-body").load(pageUrl(page) + "  #pageSummary");
        });
    }

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

    $(document).ready(function() {
        $.getJSON("data/pages.json", function(pages) {
            pageList = pages;
            renderHomepagePanels();
            renderView();
        });
    });

})(window.disaster = window.disaster || {}, jQuery);