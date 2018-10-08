window.addEventListener("load", function(){
    $('#banner .ce-gallery, .frame-layout-gallerySlider .ce-gallery').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});
