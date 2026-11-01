function bootDnRussia() {
  function prefix() {
    var logo = document.querySelector("#header .logo a");
    if (!logo) return "";
    return (logo.getAttribute("href") || "").replace(/index\.html$/, "");
  }

  var hideText = {
    "DN Solutions Legacy": 1,
    "CI": 1,
    "ОБЪЯВЛЕНИЯ": 1,
    "УСТОЙЧИВОЕ РАЗВИТИЕ": 1,
    "ESG": 1,
    "Экология": 1,
    "Социальная ответственность": 1,
    "Корпоративное управление": 1,
    "ГЛОБАЛЬНАЯ СЕТЬ": 1,
    "Сервисный центр": 1,
    "Офисы DN Solutions": 1,
    "ПРОЕКТЫ": 1,
    "УПРАВЛЕНИЕ ЗАПЧАСТЯМИ": 1,
    "Voluntary Export Management Message": 1,
    "Declaration of Voluntary Export Implementation": 1,
    "ПЛОЩАДКИ": 1
  };

  var p = prefix();
  document.querySelectorAll("a").forEach(function (a) {
    var t = (a.textContent || "").replace(/\s+/g, " ").trim();
    if (hideText[t]) {
      var li = a.closest("li");
      if (li && li.parentElement) li.parentElement.removeChild(li);
      return;
    }
    if (t === "О DN SOLUTIONS" || t === "DN Solutions") {
      a.textContent = "О ДН-Рус";
      a.setAttribute("href", p + "company/about.html");
    } else if (t === "Почему DN Solutions?") {
      a.textContent = "Почему ДН-Рус";
      a.setAttribute("href", p + "company/about.html");
    } else if (t === "Дилеры") {
      a.textContent = "ДН-Рус";
      a.setAttribute("href", p + "company/dealer.html");
    }
  });

  document.querySelectorAll(".dep1 > li").forEach(function (li) {
    var top = li.querySelector(":scope > a");
    if (!top || top.textContent.replace(/\s+/g, " ").trim().toUpperCase() !== "КОМПАНИЯ") return;
    var ul = li.querySelector(".dep2");
    if (!ul || ul.dataset.dnru) return;
    ul.dataset.dnru = "1";
    ul.insertAdjacentHTML(
      "afterbegin",
      '<li><a href="' + p + 'company/dealer.html">Дилер в России</a></li>' +
      '<li><a href="' + p + 'stock.html">В наличии</a></li>' +
      '<li><a href="' + p + 'contacts.html">Контакты</a></li>' +
      '<li><a href="tel:+78005053295">8 (800) 505-32-95</a></li>' +
      '<li><a href="mailto:info@dn-russia.ru">info@dn-russia.ru</a></li>'
    );
  });
}
function bootSpecFilter() {
  if (!window.jQuery) return;
  var $ = window.jQuery;
  var index = null;

  function prefix() {
    var logo = document.querySelector("#header .logo a");
    if (!logo) return "";
    return (logo.getAttribute("href") || "").replace(/index\.html$/, "");
  }

  var pfx = prefix();
  $(document).off("click", "input[name='gnbChuckData']");
  $(document).off("click", "input[name='gnbChuckData2']");

  function render(list, metric) {
    var shown = list.slice(0, 80);
    var html = "";
    $("#gnbChuckDataAll").hide();
    if (!shown.length) {
      $("#gnbPrdtList").empty();
      $(".gnbNodata").show();
      $(".gnbNodata .txt").text("Нет станков в этом диапазоне");
      return;
    }
    $(".gnbNodata").hide();
    shown.forEach(function (item) {
      html += '<li><a href="' + pfx + item.path + '">';
      if (item.img) html += '<figure><img src="' + pfx + item.img + '" alt=""></figure>';
      html += '<div class="name">' + item.name + '</div><div class="info"><dl>';
      (item.rows || []).forEach(function (row) {
        html += "<dt>" + row.name + "</dt>";
        html += '<dd class="gnbSpecType1"' + (metric ? "" : ' style="display:none"') + ">" + (row.m || "") + "</dd>";
        html += '<dd class="gnbSpecType2"' + (metric ? ' style="display:none"' : "") + ">" + (row.i || row.m || "") + "</dd>";
      });
      html += "</dl></div></a></li>";
    });
    $("#gnbPrdtList").html(html);
    var title = "Подбор по характеристикам — " + list.length;
    if (list.length > shown.length) title = "Подбор по характеристикам — показаны " + shown.length + " из " + list.length;
    $(".pro-spec .list-area > .tit").first().text(title);
  }

  function apply(metric) {
    if (!index) return;
    var cat = $("#schCtgryCd1").val() || "D101";
    var pack = index[cat];
    if (!pack) {
      render([], metric);
      return;
    }
    var ranges = [];
    $(metric ? ".slideType1" : ".slideType2").each(function () {
      var $s = $(this);
      if (!$s.hasClass("ui-slider")) return;
      ranges.push({
        code: $s.attr("data-gnbschspeccd"),
        min: Number($s.slider("values", 0)),
        max: Number($s.slider("values", 1)),
        full: Number($s.slider("values", 0)) <= Number($s.slider("option", "min")) &&
          Number($s.slider("values", 1)) >= Number($s.slider("option", "max"))
      });
    });
    var chuck = $("input[name='" + (metric ? "gnbChuckData" : "gnbChuckData2") + "']:checked").val() || "";
    var list = pack.products.filter(function (item) {
      if (chuck && (item.chuck || []).indexOf(String(chuck)) < 0) return false;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (range.full) continue;
        var spec = item.specs[range.code];
        var value = spec ? (metric ? spec.m : (spec.i != null ? spec.i : spec.m)) : null;
        if (value == null || value < range.min || value > range.max) return false;
      }
      return true;
    });
    render(list, metric);
  }

  function sliderOpts(item, metric) {
    var min = Number(metric ? item.min : item.min2);
    var max = Number(metric ? item.max : item.max2);
    var unit = metric ? item.unit : item.unit2;
    var step = (max - min) > 40 ? 1 : 0.1;
    return {
      range: true,
      min: min,
      max: max,
      step: step,
      values: [min, max],
      create: function () {
        var $t = $(this);
        $t.prev(".values").html($t.slider("values", 0) + " ~ " + $t.slider("values", 1) + '<span class="txt-unit">' + unit + "</span>");
        $t.prev(".values").attr("data-typeNm", unit);
      },
      slide: function (event, ui) {
        var $t = $(this);
        $t.prev(".values").html(ui.values[0] + " ~ " + ui.values[1] + '<span class="txt-unit">' + ($t.prev(".values").attr("data-typeNm") || "") + "</span>");
        apply(metric);
      }
    };
  }

  function draw() {
    var cat = $("#schCtgryCd1").val() || "D101";
    var pack = (index && index[cat]) || { sliders: [], chucks: [], products: [] };
    var html = "";
    if (cat === "D101" && pack.chucks && pack.chucks.length) {
      $("#chuckDiv").css("display", "");
      var chuckHtml = '<label class="gnbSpecType1"><input type="radio" name="gnbChuckData" value="" checked><span>Все</span></label>';
      chuckHtml += '<label class="gnbSpecType2" style="display:none"><input type="radio" name="gnbChuckData2" value="" checked><span>Все</span></label>';
      pack.chucks.forEach(function (size) {
        chuckHtml += '<label class="gnbSpecType1"><input type="radio" name="gnbChuckData" value="' + size + '"><span>' + size + ' "</span></label>';
        chuckHtml += '<label class="gnbSpecType2" style="display:none"><input type="radio" name="gnbChuckData2" value="' + size + '"><span>' + size + ' "</span></label>';
      });
      $("#chuckList").html(chuckHtml);
    } else {
      $("#chuckDiv").css("display", "none");
      $("#chuckList").empty();
    }
    pack.sliders.forEach(function (item, i) {
      html += '<div class="box gnbSpecType1"><div class="form-slider"><strong class="tit">' + item.name + '<span class="txt-unit">(' + item.unit + ")</span></strong>";
      html += '<div class="values"></div><div class="slider spec-slider' + (i + 1) + ' slideType1" data-gnbschspeccd="' + item.code + '"></div></div></div>';
      html += '<div class="box gnbSpecType2" style="display:none"><div class="form-slider"><strong class="tit">' + item.name + '<span class="txt-unit">(' + item.unit2 + ")</span></strong>";
      html += '<div class="values"></div><div class="slider spec-slider-I' + (i + 1) + ' slideType2" data-gnbschspeccd="' + item.code + '"></div></div></div>';
    });
    $("#gnbSchBox").empty().append(html);
    pack.sliders.forEach(function (item, i) {
      $("#header .spec-slider" + (i + 1)).slider(sliderOpts(item, true));
      $("#header .spec-slider-I" + (i + 1)).slider(sliderOpts(item, false));
    });
    apply(true);
  }

  window.goSpecView = function (e) {
    if ($("#schCtgryCd1").val() === "soft") return false;
    if (!$("#schCtgryCd1").val()) $("#schCtgryCd1").val("D101");
    $("input:radio[name='gnbSpecType'][value='A']").prop("checked", true);
    if (window.fn) {
      fn.removeActive($(e).prev());
      fn.addActive(e);
    }
    function ready() {
      draw();
    }
    if (index) {
      ready();
      return false;
    }
    fetch(pfx + "assets/data/spec-index.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        index = data;
        ready();
      })
      .catch(function () {
        $(".gnbNodata").show();
        $(".gnbNodata .txt").text("Не удалось загрузить характеристики каталога");
      });
    return false;
  };

  $(document).on("click.dnru", "input[name='gnbChuckData']", function () { apply(true); });
  $(document).on("click.dnru", "input[name='gnbChuckData2']", function () { apply(false); });

  fetch(pfx + "assets/data/spec-index.json")
    .then(function (res) { return res.json(); })
    .then(function (data) { index = data; })
    .catch(function () {});
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    bootDnRussia();
    bootSpecFilter();
  });
} else {
  bootDnRussia();
  bootSpecFilter();
}
