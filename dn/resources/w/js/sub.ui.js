/**
 * --------------------------------
 * Sub JS
 * --------------------------------
 */

let
    recentSwiper,
    prolistSwiper,
    propicSwiper,
    wrapZoomInit = 0.74;

var Subfn = (function() {
    'use strict';

    return {
        proSearch: function(state) {
            let
                $proBtnToggles = $('.pro-category .btns-toggles'),
                proBtnToggles = '.pro-category .btns-toggles',
                $proBtnToggle = $('.pro-category .btns-toggles .btn-toggle'),
                $proBtnToggleLine = $('.pro-category .btns-toggles .btn-toggle.btn-line'),
                $proSpec = $('.pro-category .pro-spec'),

                $proDep3 = $('.pro-category .dep3 > li'),
                $proDep4 = $('.pro-category .dep4 > li'),
                $proDep5 = $('.pro-category .dep5 > li'),
                $proDep6 = $('.pro-category .dep6 > li'),
                $proDep4Wrap = $('.pro-category .dep4-wrap'),
                $proDep5Wrap = $('.pro-category .dep5-wrap'),
                $proDep6Wrap = $('.pro-category .dep6-wrap');

            if (state != 'reset') {
                // (depth3) 라인업 별 / 솔루션 별
                $proDep3.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        if ($(this).parent('li').hasClass('lineup')) {
                            $proBtnToggles.removeClass('solution').addClass('lineup');
                            $proSpec.removeClass('solution').addClass('lineup');
                        } else if ($(this).parent('li').hasClass('solution')) {
                            $proBtnToggles.removeClass('lineup').addClass('solution');
                            $proSpec.removeClass('lineup').addClass('solution');
                        }

                        $proDep3.removeClass('active'); // this siblings
                        $proDep4Wrap.removeClass('active');
                        $proDep4.removeClass('active');
                        $proDep5Wrap.removeClass('active');
                        $proDep5.removeClass('active');
                        $proDep6Wrap.removeClass('active');
                        $proDep6.removeClass('active');
                        gsap.to(proBtnToggles, {
                            marginLeft: '-20px',
                            opacity: 0,
                            duration: 0
                        });
                        $proBtnToggle.removeClass('active');
                        $proBtnToggleLine.addClass('active');
                        $proSpec.removeClass('active');

                        $link.parent('li').addClass('active'); //this

                        if ($(this).parent('li').hasClass('lineup')) {
                            $link.next('.dep4-wrap').addClass('active');
                        } else if ($(this).parent('li').hasClass('solution')) {
                            $link.next('.dep3-1-wrap').addClass('active');
                        }
                        autoHeight();
                    });
                });

                // 라인업 별 / 솔루션 별 > (depth4) 터닝센터 *
                $proDep4.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        $proDep4.removeClass('active'); // this siblings
                        $proDep5Wrap.removeClass('active');
                        $proDep5.removeClass('active');
                        $proDep6Wrap.removeClass('active');
                        $proDep6.removeClass('active');
                        $proSpec.removeClass('active');

                        gsap.fromTo(proBtnToggles, {
                            marginLeft: '-20px',
                            opacity: 0
                        }, {
                            marginLeft: 0,
                            opacity: 1,
                            duration: 0.5
                        });
                        $proBtnToggle.removeClass('active');
                        $proBtnToggleLine.addClass('active');

                        if ($link.attr('data-menu') == 'software') {
                            $proBtnToggles.addClass('off');
                        } else {
                            $proBtnToggles.removeClass('off');
                        }

                        $link.parent('li').addClass('active'); //this
                        $link.next('.dep5-wrap').addClass('active');
                        $link.next('.dep5-wrap').find('.pro-line').addClass('active');

                        autoHeight();
                    });
                });

                // 라인업 별 / 솔루션 별 > 터닝센터 * > (depth5) 2축 수평형 터닝 센터 *
                $proDep5.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        $proDep5.removeClass('active'); // this siblings
                        $proDep6Wrap.removeClass('active');
                        $proDep6.removeClass('active');

                        $link.parent('li').addClass('active'); //this
                        $link.next('.dep6-wrap').addClass('active');

                        autoHeight();
                    });
                });

                // 라인업 별 / 솔루션 별  > 터닝센터 * > 2축 수평형 터닝 센터 * > (depth6) series *
                $proDep6.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        $proDep6.removeClass('active'); // this siblings

                        $link.parent('li').addClass('active'); //this
                    });
                });

                // 라인/사양 토글
                $proBtnToggle.each(function(index, item) {
                    $(item).on('click', function() {
                        $proDep5.removeClass('active');
                        $proDep6Wrap.removeClass('active');

                        if ($(item).hasClass('btn-line')) {
                            $proSpec.removeClass('active');
                            $('.pro-category .dep5-wrap.active .pro-line').addClass('active');
                        } else if ($(item).hasClass('btn-spec')) {
                            $('.pro-category .dep5-wrap .pro-line').removeClass('active');
                            $proSpec.addClass('active');
                        }
                    });
                });

                function autoHeight() {
                    let dep3height = 0,
                        dep4height = 0,
                        dep5height = 0,
                        dep6height = 0,
                        maxheight = 0;

                    $proDep3.each(function() {
                        dep3height += $(this).height();
                    });

                    dep4height = Number($proDep4.parent('ul').css('padding-top').replace(/[^-\d\.]/g, '')) + 34;
                    $proDep4.each(function() {
                        if ($(this).closest('.dep4-wrap').hasClass('active')) {
                            dep4height += $(this).height();
                        }
                    });

                    dep5height = Number($proDep5.parent('ul').css('padding-top').replace(/[^-\d\.]/g, '')) + 34;
                    $proDep5.each(function() {
                        if ($(this).closest('.dep5-wrap').hasClass('active')) {
                            dep5height += $(this).height();
                        }
                    });

                    dep6height = Number($proDep6.parent('ul').css('padding-top').replace(/[^-\d\.]/g, '')) + 34;
                    $proDep6.each(function() {
                        if ($(this).closest('.dep6-wrap').hasClass('active')) {
                            dep6height += $(this).height();
                        }
                    });

                    maxheight = Math.max(dep3height, dep4height, dep5height, dep6height);
                    $('.search .product-area .pro-category .dep3-wrap').animate({
                        'height': +(maxheight) + 'px'
                    }, 400);
                }
            } else {
                // reset
                $proDep3.eq(0).children('a').click();
                setTimeout(function() {
                    $proDep3.eq(0).find('.dep4-wrap .dep4 > li').eq(0).children('a').click();
                }, 100);
                setTimeout(function() {
                    $proDep3.eq(0).find('.dep4-wrap .dep4 > li').eq(0).find('.dep5-wrap .dep5 > li').eq(0).children('a').click();
                }, 200);
            }
        },

        recentSwiper: function(state) {
            if ($('.recent-swiper .swiper-slide').length > 0) {
                if (state == 'load') {
                    recentSwiper = new Swiper('.recent-swiper .swiper', {
                        slidesPerView: 'auto',
                        spaceBetween: 10,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                        navigation: {
                            nextEl: '.recent-swiper .swiper-button-next',
                            prevEl: '.recent-swiper .swiper-button-prev',
                        },
                        a11y: {
                            prevSlideMessage: 'Previous slide',
                            nextSlideMessage: 'Next slide',
                        },
                        on: {
                            activeIndexChange: function() {
                                if (this.realIndex == 0) {
                                    $('.recent-swiper').removeClass('space');
                                } else {
                                    $('.recent-swiper').addClass('space');
                                }
                            },
                        }
                    });
                } else {
                    recentSwiper.update();
                    recentSwiper.slideTo(0, 0);
                }
            } else {
                $('.recent-searches').hide();
            }
        },

        propicSwiper: function(state) {
            if (state == 'load') {
                if (!$('.propic-swiper .swiper').length) return;
                propicSwiper = new Swiper('.propic-swiper .swiper', {
                    navigation: {
                        nextEl: '.propic-swiper .swiper-button-next',
                        prevEl: '.propic-swiper .swiper-button-prev',
                    },
                    a11y: {
                        prevSlideMessage: 'Previous slide',
                        nextSlideMessage: 'Next slide',
                    },
                    pagination: {
                        el: '.propic-swiper .swiper-pagination',
                        type: 'bullets',
                    },
                });

                if ($('.prolist-swiper .swiper-slide').length) {
                    prolistSwiper = new Swiper('.prolist-swiper .swiper', {
                        slidesPerView: 'auto',
                        spaceBetween: 12,
                        shortSwipes: false,
                        navigation: {
                            nextEl: '.prolist-swiper .swiper-button-next',
                            prevEl: '.prolist-swiper .swiper-button-prev',
                        },
                        on: {
                            init: function() {
                                $('.prolist-swiper').addClass('active');
                                $('.prolist-swiper').addClass('first');
                            },

                            lock: function() {
                                $('.prolist-swiper').addClass('lock');
                            },

                            slideChangeTransitionEnd: function() {
                                if ($('.prolist-swiper .swiper-button-prev').hasClass('swiper-button-disabled')) {
                                    $('.prolist-swiper').addClass('first');
                                } else {
                                    $('.prolist-swiper').removeClass('first');
                                }

                                if ($('.prolist-swiper .swiper-button-next').hasClass('swiper-button-disabled')) {
                                    $('.prolist-swiper').addClass('last');
                                } else {
                                    $('.prolist-swiper').removeClass('last');
                                }
                            },
                        },
                    });
                }

            } else {
                propicSwiper.update();
                propicSwiper.slideTo(0, 0);
            }
            Subfn.propicPlus();
        },

        propicPlus: function() {
            $(window).resize(function() {
                $('.propic-swiper .plus-area').removeClass('active');
                if ($('.propic .propic-swiper').width() < 1210) {
                    $('.propic-swiper .plus-area .btn-more').each(function() {
                        let _top = Number($(this).data('top')) * 100 / 680,
                            _left = Number($(this).data('left')) * 100 / 1210;
                        $(this).css({
                            'top': +_top + '%',
                            'left': +_left + '%'
                        })
                    });
                } else {
                    $('.propic-swiper .plus-area .btn-more').each(function() {
                        let _top = Number($(this).data('top')),
                            _left = Number($(this).data('left'));
                        $(this).css({
                            'top': +_top + 'px',
                            'left': +_left + 'px'
                        })
                    });
                }
                $('.propic-swiper .plus-area').addClass('active');
            }).trigger('resize');
        },

        applySwiper: function() {
            if ($('.apply-swiper').length > 0) {
                $('.apply-swiper').each(function(index) {
                    $(this).addClass('swiper-instance-' + index);

                    let applySwiper = new Swiper('.apply-swiper.swiper-instance-' + index + ' .swiper', {
                        slidesPerView: 3,
                        spaceBetween: 28,
                        observer: true,
                        observeParents: true,
                        navigation: {
                            nextEl: '.apply-swiper.swiper-instance-' + index + ' .swiper-button-next',
                            prevEl: '.apply-swiper.swiper-instance-' + index + ' .swiper-button-prev',
                        },
                        a11y: {
                            prevSlideMessage: 'Previous slide',
                            nextSlideMessage: 'Next slide',
                        },
                    });
                });
            }
        },

        applyseriesSwiper: function() {
            if ($('.applyseries-swiper').length > 0) {
                let applyseriesSwiper = new Swiper('.applyseries-swiper .swiper', {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    observer: true,
                    observeParents: true,
                    navigation: {
                        nextEl: '.applyseries-swiper .swiper-button-next',
                        prevEl: '.applyseries-swiper .swiper-button-prev',
                    },
                    a11y: {
                        prevSlideMessage: 'Previous slide',
                        nextSlideMessage: 'Next slide',
                    },
                });
            }
        },

        specTableScroll: function() {
            let scrollL = [],
                $automation = $('.automation-area');

            $automation.each(function(index, item) {
                let $scrollcon = $(item).find('.scroll-con'),
                    $table = $(item).find('.table'),
                    $tableRow = $(item).find('tbody').find('tr'),
                    prevLeft = null,
                    trWid = null;

                if ($tableRow.find('th.type2').length) {
                    trWid = $tableRow.find('th.type2').innerWidth();
                    $tableRow.find('th[scope="row"].type2').css('left', trWid);
                    prevLeft = trWid * 2;
                } else {
                    prevLeft = $(item).find('tbody').find('tr').find('th[scope="row"]').innerWidth();
                }

                $(item).find('.btn-scrollprev').css('left', prevLeft - 15);

                if (scrollL[index] == null) {
                    scrollL[index] = 0;
                }

                $scrollcon.on('scroll', function() {

                    scrollL[index] = $(this).scrollLeft();

                    if (scrollL[index] <= 0) {
                        $(item).find('.btn-scrollprev').css('display', 'none');
                    } else {
                        $(item).find('.btn-scrollprev').css('display', 'block');
                    }

                    if (Math.floor($scrollcon.innerWidth()) + Math.ceil(scrollL[index]) >= Math.floor($table.innerWidth())) {
                        $(item).find('.btn-scrollnext').css('display', 'none');
                    } else {
                        $(item).find('.btn-scrollnext').css('display', 'block');
                    }
                });

                if ($scrollcon.innerWidth() < $table.innerWidth()) {
                    $(item).find('.btn-scroll').addClass('active');
                }

                $(item).find('.btn-scrollprev').on('click', function() {
                    $scrollcon.stop().animate({
                        'scrollLeft': scrollL[index] - 176
                    }, 300);
                });

                $(item).find('.btn-scrollnext').on('click', function() {
                    $scrollcon.stop().animate({
                        'scrollLeft': scrollL[index] + 176
                    }, 300);
                });
            });
        },

        careerPartner: function() {
            $('.tab-contents .partner-list .partner-marquee').each(function(index) {
                let partnerdirection = 'left',
                    $this = $(this);
                if ($this.find('.partner-cont').length > 3) {
                    if (index % 2 >= 1) {
                        partnerdirection = 'right';
                    }
                    $this.marquee({
                        easing: 'linear',
                        speed: 50,
                        gap: 0,
                        delayBeforeStart: 0,
                        direction: partnerdirection,
                        duplicated: true,
                        pauseOnHover: true,
                        startVisible: true,
                    });
                }
            });
        },

        // start: '-10% center' '-20% center' '-25% center' '-30% center' 'top center' 'top 55%' 'top 132px'
        getStartCalc: function(start, target, zoom) {
            let
                startChange,
                zoomCal = zoom ? zoom : wrapZoomInit;

            if (start == 'top center') {
                if (Number($('#wrap').css('zoom')) < 1) {
                    startChange = Math.ceil($(target).offset().top * zoomCal) + 'px center';
                } else {
                    startChange = Math.ceil($(target).offset().top) + 'px center';
                }
            } else if (start == 'top 132px') {
                if (Number($('#wrap').css('zoom')) < 1) {
                    startChange = Math.ceil($(target).offset().top * zoomCal) + 'px ' + Math.ceil(132 * zoomCal) + 'px';
                } else {
                    startChange = Math.ceil($(target).offset().top) + 'px 132px';
                }
            } else if (start == 'top 55%') {
                if (Number($('#wrap').css('zoom')) < 1) {
                    startChange = Math.ceil($(target).offset().top * zoomCal) + 'px 55%';
                } else {
                    startChange = Math.ceil($(target).offset().top) + 'px 55%';
                }
            } else {
                let
                    cal = start.split(' ') || '',
                    percentCal = parseInt(cal[0]) / 100;
                if (Number($('#wrap').css('zoom')) < 1) {
                    startChange = Math.ceil($(target).offset().top * zoomCal + ($(target).outerHeight() * zoomCal * percentCal)) + 'px center';
                } else {
                    startChange = Math.ceil($(target).offset().top + ($(target).outerHeight() * percentCal)) + 'px center';
                }
            }

            return startChange;
        },
    }
})();

