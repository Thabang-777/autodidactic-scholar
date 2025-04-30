const tasklists = JSON.parse(localStorage.getItem("lists")) || 
[{
  name: 'Reminders',
  color: '#000000',
  type: 'standard',
  icon: 'image'
}];

const bodyElements = document.querySelectorAll('.js-body-elements');
const listContainerElement = document.querySelector('.js-task-list');
const addListButtonElement = document.querySelector('.js-add-list');
const createlistElement = document.querySelector('.js-create-list');

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
      <p style="color: var(--accent-color);" class="js-reminder-count">0<p>
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

generateListHTML();