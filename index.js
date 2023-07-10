const inputBox = document.getElementById("task")
const todoList = document.getElementById("todo-list")

function addTask() {
    if (inputBox.value === '') {
        alert("Cannot add what there isn't");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        todoList.appendChild(li);
    }
    inputBox.value = '';
}

