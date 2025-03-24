(function() {
    // Danh sách hình ảnh
    var images = [
        "https://cdn.statically.io/gh/aowvn-10diem/directdownload/main/aowvn-banner%20(1).jpeg",
        "https://cdn.statically.io/gh/aowvn-10diem/directdownload/main/aowvn-banner%20(1).jpg",
        "https://cdn.statically.io/gh/aowvn-10diem/directdownload/main/aowvn-banner%20(2).jpeg",
        "https://cdn.statically.io/gh/aowvn-10diem/directdownload/main/aowvn-banner%20(2).jpg",
        "https://cdn.statically.io/gh/aowvn-10diem/directdownload/main/aowvn-banner%20(3).jpg",
        "https://cdn.statically.io/gh/aowvn-10diem/directdownload/main/aowvn-banner%2093).jpg"
    ];

    // Danh sách URL Shopee
    var links = [
        "https://s.shopee.vn/qVckDCMbC",
        "https://s.shopee.vn/1B8T8n7VF8",
        "https://s.shopee.vn/8AIDTnm1Cr",
        "https://s.shopee.vn/3fpo7VysWx",
        "https://s.shopee.vn/9pQRSp7Hf3",
        "https://s.shopee.vn/5puIhS9ROq",
        "https://s.shopee.vn/706G5aETgp",
        "https://s.shopee.vn/6fTPgwpTfN",
        "https://s.shopee.vn/6KqZITrVit"
    ];

    var randomImage = images[Math.floor(Math.random() * images.length)];
    var randomLink = links[Math.floor(Math.random() * links.length)];

    var clickedTime = localStorage.getItem('clickedTime');
    var now = new Date().getTime();

    if (clickedTime && now - clickedTime < 5 * 60 * 1000) {
        return;
    }

    var displayContainer = document.createElement('div');
    displayContainer.style.position = 'fixed';
    displayContainer.style.top = '50%';
    displayContainer.style.left = '50%';
    displayContainer.style.transform = 'translate(-50%, -50%)';
    displayContainer.style.width = '320px';
    displayContainer.style.zIndex = '9999';
    displayContainer.style.backgroundColor = '#fff';
    displayContainer.style.border = '2px solid #000';
    displayContainer.style.borderRadius = '15px';
    displayContainer.style.padding = '20px';
    displayContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    displayContainer.style.textAlign = 'center';
    displayContainer.style.fontFamily = 'Arial, sans-serif';

   
    var closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '30px';
    closeButton.style.color = '#888';
    closeButton.style.cursor = 'pointer';
    closeButton.style.transition = 'color 0.3s ease';
    closeButton.onmouseover = function() {
        closeButton.style.color = '#000';
    };
    closeButton.onmouseout = function() {
        closeButton.style.color = '#888';
    };
    closeButton.onclick = function() {
        displayContainer.style.display = 'none';
        localStorage.setItem('clickedTime', new Date().getTime()); 
    };

    var displayImage = document.createElement('img');
    displayImage.src = randomImage;
    displayImage.style.width = '100%';
    displayImage.style.borderRadius = '10px';
    displayImage.style.marginBottom = '15px';
    displayImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    displayImage.style.cursor = 'pointer';
    displayImage.onclick = function() {
        openLinkInNewTab(randomLink);
        displayContainer.style.display = 'none'; 
    };

    var displayText = document.createElement('p');
    displayText.innerHTML = 'Nhấn vào hình ảnh để xem thêm chi tiết!';
    displayText.style.fontSize = '16px';
    displayText.style.color = '#555';
    displayText.style.margin = '0';
    displayText.style.marginBottom = '15px';

    displayContainer.appendChild(closeButton);
    displayContainer.appendChild(displayImage);
    displayContainer.appendChild(displayText);

    document.body.appendChild(displayContainer);

    document.addEventListener('click', function(event) {
        if (!displayContainer.contains(event.target)) {
            if (displayContainer.style.display !== 'none') {
                openLinkInNewTab(randomLink);
                displayContainer.style.display = 'none';
            }
        }
    });

    function openLinkInNewTab(link) {
        var linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer nofollow';
        linkElement.click();
    }

})();
