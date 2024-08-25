// Kiểm tra nếu document.write() hoạt động
var banners = [
  {
    src: "https://i.upanh.org/2024/08/26/10010994843d1ae219dfae70cb-34989a380c05c803e.jpeg",
    href: "https://s.shopee.vn/8zluBZigxc"
  },
  {
    src: "https://i.upanh.org/2024/08/26/1001099486916768d40a607abb-12721062a23f09207.jpeg",
    href: "https://s.shopee.vn/4AgeZOqEDr"
  },
  {
    src: "https://i.upanh.org/2024/08/26/1001099487d60cff77c02e0ae6-1ce41f1d5ca1982ff.jpeg",
    href: "https://s.shopee.vn/6fNzXWEgsZ"
  },
  {
    src: "https://i.upanh.org/2024/08/26/10010994884eb3bd45e623d9bb-1ec26da0ab694303b.jpeg",
    href: "https://s.shopee.vn/1qIjmayhWL"
  }
];

var banner = banners[Math.floor(Math.random() * banners.length)];

document.write('<a href="' + banner.href + '" target="_blank"><img src="' + banner.src + '" alt="Banner"></a>');
