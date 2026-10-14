(function () {
  // Mobile menu
  var btn = document.querySelector(".menu");
  var menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Keep the masthead date current (the page is built ahead of time)
  var opts = { timeZone: "Asia/Kolkata" };
  var today = document.querySelector("[data-today]");
  var wd = document.querySelector("[data-today-weekday]");
  try {
    if (today) today.textContent = new Date().toLocaleDateString("en-IN", Object.assign({ day: "numeric", month: "long", year: "numeric" }, opts));
    if (wd) wd.textContent = new Date().toLocaleDateString("en-IN", Object.assign({ weekday: "long" }, opts));
  } catch (e) {}

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  // Copy link / native share
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var box = b.closest(".share");
      var url = box.getAttribute("data-share-url") || location.href;
      var title = box.getAttribute("data-share-title") || document.title;
      if (navigator.share && matchMedia("(max-width:760px)").matches) {
        navigator.share({ title: title, url: url }).catch(function () {});
        return;
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () { toast("Link copied"); }, function () { prompt("Copy this link:", url); });
      } else {
        prompt("Copy this link:", url);
      }
    });
  });

  // Search page
  var results = document.getElementById("search-results");
  if (results) {
    var q = new URLSearchParams(location.search).get("q") || "";
    var input = document.getElementById("q");
    var status = document.getElementById("search-status");
    input.value = q;
    if (!q.trim()) { status.textContent = "Type a word or name to search all stories."; return; }
    status.textContent = "Searching…";
    fetch("/search.json").then(function (r) { return r.json(); }).then(function (items) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = items.filter(function (a) {
        var hay = (a.t + " " + a.d + " " + a.c + " " + a.b).toLowerCase();
        return terms.every(function (t) { return hay.indexOf(t) !== -1; });
      });
      status.textContent = hits.length + " result" + (hits.length === 1 ? "" : "s") + " for “" + q + "”";
      results.innerHTML = "";
      hits.forEach(function (a) {
        var el = document.createElement("article");
        el.className = "latest";
        var link = document.createElement("a");
        link.href = a.u;
        if (a.i) { var img = document.createElement("img"); img.src = a.i; img.alt = ""; link.appendChild(img); }
        var div = document.createElement("div");
        var k = document.createElement("div"); k.className = "mini-kicker"; k.textContent = a.c;
        var h = document.createElement("h3"); var hl = document.createElement("a"); hl.href = a.u; hl.textContent = a.t; h.appendChild(hl);
        var p = document.createElement("p"); p.textContent = a.d;
        var tm = document.createElement("time"); tm.textContent = a.dt;
        div.append(k, h, p, tm);
        el.append(link, div);
        results.appendChild(el);
      });
    }).catch(function () { status.textContent = "Search is unavailable right now."; });
  }
})();
