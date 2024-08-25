document.addEventListener("DOMContentLoaded", function () {
    const banner = document.createElement('div');
    banner.id = 'banner-popup';
    banner.style.position = 'fixed';
    banner.style.bottom = '20px';
    banner.style.right = '20px';
    banner.style.width = '300px';
    banner.style.backgroundColor = '#fff';
    banner.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    banner.style.display = 'none';
    banner.style.zIndex = '1000';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.backgroundColor = '#ff0000';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '25px';
    closeButton.style.height = '25px';
    closeButton.style.textAlign = 'center';
    closeButton.style.lineHeight = '25px';
    closeButton.style.cursor = 'pointer';
    closeButton.innerText = 'X';
    closeButton.onclick = closeBanner;

    const bannerLink = document.createElement('a');
    bannerLink.id = 'banner-link';
    bannerLink.href = '#';
    bannerLink.target = '_blank';

    const bannerImage = document.createElement('img');
    bannerImage.style.width = '100%';
    bannerImage.style.height = 'auto';
    bannerImage.alt = 'Banner';

    bannerLink.appendChild(bannerImage);
    banner.appendChild(closeButton);
    banner.appendChild(bannerLink);
    document.body.appendChild(banner);

    const jsonUrl = 'https://raw.githubusercontent.com/gocmodup/2025g/main/shopee'; // Thay thế URL này bằng URL thực tế của bạn

    function showBanner() {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                const items = Object.values(data);
                const randomItem = items[Math.floor(Math.random() * items.length)];
                bannerLink.href = randomItem.link;
                bannerImage.src = randomItem.image;
                banner.style.display = 'block';
            })
            .catch(error => console.error('Lỗi tải liên kết hoặc hình ảnh:', error));
    }

    function closeBanner() {
        banner.style.display = 'none';
        setNextDisplayTime();
    }

    function setNextDisplayTime() {
        const nextDisplayTime = new Date().getTime() + 15 * 60 * 1000; // 15 phút
        localStorage.setItem('bannerNextDisplayTime', nextDisplayTime);
    }

    function checkDisplayBanner() {
        const nextDisplayTime = localStorage.getItem('bannerNextDisplayTime');
        if (!nextDisplayTime || new Date().getTime() > nextDisplayTime) {
            showBanner();
        }
    }

    checkDisplayBanner();
    bannerLink.addEventListener('click', setNextDisplayTime);
});
