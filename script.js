/* ====== CÀI ĐẶT: bạn sửa phần này ====== */
const CONFIG = {
  appsScriptUrl:
    "https://script.google.com/macros/s/AKfycbxoqS1qAUj2a_jjcBBDKFS1TTyOmVij-BUFd3elmrxDP9oLxA7OetMUh1GqpNcrOrE1/exec", // link kết thúc bằng /exec
  phone: "0900000000",
  zalo: "0900000000",
  email: "nguyenchung15575@gmail.com",
};

/* Danh mục: tên nhóm -> các nhóm con (cấu trúc tham khảo banlinhkien.com) */
const CATS = {
  "Vi Điều Khiển - KIT Phát Triển": [
    "Arduino",
    "WiFi ESP",
    "Máy Tính Nhúng",
    "STM",
    "AVR",
  ],
  "Cảm Biến": [
    "Nhiệt Độ, Độ Ẩm",
    "Khoảng Cách",
    "Khí",
    "Ánh Sáng, UV",
    "Chuyển Động",
  ],
  Module: [
    "Module Nguồn",
    "Module Relay",
    "Module Wifi",
    "Module Điều Khiển Động Cơ",
  ],
  "Màn Hình - LCD": ["OLED", "LCD Text", "TFT"],
  "LED - Chiếu Sáng": ["LED Đơn", "LED Matrix", "LED Dây"],
  "Cơ Điện Tử": ["Động Cơ", "Relay", "Công Tắc", "Nút Nhấn"],
  Nguồn: ["IC Nguồn", "Module Nguồn", "Adapter"],
  PIN: ["PIN Lithium", "Sạc & Bảo Vệ PIN"],
  "Tool, Thiết Bị, Phụ Kiện": [
    "Trạm Hàn",
    "Đồng Hồ Vạn Năng",
    "Kìm",
    "Thiếc Hàn",
  ],
  Connectors: ["Jump", "Header", "Terminal Blocks"],
  "Linh Kiện Thụ Động": ["Điện Trở", "Tụ Điện", "Thạch Anh"],
  "Linh Kiện Bán Dẫn": ["Diodes", "Transistors", "FET"],
  "IC Chức Năng": ["IC Logic", "IC Bộ Nhớ", "IC Giao Tiếp"],
  "Thu Phát Không Dây": ["Bluetooth", "Wifi", "RFID", "Zigbee"],
  "Robot, Mô Hình": ["Robot & DIY", "STEM"],
  "IoT - Smart Home": ["Phần Cứng IoT", "Công Tắc Thông Minh"],
};

