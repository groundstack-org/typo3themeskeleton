/*
 * Werbeagentur Hauer-Heinrich GmbH
 *  E-Mail: info@hauer-heinrich.de
 * Website: http://www.hauer-heinrich.de
 */

document.documentElement.className += (("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch');
var root = document.documentElement;root.className += ' js';

define(['jquery'], function($) {
    window.onload = function() {
        var header = $(".topbar-header-site");
        header.append("<span id='branding'><span>designed and created by</span><a href='http://www.hauer-heinrich.de' title='Zeige mehr von Hauer-Heinrich' target='_blank'>Werbeagentur Hauer-Heinrich</a></span>");
        setTimeout(function() {
            header.addClass('loaded');
        }, 2000);
    };
});
