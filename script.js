(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Platform track ----------
     Lights each system in order, like a job moving through the five platforms.
     Plays once when the track scrolls into view; "Replay the run" plays it again. */
  var track = document.querySelector("[data-track]");
  if (track) {
    var stations = Array.prototype.slice.call(track.querySelectorAll(".station"));
    var status = document.querySelector("[data-track-status]");
    var replay = document.querySelector("[data-track-replay]");
    var total = stations.length;
    var timer = null;

    var setStep = function (step) {
      stations.forEach(function (el, i) { el.classList.toggle("is-done", i < step); });
      var progress = step <= 1 ? 0 : (step - 1) / (total - 1);
      track.style.setProperty("--p", String(progress));
      if (status) {
        status.textContent = step === 0 ? "Starting the run"
          : step < total ? "Ran on " + step + " of " + total + " systems"
          : "Ran unchanged on all " + total + " systems";
      }
    };

    var play = function () {
      window.clearInterval(timer);
      if (reduceMotion) { setStep(total); return; }
      var step = 0;
      setStep(0);
      timer = window.setInterval(function () {
        step += 1;
        setStep(step);
        if (step >= total) window.clearInterval(timer);
      }, 650);
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setStep(total);
    } else {
      setStep(0);
      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { play(); observer.disconnect(); }
      }, { threshold: 0.4 });
      observer.observe(track);
    }

    if (replay) replay.addEventListener("click", play);
  }

  /* ---------- Role lens ----------
     Dims work that isn't relevant to the chosen role. The choice is kept in the URL
     (?for=ai, ?for=python, ?for=teaching) so you can send a recruiter a tailored link. */
  var pills = Array.prototype.slice.call(document.querySelectorAll("[data-lens]"));
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-roles]"));
  var note = document.querySelector("[data-lens-note]");
  var valid = pills.map(function (p) { return p.getAttribute("data-lens"); });

  var countIn = function (group, lens) {
    var inGroup = items.filter(function (el) { return el.getAttribute("data-group") === group; });
    var matched = inGroup.filter(function (el) { return el.getAttribute("data-roles").split(" ").indexOf(lens) !== -1; });
    return { matched: matched.length, total: inGroup.length };
  };

  var applyLens = function (lens, updateUrl) {
    if (valid.indexOf(lens) === -1) lens = "all";

    pills.forEach(function (p) {
      p.setAttribute("aria-pressed", p.getAttribute("data-lens") === lens ? "true" : "false");
    });

    items.forEach(function (el) {
      var roles = el.getAttribute("data-roles").split(" ");
      el.classList.toggle("is-dim", lens !== "all" && roles.indexOf(lens) === -1);
    });

    if (note) {
      if (lens === "all") {
        note.textContent = "Showing all work. Pick a role to highlight the most relevant projects and skills.";
      } else {
        var c = countIn("current", lens);
        var e = countIn("earlier", lens);
        note.textContent = "Highlighting " + c.matched + " of " + c.total + " current projects and " +
          e.matched + " of " + e.total + " earlier projects.";
      }
    }

    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (lens === "all") url.searchParams.delete("for");
      else url.searchParams.set("for", lens);
      window.history.replaceState(null, "", url.toString());
    }
  };

  pills.forEach(function (p) {
    p.addEventListener("click", function () { applyLens(p.getAttribute("data-lens"), true); });
  });

  var initial = new URLSearchParams(window.location.search).get("for") || "all";
  applyLens(initial, false);
})();
