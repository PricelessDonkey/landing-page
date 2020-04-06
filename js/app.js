/**
 * 
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
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav TODO: put into function, split into main function and helper function. call main function after document load(?)
for (const section of sections){
    const sectionId = section.getAttribute("id");
    const sectionName = section.querySelector("h2").textContent;
    const listItem = `<li><a href="#${sectionId}">${sectionName}</a></li>`;
    navBarList.insertAdjacentHTML('beforeend',listItem);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


