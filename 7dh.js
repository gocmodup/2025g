
(function() {
    // Khởi tạo hoặc lấy dữ liệu từ localStorage
    const initializeData = () => {
        let data = localStorage.getItem('adsPerformance');
        if (!data) {
            data = {
                lastReportTime: new Date().getTime(),
                stats: {
                    shopee1: { impressions: 0, clicks: 0, name: "shopee1" },
                    great1: { impressions: 0, clicks: 0, name: "great1" },
                    shopee2: { impressions: 0, clicks: 0, name: "shopee2" },
                    shopee3: { impressions: 0, clicks: 0, name: "shopee3" }
                }
            };
            localStorage.setItem('adsPerformance', JSON.stringify(data));
        }
        return JSON.parse(data);
    };

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

    // Cấu hình Telegram
    const TELEGRAM_BOT_TOKEN = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA';
    const TELEGRAM_CHAT_ID = '703539525';
    const REPORT_INTERVAL = 1 * 60 * 1000; // 5 phút

    // Hàm cập nhật số liệu
    const updateStats = (bannerId, type) => {
        let data = JSON.parse(localStorage.getItem('adsPerformance'));
        if (type === 'impression') {
            data.stats[bannerId].impressions++;
        } else if (type === 'click') {
            data.stats[bannerId].clicks++;
        }
        localStorage.setItem('adsPerformance', JSON.stringify(data));
    };

    // Hàm gửi báo cáo
    const sendReport = async () => {
        let data = JSON.parse(localStorage.getItem('adsPerformance'));
        const now = new Date().getTime();
        
        // Kiểm tra xem đã đến thời gian gửi báo cáo chưa
        if (now - data.lastReportTime < REPORT_INTERVAL) {
            return;
        }

        let message = '📊 Báo cáo hiệu suất quảng cáo\n\n';
        
        // Tạo nội dung báo cáo
        Object.values(data.stats).forEach(ad => {
            const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : 0;
            message += `🎯 ${ad.name}\n`;
            message += `👀 Hiển thị: ${ad.impressions}\n`;
            message += `🖱️ Click: ${ad.clicks}\n`;
            message += `📈 CTR: ${ctr}%\n\n`;
        });

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            });

            if (response.ok) {
                // Reset số liệu và cập nhật thời gian
                data.lastReportTime = now;
                Object.keys(data.stats).forEach(key => {
                    data.stats[key].impressions = 0;
                    data.stats[key].clicks = 0;
                });
                localStorage.setItem('adsPerformance', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Lỗi gửi báo cáo:', error);
        }
    };

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

    // Khởi tạo dữ liệu
    initializeData();

    // Thiết lập timer kiểm tra và gửi báo cáo
    setInterval(sendReport, 60000); // Kiểm tra mỗi phút

    const validBanners = getValidBanners();
    
    if (validBanners.length > 0) {
        const shuffledBanners = shuffleArray(validBanners);
        const banner = shuffledBanners[0];
        
        // Cập nhật số lượt hiển thị
        updateStats(banner.id, 'impression');
        
        const currentScript = document.currentScript;
        
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = `
                <a href="${banner.href}" 
                   target="_blank" 
                   rel="noopener noreferrer nofollow"
                   onclick="(function(){
                       const data = JSON.parse(localStorage.getItem('adsPerformance'));
                       data.stats['${banner.id}'].clicks++;
                       localStorage.setItem('adsPerformance', JSON.stringify(data));
                   })()">
                    <img src="${banner.src}" 
                         style="width:300px; height:auto; display:block;">
                </a>
            `;
        
        currentScript.parentNode.insertBefore(bannerElement, currentScript);
    }
})(); 
