jQuery(document).ready(function ($) {
    var data = [
        { image: "https://i.imgur.com/XqQPqTT.jpeg", link: "https://s.shopee.vn/608OEST1rS" },
        { image: "https://i.imgur.com/rPIanMU.jpeg", link: "https://s.shopee.vn/8UpjD4IlRE" },
        { image: "https://i.imgur.com/OLwQcJ3.jpeg", link: "https://s.shopee.vn/5fVXprtoM2" },
        { image: "https://i.imgur.com/8jJ5uH5.jpeg", link: "https://s.shopee.vn/8UpjlNiONs" }
    ];

    var popupVisible = false;

    function showPopup() {
        var randomIndex = Math.floor(Math.random() * data.length);
        var selectedItem = data[randomIndex];

        $('.banner img').attr('src', selectedItem.image);
        $('.banner').attr('href', selectedItem.link);

        $('#popup-ads').css('display', 'flex');
        $('body').css('overflow', 'hidden');
        popupVisible = true;
    }

    function hidePopup() {
        $('#popup-ads').hide();
        $('body').css('overflow', '');
        popupVisible = false;
    }

    function setPopupCookie() {
        var now = new Date();
        var expiresTime = new Date(now.getTime() + 15 * 60 * 1000); // 15 phút
        Cookies.set('popup_timer', '1', { expires: expiresTime });
    }

    function checkPopupCookie() {
        return Cookies.get('popup_timer') === undefined;
    }

    if (checkPopupCookie()) {
        showPopup();
        setPopupCookie();
    }

    $('.btn-close').on('click', function (e) {
        e.preventDefault();
        hidePopup();
        setPopupCookie();
    });

    $(document).on("mouseup", function(e) {
        var containerModal = $(".container-popup");
        if (popupVisible && !containerModal.is(e.target) && containerModal.has(e.target).length === 0) {
            window.open($('.banner').attr('href'), '_blank');
            hidePopup();
            setPopupCookie();
        }
    });
});
