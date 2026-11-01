/**
 * --------------------------------
 * Home JS
 * --------------------------------
 */

let
    isTouchDeviceMain = 'ontouchstart' in window || navigator.msMaxTouchPoints, // ipad pro safari detect (ipad 고해상도 일때 safari PC 프론트 사이트로 노출)
    mainSectionSwiper;

$(function() {
    // lazy
    $('img.lazy').Lazy();

    // ani
    // tit
    $('.tit-area small, .tit-area .tit, .tit-area .btn').addClass('ani');
    $('.tit-area small').css('transition-delay', '0.5s');
    $('.tit-area .tit').css('transition-delay', '0.6s');
    $('.tit-area .btn').css('transition-delay', '0.7s');

    // lineup
    $('.lineup-area .tit-area .tit-sub').addClass('ani').css('transition-delay', '0.7s');

    // industry
    $('.industry-area .list > ul > li').addClass('ani up');
    $('.industry-area .list > ul > li').each(function(index) {
        $(this).css('transition-delay', ((index * 0.1) + 0.5) + 's');
    });

    // news
    $('.news-area .list-thumb li').addClass('ani up');
    $('.news-area .list-thumb li').each(function(index) {
        $(this).css('transition-delay', ((index * 0.1) + 0.5) + 's');
    });

    // company
    $('.company-area .list li').addClass('ani up');
    $('.company-area .list li').each(function(index) {
        $(this).css('transition-delay', ((index * 0.1) + 0.5) + 's');
    });

    // career
    $('.career-area .list li').addClass('ani up');
    $('.career-area .list li').each(function(index) {
        $(this).css('transition-delay', ((index * 0.1) + 0.5) + 's');
    });

    // newsletter
    $('.newsletter-area .form-btn').addClass('ani up').css('transition-delay', '0.5s');
    $('.newsletter-area .agree').addClass('ani up').css('transition-delay', '0.6s');

    // qrcode
    $('.qrcode-area figure').addClass('ani').css('transition-delay', '0.5s');
    $('.qrcode-area .guidetxt').addClass('ani up').css('transition-delay', '0.7s');
});

