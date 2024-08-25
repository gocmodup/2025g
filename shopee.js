// Lấy dữ liệu quảng cáo từ file data.json
fetch('https://raw.githubusercontent.com/gocmodup/2025g/main/shopee')
  .then(response => response.json())
  .then(data => {
    const banner = document.getElementById('banner');
    const closeBtn = banner.querySelector('.close');

    // Hàm hiển thị banner ngẫu nhiên ở giữa màn hình
    function showBanner() {
      const randomAd = data[Math.floor(Math.random() * data.length)];
      banner.querySelector('img').src = randomAd.image;
      banner.querySelector('a').href = randomAd.link;
      banner.style.display = 'block';
    }

    // Kiểm tra và hiển thị banner định kỳ
    setInterval(() => {
      if (shouldShowBanner()) {
        showBanner();
      }
    }, 15 * 60 * 1000 + Math.random() * 60 * 1000); // 15 phút +/- 1 phút

    // Hàm kiểm tra xem đã đến lúc hiển thị lại banner chưa
    function shouldShowBanner() {
      const lastShown = localStorage.getItem('lastShown');
      if (!lastShown) return true; // Nếu chưa từng hiển thị, thì hiển thị
      const now = Date.now();
      return now - lastShown > 15 * 60 * 1000; // 15 phút
    }

    // Đóng banner khi click vào nút đóng
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  });
