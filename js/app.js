//const startingTime = performance.now();
const sectionsList = document.querySelectorAll('section');
const navigationMenu = document.querySelector('#navbar__list');
const documentFragment = document.createDocumentFragment();
let links = [];
let ticking = false;

createNavigationMenu();



//console.log(performance.now()-startingTime);


function addActiveClass() {
    // Do something with the scroll position
    for (let section of sectionsList) {

        if (isInViewPort(section)){
            let link = links.find((l)=> l.hash === `#${section.id}`);
            console.log(link);
            link.classList.add('active');
            section.classList.add('active');
        }else {
            let link = links.find((l)=> l.hash === `#${section.id}`);
            link.classList.remove('active');
            section.classList.remove('active');
        }
    }
}

document.addEventListener('scroll', ()=> {
    if (!ticking) {
        window.requestAnimationFrame(()=> {
            addActiveClass();
            ticking = false;
        });
        ticking = true;
    }
});



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
    return element.getBoundingClientRect().top >=0
        && element.getBoundingClientRect().left >=0
        && element.getBoundingClientRect().right <= window.innerWidth
        && element.getBoundingClientRect().bottom <= window.innerHeight;
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
    for (let section of sectionsList) {
        let navigationItem = createNavigationItem(section);
        documentFragment.appendChild(navigationItem);
    }
}

function createNavigationMenu() {
    createNavigationItems();
    links[0].classList.add('active');
    navigationMenu.appendChild(documentFragment);
}
