const API = {
  async req(method, url, body, isForm) {
    const opts = { method, credentials: "include" };
    if (body) {
      if (isForm) {
        opts.body = body;
      } else {
        opts.headers = { "Content-Type": "application/json" };
        opts.body = JSON.stringify(body);
      }
    }
    const res = await fetch(url, opts);
    let data = {};
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) throw new Error(data.error || "Xatolik yuz berdi");
    return data;
  },
  get(url) { return this.req("GET", url); },
  post(url, body, isForm) { return this.req("POST", url, body, isForm); },
  patch(url, body) { return this.req("PATCH", url, body); },
  delete(url) { return this.req("DELETE", url); },
};

const Theme = {
  init() {
    const saved = localStorage.getItem("sc_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
  },
  toggle() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sc_theme", next);
    API.patch("/api/users/me", { theme: next }).catch(() => {});
    return next;
  },
};
Theme.init();

function showToast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}

function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
