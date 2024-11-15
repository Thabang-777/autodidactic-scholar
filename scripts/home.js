const toggleButtonElement = document.querySelector('.js-toggle');
const iconElements = document.querySelectorAll('.js-icon');

const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const primaryColor = rootStyles.getPropertyValue('--primary-color')
const secondaryColor = rootStyles.getPropertyValue('--secondary-color');

let isToggled = -1;

function darkModeToggled (){
  // the color are swapped here, so they don't need to be in the css-styles
  if (!isToggled){
    root.style.setProperty('--primary-color', 'white')
    root.style.setProperty('--secondary-color', 'black')
    console.log('normal');
    isToggled = true;
  } else if (isToggled = true) {
    root.style.setProperty('--primary-color', 'black')
    root.style.setProperty('--secondary-color', 'white')
    console.log('swapped');
    isToggled = false;
  }
}

toggleButtonElement.addEventListener('click', () => {
  toggleAllIcons();
  toggleButtonElement.classList.toggle('slider-active')

  darkModeToggled();
});

function toggleAllIcons (){
  iconElements.forEach((element) => {
    element.classList.toggle('js-icon-dark');
  });
};

// CALENDAR ICON CHANGING

const dateDisplayElement = document.querySelector('.date');

function updateCalendarIcon (){
  const date = new Date();
  const day = date.getDate();

  dateDisplayElement.innerHTML = day;
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