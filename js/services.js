// ===== Particles.js Hero Background (Dynamic for Dark Mode) =====
// ===== Initialize Particles.js with Theme-Aware Colors ===== (Applied before)
// ===== Initialize Particles.js with Orange (Light) & Cyan (Dark) Themes ===== (Applied)
function initParticles() {
    const isDark = document.body.classList.contains("dark");

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 70,
                "density": { "enable": true, "value_area": 900 }
            },
            // Theme-based particle colors
            "color": { "value": isDark ? "#00e5ff" : "#ff9800" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true
            },
            // Theme-based connection lines
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": isDark ? "#00bcd4" : "#ffb74d",
                "opacity": isDark ? 0.4 : 0.35,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": false }
            },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 }
            }
        },
        "retina_detect": true
    });
}

// ===== Overlay Gradient Update (for Visual Harmony) =====
function updateOverlayGradient() {
    const overlay = document.querySelector(".gradient-overlay");
    if (!overlay) return;

    if (document.body.classList.contains("dark")) {
        overlay.style.background =
            "linear-gradient(45deg, rgba(0,150,255,0.25), rgba(0,0,0,0.3), rgba(0,200,255,0.25))";
    } else {
        overlay.style.background =
            "linear-gradient(45deg, rgba(255,140,0,0.25), rgba(255,255,255,0.15), rgba(255,215,64,0.25))";
    }
}

// ===== localStorage theme handling =====
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
}

// ===== Re-initialize on Dark Mode Toggle =====
const darkModeToggle = document.getElementById("darkModeToggle");

// ===== Initialize Dark Mode from Local Storage =====
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}
updateOverlayGradient();
updateToggleIcon();

// ===== Toggle Theme with Icon & Particles Reload =====
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateOverlayGradient();
        updateToggleIcon();

        // Reinitialize particles with smooth reload
        setTimeout(() => {
            if (window.pJSDom && pJSDom.length) {
                pJSDom[0].pJS.fn.vendors.destroypJS();
                document.getElementById("particles-js").innerHTML = "";
            }
            initParticles();
        }, 300);
    });
}

// ===== Update Toggle Icon Dynamically =====
function updateToggleIcon() {
    if (!darkModeToggle) return;

    if (document.body.classList.contains("dark")) {
        darkModeToggle.textContent = "☀️"; // Light mode icon
        darkModeToggle.title = "Switch to light mode";
        darkModeToggle.style.background = "#00bcd4";
        darkModeToggle.style.color = "#000";
    } else {
        darkModeToggle.textContent = "🌙"; // Dark mode icon
        darkModeToggle.title = "Switch to dark mode";
        darkModeToggle.style.background = "#000000";
        darkModeToggle.style.color = "#fff";
    }
}

// ===== Services Accordion Logic =====
document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".accordion-item");

    if (!accordionItems.length) return;

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");

        if (!header) return;

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all
            accordionItems.forEach(i => i.classList.remove("active"));

            // Open clicked one if it was closed
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
});

