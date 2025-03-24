
window.adsPerformance = {};
window.lastReportTime = new Date();

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

    // Cấu hình Telegram - thay thế các giá trị này
    const TELEGRAM_BOT_TOKEN = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA';
    const TELEGRAM_CHAT_ID = '703539525';
    const REPORT_INTERVAL = 1 * 60 * 1000; // Test với 1 phút

    // Khởi tạo theo dõi
    if (Object.keys(window.adsPerformance).length === 0) {
        banners.forEach(banner => {
            window.adsPerformance[banner.id] = {
                impressions: 0,
                clicks: 0,
                name: banner.id
            };
        });
    }

    // Hàm kiểm tra kết nối Telegram
    async function testTelegramConnection() {
        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
            const data = await response.json();
            console.log('Telegram Bot Test:', data);
            return data.ok;
        } catch (error) {
            console.error('Telegram Connection Test Failed:', error);
            return false;
        }
    }

    // Hàm gửi báo cáo
    async function sendTelegramReport() {
        console.log('Checking report conditions...');
        console.log('Time since last report:', new Date() - window.lastReportTime, 'ms');
        console.log('Current performance data:', window.adsPerformance);

        const now = new Date();
        const timeDiff = now - window.lastReportTime;

        if (timeDiff >= REPORT_INTERVAL) {
            console.log('Preparing report...');
            
            let reportMessage = `📊 Báo cáo hiệu suất quảng cáo\n`;
            reportMessage += `⏰ ${now.toLocaleString()}\n\n`;

            for (const id in window.adsPerformance) {
                const ad = window.adsPerformance[id];
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : 0;
                
                reportMessage += `🎯 ${ad.name}\n`;
                reportMessage += `👀 Hiển thị: ${ad.impressions}\n`;
                reportMessage += `🖱️ Click: ${ad.clicks}\n`;
                reportMessage += `📈 CTR: ${ctr}%\n\n`;
            }

            console.log('Report Message:', reportMessage);

            try {
                // Test connection first
                const isConnected = await testTelegramConnection();
                if (!isConnected) {
                    console.error('Telegram connection test failed');
                    return;
                }

                console.log('Sending report to Telegram...');
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: reportMessage
                    })
                });

                const responseData = await response.json();
                console.log('Telegram API Response:', responseData);

                if (responseData.ok) {
                    console.log('Report sent successfully');
                    // Reset stats
                    for (const id in window.adsPerformance) {
                        window.adsPerformance[id].impressions = 0;
                        window.adsPerformance[id].clicks = 0;
                    }
                    window.lastReportTime = now;
                } else {
                    console.error('Failed to send report:', responseData.description);
                }
            } catch (error) {
                console.error('Error sending report:', error);
            }
        }
    }

    // Test connection immediately
    testTelegramConnection().then(isConnected => {
        console.log('Initial Telegram connection test:', isConnected);
    });

    // Set up reporting interval
    setInterval(sendTelegramReport, 30000); // Check every 30 seconds

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

    const validBanners = getValidBanners();
    
    if (validBanners.length > 0) {
        const shuffledBanners = shuffleArray(validBanners);
        const banner = shuffledBanners[0];
        
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
