document.addEventListener("DOMContentLoaded", () => {
  const selectors = {
    newTaskButton: "[data-add-new-task]",
    dialog: "[data-dialog]",
    backdrop: "[data-backdrop]",
    taskInput: "[data-task-input]",
    taskList: "[data-task-list]",
  };

  const elements = {};
  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  // Modal behavior
  const showModal = () => {
    elements.dialog.classList.replace("hidden", "visible");
    elements.backdrop.classList.replace("hidden", "visible");
    elements.taskInput.focus();
  };

  const closeModal = () => {
    elements.dialog.classList.replace("visible", "hidden");
    elements.backdrop.classList.replace("visible", "hidden");
    elements.taskInput.value = ""; // Clear the input field
  };

  // Adding, removing tasks
  const removeTask = (e) => {
    e.remove();
    saveTasks();
  };

  const addTaskToList = (taskText) => {
    const item = document.createElement("li");
    item.classList.add(
      "flex",
      "items-center", // Corrected typo
      "hover:bg-gray-50",
      "rounded-lg"
    );

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "m-2",
      "w-4",
      "h-4",
      "bg-gray-100",
      "border-gray-300",
      "rounded"
    );

    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    taskTextSpan.classList.add("flex", "ml-1", "leading-snug", "items-center");

    item.append(checkbox, taskTextSpan);
    elements.taskList.appendChild(item);

    checkbox.addEventListener("click", () => {
      setTimeout(() => removeTask(item), 300); // 300ms delay before removing the task
    });
  };

  const addTask = () => {
    const taskText = elements.taskInput.value.trim();
    if (taskText) {
      addTaskToList(taskText);
      saveTasks();
    }
    closeModal();
  };

  const editTasks = (e) => {
    const itemVlaue = e.textContent;
    e.remove();
    showModal(itemVlaue);
  };

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToList);
  };

  const saveTasks = () => {
    const tasks = [...elements.taskList.querySelectorAll("li span")].map(
      (item) => item.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  elements.newTaskButton.addEventListener("click", showModal);
  elements.backdrop.addEventListener("click", (event) => {
    if (event.target === elements.backdrop) {
      closeModal();
    }
  });

  // Hotkeys
  document.addEventListener("keydown", (event) => {
    if (elements.dialog.classList.contains("visible")) {
      if (event.key === "Enter") {
        event.preventDefault();
        addTask();
      } else if (event.key === "Escape") {
        closeModal();
      }
    } else if ((event.metaKey || event.ctrlKey) && event.key === "n") {
      event.preventDefault();
      showModal();
    }
  });

  loadTasks();
});
