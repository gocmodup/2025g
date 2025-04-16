(function() {
    const banners = [
        {
            id: "GocMOd",
            src: "https://i45.servimg.com/u/f45/19/58/16/37/chatgp10.png",
            href: "https://t.me/ghostgmb0",
            expireDate: "2025-04-30" 
        },
        {
            id: "great1",
            src: "https://i.servimg.com/u/f45/19/58/16/37/6d04cf10.png",
            href: "https://so-gr3at3.com/go/1497333"
        },
    
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
        
        const currentScript = document.currentScript;
        
        const bannerElement = document.createElement('div');
        bannerElement.innerHTML = `
                <a href="${banner.href}" 
                   target="_blank" 
                   rel="noopener noreferrer nofollow">
                    <img src="${banner.src}" 
                         style="width:300px; height:auto; display:block;">
                </a>
            `;
        
        currentScript.parentNode.insertBefore(bannerElement, currentScript);
    }
})();
