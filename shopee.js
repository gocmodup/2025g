
// Create a function to initialize the popup ads
function initializePopupAds() {
    // Inject CSS into the document
    const style = document.createElement('style');
    style.textContent = `
        #popup-ads {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            z-index: 999999;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #00000080;
        }
        .container-popup {
            max-width: 80%;
            max-height: 80%;
            position: relative;
        }
        .btn-close svg {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }
        .banner img {
            width: 300px;
            height: 250px;
            object-fit: cover;
        }
    `;
    document.head.appendChild(style);

    // Inject HTML into the document
    const popupHTML = `
        <div id="popup-ads">
            <div class="container-popup">
                <div class="btn-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                <a class="banner" target="_blank" href="#">
                    <img src="" alt="Advertisement">
                </a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Load external scripts
    const scriptJQuery = document.createElement('script');
    scriptJQuery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    scriptJQuery.async = true;
    document.head.appendChild(scriptJQuery);

    const scriptCookies = document.createElement('script');
    scriptCookies.src = "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js";
    scriptCookies.async = true;
    document.head.appendChild(scriptCookies);

    // Initialize the popup once jQuery and Cookies are loaded
    scriptCookies.onload = function() {
        jQuery(document).ready(function ($) {
            var data = [
                { image: "https://i45.servimg.com/u/f45/19/58/16/37/captur10.jpg", link: "https://s.shopee.vn/4VJVP8vFze" },
                { image: "https://i45.servimg.com/u/f45/19/58/16/37/khach-10.jpg", link: "https://s.shopee.vn/8KWGQ9YFIy" },
                { image: "https://i45.servimg.com/u/f45/19/58/16/37/shopee10.jpg", link: "https://s.shopee.vn/8pSX14WLI3" }
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
                Cookies.set('popup_timer', '1', { expires: 1 });
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
    };
}

// Call the function to initialize the popup ads
initializePopupAds();
