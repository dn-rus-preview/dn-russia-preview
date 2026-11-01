/**
 * --------------------------------
 * Function JS
 * --------------------------------
 */

const fn = (() => {
    'use strict';

    let
        scrollt = 0,
        wrapZoom = 0.74,
        productcheckSwiper,
        specTableScrollSwiper,
        popupSpecTableScrollSwiper,
        videoProductSwiper,
        isChina = $('html').attr('lang') == 'zh' ? true : false,
        gnbProBannerHrefInit,
        gnbProBannerSrcInit,
        gnbProBannerTit1Init,
        gnbProBannerTit2Init,
        isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints; // ipad pro safari detect

    return {

        //break word as-is 데이터 깨짐 문자 치환
        breakWord: function(obj) {
            var bword = $(obj).html();
            // bword = bword.replaceAll('￿', '');
            // bword = bword.replaceAll('￿', '');
            bword = bword.replace(/￿/g, '');
            bword = bword.replace(/￿/g, '');
            $(obj).html(bword);
        },

        // header load
        headerLoad: function() {
            $('#header').addClass('load');
        },

        // headerGnb
        headerGnb: function(state) {
            const
                $logo = $('#header .logo a'),
                $btnGnb = $('#header .btn-gnb'),
                $gnbDep1 = $('#header .gnb-list .dep1 > li'),
                $gnbDep1A = $('#header .gnb-list .dep1 > li > a'),
                $gnbProBanner = $('#header .gnb-list li.product .pro-banner'),
                $gnbBtnClose = $('#header .gnb-list li.product .btn-close'),
                $gnbBtnToggles = $('#header .gnb-list li.product .btns-toggles'),
                gnbBtnToggles = '#header .gnb-list li.product .btns-toggles',
                $gnbBtnToggle = $('#header .gnb-list li.product .btns-toggles .btn-toggle'),
                $gnbBtnToggleLine = $('#header .gnb-list li.product .btns-toggles .btn-toggle.btn-line'),
                $gnbProSpec = $('#header .gnb-list li.product .pro-spec'),
                $gnbProDep2Wrap = $('#header .gnb-list li.product .dep2-wrap'),
                $gnbProDep4Wrap = $('#header .gnb-list li.product .dep4-wrap'),
                $gnbProDep5Wrap = $('#header .gnb-list li.product .dep5-wrap'),
                $gnbProDep6Wrap = $('#header .gnb-list li.product .dep6-wrap'),
                $gnbProDep2Inner = $('#header .gnb-list li.product .dep2-wrap > .inner'),
                $gnbProDep3 = $('#header .gnb-list li.product .dep3 > li'),
                $gnbProDep4 = $('#header .gnb-list li.product .dep4 > li'),
                $gnbProDep5 = $('#header .gnb-list li.product .dep5 > li'),
                $gnbProDep6 = $('#header .gnb-list li.product .dep6 > li'),
                gnbProSpecHeight = 770;

            let
                gnbProLineHeight = 580,
                scrollbarWidth = window.innerWidth - document.documentElement.clientWidth,
                maxWidth = 1920 - scrollbarWidth;

            if (isChina) {
                gnbProLineHeight = 630;
            }

            // 제품 > pro-banner
            function gnbProBannerResize() {
                if ($(window).width() < maxWidth) {
                    if (Number($('#header .dep2-wrap').css('zoom')) < 1) {
                        $gnbProBanner.css({
                            left: 'auto',
                            right: 0
                        });
                    } else {
                        $gnbProBanner.css({
                            right: 'auto',
                            left: $('#header li.product .dep6-wrap.active').offset().left + $('#header li.product .dep6-wrap.active').outerWidth()
                        });
                    }
                } else {
                    $gnbProBanner.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }

            if (state != 'reset') {
                // logo
                $logo.on('focus', function() {
                    $('#header').removeClass('active');
                    $gnbDep1.removeClass('active');
                });

                // gnb
                $gnbBtnClose.on('click', function() {
                    $('#header').removeClass('active');
                    $gnbDep1.removeClass('active');
                    fn.headerGnb('reset');
                });

                // 공통 depth1
                if (isTouchDevice) {
                    // click
                    $gnbDep1A.each(function(index, item) {
                        let $link = $(item);
                        $link.on('click', function() {
                            scrollt = $(window).scrollTop();
                            if ($link.parent().find('.dep2-wrap .dep2 > li').length) { // 하위메뉴 없을 경우 제외 (채용)
                                $('#header').addClass('active');
                                $gnbDep1.removeClass('active'); // this siblings
                                $link.parent().addClass('active'); // this
                                fn.headerGnb('reset');
                                fn.scroll('disabled', scrollt);
                            }
                        });
                    });

                    $('#header .dimmed').on('click', function() {
                        $('#header').removeClass('active');
                        $gnbDep1.removeClass('active');
                        fn.scroll('enabled', scrollt);
                    });
                } else {
                    // mouseover
                    $gnbDep1.each(function(index, item) {
                        let $link = $(item);
                        $link.on('mouseenter focus', function() {
                            scrollt = $(window).scrollTop();
                            if ($link.find('.dep2-wrap .dep2 > li').length) { // 하위메뉴 없을 경우 제외
                                $('#header').addClass('active');
                                $gnbDep1.removeClass('active'); // this siblings
                                $link.addClass('active'); // this
                                fn.headerGnb('reset');
                                fn.scroll('disabled', scrollt);
                            }
                        }).on('mouseleave', function() {
                            $('#header').removeClass('active');
                            $gnbDep1.removeClass('active');
                            fn.scroll('enabled', scrollt);
                        });
                    });
                }

                // 제품 > 제품 선택 > 솔루션 별 삭제됨
                // 제품 > 제품 선택 > (depth3) 라인업 별 / 솔루션 별
                $gnbProDep3.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        if ($(this).parent('li').hasClass('lineup')) {
                            $gnbBtnToggles.removeClass('solution').addClass('lineup');
                            $gnbProSpec.removeClass('solution').addClass('lineup');
                        } else if ($(this).parent('li').hasClass('solution')) {
                            $gnbBtnToggles.removeClass('lineup').addClass('solution');
                            $gnbProSpec.removeClass('lineup').addClass('solution');
                        }

                        gnbProLineHeight = $('#header .gnb-list .product .dep5-wrap.active .dep5').outerHeight();
                        $gnbProDep2Wrap.css('height', gnbProLineHeight);
                        $gnbProDep3.removeClass('active'); // this siblings
                        $gnbProDep4Wrap.removeClass('active');
                        $gnbProDep4.removeClass('active');
                        $gnbProDep5Wrap.removeClass('active');
                        $gnbProDep5.removeClass('active');
                        $gnbProDep6Wrap.removeClass('active');
                        $gnbProDep6.removeClass('active');
                        $gnbProBanner.removeClass('active');
                        gsap.to(gnbBtnToggles, {
                            marginLeft: '-20px',
                            opacity: 0,
                            duration: 0
                        });
                        $gnbBtnToggle.removeClass('active');
                        $gnbBtnToggleLine.addClass('active');
                        $gnbProSpec.removeClass('active');

                        $link.parent('li').addClass('active'); //this
                        if ($(this).parent('li').hasClass('lineup')) {
                            $link.next('.dep4-wrap').addClass('active');
                        }

                        gnbProDe6Resize();
                    });
                });

                // 제품 > 제품 선택 > 라인업 별 / 솔루션 별 > (depth4) 터닝센터 *
                $gnbProDep4.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        // $gnbProDep2Wrap.css('height', gnbProLineHeight);
                        $gnbProDep4.removeClass('active'); // this siblings
                        $gnbProDep5Wrap.removeClass('active');
                        $gnbProDep5.removeClass('active');
                        $gnbProDep6Wrap.removeClass('active');
                        $gnbProDep6.removeClass('active');
                        $gnbProBanner.removeClass('active');
                        $gnbProSpec.removeClass('active');

                        gsap.fromTo(gnbBtnToggles, {
                            marginLeft: '-20px',
                            opacity: 0
                        }, {
                            marginLeft: 0,
                            opacity: 1,
                            duration: 0.5
                        });
                        $gnbBtnToggle.removeClass('active');
                        $gnbBtnToggleLine.addClass('active');

                        if ($link.attr('data-menu') == 'software') {
                            $gnbBtnToggles.addClass('off');
                        } else {
                            $gnbBtnToggles.removeClass('off');
                        }

                        $link.parent('li').addClass('active'); //this
                        $link.next('.dep5-wrap').addClass('active');
                        $link.next('.dep5-wrap').find('.pro-line').addClass('active');

                        gnbProLineHeight = $('#header .gnb-list .product .dep5-wrap.active .dep5').outerHeight();
                        $gnbProDep2Wrap.css('height', gnbProLineHeight);
                    });
                });

                // 제품 > 제품 선택 > 라인업 별 / 솔루션 별 > 터닝센터 * > (depth5) 2축 수평형 터닝 센터 *
                $gnbProDep5.each(function(index, item) {
                    let $link = $(item).children('a');
                    $link.on('click', function() {
                        if (!$link.parent().hasClass('btn-category')) { // 대분류 개요
                            $gnbProDep5.removeClass('active'); // this siblings
                            $gnbProDep6Wrap.removeClass('active');
                            $gnbProDep6.removeClass('active');
                            $gnbProBanner.removeClass('active');

                            $link.parent('li').addClass('active'); //this
                            $link.next('.dep6-wrap').addClass('active');
                        }
                    });
                });

                // 제품 > 제품 선택 > 라인업 별 / 솔루션 별  > 터닝센터 * > 2축 수평형 터닝 센터 *  > (depth6) series *
                $gnbProDep6.each(function(index, item) {
                    let $link = $(item).children('a');

                    if (!$link.parent().hasClass('btn-category')) { // 중분류 개요
                        $link.on('mouseenter', function() {
                            $gnbProDep6.removeClass('active'); // this siblings

                            $link.parent('li').addClass('active'); //this
                            $gnbProBanner.addClass('active');

                            // 제품 > pro-banner





                            gnbProBannerResize();
                        });
                    }
                });

                // 제품 > 라인/사양 토글
                $gnbBtnToggle.each(function(index, item) {
                    $(item).on('click', function() {
                        $gnbProBanner.removeClass('active');
                        $gnbProDep5.removeClass('active');
                        $gnbProDep6Wrap.removeClass('active');

                        if ($(item).hasClass('btn-line')) {
                            $gnbProSpec.removeClass('active');
                            $('#header .dep5-wrap.active .pro-line').addClass('active');

                            gnbProLineHeight = $('#header .gnb-list .product .dep5-wrap.active .dep5').outerHeight();
                            $gnbProDep2Wrap.css('height', gnbProLineHeight);
                        } else if ($(item).hasClass('btn-spec')) {
                            $gnbProDep2Wrap.css('height', gnbProSpecHeight);
                            $('#header .dep5-wrap .pro-line').removeClass('active');
                            $gnbProSpec.addClass('active');
                        }
                    });
                });

                // 제품 > 6depth width
                function gnbProDe6Resize() {
                    let gnbProDe6Width;
                    if ($('#header .gnb-list li.product .lineup').hasClass('active')) {
                        gnbProDe6Width =
                            $gnbProDep2Inner.outerWidth() -
                            parseInt($gnbProDep2Inner.css('padding-left')) -
                            $('#header .gnb-list .dep1 > li.product .dep2').outerWidth() -
                            $('#header .gnb-list .dep1 > li.product .lineup .dep4').outerWidth() - 1 -
                            $('#header .gnb-list .dep1 > li.product .dep5').outerWidth() -
                            $gnbProBanner.outerWidth();
                    } else {
                        gnbProDe6Width = parseInt($('#header .gnb-list .dep1 > li.product .solution .dep6-wrap').css('min-width'));
                    }

                    $('#header .gnb-list .dep1 > li.product .dep6-wrap').css('width', gnbProDe6Width);
                }

                // 제품 배너
                gnbProBannerHrefInit = $('#header .gnb-list li.product .pro-banner a').attr('href');
                gnbProBannerSrcInit = $('#header .gnb-list li.product .pro-banner img').attr('src');
                gnbProBannerTit1Init = $('#header .gnb-list li.product .pro-banner .tit small').text();
                gnbProBannerTit2Init = $('#header .gnb-list li.product .pro-banner .tit strong').text();

                // 채용
                // $('#header .gnb-list > li.career .dep2').css('width', $('#header .gnb-list').width());

                $(window).resize(function() {
                    // 제품 > 2depth position
                    // $gnbProDep2Inner.css('paddingLeft', ($gnbProDep2Inner.outerWidth() - $('#header > .inner').outerWidth()) / 2);

                    gnbProDe6Resize();

                    if ($('#header li.product .active .dep6-wrap').hasClass('active')) {
                        gnbProBannerResize();
                    }

                    // css zoom
                    if (window.innerWidth > 1366 && window.innerWidth < 1800 && Number($('#wrap').css('zoom')) == 1) {
                        $('#header .dep2-wrap').css('zoom', (window.innerWidth / 1920).toFixed(2) * 100 + '%')
                    } else if (window.innerWidth < 1366) {
                        $('#header .dep2-wrap').css('zoom', (window.innerWidth / (1920 * wrapZoom)).toFixed(2) * 100 + '%')
                    }
                }).trigger('resize');
                
                // fixed
                let scrollLeftValue = parseInt($('#header').css('margin-left'));
                $(window).scroll(function() {
                    // scroll left
                    $('#header').css('margin-left', scrollLeftValue - $(this).scrollLeft() - ($(this).scrollLeft() * 0.35));
                    $('.popupallmenu').css('margin-left', scrollLeftValue - $(this).scrollLeft() - ($(this).scrollLeft() * 0.35));
                    
                    incScroll = true;
                });
                incScrolled();
                setInterval(function() {
                    if (incScroll) {
                        incScrolled();
                        incScroll = false;
                    }
                    
                    if (!document.body.classList.contains('fixed')) {
                        if(document.scrollingElement.scrollTop === 0) {
                            let head = document.querySelector('#header');
                            if (head) {
                                head.classList.remove('fixed', 'up');
                            }
                        }
                    }
                }, 100);
                
                // util
                $btnGnb.click(function() {
                    fn.toggleActive('#header .btn-gnb');
                    if ($(this).hasClass('active')) {
                        $('#header').removeClass('active');
                        $gnbDep1.removeClass('active');
                        fn.headerGnb('reset');

                        fn.popup('open', '#popupAllMenu');
                    } else {
                        fn.popup('close', '#popupAllMenu');
                    }
                });

                // allmenu
                $('.popupallmenu .sns a:last-child').on('focusout', function() {
                    $btnGnb.focus();
                });
            } else {
                // reset
                $gnbProDep3.removeClass('active');
                $gnbProDep4Wrap.removeClass('active');
                $gnbProDep4.removeClass('active');
                $gnbProDep5Wrap.removeClass('active');
                $gnbProDep5.removeClass('active');
                $gnbProDep6Wrap.removeClass('active');
                $gnbProDep6.removeClass('active');
                $gnbProSpec.removeClass('active');

                $gnbProBanner.addClass('active');
                $('#header .gnb-list li.product .pro-banner a').attr('href', gnbProBannerHrefInit);
                $('#header .gnb-list li.product .pro-banner img').attr('src', gnbProBannerSrcInit);
                $('#header .gnb-list li.product .pro-banner img').attr('alt', gnbProBannerTit2Init);
                $('#header .gnb-list li.product .pro-banner .tit small').text(gnbProBannerTit1Init);
                $('#header .gnb-list li.product .pro-banner .tit strong').text(gnbProBannerTit2Init);

                gsap.to(gnbBtnToggles, {
                    marginLeft: 0,
                    opacity: 1,
                    duration: 0
                });
                $gnbBtnToggles.removeClass('solution').addClass('lineup').removeClass('off');
                $gnbBtnToggle.removeClass('active');
                $gnbBtnToggleLine.addClass('active');
                $gnbProSpec.removeClass('solution').addClass('lineup');
                // $gnbProDep2Wrap.css('height', gnbProLineHeight);

                // 제품 > 제품 선택 > 라인업 별 > 하위 depth 별 첫번째 메뉴 활성화
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4-wrap').addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4 > li').eq(0).addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4 > li').eq(0).find('.dep5-wrap').addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4 > li').eq(0).find('.dep5-wrap .pro-line').addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4 > li').eq(0).find('.dep5 > li').eq(1).addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4 > li').eq(0).find('.dep5 > li').eq(1).find('.dep6-wrap').addClass('active');
                $('#header .gnb-list .dep1 > li').eq(0).find('.dep2 > li').eq(1).find('.dep3 > li').eq(0).find('.dep4 > li').eq(0).find('.dep5 > li').eq(1).find('.dep6 > li').eq(1).addClass('active');

                gnbProLineHeight = $('#header .gnb-list .product .dep5-wrap.active .dep5').outerHeight();
                $gnbProDep2Wrap.css('height', gnbProLineHeight);
                gnbProBannerResize();
                $('#header .gnb-list .dep1 > li.product .dep6-wrap .dep6').scrollTop(0);

                // dev 사양 버튼 개발 대분류 코드 값 호출
                $('#schCtgryCd1').val('D101'); // 터닝센터
                // if ($('#schCtgryCd1').length > 0) {
                // 	let devCodeSpec = $('#header .gnb-list .product .dep2 li').eq(1).find('.dep3 .lineup .dep4-wrap .dep4 li').eq(0).children('a').attr('onclick').replace("goSpec3Depth('", "").replace("')", "");
                // 	$('#schCtgryCd1').val(devCodeSpec);
                // }
            }
        },

        // scrollControl
        scrollControl: function() {
            let scrollT = $(window).scrollTop();
            const $aside = $('#aside');

            $(window).scroll(function() {
                scrollT = $(window).scrollTop();

                // aside
                if (scrollT + $(window).height() > $('#footer').offset().top) {
                    $aside.removeClass('fixed');
                } else {
                    $aside.addClass('fixed');
                }
            }).trigger('resize').trigger('scroll');
        },

        // scroll 고정
        scroll: function(state, top) {
            let scrolltNow = top;

            switch (state) {
                case 'disabled':
                    $('body').css('top', -scrolltNow).addClass('fixed');
                    break;

                case 'enabled':
                    $('body').css('top', 0).removeClass('fixed');
                    scrollt = 0;
                    $(window).scrollTop(scrolltNow);
                    break;
            }
        },

        // 팝업 열기/닫기
        popup: (state, target, youtubeId, videoTitle) => {
            if (typeof target === 'object') {
                event.preventDefault();
                target = target.closest('[class*=popup]') ? '#' + target.closest('[class*=popup]').id : target.attributes.href.value;
            } else if (typeof target === 'undefined') {
                target = '#' + document.querySelector(':focus').closest('[class*=popup]').id
            }

            let
                popupOrder,
                $popup = document.querySelector(target),
                $popupEnd = document.querySelector(target + '_end');

            switch (state) {
                case 'open':
                    if (!$('body').hasClass('fixed')) {
                        scrollt = $(window).scrollTop();
                        fn.scroll('disabled', scrollt);
                    }

                    if ($(target).hasClass('popupvideo')) {
                        $('.popupvideo .youtube-con').html('');
                        $('.popupvideo .youtube-con').append("<iframe src='https://youtube.com/embed/" + youtubeId + "?rel=0&amp;playsinline=1&amp;autoplay=1' allow='autoplay; encrypted-media' allowfullscreen title=''></iframe>");

                        if (videoTitle) {
                            if ($(target).attr('id') == 'popupVideoCategory') {
                                $('.popupvideo .contents .tit').text('');
                                $('.popupvideo .contents .tit').text(videoTitle);
                            } else {
                                $('.popupvideo .header .tit').text('');
                                $('.popupvideo .header .tit').text(videoTitle);
                            }
                        }

                        // 제품 상세 비디오 팝업
                        if ($(target).find('.video-swiper').length) {
                            if (videoProductSwiper) {
                                videoProductSwiper.destroy();
                            }

                            videoProductSwiper = new Swiper('.popupvideo .video-swiper .swiper', {
                                slidesPerView: 3,
                                spaceBetween: 12,
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

                            const $videoSlide = $('.video-swiper').find('.swiper-slide'),
                                firstVideoId = $videoSlide.eq(0).find('.video-id').text(),
                                firstVideoTit = $videoSlide.eq(0).find('.tit').text();

                            $(target).find('.youtube-con').html('');
                            $(target).find('.youtube-con').append("<iframe src='https://youtube.com/embed/" + firstVideoId + "?rel=0&amp;playsinline=1&amp;autoplay=1' allow='autoplay; encrypted-media' allowfullscreen title=''></iframe>");
                            $(target + ' .video-swiper').children('.tit').text(firstVideoTit);

                            $videoSlide.each(function() {
                                let videoId = $(this).find('.video-id').text(),
                                    videoTit = $(this).find('.tit').text();
                                $(this).find('figure').html('');
                                $(this).find('figure').append('<img src="https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg" alt="">');

                                $(this).on('click', function() {
                                    $('.popupvideo .video-swiper > .tit').text(videoTit);
                                    $(this).closest('.popupvideo').find('.youtube-con').html('');
                                    $(this).closest('.popupvideo').find('.youtube-con').append("<iframe src='https://youtube.com/embed/" + videoId + "?rel=0&amp;playsinline=1&amp;autoplay=1' allow='autoplay; encrypted-media' allowfullscreen title=''></iframe>");
                                });
                            });
                        }
                    } else if ($(target).hasClass('popupvimeo')) {
                        $('.popupvimeo .vimeo-con').html('');
                        $('.popupvimeo .vimeo-con').append('<iframe src="https://player.vimeo.com/video/' + youtubeId + '?byline=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" data-ready="true"></iframe>');

                        if (videoTitle) {
                            $('.popupvimeo .header .tit').text('');
                            $('.popupvimeo .header .tit').text(videoTitle);
                        }
                    } else if ($(target).hasClass('popupyouku')) {
                        $('.popupyouku .youku-con').html('');
                        $('.popupyouku .youku-con').append('<iframe src="https://player.youku.com/embed/' + youtubeId + '" frameborder=0 "allowfullscreen"></iframe>');

                        if (videoTitle) {
                            if ($(target).attr('id') == 'popupVideoCategory') {
                                $('.popupyouku .contents .tit').text('');
                                $('.popupyouku .contents .tit').text(videoTitle);
                            } else {
                                $('.popupyouku .header .tit').text('');
                                $('.popupyouku .header .tit').text(videoTitle);
                            }
                        }

                        // 제품 상세 비디오 팝업
                        if ($(target).find('.video-swiper').length) {
                            if (videoProductSwiper) {
                                videoProductSwiper.destroy();
                            }

                            videoProductSwiper = new Swiper('.popupyouku .video-swiper .swiper', {
                                slidesPerView: 3,
                                spaceBetween: 12,
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

                            const $videoSlide = $('.video-swiper').find('.swiper-slide'),
                                firstVideoId = $videoSlide.eq(0).find('.video-id').text(),
                                firstVideoTit = $videoSlide.eq(0).find('.tit').text();

                            $(target).find('.youku-con').html('');
                            $(target).find('.youku-con').append('<iframe src="https://player.youku.com/embed/' + firstVideoId + '" frameborder=0 "allowfullscreen"></iframe>');
                            $(target + ' .video-swiper').children('.tit').text(firstVideoTit);

                            $videoSlide.each(function() {
                                let videoId = $(this).find('.video-id').text(),
                                    videoTit = $(this).find('.tit').text();
                                $(this).find('figure').html('');
                                $(this).find('figure').append('<iframe src="https://player.youku.com/embed/' + videoId + '" frameborder=0 width="100%" height="100%"></iframe>');

                                $(this).on('click', function() {
                                    $('.popupyouku .video-swiper > .tit').text(videoTit);
                                    $(this).closest('.popupyouku').find('.youku-con').html('');
                                    $(this).closest('.popupyouku').find('.youku-con').append('<iframe src="https://player.youku.com/embed/' + videoId + '" frameborder=0 "allowfullscreen"></iframe>');
                                });
                            });
                        }
                    }

                    $popup.classList.add('active');
                    $popup.setAttribute('tabindex', '0');

                    popupOrder = document.querySelectorAll('[class*=popup][class*=active]').length;

                    if (document.querySelector(':focus')) {
                        document.querySelector(':focus').setAttribute('data-popupOrder', popupOrder);
                    }

                    $popup.focus();
                    $popupEnd.setAttribute('tabindex', '0');
                    $popupEnd.addEventListener('focus', () => {
                        $popup.focus();
                    });
                    break;

                case 'close':
                    popupOrder = document.querySelectorAll('[class*=popup][class*=active]').length;

                    $popup.classList.remove('active');
                    $popup.removeAttribute('tabindex');
                    $popupEnd.removeAttribute('tabindex');

                    if ($(target).hasClass('popupvideo')) {
                        $('.popupvideo .youtube-con').html('');
                    } else if ($(target).hasClass('popupvimeo')) {
                        $('.popupvimeo .vimeo-con').html('');
                    } else if ($(target).hasClass('popupyouku')) {
                        $('.popupyouku .youku-con').html('');
                    }

                    if (popupOrder == 1) {
                        fn.scroll('enabled', scrollt);
                    }

                    if (document.querySelector('[data-popupOrder="' + popupOrder + '"]')) {
                        document.querySelector('[data-popupOrder="' + popupOrder + '"]').focus();
                        document.querySelector('[data-popupOrder="' + popupOrder + '"]').removeAttribute('data-popupOrder');
                    }
                    break;
            }
        },

        toggleActive: function(target) {
            $(target).toggleClass('active');
        },

        addActive: function(target) {
            $(target).addClass('active');
        },

        removeActive: function(target) {
            $(target).removeClass('active');
        },

        // TOP
        top: function() {
            if ($('#contents').hasClass('home')) {
                mainSectionSwiper.slideTo(0);
            } else {
                $('html, body').animate({
                    'scrollTop': 0
                });
            }
        },

        //select
        select: function(obj, type) {
            var $obj = $(obj);
            $obj.each(function(i, select) {
                if (!$(this).find('div').hasClass('dropdown') || type == 'reset') {
                    if ($(this).find('select').is(':disabled')) {
                        $(this).addClass('disabled');
                    } else {
                        $(this).removeClass('disabled');
                    }

                    if (type == 'reset') {
                        $(this).find('.dropdown').remove();
                    }

                    $(this).append('<div class="dropdown" tabindex="0"><span class="current"></span><i class="icon icon-select"></i><div class="list"><div class="scrollbar"><div class="scroll-content"><ul></ul></div></div></div></div>');

                    var dropdown = $(this).find('.dropdown');
                    var options = $(this).find('select').find('option');
                    var selected = $(this).find('select').find('option:selected');
                    dropdown.find('.current').html(selected.html());

                    options.each(function(j, o) {
                        if ($(o).attr('class') == 'select-ti') {
                            dropdown.find('ul').append('<li class="option select-ti' + ($(o).is(':selected') ? ' selected' : '') + ($(o).is(':disabled') ? ' disabled' : '') + '" data-value="' + $(o).val() + '"><span>' + $(o).html() + '</span></li>');
                        } else {
                            dropdown.find('ul').append('<li class="option' + ($(o).is(':selected') ? ' selected' : '') + ($(o).is(':disabled') ? ' disabled' : '') + '" data-value="' + $(o).val() + '"><span>' + $(o).html() + '</span></li>');
                        }
                    });
                }
            });
        },

        //select init
        selectInit: function(obj) {
            var obj = $(obj);

            //Open/close
            $(document).on('click', '.dropdown', function(event) {
                if (!$(this).parents('.select-date').length) {
                    $('.dropdown').not($(this)).removeClass('open');
                    $(this).toggleClass('open');
                }

                if ($(this).hasClass('open')) {
                    $(this).find('.option').attr('tabindex', 0);
                    $(this).find('.selected').focus();
                } else {
                    $(this).find('.option').removeAttr('tabindex');
                    $(this).focus();
                }
            });
            //Close when clicking outside
            $(document).on('click', function(event) {
                if ($(event.target).closest('.dropdown').length === 0) {
                    $('.dropdown').removeClass('open');
                    $('.dropdown .option').removeAttr('tabindex');
                }
                event.stopPropagation();
            });
            //Option click
            $(document).on('click', '.dropdown .option', function(event) {
                if (!$(this).hasClass('disabled')) {
                    $(this).closest('.list').find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    var text = $(this).text();

                    if ($(this).hasClass('select-ti')) {
                        $(this).closest('.dropdown').removeClass('active');
                    } else {
                        $(this).closest('.dropdown').addClass('active');
                    }

                    $(this).closest('.dropdown').find('.current').html(text);

                    $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
                }
            });
            
            //Keyboard events
            $(document).on('keydown', '.dropdown', function(event) {
                var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
                //Space or Enter
                if (event.keyCode == 32 || event.keyCode == 13) {
                    if ($(this).hasClass('open')) {
                        focused_option.trigger('click');
                    } else {
                        $(this).trigger('click');
                    }
                    return false;
                    //Down
                } else if (event.keyCode == 40) {
                    if (!$(this).hasClass('open')) {
                        $(this).trigger('click');
                    } else {
                        focused_option.next().focus();
                        focused_option.removeClass('selected');
                        focused_option.next().addClass('selected');
                    }
                    return false;
                    //Up
                } else if (event.keyCode == 38) {
                    if (!$(this).hasClass('open')) {
                        $(this).trigger('click');
                    } else {
                        var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
                        focused_option.prev().focus();
                        focused_option.removeClass('selected');
                        focused_option.prev().addClass('selected');
                    }
                    return false;
                    //Esc
                } else if (event.keyCode == 27) {
                    if ($(this).hasClass('open')) {
                        $(this).trigger('click');
                    }
                    return false;
                }
            });
        },

        //select active init
        selectActiveInit: function(obj) {
            var obj = $(obj);

            obj.each(function() {
                if ($(this).find('option:selected').attr('class') == 'select-ti') {
                    $(this).removeClass('active');
                    $(this).siblings('.dropdown').removeClass('active');
                } else {
                    $(this).addClass('active');
                    $(this).siblings('.dropdown').addClass('active');
                }
            });
        },

        //accordion
        accordion: function() {
            $('.list-accordion li').each(function() {
                if ($(this).hasClass('active')) {
                    $(this).find('.accordion-cont').show(0);
                }
            });

            $(document).on('click', '.list-accordion .accordion-ti', function(e) {
                var $this = $(this);
                if (!$this.hasClass('nonactive')) {
                    if ($this.closest('li').hasClass('active')) {
                        $this.closest('li').removeClass('active');
                        $this.closest('li').find('.accordion-cont').first().slideUp();
                    } else {
                        $this.closest('li').addClass('active');
                        $this.closest('li').find('.accordion-cont').first().slideDown();
                    }
                }

                e.stopPropagation();
            });
        },

        // fileUpload
        fileUpload: function() {
            $(document).on('change', '.form-btn.form-fileupload input[type="file"]', function() {
                var $input = $(this),
                    $form = $input.closest('.form-btn.form-fileupload'),
                    reader = new FileReader(),
                    fileMaxSize = Number($form.data('maxsize')),
                    fileMaxSizeMsg = $form.data('maxsizemsg'),
                    fileFormatMsg = $form.data('formatmsg'),
                    fileCurrentSize = 0,
                    filelen = $form.find('div').find('input[type="file"]').length,
                    fileFormat = $form.data('format'),
                    fileCurrentFormat = fileFormat.toLowerCase().replace(/\, /g, "|");

                if ($input[0].files.length) {
                    fileCurrentSize = $input[0].files[0].size;

                    if (fileCurrentSize > fileMaxSize * 1024 * 1024) {
                        alert(fileMaxSizeMsg);
                        $form.find('.inp-upfilename').val('');
                        $form.find('input[type="file"]').val('');
                        return;
                    } else {
                        reader.onload = function() {
                            var fileIdx = Number($input.attr('data-value')) || $input.closest('div').find('input[type="file"]').length - 1,
                                filename = $input[0].files[0].name,
                                filefullname = filename,
                                filelastname = filename.toLowerCase().substring(filefullname.lastIndexOf('.') + 1, filefullname.length),
                                fileSize = $input[0].files[0].size,
                                fileformat = fileCurrentFormat;

                            if (fileformat.indexOf(filelastname) > -1) { //format
                                if (!$input.attr('[data-value]')) {
                                    $input.attr({
                                        'data-value': fileIdx,
                                        'data-size': fileSize
                                    });
                                }

                                $form.find('.inp-upfilename').val(filefullname);

                                filelen = $form.find('div').find('input[type="file"]').length;

                            } else {
                                alert(fileFormatMsg);
                                $form.find('.inp-upfilename').val('');
                                $form.find('input[type="file"]').val('');
                                return;
                            }
                        }
                    }

                    reader.readAsDataURL($input[0].files[0]);
                }
            });
        },

        //all check
        inputAllCheck: function() {
            // 전체 동의하기 & 마케팅
            $(document).on('change', '[type="checkbox"][data-check-all]', function() {
                if ($(this).is(':checked')) {
                    $('[type="checkbox"][data-check-name="agree"]').prop('checked', true);
                    $('[type="checkbox"][data-check-name="marketing"]').prop('checked', true);
                    $(this).closest('.list-accordion').find('li').addClass('active');
                    $(this).closest('.list-accordion').find('.accordion-cont').slideDown();
                } else {
                    $('[type="checkbox"][data-check-name="agree"]').prop('checked', false);
                    $('[type="checkbox"][data-check-name="marketing"]').prop('checked', false);
                    $(this).closest('.list-accordion').find('li').removeClass('active');
                    $(this).closest('.list-accordion').find('.accordion-cont').slideUp();
                }
            }).on('change', '[type="checkbox"][data-check-name="agree"]', function() {
                if ($(this).get(0).hasAttribute('data-marketing-all')) {
                    if ($(this).is(':checked')) {
                        $('[type="checkbox"][data-check-name="marketing"]').prop('checked', true);
                    } else {
                        $('[type="checkbox"][data-check-name="marketing"]').prop('checked', false);
                    }
                }

                let
                    checkLen = $('[type="checkbox"][data-check-name="agree"]:not([data-check-all])').length + $('[type="checkbox"][data-check-name="marketing"]').length,
                    checkedLen = $('[type="checkbox"][data-check-name="agree"]:not([data-check-all]):checked').length + $('[type="checkbox"][data-check-name="marketing"]:checked').length;

                if (checkLen === checkedLen) {
                    $('[type="checkbox"][data-check-all][data-check-name="agree"]').prop('checked', true);
                } else {
                    $('[type="checkbox"][data-check-all][data-check-name="agree"]').prop('checked', false);
                }
            }).on('change', '[type="checkbox"][data-check-name="marketing"]', function() {
                // 마케팅 선택
                let
                    checkLen = $('[type="checkbox"][data-check-name="marketing"]').length,
                    checkedLen = $('[type="checkbox"][data-check-name="marketing"]:checked').length;

                if (checkedLen > 0) {
                    $('[type="checkbox"][data-marketing-all][data-check-name="agree"]').prop('checked', true);

                    let
                        checkLen2 = $('[type="checkbox"][data-check-name="agree"]:not([data-check-all])').length,
                        checkedLen2 = $('[type="checkbox"][data-check-name="agree"]:not([data-check-all]):checked').length;

                    if (checkLen2 === checkedLen2 && checkLen === checkedLen) {
                        $('[type="checkbox"][data-check-all][data-check-name="agree"]').prop('checked', true);
                    } else {
                        $('[type="checkbox"][data-check-all][data-check-name="agree"]').prop('checked', false);
                    }
                } else {
                    $('[type="checkbox"][data-marketing-all][data-check-name="agree"]').prop('checked', false);
                    $('[type="checkbox"][data-check-all][data-check-name="agree"]').prop('checked', false);
                }
            });
        },

        // tab
        tabMenu: function(e, obj) {
            let
                $tabMenu = $(obj),
                $tabContents,
                objHref = obj.attributes.href.value,
                isSlide = $tabMenu.parent().hasClass('swiper-slide') ? true : false;

            if (objHref.indexOf('#') != -1 || objHref == 'javascript:;') {
                if (isSlide) {
                    $tabMenu.closest('.swiper-wrapper').find('a').removeClass('active');
                    $tabMenu.addClass('active');
                } else {
                    $tabMenu.siblings().removeClass('active');
                    $tabMenu.addClass('active');
                }

                if (objHref != '#' && objHref != 'javascript:;') {
                    e.preventDefault();

                    $tabContents = $(objHref);
                    $tabContents.siblings('.tab-contents').removeClass('active');
                    $tabContents.addClass('active');
                }
            }
        },

        // tab swiper
        tabsSwiper: function() {
            $('.tabs.slide .swiper').each(function() {
                let tabsSwiper = new Swiper($(this)[0], {
                    slidesPerView: 'auto',
                    watchOverflow: true,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                });
            });
        },

        // tag
        tagActive: function(obj) {
            let
                $tag = $(obj),
                $tagWrap = $tag.closest('.tag');

            $tagWrap.find('button').removeClass('active');
            $tag.addClass('active');
        },

        // spec table active
        specTableActive: function(obj) {
            const
                $obj = $(obj),
                $specStandard = $obj.find('.fixed-con .package .group:visible span'),
                $specValue = $obj.find('.scroll-con .package .group:visible span');

            $specStandard.on('mouseenter', function() {
                let
                    $target = $(this),
                    specIdx = $target.index(),
                    packageIdx = $target.closest('.package').index();

                $specStandard.removeClass('active');
                $specValue.removeClass('active');

                $target.addClass('active');

                $specValue.closest('.product').each(function() {
                    $(this).find('.package').each(function(i) {
                        if (packageIdx == i + 1) {
                            $(this).find('.group:visible span').each(function(j) {
                                if (specIdx == j) {
                                    $(this).addClass('active');
                                }
                            });
                        }
                    });
                });
            }).on('mouseleave', function() {
                $specStandard.removeClass('active');
                $specValue.removeClass('active');
            });

            $specValue.on('mouseenter', function() {
                let
                    $target = $(this),
                    specIdx = $target.index(),
                    packageIdx = $target.closest('.package').index();

                $specStandard.removeClass('active');
                $specValue.removeClass('active');

                $target.addClass('active');

                $specStandard.closest('.fixed-con').each(function() {
                    $(this).find('.package').each(function(i) {
                        if (packageIdx == i + 1) {
                            $(this).find('.group:visible span').each(function(j) {
                                if (specIdx == j) {
                                    $(this).addClass('active');
                                }
                            });
                        }
                    });
                });

                $specValue.closest('.product').each(function() {
                    $(this).find('.package').each(function(i) {
                        if (packageIdx == i + 1) {
                            $(this).find('.group:visible span').each(function(j) {
                                if (specIdx == j) {
                                    $(this).addClass('active');
                                }
                            });
                        }
                    });
                });
            }).on('mouseleave', function() {
                $specStandard.removeClass('active');
                $specValue.removeClass('active');
            });

            if (popupSpecTableScrollSwiper) {
                popupSpecTableScrollSwiper.update();
            }
        },

        // spec table swiper
        specTableSwiper: function(obj) {
            let
                $obj = $(obj);
            if (!$obj.length) return;
            let
                $scrollSwiper = $obj.find('.scroll-swiper .swiper');
            if (!$scrollSwiper.length || !$scrollSwiper[0]) return;
                $scrollSwiperBtnPrev = $obj.find('.scroll-swiper .swiper-button-prev'),
                $scrollSwiperBtnNext = $obj.find('.scroll-swiper .swiper-button-next'),
                $scrollSwiperBar = $scrollSwiper.find('.swiper-scrollbar'),
                isPopupCompare = $obj.parent().hasClass('spec-area') ? false : true;

            if (isPopupCompare) {
                // 사양 비교하기 팝업
                if (productcheckSwiper) {
                    productcheckSwiper.destroy();
                }

                $('.popupcompare .productcheck-swiper').addClass('active');
                productcheckSwiper = new Swiper('.popupcompare .productcheck-swiper .swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    mousewheel: true,
                    on: {
                        lock: function() {
                            $('.popupcompare .productcheck-swiper').removeClass('active');
                        },
                    }
                });

                if (popupSpecTableScrollSwiper) {
                    popupSpecTableScrollSwiper.destroy();
                }

                $obj.addClass('active');
                popupSpecTableScrollSwiper = new Swiper($scrollSwiper[0], {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 'auto',
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    scrollbar: {
                        el: $scrollSwiperBar[0],
                    },
                    // resistance : true,
                    // resistanceRatio : 0.5,
                    mousewheel: {
                        releaseOnEdges: true,
                    },
                    navigation: {
                        nextEl: $scrollSwiperBtnNext[0],
                        prevEl: $scrollSwiperBtnPrev[0],
                    },
                    on: {
                        lock: function() {
                            $obj.removeClass('active');
                        },
                    }
                });
            } else {
                // 제품상세 > 제품 시방
                if (specTableScrollSwiper) {
                    specTableScrollSwiper.destroy();
                }

                specTableScrollSwiper = new Swiper($scrollSwiper[0], {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 'auto',
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    scrollbar: {
                        el: $scrollSwiperBar[0],
                    },
                    // resistance : true,
                    // resistanceRatio : 0.5,
                    mousewheel: {
                        releaseOnEdges: true,
                    },
                    navigation: {
                        nextEl: $scrollSwiperBtnNext[0],
                        prevEl: $scrollSwiperBtnPrev[0],
                    },
                    on: {
                        init: function() {},
                    }
                });
            }
        },

        // textarea
        wordLimit: function(limit, obj) {
            const
                $obj = $(obj),
                wordLength = $obj.val().length,
                limitNumber = limit,
                $currentNumber = $(obj).next().find('span');

            $(obj).attr('maxlength', limitNumber);

            if (wordLength <= limitNumber) {
                $currentNumber.text(wordLength.toLocaleString());
            }
        },

    }
})();

