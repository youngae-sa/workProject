/*-------------------------------------------------
main Javascript
-------------------------------------------------*/
$(function () {
    const layerPop = document.querySelector('.layerPop');
    if (layerPop && layerPop.offsetHeight > 0 && layerPop.offsetWidth > 0) {
        document.documentElement.classList.add('no-scroll');
    }

    $('.easyfind-search input').on('click', function () {
        $(".easyfind-search").addClass('active');
    });

    // 로그인 버튼 클릭시
    $('.before-login .btn-login').on('click', function () {
        $(this).parent().addClass('display-none');
        $('.after-login').addClass('display-block');
    });
    $('.after-login .item-layer .btn-close').on('click', function () {
        $(this).parent().parent().removeClass('active');
    });

    // 마이꾸러미란?
    $('.after-login .btn-package').on('click', function () {
        $(this).parent().addClass('active');
    });
    $('.after-login .item-layer .btn-close').on('click', function () {
        $(this).parent().parent().removeClass('active');
    });

    // 분야별 인기정책 tab
    $(".field-section .tab-list a").click(function () {
        $(".field-section .tab-list a").removeClass("active").attr("title", "");
        $(this).addClass("active").attr("title", "선택된 메뉴");
        $(".field-section .tab-cont").hide();
        var activeDetail = $(this).attr("href");
        $(activeDetail).fadeIn();
        return false;
    });

    // 인기정책 sns 공유하기
    $('.best-list .btn-share').on('click', function () {
        $(this).parent().addClass('active');
    });
    $('.item-share .btn-close').on('click', function () {
        $(this).closest('.right-object').removeClass('active');
    });


    // SNS 순서 변경
    function reorderList() {
        var windowWidth = $(window).width();

        if (windowWidth <= 1024) {
            // 순서를 재배치할 새로운 배열
            var newOrder = [
                $('.sns-content .youtube').eq(0),
                $('.sns-content .youtube').eq(1),
                $('.sns-content .blog').eq(0),
                $('.sns-content .blog').eq(1)
            ];

            // ul 요소를 비우고 새로운 순서대로 추가
            $('.sns-content').empty().append(newOrder);
        } else {
            // 기본 순서로 되돌림
            var originalOrder = [
                $('.sns-content .youtube').eq(0),
                $('.sns-content .blog').eq(0),
                $('.sns-content .youtube').eq(1),
                $('.sns-content .blog').eq(1)
            ];

            $('.sns-content').empty().append(originalOrder);
        }
    }
    // sns - 페이지 로드 시 및 창 크기 조정 시 순서 변경
    reorderList();
    $(window).resize(function () {
        reorderList();
    });
});