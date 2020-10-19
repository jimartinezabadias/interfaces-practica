
"use strict"

// header
let header_background;
let header_ling;
let header_colette;
let lights;
let lightsTransform;

// menu
let menu_btn;
let menu;
let mantel;
let plate;
let knife;
let fork;
let menu_items;
let menu_options;

// cards
let ling_card;
let remy_card;
let colette_card;
let cardX;
let cardY;

// slider
let slideIndex = 1;


function handleScroll() {
    let value = window.scrollY;
    // console.log(value);

    // console.log(lights);

    // Animate Header
    if ( value < 290 ){
        header_background.style.backgroundPosition = `100% ${value * 0.07}%`;

        for (let i = 0; i < lights.length; i++) {
            let orig = lightsTransform[i];
            lights[i].style.transform = `translateX(${orig.x}px) translateY(${orig.y - value * 0.36}px)`;
        }
        
        header_ling.style.bottom = `${-35 + value * 0.12}%`;
        header_colette.style.bottom = `${-35 + value * 0.12}%`;
    }

}

function getTransform(lights) {
    let transform = new Array();

    for (let i = 0; i < lights.length; i++) {
        let style = window.getComputedStyle(lights[i])
                .getPropertyValue('transform')
                .match(/(-?[0-9\.]+)/g);
        transform.push({x: style[4], y: style[5]});    
    }

    return transform;
}

function showMenu() {
    menu_btn.classList.add("visible");
    menu.style.visibility = "visible";

    mantel.classList.add("mantel_active");
    plate.classList.add("plate_active");
    knife.classList.add("knife_active");
    fork.classList.add("fork_active");
    menu_items.classList.add("menu_items_active");
}

async function hideMenu() {
    menu_btn.classList.remove("visible");
        
    mantel.classList.remove("mantel_active");
    plate.classList.remove("plate_active");
    knife.classList.remove("knife_active");
    fork.classList.remove("fork_active");
    menu_items.classList.remove("menu_items_active");
    
    await new Promise(r => setTimeout(r, 500));

    menu.style.visibility = "hidden";
}


function handleMenuBtn() {
    if (menu_btn.classList.contains("visible")){
        hideMenu();
        menu_options.forEach(item => {
            item.removeEventListener("click",hideMenu);
        });
    } else {
        showMenu();
        menu_options.forEach(item => {
            item.addEventListener("click",hideMenu);
        });
    }
}

function mouseMove(e) {
    // console.log(e.target.id);

    let current_card = document.querySelector(`#${e.currentTarget.id}`);

    cardX = current_card.clientWidth / 2 ;
    cardY = current_card.clientHeight / 2 ;

    let mouseX = e.layerX;
    let mouseY = e.layerY;

    let dX = mouseX - cardX;
    let dY = mouseY - cardY;
    
    

    let transform_1 = `rotateX(${ -dY * 0.09 }deg) rotateY(${ dX * 0.09 }deg) translateZ(1em)`;
    let transform_dot5 = `rotateX(${ -dY * 0.04 }deg) rotateY(${ dX * 0.04 }deg) translateZ(-3em)`;
    let transform_x2 = `rotateX(${ -dY * 0.12 }deg) rotateY(${ dX * 0.12 }deg) translateZ(2em)`;
    

    current_card.childNodes[1].style.transform = transform_dot5;
    current_card.childNodes[3].style.transform = transform_1;
    current_card.childNodes[5].style.transform = transform_x2;

}

// function mouseLeave(e) {
//     ling_card.style.transition = "transform 0.3 ease-in";
// }


// Next/previous controls
function nextSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("selected");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("selected");
    }

    slides[slideIndex-1].classList.add("selected");
    dots[slideIndex-1].classList.add("selected");
}


function mainFunction() {
    
    // Header elements
    header_background = document.querySelector("#header_background");
    header_ling = document.querySelector("#header_linguini");
    header_colette = document.querySelector("#header_colette");
    lights = document.querySelectorAll(".light");
    lightsTransform = getTransform(lights);

    // Header events
    window.addEventListener("scroll", handleScroll);

    // Menu
    menu_btn = document.querySelector("#menu-button");
    menu = document.querySelector("#menu-container");
    mantel = document.querySelector("#menu-mantel");
    plate = document.querySelector("#menu-plate");
    knife = document.querySelector("#menu-knife");
    fork = document.querySelector("#menu-fork");
    menu_items = document.querySelector("#menu-items");
    menu_options = document.querySelectorAll(".menu-item");

    // Menu events
    menu_btn.addEventListener("click", handleMenuBtn);
    
    // Cards
    ling_card = document.querySelector("#ling_card");
    remy_card = document.querySelector("#remy_card");
    colette_card = document.querySelector("#colette_card");

    // Cards events
    ling_card.addEventListener("mousemove", mouseMove);
    remy_card.addEventListener("mousemove", mouseMove);
    colette_card.addEventListener("mousemove", mouseMove);
    
    // Slider
    // let prev = document.querySelector("[data-slide=prev]");
    // let next = document.querySelector("[data-slide=next]");
    
    currentSlide(slideIndex);

    // let first_slide = document.querySelector(`#slide-${slideIndex}`);
    // first_slide.classList.add("selected");

    // prev.addEventListener("click", nextSlide(-1));
    // next.addEventListener("click", nextSlide(1));
    
}

document.addEventListener("DOMContentLoaded", mainFunction);