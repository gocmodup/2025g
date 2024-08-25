(function() {
    // Tạo phần tử container cho banner
    const bannerContainer = document.createElement('div');
    bannerContainer.id = 'banner-container';
    bannerContainer.style = 'position:fixed; inset:0; display:flex; justify-content:center; align-items:center; background:#00000066; z-index:9999; visibility:hidden;';
    document.body.appendChild(bannerContainer);

    // Lấy dữ liệu từ URL JSON
    fetch('https://raw.githubusercontent.com/gocmodup/2025g/main/shopee')
    .then(response => response.json())
    .then(data => {
        const links = Object.values(data);
        const randomItem = links[Math.floor(Math.random() * links.length)];
        const imageUrl = randomItem.img;
        const targetUrl = randomItem.url;

        // HTML cho banner
        const bannerHTML = `
            <div style="position:relative; width:80%; max-width:400px;">
                <span id="banner-close" style="position:absolute; top:-10px; right:-10px; cursor:pointer; background:#fff; padding:5px; border-radius:50%;">X</span>
                <a href="${targetUrl}" target="_blank">
                    <img src="${imageUrl}" alt="Banner" style="width:100%;"/>
                </a>
            </div>
        `;

        bannerContainer.innerHTML = bannerHTML;
        bannerContainer.style.visibility = 'visible';

        // Sự kiện đóng banner
        document.getElementById('banner-close').onclick = function() {
            bannerContainer.style.display = 'none';
        };
    })
    .catch(error => console.error('Error loading banner:', error));
})();
