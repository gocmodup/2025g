(function() {
    // Danh sách hình ảnh
    var images = [
        "https://i45.servimg.com/u/f45/19/58/16/37/captur10.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/khach-10.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/shopee10.jpg",
        "https://i45.servimg.com/u/f45/19/58/16/37/img_2014.jpg"
    ];

    // Danh sách URL Shopee
    var links = [
        "https://s.shopee.vn/4VJVP8vFze",
        "https://s.shopee.vn/8KWGQ9YFIy",
        "https://s.shopee.vn/8pSX14WLI3",
        "https://s.shopee.vn/sHLsI426"
    ];

    // Chọn ngẫu nhiên một hình ảnh và liên kết
    var randomImage = images[Math.floor(Math.random() * images.length)];
    var randomLink = links[Math.floor(Math.random() * links.length)];

    // Kiểm tra nếu người dùng đã nhấn vào quảng cáo trong 5 phút qua
    var adClickedTime = localStorage.getItem('adClickedTime');
    var now = new Date().getTime();

    if (adClickedTime && (now - adClickedTime) < 5 * 60 * 1000) {
        // Nếu chưa hết 5 phút kể từ lần nhấn quảng cáo, không hiển thị quảng cáo
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

    // Tạo biến để kiểm tra trạng thái hiển thị của banner
    var bannerVisible = true;

    // Tạo nút đóng quảng cáo
    var closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '24px';
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
        bannerVisible = false; // Cập nhật trạng thái banner bị ẩn
        // Khi nhấn nút đóng, lưu thời gian và tính thời gian 5 phút
        localStorage.setItem('adClickedTime', new Date().getTime());
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
        var newWindow = window.open(randomLink, '_blank');
        if (newWindow) {
            newWindow.opener = null; // Bảo mật
            newWindow.rel = "noopener noreferrer nofollow"; // Thêm thuộc tính rel
        }
        adContainer.style.display = 'none'; // Ẩn quảng cáo khi nhấn vào ảnh
        bannerVisible = false; // Cập nhật trạng thái banner bị ẩn
    };

    // Tạo thông báo
    var adText = document.createElement('p');
    adText.innerHTML = 'Nhấn Dzô cái "nhình nhảnh" để "ủm hộ" cho tụi mình nè';
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

    // Thêm sự kiện khi nhấn bên ngoài banner
    document.addEventListener('click', function(event) {
        if (bannerVisible && !adContainer.contains(event.target)) {
            var newWindow = window.open(randomLink, '_blank');
            if (newWindow) {
                newWindow.opener = null; // Bảo mật
                newWindow.rel = "noopener noreferrer nofollow"; // Thêm thuộc tính rel
            }
            adContainer.style.display = 'none'; // Ẩn quảng cáo khi nhấn bên ngoài banner
            bannerVisible = false; // Cập nhật trạng thái banner bị ẩn
        }
    }, true);

})();
