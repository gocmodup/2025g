(function() {
    // Tạo phần tử container cho banner
    const bannerContainer = document.createElement('div');
    bannerContainer.id = 'banner-container';
    bannerContainer.style = 'position:fixed; top:0; left:0; width:100%; height:100%; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.5); z-index:9999; visibility:hidden;';
    document.body.appendChild(bannerContainer);

    // Lấy dữ liệu từ URL JSON
    fetch('https://raw.githubusercontent.com/gocmodup/2025g/main/shopee')
    .then(response => response.json())
    .then(data => {
        const keys = Object.keys(data);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomItem = data[randomKey];

        // HTML cho banner với hình ảnh và liên kết
        const bannerHTML = `
            <div style="position:relative; width:80%; max-width:400px;">
                <span id="banner-close" style="position:absolute; top:10px; right:10px; cursor:pointer; background:#fff; padding:5px; border-radius:50%; z-index:10000;">X</span>
                <a href="${randomItem.url}" target="_blank" style="display:block;">
                    <img src="${randomItem.img}" alt="Banner" style="width:100%; border-radius:10px;"/>
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
