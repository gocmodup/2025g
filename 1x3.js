(function () {
    const targetUrl = "https://t.me/ghostgmb0";
    const delayMinutes = 5;
    const storageKey = 'bannerClosedTime';

    const lastClosed = localStorage.getItem(storageKey);
    const now = Date.now();
    if (lastClosed && now - parseInt(lastClosed) < delayMinutes * 60 * 1000) {
        return;
    }

    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.zIndex = '9999';
    banner.style.width = '300px';
    banner.style.height = '180px';
    banner.style.background = '#fff';
    banner.style.border = '2px solid #000';
    banner.style.borderRadius = '10px';
    banner.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    banner.style.cursor = 'pointer';
    banner.style.overflow = 'hidden';

    const img = document.createElement('img');
    img.src = 'https://i45.servimg.com/u/f45/19/58/16/37/chatgp10.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.style.position = 'absolute';
    close.style.top = '5px';
    close.style.right = '10px';
    close.style.fontSize = '24px';
    close.style.color = '#888';
    close.style.cursor = 'pointer';
    close.style.zIndex = '10000';

    banner.appendChild(img);
    banner.appendChild(close);
    document.body.appendChild(banner);

    banner.addEventListener('click', function (e) {
        if (e.target !== close) {
            window.open(targetUrl, '_blank');
            banner.remove();
        }
    });

    close.addEventListener('click', function (e) {
        e.stopPropagation();
        localStorage.setItem(storageKey, Date.now().toString());
        banner.remove();
    });
})();
