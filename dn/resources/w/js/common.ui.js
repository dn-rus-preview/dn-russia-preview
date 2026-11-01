/**
 * --------------------------------
 * Common JS
 * --------------------------------
 */

window.addEventListener('load', () => {
    if (!$('#wrap').hasClass('micro')) {
        // headerGnb
        fn.headerLoad();
        fn.headerGnb();
        fn.headerGnb('reset');
    }

    // scrollControl
    fn.scrollControl();

    // accordion
    fn.accordion();

    // select
    fn.select('.select');
    fn.selectInit('select');
    fn.selectActiveInit('select');

    // fileMultiUpload
    fn.fileUpload();

    // agree
    fn.inputAllCheck();

    // link
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // tab menu
    $(document).on('click', '.tabs > a, .tabs.slide .swiper-slide a', function(e) {
        fn.tabMenu(e, this);
    });

    // tabs swiper
    if ($('.tabs.slide').length > 0) {
        fn.tabsSwiper();
    }

    // tag button
    $(document).on('click', '.tag > button', function() {
        fn.tagActive(this);
    });

    // aside
    $('#aside').fadeIn();
    $('#aside .btn-help').on('mouseenter', function() {
        $('#aside .link').stop().fadeIn();
    }).on('mouseleave', function() {
        $('#aside .link').stop().fadeOut();
    });

    $('#aside .link').on('mouseenter', function() {
        $('#aside .link').stop().fadeIn();
    }).on('mouseleave', function() {
        $(this).stop().fadeOut();
    });
});