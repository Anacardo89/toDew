// clearData();
const todoList = document.getElementById("todo-list");
const workingList = document.getElementById("working-list");
const pendingList = document.getElementById("pending-list");
const testingList = document.getElementById("testing-list");
const doneList = document.getElementById("done-list");
let draggedItem = null;


// NEEDED FOR FIREFOX
// initializes empty localStorage.data if there is no data to show
if (localStorage.data === undefined) {
  saveData();
}

showData();
addUlListeners();
addLiListeners();


// functions
function addTask() {
  const inputBox = document.getElementById("task-input");
  if (inputBox.value === '') {
    alert("Cannot add what there isn't");
  } else {
    let li = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = inputBox.value;
    li.classList.add('draggable-item')
    li.setAttribute('draggable', 'true');
    // let spanEdit = document.createElement("span");
    // spanEdit.innerHTML = '\u25a0';
    // spanEdit.classList.add('edit');
    // p.appendChild(spanEdit);
    let spanX = document.createElement("span");
    spanX.innerHTML = '\u00d7';
    spanX.classList.add('delete');
    p.appendChild(spanX);
    li.appendChild(p);
    todoList.appendChild(li);
  }
  inputBox.value = '';
  saveData();
  addLiListeners();
}

function saveData() {
    localStorage.setItem('tasks-todo', todoList.innerHTML);
    localStorage.setItem('tasks-working', workingList.innerHTML);
    localStorage.setItem('tasks-pending', pendingList.innerHTML);
    localStorage.setItem('tasks-testing', testingList.innerHTML);
    localStorage.setItem('tasks-done', doneList.innerHTML);
}

function clearData() {
    localStorage.setItem('tasks-todo', '');
    localStorage.setItem('tasks-working', '');
    localStorage.setItem('tasks-pending', '');
    localStorage.setItem('tasks-testing', '');
    localStorage.setItem('tasks-done', '');
}

function showData() {
    todoList.innerHTML = localStorage.getItem('tasks-todo');
    workingList.innerHTML = localStorage.getItem('tasks-working');
    pendingList.innerHTML = localStorage.getItem('tasks-pending');
    testingList.innerHTML = localStorage.getItem('tasks-testing');
    doneList.innerHTML = localStorage.getItem('tasks-done');
}

// event listeners
function addLiListeners() {
  const draggableItems = document.querySelectorAll('.draggable-item');
  draggableItems.forEach(function(draggableItem) {
    draggableItem.addEventListener('dragstart', handleDragStart);
    draggableItem.addEventListener('dragend', handleDragEnd);
  });
}

function addUlListeners() {
  const droppableLists = document.querySelectorAll('.droppable-list');
  droppableLists.forEach(function(droppableList) {
    droppableList.addEventListener('dragover', handleDragOver);
    droppableList.addEventListener('dragenter', handleDragEnter);
    droppableList.addEventListener('dragleave', handleDragLeave);
    droppableList.addEventListener('drop', handleDrop);
    droppableList.addEventListener('click', handleClick);
  });
}

// event handlers
function handleDragStart() {
  draggedItem = this;
  this.classList.add('dragging');
}
  
function handleDragEnd() {
  draggedItem = null;
  this.classList.remove('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  this.classList.add('dragover');
}

function handleDragLeave() {
  this.classList.remove('dragover');
}

function handleDragEnter(e) {
  e.preventDefault();
}

function handleClick(e) {
  if (e.target.matches('span')) {
    e.target.parentElement.parentElement.remove();
  } else if (e.target.matches('.draggable-item')) {
    e.target.classList.toggle('checked');
  } else if (e.target.parentElement.matches('.draggable-item')) {
    e.target.parentElement.classList.toggle('checked');
  }
  saveData();
}

function handleDrop(e) {
    e.preventDefault();
    let target = e.target;
  
    if (target.classList.contains('draggable-item')) {
      target.parentNode.insertBefore(draggedItem, target.nextSibling);
    } else if (target.classList.contains('droppable-list')) {
      this.appendChild(draggedItem);
    }
  
    this.classList.remove('dragover');
    saveData();
  }
