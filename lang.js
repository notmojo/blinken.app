// Italiano o inglese: #it/#en nell'indirizzo, poi la scelta salvata, poi la lingua del browser.
(function () {
  var root = document.documentElement;
  function valid(l) { return l === "it" || l === "en"; }
  function pick() {
    var h = location.hash.slice(1);
    if (valid(h)) return h;
    try { var s = localStorage.getItem("lang"); if (valid(s)) return s; } catch (e) {}
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).toLowerCase().slice(0, 2);
      if (valid(l)) return l;
    }
    return "en";
  }
  function set(l, save) {
    root.lang = l;
    root.setAttribute("data-lang", l);
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
    if (save) try { localStorage.setItem("lang", l); } catch (e) {}
  }
  set(pick());
  addEventListener("hashchange", function () {
    var h = location.hash.slice(1);
    if (valid(h)) set(h, true);
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set-lang]");
    if (!b) return;
    e.preventDefault();
    var l = b.getAttribute("data-set-lang");
    set(l, true);
    history.replaceState(null, "", "#" + l);
  });
})();
