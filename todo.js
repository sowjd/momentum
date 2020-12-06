const todoForm = document.querySelector(".js-todo");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");
const doneList = document.querySelector(".js-doneList");

const TODO_LS = "todo";
const DONE_LS = "done";
let todoArr = [];
let doneArr = [];

function saveTask(type) {
    if (type === TODO_LS) {
        localStorage.setItem(TODO_LS, JSON.stringify(todoArr));
    } else {
        localStorage.setItem(DONE_LS, JSON.stringify(doneArr));
    }
}

function deleteFromTodo(event) {
    const li = event.target.parentNode;
    todoList.removeChild(li);
    const deleteFromTodoArr = todoArr.filter(function (todo) {
        return todo.id !== parseInt(li.id);
    });
    todoArr = deleteFromTodoArr;
    saveTask(TODO_LS);
}

function deleteFromDone(event) {
    const li = event.target.parentNode;
    doneList.removeChild(li);
    const deleteFromDoneArr = doneArr.filter(function (done) {
        return done.id !== parseInt(li.id);
    });
    doneArr = deleteFromDoneArr;
    saveTask(DONE_LS);
}

function moveToDone(event) {
    const li = event.target.parentNode;
    todoArr.forEach(function (todo) {
        if (todo.id === parseInt(li.id)) {
            showDoneList(todo.text);
        }
    });
    deleteFromTodo(event);
}

function showTodoList(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "✕";
    delBtn.addEventListener("click", deleteFromTodo);

    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "✓";
    doneBtn.addEventListener("click", moveToDone);

    const span = document.createElement("span");
    const newId = todoArr.length + 1;

    span.innerText = text + "   ";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    todoList.appendChild(li);

    const todoObj = {
        text: text,
        id: newId
    };
    todoArr.push(todoObj);
    saveTask(TODO_LS);
}

function moveToTodo(event) {
    const li = event.target.parentNode;
    doneArr.forEach(function (done) {
        if (done.id === parseInt(li.id)) {
            showTodoList(done.text);
        }
    });
    deleteFromDone(event);
}

function showDoneList(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "✕";
    delBtn.addEventListener("click", deleteFromDone);

    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "<<";
    doneBtn.addEventListener("click", moveToTodo);

    const span = document.createElement("span");
    const newId = todoArr.length + 1;

    span.innerText = text + "   ";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    doneList.appendChild(li);

    const todoObj = {
        text: text,
        id: newId
    };
    doneArr.push(todoObj);
    saveTask(DONE_LS);
}


function addTodo(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    showTodoList(currentValue);
    todoInput.value = "";
}

function loadTask() {
    const todos = localStorage.getItem(TODO_LS);
    if (todos !== null) {
        const parseTodo = JSON.parse(todos);
        parseTodo.forEach(function (todo) {
            showTodoList(todo.text);
        });
    }

    const dones = localStorage.getItem(DONE_LS);
    if (dones !== null) {
        const parseDone = JSON.parse(dones);
        parseDone.forEach(function (done) {
            showDoneList(done.text);
        });
    }
}

function init() {
    loadTask();
    todoForm.addEventListener("submit", addTodo);
}

init();
