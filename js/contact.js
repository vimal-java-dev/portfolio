// contact.js
document.addEventListener("DOMContentLoaded", function () {
  // 1️⃣ Force "Contact" Link Active
  // Code removed because common.js handles this with ScrollSpy.

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
      document
        .querySelectorAll(".field-error")
        .forEach((el) => el.classList.remove("visible"));
      document
        .querySelectorAll(".input-error")
        .forEach((el) => el.classList.remove("input-error"));

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
      const messageText = message.value.trim();

      if (!messageText) {
        showError("message", "Please enter a message");
        isValid = false;
      } else if (messageText.length < 10) {
        showError("message", "Message must be at least 10 characters");
        isValid = false;
      }

      if (isValid) {
        submitBtn.classList.add("loading");
        submitBtn.querySelector(".btn-text").textContent = "Sending...";

        const formData = {
          name: name.value.trim(),
          email: email.value.trim(),
          subject: document.getElementById("subject").value.trim(),
          message: message.value.trim(),
        };

        const API_BASE =
          window.location.hostname === "localhost"
            ? "http://localhost:8080"
            : "https://api.vimaltech.dev";

        fetch(`${API_BASE}/api/v1/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || "Server error");
            }

            return data;
          })
          .then((data) => {
            if (data.success) {
              submitBtn.classList.remove("loading");
              submitBtn.querySelector(".btn-text").textContent = "Message Sent";

              form.reset();
              if (charCountSpan) charCountSpan.textContent = `0 / ${maxChars}`;

              successMsg.classList.add("visible");

              setTimeout(() => {
                submitBtn.querySelector(".btn-text").textContent =
                  "Send Message";
                successMsg.classList.remove("visible");
              }, 3000);
            } else {
              throw new Error(data.message);
            }
          })
          .catch((error) => {
            console.error("API Error:", error);

            submitBtn.classList.remove("loading");
            submitBtn.querySelector(".btn-text").textContent = "Send Message";

            alert("Submission failed. Please try again.");
          });
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
