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

const TELEGRAM_BOT_TOKEN = '8153188210:AAF2ORyvIPOtO9YzZsl2NI4dumVDGJqPBiA';
const TELEGRAM_CHAT_ID = '703539525';

function trackImpression(bannerId) {
    let impressions = JSON.parse(localStorage.getItem('impressions') || '{}');
    impressions[bannerId] = (impressions[bannerId] || 0) + 1;
    localStorage.setItem('impressions', JSON.stringify(impressions));
}

function trackClick(bannerId) {
    let clicks = JSON.parse(localStorage.getItem('clicks') || '{}');
    clicks[bannerId] = (clicks[bannerId] || 0) + 1;
    localStorage.setItem('clicks', JSON.stringify(clicks));
}

async function sendTelegramReport() {
    const impressions = JSON.parse(localStorage.getItem('impressions') || '{}');
    const clicks = JSON.parse(localStorage.getItem('clicks') || '{}');
    
    let report = '📊 Báo cáo quảng cáo:\n\n';
    
    banners.forEach(banner => {
        const imp = impressions[banner.id] || 0;
        const clk = clicks[banner.id] || 0;
        const ctr = imp ? ((clk/imp) * 100).toFixed(2) : 0;
        
        report += `🎯 Banner: ${banner.id}\n`;
        report += `👁 Hiển thị: ${imp}\n`;
        report += `🖱 Click: ${clk}\n`;
        report += `📈 CTR: ${ctr}%\n\n`;
    });

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: report
        })
    });
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
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayRandomBanner() {
    const validBanners = getValidBanners();
    if (validBanners.length > 0) {
        const shuffledBanners = shuffleArray(validBanners);
        const banner = shuffledBanners[0];
        
        trackImpression(banner.id);
        
        document.write(`
            <a href="${banner.href}" 
               target="_blank" 
               rel="noopener noreferrer nofollow"
               onclick="trackClick('${banner.id}')">
                <img src="${banner.src}" 
                     style="width:300px; height:auto; display:block;">
            </a>
        `);
    }
}

function scheduleReport() {
    const now = new Date();
    const scheduledTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        14,
        15,
        0
    );
    
    let delay = scheduledTime.getTime() - now.getTime();
    if (delay < 0) delay += 86400000;
    
    setTimeout(async () => {
        await sendTelegramReport();
        localStorage.clear();
        scheduleReport();
    }, delay);
}

displayRandomBanner();
scheduleReport();
