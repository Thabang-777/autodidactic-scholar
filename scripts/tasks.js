// export  { divDisplay, display };

// DATA
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

const tasklists = JSON.parse(localStorage.getItem("lists")) || 
[{
  name: 'Reminders',
  color: '#000000',
  type: 'standard',
  icon: 'image'
}];

// HTML elements 

const NameInputElement = document.querySelector('.js-task-name-input');
const dateInputElement = document.querySelector('.js-task-date-input')
const timeInputElement = document.getElementById('reminderTime');
const priorityInputElement = document.querySelector('.js-task-priority-input');

const taskCategories = document.querySelectorAll('.task-category');
const divDisplayElement = document.querySelector('.js-div-display');
const divElements = document.querySelectorAll('.js-div'); 


const listContainerElement = document.querySelector('.js-task-list');
const addListButtonElement = document.querySelector('.js-add-list');
const createlistElement = document.querySelector('.js-create-list');

// Buttons
const addTaskButton = document.querySelector('.js-add-task-button');

// preTasks
priorityInputElement.value ='';


// display elements
const taskDisplayElement = document.querySelector('.js-task-display')

// Variables
  let tasksPageHTML;

// functions

function renderTask (){
  tasksPageHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate, time, priority } = todoObject;
    const html = ` 
    <div class="task-display">
      <div class="grid-section">
        <input type="checkbox">
      </div>
      <div class="grid-section">
        <p>${name}</p>
      </div>
      <div class="grid-section">
        <p>${dueDate}</p>
      </div>
      <div class="grid-section">
        <p>${time}</p>
      </div>
      <div class="grid-section">
        <p>${priority}</p>
      </div>
      <button class="js-delete-task-button js-delete-todo-button" onclick=" 
      ">Delete</button>
    </div>
  `;
    tasksPageHTML += html;
  });
  taskDisplayElement.innerHTML = tasksPageHTML;

  document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todoList));
      // console.log(JSON.parse(localStorage.getItem("todos")));
      renderTask();
    });
  });
};


function resetInputElements () {
  NameInputElement.value = "";
  dateInputElement.value = "";
  timeInputElement.value = "";
  priorityInputElement.value = "";
};


function addTask (){
  const name = NameInputElement.value;
  const dueDate = dateInputElement.value;
  const time = timeInputElement.value;
  const priority = priorityInputElement.value;

  todoList.push({
    name: name,
    dueDate: dueDate,
    time: time,
    priority : priority
  });
  localStorage.setItem("todos", JSON.stringify(todoList));
  // console.log(JSON.parse(localStorage.getItem("todos")));
}

let divElement = [];
let categoryElement = [];

function divDisplay (display) {
  divElements.forEach((div, index) => {
    divElement.push(div);
  })
  // console.log(divElement[display].innerHTML);
  divDisplayElement.innerHTML = divElement[display].innerHTML;
};




const listNameInputElement = document.querySelector('.js-list-name-input');
const listColorInputElement = document.querySelector('.js-list-color-input');
const listTypeInputElement = document.querySelector('.js-list-type-input');

let listName;
let listColor;
let listType;
let taskListHTML;

function generateListHTML(){
  taskListHTML = '';

  tasklists.forEach((taskListObject, index) => {
    const { name, color, type, icon } = taskListObject;
    const listHTML = `
    <div class="task-list ${type}" style="color:${color};">
      <p style="color: var(--accent-color);" class="js-reminder-count">0<p>
      <p style="color: var(--secondary-color);">${name}</p>
      <button class="js-delete-list-button">Delete</button>
    </div>
  `;
  taskListHTML += listHTML;
  });
  listContainerElement.innerHTML = taskListHTML;

  document.querySelectorAll('.js-delete-list-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      tasklists.splice(index, 1);
      localStorage.setItem("lists", JSON.stringify(tasklists));
      // console.log(JSON.parse(localStorage.getItem("todos")));
      generateListHTML();
    });
  });
};

function addList (){
  listName = listNameInputElement.value;
  listColor = listColorInputElement.value;
  listType = listTypeInputElement.value;
  console.log(listType);

  tasklists.push({
    name : listName,
    color : listColor,
    type : listType,
    icon : 'image'
  });
  localStorage.setItem("lists", JSON.stringify(tasklists));
  console.log(tasklists);
};

function resetListGenerateInputElements(){
  listNameInputElement.value = '';
  listColorInputElement.value = '#000000';
};

// Interactivity

addTaskButton.addEventListener('click', () => {
  addTask();
  renderTask();
  resetInputElements();
});

let display;

taskCategories.forEach((category, index) => {
  category.addEventListener('click', () => {
    display = index;
    divDisplay(display);
    // taskCategories.classList.remove('.task-category-selected')
    // category.classList.toggle('task-category-selected');
  });
});
// category.addEventListener(('click'), (index) => {
//   display = index;
//   console.log(display);

// })
const generateListButtonElement = document.querySelector('.js-generate-list-button');

addListButtonElement.addEventListener('click', () => {
  createlistElement.classList.add('initialise-list');
});

generateListButtonElement.addEventListener('click', () => {
  addList();
  generateListHTML();
  resetListGenerateInputElements();
  createlistElement.classList.remove('initialise-list');
});
// deleteListButton.addEventListener('click', () => {
//   tasklists.splice();
// });

renderTask();
generateListHTML();
divDisplay(0);