/* Sản phẩm mẫu. tags: 'new' = hàng mới, 'hot' = bán chạy. img để trống thì hiện ô khung. */
const PRODUCTS = [
  {
    name: "Kit Arduino Uno R3",
    cat: "Vi Điều Khiển - KIT Phát Triển",
    sub: "Arduino",
    tags: ["hot"],
    img: "",
  },
  {
    name: "ESP32 DevKit V1",
    cat: "Vi Điều Khiển - KIT Phát Triển",
    sub: "WiFi ESP",
    tags: ["new", "hot"],
    img: "",
  },
  {
    name: "Raspberry Pi Pico",
    cat: "Vi Điều Khiển - KIT Phát Triển",
    sub: "Máy Tính Nhúng",
    tags: ["new"],
    img: "",
  },
  {
    name: "Cảm biến nhiệt độ độ ẩm DHT22",
    cat: "Cảm Biến",
    sub: "Nhiệt Độ, Độ Ẩm",
    tags: ["hot"],
    img: "",
  },
  {
    name: "Cảm biến siêu âm HC-SR04",
    cat: "Cảm Biến",
    sub: "Khoảng Cách",
    tags: [],
    img: "",
  },
  {
    name: "Cảm biến khí MQ-2",
    cat: "Cảm Biến",
    sub: "Khí",
    tags: ["new"],
    img: "",
  },
  {
    name: "Module relay 5V 1 kênh",
    cat: "Module",
    sub: "Module Relay",
    tags: ["hot"],
    img: "",
  },
  {
    name: "Module hạ áp LM2596",
    cat: "Module",
    sub: "Module Nguồn",
    tags: [],
    img: "",
  },
  {
    name: "Màn hình OLED 0.96 inch I2C",
    cat: "Màn Hình - LCD",
    sub: "OLED",
    tags: ["new"],
    img: "",
  },
  {
    name: "Động cơ bước NEMA 17",
    cat: "Cơ Điện Tử",
    sub: "Động Cơ",
    tags: [],
    img: "",
  },
  {
    name: "Trạm hàn 936 60W",
    cat: "Tool, Thiết Bị, Phụ Kiện",
    sub: "Trạm Hàn",
    tags: ["hot"],
    img: "",
  },
  {
    name: "Đồng hồ vạn năng số",
    cat: "Tool, Thiết Bị, Phụ Kiện",
    sub: "Đồng Hồ Vạn Năng",
    tags: [],
    img: "",
  },
  {
    name: "Dây jump đực-cái (bộ 40 sợi)",
    cat: "Connectors",
    sub: "Jump",
    tags: [],
    img: "",
  },
  {
    name: "Module Bluetooth HC-05",
    cat: "Thu Phát Không Dây",
    sub: "Bluetooth",
    tags: [],
    img: "",
  },
];
/* ====== HẾT PHẦN CÀI ĐẶT ====== */

const $ = (s) => document.querySelector(s);
const list = new Map(); // tên sản phẩm -> số lượng
const state = { cat: "", sub: "", q: "", view: "all" };
const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase();

/* ---------- Cài số điện thoại, email, Zalo ---------- */
document.querySelectorAll("[data-tel]").forEach((a) => {
  a.href = "tel:" + CONFIG.phone;
  a.textContent = a.textContent.includes("Gọi") ? "Gọi ngay" : CONFIG.phone;
});
document.querySelectorAll("[data-mail]").forEach((a) => {
  a.href = "mailto:" + CONFIG.email;
  a.textContent = CONFIG.email;
});
["#zaloBtn", "#zaloLink"].forEach((id) => {
  $(id).href = "https://zalo.me/" + CONFIG.zalo;
});

/* ---------- Sidebar danh mục ---------- */
function buildCats() {
  const ul = $("#catList");
  ul.innerHTML = "";
  Object.entries(CATS).forEach(([cat, subs]) => {
    const li = document.createElement("li");
    li.dataset.cat = cat;
    const b = document.createElement("button");
    b.className = "cat-btn";
    b.type = "button";
    b.innerHTML = "<span></span><i>›</i>";
    b.firstChild.textContent = cat;
    b.onclick = () => {
      const was =
        li.classList.contains("open") && state.cat === cat && !state.sub;
      document
        .querySelectorAll("#catList > li")
        .forEach((x) => x.classList.remove("open"));
      if (!was) li.classList.add("open");
      setFilter(cat, "");
    };
    const sub = document.createElement("ul");
    sub.className = "sub";
    subs.forEach((s) => {
      const sli = document.createElement("li");
      const sb = document.createElement("button");
      sb.type = "button";
      sb.textContent = s;
      sb.onclick = () => {
        setFilter(cat, s);
        closeSide();
      };
      sli.appendChild(sb);
      sub.appendChild(sli);
    });
    li.append(b, sub);
    ul.appendChild(li);
  });
}
function setFilter(cat, sub) {
  state.cat = cat;
  state.sub = sub;
  state.view = "all";
  state.q = "";
  $("#search").value = "";
  render();
  if (!sub) closeSide();
  $("#products").scrollIntoView();
}
function markActive() {
  document
    .querySelectorAll(".cat-btn")
    .forEach((b) =>
      b.classList.toggle(
        "on",
        b.parentNode.dataset.cat === state.cat && !state.sub,
      ),
    );
  document
    .querySelectorAll(".sub button")
    .forEach((b) =>
      b.classList.toggle(
        "on",
        state.sub === b.textContent &&
          b.closest("[data-cat]").dataset.cat === state.cat,
      ),
    );
  document
    .querySelectorAll(".nav a[data-view]")
    .forEach((a) =>
      a.classList.toggle(
        "on",
        a.dataset.view === state.view && !state.cat && !state.q,
      ),
    );
}

