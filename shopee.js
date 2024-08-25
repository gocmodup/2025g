(function() {
    const bannerContainer = document.createElement('div');
    bannerContainer.id = 'banner-container';
    bannerContainer.style = 'width:100%';
    document.body.appendChild(bannerContainer);

    fetch('https://raw.githubusercontent.com/gocmodup/2025g/main/shopee')
    .then(response => response.json())
    .then(data => {
        const links = Object.values(data);
        const randomLink = links[Math.floor(Math.random() * links.length)];

        const bannerHTML = `
            <div style="position:fixed; inset:0; display:flex; justify-content:center; align-items:center; background:#00000066; z-index:9999997; overflow:hidden;">
                <div style="position:relative; width:80%; max-width:400px;">
                    <span id="banner-close" style="position:absolute; top:10px; right:10px; cursor:pointer; background:#fff; padding:5px; border-radius:50%;">X</span>
                    <a href="${randomLink}" target="_blank">
                        <img src="${randomLink}" alt="Banner" style="width:100%;"/>
                    </a>
                </div>
            </div>
        `;

        bannerContainer.innerHTML = bannerHTML;

        document.getElementById('banner-close').onclick = function() {
            bannerContainer.style.display = 'none';
        };
    })
    .catch(error => console.error('Error loading banner:', error));
})();
