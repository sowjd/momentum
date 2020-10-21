const todoForm = document.querySelector(".js-todo");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo";
let todoArr = [];

function deleteTodo(event){
    const li = event.target.parentNode;
    todoList.removeChild(li);
    const deleteFromTodoArr = todoArr.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    todoArr = deleteFromTodoArr;
    saveTodo();
}

function saveTodo(){
    localStorage.setItem(TODO_LS, JSON.stringify(todoArr));
}

function showTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todoArr.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);

    const todoObj = {
        text: text,
        id: newId
    };
    todoArr.push(todoObj);
    saveTodo();
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = todoInput.value;
    showTodo(currentValue);
    todoInput.value = "";
}

function loadTodo() {
    const todos = localStorage.getItem(TODO_LS);

    if (todos !== null) {
        const parseTodo = JSON.parse(todos);
        parseTodo.forEach(function(todo){
            showTodo(todo.text);
        });

    }
}

function init() {
    loadTodo();
    todoForm.addEventListener("submit", handleSubmit);
}

init();
