let tasksData = {};
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const completed = document.querySelector("#completed");
const inp = document.querySelector("#inp-title");
const descp = document.querySelector("#descp");
const tasks = document.querySelectorAll(".task");
const add = document.querySelector("#add");
const coloumns = [todo, progress, completed];
const tooglebtn = document.querySelector("#add-btn");
const menu = document.querySelector(".add-menu");
const bg = document.querySelector(".bg");
const del = document.querySelector(".del-btn");
let draggedElement = null; // this stores the element being dragged //
// ya sara tasks par loop lagta ha jo drag horay ho or unkoo is variable ma save karta ha
tasks.forEach((task) => {
  task.addEventListener("drag", () => {
    draggedElement = task;
  });
});
function updateAllColumns() {
  coloumns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
    count.textContent = tasks.length;
  });
}
function createTaskElement(title, desc) {
  let div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = ` <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>`;

  div.addEventListener("drag", () => {
    draggedElement = div;
  });
  const deleteButton = div.querySelector("button");
  deleteButton.addEventListener("click", () => {
    div.remove();
    updateAllColumns();
  });

  return div;
}

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  // jesa ka data object form ma ha to is liya hum for in loop use kara gay//o
  for (const col in data) {
    const coloumn = document.querySelector(`#${col}`);

    data[col].forEach((tsk) => {
      let div = createTaskElement(inp.value, descp.value);

      coloumn.appendChild(div);
    });
    const tasks = coloumn.querySelectorAll(".task");
    const count = coloumn.querySelector(".right");
    count.textContent = tasks.length;
  }
}
function dragElem(coloumn) {
  coloumn.addEventListener("dragenter", (e) => {
    e.preventDefault();
    coloumn.classList.add("hover-over");
  });
  coloumn.addEventListener("dragleave", (e) => {
    e.preventDefault();
    coloumn.classList.remove("hover-over");
  });
  coloumn.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  coloumn.addEventListener("drop", (e) => {
    e.preventDefault();
    coloumn.appendChild(draggedElement);
    coloumn.classList.remove("hover-over");

    updateAllColumns();
  });
}
dragElem(todo);
dragElem(progress);
dragElem(completed);
tooglebtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  inp.value = "";
  descp.value = "";
});
bg.addEventListener("click", () => {
  menu.classList.remove("active");
});
// now add a new task
add.addEventListener("click", (e) => {
  let div = createTaskElement(inp.value, descp.value);
  todo.appendChild(div);
  updateAllColumns();
  menu.classList.remove("active");
});
