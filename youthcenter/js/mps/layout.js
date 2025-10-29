/*-------------------------------------------------
layout Javascript / park myeong-hee
-------------------------------------------------*/
$(function() {
    let ac = "active";

    //전체 메뉴 관련
    $('#header .btn-navi.all').on('click', function() {
        $('#allmenu-layer').addClass('active');
        $('html').addClass('no-scroll');
    });
    $('#allmenu-layer .allmenu-close').on('click', function() {
        $('#allmenu-layer').removeClass('active');
        $('html').removeClass('no-scroll');
    });
    $('.all-nav > li > a').on('click', function(e) {
        $('.all-nav > li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    //스크롤 올릴때 header 고정
    var lastScroll = 0;
    $(window).on("scroll",function(event){
        const st = $(this).scrollTop();
        const stop_point = $("#body").offset().top ;

        if (st > lastScroll){
            //스크롤 내릴때
            $("#wrap").removeClass("scroll-up");
            $("#wrap").addClass("scroll-down");
        }
        else {
            //스크롤 올릴때
            if(st < stop_point){
                $("#wrap").removeClass("scroll-up");
                $("#wrap").addClass("scroll-down");
            }else{
                $("#wrap").addClass("scroll-up");
                $("#wrap").removeClass("scroll-down");
            }
        }
        lastScroll = st;
    });

    //상단 util 화면 크기, 언어 선택
    $(".header-util > li > a, .header-util > li > button").each(function(){
        const t = $(this);
        if(t.next().length){
            t.addClass("plus").attr("title","펼치기");
        }
    });

    //Util 영역 하위 메뉴
    $(".header-util > li > a, .header-util > li > button, .gnb-util > li > button").on("click",function(){
        const t = $(this);
        if(t.next().length){
            if(t.closest("li").hasClass(ac)){
                t.attr("title","펼치기").closest("li").removeClass(ac);
            }else{
                $(".header-util > li, .gnb-util > li").each(function(){
                    if($(this).find(".drop-list").length){
                        $(this).removeClass(ac).find("> a, > button").attr("title","펼치기");
                    }else{
                        $(this).removeClass(ac);
                    }
                });
                t.attr("title","접기").closest("li").addClass(ac);
            }
            return false;
        }
    });

    // 화면 확대
    $(".zoom-drop .item-link").on("click", function() {
        $(this).attr("title", "선택된 상태").closest("li").addClass("active").siblings().removeClass("active").find(">a, >button").removeAttr("title");
    });

    $(".zoom-drop .reset-btn").on("keydown", function(e) {
        $(this).parents(".zoom-drop").closest("li").removeClass("active").find(">button").attr("title", "펼치기");
    });

    $("#header .zoom-drop").on("click", ".drop-list button, .reset-btn", function () {
        var zomm = 1;

        if ($(this).hasClass("xsm")) {
            zomm = 0.9;
        } else if ($(this).hasClass("sm")) {
            zomm = 1;
        } else if ($(this).hasClass("md")) {
            zomm = 1.1;
        } else if ($(this).hasClass("lg")) {
            zomm = 1.2;
        } else if ($(this).hasClass("xlg")) {
            zomm = 1.3;
        } else if ($(this).hasClass("reset-btn")) {
            localStorage.removeItem("gfnDefaultScale");
            zomm = 1;

            $("body").css({
                'zoom': zomm
            });
            // 버튼과 리스트 항목을 초기 상태로 설정
            $(".zoom-drop .drop-list").find("li").removeClass("active");
            $(".zoom-drop .drop-list").find("li:eq(1)").addClass("active").find("button").attr("title", "선택된 상태");
            return;
        }

        // zoom 값 저장
        localStorage.setItem("gfnDefaultScale", zomm);

        // body zoom 적용 및 가운데 정렬
        $("body").css({
            'zoom': zomm
        });
    });

    var savedZoom = localStorage.getItem("gfnDefaultScale");
    if (savedZoom) {
        // 저장된 zoom 값이 있으면 적용
        $("body").css({
            'zoom': savedZoom
        });

        // 해당 zoom 값에 맞는 리스트 항목 활성화
        $(".zoom-drop .drop-list > li").removeClass("active");
        $(".zoom-drop .drop-list > li").each(function() {
            var zoom = $(this).find("button").attr("class");
            if (zoom && savedZoom == getZoomValueFromClass(zoom)) {
                $(this).addClass("active").find("button").attr("title", "선택된 상태");
            }
        });
    }

    // zoom 값에 대응하는 버튼 클래스와 값을 매핑하는 함수
    function getZoomValueFromClass(zoomClass) {
        if (zoomClass.includes("xsm")) return 0.9;
        if (zoomClass.includes("sm")) return 1;
        if (zoomClass.includes("md")) return 1.1;
        if (zoomClass.includes("xlg")) return 1.3;
        if (zoomClass.includes("lg")) return 1.2;
        return 1;
    }

    //해당 영역 이외 클릭 시
    $("html").on("click",function(e){
        if(!$(e.target).parents().hasClass("header-util")){
            $(".header-util > li").removeClass(ac);
        }
    });

    //통합검색
    $(".header-etc .sch").on("click",function(){
        $('html, #total-search').addClass(ac);
    });
    $(".top-search .modal-close").on("click",function(){
        $('html, #total-search').removeClass(ac);
    });

    $(".top-search .btn-autofill").on("click", function(){
        $('.suggest-layers').toggle();
        $('.search-input').toggleClass('type-write');
        $('.top-search .btn-autofill').toggleClass('active');
    });

    // 위로가기
    $(".btn-top").on('click', function() {
        $('html, body').animate({scrollTop: $(this.hash).offset().top}, 300, function(){});
        return false;
    });

    console.log("layout!")
    //챗봇
    // const $chatbotDesc = $('#chatbot-area .desc');
    // const $chatbotOpen = $('#chatbot-area .chatbot-open');

    // const $chatbotClose = $('.chatbot-close');
    // const CHATBOT_STATE_KEY = 'puClosed';

    // const isChatbotClosed = localStorage.getItem(CHATBOT_STATE_KEY);

    // if (isChatbotClosed === 'true') {
    //     $chatbotDesc.hide();
    //     $chatbotOpen.show();
    //     $('#footer .btn-top').addClass(ac);
    // } else {
    //     $chatbotDesc.show();
    //     $chatbotOpen.hide();
    //     $('#footer .btn-top').removeClass(ac);
    // }


    // // .chatbot-open 클릭 시
    // $chatbotOpen.on('click', function() {
    //     $chatbotDesc.fadeIn();
    //     $chatbotOpen.hide();
    //     $('#footer .btn-top').removeClass(ac);
    //     localStorage.setItem(CHATBOT_STATE_KEY, 'false');
    // });

    // $chatbotClose.on('click', function() {
    //     $chatbotDesc.hide();
    //     $chatbotOpen.fadeIn();
    //     localStorage.setItem(CHATBOT_STATE_KEY, 'true'); // 챗봇 닫힘 상태 저장
    // });


    // // 창 크기 변경 시
    // $(window).resize(function() {
    //     if ($(window).width() < 985) {
    //         $chatbotClose.off('click').on('click', function() {
    //             $chatbotDesc.hide();
    //             $chatbotOpen.fadeIn();
    //             $('#footer .btn-top').addClass(ac);
    //             localStorage.setItem(CHATBOT_STATE_KEY, 'true');
    //             return false;
    //         });
    //     } else {
    //         $chatbotOpen.hide();
    //         $chatbotDesc.show();
    //         $('#footer .btn-top').removeClass(ac);
    //     }
    // });

    const CHATBOT_STATE_KEY = 'puClosed';
    const $sideTolCon = $('.side-tools-con');
    const $sideTolClose = $('.side-tools-close');
    const $sideTolOpen = $('.side-tools-open');

    function setClosedState(closed) {
        if (closed) {
            $sideTolOpen.fadeIn();
            $sideTolCon.hide();
            $sideTolClose.hide();
            $('#side-tools .btn-top').addClass(ac);
            localStorage.setItem(CHATBOT_STATE_KEY, 'true');
        } else {
            $sideTolCon.fadeIn();
            $sideTolClose.fadeIn();
            $sideTolOpen.hide();
            $('#side-tools .btn-top').removeClass(ac);
            localStorage.setItem(CHATBOT_STATE_KEY, 'false');
        }
    }

    // 초기 상태
    function initChatbotState() {
        if ($(window).width() < 1480) {
            // 모바일은 무조건 닫힘
            setClosedState(true);
        } else {
            // PC는 localStorage 상태 반영
            const isClosed = localStorage.getItem(CHATBOT_STATE_KEY) === 'true';
            setClosedState(isClosed);
        }
    }
    // 초기화 실행
    initChatbotState();
    // 닫기 버튼
    $sideTolClose.on('click', function() {
        setClosedState(true);
    });

    // 열기 버튼
    $sideTolOpen.on('click', function() {
        setClosedState(false);
    });

    // 창 크기 변경 시
    $(window).resize(function() {
        if ($(window).width() < 1480) {
            setClosedState(true);
        } else {
            setClosedState(false);
        }
    });

    // footer swiper
    var footQuick = new Swiper(".foot-quick-swiper", {
        slidesPerView: '1',
        slidesPerGroup: 1,
        spaceBetween: 0,
        keyboard: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction : false,
        },
        navigation: {
            nextEl: ".foot-quick .btn-next",
            prevEl: ".foot-quick .btn-prev",
        },
        effect: "slide",
        breakpoints: {
            431: { slidesPerView: 2, spaceBetween: 0 },
            601: { slidesPerView: 3, spaceBetween: 0 },
            881: { slidesPerView: 5, spaceBetween: 0 },
            1201: { slidesPerView: 6, spaceBetween: 0 },
        },
    });
    // 자동재생 토글
    $('.foot-quick-autoplay').on('click', function () {
        if (!$(this).hasClass("stop")) {
            footQuick.autoplay.stop();
            $(this).addClass("stop");
        } else {
            footQuick.autoplay.start();
            $(this).removeClass("stop");
        }

        return false;
    });
});

