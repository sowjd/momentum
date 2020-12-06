const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function setName(event){
    event.preventDefault();
    const currentValue = input.value;
    showGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", setName);
}

function showGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✐";
    editBtn.addEventListener("click", editUser);
    greeting.innerHTML = `Hello ${text}     `;
    greeting.appendChild(editBtn);
}

function editUser(event) {
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    askForName();
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null){
        askForName();
    }else{
        showGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();
