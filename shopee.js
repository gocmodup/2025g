(function() {
    const adDataUrl = 'https://raw.githubusercontent.com/gocmodup/2025g/main/shopee'; // Thay đổi URL này thành URL JSON của bạn

    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'banner';
        banner.style.position = 'fixed';
        banner.style.bottom = '20px';
        banner.style.right = '20px';
        banner.style.width = '300px';
        banner.style.height = '250px';
        banner.style.backgroundColor = '#fff';
        banner.style.border = '1px solid #ccc';
        banner.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        banner.style.zIndex = '1000';

        const closeButton = document.createElement('button');
        closeButton.id = 'close-btn';
        closeButton.innerText = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.background = '#ff0000';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.width = '25px';
        closeButton.style.height = '25px';
        closeButton.style.cursor = 'pointer';

        const bannerLink = document.createElement('a');
        bannerLink.id = 'banner-link';
        bannerLink.href = '#';
        bannerLink.target = '_blank';

        const bannerImg = document.createElement('img');
        bannerImg.id = 'banner-img';
        bannerImg.style.width = '100%';
        bannerImg.style.height = '100%';
        bannerLink.appendChild(bannerImg);

        banner.appendChild(closeButton);
        banner.appendChild(bannerLink);

        document.body.appendChild(banner);

        return { banner, closeButton, bannerLink, bannerImg };
    }

    function fetchAdData(banner, bannerLink, bannerImg) {
        fetch(adDataUrl)
            .then(response => response.json())
            .then(data => {
                const randomAd = data[Math.floor(Math.random() * data.length)];
                bannerLink.href = randomAd.url;
                bannerImg.src = randomAd.image;
                banner.style.display = 'block';
            })
            .catch(error => console.error('Error fetching ad data:', error));
    }

    function setBannerTimeout() {
        localStorage.setItem('bannerTimeout', Date.now() + 15 * 60 * 1000);
    }

    function shouldShowBanner() {
        const timeout = localStorage.getItem('bannerTimeout');
        return !timeout || Date.now() > timeout;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const { banner, closeButton, bannerLink, bannerImg } = createBanner();

        closeButton.addEventListener('click', () => {
            banner.style.display = 'none';
            setBannerTimeout();
        });

        bannerLink.addEventListener('click', () => {
            setBannerTimeout();
        });

        if (shouldShowBanner()) {
            fetchAdData(banner, bannerLink, bannerImg);
        }
    });
})();