/* ---------- Hiển thị sản phẩm ---------- */
function card(p) {
  const el = document.createElement("article");
  el.className = "card";
  const t = document.createElement("div");
  t.className = "thumb";
  if (p.img) {
    const im = document.createElement("img");
    im.src = p.img;
    im.alt = p.name;
    im.loading = "lazy";
    t.appendChild(im);
  } else t.textContent = p.name.split(" ").slice(0, 2).join(" ");
  if (p.tags.includes("new")) {
    const g = document.createElement("span");
    g.className = "tag";
    g.textContent = "MỚI";
    t.appendChild(g);
  }
  const b = document.createElement("div");
  b.className = "body";
  const c = document.createElement("span");
  c.className = "cat-name";
  c.textContent = p.sub || p.cat;
  const h = document.createElement("h3");
  h.textContent = p.name;
  const pr = document.createElement("div");
  pr.className = "price";
  pr.textContent = "Liên hệ báo giá";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "add";
  const sync = () => {
    const n = list.get(p.name) || 0;
    btn.textContent = n
      ? "Đã thêm (" + n + ") – thêm nữa"
      : "Thêm vào danh sách";
    btn.classList.toggle("in", !!n);
  };
  sync();
  btn.onclick = () => {
    list.set(p.name, (list.get(p.name) || 0) + 1);
    sync();
    renderList();
  };
  b.append(c, h, pr, btn);
  el.append(t, b);
  return el;
}
function fill(box, arr) {
  box.innerHTML = "";
  if (!arr.length) {
    const m = document.createElement("p");
    m.className = "nores";
    m.textContent =
      "Không tìm thấy sản phẩm phù hợp. Bạn thử từ khóa khác hoặc ghi món cần mua vào phần ghi chú khi gửi yêu cầu.";
    box.appendChild(m);
    return;
  }
  arr.forEach((p) => box.appendChild(card(p)));
}
function render() {
  const q = norm(state.q);
  let arr = PRODUCTS.filter(
    (p) =>
      (!state.cat || p.cat === state.cat) &&
      (!state.sub || p.sub === state.sub) &&
      (state.view === "all" || p.tags.includes(state.view)) &&
      (!q || norm(p.name + " " + p.cat + " " + p.sub).includes(q)),
  );
  $("#title").textContent = state.q
    ? "Kết quả cho “" + state.q + "”"
    : state.sub ||
      state.cat ||
      { all: "Tất cả sản phẩm", new: "Hàng mới về", hot: "Bán chạy" }[
        state.view
      ];
  $("#resCount").textContent = arr.length + " sản phẩm";
  fill($("#grid"), arr);
  const showNew = !state.cat && !state.q && state.view === "all";
  $("#newSec").hidden = !showNew;
  if (showNew)
    fill(
      $("#newGrid"),
      PRODUCTS.filter((p) => p.tags.includes("new")).slice(0, 4),
    );
  markActive();
}

/* ---------- Tìm kiếm + menu trên ---------- */
$("#searchForm").onsubmit = (e) => {
  e.preventDefault();
  state.q = $("#search").value.trim();
  state.cat = "";
  state.sub = "";
  state.view = "all";
  render();
  $("#products").scrollIntoView();
};
document.querySelectorAll(".nav a[data-view]").forEach((a) => {
  a.onclick = () => {
    state.view = a.dataset.view;
    state.cat = "";
    state.sub = "";
    state.q = "";
    $("#search").value = "";
    render();
  };
});
const closeSide = () => {
  $("#side").classList.remove("open");
  if (!$("#drawer").classList.contains("open")) $("#overlay").hidden = true;
};
$("#menuBtn").onclick = () => {
  $("#side").classList.add("open");
  $("#overlay").hidden = false;
};

