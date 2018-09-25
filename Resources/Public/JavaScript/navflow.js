;(function($, root, window, document) {	// Alias Technique
    $(function() {	// Equal to $(document).ready()

        if($(window).width() <= 1024){
            // Navflow - General Variables / Helpers
            var html = $("html"),
                navContainerActiveClass = "navflow-active",
                navBodyActiveClass = "navflow-body-active";

            // Navflow - Mobile Icon (for opening the offcanvas)
            $(".navflow").on("click.navflow", function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                var navContainer = $(this),
                    nav = navContainer.children("nav");

                navContainer.addClass(navContainerActiveClass);
                html.addClass(navBodyActiveClass);

                nav.on("click.navflow", function(e){
                    // e.preventDefault(); (link clicks don't work anymore if active)
                    e.stopImmediatePropagation();

                    if(e.target === e.currentTarget){
                        navContainer.removeClass(navContainerActiveClass);
                        html.removeClass(navBodyActiveClass);
                    }
                });
            });

            // Navflow - iOS Scroll Fix / General Body/Html Scrollbar Prevention
            $(".navflow").on("touchmove.navflow", function(e){
                if($(e.target).is("ul ul, li, a") === false){
                    //console.log(e.target);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            });
            $("html, body").on("touchmove.navflow", function(e){
                if($("html.navBodyActiveClass").length){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
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
        }

    });
})(jQuery, this, window, document);
