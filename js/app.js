const sectionsList = document.querySelectorAll('section');
const navigationMenu = document.querySelector('#navbar__list');
const documentFragment = document.createDocumentFragment();
let links = [];
let ticking = false;

createNavigationMenu();




function addActiveClass() {
    for (let section of sectionsList) {

        if (isInViewPort(section)){
            let link = links.find((l)=> l.hash === `#${section.id}`);
            link.classList.add('active');
            section.classList.add('active');
        }else {
            let link = links.find((l)=> l.hash === `#${section.id}`);
            link.classList.remove('active');
            section.classList.remove('active');
        }
    }
}

// listen for scroll event to handle active state
document.addEventListener('scroll', ()=> {
    if (!ticking) {
        window.requestAnimationFrame(()=> {
            addActiveClass();
            ticking = false;
        });
        ticking = true;
    }
});


// listen for links clicks and change default behavior
navigationMenu.addEventListener('click',(event)=> {
    const link  = event.target;
    if (link.hash !== undefined){
        event.preventDefault();
        document.location.hash = link.hash;
        scrollToSection(link);
    }
});


function scrollToSection(link) {
    let section = document.querySelector(link.hash);
    window.scrollBy({
        top: section.getBoundingClientRect().top-navigationMenu.clientHeight,
        left: section.getBoundingClientRect().left,
        behavior: 'smooth'
    });
}

function isInViewPort(element) {
    let rect = element.getBoundingClientRect();
    //check if on large screens
    if(window.matchMedia('(min-width:35em)').matches){
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    } else {
        return (
            rect.top >= 0 && rect.top <=window.innerHeight&&
            rect.left >= 0
        );
    }

}



function createNavigationLink(navigationItem, section) {
    let link = document.createElement('a');
    link.href = `#${section.dataset.nav.toLowerCase().replace(' ','')}`;
    link.classList.add('menu__link');
    link.innerText = section.dataset.nav;
    links.push(link);
    return link;
}

function createNavigationItem(section) {
    let navigationItem = document.createElement('li');
    navigationItem.appendChild(createNavigationLink(navigationItem, section));
    return navigationItem;
}

function createNavigationItems() {
    sectionsList.forEach((section=>{
        let navigationItem = createNavigationItem(section);
        documentFragment.appendChild(navigationItem);
    }));
}

function createNavigationMenu() {
    createNavigationItems();
    links[0].classList.add('active');
    navigationMenu.appendChild(documentFragment);
}
