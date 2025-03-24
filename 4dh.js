window.adsPerformance = {};
window.lastReportTime = new Date(); // Thêm biến theo dõi thời gian báo cáo cuối

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

    // Khởi tạo tracking nếu chưa có
    if (Object.keys(window.adsPerformance).length === 0) {
        banners.forEach(banner => {
            window.adsPerformance[banner.id] = {
                impressions: 0,
                clicks: 0,
                name: banner.id
            };
        });
    }

    // Cấu hình Telegram
    const TELEGRAM_BOT_TOKEN = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA';
    const TELEGRAM_CHAT_ID = '703539525';
    const REPORT_INTERVAL = 5 * 60 * 1000; // 5 phút

    function getValidBanners() {
        const today = new Date();
        return banners.filter(banner => {
            if (!banner.expireDate) return true;
            const expireDate = new Date(banner.expireDate);
            return expireDate > today;
        });
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Hàm gửi báo cáo đến Telegram
    async function sendTelegramReport() {
        const now = new Date();
        const timeDiff = now - window.lastReportTime;

        // Chỉ gửi báo cáo nếu đã đủ thời gian interval
        if (timeDiff >= REPORT_INTERVAL) {
            let reportMessage = '📊 Báo cáo hiệu suất quảng cáo\n\n';
            
            for (const id in window.adsPerformance) {
                const ad = window.adsPerformance[id];
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : 0;
                
                reportMessage += `🎯 ${ad.name}\n`;
                reportMessage += `👀 Hiển thị: ${ad.impressions}\n`;
                reportMessage += `🖱️ Click: ${ad.clicks}\n`;
                reportMessage += `📈 CTR: ${ctr}%\n\n`;
            }

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: reportMessage,
                        parse_mode: 'HTML'
                    })
                });

                if (response.ok) {
                    // Reset số liệu và cập nhật thời gian báo cáo cuối
                    for (const id in window.adsPerformance) {
                        window.adsPerformance[id].impressions = 0;
                        window.adsPerformance[id].clicks = 0;
                    }
                    window.lastReportTime = now;
                }
            } catch (error) {
                console.error('Lỗi gửi báo cáo:', error);
            }
        }
    }

    // Thiết lập timer kiểm tra và gửi báo cáo
    setInterval(sendTelegramReport, 60000); // Kiểm tra mỗi phút

    const validBanners = getValidBanners();
    
    if (validBanners.length > 0) {
        const shuffledBanners = shuffleArray(validBanners);
        const banner = shuffledBanners[0];
        
        // Tăng số lượt hiển thị
        window.adsPerformance[banner.id].impressions++;
        
        const currentScript = document.currentScript;
        
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = `
                <a href="${banner.href}" 
                   target="_blank" 
                   rel="noopener noreferrer nofollow"
                   onclick="window.adsPerformance['${banner.id}'].clicks++">
                    <img src="${banner.src}" 
                         style="width:300px; height:auto; display:block;">
                </a>
            `;
        
        currentScript.parentNode.insertBefore(bannerElement, currentScript);
    }
})();
