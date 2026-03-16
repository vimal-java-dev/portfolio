// Get elements
const modal = document.getElementById("myModal");
const btn = document.querySelector(".open-modal-btn");
const close = document.querySelector(".close");

// Open modal on button click
if (btn && modal) {
  btn.addEventListener("click", () => {
    modal.classList.add("show");
  });
}

// Close modal on close button click
if (close && modal) {
  close.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

// Close modal on clicking outside the modal content
if (modal) {
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}