window.addEventListener('load', () => {
    let depth = $('#contents').attr('class').split(' ') || '';

    // breakWord (스크립트 적용 페이지 제외)
    if ((depth[0] == 'product' && !(depth[1] == 'summary') && !(depth[1] == 'category')) || (depth[0] == 'solution' && !(depth[1] == 'demand')) || (depth[0] == 'media' && !(depth[1] == 'exhibition'))) {
        fn.breakWord('#contents');
    } else if (depth[0] == 'media' && depth[1] == 'exhibition' && depth[2] == 'view') { // 전시회 상세
        if ($('.media.exhibition .view-content > div').hasClass('view-swiper')) {
            fn.breakWord('.media.exhibition .view-content .view-swiper');
        }
        if ($('.media.exhibition .view-content > div').hasClass('view-info')) {
            fn.breakWord('.media.exhibition .view-content .view-info');
        }
        if ($('.media.exhibition .view-content > div').hasClass('highlight')) {
            fn.breakWord('.media.exhibition .view-content .highlight');
        }
        if ($('.media.exhibition .view-content > div').hasClass('news')) {
            fn.breakWord('.media.exhibition .view-content .news');
        }
    } else if (depth[0] == 'company' && depth[1] == 'enotice' && depth[2] == 'view') { // 기업소개 > 전자공고 > 상세
        fn.breakWord('.company.enotice .list-detail .detail-content .txt');
    }

    gsap.registerPlugin(ScrollTrigger);

    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        }
    }

    if ($('.subvisual-area').length > 0) {
        ScrollTrigger.create({
            // trigger: '.subvisual-area',
            // start: '-30% center',
            trigger: '#wrap',
            start: () => Subfn.getStartCalc('-30% center', '.subvisual-area'),
            onEnter: function() {
                $('.subvisual-area').addClass('active');
            },
            onLeaveBack: function() {
                if (!$('body').hasClass('fixed')) {
                    $('.subvisual-area').removeClass('active');
                }
            },
        });
    }

    switch (depth[0]) {
        // product
        case 'product':
            switch (depth[1]) {
                // summary
                case 'summary':
                    if ($('.linebest-swiper').length > 0) {
                        $('.linebest-swiper').each(function(index) {
                            $(this).addClass('swiper-instance-' + index);

                            let applySwiper = new Swiper('.linebest-swiper.swiper-instance-' + index + ' .swiper', {
                                slidesPerView: 3,
                                spaceBetween: 28,
                                observer: true,
                                observeParents: true,
                                navigation: {
                                    nextEl: '.linebest-swiper.swiper-instance-' + index + ' .swiper-button-next',
                                    prevEl: '.linebest-swiper.swiper-instance-' + index + ' .swiper-button-prev',
                                },
                                a11y: {
                                    prevSlideMessage: 'Previous slide',
                                    nextSlideMessage: 'Next slide',
                                },
                            });
                        });
                    }
                    break;

                    // category
                case 'category':
                    if ($('.best-swiper').length > 0) {
                        let bestSwiper = new Swiper('.best-swiper .swiper', {
                            slidesPerView: 3,
                            spaceBetween: 28,
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.best-swiper .swiper-button-next',
                                prevEl: '.best-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                        });
                    }
                    break;

                    // series
                case 'series':
                    // 제품 이미지 swiper
                    Subfn.propicSwiper('load');

                    // 슬로건 서브 text
                    // let replacetxt = $('.info-area p').text().replaceAll('<br class="onlyWeb">','');
                    // replacetxt =  replacetxt.replaceAll('<br class="onlyWeb" />','');
                    // replacetxt =  replacetxt.replaceAll('<br class="onlyweb" />','');
                    // $('.info-area p').text(replacetxt);
                    let replacetxt = $('.info-area p').text().replace(/<br class="onlyWeb">/g, '');
                    replacetxt = replacetxt.replace(/<br class="onlyWeb" \/>/g, '');
                    replacetxt = replacetxt.replace(/<br class="onlyweb" \/>/g, '');
                    $('.info-area p').text(replacetxt);

                    // 제품 시방
                    fn.specTableSwiper('.spec-area .spec-table');
                    fn.specTableActive('.spec-area .spec-table');

                    // 적용 가능한 자동화 솔루션, 소프트웨어
                    Subfn.applySwiper();

                    // 뉴스
                    if ($('.news-swiper').length > 0) {
                        let newsSwiper = new Swiper('.news-swiper .swiper', {
                            slidesPerView: 3,
                            spaceBetween: 28,
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.news-swiper .swiper-button-next',
                                prevEl: '.news-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                        });
                    }

                    // 인터뷰
                    if ($('.interview-swiper').length > 0) {
                        let interviewSwiper = new Swiper('.interview-swiper .swiper', {
                            slidesPerView: 'auto',
                            spaceBetween: 28,
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.interview-area .swiper-button-next',
                                prevEl: '.interview-area .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                        });
                    }

                    // 하이라이트
                    gsap.utils.toArray($('.highlight-area > .tit')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-10% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-10% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    gsap.utils.toArray($('.highlight-area .list-card > li')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    gsap.utils.toArray($('.highlight-area .list')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;

                    // software
                case 'software':
                    // 기술 적용이 가능한 기종
                    Subfn.applyseriesSwiper();

                    // 적용 가능한 솔루션
                    Subfn.applySwiper();

                    // 하이라이트
                    gsap.utils.toArray($('.highlight-area .list-card > li')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;
            }
            break;

            // solution
        case 'solution':
            switch (depth[1]) {
                // summary
                case 'summary':
                    gsap.utils.toArray($('.solutiondiv-area ul li')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;

                    // turnkey
                case 'turnkey':
                    // popupturnkey
                    $('.tabs.slide a').click(function() {
                        $('.popupturnkey .contents .scroll-content').animate({
                            'scrollTop': 0
                        });
                    });
                    break;

                    // view
                case 'view':
                    // 제품 이미지 swiper
                    Subfn.propicSwiper('load');

                    // 주요 강점
                    if ($('.feature-swiper').length > 0) {
                        let featureSwiper = new Swiper('.feature-swiper .swiper', {
                            slidesPerView: 3,
                            spaceBetween: 28,
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.feature-swiper .swiper-button-next',
                                prevEl: '.feature-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                        });
                    }

                    // 기술 적용이 가능한 기종
                    Subfn.applyseriesSwiper();

                    // 하이라이트
                    gsap.utils.toArray($('.highlight-area > .tit, .highlight-area > .addTxt')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-10% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-10% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    gsap.utils.toArray($('.highlight-area .list-card > li')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    gsap.utils.toArray($('.solution.view section')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    gsap.utils.toArray($('.highlight-area .list')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    if ($('.automation-area').length) {
                        Subfn.specTableScroll();
                    }
                    break;

                case 'demand':
                    let $wrap = $('#wrap');

                    gsap.utils.toArray($('.visual-area .tit')).forEach(function(item) {
                        ScrollTrigger.create({
                            trigger: '.visual-area',
                            start: () => Subfn.getStartCalc('top top', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        })
                    });

                    gsap.utils.toArray('.subtit-area').forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            y: 50,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    gsap.utils.toArray('.info-area .info li').forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            y: 20,
                            stagger: 0.2,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    gsap.utils.toArray('.info-area figure').forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    gsap.utils.toArray($('.toggle-wrap')).forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            x: 200,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    gsap.utils.toArray($('.tabs.slide')).forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            x: 200,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    gsap.utils.toArray($('.demand-info')).forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    gsap.utils.toArray($('.content-visual')).forEach(function(item) {
                        gsap.from(item, {
                            opacity: 0,
                            y: 50,
                            scrollTrigger: {
                                trigger: $wrap,
                                start: () => Subfn.getStartCalc('top 55%', item),
                                toggleActions: 'play none none reverse', // 트리거 방향에 따른 애니메이션 제어
                            },
                        });
                    });

                    const
                        $demandBtnsToggles = $('.btns-toggles'),
                        $demandBtnToggle = $demandBtnsToggles.find($('.btn-toggle')),
                        $demandToggleCont = $('.toggle-contents');

                    let $tabs = $('.toggle-contents').length ? $('.toggle-contents.active').find('.tabs') : $('.tabs'),
                        $demandInfo = $('.toggle-contents').length ? $('.toggle-contents.active').find('.demand-info') : $('.demand-info'),
                        $contentVisual = $('.toggle-contents').length ? $('.toggle-contents.active .content-visual') : $('.content-visual'),
                        $contentVisualBtn = $contentVisual.find('button');

                    function tabsBtnChange() {
                        $tabs = $('.toggle-contents').length ? $('.toggle-contents.active').find('.tabs') : $('.tabs');
                        $demandInfo = $('.toggle-contents').length ? $('.toggle-contents.active').find('.demand-info') : $('.demand-info');
                        $contentVisual = $('.toggle-contents').length ? $('.toggle-contents.active .content-visual') : $('.content-visual');
                        $contentVisualBtn = $contentVisual.find('button');

                        ScrollTrigger.refresh();
                        $tabs.find('.swiper-slide a').click(function() {
                            let tabsIndex = $(this).parent().index();
                            $contentVisualBtn.siblings().removeClass('active');
                            $contentVisualBtn.eq(tabsIndex).addClass('active')
                            $demandInfo.find('p').siblings().removeClass('active');
                            $demandInfo.find('p').eq(tabsIndex).addClass('active');
                            let productType = $(this).parents('.toggle-contents').find('.product-type');
                            setTimeout(function() {
                                $('html, body').animate({
                                    scrollTop: parseInt($('.reference-area').get(0).offsetTop + productType.position().top - 136) * Number($('#wrap').css('zoom'))
                                }, 1000);
                                ScrollTrigger.refresh();
                            }, 50)
                        });
                    };

                    function visualBtnChange() {
                        $tabs = $('.toggle-contents').length ? $('.toggle-contents.active').find('.tabs') : $('.tabs');
                        $demandInfo = $('.toggle-contents').length ? $('.toggle-contents.active').find('.demand-info') : $('.demand-info');
                        $contentVisual = $('.toggle-contents').length ? $('.toggle-contents.active .content-visual') : $('.content-visual');
                        $contentVisualBtn = $contentVisual.find('button');

                        ScrollTrigger.refresh();
                        $contentVisualBtn.click(function() {
                            let Activeindex = $(this).index();

                            $contentVisualBtn.siblings().removeClass('active');
                            $(this).addClass('active');

                            $tabs.find('.swiper-slide').siblings().find('a').removeClass('active');
                            $tabs.find('.swiper-slide').eq(Activeindex).find('a').addClass('active');

                            $demandInfo.find('p').siblings().removeClass('active');
                            $demandInfo.find('p').eq(Activeindex).addClass('active');

                            let $href = $tabs.find('.swiper-slide').eq(Activeindex).find('a').attr('href');
                            $('.tab-contents').removeClass('active');
                            $(`${$href}`).addClass('active');
                            setTimeout(function() {
                                $('html, body').animate({
                                    scrollTop: parseInt($('.reference-area').get(0).offsetTop + $('.product-type').position().top - 136) * Number($('#wrap').css('zoom'))
                                }, 1000);
                            }, 50)
                            ScrollTrigger.refresh();
                        });
                    };

                    $demandBtnToggle.click(function(e) {
                        e.preventDefault();
                        $tabs = $('.toggle-contents.active').find('.tabs'),
                            $demandInfo = $('.toggle-contents.active').find('.demand-info'),
                            $contentVisual = $('.toggle-contents.active .content-visual'),
                            $contentVisualBtn = $contentVisual.find('button');

                        $demandToggleCont.removeClass('active');
                        $(`${$(this).attr('href')}`).addClass('active');

                        ScrollTrigger.refresh();
                        tabsBtnChange();
                        visualBtnChange();
                    })

                    tabsBtnChange();
                    visualBtnChange();

                    $('.product-area .open-btn').click(function(e) {
                        e.preventDefault();

                        $("li .workpice-area").find('.popup').fadeOut();

                        if (typeof $(this).attr('data-popup') != 'undefined') {
                            let i = $(this).attr('data-popup');

                            $(this).parents(".product-area").find('.popup').filter(`[data-popup = "${i}"]`).fadeIn();
                            $(this).parents(".product-area").find('.popup').filter(`[data-popup = "${i}"]`).css('display', 'flex')
                        } else {
                            let i = $(this).index();

                            $(this).parents(".product-area").find('.popup').eq(i).fadeIn();
                            $(this).parents(".product-area").find('.popup').eq(i).css('display', 'flex')
                        }

                        $('.dimmed').fadeIn();
                    })

                    $('.workpice-area .open-btn').click(function(e) {
                        e.preventDefault();

                        let i = $(this).index();

                        $(this).parents("li .workpice-area").find('.popup').eq(i).fadeIn();
                        $(this).parents("li .workpice-area").find('.popup').eq(i).css('display', 'flex')
                    })

                    $('.product-list .popup .btn-close').click(function(e) {
                        e.preventDefault();
                        $(this).parents(".popup").fadeOut();
                        $('.dimmed').fadeOut();
                    })

                    if ($('.product-swiper').length > 0) {
                        $('.product-swiper').each(function(index) {
                            $(this).addClass('swiper-instance-' + index);

                            let applySwiper = new Swiper('.product-swiper.swiper-instance-' + index + '> .swiper', {
                                allowTouchMove: false,
                                slidesPerView: 1,
                                spaceBetween: 28,
                                observer: true,
                                observeParents: true,
                                effect: 'fade',
                                navigation: {
                                    nextEl: '.product-swiper.swiper-instance-' + index + ' .swiper-button-next',
                                    prevEl: '.product-swiper.swiper-instance-' + index + ' .swiper-button-prev',
                                },
                                a11y: {
                                    prevSlideMessage: 'Previous slide',
                                    nextSlideMessage: 'Next slide',
                                },
                                pagination: {
                                    el: '.product-swiper.swiper-instance-' + index + '> .swiper .swiper-pagination',
                                    type: 'bullets',
                                    clickable: true,
                                },
                            });
                        });
                    }

                    if ($('.detail-swiper').length > 0) {
                        $('.detail-swiper').each(function(index) {
                            $(this).addClass('swiper-instance-' + index);

                            let applySwiper = new Swiper('.detail-swiper.swiper-instance-' + index + ' .swiper', {
                                slidesPerView: 'auto',
                                spaceBetween: 32,
                                observer: true,
                                observeParents: true,
                                freeMode: true,
                                slidesOffsetAfter: 32,
                                slidesOffsetBefore: 32,
                                navigation: {
                                    nextEl: '.detail-swiper.swiper-instance-' + index + ' .swiper-button-next',
                                    prevEl: '.detail-swiper.swiper-instance-' + index + ' .swiper-button-prev',
                                },
                                a11y: {
                                    prevSlideMessage: 'Previous slide',
                                    nextSlideMessage: 'Next slide',
                                },
                            });
                        });
                    }

                    // 의료
                    if ($('#contents').hasClass('medical')) {
                        $('.reference-area .list .box ul li button').click(function() {
                            let activeIndex = $(this).attr('data-tab');
                            if (activeIndex) {
                                $('.reference-area .tabs .swiper-slide').eq(activeIndex - 1).find('a').click();
                                $('html, body').animate({
                                    'scrollTop': $('.reference-area .tabs').offset().top - 100
                                });
                            }
                        });
                    }
                    break;
            }
            break;

        // service
        case 'service':
            switch (depth[1]) {
                // serviceinfo
                case 'serviceinfo':
                    gsap.utils.toArray($('section')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;

                // education
                case 'education':
                    // 터닝센터강좌, 머시닝센터 강좌 swiper
                    if ($('.video-swiper').length > 0) {
                        let videoSwiper = new Swiper('.video-swiper .swiper', {
                            slidesPerView: 3,
                            spaceBetween: 28,
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.video-swiper .swiper-button-next',
                                prevEl: '.video-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                        });

                        // 터닝센터강좌, 머시닝센터 썸네일 이미지
                        $('.video-swiper .list-thumb .video').each(function() {
                            let videoUrl = $(this).find('.video-id').text();
                            $(this).find('figure').html('');
                            $(this).find('figure').append('<img src="https://img.youtube.com/vi/' + videoUrl + '/hqdefault.jpg" alt="">');
                        });

                        if ($('.popupvideo').length > 0) {
                            $('.popupvideo .inner').css({
                                'width': '688px'
                            });
                            $('.popupvideo .youtube-con').css({
                                'width': '624px',
                                'height': '468px'
                            });
                        }
                    }
                    break;

                // servicecenter
                case 'servicecenter':
                    // ani
                    if ($('.centermap-area').length) {
                        ScrollTrigger.create({
                            // trigger: '.centermap-area',
                            // start: '-20% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-20% center', '.centermap-area'),
                            onEnter: function() {
                                $('.centermap-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.centermap-area').removeClass('active');
                                }
                            },
                        });
                    }

                    function infoAreaAni() {
                        $('.servicecenter .info-area').removeClass('active');
                        ScrollTrigger.create({
                            // trigger: '.info-area',
                            // start: '-30% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-30% center', '.info-area'),
                            onEnter: function() {
                                $('.info-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.info-area').removeClass('active');
                                }
                            },
                        });
                    }

                    infoAreaAni();

                    $('.servicecenter .list-area .btns.more .btn').click(function() {
                        infoAreaAni();
                    });
                    break;

                // warranty
                case 'warranty':
                    // ani
                    gsap.utils.toArray($('section')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-20% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-20% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    if ($('.warranty .list-area').length) {
                        ScrollTrigger.create({
                            // trigger: '.warranty .list-area',
                            // start: '-10% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-10% center', '.warranty .list-area'),
                            onEnter: function() {
                                $('.warranty .list-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.warranty .list-area').removeClass('active');
                                }
                            },
                        });
                    }

                    if ($('.servicedetail-area').length) {
                        gsap.utils.toArray($('.servicedetail-area ul li')).forEach(function(item) {
                            ScrollTrigger.create({
                                // trigger: item,
                                // start: '-20% center',
                                trigger: '#wrap',
                                start: () => Subfn.getStartCalc('-20% center', item),
                                onEnter: function() {
                                    $(item).addClass('active');
                                },
                                onLeaveBack: function() {
                                    if (!$('body').hasClass('fixed')) {
                                        $(item).removeClass('active');
                                    }
                                },
                            });
                        });
                    }
                    break;

                // excellence
                case 'excellence' :
                    gsap.utils.toArray($('section .scont')).forEach(function(item, index) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    if ($('.catalogue-area').length > 0) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', '.catalogue-area'),
                            onEnter: function() {
                                $('.catalogue-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.catalogue-area').removeClass('active');
                                }
                            },
                        });
                    }

                    if ($('.inquiry-area').length > 0) {
                        ScrollTrigger.create({
                            // trigger: '.inquiry-area',
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', '.inquiry-area'),
                            onEnter: function() {
                                $('.inquiry-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.inquiry-area').removeClass('active');
                                }
                            },
                        });
                    }
                    
                    if ($('.item-area').length > 0) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', '.item-area'),
                            onEnter: function() {
                                $('.item-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.item-area').removeClass('active');
                                }
                            },
                        });
                    }

                    if ($('.banner-area').length > 0) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', '.banner-area'),
                            onEnter: function() {
                                $('.banner-area').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.banner-area').removeClass('active');
                                }
                            },
                        });
                    }

                    // 연락처 복사하기
                    $('.inquiry-area .btn-copy').click(function() {
                        let
                            txetTel = $(this).parent().find('span').text(),
                            textarea = document.createElement('textarea');

                        document.body.appendChild(textarea);
                        textarea.value = txetTel;
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        fn.popup('open', '#popupAlert');
                    });
                    break;
                    
                // 문의하기
                case 'inquiry' :
                    $('#csfGb').change(function() {
                        let
                            optionSelected = $(this).find('option:selected'),
                            formType = optionSelected.attr('data-select-type');

                        document.getElementById('serialNumberDiv').style.display = 'none';

                        if(formType === 'INQR_GB010705') {
                            document.getElementById('serialNumberDiv').style.display = '';
                        }
                    });
                    break;
            }
            break;

        // media
        case 'media':
            switch (depth[1]) {
                // exhibition
                case 'exhibition':
                    // 목록 최신 전시회
                    if ($('.banner-swiper').length > 0) {
                        let bannerSwiper = new Swiper('.banner-swiper .swiper', {
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.banner-swiper .swiper-button-next',
                                prevEl: '.banner-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                            pagination: {
                                el: '.banner-swiper .swiper-pagination',
                                type: 'bullets',
                                clickable: true,
                            },
                        });
                    }

                    // 상세
                    if ($('.view-swiper').length > 0) {
                        let viewSwiper = new Swiper('.view-swiper .swiper', {
                            navigation: {
                                nextEl: '.view-swiper .swiper-button-next',
                                prevEl: '.view-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                            pagination: {
                                el: '.view-swiper .swiper-pagination',
                                type: 'fraction',
                                formatFractionCurrent: function(number) {
                                    return ('0' + number).slice(-2);
                                },
                                formatFractionTotal: function(number) {
                                    return ('0' + number).slice(-2);
                                },
                                renderFraction: function(currentClass, totalClass) {
                                    return '<span class="' + currentClass + '"></span>' +
                                        '<span class="line"></span>' +
                                        '<span class="' + totalClass + '"></span>';
                                },
                            },
                        });
                    }
                    break;

                // interview
                case 'interview':
                    if ($('.banner-swiper').length > 0) {
                        let bannerSwiper = new Swiper('.banner-swiper .swiper', {
                            slidesPerView: 'auto',
                            spaceBetween: 20,
                            observer: true,
                            observeParents: true,
                            navigation: {
                                nextEl: '.banner-swiper .swiper-button-next',
                                prevEl: '.banner-swiper .swiper-button-prev',
                            },
                            a11y: {
                                prevSlideMessage: 'Previous slide',
                                nextSlideMessage: 'Next slide',
                            },
                            on: {
                                slideChange: function() {
                                    let idx = bannerSwiper.realIndex;
                                    $('.banner-area .banner-info .info').removeClass('active');
                                    $('.banner-area .banner-info .info').eq(idx).addClass('active');
                                },
                            },
                        });
                    }
                    break;

                // video
                case 'video':
                    function getUrlParams() {
                        let params = {};
                        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
                            params[key] = value;
                        });
                        return params;
                    }
                    let getParams = getUrlParams();
                    if (getParams.videoSeq) {
                        videoLayer(getParams.videoSeq); // dev, url ex) /kr/board/video/videoList.do?videoSeq=1984
                    }
                    break;
                    
                // sponsor
                case 'sponsor':
                    gsap.utils.toArray($('.sidedetail-area .scont')).forEach(function(item, index) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    
                    /*ScrollTrigger.create({
                        trigger: '#wrap',
                        start: () => Subfn.getStartCalc('-25% center', '.schedule.layerdetail-area'),
                        onEnter: function() {
                            $('.schedule.layerdetail-area').addClass('active');
                        },
                        onLeaveBack: function() {
                            if (!$('body').hasClass('fixed')) {
                                $('.schedule.layerdetail-area').removeClass('active');
                            }
                        },
                    });
                    
                    ScrollTrigger.create({
                        trigger: '#wrap',
                        start: () => Subfn.getStartCalc('-5% center', '.event.layerdetail-area'),
                        onEnter: function() {
                            $('.event.layerdetail-area').addClass('active');
                        },
                        onLeaveBack: function() {
                            if (!$('body').hasClass('fixed')) {
                                $('.event.layerdetail-area').removeClass('active');
                            }
                        },
                    });*/
                    
                    break;
            }
            break;

        // company
        case 'company':
            switch (depth[1]) {
                // about
                case 'about':
                    switch (depth[2]) {
                        // dn
                        case 'dn':
                            gsap.utils.toArray($('section')).forEach(function(item) {
                                ScrollTrigger.create({
                                    // trigger: item,
                                    // start: '-25% center',
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('-25% center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });

                            // business
                            $('.business-area .btn-more').click(function() {
                                $('.business-area .flip-box').removeClass('active');
                                $(this).closest('.flip-box').addClass('active');
                            });

                            $('.business-area .btn-close').click(function() {
                                $(this).closest('.flip-box').removeClass('active');
                            });
                            break;

                        // whyus
                        case 'whyus':
                            gsap.utils.toArray($('section')).forEach(function(item) {
                                ScrollTrigger.create({
                                    // trigger: item,
                                    // start: '-25% center',
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('-25% center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });

                            // lineup
                            Subfn.propicSwiper('load');

                            // customerproduct
                            if ($('.customerproduct-swiper').length > 0) {
                                let customerproductSwiper = new Swiper('.customerproduct-swiper .swiper', {
                                    slidesPerView: 'auto',
                                    spaceBetween: 28,
                                    observer: true,
                                    observeParents: true,
                                    navigation: {
                                        nextEl: '.customerproduct-area .swiper-button-next',
                                        prevEl: '.customerproduct-area .swiper-button-prev',
                                    },
                                    a11y: {
                                        prevSlideMessage: 'Previous slide',
                                        nextSlideMessage: 'Next slide',
                                    },
                                });
                            }
                            break;

                        // whydn
                        case 'whydn':
                            gsap.utils.toArray($('section')).forEach(function(item) {
                                ScrollTrigger.create({
                                    // trigger: item,
                                    // start: '-25% center',
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('-25% center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });
                            break;

                        // history
                        case 'history':
                            // const tabsT = $('.infotxt-area').offset().top + $('.infotxt-area').height();

                            let
                                scrollT,
                                lineHeight = 0,
                                tabsT = ($('.infotxt-area').offset().top + $('.infotxt-area').height()) * Number($('#wrap').css('zoom'));

                            $(window).on('resize', function() {
                                tabsT = ($('.infotxt-area').offset().top + $('.infotxt-area').height()) * Number($('#wrap').css('zoom'));
                            });

                            $(window).on("load scroll", function() {
                                scrollT = $(this).scrollTop();

                                // line
                                // lineHeight = $('.historycont-area').offset().top - ($(window).height() / 2);
                                lineHeight = $('.historycont-area').get(0).offsetTop - ($(window).height() / 2);

                                if ($('.historycont-area .inner > ul > li').hasClass('active') && scrollT >= lineHeight) {
                                    // $('.historycont-area .inner .line').css({'height': + scrollT - lineHeight + 'px'});
                                    let lineHeightCalc;
                                    if (Number($('#wrap').css('zoom')) < 1) {
                                        lineHeightCalc = (scrollT - lineHeight) * 1.55;
                                    } else {
                                        lineHeightCalc = scrollT - lineHeight;
                                    }
                                    $('.historycont-area .inner .line').css({
                                        'height': +lineHeightCalc + 'px'
                                    });
                                } else {
                                    $('.historycont-area .inner .line').css({
                                        'height': +'0'
                                    });
                                }

                                // tabs
                                if (scrollT >= tabsT) {
                                    $('.tabs.slide').addClass('active');
                                } else {
                                    $('.tabs.slide').removeClass('active');
                                }
                            })

                            // tabs click
                            $('.tabs.slide a').click(function() {
                                let zoom = Number($('#wrap').css('zoom')) < 1 ? wrapZoomInit : 1;
                                let gap = 199;
                                let thisid = $(this).attr('href');
                                if (thisid == '#historyCon2010') {
                                    gap = 152;
                                }
                                $('html, body').animate({
                                    'scrollTop': (Math.ceil($('.historycont-area').get(0).offsetTop + $(thisid).get(0).offsetTop) - gap) * zoom
                                });
                            });

                            // history dot
                            gsap.utils.toArray($('.historycont-area .inner > ul > li')).forEach(function(item) {
                                ScrollTrigger.create({
                                    // trigger: item,
                                    // start: 'top 55%',
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('top center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                        $('.tabs.slide .swiper-slide a').removeClass('active');
                                        $('.tabs.slide .swiper-slide').eq($(item).index()).find('a').addClass('active');
                                        $('.pic > div').eq($(item).index()).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                            $('.tabs.slide .swiper-slide a').removeClass('active');
                                            $('.tabs.slide .swiper-slide').eq($(item).index() - 1).find('a').addClass('active');
                                            $('.pic > div').eq($(item).index()).removeClass('active');
                                        }
                                    },
                                });
                            });

                            gsap.utils.toArray($('.historycont-area .inner > ul > li > ul > li')).forEach(function(item) {
                                ScrollTrigger.create({
                                    // trigger: item,
                                    // start: 'top 55%',
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('top 55%', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });

                            // zoom 고해상도일 경우 마지막 li active
                            ScrollTrigger.create({
                                trigger: '#wrap',
                                start: () => Math.ceil($('#footer').offset().top * wrapZoomInit) + 'px 100%-=' + Math.ceil($('#footer').height() * wrapZoomInit - 50) + 'px',
                                end: 'max',
                                onEnter: function() {
                                    if (Number($('#wrap').css('zoom')) < 1) {
                                        $('.historycont-area .inner > ul > li:last > ul > li:nth-last-child(2)').addClass('active');
                                        $('.historycont-area .inner > ul > li:last > ul > li:last').addClass('active');
                                    }
                                },
                                onLeaveBack: function() {
                                    if (!$('body').hasClass('fixed')) {
                                        if (Number($('#wrap').css('zoom')) < 1) {
                                            $('.historycont-area .inner > ul > li:last > ul > li:nth-last-child(2)').removeClass('active');
                                            $('.historycont-area .inner > ul > li:last > ul > li:last').removeClass('active');
                                        }
                                    }
                                },
                            });
                            break;
                            
                        // ci
                        case 'ci':
                            gsap.utils.toArray($('.sidedetail-area .scont')).forEach(function(item, index) {
                                ScrollTrigger.create({
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('-25% center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });
                            break;
                    }
                    break;

                // ESG 삭제 예정
                case 'esg':
                    gsap.utils.toArray($('section')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;

                // partner
                case 'partner':
                    switch (depth[2]) {
                        // dn
                        case 'joe':
                            gsap.utils.toArray($('section')).forEach(function(item) {
                                ScrollTrigger.create({
                                    // trigger: item,
                                    // start: '-25% center',
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('-25% center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });
                            break;
                    }
                    break;

                // technical
                case 'technical':
                    gsap.utils.toArray($('section')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;

                // machine
                case 'machine':
                    gsap.utils.toArray($('section')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;

                // CSM
                case 'csm':
                    // tabs click
                    $('.tabs.slide a').click(function() {
                        let zoom = Number($('#wrap').css('zoom')) < 1 ? wrapZoomInit : 1;
                        let gap = 72;
                        let thisid = $(this).attr('href');
                        if (thisid == '#tabManage') {
                            gap = 132;
                        }
                        $('html, body').animate({
                            'scrollTop': (Math.ceil($(thisid).get(0).offsetTop) - gap) * zoom
                        });
                    });

                    gsap.utils.toArray($('section.cont')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: 'top 132px',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top 132px', item),
                            onEnter: function() {
                                $('.tabs.slide .swiper-slide a').removeClass('active');
                                $('.tabs.slide .swiper-slide').eq(Number($(item).index() - 3)).find('a').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.tabs.slide .swiper-slide a').removeClass('active');
                                    if (Number($(item).index() - 4) < 0) {
                                        $('.tabs.slide .swiper-slide').eq(0).find('a').addClass('active');
                                    } else {
                                        $('.tabs.slide .swiper-slide').eq(Number($(item).index() - 4)).find('a').addClass('active');
                                    }
                                }
                            },
                        });
                    });

                    gsap.utils.toArray($('section.cont .scont')).forEach(function(item) {
                        ScrollTrigger.create({
                            // trigger: item,
                            // start: '-25% center',
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });

                    if (depth[2] == 'social') {
                        gsap.utils.toArray($('#tabContribution .guidetxt ul li')).forEach(function(item) {
                            ScrollTrigger.create({
                                // trigger: item,
                                // start: '-25% center',
                                trigger: '#wrap',
                                start: () => Subfn.getStartCalc('-25% center', item),
                                onEnter: function() {
                                    $(item).addClass('active');
                                },
                                onLeaveBack: function() {
                                    if (!$('body').hasClass('fixed')) {
                                        $(item).removeClass('active');
                                    }
                                },
                            });
                        });
                    }
                    break;
                    
                // finance
                case 'finance':
                    gsap.utils.toArray($('.financeinfo-area > *')).forEach(function(item) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    
                    gsap.utils.toArray($('.financedetail-area .scont > *')).forEach(function(item) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;
                    
                //  promotion
                case 'promotion':
                    // 프로모션 섹션별 제품 리스트 스와이프
                    if ($('.company.promotion .applyseries-swiper').length > 0) {
                        $('.company.promotion .applyseries-swiper').each(function(index) {
                            $(this).addClass('swiper-instance-' + index);
                            new Swiper('.company.promotion .applyseries-swiper.swiper-instance-' + index + ' .swiper', {
                                slidesPerView: 4,
                                spaceBetween: 30,
                                observer: true,
                                observeParents: true,
                                navigation: {
                                    nextEl: '.company.promotion .applyseries-swiper.swiper-instance-' + index + ' .swiper-button-next',
                                    prevEl: '.company.promotion .applyseries-swiper.swiper-instance-' + index + ' .swiper-button-prev',
                                },
                                a11y: {
                                    prevSlideMessage: 'Previous slide',
                                    nextSlideMessage: 'Next slide',
                                },
                            });
                        });
                    }
                    // 텝메뉴 앵커이동
                    $('.tabs.slide a').click(function() {
                        let zoom = Number($('#wrap').css('zoom')) < 1 ? wrapZoomInit : 1;
                        let gap = 72;
                        let thisid = $(this).attr('href');
                        if (thisid == '#tabMachine') {
                            gap = 132;
                        }
                        $('html, body').animate({
                            'scrollTop': (Math.ceil($(thisid).get(0).offsetTop) - gap) * zoom
                        });
                    });
                    gsap.utils.toArray($('.cont[id^="tab"]')).forEach(function(item) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('top 132px', item),
                            onEnter: function() {
                                $('.tabs.slide .swiper-slide a').removeClass('active');
                                $('.tabs.slide .swiper-slide').eq(Number($(item).index() - 3)).find('a').addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $('.tabs.slide .swiper-slide a').removeClass('active');
                                    if (Number($(item).index() - 4) < 0) {
                                        $('.tabs.slide .swiper-slide').eq(0).find('a').addClass('active');
                                    } else {
                                        $('.tabs.slide .swiper-slide').eq(Number($(item).index() - 4)).find('a').addClass('active');
                                    }
                                }
                            },
                        });
                    });
                    
                    gsap.utils.toArray($('.layerdetail-area')).forEach(function(item, index) {
                        ScrollTrigger.create({
                            trigger: '#wrap',
                            start: () => Subfn.getStartCalc('-25% center', item),
                            onEnter: function() {
                                $(item).addClass('active');
                            },
                            onLeaveBack: function() {
                                if (!$('body').hasClass('fixed')) {
                                    $(item).removeClass('active');
                                }
                            },
                        });
                    });
                    break;
            }
            break;
            
        // 투자정보
        case 'invest':
            switch (depth[1]) {
                // 주식 및 주주정보
                case 'stocks':
                    switch (depth[2]) {
                        // dn
                        case 'return':
                            gsap.utils.toArray($('.sidedetail-area .scont')).forEach(function(item, index) {
                                ScrollTrigger.create({
                                    trigger: '#wrap',
                                    start: () => Subfn.getStartCalc('-25% center', item),
                                    onEnter: function() {
                                        $(item).addClass('active');
                                    },
                                    onLeaveBack: function() {
                                        if (!$('body').hasClass('fixed')) {
                                            $(item).removeClass('active');
                                        }
                                    },
                                });
                            });

                            ScrollTrigger.create({
                                trigger: '#wrap',
                                start: () => Subfn.getStartCalc('-25% center', '.layerdetail-area'),
                                onEnter: function() {
                                    $('.layerdetail-area').addClass('active');
                                },
                                onLeaveBack: function() {
                                    if (!$('body').hasClass('fixed')) {
                                        $('.layerdetail-area').removeClass('active');
                                    }
                                },
                            });
                            break;
                    }
                    break;
            }
            break;

        // career
        case 'career':
            $(window).on("load scroll", function() {
                let scrollT = $(this).scrollTop();

                if (scrollT > 0) {
                    $('.scrolling-area').fadeOut(600);
                }
            });

            gsap.utils.toArray($('section')).forEach(function(item) {
                ScrollTrigger.create({
                    // trigger: item,
                    // start: '-25% center',
                    trigger: '#wrap',
                    start: () => Subfn.getStartCalc('-25% center', item),
                    onEnter: function() {
                        $(item).addClass('active');
                    },
                    onLeaveBack: function() {
                        if (!$('body').hasClass('fixed')) {
                            $(item).removeClass('active');
                        }
                    },
                });
            });

            var swiper = new Swiper(".benefit-swiper", {
                effect: "fade",
                loop: true,
                touchRatio: 0,
                pagination: {
                    el: ".benefit-swiper .swiper-pagination",
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '"><span class="txt-tit">' + $('.benefit-swiper .swiper-slide').eq(index + 1).find('.info .tit').text() + "</span></span>";
                    },
                },
            });

            let $sloganMarquee;

            ScrollTrigger.matchMedia({
                '(max-width: 1366px)': function() {
                    $sloganMarquee = $('.slogan-area').marquee({
                        easing: 'linear',
                        speed: 100,
                        gap: 0,
                        delayBeforeStart: 0,
                        direction: 'left',
                        duplicated: true,
                        pauseOnHover: true,
                        startVisible: true,
                    });
                },

                '(min-width: 1367px)': function() {
                    if ($sloganMarquee) {
                        $sloganMarquee.marquee('destroy');
                    }

                    if (!$('body').hasClass('fixed')) {
                        gsap.to('.slogan-area ul', {
                            scrollTrigger: {
                                trigger: '.slogan-area',
                                start: '70% center',
                                end: 'bottom top',
                                pin: true,
                                scrub: 1,
                            },
                            x: -2380,
                        });
                    }
                }
            });

            // if ( !$('body').hasClass('fixed') ) {
            // 	gsap.to('.slogan-area ul',{
            // 		scrollTrigger: {
            // 			trigger: '.slogan-area',
            // 			start: '70% center',
            // 			end: 'bottom top',
            // 			pin: true,
            // 			scrub: 1,
            // 		},
            // 		x: -2380,
            // 	});
            // }
            break;

        // utility
        case 'utility':
            switch (depth[1]) {
                // contactus
                case 'contactus':
                    // 문의 유형
                    $('.form-area .form-legend .select.formtype select').change(function() {
                        let
                            optionSelected = $(this).find('option:selected'),
                            formType = optionSelected.attr('data-formtype');

                        $('.contactus .form-area .form-content').show();
                        $('.contactus .form-area ~ .form-area').show();
                        $('.contactus .form-agree').show();
                        $('.contactus .btns').show();

                        switch (formType) {
                            // 문의 유형을 선택하세요​.
                            case undefined:
                                $('.contactus .form-area .form-content').hide();
                                $('.contactus .form-area ~ .form-area').hide();
                                $('.contactus .form-agree').hide();
                                $('.contactus .btns').hide();
                                break;

                                // 제품 구매 / 기술 지원 / 부품 / 고객서비스
                            case 'formtype1':
                                $('.form-entry[data-field="product"]').show();
                                $('.form-entry[data-field="company"]').show();
                                $('.form-entry[data-field="company"]').show();
                                // $('.form-entry[data-field="address"]').show();

                                $('.form-area .inp-self').prop('checked', false);
                                fn.removeActive('.form-area .product-name');
                                $('.form-entry[data-field="product"]').find('select').each(function(i, item) {
                                    $(item).find('option').eq(0).prop('selected', true);
                                    $(item).prop('disabled', false);
                                });
                                fn.select('.select.product1', 'reset');
                                fn.select('.select.product2', 'reset');
                                fn.select('.select.product3', 'reset');

                                document.getElementById('spindelN').style.display = '';
                                document.getElementById('spindelY').style.display = 'none';
                                document.getElementById('infoText').style.display = 'none';

                                const drvSeqValue = document.getElementById('drvSeqValue').value;

                                if(drvSeqValue == 1 && (optionSelected[0].value == 1 || optionSelected[0].value == 2 || optionSelected[0].value == 3)) {
                                    document.getElementById('spindelN').style.display = 'none';
                                    document.getElementById('spindelY').style.display = '';
                                    document.getElementById('infoText').style.display = '';
                                }

                                if(drvSeqValue == 2 && (optionSelected[0].value == 1 || optionSelected[0].value == 2 || optionSelected[0].value == 3)) {
                                    document.getElementById('spindelN').style.display = 'none';
                                    document.getElementById('spindelY').style.display = '';
                                    document.getElementById('infoText').style.display = '';
                                }

                                if(drvSeqValue == 5 && (optionSelected[0].value == 1 || optionSelected[0].value == 2 || optionSelected[0].value == 3 || optionSelected[0].value == 6)) {
                                    document.getElementById('spindelN').style.display = 'none';
                                    document.getElementById('spindelY').style.display = '';
                                    document.getElementById('infoText').style.display = '';
                                }

                                if(optionSelected[0].value == 0 || optionSelected[0].value == 4) {
                                    document.querySelector('[data-field="serial"]').style.display = 'none';
                                } else {
                                    document.querySelector('[data-field="serial"]').style.display = '';
                                }

                                break;

                                // 채용
                            case 'formtype2':
                                $('.form-entry[data-field="product"]').hide();
                                $('.form-entry[data-field="company"]').hide();
                                // $('.form-entry[data-field="address"]').hide();

                                document.getElementById('spindelN').style.display = '';
                                document.getElementById('spindelY').style.display = 'none';
                                document.getElementById('infoText').style.display = 'none';

                                if(optionSelected[0].value == 0 || optionSelected[0].value == 4) {
                                    document.querySelector('[data-field="serial"]').style.display = 'none';
                                } else {
                                    document.querySelector('[data-field="serial"]').style.display = '';
                                }
                                break;

                                // 기타
                            case 'formtype3':
                                $('.form-entry[data-field="product"]').hide();
                                $('.form-entry[data-field="company"]').show();
                                // $('.form-entry[data-field="address"]').show();

                                document.getElementById('spindelN').style.display = '';
                                document.getElementById('spindelY').style.display = 'none';
                                document.getElementById('infoText').style.display = 'none';
                                break;
                        }
                    });

                    // 직접 입력
                    $('.form-area .inp-self').click(function() {
                        fn.toggleActive('.product-name');
                        if ($(this).is(':checked')) {
                            $('.form-entry[data-field="product"]').find('select').each(function(i, item) {
                                $(item).prop('disabled', true);
                            });
                        } else {
                            $('.form-entry[data-field="product"]').find('select').each(function(i, item) {
                                $(item).prop('disabled', false);
                            });
                        }
                        fn.select('.select.product1', 'reset');
                        fn.select('.select.product2', 'reset');
                        fn.select('.select.product3', 'reset');
                    });
                    break;
            }
            break;

        // search
        case 'search':
            // 검색어
            if ($('.search-area .form-search > input').val() != '') {
                $('.search-area .btn-del').show();
            }

            $(document).on('keyup focus', '.search-area .form-search > input', function() {
                if ($(this).val() != '') {
                    $(this).parent().find('.btn-del').show();
                } else {
                    $(this).parent().find('.btn-del').hide();
                }
            });

            // 최근 검색어
            Subfn.recentSwiper('load');

            // 제품 찾기
            Subfn.proSearch();
            Subfn.proSearch('reset');

            // 통합 검색 tabs
            if ($('.total-area').length > 0) {
                if ($('.total-area .tabs.slide .swiper-slide').length > 0) {
                    $('.total-area .tabs.slide').addClass('active');
                } else {
                    $('.total-area .tabs.slide').removeClass('active');
                }
            }
            break;
    }
});