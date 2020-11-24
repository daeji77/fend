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

// build the nav
function buildNav() {
    const fragement = new DocumentFragment();
    const sections = document.querySelectorAll('section');
    for (section of sections) {
        const li = document.createElement('li');
        li.classList.add('menu__link');
        li.textContent = section.getAttribute('data-nav');
        li.setAttribute('data-nav-id', section.id);

        // const a = document.createElement('A');
        // a.textContent = section.getAttribute('data-nav');
        // console.log(`#${section.id}`);
        // a.href = `#${section.id}`;
        // li.appendChild(a);

        fragement.appendChild(li);
    }
    const navbar = document.querySelector('#navbar__list');
    navbar.appendChild(fragement);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function scrollToElem(elem) { 
    const pageHeaderBottom = document.querySelector('.page__header');
    const topPos = elem.getBoundingClientRect().top + window.pageYOffset -
        pageHeaderBottom.getBoundingClientRect().bottom

    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
const navbar = document.querySelector('#navbar__list');
navbar.addEventListener('click', function(event) {
   const id = event.target.getAttribute('data-nav-id');
   const section = document.querySelector(`#${id}`);
   scrollToElem(section);
})

// Set sections as active
