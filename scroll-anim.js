const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector(".main-nav");
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});
const desktop = window.matchMedia("(min-width: 701px)");
desktop.addEventListener("change", () => {
  if (desktop.matches) closeMenu();
});
const page = location.pathname.split("/").pop() || "index.html";
navigation.querySelectorAll("a").forEach((link) => {
  if (link.getAttribute("href") === page)
    link.setAttribute("aria-current", "page");
});
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".fade-up")
    .forEach((element) => observer.observe(element));
  document.documentElement.classList.add("motion-enabled");
}

// Keep service enquiries connected to the capability the visitor selected.
const serviceSelect = document.querySelector('select[name="service"]');
if (serviceSelect) {
  const requestedService = new URLSearchParams(location.search).get("service");
  if (
    [...serviceSelect.options].some(
      (option) => option.value === requestedService,
    )
  ) {
    serviceSelect.value = requestedService;
  }
}