//setCookie
function uiSetCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

//getCookie
function uiGetCookie(name) {
    var
        from_idx = document.cookie.indexOf(name + '='),
        to_idx;
    if (from_idx != -1) {
        from_idx += name.length + 1
        to_idx = document.cookie.indexOf(';', from_idx)

        if (to_idx == -1) {
            to_idx = document.cookie.length
        }
        return unescape(document.cookie.substring(from_idx, to_idx))
    }
}

//setCookie popup
function uiCookiePopupClose(obj, cookieidx, inputName) {
    if (inputName == 'popupcookieTodayClose') {
        // 글로벌 영문 쿠키사용동의 팝업
        uiSetCookie(cookieidx, 'no', 1);
    } else {
        if ($(".popupmain input:checkbox[name=" + inputName + "]").is(":checked") == true) {
            uiSetCookie(cookieidx, 'no', 1);
        }

        if ($(".popupfoot input:checkbox[name=" + inputName + "]").is(":checked") == true) {
            uiSetCookie(cookieidx, 'no', 1);
        }
    }

    fn.popup('close', obj);
}

// 스크롤 상하이동 감지
let incScroll;
let incScrollTop = 0;
let incDelta = 5;
function incScrolled() {
    let head = document.querySelector('#header');
    
    if (head) {
        if (!document.body.classList.contains('fixed')) {
            let st = document.scrollingElement.scrollTop;
            
            // incDelta 값보다 클 경우
            if (Math.abs(incScrollTop - st) <= incDelta)
                return;
            
            if (st === 0) {
                head.classList.remove('fixed', 'up');
            }

            // 스크롤 움직임에 따라 클래스 추가/삭제
            if (st > incScrollTop && st > incDelta) {
                // 스크롤 아래로 이동시
                head.classList.remove('up');
                head.classList.add('fixed', 'down');
            } else {
                // 스크롤 위로 이동시
                if (st + window.innerHeight < document.body.clientHeight) {
                    if (st >= head.offsetHeight) {
                        head.classList.remove('down');
                        head.classList.add('up');
                    }
                }
            }
            incScrollTop = st;
        }
    }
}