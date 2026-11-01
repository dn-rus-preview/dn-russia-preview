// TODO(Дмитрий): серверный приём заявок. Сейчас письмо открывается в почтовой программе.
var DEALER_EMAIL = "info@dn-russia.ru";
var DEALER_PHONE_TEXT = "8 (800) 505-32-95";
var DEALER_PHONE_TEL = "+78005053295";

document.querySelectorAll(".propic-swiper").forEach(function (el) {
  if (window.getComputedStyle(el).display !== "none") return;
  var box = el.closest(".propic");
  var area = el.closest(".visual-area");
  if (box) box.style.display = "none";
  if (area) {
    area.style.height = "auto";
    var info = area.querySelector(".proinfo");
    if (info) {
      info.style.width = "min(760px, 100%)";
      info.style.margin = "0 auto";
    }
  }
});

document.querySelectorAll(".burger").forEach(function (b) {
  b.addEventListener("click", function () {
    var nav = document.querySelector("nav");
    if (nav) nav.classList.toggle("open");
  });
});

document.querySelectorAll(".popupallmenu .dep1 > li > a, .popupallmenu .dep2 > li > a").forEach(function (a) {
  a.addEventListener("click", function (e) {
    if (window.innerWidth > 1024) return;
    var sub = a.parentElement.querySelector(":scope > ul");
    if (!sub) return;
    e.preventDefault();
    a.parentElement.classList.toggle("open");
  });
});

document.querySelectorAll("form.req").forEach(function (f) {
  f.querySelectorAll("input, textarea, select").forEach(function (el) {
    if (el.id) return;
    var key = (el.getAttribute("name") || "field").replace(/\s+/g, "-");
    el.id = "f-" + key + "-" + Math.random().toString(36).slice(2, 6);
    var label = document.createElement("label");
    label.className = "dn-label";
    label.setAttribute("for", el.id);
    label.textContent = el.getAttribute("placeholder") || el.getAttribute("name") || "";
    el.parentNode.insertBefore(label, el);
    var name = el.getAttribute("name") || "";
    if (name === "Имя") el.setAttribute("autocomplete", "name");
    if (name === "Телефон") {
      el.setAttribute("type", "tel");
      el.setAttribute("autocomplete", "tel");
      el.setAttribute("inputmode", "tel");
    }
    if (name === "Email") el.setAttribute("autocomplete", "email");
  });
  if (!f.querySelector("[name='Согласие']")) {
    var box = document.createElement("label");
    box.className = "dn-consent";
    box.innerHTML = '<input type="checkbox" name="Согласие" required> Согласен на <a href="' + privacyHref() + '">обработку персональных данных</a>';
    var btn = f.querySelector("button");
    f.insertBefore(box, btn || null);
  }
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!f.querySelector("[name='Согласие']:checked")) {
      showLead("Поставьте галочку согласия на обработку персональных данных.");
      return;
    }
    var body = [];
    new FormData(f).forEach(function (v, k) { body.push(k + ": " + v); });
    var note = document.getElementById("lead-status");
    if (!note) {
      note = document.createElement("p");
      note.id = "lead-status";
      note.className = "note";
      f.appendChild(note);
    }
    note.textContent = "Если почтовая программа не открылась, напишите на " + DEALER_EMAIL + " или позвоните " + DEALER_PHONE_TEXT + ".";
    location.href = "mailto:" + DEALER_EMAIL + "?subject=" + encodeURIComponent("Заявка с сайта dn-russia.ru") + "&body=" + encodeURIComponent(body.join("\n"));
  });
});

function privacyHref() {
  var logo = document.querySelector("#header .logo a");
  var p = logo ? (logo.getAttribute("href") || "").replace(/index\.html$/, "") : "";
  return p + "company/privacy.html";
}

function showLead(text) {
  var note = document.getElementById("lead-status");
  if (!note) return;
  note.textContent = text;
}

document.addEventListener("click", function (e) {
  var b = e.target.closest("a, button");
  if (!b) return;
  var href = b.getAttribute("href") || "";
  var oc = b.getAttribute("onclick") || "";
  if (href.indexOf("#request") < 0 && oc.indexOf("#request") < 0) return;
  var nameEl = document.getElementById("prdtNm");
  var input = document.querySelector("form.req input[name='Модель']");
  if (nameEl && input) input.value = nameEl.textContent.replace(/\s+/g, " ").trim();
});

(function () {
  var q = new URLSearchParams(location.search).get("model");
  if (!q) return;
  var input = document.querySelector("form.req input[name='Модель']");
  if (input) input.value = q;
})();

setTimeout(function () {
  document.querySelectorAll(".swiper-slide-duplicate").forEach(function (s) {
    s.setAttribute("aria-hidden", "true");
  });
}, 1200);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".popupallmenu a, #header a").forEach(function (a) {
    var node = null;
    for (var i = 0; i < a.childNodes.length; i++) {
      if (a.childNodes[i].nodeType === 3 && a.childNodes[i].nodeValue.trim()) node = a.childNodes[i];
    }
    if (!node) return;
    var t = node.nodeValue.trim();
    if (t.length > 3 && t === t.toUpperCase() && /[А-ЯA-Z]/.test(t)) {
      node.nodeValue = node.nodeValue.replace(t, t.charAt(0) + t.slice(1).toLowerCase());
    }
  });
});

document.querySelectorAll(".btn-help, .btn-fav, .btn-top, .skip").forEach(function (el) {
  var t = (el.getAttribute("aria-label") || el.textContent || "").trim();
  if (/help/i.test(t)) el.setAttribute("aria-label", "Задать вопрос");
  if (/fav/i.test(t)) el.setAttribute("aria-label", "Избранное");
  if (/top/i.test(t)) el.setAttribute("aria-label", "Наверх");
});
