// CSS handles the globe and orbit motion; suspend it when it is not needed.
(() => {
  const graphic = document.querySelector(".orbital");
  const toggle = document.querySelector(".motion-toggle");
  if (!graphic || !toggle) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = false;
  let inView = true;
  function syncMotion() {
    const paused =
      userPaused || reducedMotion.matches || document.hidden || !inView;
    graphic.classList.add("graphic-running");
    graphic.classList.toggle("graphic-paused", paused);
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