/* ---------- Ngăn kéo danh sách báo giá ---------- */
const drawer = $("#drawer");
function openList() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
}
function closeList() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  $("#overlay").hidden = true;
  $("#side").classList.remove("open");
}
$("#openList").onclick = openList;
$("#closeList").onclick = closeList;
$("#overlay").onclick = closeList;
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeList();
});

function renderList() {
  const ul = $("#items");
  ul.innerHTML = "";
  let total = 0;
  list.forEach((qty, name) => {
    total += qty;
    const li = document.createElement("li");
    const nm = document.createElement("span");
    nm.className = "nm";
    nm.textContent = name;
    const q = document.createElement("div");
    q.className = "qty";
    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Giảm");
    const inp = document.createElement("input");
    inp.type = "number";
    inp.min = "1";
    inp.value = qty;
    inp.setAttribute("aria-label", "Số lượng " + name);
    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Tăng");
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "rm";
    rm.textContent = "✕";
    rm.setAttribute("aria-label", "Xóa " + name);
    const set = (n) => {
      n = Math.max(1, Math.min(99999, parseInt(n, 10) || 1));
      list.set(name, n);
      renderList();
      render();
    };
    minus.onclick = () => set(qty - 1);
    plus.onclick = () => set(qty + 1);
    inp.onchange = () => set(inp.value);
    rm.onclick = () => {
      list.delete(name);
      renderList();
      render();
    };
    q.append(minus, inp, plus);
    li.append(nm, q, rm);
    ul.appendChild(li);
  });
  $("#count").textContent = list.size;
  $("#empty").hidden = list.size > 0;
}

/* ---------- Gửi yêu cầu về Apps Script (ghi Google Sheets + email) ---------- */
$("#quote").onsubmit = async (e) => {
  e.preventDefault();
  const f = e.target,
    msg = $("#msg"),
    btn = $("#send");
  const say = (t, c) => {
    msg.textContent = t;
    msg.className = "msg " + (c || "");
  };
  f.querySelectorAll("input, textarea").forEach((x) =>
    x.classList.remove("bad"),
  );
  const phone = f.phone.value.replace(/[\s.\-]/g, "");
  if (!list.size && !f.note.value.trim())
    return say(
      "Hãy thêm ít nhất một sản phẩm, hoặc ghi món cần mua vào phần ghi chú.",
      "err",
    );
  if (!f.name.value.trim()) {
    f.name.classList.add("bad");
    return say("Vui lòng nhập họ tên.", "err");
  }
  if (!/^(0|\+84)\d{8,10}$/.test(phone)) {
    f.phone.classList.add("bad");
    return say("Số điện thoại chưa đúng, ví dụ 0912345678.", "err");
  }
  if (!/^https:\/\/script\.google\.com\//.test(CONFIG.appsScriptUrl))
    return say("Chưa cài đặt link Apps Script trong script.js.", "err");

  const products = [...list].map(([n, q]) => n + " x" + q).join("; ");
  const data = {
    name: f.name.value.trim().slice(0, 100),
    phone,
    product: products.slice(0, 1500),
    note: ("[" + f.channel.value + "] " + f.note.value.trim()).slice(0, 1000),
    website: f.website.value,
  };
  btn.disabled = true;
  say("Đang gửi...");
  try {
    await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    say("Đã gửi! LinhkienHn sẽ liên hệ lại với bạn sớm.", "ok");
    list.clear();
    f.reset();
    renderList();
    render();
  } catch (err) {
    say(
      "Gửi chưa được. Vui lòng gọi " + CONFIG.phone + " để được hỗ trợ.",
      "err",
    );
  }
  btn.disabled = false;
};

buildCats();
renderList();
render();
