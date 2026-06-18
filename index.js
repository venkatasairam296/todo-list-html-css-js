const newTaskBtn = document.getElementById("new-task-btn");
const newTaskPage = document.getElementById("new-task-page");
const cancelBtn = document.getElementById("cancel-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-ipt");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");

newTaskBtn.addEventListener("click", function () {
  newTaskPage.classList.remove("hidden");
});

cancelBtn.addEventListener("click", function() {
  newTaskPage.classList.add("hidden");
})

let editingTask = null;

addTaskBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();

  if(taskText === ""){
    return;
  }

  if(editingTask === null){
    const li = document.createElement("li");
    li.classList.add("task-card");

    const p = document.createElement("p");
    p.innerText = taskText;

    const div = document.createElement("div");
    div.classList.add("task-btns");

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    const donei = document.createElement("i");
    donei.classList.add("fa-solid", "fa-check");

    doneBtn.addEventListener("click", function() {
      li.classList.toggle("completed");
    })

    doneBtn.append(donei);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    const editi = document.createElement("i");
    editi.classList.add("fa-solid", "fa-pen");

    editBtn.addEventListener("click", function() {
      editingTask = li;
      const para = li.querySelector("p");
      taskInput.value = para.innerText;
      newTaskPage.classList.remove("hidden");
    });

    editBtn.append(editi);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    const deletei = document.createElement("i");
    deletei.classList.add("fa-solid", "fa-x");

    deleteBtn.addEventListener("click", function() {
      li.remove();
    })

    deleteBtn.append(deletei);

    div.append(doneBtn);
    div.append(editBtn);
    div.append(deleteBtn);

    li.append(p);
    li.append(div);

    todoList.append(li)
    taskInput.value = "";
    newTaskPage.classList.add("hidden");
  }else{
    const p = editingTask.querySelector("p");
    p.innerText = taskInput.value.trim();
    editingTask = null;
    taskInput.value = "";
    newTaskPage.classList.add("hidden");
  }
})

searchInput.addEventListener("input", function() {
  const tasks = document.querySelectorAll(".task-card");
  
  let searchText = searchInput.value.trim().toLowerCase();

  tasks.forEach(function(task) {
    const p = task.querySelector("p");

    let taskText = p.innerText.toLowerCase();

    if(taskText.includes(searchText)){
      task.style.display = "flex";
    }else{
      task.style.display = "none";
    }
  })

})