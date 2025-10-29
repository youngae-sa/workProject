$(function () {
    //------------------------------------------------------------

    // 배너 슬라이드
    const mainBanner = new Swiper(".main-banner-swiper", {
        slidesPerView: 1,
        loop: true,
        // autoplay: {
        //     delay: 10000,
        //     disableOnInteraction : false,
        // },
        pagination: {
            el: '.main-banner-wrap .fraction',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.btn-next',
            prevEl: '.btn-prev'
        },

    });
    $('.btn-autoplay').on('click', function () {
        if (!$(this).hasClass("stop")) {
            mainBanner.autoplay.stop();
            $(this).addClass("stop");
        } else {
            mainBanner.autoplay.start();
            $(this).removeClass("stop");
        }

        return false;
    });
    var youthEssentials = new Swiper(".youth-essentials .swiper-area", {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 10,
        keyboard: true,
        navigation: {
            nextEl: ".youth-essentials .swiper-button-next",
            prevEl: ".youth-essentials .swiper-button-prev",
        },
        effect: "slide",
        breakpoints: {
            601: { slidesPerView: 2, spaceBetween: 10 },
            881: { slidesPerView: 2, spaceBetween: 20 },
            1201: { slidesPerView: 2, spaceBetween: 30 },
        },
    });

})
