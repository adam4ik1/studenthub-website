document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.querySelector("#task-form");
  if (taskForm) {
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.querySelector("#task-input");
      const message = document.querySelector("#task-message");
      if (window.STUDENTHUB_BUG_MODE) {
        // INTENTIONAL BUG 1: form says it worked, but no task is added.
        message.textContent = "Task added successfully!";
        input.value = "";
        return;
      }
      const value = input.value.trim();
      if (!value) return;
      const item = document.createElement("li");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      label.appendChild(checkbox);
      label.append(" " + value);
      item.appendChild(label);
      document.querySelector("#task-list").appendChild(item);
      message.textContent = "Task added successfully!";
      input.value = "";
      applyTaskFilter();
    });
  }

  const search = document.querySelector("#task-search");
  function applyTaskFilter() {
    if (!search) return;
    const query = search.value.toLowerCase();
    document.querySelectorAll("#task-list li").forEach((item) => {
      item.hidden = !item.textContent.toLowerCase().includes(query);
    });
  }
  if (search) search.addEventListener("input", applyTaskFilter);

  const registerForm = document.querySelector("#register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#register-message");
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!window.STUDENTHUB_BUG_MODE && !validEmail) {
        message.textContent = "Please enter a valid email address.";
        message.className = "message error";
        return;
      }
      // INTENTIONAL BUG 2 in BUGGY mode: malformed addresses are accepted.
      message.textContent = "Account created successfully!";
      message.className = "message success";
    });
  }
});
