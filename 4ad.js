// File: ads.js
(function() {
    const banners = [
        {
            id: "shopee1",
            src: "https://down-cvs-vn.img.susercontent.com/vn-11134207-7r98o-lua61kdx7m6pd9.webp",
            href: "https://s.shopee.vn/5VCFJCNGxF",
            expireDate: "2025-04-01" 
        },
        {
            id: "great1",
            src: "https://i.servimg.com/u/f45/19/58/16/37/6d04cf10.png",
            href: "https://so-gr3at3.com/go/1497333"
        },
        {
            id: "shopee2",
            src: "https://i.upanh.org/2024/08/26/1001099487d60cff77c02e0ae6-1ce41f1d5ca1982ff.jpeg",
            href: "https://s.shopee.vn/6fNzXWEgsZ",
            expireDate: "2025-03-30"
        },
        {
            id: "shopee3",
            src: "https://i.upanh.org/2024/08/26/10010994884eb3bd45e623d9bb-1ec26da0ab694303b.jpeg",
            href: "https://s.shopee.vn/1qIjmayhWL"
        }
    ];

    // Biến static để theo dõi banner đã sử dụng
    let usedBannerIndexes = [];

    function getValidBanners() {
        const today = new Date();
        return banners.filter(banner => {
            if (!banner.expireDate) return true;
            const expireDate = new Date(banner.expireDate);
            return expireDate > today;
        });
    }

    function getRandomBanner(validBanners) {
        // Reset nếu đã sử dụng hết banner
        if (usedBannerIndexes.length >= validBanners.length) {
            usedBannerIndexes = [];
        }

        // Lấy các banner chưa sử dụng
        const availableIndexes = validBanners
            .map((_, index) => index)
            .filter(index => !usedBannerIndexes.includes(index));

        // Chọn ngẫu nhiên một banner từ các banner còn lại
        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        usedBannerIndexes.push(randomIndex);

        return validBanners[randomIndex];
    }

    // Xác suất hiển thị banner (80%)
    function shouldShowBanner() {
        return Math.random() < 0.8; // 80% chance
    }

    // Lấy banner hợp lệ
    const validBanners = getValidBanners();
    
    // Kiểm tra xem có hiển thị banner không và có banner hợp lệ không
    if (shouldShowBanner() && validBanners.length > 0) {
        const banner = getRandomBanner(validBanners);
        
        // Lấy thẻ script hiện tại
        const currentScript = document.currentScript;
        
        // Tạo element mới
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = `
            <a href="${banner.href}" 
               target="_blank" 
               rel="noopener noreferrer nofollow">
                <img src="${banner.src}" 
                     style="width:300px; height:auto; display:block;">
            </a>
        `;
        
        // Chèn banner vào trước thẻ script
        currentScript.parentNode.insertBefore(bannerElement, currentScript);
    }
})();
