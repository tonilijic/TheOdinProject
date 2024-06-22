import "output.css";

document.addEventListener("DOMContentLoaded", () => {
  const newTaskButton = document.querySelector("[data-add-new-task]");
  const modal = document.querySelector("[data-modal]");
  const closeModalButton = document.querySelector("[data-close-modal]");

  newTaskButton.addEventListener("click", () => {
    modal.showModal();
  });

  closeModalButton.addEventListener("click", () => {
    modal.close();
  });
});
