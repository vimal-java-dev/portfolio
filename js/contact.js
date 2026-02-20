// contact.js
document.addEventListener("DOMContentLoaded", function () {

  // 1️⃣ Force "Contact" Link Active
  // common.js has a ScrollSpy that removes active classes on scroll. 
  // This function ensures the contact link overrides that behavior.
  const contactLink = document.querySelector('.nav-links a[href="contact.html"]');

  function keepContactActive() {
    if (contactLink) {
      // Remove active from others, force it on Contact
      document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
      contactLink.classList.add('active');
    }
  }

  // Run on initial load
  keepContactActive();

  // Run on scroll to instantly override common.js
  window.addEventListener("scroll", keepContactActive);


  // 2️⃣ Character Count for Message
  const messageInput = document.getElementById("message");
  const charCountSpan = document.getElementById("charCount");
  const maxChars = 1000;

  if (messageInput && charCountSpan) {
    messageInput.addEventListener("input", () => {
      const currentLength = messageInput.value.length;
      charCountSpan.textContent = `${currentLength} / ${maxChars}`;

      if (currentLength >= maxChars) {
        charCountSpan.classList.add("at-limit");
        messageInput.value = messageInput.value.substring(0, maxChars);
      } else if (currentLength > maxChars * 0.9) {
        charCountSpan.classList.add("near-limit");
        charCountSpan.classList.remove("at-limit");
      } else {
        charCountSpan.classList.remove("near-limit", "at-limit");
      }
    });
  }

  // 3️⃣ Form Validation & Submission
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMsg = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent actual PHP submit for demo purposes

      let isValid = true;

      // Clear previous errors
      document.querySelectorAll(".field-error").forEach(el => el.classList.remove("visible"));
      document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

      // Validate Name
      const name = document.getElementById("name");
      if (!name.value.trim()) {
        showError("name", "Name is required");
        isValid = false;
      }

      // Validate Email
      const email = document.getElementById("email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError("email", "Email is required");
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
      }

      // Validate Message
      const message = document.getElementById("message");
      if (!message.value.trim()) {
        showError("message", "Please enter a message");
        isValid = false;
      }

      if (isValid) {
        // Simulate Loading
        submitBtn.classList.add("loading");
        submitBtn.querySelector(".btn-text").textContent = "Sending...";

        // Simulate Network Request (1.5 seconds)
        setTimeout(() => {
          submitBtn.classList.remove("loading");
          submitBtn.querySelector(".btn-text").textContent = "Message Sent";
          form.reset();
          if (charCountSpan) charCountSpan.textContent = `0 / ${maxChars}`;

          successMsg.classList.add("visible");

          // Reset button text after a while
          setTimeout(() => {
            submitBtn.querySelector(".btn-text").textContent = "Send Message";
          }, 3000);
        }, 1500);
      }
    });
  }

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(`error-${fieldId}`);

    if (input) input.classList.add("input-error");
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.classList.add("visible");
    }
  }
});