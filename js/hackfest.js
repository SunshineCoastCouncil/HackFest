(function(hackfest, $, undefined) {

    var HOMEPAGE = "homepage";
    var HTMLPAGE = "htmlpage";

    var pages = [];

    var emptyViewTemplate = '<div class="view" id="{{name}}"></div>';
    function renderEmptyViewContainer(name) {
        $(Mustache.render(emptyViewTemplate, {name: name})).appendTo($("#content"));
    }

    var homepageBaseContent = '\
        <div class="page-header">\
            <img class="img-responsive" src="img/HackFest.jpg">\
        </div>\
        <div class="row">\
            <div class="col-md-12">\
            <div class="panel panel-info">\
                <div class="panel-heading">Welcome to HackFest! Hacking for a Smarter Region</div>\
                <div class="panel-body">\
                <p>HackFest is your opportunity to work individually or in a \
                team over the HackFest weekend to code a solution which meets \
                one of the defined outcomes of the event, either a category \
                with a problem to be solved or an initiative to be created.</p>\
                <p>There will be great prizes on offer. Details will be \
                announced at the start of November.</p>\
                <b>Ideas Forum</b>\
                <p>As part of HackFest, there is also the opportunity for you\
                to submit ideas that can be used as categories or problems\
                that you may think could be solved by the creation of a mobile\
                application or solution.</p>\
                </div>\
            </div>\
        </div>\
    ';
    var homepagePanelTemplate = '\
        <div class="col-lg-4 col-md-6">\
            <div class="panel panel-info">\
                <div class="panel-heading">{{title}}</div>\
                <div class="panel-body">{{body}}</div>\
                <div class="panel-footer">\
                    <button class="btn btn-default" data-page="{{title}}" data-modal="{{modal}}">View {{title}}</button>\
                </div>\
            </div>\
        </div>';

    function homepagePanelHtml(page) {
        return Mustache.render(homepagePanelTemplate, page);
    }

    function homepageViewButtonClickHandler() {
        var $this = $(this);
        var page = $this.data("page");
        if ($this.data("modal")) {
            renderModal(page);
        } else {
            renderView(HTMLPAGE, page);
        }
    }

    function renderModal(page) {
        alert(page);
    }

    function renderView(viewName, viewOptions) {
        $(".view").hide();
        var $view = $("#" + HOMEPAGE);
        $view.children().remove();
        if (viewName == HOMEPAGE) {
            $(homepageBaseContent).appendTo($view);
            $.each(pages, function(index, page) {
                var $panel = $(homepagePanelHtml(page));
                $panel.appendTo($view);
                $panel.find("button").click(homepageViewButtonClickHandler);
            });
        } else if (viewName == HTMLPAGE) {
            $view.load("page/" + encodeURIComponent(viewOptions) + ".html");
        }
        $view.show();
    }

    $(document).ready(function() {
        renderEmptyViewContainer(HOMEPAGE);
        renderEmptyViewContainer(HTMLPAGE);
        $.getJSON("data/pages.json", function(data) {
            pages = data;
            renderView(HOMEPAGE);
        });
    });

})(window.disaster = window.disaster || {}, jQuery);