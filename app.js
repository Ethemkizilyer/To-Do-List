// SELECTORS

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

const todoFilter = document.querySelector(".filter-todo");

// Alerts

const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

// EVENTS
document.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);

// FUNCTİONS

function addTodo(e) {
  e.preventDefault(); // preventDefault il tıkladığında sayfa yenilenmez
  const isEmpty = (str) => !str.trim().length;

  if (isEmpty(todoInput.value)) {
    alertWarning.style.display = "block";
    setTimeout(() => {
      alertWarning.style.display = "none";
    }, 1500);

    // CLEAR TODO İNPUT VALUE
    todoInput.value = "";
    //   console.log("boşluk var");
  } else {
    alertSuccess.style.display = "block";
    setTimeout(() => {
      alertSuccess.style.display = "none";
    }, 1500);

    saveLocalTodos(todoInput.value);
    //   console.log("boşluk yok");
    // CREATE TODO DİV

    const todoDıv = document.createElement("div");
    todoDıv.classList.add("todo");
    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDıv.appendChild(completedButton);

    //   LİST CREATE TODO Lİ
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDıv.appendChild(newTodo);

    // CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-minus-circle"></i>';
    trashButton.classList.add("trash-btn");
    todoDıv.appendChild(trashButton);

    //   APPEND TODO LİST
    todoList.appendChild(todoDıv);

    // CLEAR TODO İNPUT VALUE
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //   console.log(item);

  // DELETE TODO

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocaleStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // CHECK MARK

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (item) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

// LOCALE STORAGE

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    // CREATE TODO DİV

    const todoDıv = document.createElement("div");
    todoDıv.classList.add("todo");
    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDıv.appendChild(completedButton);

    //   LİST CREATE TODO Lİ
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDıv.appendChild(newTodo);

    // CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-minus-circle"></i>';
    trashButton.classList.add("trash-btn");
    todoDıv.appendChild(trashButton);

    //   APPEND TODO LİST
    todoList.appendChild(todoDıv);
  });
}

function removeLocaleStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
