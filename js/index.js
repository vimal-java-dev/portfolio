// ===== localStorage theme handling =====
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  body.classList.add("dark");
  darkModeToggle.textContent = "☀️"; // show sun icon if dark mode is active
} else {
  darkModeToggle.textContent = "🌙"; // show moon icon if light mode is active
}

// ===== Dark Mode Persist Across Pages =====
darkModeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // ===== Optional for Services Page =====
  if (typeof updateOverlayGradient === "function") updateOverlayGradient();

  // Rebuild particles only if available
  if (typeof initParticles === "function") {
    setTimeout(() => {
      if (window.pJSDom && pJSDom.length) {
        pJSDom[0].pJS.fn.vendors.destroypJS();
        document.getElementById("particles-js").innerHTML = "";
      }
      initParticles();
    }, 300);
  }
});
