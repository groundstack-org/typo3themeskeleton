;(function($, root, window, document) {	// Alias Technique
    $(function() {	// Equal to $(document).ready()

        // Navflow - Mobile Icon (for opening the offcanvas)
        $(".navflow").on("click.navflow", function(e){
            e.preventDefault();
            var navContainer = $(this),
                nav = navContainer.children("nav");

            navContainer.addClass("navflow-active");

            nav.on("click.navflow", function(e){
                e.preventDefault();
                e.stopImmediatePropagation();

                if(e.target === e.currentTarget){
                    navContainer.removeClass("navflow-active");
                }
            });
        });

        // Navflow - Mobile Navigation Logic
        $(".navflow nav li").each(function(cnt, eli){
          var li = $(eli),
              a = li.children("a"),
              ul = li.children("ul");

          if(a.length && ul.length){
            var liCategory = $("<li></li>"),
                aCategory = a.clone(false),
                ulLevelAllOthers = li.parent("ul").find("> li > ul").not(ul);

            liCategory.prependTo(ul);
            aCategory.prependTo(liCategory);
            aCategory.text("Zur Kategorie " + aCategory.text());

            a.on("click.navflow", function(e){
              e.preventDefault();
              e.stopImmediatePropagation();

              ulLevelAllOthers.slideUp();
              ul.slideToggle();
            });
          }
        });

    });
})(jQuery, this, window, document);
