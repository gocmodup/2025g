// File: ads.js
(function() {
    // Cấu hình Telegram
    const TELEGRAM_BOT_TOKEN = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA';
    const TELEGRAM_CHAT_ID = '703539525';

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

    function initializeStats() {
        const stats = JSON.parse(localStorage.getItem('adStats') || '{}');
        
        // Khởi tạo số liệu cho tất cả banner
        banners.forEach(banner => {
            if (!stats[banner.id]) {
                stats[banner.id] = { impressions: 0, clicks: 0 };
            }
        });
        
        localStorage.setItem('adStats', JSON.stringify(stats));
    }

    function trackImpression(bannerId) {
        try {
            const stats = JSON.parse(localStorage.getItem('adStats') || '{}');
            if (!stats[bannerId]) {
                stats[bannerId] = { impressions: 0, clicks: 0 };
            }
            stats[bannerId].impressions++;
            localStorage.setItem('adStats', JSON.stringify(stats));
        } catch (error) {
            console.error('Lỗi khi track impression:', error);
        }
    }

    window._trackAdClick = function(bannerId) {
        try {
            const stats = JSON.parse(localStorage.getItem('adStats') || '{}');
            if (!stats[bannerId]) {
                stats[bannerId] = { impressions: 0, clicks: 0 };
            }
            stats[bannerId].clicks++;
            localStorage.setItem('adStats', JSON.stringify(stats));
        } catch (error) {
            console.error('Lỗi khi track click:', error);
        }
    };

    function shouldSendReport() {
        const lastReportTime = localStorage.getItem('lastReportTime') || 0;
        const now = Date.now();
        return (now - lastReportTime) >= (5 * 60 * 1000); // 5 phút
    }

    function checkAndSendReport() {
        if (shouldSendReport()) {
            sendTelegramReport();
            localStorage.setItem('lastReportTime', Date.now());
        }
    }

    function scheduleReport() {
        // Kiểm tra và gửi báo cáo mỗi 10 giây
        setInterval(checkAndSendReport, 10000);
    }

    async function sendTelegramReport() {
        try {
            const stats = JSON.parse(localStorage.getItem('adStats') || '{}');
            let report = '📊 Báo cáo quảng cáo:\n\n';

            // Báo cáo cho tất cả banner
            banners.forEach(banner => {
                const bannerStats = stats[banner.id] || { impressions: 0, clicks: 0 };
                const { impressions, clicks } = bannerStats;
                const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0;

                report += `🎯 Banner: ${banner.id}\n`;
                report += `👁 Hiển thị: ${impressions}\n`;
                report += `🖱 Click: ${clicks}\n`;
                report += `📈 CTR: ${ctr}%\n\n`;
            });

            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: report
                })
            });
            
            if (response.ok) {
                // Reset stats sau khi gửi báo cáo thành công
                initializeStats();
            }
        } catch (error) {
            console.error('Lỗi khi gửi báo cáo:', error);
        }
    }

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

    // Khởi tạo stats
    initializeStats();

    // Hiển thị banner và theo dõi
    const validBanners = getValidBanners();
    
    if (validBanners.length > 0) {
        const shuffledBanners = shuffleArray(validBanners);
        const banner = shuffledBanners[0];
        
        // Track impression
        trackImpression(banner.id);
        
        const currentScript = document.currentScript;
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = `
            <a href="${banner.href}" 
               target="_blank" 
               rel="noopener noreferrer nofollow"
               onclick="_trackAdClick('${banner.id}')"
               >
                <img src="${banner.src}" 
                     style="width:300px; height:auto; display:block;">
            </a>
        `;
        
        currentScript.parentNode.insertBefore(bannerElement, currentScript);
    }

    // Khởi động hệ thống báo cáo
    scheduleReport();
})();
