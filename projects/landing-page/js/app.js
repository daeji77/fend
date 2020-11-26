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

        fragement.appendChild(li);
    }
    const navbar = document.querySelector('#navbar__list');
    navbar.appendChild(fragement);
}

function setActiveSection(activeElem) {
    const sections = document.querySelectorAll('section');
    for (section of sections) {
        section.classList.remove('your-active-class');
    }
    activeElem.classList.add('your-active-class');
}

// Scroll to anchor ID using scrollTO event
function scrollToElem(elem) {
    const pageHeaderBottom = document.querySelector('.page__header');
    // Note: This alternative only works when elem is the top elements of the
    //   document.
    // const topPos = elem.offsetTop -
    //     pageHeaderBottom.getBoundingClientRect().bottom
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
   setActiveSection(section);
});

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', function(event) {
    const pageHeaderBottom = document.querySelector('.page__header');
    const sections = document.querySelectorAll('section');
    for (section of sections) {
        const topPos = section.getBoundingClientRect().top -
            pageHeaderBottom.getBoundingClientRect().bottom;
        // console.log(`${section.id}: ${section.getBoundingClientRect().top}, ${topPos}`);
        if (topPos >=0 && topPos < 100) {
            setActiveSection(section);
            break;
        }
    }
});
