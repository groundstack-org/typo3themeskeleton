;(function($, root, window, document) {	// Alias Technique
    $(function() {	// Equal to $(document).ready()

        // Navflow - General Variables / Helpers
        var html = $("html"),
            htmlBody = $("html, body"),
            navFlow = $(".navflow"),
            navFlowLi = navFlow.find("nav li"),
            navFlowA = navFlow.find("nav a"),
            navFlowLinkSubmenu = "navflow-link-submenu",
            navFlowLinkSubmenuBacktoText = {
                "de": "Zur Kategorie ",
                "en": "To category ",
                "it": "Alla categoria ",
                "es": "A la categoría ",
                "fr": "À la catégorie "
            },
            navContainerActiveClass = "navflow-active",
            navBodyActiveClass = "navflow-body-active",
            navBodyAvailableClass = "navflow-body-available",
            navUrlElement = null,
            urlPath = window.location.pathname,
            mobileBreakpoint = 1024,
            eventElements = $(".navflow, .navflow nav, .navflow nav ul, .navflow nav a, html, body"),
            lang = $("html[lang]").length ? $("html[lang]").attr("lang").slice(0,2) : "en",
            langWithFallback = (lang == "en" || lang == "de" || lang == "it" || lang == "es" || lang == "fr") ? lang : "en";

        // Navflow - Main Logic with Responsiveness
        $(window).on("resize.navflow", function(e){
            if($(window).width() <= mobileBreakpoint && html.hasClass(navBodyAvailableClass) == false){
                // Navflow - Add Helper Class if the nav is currently available on mobile
                html.addClass(navBodyAvailableClass);

                // Navflow - Mobile Icon (for opening the offcanvas)
                navFlow.on("click.navflow", function(e){
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
                navFlow.on("touchmove.navflow", function(e){
                    if($(e.target).is("ul ul, li, a") === false){
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });
                htmlBody.on("touchmove.navflow", function(e){
                    if($("html.navBodyActiveClass").length){
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });

                // Navflow - Mobile Navigation Logic
                navFlowLi.each(function(cnt, eli){
                  var li = $(eli),
                      a = li.children("a"),
                      ul = li.children("ul");

                  if(a.length && ul.length){
                    // Add Submenu Click Link/Button
                    var ulLevelAllOthers = li.parent("ul").find("> li > ul").not(ul);

                    if(ul.find("> ." + navFlowLinkSubmenu).length == 0){
                        var liCategory = $("<li class='"+ navFlowLinkSubmenu +"'></li>"),
                            aCategory = a.clone(false);

                        liCategory.prependTo(ul);
                        aCategory.prependTo(liCategory);
                        aCategory.text(navFlowLinkSubmenuBacktoText[langWithFallback] + aCategory.text());
                    }

                    // Add Submenu Slide Effect
                    a.on("click.navflow", function(e){
                      e.preventDefault();
                      e.stopImmediatePropagation();

                      ulLevelAllOthers.slideUp();
                      ul.slideToggle();
                    });
                  }
                });

                // Navflow - Open active Submenu's if a submenu link is active
                navFlowA.each(function(cnt, eli){
                    var a = $(eli),
                        url = a.attr("href");

                    if(url == urlPath){
                        navUrlElement = a;
                    }
                });

                if(navUrlElement && navUrlElement.parents("ul").parents("ul").length){
                    var navUrlOpenElements = navUrlElement.parents("li").find("> a").not(navUrlElement);
                    navUrlOpenElements.triggerHandler("click.navflow");
                }
            } else if($(window).width() > mobileBreakpoint && html.hasClass(navBodyAvailableClass) == true){
                // Navflow - Remove Helper Class if the nav is currently not available on mobile
                html.removeClass(navBodyAvailableClass);
                $("." + navFlowLinkSubmenu).remove();

                eventElements.off("click.navflow");
                eventElements.off("touchmove.navflow");
                eventElements.filter("ul").stop(true);
            }
        });

        $(window).triggerHandler("resize.navflow");

    });
})(jQuery, this, window, document);
