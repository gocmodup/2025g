!function(e, t, n) {
    var a = 78, 
        o = 200, 
        i = 1, 
        s = 1e3 * parseFloat(900), 
        r = t.currentScript, 
        c = r.parentElement;
    
    if (c) {
        r.remove();
        c.setAttribute("data-aanetwork-codeId", a);
        c.classList.add("aanetwork-ads-box", "aanetwork-type-pto");

        const jsonUrl = 'https://raw.githubusercontent.com/gocmodup/2025g/main/shopee'; // Đặt URL JSON của bạn ở đây
        
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dữ liệu JSON:', data); // Kiểm tra xem dữ liệu JSON có tải thành công không
                Array.prototype.itemRandom = function() {
                    return this[Math.floor(Math.random() * this.length)];
                };
                var d = Object.values(data).itemRandom(); // Chọn ngẫu nhiên một mục từ JSON
                if (d) {
                    var p = d.url, 
                        m = d.img, 
                        u = Object.assign(t.createElement("div"), {
                            className: "aanetwork-pto-box", 
                            style: "transition: all .3s ease;width:100%;position:fixed;inset:0;display:none;justify-content:center;align-items:center;background:#00000066;z-index:9999997;overflow:hidden;"
                        }), 
                        _ = Object.assign(t.createElement("div"), {
                            className: "aanetwork-pto-box-bg", 
                            style: "transition: all 0.3s ease 0s; width: 100%; position: fixed; inset: 0px; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.4); z-index: 99999998; overflow: hidden;"
                        }), 
                        f = Object.assign(t.createElement("div"), {
                            className: "aanetwork-pto-box-content", 
                            style: "transition: all .3s ease;position:relative;bottom:9999999999px;top:0;flex: 0 1 auto;width:80%;max-width:400px;max-height:100%;z-index:99999999"
                        }), 
                        h = Object.assign(t.createElement("div"), {
                            className: "aanetwork-pto-" + a, 
                            style: "display:block;"
                        }), 
                        g = Object.assign(t.createElement("span"), {
                            className: "aanetwork-pto-btnclose-" + a, 
                            style: `cursor: pointer; user-select: none; line-height: 35px;height: 20px;width:20px;display:flex;-webkit-box-align:center; align-items: center; -webkit-box-pack: center; justify-content: center; position: absolute; box-sizing: border-box; background: rgb(239, 239, 239); top: 20px; right: 20px; border-radius: 20px; border: 3px solid rgb(239, 239, 239);z-index: 1;`, 
                            innerHTML: '<svg viewBox="0 0 16 16" stroke="#EE4D2D" class="home-popup__close-button" style="height: 10px; width: 10px; stroke: rgba(0, 0, 0, 0.5); stroke-width: 3px;"><path stroke-linecap="round" d="M1.1,1.1L15.2,15.2"></path><path stroke-linecap="round" d="M15,1L0.9,15.1"></path></svg>'
                        });

                    i ? _.addEventListener("click", function() {
                        u.style.display = "none";
                        E("aa_cf_pto_time_click", Date.now(), Date.now() + s);
                        window.open(p, "popunder").blur();
                        window.focus();
                    }) : u.addEventListener("click", function() {
                        u.style.display = "none";
                    });

                    g.addEventListener("click", function() {
                        u.style.display = "none";
                    });

                    var w = Object.assign(t.createElement("a"), {
                        target: "_blank", 
                        rel: "noopener noreferrer nofollow", 
                        href: p
                    });

                    w.addEventListener("click", function() {
                        u.style.display = "none";
                        E("aa_cf_pto_time_click", Date.now(), Date.now() + s);
                    });

                    var v = Object.assign(t.createElement("img"), {
                        src: m, 
                        style: "width:100%;"
                    });

                    if (parseInt(function(e) {
                        for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), a = 0; a < n.length; a++) {
                            for (var o = n[a]; " " == o.charAt(0);) o = o.substring(1);
                            if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
                        }
                        return ""
                    }("aa_cf_pto_time_click"))) u.remove();
                    else {
                        var y = document.body || document.documentElement || document.head;
                        f.append(g);
                        f.append(h);
                        i && u.append(_);
                        u.append(f);
                        w.append(v);
                        h.append(w);
                        c.append(u);
                        y.append(c);
                        setTimeout(function() {
                            u.style.display = "flex"
                        }, o);
                        setTimeout(function() {
                            f.style.top = "-1vh"
                        }, o + 10)
                    }

                    var b = `#atn-35f4a8d465e6e1edc05f3d8ab658c551 .aanetwork-pto-btnclose-78{height:25px !important;width:25px !important}`;
                    if (b) {
                        var k = t.createElement("style");
                        k.className = "aanetwork-style-ct-" + a;
                        k.innerHTML = b;
                        c.appendChild(k);
                    }
                }
            })
            .catch(error => console.error('Lỗi tải dữ liệu JSON:', error));
    } else {
        console.log("Yêu cầu thẻ script ở trong 1 thẻ bọc");
    }

    function E(e, t, n) {
        var a = new Date();
        a.setTime(n);
        var o = "expires=" + a.toUTCString();
        document.cookie = e + "=" + t + ";" + o + ";path=/"
    }
}(window, document, localStorage);

setTimeout(function() {
    let click_late_close = localStorage.getItem("aa_cf_time_click_pto_late_close") || 0;
    if (Date.now() - click_late_close < 900000) {
        let hasClassAanBox = document.querySelector(".aanetwork-pto-box");
        if (hasClassAanBox.classList.contains('aanetwork-pto-box') == true) {
            hasClassAanBox.remove();
        }
    }
}, 50);

setTimeout(function() {
    (function(dcm, cls, id) {
        let cc = dcm.querySelector('.aanetwork-pto-' + id + ' a');
        if (cc) {
            dcm.querySelector(".aanetwork-pto-btnclose-" + id).addEventListener("click", function() {
                cls.setItem("aa_cf_time_click_pto_late_close", Date.now());
            });
        }
    })(document, localStorage, 78);
}, 510);
