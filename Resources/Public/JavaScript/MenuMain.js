(function($) {
    function moveMenu(btnMobile, menuPushbar, menuMain, logoCp, menuLanguage, header) {
        if(btnMobile.is(":visible")) {
            logoCp.appendTo(menuPushbar);
            menuMain.appendTo(menuPushbar);
            $(".touch-menu-helper").remove();
            menuLanguage.appendTo(menuPushbar);
        } else {
            menuMain.appendTo(header);
            menuLanguage.appendTo(header);
        }
    }

    $(function() {
        var pushbar = new Pushbar({
            blur: true,
            overlay: true,
        });

        // open a pushbar
        pushbar.open('menu-mobile');
        // close all pushbars
        pushbar.close();

        var btnMobile = $("#menu-mobile-btn"),
            menuPushbar = $("#menu-pushbar"),
            menuMain = $("#menu-main"),
            logo = $("#logo"),
            logoCp = logo.clone(),
            menuLanguage = $("#menu-language"),
            header = $("#header");

        $(window).on("resize.pushbar", function() {
            moveMenu(btnMobile, menuPushbar, menuMain, logoCp, menuLanguage, header);
        });

        $(window).triggerHandler("resize.pushbar");

        var clickHandler = function() {
            $(document).on("click.menuDocClick", "#menu-pushbar nav a", function(event) {
                var el = $(this).parent("li"),
                    childUl = el.children('ul');

                if(childUl.length > 0) {
                    $("#menu-pushbar nav .open").removeClass("open").children("ul").slideUp();
                    if(!el.hasClass("open")) {
                        event.preventDefault();
                        el.addClass("open").children("ul").slideDown();
                    }
                }
            });
        };

        $(document).on("click.clickhandler", function() {
            clickHandler();
        });

        $(document).on("touchend.menuDocTouch", "#menu-main a", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            $("#menu-main a").unbind("click");
            $(document).unbind("click");

            var el = $(this).parent("li"),
                childUl = el.children('ul'),
                link = el.children("a").attr("href"),
                target = el.children("a").attr("target");

            if(childUl.length > 0) {
                if(el.hasClass("open")) {
                    console.log("close");
                    el.removeClass("open").children("ul").slideUp();
                    // openLink(link, target);
                } else {
                    console.log("open");
                    $("#header nav .open").removeClass("open").children("ul").slideUp();
                    el.addClass("open").children("ul").slideDown();
                }

                if(!btnMobile.is(":visible") && !$("html").hasClass("touch-menu1")) {
                    $("html").addClass("touch-menu1");
                    menuMain.find("li").each(function(i, li) {
                        var $this = $(li),
                            childUl = $this.children('ul'),
                            menuLiA = $this.children("a"),
                            linkHelper = menuLiA.attr("href"),
                            targetHelper = menuLiA.attr("target"),
                            linkNameHelper = menuLiA.text();
                        if(childUl.length > 0) {
                            childUl.prepend("<li class='touch-menu-helper'><a href='"+linkHelper+"' target='"+targetHelper+"'>Öffne "+linkNameHelper+"</a></li>");
                        }
                    });
                }
            } else {
                openLink(link, target);
            }
        });
    });
})(jQuery);
