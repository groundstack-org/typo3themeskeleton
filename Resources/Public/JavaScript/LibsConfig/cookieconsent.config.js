window.addEventListener("load", function() {
    window.cookieconsent.initialise({
        "position": "bottom-left",
        content: {
            header: change_lang("_header"),
            message: change_lang("_message"),
            dismiss: change_lang("_dismiss"),
            allow: change_lang("_allow"),
            deny: change_lang("_deny"),
            link: change_lang("_link"),
            href: change_lang("_href"),
            close: change_lang("_close")
        }
    });
});
