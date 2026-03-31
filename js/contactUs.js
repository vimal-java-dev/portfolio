// ===================================================
// ===== 1. PARTICLES INITIALIZATION =====
// ===================================================

// ===================================================
// ===== 2. CUSTOM PHYSICS (MAGNET + EXPLOSION) =====
// ===================================================

// ===================================================
// ===== 3. UI, THEME, AND FORM LOGIC =====
// ===================================================

// Above all js code handled in global.js, 
// this file is only for contact us page specific js code like form submission logic

document.addEventListener("DOMContentLoaded", () => {
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