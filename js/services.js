// ===================================================
// ===== 1. PARTICLES INITIALIZATION =====
// ===================================================

// ===================================================
// ===== 2. CUSTOM PHYSICS (IDLE TIMER + EXPLOSION) ==
// ===================================================

// ===================================================
// ===== 3. UI, THEME, AND ACCORDION LOGIC =====
// ===================================================

// Above all js code handled in global.js,
// this file is only for services page specific js code like accordion logic

document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (!accordionItems.length) return;

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      accordionItems.forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
});
