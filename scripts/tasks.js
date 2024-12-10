// export  { divDisplay, display };
const taskCategories = document.querySelectorAll('.task-category');
const divDisplayElement = document.querySelector('.js-div-display');
const divElements = document.querySelectorAll('.js-div'); 

// variables

let divElement = [];
let categoryElement = [];
let display;
let reminderDisplay;

// functions

function divDisplay (display) {
  divElements.forEach((div, index) => {
    divElement.push(div);
  })
  // console.log(divElement[display].innerHTML);
  divDisplayElement.innerHTML = divElement[display].innerHTML;
};

// EventListeners

taskCategories.forEach((category, index) => {
  category.addEventListener('click', () => {
    display = index;
    divDisplay(display);
  });
});

// pre-loads

divDisplay(0);