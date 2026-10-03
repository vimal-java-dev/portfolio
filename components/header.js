const siteHeader = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");

const LOGO_SCROLL_POINT = 40;
const COLLAPSE_SCROLL_POINT = 1024;

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");

    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

const updateNavbar = () => {
  const scrollY = window.scrollY;

  if (scrollY >= LOGO_SCROLL_POINT) {
    siteHeader.classList.add("logo-small");
  } else {
    siteHeader.classList.remove("logo-small");
  }

  if (scrollY >= COLLAPSE_SCROLL_POINT) {
    siteHeader.classList.add("nav-collapsed");
  } else {
    siteHeader.classList.remove("nav-collapsed");
  }
};

const updateActiveSection = () => {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
};

window.addEventListener("scroll", () => {
  updateNavbar();
  updateActiveSection();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  updateNavbar();
});

updateNavbar();
updateActiveSection();
