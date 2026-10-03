/* ===== global.js ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* ============================
     Fade-In Animation on Scroll with Perfect Cascade & Staggered Delay
  ============================ */
  const faders = document.querySelectorAll(".fade-in");

  if (faders.length) {
    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Get the index of this element in the NodeList
        const i = Array.from(faders).indexOf(entry.target);

        // Set animation delay dynamically for cascading effect
        entry.target.style.animationDelay = `${i * 150}ms`;
        entry.target.classList.add("visible");

        observer.unobserve(entry.target); // stop observing once visible
      });
    }, appearOptions);

    // Observe each .fade-in element
    faders.forEach((fader) => appearOnScroll.observe(fader));
  }
});
