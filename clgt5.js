(function() {
    // Danh sách hình ảnh
    var images = [
        "https://i45.servimg.com/u/f45/19/58/16/37/captur10.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/khach-10.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/shopee10.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/img_2014.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/img_2015.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/img_2016.jpg"
    ];

    // Danh sách URL Shopee
    var links = [
        "https://s.shopee.vn/1g21yYEaX2",
        "https://s.shopee.vn/1qLSArDxC5",
        "https://s.shopee.vn/1LPBZwFrD0",
        "https://s.shopee.vn/1VibmFFDs3",
        "https://s.shopee.vn/2fur50fVkC",
        "https://s.shopee.vn/1VitgqocPm"
    ];

    // Danh sách tips
    var tips = [
        "TIPS: Quảng cáo là nguồn thu chính của website, hãy tắt trình chặn quảng cáo để ủng hộ website!",
        "TIPS: Hãy nhấn vào quảng cáo để giúp website phát triển!",
        "TIPS: Website này hoạt động nhờ vào quảng cáo, hãy ủng hộ bằng cách tắt AdBlock!",
        "TIPS: Bạn có biết? Quảng cáo giúp website có thể duy trì và phát triển!"
    ];

    // Chọn ngẫu nhiên một hình ảnh, liên kết và tip
    var randomImage = images[Math.floor(Math.random() * images.length)];
    var randomLink = links[Math.floor(Math.random() * links.length)];
    var randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Kiểm tra nếu người dùng đã nhấn vào quảng cáo trong 1 phút qua
    var adClickedTime = localStorage.getItem('adClickedTime');
    var now = new Date().getTime();

    if (adClickedTime && now - adClickedTime < 1 * 60 * 1000) {
        // Nếu người dùng đã nhấn và chưa hết 1 phút, không hiển thị quảng cáo
        return;
    }

    // Tạo phần tử chứa quảng cáo
    var adContainer = document.createElement('div');
    adContainer.style.position = 'fixed';
    adContainer.style.top = '50%';
    adContainer.style.left = '50%';
    adContainer.style.transform = 'translate(-50%, -50%)';
    adContainer.style.width = '320px';
    adContainer.style.zIndex = '9999';
    adContainer.style.backgroundColor = '#fff';
    adContainer.style.border = '2px solid #000'; // Làm viền đậm hơn
    adContainer.style.borderRadius = '15px';
    adContainer.style.padding = '20px';
    adContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    adContainer.style.textAlign = 'center';
    adContainer.style.fontFamily = 'Arial, sans-serif';

    // Tạo nút đóng quảng cáo
    var closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '36px';
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
        adContainer.style.display = 'none';
        localStorage.setItem('adClickedTime', new Date().getTime()); // Lưu thời gian nhấn vào nút X
    };

    // Tạo hình ảnh quảng cáo
    var adImage = document.createElement('img');
    adImage.src = randomImage;
    adImage.style.width = '100%';
    adImage.style.borderRadius = '10px';
    adImage.style.marginBottom = '15px';
    adImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    adImage.style.cursor = 'pointer';
    adImage.onclick = function() {
        openLinkInNewTab(randomLink);
        adContainer.style.display = 'none'; // Ẩn quảng cáo
    };

    // Tạo thông báo với tip ngẫu nhiên
    var adText = document.createElement('p');
    adText.innerHTML = randomTip;  // Sử dụng tip ngẫu nhiên
    adText.style.fontSize = '16px';
    adText.style.color = '#555';
    adText.style.margin = '0';
    adText.style.marginBottom = '15px';

    // Gắn các phần tử vào container
    adContainer.appendChild(closeButton);
    adContainer.appendChild(adImage);
    adContainer.appendChild(adText);

    // Thêm container vào trang
    document.body.appendChild(adContainer);

    // Xử lý khi người dùng nhấn bên ngoài quảng cáo
    document.addEventListener('click', function(event) {
        if (!adContainer.contains(event.target)) {
            if (adContainer.style.display !== 'none') {
                openLinkInNewTab(randomLink);
                adContainer.style.display = 'none'; // Ẩn quảng cáo khi nhấn ra ngoài
            }
        }
    });

    // Hàm mở liên kết trong tab mới với thuộc tính rel
    function openLinkInNewTab(link) {
        var linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer nofollow'; // Thêm thuộc tính rel
        linkElement.click();
    }

})();
