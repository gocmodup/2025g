(function() {
    const TELEGRAM_BOT_TOKEN = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA';
    const TELEGRAM_CHAT_ID = '703539525';
    const GLOBAL_TIMESTAMP_KEY = 'global_report_timestamp';
    const REPORT_INTERVAL = 5 * 60 * 1000; // 5 phút
    const REPORT_LOCK_KEY = 'report_lock';

    const banners = [
        { id: "shopee1", src: "https://down-cvs-vn.img.susercontent.com/vn-11134207-7r98o-lua61kdx7m6pd9.webp", href: "https://s.shopee.vn/5VCFJCNGxF", expireDate: "2025-04-01" },
        { id: "great1", src: "https://i.servimg.com/u/f45/19/58/16/37/6d04cf10.png", href: "https://so-gr3at3.com/go/1497333" },
        { id: "shopee2", src: "https://i.upanh.org/2024/08/26/1001099487d60cff77c02e0ae6-1ce41f1d5ca1982ff.jpeg", href: "https://s.shopee.vn/6fNzXWEgsZ", expireDate: "2025-03-30" },
        { id: "shopee3", src: "https://i.upanh.org/2024/08/26/10010994884eb3bd45e623d9bb-1ec26da0ab694303b.jpeg", href: "https://s.shopee.vn/1qIjmayhWL" }
    ];

    function getValidBanners() {
        const today = new Date();
        return banners.filter(banner => !banner.expireDate || new Date(banner.expireDate) >= today);
    }

    function updateAdStats(bannerId, type) {
        const stats = JSON.parse(localStorage.getItem('adStats') || '{}');
        if (!stats[bannerId]) {
            stats[bannerId] = { impressions: 0, clicks: 0 };
        }
        stats[bannerId][type] += 1;
        localStorage.setItem('adStats', JSON.stringify(stats));
    }

    function showRandomAd() {
        const validBanners = getValidBanners();
        if (validBanners.length === 0) return;
        
        const randomBanner = validBanners[Math.floor(Math.random() * validBanners.length)];
        updateAdStats(randomBanner.id, 'impressions');
        
        const adContainer = document.createElement('div');
        adContainer.style.position = 'fixed';
        adContainer.style.bottom = '20px';
        adContainer.style.right = '20px';
        adContainer.style.zIndex = '1000';
        adContainer.style.backgroundColor = '#fff';
        adContainer.style.padding = '10px';
        adContainer.style.border = '1px solid #ccc';
        adContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        
        const adLink = document.createElement('a');
        adLink.href = randomBanner.href;
        adLink.target = '_blank';
        adLink.innerHTML = `<img src="${randomBanner.src}" style="width: 300px; height: auto; display: block;"/>`;
        adLink.onclick = function() { updateAdStats(randomBanner.id, 'clicks'); };
        
        adContainer.appendChild(adLink);
        document.body.appendChild(adContainer);
    }

    function shouldSendReport() {
        try {
            const lastReportTime = parseInt(localStorage.getItem(GLOBAL_TIMESTAMP_KEY) || '0');
            const now = Date.now();
            
            if ((now - lastReportTime) >= REPORT_INTERVAL) {
                localStorage.setItem(GLOBAL_TIMESTAMP_KEY, now.toString());
                return true;
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra thời gian báo cáo:', error);
        }
        return false;
    }

    async function sendTelegramReport() {
        if (localStorage.getItem(REPORT_LOCK_KEY)) {
            return;
        }
        
        try {
            localStorage.setItem(REPORT_LOCK_KEY, '1');
            const stats = JSON.parse(localStorage.getItem('adStats') || '{}');
            let report = '📊 Báo cáo quảng cáo:\n';

            Object.keys(stats).forEach(bannerId => {
                const { impressions = 0, clicks = 0 } = stats[bannerId];
                const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0;
                report += `🎯 Banner: ${bannerId}\n👁 Hiển thị: ${impressions}\n🖱 Click: ${clicks}\n📈 CTR: ${ctr}%\n\n`;
            });

            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: report })
            });
            
            if (response.ok) {
                localStorage.setItem('adStats', JSON.stringify({}));
            }
        } catch (error) {
            console.error('Lỗi khi gửi báo cáo:', error);
        } finally {
            localStorage.removeItem(REPORT_LOCK_KEY);
        }
    }

    function scheduleReport() {
        setInterval(() => {
            if (shouldSendReport()) {
                sendTelegramReport();
            }
        }, REPORT_INTERVAL);
    }

    document.addEventListener('DOMContentLoaded', showRandomAd);
    scheduleReport();
})();
