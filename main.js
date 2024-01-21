const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const colorArray = ["F08080", "CD7192", "6E618D", "465776", "2F4858"];
const counter = document.querySelector(".task-counter");
const tasks = JSON.parse(localStorage.getItem("tasks"));

if (tasks) {
  tasks.forEach((task) => {
    addTask(task);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function addTask(task) {
  let taskText = input.value;

  if (task) {
    taskText = task.text;
  }

  if (taskText) {
    const taskEl = document.createElement("li");
    if (task && task.completed) {
      taskEl.classList.add("completed");
    }

    taskEl.classList.add("task-item");
    taskEl.innerText = taskText;
    taskEl.style.backgroundColor = `#${randomizeColor(colorArray)}`;
    taskList.appendChild(taskEl);

    taskEl.addEventListener("click", () => {
      taskEl.classList.toggle("completed");
      updateLocalStorage();
    });

    taskEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      taskEl.remove();
      updateLocalStorage();
      if (document.querySelectorAll("li").length >= 1) {
        counter.innerHTML = `<em>${
          document.querySelectorAll("li").length
        }</em> tasks left`;
      } else {
        counter.innerHTML = "Let's add some <em>tasks</em>!";
      }
    });

    input.value = "";
    updateLocalStorage();
    counter.innerHTML = `<em>${
      document.querySelectorAll("li").length
    }</em> tasks left`;
  }
}

function randomizeColor(array) {
  const randomIdx = Math.floor(Math.random() * array.length);
  const color = array[randomIdx];
  return color;
}

function updateLocalStorage() {
  const tasksEl = document.querySelectorAll("li");
  const tasks = [];

  tasksEl.forEach((taskEl) => {
    tasks.push({
      text: taskEl.innerText,
      completed: taskEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
