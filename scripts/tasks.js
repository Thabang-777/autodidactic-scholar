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
const bodyElements = document.querySelectorAll('.js-body-elements');
const notificationTimeInputElement = document.querySelector('.js-notification-time-input'); 

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
const addReminderButtonElement= document.querySelectorAll('.js-add-reminder');
const createTaskDivElement = document.querySelector('.js-create-task');


// preTasks
priorityInputElement.value = '';


// display elements
const taskDisplayElement = document.querySelector('.js-task-display')

// Variables
  let tasksPageHTML;
  let prioritySign = '';

// functions

function renderTask (){
  tasksPageHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate, time, priority } = todoObject;
    const html = ` 
    <div class="task-display">
    
      <div style="display: flex; justify-content: center; align-items: center;">
        <input type="checkbox">
      </div>

      <div class="">
        <div class="grid-section">
          <div class="spaced-div">
            <p>${priority}</p>
          </div>
          <div>
            <p>${name}</p>
          </div>
        </div>
        <div class="flex-section">
          <div class="spaced-div">
            <p>${dueDate}</p>
          </div>
          <p class="spaced-div">-<p>
          <div>
            <p>${time}</p>
          </div>
        </div>
      </div>

      <button class="js-delete-task-button js-delete-todo-button delete-buttons">Delete</button>
    </div>
  `;
    tasksPageHTML += html;
  });
  taskDisplayElement.innerHTML = tasksPageHTML;

  function deleteTodo (array, index){
    let result = confirm('when ok is clicked this reminder will be PERMANENTLY DELETED. Are you sure you want to delet this reminder?')
    if (result === true){
      todoList.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todoList));
      // console.log(JSON.parse(localStorage.getItem("todos")));

      clearTimeout(timeoutIdArray[index]);
      timeoutIdArray.splice(index, 1);
      // console.log(timeoutIdArray);

      renderTask();
    } else if (result === false){

    }
  };

  document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      deleteTodo(todoList, index);
    });
  });
};


function resetInputElements () {
  NameInputElement.value = "";
  dateInputElement.value = "";
  timeInputElement.value = "";
  priorityInputElement.value = "";
};

function convertPriority(){
  if (priorityInputElement.value === 'high'){
    prioritySign = '!!!';
  } else if (priorityInputElement.value === 'medium'){
    prioritySign = '!!';
  } else if (priorityInputElement.value === 'low'){
    prioritySign = '!';
  };
};
function addTask (){
  prioritySign = "";
  convertPriority();

  let dueDate;
  let time;

  const name = NameInputElement.value;
  if (dateInputElement.value === ''){
    const today = new Date();
    dueDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    console.log(dueDate);
  } else {
    dueDate = dateInputElement.value;
  }

  if (timeInputElement.value === ''){
    const today = new Date();
    time = `00:00`;
  } else {
    time = timeInputElement.value;
  }


  const priority = prioritySign;

  if (name === ''){

  } else {
    todoList.push({
      name: name,
      dueDate: dueDate,
      time: time,
      priority : priority
    });
    localStorage.setItem("todos", JSON.stringify(todoList));
    // console.log(JSON.parse(localStorage.getItem("todos")));
  }

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
    <div class="task-list ${type}">
      <p style="color: var(--accent-color);" class="js-reminder-count" style="color:${color};">0<p>
      <p style="color: var(--secondary-color);">${name}</p>
      <button class="js-delete-list-button delete-buttons">Delete</button>
    </div>
  `;
  taskListHTML += listHTML;
  });
  listContainerElement.innerHTML = taskListHTML;

  function confirmDeletion (array, index){
    let result = confirm('when ok is clicked this reminder will be PERMANENTLY DELETED. Are you sure you wish to delete this list?');
    if (result === true){
      array.splice(index, 1);
      localStorage.setItem("lists", JSON.stringify(array));
      // console.log(JSON.parse(localStorage.getItem("todos")));
      generateListHTML();
    } else if (result === false){

    }
  };
  document.querySelectorAll('.js-delete-list-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      confirmDeletion(tasklists, index);
    });
  });
};

function addList (){
  listName = listNameInputElement.value;
  listColor = listColorInputElement.value;
  listType = listTypeInputElement.value;
  // console.log(listType);

  if (listName === ''){

  } else {
    tasklists.push({
      name : listName,
      color : listColor,
      type : listType,
      icon : 'image'
    });
    localStorage.setItem("lists", JSON.stringify(tasklists));
    // console.log(tasklists);
  }
};

function resetListGenerateInputElements(){
  listNameInputElement.value = '';
  listColorInputElement.value = '#808080';
};

// function addReminderButtons(){

// }
let timeToNotification;

function timeUntilNottification (dueDate, time) {
    const combinedString = `${dueDate}T${time}:00`;
    const now = new Date();
    const endDate = new Date(combinedString)
    timeToNotification = endDate - now;
  }
;
let timeoutId;
const timeoutIdArray = [];

function setNotification(){
  const x = todoList.length - 1;
  const task = todoList[x];

  timeUntilNottification(task.dueDate, task.time);

  if (timeToNotification < 0){
    alert('select a valid time');

    function deleteInvalidTime (array, index){
        todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todoList));
        // console.log(JSON.parse(localStorage.getItem("todos")));
        console.log(todoList[index]);
        clearTimeout(timeoutIdArray[index]);
        timeoutIdArray.splice(index, 1);
        renderTask();
    };
    
    deleteInvalidTime();
    // timeToNotification = false;
  
    // todoList.splice(todoList[todoList.length-1]);
  } else {
    timeoutId = setTimeout(() => {
      ringAlarm(task);
      // setInterval(updateCalendarIcon, 24 * 60 * 60 * 1000);
    }, timeToNotification); 
    timeoutIdArray.push( {timeoutId, timeToNotification} );
  }
};

function ringAlarm (task){
  alert(`${task.name}`);
};



// Interactivity

addTaskButton.addEventListener('click', () => {
  if (NameInputElement.value === ''){
    // console.log('dweh');
  } else {
    addTask();
    setNotification();
  };


  renderTask();
  resetInputElements();
  createTaskDivElement.classList.toggle('initialise-reminder');
  bodyElements.forEach((body) => {
    body.classList.remove('locked');
  })
});

let display;
let reminderDisplay;
// const initialiseReminderElement = document.querySelector('.js-create-task');



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
  bodyElements.forEach((bodyElement) => {
    bodyElement.classList.add('locked');
  })
});

generateListButtonElement.addEventListener('click', () => {
  addList();
  generateListHTML();
  resetListGenerateInputElements();
  createlistElement.classList.remove('initialise-list');
  bodyElements.forEach((body) => {
    body.classList.remove('locked');
  })
});
// deleteListButton.addEventListener('click', () => {
//   tasklists.splice();
// });

addReminderButtonElement.forEach((button, index) => {
  button.addEventListener('click', () => {
    createTaskDivElement.classList.toggle('initialise-reminder');
    bodyElements.forEach((bodyElement) => {
      bodyElement.classList.add('locked');
    })
  });
});

renderTask();
generateListHTML();
divDisplay(0);