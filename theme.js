(function () {
  var root = document.documentElement;
  var button = document.querySelector("[data-theme-toggle]");
  var meta = document.querySelector('meta[name="theme-color"]');
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function preferred() {
    var chosen = root.getAttribute("data-theme");
    if (chosen === "light" || chosen === "dark") return chosen;
    return media.matches ? "dark" : "light";
  }

  function paint(theme) {
    var dark = theme === "dark";
    if (meta) meta.setAttribute("content", dark ? "#141210" : "#f3eee4");
    if (!button) return;
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
  }

  paint(preferred());

  if (button) {
    button.addEventListener("click", function () {
      var next = preferred() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      paint(next);
    });
  }

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", function () {
      if (!root.getAttribute("data-theme")) paint(preferred());
    });
  }
})();
