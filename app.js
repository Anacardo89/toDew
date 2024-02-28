// on load
const inputBox = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");
const workingList = document.getElementById("working-list");
const pendingList = document.getElementById("pending-list");
const testingList = document.getElementById("testing-list");
const doneList = document.getElementById("done-list");
let draggedItem = null;

showData();
addContainerListeners();
addItemListeners();



// logic
function addTask() {
  if (inputBox.value === '') {
    alert("Cannot add what there isn't");
    return;
  } else {
    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add('draggable-item')
    taskWrapper.setAttribute('draggable', 'true');
    taskWrapper.classList.add('no-decor')
    let task = makeTask(inputBox.value);
    taskWrapper.appendChild(task);
    todoList.appendChild(taskWrapper);
  }
  inputBox.value = '';
  addItemListeners();
}

function itemToForm(e) {
  let div = e.target.parentElement.parentElement;
  div.classList.remove('draggable-item');
  div.classList.add('editable-item');
  let p = e.target.parentElement;
  let taskText = p.textContent;
  let textToAdd = taskText.slice(0, -2)
  p.remove();
  let form = makeTaskEdit(textToAdd)
  div.appendChild(form);
}

function confirmEdit() {
  let divs = document.getElementsByClassName('editable-item');
  let taskToAdd = null;
  for (const div of divs) {
    if (div.children[0].children[0].value === '') {
      alert("ToDew nid name");
      return;
    }  else {
      taskToAdd = makeTask(div.children[0].children[0].value);
      div.innerHTML = '';
    }
    for (const div of divs) {
      div.appendChild(taskToAdd);
      div.classList.remove('editable-item');
      div.classList.add('draggable-item');
    }
  }
}

function makeTask(text) {
  let p = document.createElement("p");
  let spanEdit = document.createElement("span");
  let spanX = document.createElement("span");
  p.innerHTML = text;
  spanEdit.innerHTML = '\u25a0';
  spanEdit.classList.add('edit');
  spanX.innerHTML = '\u00d7';
  spanX.classList.add('delete');
  p.appendChild(spanEdit);
  p.appendChild(spanX);
  return p
}

function makeTaskEdit(text) {
  const input = document.createElement("input");
  const button = document.createElement("button");
  input.setAttribute('type', 'text');
  input.setAttribute('value', text);
  button.classList.add('submit-edit');
  button.textContent = "Ye";
  button.setAttribute('onclick', "confirmEdit(); return false;")
  const form = document.createElement("form");
  form.appendChild(input);
  form.appendChild(button);
  return form
}

// event listeners
function addItemListeners() {
  const draggableItems = document.querySelectorAll('.draggable-item');
  draggableItems.forEach(function(draggableItem) {
    draggableItem.addEventListener('dragstart', handleDragStart);
    draggableItem.addEventListener('dragend', handleDragEnd);
  });
}

function addContainerListeners() {
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
    if (e.target.matches('.delete')) {
      e.target.parentElement.parentElement.remove();
    } else if (e.target.matches('.edit')) {
      itemToForm(e);
    }
  }
  nextItemState(e)
}

function nextItemState(e) {
  let itemState = ['no-decor', 'wait', 'check', 'warn']
  for (let i = 0; i < itemState.length; i++) {
    if (e.target.matches('.'+itemState[i])) {
      if (i === itemState.length-1) {
        e.target.classList.add(itemState[0])
      }
      e.target.classList.add(itemState[i+1])
      e.target.classList.remove(itemState[i])
      return;
    } else if (e.target.parentElement.matches('.'+itemState[i])) {
      if (i === itemState.length-1) {
        e.target.parentElement.classList.add(itemState[0])
      }
      e.target.parentElement.classList.add(itemState[i+1])
      e.target.parentElement.classList.remove(itemState[i])
      return;
    }
  } 
}

function handleDrop(e) {
  e.preventDefault();
  let target = e.target;
  if (target.classList.contains('draggable-item')) {
    target.parentNode.insertBefore(draggedItem, target);
  } else if (target.classList.contains('droppable-list')) {
    this.appendChild(draggedItem);
  }
  this.classList.remove('dragover');
}

  // storage
function saveData() {
  localStorage.setItem('tasks-todo', todoList.innerHTML);
  localStorage.setItem('tasks-working', workingList.innerHTML);
  localStorage.setItem('tasks-pending', pendingList.innerHTML);
  localStorage.setItem('tasks-testing', testingList.innerHTML);
  localStorage.setItem('tasks-done', doneList.innerHTML);
}

function showData() {
  todoList.innerHTML = localStorage.getItem('tasks-todo');
  workingList.innerHTML = localStorage.getItem('tasks-working');
  pendingList.innerHTML = localStorage.getItem('tasks-pending');
  testingList.innerHTML = localStorage.getItem('tasks-testing');
  doneList.innerHTML = localStorage.getItem('tasks-done');
}

function clearData() {
  todoList.innerHTML = '';
  workingList.innerHTML = '';
  pendingList.innerHTML = '';
  testingList.innerHTML = '';
  doneList.innerHTML = '';
}