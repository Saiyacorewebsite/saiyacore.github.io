// Animate the decorative SVG locally: no libraries, canvas, or network requests.
(() => {
  const graphic = document.querySelector(".orbital");
  const toggle = document.querySelector(".motion-toggle");
  if (!graphic || !toggle) return;

  const strands = graphic.querySelectorAll(".dna-strand");
  const rungs = graphic.querySelectorAll(".dna-rungs line");
  const nodes = graphic.querySelectorAll(".dna-nodes circle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = false;
  let inView = true;
  let frameId = null;
  let lastTime = null;
  let phase = 0;

  function point(t, offset) {
    const angle = t * Math.PI * 2 + phase + offset;
    return {
      x: 260 + 85 * Math.sin(angle),
      y: 82 + t * 342,
      z: Math.cos(angle),
    };
  }

  function render() {
    strands.forEach((strand, side) => {
      const points = Array.from({ length: 101 }, (_, i) => {
        const p = point(i / 100, side * Math.PI);
        return `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
      });
      strand.setAttribute("d", `M ${points.join(" L ")}`);
    });
    rungs.forEach((rung, i) => {
      const a = point(i / (rungs.length - 1), 0);
      const b = point(i / (rungs.length - 1), Math.PI);
      rung.setAttribute("x1", a.x.toFixed(2));
      rung.setAttribute("x2", b.x.toFixed(2));
      for (const [side, p] of [a, b].entries()) {
        const node = nodes[i * 2 + side];
        node.setAttribute("cx", p.x.toFixed(2));
        node.setAttribute("r", (3 + p.z).toFixed(2));
        node.setAttribute("opacity", (0.65 + p.z * 0.3).toFixed(2));
      }
    });
  }

  function animate(time) {
    if (lastTime === null) lastTime = time;
    if (time - lastTime >= 1000 / 30) {
      phase += Math.min(time - lastTime, 100) * 0.00045;
      lastTime = time;
      render();
    }
    frameId = requestAnimationFrame(animate);
  }

  function syncMotion() {
    const paused =
      userPaused || reducedMotion.matches || document.hidden || !inView;
    graphic.classList.add("dna-running");
    graphic.classList.toggle("dna-paused", paused);
    toggle.disabled = reducedMotion.matches;
    toggle.textContent = reducedMotion.matches
      ? "Reduced motion enabled"
      : userPaused
        ? "Play graphic"
        : "Pause graphic";
    toggle.setAttribute(
      "aria-pressed",
      String(userPaused || reducedMotion.matches),
    );
    if (paused && frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
      lastTime = null;
    } else if (!paused && frameId === null) {
      frameId = requestAnimationFrame(animate);
    }
  }

  toggle.addEventListener("click", () => {
    userPaused = !userPaused;
    syncMotion();
  });
  reducedMotion.addEventListener("change", syncMotion);
  document.addEventListener("visibilitychange", syncMotion);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      syncMotion();
    }).observe(graphic);
  }
  syncMotion();
})();
