const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");
const totalEl = document.getElementById("total");
const doneEl = document.getElementById("done");
const pendingEl = document.getElementById("pending");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  let done = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    
    const info = document.createElement("div");
    info.className = "info";
    info.innerHTML = `<strong>${task.title}</strong>${task.date ? " - " + task.date : ""}`;

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.className = "complete";
    completeBtn.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTask(index);

    buttons.appendChild(completeBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(buttons);
    taskList.appendChild(li);

    if (task.completed) done++;
  });

  totalEl.textContent = tasks.length;
  doneEl.textContent = done;
  pendingEl.textContent = tasks.length - done;
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  const date = taskDate.value;

  if (title === "") return;

  tasks.push({
    title,
    date,
    completed: false
  });

  taskInput.value = "";
  taskDate.value = "";

  saveTasks();
  renderTasks();
};

// Initial load
renderTasks();
