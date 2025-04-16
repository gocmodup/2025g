<script>
(function () {
    const targetUrl = "https://t.me/ghostgmb0"; // ← Link cần chuyển đến

    // Tạo container banner
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.zIndex = '9999';
    banner.style.width = '300px';
    banner.style.height = '180px'; // ← đặt chiều cao cố định
    banner.style.background = '#fff';
    banner.style.border = '2px solid #000';
    banner.style.borderRadius = '10px';
    banner.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    banner.style.cursor = 'pointer';
    banner.style.overflow = 'hidden';

    // Hình ảnh banner
    const img = document.createElement('img');
    img.src = 'https://i45.servimg.com/u/f45/19/58/16/37/chatgp10.png'; // ← Đổi link ảnh tại đây
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover'; // hoặc 'contain' nếu muốn không bị cắt ảnh
    img.style.display = 'block';

    // Nút đóng (X)
    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.style.position = 'absolute';
    close.style.top = '5px';
    close.style.right = '10px';
    close.style.fontSize = '24px';
    close.style.color = '#888';
    close.style.cursor = 'pointer';
    close.style.zIndex = '10000';

    // Gắn các phần tử
    banner.appendChild(img);
    banner.appendChild(close);
    document.body.appendChild(banner);

    // Click vào banner (trừ nút X) thì mở link
    banner.addEventListener('click', function (e) {
        if (e.target !== close) {
            window.open(targetUrl, '_blank');
            banner.remove();
        }
    });

    // Click vào nút X thì chỉ đóng banner
    close.addEventListener('click', function (e) {
        e.stopPropagation();
        banner.remove();
    });
})();
</script>
