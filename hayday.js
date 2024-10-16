document.addEventListener("DOMContentLoaded", function() {
    // Tạo phần tử div cho quảng cáo
    const adWrapper = document.createElement('div');
    adWrapper.id = 'sp-wrapper-hovering-format';
    adWrapper.style.cssText = 'position: fixed !important; top: 25% !important; right: 20px !important; z-index: 999 !important;';

    // Nội dung HTML bên trong div
    adWrapper.innerHTML = `
        <div id="sp-wrapper-hovering" style="width: 85px; height: 85px;">
            <a id="sp-hovering-link" href="#" target="_blank" rel="noopener noreferrer nofollow" 
               style="cursor: pointer !important; user-select: none !important; line-height: 35px !important; height: 24px !important; width: 24px !important; display: flex !important; align-items: center !important; justify-content: center !important; position: absolute !important; box-sizing: border-box !important; background: rgb(230, 230, 230) !important; top: 0px !important; right: 0px !important; border-radius: 20px !important; border: 0.3px solid rgb(0, 0, 0) !important; z-index: 999 !important;" onclick="event.stopPropagation(); closeAd(); return false;">
                <svg viewBox="0 0 16 16" stroke="#EE4D2D" style="height: 10px; width: 10px; stroke: rgba(0, 0, 0, 0.5); stroke-width: 2px;">
                    <path stroke-linecap="round" d="M1.1,1.1L15.2,15.2"></path>
                    <path stroke-linecap="round" d="M15,1L0.9,15.1"></path>
                </svg>
            </a>
            <div id="sp-wrapper-hovering-img" style="width: 100%; border-radius: 0%; overflow: hidden; height: 100%;">
                <a id="sp-hovering-img-link" target="_blank" rel="noopener noreferrer nofollow" href="#" style="width: 100%; height: 100%;">
                    <div id="sp-hovering-img-bg" style="width: 100%; height: 100%; background-size: contain; background-repeat: no-repeat; background-position: 0% 0%;"></div>
                </a>
            </div>
        </div>
    `;

    // Thêm div vào body của trang
    document.body.appendChild(adWrapper);

    // Các quảng cáo
    const ads = [
        {
            link: "https://s.shopee.vn/8pSX14WLI3",
            img: "https://server.zmedia.vn/static/cdn/cuoi_thang_sale_50.png"
        },
        {
            link: "https://s.shopee.vn/8KWGQ9YFIy",
            img: "https://server.zmedia.vn/static/cdn/sale%20off%2050.png"
        },
        {
            link: "https://s.shopee.vn/8UpjlNiONs",
            img: "https://i45.servimg.com/u/f45/19/58/16/37/banner12.png"
        }
    ];

    // Chọn quảng cáo ngẫu nhiên
    const randomAd = ads[Math.floor(Math.random() * ads.length)];

    // Cập nhật link và hình ảnh quảng cáo
    document.getElementById("sp-hovering-link").href = randomAd.link;
    document.getElementById("sp-hovering-img-link").href = randomAd.link;
    document.getElementById("sp-hovering-img-bg").style.backgroundImage = `url('${randomAd.img}')`;

    // Hàm đóng quảng cáo
    function closeAd() {
        document.getElementById("sp-wrapper-hovering-format").style.display = "none";
    }
});
