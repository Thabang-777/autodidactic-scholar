// DATA
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

// Input elements

const NameInputElement = document.querySelector('.js-task-name-input');
const dateInputElement = document.querySelector('.js-task-date-input')
const timeInputElement = document.getElementById('reminderTime');
const priorityInputElement = document.querySelector('.js-task-priority-input');

// preTasks
priorityInputElement.value ='';

// Buttons
const addTaskButton = document.querySelector('.js-add-task-button');

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
// Interactivity

addTaskButton.addEventListener('click', () => {
  addTask();
  renderTask();
  resetInputElements();
});

// deleteButtonElement.addEventListener('click', () => {
//   deleteReminder();
// });
renderTask();
