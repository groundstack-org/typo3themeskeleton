document.addEventListener("DOMContentLoaded", function(){
    // Usage of the IoNav
    let ionav = new IoNav({
        elements: "#logo, #menu-main",
        elementsNav: ".ionav-canvas #ionav-menu-main",
        buttonElement: document.getElementById("mobile-btn"),
        debug: true
    });
});
