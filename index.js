const newTaskBtn = document.getElementById("new-task-btn");
const newTaskPage = document.getElementById("new-task-page");
const cancelBtn = document.getElementById("cancel-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-ipt");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
const lightModeBtn = document.querySelector(".light-mode");
const darkModeBtn = document.querySelector(".dark-mode");

let editingTask = null;
let currentFilter = "all";

darkModeBtn.addEventListener("click", function() {
  localStorage.setItem("theme", "dark");
  loadTheme();
})

lightModeBtn.addEventListener("click", function() {
  localStorage.setItem("theme", "light");
  loadTheme();
})

function loadTheme() {
  const theme = localStorage.getItem("theme");

  if(theme == null){
    theme = "light";
  }

  if(theme === "light"){
    document.documentElement.style.setProperty("--bg-color", "#F7F7F7");
    document.documentElement.style.setProperty("--surface-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty("--border-color", "#cccccc");
  }else{
    document.documentElement.style.setProperty("--bg-color", "#252525");
    document.documentElement.style.setProperty("--surface-color", "#2f2f2f");
    document.documentElement.style.setProperty("--text-color", "#ffffff");
    document.documentElement.style.setProperty("--border-color", "#4b4b4b");
  }
}

function updateTaskStatus(){
  const tasks = document.querySelectorAll(".task-card");
  document.getElementById("total-cnt").innerText = tasks.length;

  const completedTasks = document.querySelectorAll(".completed");
  document.getElementById("completed-cnt").innerText = completedTasks.length;

  document.getElementById("pending-cnt").innerText = tasks.length - completedTasks.length;
}

function saveTasks(){
  const tasks = document.querySelectorAll(".task-card");

  const taskData = [];

  tasks.forEach(function(task) {
    const p = task.querySelector("p");
    const isCompleted = task.classList.contains("completed");

    taskData.push({text: p.innerText, completed : isCompleted});
  })

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if(savedTasks === null){
    return;
  }

  const tasks = JSON.parse(savedTasks);

  tasks.forEach(function(task) {
    createTask(task.text, task.completed);
  })

  updateTaskStatus();
  filterTasks();
}

function createTask(text, completed = false){
  const li = document.createElement("li");
  li.classList.add("task-card");

  const p = document.createElement("p");
  p.innerText = text;

  const div = document.createElement("div");
  div.classList.add("task-btns");

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-btn");
  const donei = document.createElement("i");
  donei.classList.add("fa-solid", "fa-check");

  doneBtn.append(donei);
  
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  const editi = document.createElement("i");
  editi.classList.add("fa-solid", "fa-pen");

  editBtn.append(editi);
  
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  const deletei = document.createElement("i");
  deletei.classList.add("fa-solid", "fa-x");

  deleteBtn.append(deletei);

  div.append(doneBtn);
  div.append(editBtn);
  div.append(deleteBtn);

  li.append(p);
  li.append(div);

  if(completed === true){
    li.classList.add("completed");
  }

  todoList.append(li);
}

function filterTasks() {
  const tasks = document.querySelectorAll(".task-card");

  const searchText = searchInput.value.trim().toLowerCase();

  tasks.forEach(function (task) {
    const p = task.querySelector("p");

    const taskText = p.innerText.toLowerCase();

    let searchMatch;
    let filterMatch;

    if(taskText.includes(searchText)){
      searchMatch = true;
    }else{
      searchMatch = false;
    }

    if(currentFilter == "all"){
      filterMatch = true;
    }
    else if(currentFilter == "completed"){
      filterMatch = task.classList.contains("completed");
    }
    else if(currentFilter == "incompleted"){
      filterMatch = !task.classList.contains("completed");
    }

    if(searchMatch && filterMatch){
      task.style.display = "flex";
    }else{
      task.style.display = "none";
    }
  })
}

todoList.addEventListener("click", function(event) {
  if(event.target.closest(".delete-btn")){
    const task = event.target.closest(".task-card");

    task.remove();

    updateTaskStatus();

    saveTasks();
  }

  if(event.target.closest(".done-btn")){
    const task = event.target.closest(".task-card");

    task.classList.toggle("completed");

    filterTasks();

    updateTaskStatus();

    saveTasks();
  }

  if(event.target.closest(".edit-btn")){
    const task = event.target.closest(".task-card");

    editingTask = task;

    const p = task.querySelector("p");

    taskInput.value = p.innerText;

    newTaskPage.classList.remove("hidden");
  }
});

newTaskBtn.addEventListener("click", function () {
  newTaskPage.classList.remove("hidden");
});

cancelBtn.addEventListener("click", function() {
  newTaskPage.classList.add("hidden");
})

addTaskBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();

  if(taskText === ""){
    return;
  }

  if(editingTask === null){
    createTask(taskText);

    taskInput.value = "";
    newTaskPage.classList.add("hidden");

    updateTaskStatus();

    saveTasks();
  }else{
    const p = editingTask.querySelector("p");
    p.innerText = taskInput.value.trim();

    saveTasks();
    filterTasks();

    editingTask = null;
    taskInput.value = "";
    newTaskPage.classList.add("hidden");
  }
})

searchInput.addEventListener("input", function() {
  filterTasks();
});

document.getElementById("all-btn").addEventListener("click", function(event){
  event.preventDefault();
  currentFilter = "all";
  filterTasks();
})

document.getElementById("completed-btn").addEventListener("click", function(event){
  event.preventDefault();
  currentFilter = "completed";
  filterTasks();
})
document.getElementById("incompleted-btn").addEventListener("click", function(event){
  event.preventDefault();
  currentFilter = "incompleted";
  filterTasks();
})

loadTheme();
loadTasks();
updateTaskStatus();