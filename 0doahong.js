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

    function getValidBanners() {
        const today = new Date();
        return banners.filter(banner => {
            if (!banner.expireDate) return true;
            const expireDate = new Date(banner.expireDate);
            return expireDate > today;
        });
    }

    function shuffleArray(array) {
        const newArray = [...array]; // Tạo bản sao của mảng
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Thêm các biến để theo dõi hiệu suất
    const performanceData = {};
    banners.forEach(banner => {
        performanceData[banner.id] = {
            impressions: 0,
            clicks: 0
        };
    });

    // Hàm để gửi báo cáo về Telegram
    function sendReport(chatId, token) {
        let reportMessage = "Báo cáo hiệu suất quảng cáo:\n\n";
        banners.forEach(banner => {
            const data = performanceData[banner.id];
            const ctr = (data.clicks / data.impressions) * 100 || 0;
            reportMessage += `Tên ads: ${banner.id}\n` +
                             `Tỉ lệ hiển thị: ${data.impressions}\n` +
                             `Click: ${data.clicks}\n` +
                             `CTR: ${ctr.toFixed(2)}%\n\n`;
        });

        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(reportMessage)}`;
        fetch(url)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.error('Error:', error));
    }

    // Lấy banner hợp lệ
    const validBanners = getValidBanners();
    
    if (validBanners.length > 0) {
        // Lấy ngẫu nhiên một banner
        const shuffledBanners = shuffleArray(validBanners);
        const banner = shuffledBanners[0];
        
        // Cập nhật số lượng hiển thị
        performanceData[banner.id].impressions++;
        
        // Lấy thẻ script hiện tại
        const currentScript = document.currentScript;
        
        // Tạo element mới
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = `
                <a href="${banner.href}" 
                   target="_blank" 
                   rel="noopener noreferrer nofollow" onclick="onClickAd('${banner.id}')">
                    <img src="${banner.src}" 
                         style="width:300px; height:auto; display:block;">
                </a>
            `;
        
        // Chèn banner vào trước thẻ script
        currentScript.parentNode.insertBefore(bannerElement, currentScript);
    }

    // Hàm xử lý khi người dùng click vào quảng cáo
    window.onClickAd = function(adId) {
        performanceData[adId].clicks++;
    };

    // Gửi báo cáo mỗi 5 phút (300000 milliseconds)
    const reportInterval = 300000; // Tùy chỉnh thời gian ở đây
    const chatId = '703539525'; // Thay YOUR_CHAT_ID bằng ID chat của bạn trên Telegram
    const token = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA'; // Thay YOUR_BOT_TOKEN bằng token của bot Telegram của bạn
    
    setInterval(() => {
        sendReport(chatId, token);
        // Reset các số liệu sau khi gửi báo cáo
        banners.forEach(banner => {
            performanceData[banner.id].impressions = 0;
            performanceData[banner.id].clicks = 0;
        });
    }, reportInterval);
})();
