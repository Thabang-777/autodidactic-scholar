// import { divDisplay, display } from "./tasks";

// DOM VARIABLES

const toggleButtonElement = document.querySelector('.js-toggle');
const iconElements = document.querySelectorAll('.js-icon');

const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const primaryColor = rootStyles.getPropertyValue('--primary-color')
const secondaryColor = rootStyles.getPropertyValue('--secondary-color');

const inputElements = document.querySelectorAll('.js-input');



// DARK MODE FUNCTIONALITY

let isToggled = -1;

function darkModeToggled (){
  // the color are swapped here, so they don't need to be in the css-styles
  if (!isToggled){
    root.style.setProperty('--primary-color', 'white')
    root.style.setProperty('--secondary-color', 'black')
    isToggled = true;
    localStorage.removeItem('darkModeState', JSON.stringify(isToggled))
    localStorage.setItem('darkModeState', JSON.stringify(isToggled))
  } else if (isToggled = true) {
    root.style.setProperty('--primary-color', 'black')
    root.style.setProperty('--secondary-color', 'white')
    isToggled = false;
    localStorage.removeItem('darkModeState', JSON.stringify(isToggled))
    localStorage.setItem('darkModeState', JSON.stringify(isToggled))
  }
}

toggleButtonElement.addEventListener('click', () => {
  toggleAllIcons();
  toggleButtonElement.classList.toggle('slider-active')
  darkModeToggled();
  toggleInputIcons();
  // divDisplay(display);
});

function toggleAllIcons (){
  iconElements.forEach((element) => {
    element.classList.toggle('js-icon-dark');
  });
};
function toggleInputIcons(){
  inputElements.forEach((inputElement) => {
    inputElement.classList.toggle('input-dark');
  });
  console.log('done')
}

function darkModeLock() {
  if (localStorage.getItem('darkModeState') === 'true'){

  } else if (localStorage.getItem('darkModeState') === 'false'){
    toggleAllIcons();
    toggleButtonElement.classList.toggle('slider-active')
    darkModeToggled();
  }
}

darkModeLock();





// CALENDAR ICON CHANGING

const dateDisplayElement = document.querySelector('.date');
const dateDisplayElement2 = document.querySelector('.js-date');


function updateCalendarIcon (){
  const date = new Date();
  const day = date.getDate();

  dateDisplayElement.innerHTML = day;
  dateDisplayElement2.innerHTML = day;
}

function timeUntilMidnight () {
  const now = new Date();
  const tommorow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return tommorow - now;
};

updateCalendarIcon();

setTimeout(() => {
  updateCalendarIcon();
  setInterval(updateCalendarIcon, 24 * 60 * 60 * 1000);
}, timeUntilMidnight());