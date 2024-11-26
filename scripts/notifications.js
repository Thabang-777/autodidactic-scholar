const notificationCountDisplayElement = document.querySelectorAll('.js-notification-display');

let notificationCount = 1;

function notifications () {
  notificationCountDisplayElement.forEach((element) => {
    element.innerHTML = notificationCount;
    if (element.innerHTML > '0'){
      element.classList.add('notifications-popup');
    } else if (element.innerHTML <= '0') {
      element.classList.remove('.notifications-popup')
      element.classList.add('hidden-div')
    }
  });
};
notifications();

