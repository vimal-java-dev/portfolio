// ===================================================
// ===== 1. PARTICLES INITIALIZATION =====
// ===================================================
function initParticles() {
    const isDark = document.body.classList.contains("dark");

    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 900 } },
            "color": { "value": isDark ? "#00e5ff" : "#ff9800" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.6, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true },
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
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": false },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } }
            }
        },
        "retina_detect": true
    });
}

function reloadParticles() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    const container = document.getElementById("particles-js");
    if (container) container.innerHTML = "";
    initParticles();
}

// ===================================================
// ===== 2. CUSTOM PHYSICS (MAGNET + EXPLOSION) =====
// ===================================================
let mouseX = -9999;
let mouseY = -9999;
let isMousePresent = false;
let hasActuallyMoved = false;

let initialX = null;
let initialY = null;
let isMouseActive = false;
let idleTimeout = null;

document.addEventListener("mousemove", (e) => {
    if (!hasActuallyMoved) {
        if (initialX === null && initialY === null) {
            initialX = e.clientX;
            initialY = e.clientY;
            return;
        }
        const dx = e.clientX - initialX;
        const dy = e.clientY - initialY;
        if (Math.sqrt(dx * dx + dy * dy) < 25) return;
        hasActuallyMoved = true;
    }

    mouseX = e.clientX;
    mouseY = e.clientY;
    isMousePresent = true;
    isMouseActive = true;

    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        isMouseActive = false;
    }, 1000);
});

document.addEventListener("mouseleave", () => {
    isMousePresent = false;
    isMouseActive = false;
});

document.addEventListener("mouseenter", () => {
    if (hasActuallyMoved) isMousePresent = true;
});

document.addEventListener("click", (e) => {
    if (!window.pJSDom || window.pJSDom.length === 0) return;

    // Prevent particles from exploding if clicking inside the form inputs
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON") {
        return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;
    const particles = window.pJSDom[0].pJS.particles.array;

    particles.forEach(p => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 400 && dist > 0) {
            const force = (400 - dist) / 400;
            p.vx += (dx / dist) * force * 35;
            p.vy += (dy / dist) * force * 35;
        }
    });
});

function applyCustomPhysics() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        const pJS = window.pJSDom[0].pJS;
        const particles = pJS.particles.array;

        if (!hasActuallyMoved || !isMouseActive) {
            pJS.interactivity.mouse.pos_x = null;
            pJS.interactivity.mouse.pos_y = null;
        } else {
            pJS.interactivity.mouse.pos_x = mouseX;
            pJS.interactivity.mouse.pos_y = mouseY;
        }

        particles.forEach(p => {
            if (Math.abs(p.vx) > 1.0 || Math.abs(p.vy) > 1.0) {
                p.vx *= 0.88;
                p.vy *= 0.88;
            }

            if (isMouseActive && isMousePresent) {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 250 && dist > 0) {
                    p.x += dx * 0.015;
                    p.y += dy * 0.015;
                }
            }
        });
    }
    requestAnimationFrame(applyCustomPhysics);
}

applyCustomPhysics();

// ===================================================
// ===== 3. UI, THEME, AND FORM LOGIC =====
// ===================================================
function updateOverlayGradient() {
    const overlay = document.querySelector(".gradient-overlay");
    if (!overlay) return;
    if (document.body.classList.contains("dark")) {
        overlay.style.background = "linear-gradient(45deg, rgba(0,150,255,0.25), rgba(0,0,0,0.3), rgba(0,200,255,0.25))";
    } else {
        overlay.style.background = "linear-gradient(45deg, rgba(255,140,0,0.25), rgba(255,255,255,0.15), rgba(255,215,64,0.25))";
    }
}

function updateToggleIcon() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (!darkModeToggle) return;
    if (document.body.classList.contains("dark")) {
        darkModeToggle.textContent = "☀️";
        darkModeToggle.title = "Switch to light mode";
        darkModeToggle.style.background = "#00bcd4";
        darkModeToggle.style.color = "#000";
    } else {
        darkModeToggle.textContent = "🌙";
        darkModeToggle.title = "Switch to dark mode";
        darkModeToggle.style.background = "#000000";
        darkModeToggle.style.color = "#fff";
    }
}

const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateOverlayGradient();
        updateToggleIcon();
        reloadParticles();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        document.documentElement.classList.add("dark");
    }
    updateOverlayGradient();
    updateToggleIcon();
    initParticles();

    // Simple Form Submission Mock
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload

            // Show Success Message
            formStatus.textContent = "✓ Message sent successfully! I will get back to you soon.";
            formStatus.className = "form-status success";

            // Clear inputs
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = "form-status";
            }, 5000);
        });
    }
});