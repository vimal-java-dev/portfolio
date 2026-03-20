/* ===== common.js ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* ============================
     Hamburger Menu (☰ / ✖)
  ============================ */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll("nav ul li a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      // This toggles the 'active' class on the hamburger for the rotation
      hamburger.classList.toggle("active");
      // This opens your actual menu
      navLinks.classList.toggle("open");
      hamburger.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
    });

    // Close the menu when any nav link is clicked
    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
          hamburger.textContent = "☰";
        }
      });
    });

    /* ✅ NEW: Close the menu when clicking outside */
    document.addEventListener("click", (event) => {
      const isClickInside =
        navLinks.contains(event.target) || hamburger.contains(event.target);
      if (!isClickInside && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.textContent = "☰";
      }
    });
  }

  /* ============================
     Scroll-to-Top Button
  ============================ */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 150) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ============================
  // Fade-In Animation on Scroll with Perfect Cascade & Staggered Delay
  // ============================
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

  /* ============================
     ScrollSpy: Highlight Active Nav Link
  ============================ */
  const sections = document.querySelectorAll("section");

  if (sections.length && navItems.length) {
    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (
          pageYOffset >= sectionTop &&
          pageYOffset < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navItems.forEach((link) => {
        const href = link.getAttribute("href");

        // Only apply scroll spy to section links (#)
        if (href.startsWith("#")) {
          link.classList.remove("active");

          if (href === `#${current}`) {
            link.classList.add("active");
          }
        }
      });
    });
  }

  // Dropdown toggle for Desktop
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;
      parent.classList.toggle("open");

      const menu = parent.querySelector(".dropdown-menu");
      if (menu) {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Ensure all dropdowns are closed on page load (prevents an open menu after refresh)
  function resetDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((drop) => {
      drop.classList.remove("open");
      const menu = drop.querySelector(".dropdown-menu");
      if (menu) menu.style.display = "none";
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    const isDropdownToggle = e.target.matches(".dropdown-toggle");
    const dropdown = e.target.closest(".dropdown");

    document.querySelectorAll(".dropdown").forEach((drop) => {
      const menu = drop.querySelector(".dropdown-menu");

      // If clicked outside this dropdown, close it
      if (drop !== dropdown && menu) {
        drop.classList.remove("open");
        menu.style.display = "none";
      }
    });
  });

  /* ============================
    Active Navbar Link per Page
    ============================ */
  const currentPage = window.location.pathname.split("/").pop();

  navItems.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }

    // Special case: homepage
    if (
      (currentPage === "" || currentPage === "/") &&
      linkPage === "index.html"
    ) {
      link.classList.add("active");
    }
  });

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
});
