// about.js
document.addEventListener("DOMContentLoaded", function () {
  // Force "About" Link Active
  // common.js has a ScrollSpy that removes active classes on scroll.
  // This function ensures the about link overrides that behavior.
  const aboutLink = document.querySelector('.nav-links a[href="about.html"]');

  function keepAboutActive() {
    if (aboutLink) {
      // Remove active from others, force it on About
      document
        .querySelectorAll(".nav-links a")
        .forEach((link) => link.classList.remove("active"));
      aboutLink.classList.add("active");
    }
  }

  // Run on initial load
  keepAboutActive();

  // Run on scroll to instantly override common.js
  window.addEventListener("scroll", keepAboutActive);
});
