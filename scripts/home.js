const toggleButtonElement = document.querySelector('.js-toggle');
const bodyElement = document.querySelector('.body');
const iconElements = document.querySelectorAll('.js-icon');
console.log(iconElements);
const mainBodyElement = document.querySelector('.main-content');
const toggleButtonDiv = document.querySelector('.dark-mode-toggle');

toggleButtonElement.addEventListener('click', () => {
  toggleAllIcons();
  toggleButtonElement.classList.toggle('slider-active')
  bodyElement.classList.toggle('body-dark');
  mainBodyElement.classList.toggle('main-content-dark');
  toggleButtonDiv.classList.toggle('dark-mode-toggle-dark');
});

function toggleAllIcons (){
  iconElements.forEach((element) => {
    element.classList.toggle('js-icon-dark');
  });
};

const dateDisplayElement = document.querySelector('.date');

function updateCalendarIcon (){
  const date = new Date();
  const day = date.getDate();

  dateDisplayElement.innerHTML = day;
}
updateCalendarIcon();