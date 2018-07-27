;(function($, root, window, document) {	// Alias Technique
    $(function() {	// Equal to $(document).ready()
        $(window).on("load", function() {
            // switch between Typo3 7 and Typo3 8/9
            var header = $(".typo3-topbar-container").length > 0 ? $(".typo3-topbar-container") : $(".topbar-header-site");
            header.append("<span id='branding'><span>designed and created by</span><a href='http://www.hauer-heinrich.de' title='Zeige mehr von Hauer-Heinrich' target='_blank'>Werbeagentur Hauer-Heinrich</a></span>");
            setTimeout(function() {
                header.addClass('loaded');
            }, 2000);
        });
    });
})(jQuery, this, window, document);
