
"use strict"

// header
let paris;
let remy;
let ling;
let col;

// menu
let menu_btn;
let menu;
let mantel;
let plate;
let knife;
let fork;
let menu_items;

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

    // Animate Header
    if ( value < 500 ){
        paris.style.backgroundPosition = `100% ${value * 0.12}%`;
        ling.style.backgroundPosition = `200px ${335 - value * 0.4}px`;
        col.style.backgroundPosition = `1070px ${430 - value * 0.4}px`;
    }

}

async function handleMenuBtn() {
    if (menu_btn.classList.contains("visible")){
        menu_btn.classList.remove("visible");
        
        mantel.classList.remove("mantel_active");
        plate.classList.remove("plate_active");
        knife.classList.remove("knife_active");
        fork.classList.remove("fork_active");
        menu_items.classList.remove("menu_items_active");
        
        await new Promise(r => setTimeout(r, 500));

        menu.style.visibility = "hidden";

    } else {
        menu_btn.classList.add("visible");
        menu.style.visibility = "visible";

        mantel.classList.add("mantel_active");
        plate.classList.add("plate_active");
        knife.classList.add("knife_active");
        fork.classList.add("fork_active");
        menu_items.classList.add("menu_items_active");
    }
}

function mouseMove(e) {
    // console.log(e.target.id);

    let current_card = document.querySelector(`#${e.target.id}`);

    cardX = current_card.clientWidth / 2 ;
    cardY = current_card.clientHeight / 2 ;

    let mouseX = e.layerX;
    let mouseY = e.layerY;

    let dX = mouseX - cardX;
    let dY = mouseY - cardY;
    
    let transform = "";

    transform += `rotateX(${ -dY * 0.03 }deg) rotateY(${ dX * 0.03 }deg)`; 

    current_card.style.transform = transform;

}

// function mouseLeave(e) {
//     ling_card.style.transition = "transform 0.3 ease-in";
// }


// function showPrevSlide() {
//     let actual_slide = document.querySelector(`#slide-${selected}`);
//     selected--;
//     if (selected < 1) {
//         selected = 6;
//     }
//     let next_slide = document.querySelector(`#slide-${selected}`);
    
//     actual_slide.classList.remove("selected");
//     next_slide.classList.add("selected");
// }

// function showNextSlide() {
//     let actual_slide = document.querySelector(`#slide-${selected}`);
//     selected++;
//     if (selected > 6) {
//         selected = 1;
//     }
//     let next_slide = document.querySelector(`#slide-${selected}`);
    
//     actual_slide.classList.remove("selected");
//     next_slide.classList.add("selected");
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
    paris = document.querySelector("#paris");
    remy = document.querySelector("#header_remy");
    ling = document.querySelector("#header_linguini");
    col = document.querySelector("#header_colete");

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