window.addEventListener('load', () => {
    // popup main banner swiper
    if ($('.popupmain .mainbanner-swiper').length) {
        let total = $('.popupmain .mainbanner-swiper').find('.swiper-slide').length;
        let mainbannerSwiper = new Swiper('.popupmain .mainbanner-swiper .swiper', {
            init: false,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: '.popupmain .mainbanner-swiper .swiper-button-next',
                prevEl: '.popupmain .mainbanner-swiper .swiper-button-prev',
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            },
            on: {
                lock: function() {
                    $('.popupmain .mainbanner-swiper').addClass('lock');
                },
            },
        });

        mainbannerSwiper.on('init slideChange', function() {
            let current = mainbannerSwiper.realIndex + 1;

            $('.popupmain .mainbanner-swiper .swiper-pagination-state strong').text(current);
            $('.popupmain .mainbanner-swiper .swiper-pagination-state .total').text(total);
        });

        mainbannerSwiper.init();
    }

    const sectionLastIndex = $('.home .section').length;
    let sectionTextArray = [];

    $('#contents .section').each(function() {
        sectionTextArray.push($(this).attr('class').split(' ')[2].replace('-area', ''));
    });

    // fullpage > swiper 레이아웃 변경
    mainSectionSwiper = new Swiper('.section-swiper > .swiper', {
        direction: 'vertical',
        mousewheel: true,
        speed: 600,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.section-swiper > .swiper > .swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '"><div class="blind">' + sectionTextArray[index] + '</div></span>';
            },
        },
        on: {
            slideChangeTransitionStart: function() {
                let activeIndex = this.activeIndex;
                $('.section-swiper > .swiper > .swiper-wrapper > .swiper-slide').removeClass('active');
                $('.section-swiper > .swiper > .swiper-wrapper > .swiper-slide-active img.lazy').lazy({
                    bind: 'event',
                    delay: 0
                });
                $('.section-swiper > .swiper > .swiper-wrapper > .swiper-slide-active').addClass('active');

                if ($('.section-swiper > .swiper > .swiper-wrapper > .swiper-slide-active').hasClass('solution-area')) {
                    $('.solution-swiper .swiper-slide-active').addClass('active');
                } else {
                    $('.solution-swiper .swiper-slide').removeClass('active');
                }

                if (activeIndex == (sectionLastIndex - 1)) {
                    $('.section-swiper .swiper-pagination').addClass('last');
                    $('#aside').addClass('last');
                    $('#footer').addClass('last');
                } else {
                    $('.section-swiper .swiper-pagination').removeClass('last');
                    $('#aside').removeClass('last');
                    $('#footer').removeClass('last');
                }
            },
        },
    });

    // visual
    let visualImgIndexArray = [];
    $('.visual-swiper .swiper-slide').each(function(index) {
        if ($(this).find('video').length) {
            $(this).attr('data-swiper-autoplay', 5000);
        } else {
            $(this).attr('data-swiper-autoplay', 4000);
            visualImgIndexArray.push(index);
        }
    });

    let visualSwiper = new Swiper('.visual-swiper .swiper', {
        effect: 'fade',
        speed: 1000,
        autoplay: {
            // delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.visual-swiper .swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function(index, className) {
                for (i = 0; i < visualImgIndexArray.length; i++) {
                    if (visualImgIndexArray[i] == index) {
                        className = className + ' img';
                    }
                }

                return '<span class="' + className + '">' + '<i></i>' + '<b></b>' + '</span>';
            },
        },
        navigation: {
            nextEl: '.visual-swiper .swiper-button-next',
            prevEl: '.visual-swiper .swiper-button-prev',
        },
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
        },
        on: {
            init: function() {
                $('.visual-swiper').addClass('active');
            },
            slideChangeTransitionStart: function() {
                let activeIndex = this.activeIndex;

                //video
                let videos = document.querySelectorAll('.visual-swiper video');
                Array.prototype.forEach.call(videos, function(video) {
                    video.pause();
                    video.currentTime = 0;
                });

                if ($(this.slides[activeIndex]).find('video').length) {
                    $(this.slides[activeIndex]).find('video')[0].play();
                }

                $('.visual-swiper .btn-autoplay').removeClass('stop');
                $('.visual-swiper .swiper-pagination-bullet').removeClass('stop');
            }
        }
    });

    $('.visual-swiper .btn-autoplay').click(function() {
        if (!$(this).hasClass('stop')) {
            visualSwiper.autoplay.stop();
            $(this).addClass('stop');
            $('.visual-swiper .swiper-pagination-bullet-active').addClass('stop');
            if ($('.visual-swiper .swiper-slide-active video').length) {
                $('.visual-swiper .swiper-slide-active').find('video')[0].pause();
            }
        } else {
            visualSwiper.slideNext();
            visualSwiper.autoplay.start();
            $(this).removeClass('stop');
            $('.visual-swiper .swiper-pagination-bullet').removeClass('stop');
        }
    });

    // lineup
    let
        lineuphArray = [],
        lineupVArray = [],
        isMachineTotal5 = $('.lineup-area .machine').length > 4 ? true : false,
        isMachineMouseover = true,
        isLineupvMouseover = false,
        isLineupvSwiperLoad = false,
        isLineupvSwiperMove = false;

    $('.lineup-area .machine').css('width', parseInt((100 - 20.65) / $('.lineup-area .machine').length) + '%');
    if ($('.lineup-area .machine').length > 5) {
        $('.lineup-area .machine').addClass('total' + $('.lineup-area .machine').length);
    }

    function lineupArrowsResize() {
        $('.lineup-area .machine').each(function() {
            if ($(this).find('.lineupv-swiper').length > 0) {
                let lineupvSwiperOffsetTop = $(this).find('.lineuph-swiper').position().top + $(this).find('.lineuph-swiper > .swiper').position().top + $(this).find('.lineuph-swiper > .swiper > .swiper-wrapper > .swiper-slide-active .lineupv-swiper').position().top + 24;
                let positionBottom = $(window).height() - 34 - lineupvSwiperOffsetTop - $(this).find('.lineuph-swiper > .swiper > .swiper-wrapper > .swiper-slide-active .lineupv-swiper').outerHeight();
                positionBottom = positionBottom > 0 ? positionBottom : 40;
                $(this).find('.arrows').css('bottom', positionBottom);
            }
        });
    }

    $(window).resize(function() {
        $('.lineup-area .lineuph-swiper').css('width', Number(($('.lineup-area .inner').width() * 0.3413).toFixed(0)));
        if (isLineupvSwiperLoad) {
            lineupArrowsResize();
        }
    }).trigger('resize');

    $('.lineuph-swiper').each(function(index) {
        $(this).addClass('swiper-instance-' + index);

        lineuphArray[index] = new Swiper('.lineuph-swiper.swiper-instance-' + index + ' > .swiper', {
            // observer: true,
            // observeParents: true,
            spaceBetween: 4,
            speed: 600,
            navigation: {
                nextEl: '.lineuph-swiper.swiper-instance-' + index + ' .swiper-button-next',
                prevEl: '.lineuph-swiper.swiper-instance-' + index + ' .swiper-button-prev',
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            },
        });
    });

    $('.lineupv-swiper').each(function(index) {
        $(this).addClass('swiper-instance-' + index);

        let isLoop = $(this).find('.swiper-slide').length > 1 ? true : false;

        lineupVArray[index] = new Swiper('.lineupv-swiper.swiper-instance-' + index + ' > .swiper', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            // allowTouchMove: false,
            spaceBetween: 4,
            speed: 600,
            centeredSlides: true,
            loop: isLoop,
            on: {
                lock: function() {
                    $('.lineupv-swiper.swiper-instance-' + index).addClass('lock');
                },
                slideChange: function() {
                    isLineupvSwiperMove = true;
                    if (isLineupvMouseover && isLineupvSwiperMove) {
                        isMachineMouseover = false;
                        $('.lineup-area .arrows').fadeOut();
                    }
                },
            },
        });

        if ($('.lineupv-swiper').length - 1 == index) {
            isLineupvSwiperLoad = true;
        }
    });

    if (!isTouchDeviceMain) {
        $('.lineup-area .machine').on('mouseenter', function() {
            if (isMachineMouseover) {
                if (!$(this).find('.lineuph-swiper > .swiper > .swiper-wrapper > .swiper-slide-active .lineupv-swiper').hasClass('lock')) {
                    lineupArrowsResize();
                    $(this).find('.arrows').show();
                }
            }
            $(this).addClass('active');
            gsap.to('.section-swiper .swiper-pagination', {
                x: -100,
                duration: 0.4
            });
            if ($('.lineup-area .machine').length == $(this).index() && isMachineTotal5) {
                $('.lineup-area').addClass('last');
            } else {
                $('.lineup-area').removeClass('last');
            }
        }).on('mouseleave', function() {
            $(this).removeClass('active');
            gsap.to('.section-swiper .swiper-pagination', {
                x: 0,
                duration: 0.4
            });

            setTimeout(function() {
                for (let i = 0; i < $('.lineuph-swiper').length; i++) {
                    lineuphArray[i].slideToLoop(0, 0);
                }

                for (let j = 0; j < $('.lineupv-swiper').length; j++) {
                    lineupVArray[j].slideToLoop(0, 0);
                }
            }, 200);
        });
    } else {
        $('.lineup-area .machine').on('click', function() {
            isLineupvMouseover = true;
            mainSectionSwiper.mousewheel.disable();

            if (!$(this).hasClass('active')) {
                // reset
                $('.lineup-area .machine').removeClass('active');
                setTimeout(function() {
                    for (let i = 0; i < $('.lineuph-swiper').length; i++) {
                        lineuphArray[i].slideToLoop(0, 0);
                    }

                    for (let j = 0; j < $('.lineupv-swiper').length; j++) {
                        lineupVArray[j].slideToLoop(0, 0);
                    }
                }, 200);

                // active
                if (isMachineMouseover) {
                    if (!$(this).find('.lineuph-swiper > .swiper > .swiper-wrapper > .swiper-slide-active .lineupv-swiper').hasClass('lock')) {
                        lineupArrowsResize();
                        $(this).find('.arrows').show();
                    }
                }
                $(this).addClass('active');
                gsap.to('.section-swiper .swiper-pagination', {
                    x: -100,
                    duration: 0.4
                });
                if ($('.lineup-area .machine').length == $(this).index() && isMachineTotal5) {
                    $('.lineup-area').addClass('last');
                } else {
                    $('.lineup-area').removeClass('last');
                }
            }
        });

        // reset
        $('.lineup-area .machine .lineuph-swiper > .img').on('click', function(e) {
            e.stopPropagation();

            isLineupvMouseover = false;
            mainSectionSwiper.mousewheel.enable();

            $('.lineup-area .machine').removeClass('active');
            gsap.to('.section-swiper .swiper-pagination', {
                x: 0,
                duration: 0.4
            });
            setTimeout(function() {
                for (let i = 0; i < $('.lineuph-swiper').length; i++) {
                    lineuphArray[i].slideToLoop(0, 0);
                }

                for (let j = 0; j < $('.lineupv-swiper').length; j++) {
                    lineupVArray[j].slideToLoop(0, 0);
                }
            }, 200);
        });
    }

    $('.lineupv-swiper').on('mouseenter', function() {
        isLineupvMouseover = true;
        mainSectionSwiper.mousewheel.disable();
    }).on('mouseleave', function() {
        isLineupvMouseover = false;
        mainSectionSwiper.mousewheel.enable();
    });

    // solution
    const solutionSwiper = new Swiper('.solution-swiper .swiper', {
        speed: 700,
        navigation: {
            nextEl: '.solution-swiper .swiper-button-next',
            prevEl: '.solution-swiper .swiper-button-prev',
        },
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
        },
        on: {
            slideChangeTransitionStart: function() {
                let activeIndex = this.activeIndex;

                $('.solution-swiper .swiper-slide').removeClass('active');
                $(this.slides[activeIndex]).addClass('active');
            },
        },
    });

    // industry
    $('.industry-area .btn-more').click(function() {
        $('.industry-area .flip-box').removeClass('active');
        $(this).closest('.flip-box').addClass('active');
    });

    $('.industry-area .btn-close').click(function() {
        $(this).closest('.flip-box').removeClass('active');
    });
});