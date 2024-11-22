// SIDEBAR COMPONENENT

class Sidebar extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
  <div class="sidebar">
    <div class="sidebar-option">
      <img class="js-icon sidebar-icons" src="sources/icons/home.svg">
      <a style="text-decoration: none; color: var(--secondary-color);" href="index.html">
        <p class="sidebar-option-name">
          Home
        </p>
      </a>
    </div>

    <div class="sidebar-option">
      <img class="js-icon sidebar-icons" src="sources/icons/tasks-icon.svg">
      <a style="text-decoration: none; color: var(--secondary-color);" href="tasks.html">
        <p class="sidebar-option-name">
          tasks
        </p>
      </a>
    </div>
    
    <div class="sidebar-option">
      <div class="calendar-div">
        <img class="js-icon sidebar-icons" src="sources/icons/calendar-icon.svg">
        <div class="date-div">
          <p class="date"></p>
        </div>
      </div>

      <p class="sidebar-option-name">
        calendar
      </p>
    </div>

    <div class="sidebar-option">
      <img class="js-icon sidebar-icons" src="sources/icons/goals-icon.svg">
      <p class="sidebar-option-name">
        Goals
      </p>
    </div>

    <div class="sidebar-option">
      <img class="js-icon sidebar-icons" src="sources/icons/analytics-icon.svg">
      <p class="sidebar-option-name">
        analytics
      </p>
    </div>

    <div class="sidebar-option ">
      <img class="js-icon sidebar-icons" src="sources/icons/tools-icon.svg">
      <p class="sidebar-option-name">
        Recources
      </p>
    </div>

    <div class="sidebar-option">
      <img class="js-icon sidebar-icons" src="sources/icons/collaborate-icon.svg">
      <p class="sidebar-option-name">
        Collaborate
      </p>
    </div>

    <div class="dark-mode-toggle">
      <p>Dark Mode</p>
      <button class="switch round">
        <div class="slider round js-toggle"></div>
      </button>
    </div>
  </div>
    `
  }
}
customElements.define("sidebar-component", Sidebar)

// HEADER COMPONENT

class Header extends HTMLElement {
  constructor(){
    super()
    this.innerHTML = `
          <div class="header">
    <div class="header-left-section">
      <div>
        <img class="js-icon header-icons interactive-icon" src="sources/icons/hamburger-menu.svg">
      </div>
      <p>Autodidactic scholar</p>
    </div>
    <div class="header-middle-section">
      <div class="searchbar">
        <input class="header-input" placeholder="Search" type="text">
        <img class="js-icon header-icons" src="sources/icons/search.svg">
      </div>
    </div>
    <div class="header-right-section">
      <img class="js-icon header-icons interactive-icon" src="sources/icons/notifications.svg">
      <img class="js-icon header-icons interactive-icon" src="sources/icons/user-icon.svg">
    </div>
  </div>
    `
  }
}
customElements.define('header-component', Header);


// MAIN CONTENT COMPONENT
class Content extends HTMLElement {
  constructor(){
    super()
    this.innerHTML = `<div class="main-content">${this.innerHTML}</div>`
  }
}
customElements.define('main-content' ,Content);