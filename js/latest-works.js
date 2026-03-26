// Filtering Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    let delay = 0;

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filterValue === "all" || category === filterValue) {
        setTimeout(() => {
          card.classList.remove("hide");
          card.classList.add("show");
        }, delay);
        delay += 100; // stagger delay
      } else {
        card.classList.remove("show");
        card.classList.add("hide");
      }
    });
  });
});
