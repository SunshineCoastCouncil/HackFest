(function(hackfest, $, undefined) {

    var HOMEPAGE = "homepage";

    var pages = [];

    var homepageBaseContent = '\
        <div class="page-header">\
            <img class="img-responsive" src="img/HackFest.jpg">\
        </div>\
        <div class="row">\
            <div class="col-md-12">\
            <div class="panel panel-default">\
                <div class="panel-heading">Welcome to the HackFest Jump Start Pack</div>\
                <div class="panel-body">Here we hope to provide you with easy access to the information you need to get started. Happy hacking!</div>\
            </div>\
        </div>\
    ';
    var homepagePanelTemplate = '\
        <div class="col-lg-4 col-md-6">\
            <div class="panel panel-info">\
                <div class="panel-heading">{{title}}</div>\
                <div class="panel-body">{{body}}</div>\
                <div class="panel-footer">\
                    <button class="btn btn-default">View {{title}}</button>\
                </div>\
            </div>\
        </div>';

    function homepagePanelHtml(title, body) {
        return Mustache.render(homepagePanelTemplate, {
            title: title,
            body: body
        });
    }

    function renderView(viewName, viewOptions) {
        $(".view").hide();
        var $view = $("#" + HOMEPAGE);
        $view.children().remove();
        if (viewName == HOMEPAGE) {
            $(homepageBaseContent).appendTo($view);
            $.each(pages, function(index, page) {
                var $panel = $(homepagePanelHtml.apply(this, page));
                $panel.appendTo($view);
            });
        }
        $view.show();
    }

    $(document).ready(function() {
        $.getJSON("data/pages.json", function(data) {
            pages = data;
            renderView(HOMEPAGE);
        });
    });

})(window.disaster = window.disaster || {}, jQuery);