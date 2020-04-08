/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
*/

/**
 * Define Global Variables
*/
const navBar = document.querySelector('#navbar__list');
const sectionList = document.querySelectorAll('section');
let activeSection = document.querySelector('section.your-active-class');
let timeout;

/**
 * End Global Variables
 * Start Helper Functions
*/

// builds the item element to add to the menu
var buildListItem = (section) => {
    const sectionId = section.getAttribute("id");
    const sectionName = section.querySelector("h2").textContent;
    const itemInnerHtml = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
    const listItem = document.createElement('li');
    listItem.innerHTML = itemInnerHtml;

    return listItem;
}

// unsets styling on the currently active menu item
function removeActiveMenuItem(){
    let activeItem = document.querySelector('a.your-active-class');
    activeItem.classList.remove('your-active-class');
}

// sets styling on the new currently active menu item
function setNewActiveMenuItem(section) {
    removeActiveMenuItem();
    getMenuItem(section).classList.add('your-active-class');
}

// returns the menu item that corresponds to the passed in section
var getMenuItem = (section) => {
    let activeId = section.getAttribute('id');
    let queryString = `a[href='#${activeId}']`;
    return document.querySelector(queryString);
}

// returns true if the section is near the top of the view port or if the section takes up the whole screen
var sectionIsNearTop = (section) => {
    const position = section.getBoundingClientRect();
    let fullyVisible = (position.top >= 0 && position.bottom <= window.innerHeight);
    let takesUpFullScreen = (position.top < 0 && position.bottom > window.innerHeight);

    return (fullyVisible || takesUpFullScreen);
}

// updates the passed in section to be the new active section
function setNewActiveSection(section) {
    activeSection.classList.remove('your-active-class');
    section.classList.add('your-active-class');
    activeSection = section;
}

// returns the section that corresponds to the clicked on menu item
var getSection = (event) => {
    const element = event.target;
    const elementId = element.getAttribute('href');
    return document.querySelector(elementId);
}

// removes the hidden class from the menu so that it displays
function showMenu() {
    let menu = document.querySelector('.page__header');
    menu.classList.remove('hidden');
}

// adds the hidden class to the menu to hide it
function hideMenu() {
    let menu = document.querySelector('.page__header');
    menu.classList.add('hidden');
}

// returns true if the top of the body is near the top of the page
var atTop = () => {
    let body = document.querySelector('body');
    let position = body.getBoundingClientRect();
    return position.top > 220;
}
/**
 * End Helper Functions
 * Begin Main Functions
*/

// build the menu
function buildMenu() {
    const fragment = document.createDocumentFragment(); 

    for (const section of sectionList){
        fragment.appendChild(buildListItem(section));
    }

    fragment.querySelector('.menu__link').classList.add('your-active-class');
    navBar.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function setActiveSection(event) {
    for (const section of sectionList) {
        if (sectionIsNearTop(section)) {
            if (section.classList.contains('your-active-class')) break;
            setNewActiveSection(section);
            setNewActiveMenuItem(section);
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToAnchor(event){
    if (event.target.nodeName === 'A'){
        event.preventDefault();
        getSection(event).scrollIntoView({behavior: 'smooth'});
    }
}

// Show the menu bar when scrolling or when at top of page, otherwise hide it
function showMenuBar(event) {
    setTimeout(showMenu, 200);
    
    clearTimeout(timeout);
    timeout = setTimeout(hideMenu,1400);
    
    if (atTop()) {
        clearTimeout(timeout);
        showMenu();
    }
}

/**
 * End Main Functions
 * Begin Events
*/

// Build menu 
buildMenu();

// Scroll to section on link click
navBar.addEventListener('click', scrollToAnchor);

// Set sections as active
window.addEventListener('scroll', setActiveSection);
window.addEventListener('scroll', showMenuBar);
