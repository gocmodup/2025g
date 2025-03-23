const banners = [
    {
        src: "https://down-cvs-vn.img.susercontent.com/vn-11134207-7r98o-lua61kdx7m6pd9.webp",
        href: "https://s.shopee.vn/5VCFJCNGxF",
        expireDate: "2025-04-01" 
    },
    {
        src: "https://i.servimg.com/u/f45/19/58/16/37/6d04cf10.png",
        href: "https://so-gr3at3.com/go/1497333"
        
    },
    {
        src: "https://i.upanh.org/2024/08/26/1001099487d60cff77c02e0ae6-1ce41f1d5ca1982ff.jpeg",
        href: "https://s.shopee.vn/6fNzXWEgsZ",
        expireDate: "2025-03-30"
    },
    {
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
        document.write(`<a href="${banner.href}" target="_blank" rel="noopener noreferrer nofollow"><img src="${banner.src}" style="width:300px; height:auto; display:block;"></a>`);
    }
}

displayRandomBanner();
