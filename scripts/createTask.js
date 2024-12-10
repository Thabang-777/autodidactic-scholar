export const todoList = JSON.parse(localStorage.getItem("todos")) || [
  {
    name: 'create tasks',
    dueDate: '2025',
    time: '00:00',
    priority: '!!!'
  }
];
// import { notificationCount } from "./notifications.js";

const notificationTimeInputElement = document.querySelector('.js-notification-time-input');
const bodyElements = document.querySelectorAll('.js-body-elements');
const NameInputElement = document.querySelector('.js-task-name-input');
const dateInputElement = document.querySelector('.js-task-date-input')
const timeInputElement = document.getElementById('reminderTime');
const priorityInputElement = document.querySelector('.js-task-priority-input');
const addTaskButton = document.querySelector('.js-add-task-button');
const addReminderButtonElement= document.querySelectorAll('.js-add-reminder');
const createTaskDivElement = document.querySelector('.js-create-task');
const taskDisplayElement = document.querySelectorAll('.js-task-display')

// Variables

let tasksPageHTML;
let prioritySign = '';
let timeToNotification;
let timeoutId;
const timeoutIdArray = [];
let notificationCount = 0;

// functions

function addTimeoutToLocalStorage(){
  localStorage.setItem('timeoutArray', JSON.stringify(timeoutIdArray));
  console.log(JSON.parse(localStorage.getItem('timeoutArray')))
};
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
  taskDisplayElement.forEach((displayElement) => {
    displayElement.innerHTML = tasksPageHTML;
  })

  function deleteTodo (array, index){
    let result = confirm('when ok is clicked this reminder will be PERMANENTLY DELETED. Are you sure you want to delet this reminder?')
    if (result === true){
      todoList.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todoList));
      // console.log(JSON.parse(localStorage.getItem("todos")));
  
      clearTimeout(timeoutIdArray[index].timeoutId);
      timeoutIdArray.splice(index, 1);
      addTimeoutToLocalStorage();
  
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
function timeUntilNottification (dueDate, time) {
    const combinedString = `${dueDate}T${time}:00`;
    const now = new Date();
    const endDate = new Date(combinedString)
    timeToNotification = endDate - now;
  }
;
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
        addTimeoutToLocalStorage();
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
    addTimeoutToLocalStorage()
  }
};

const notificationCountDisplayElement = document.querySelectorAll('.js-notification-display');
const tasksNotificationDisplay = document.querySelector('.js-notification-panel-display');
let notificationsHTML;

function renderNotifications () {
  
  notificationCountDisplayElement.forEach((element) => {
    element.innerHTML = JSON.parse(localStorage.getItem("notificationCount"));
    if (element.innerHTML > '0'){
      element.classList.add('notifications-popup');
    } else if (element.innerHTML <= '0') {
      element.classList.remove('.notifications-popup')
      element.classList.add('hidden-div')
    }
  });

  // todoList.forEach((todo) => {
  //   console.log(todo.name);
  //   console.log(todo.dueDate);
  //   console.log(todo.time);
  //   console.log(todo.priority);
  //   notificationsHTML += `
  //   <p>${todo.name}</p>
  //   <p>${todo.dueDate}</p>
  //   <p>${todo.time}</p>
  //   <p>${todo.priority}</p>
  // `
  // })
  // tasksNotificationDisplay.innerHTML = notificationsHTML;
};

function ringAlarm (task){
  alert(`${task.name}`);
  console.log(task);
  timeoutIdArray.splice(task, 1);
  todoList.splice(task, 1);
  localStorage.setItem("todos", JSON.stringify(todoList));
  addTimeoutToLocalStorage();
  // setNotification();
  notificationCount ++;
  localStorage.setItem("notificationCount", JSON.stringify(notificationCount));
  renderNotifications();
  renderTask();
};

// EventListeners

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

  // unfreeze body
  bodyElements.forEach((body) => {
    body.classList.remove('locked');
  });
});
addReminderButtonElement.forEach((button, index) => {
  button.addEventListener('click', () => {
    createTaskDivElement.classList.toggle('initialise-reminder');
    bodyElements.forEach((bodyElement) => {
      bodyElement.classList.add('locked');
    });
  });
});

// pre-loads

// window.addEventListener('load', (event) => {
//   JSON.parse(localStorage.getItem('timeoutArray'));

//   if (JSON.parse(localStorage.getItem('timeoutArray')).length === 0){
//     console.log('no timeouts')
//   } else if (JSON.parse(localStorage.getItem('timeoutArray')).length > 0){
//     timeoutIdArray.forEach((timeout) => {
//       console.log('we have them')
//     })
//   }
// })
// localStorage.removeItem('todos')
renderTask();
renderNotifications();
// localStorage.removeItem("notificationCount");
