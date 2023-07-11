const inputBox = document.getElementById("task");
const todoList = document.getElementById("todo-list");

const p = document.getElementsByTagName('ul');
console.log(p);

// NEEDED FOR FIREFOX
// initializes empty localStorage.data if there is no data to show
if (localStorage.data === undefined) {
    saveData();
}

showData();

// events
todoList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
    saveData();
}, false);

// functions
function addTask() {
    if (inputBox.value === '') {
        alert("Cannot add what there isn't");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        todoList.appendChild(li);
        
    }
    inputBox.value = '';
    saveData();
}

function saveData() {
    localStorage.setItem('data', todoList.innerHTML);
}

function showData() {
    todoList.innerHTML = localStorage.getItem('data');
}

