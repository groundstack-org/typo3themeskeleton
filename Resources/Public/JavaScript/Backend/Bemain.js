document.documentElement.className += (("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch');
var root = document.documentElement;root.className += ' js';

define(['jquery'], function($) {
    var header = $(".topbar-header-site");
    header.append("<span id='branding'><span>designed and created by</span><a href='http://www.groundstack.de' title='Zeige mehr von Groundstack' target='_blank'>Werbeagentur Groundstack</a></span>");
    setTimeout(function() {
        header.addClass('loaded');
    }, 2000);
});
