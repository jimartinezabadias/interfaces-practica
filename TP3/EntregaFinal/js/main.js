
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

    transform += `rotateX(${ -dY * 0.07 }deg) rotateY(${ dX * 0.07 }deg)`; 

    current_card.style.transform = transform;

}

function mouseLeave(e) {
    console.log("out");
    // ling_card.style.transition = "transform 0.3 ease-in";
}


function mainFunction() {
    
    // Header elements
    paris = document.querySelector("#paris");
    remy = document.querySelector("#header_remy");
    ling = document.querySelector("#header_linguini");
    col = document.querySelector("#header_colete");

    // Menu
    menu_btn = document.querySelector("#menu-button");
    menu = document.querySelector("#menu-container");
    mantel = document.querySelector("#menu-mantel");
    plate = document.querySelector("#menu-plate");
    knife = document.querySelector("#menu-knife");
    fork = document.querySelector("#menu-fork");
    menu_items = document.querySelector("#menu-items");

    // Cards
    ling_card = document.querySelector("#ling_card");
    remy_card = document.querySelector("#remy_card");
    colette_card = document.querySelector("#colette_card");

    // Events
    menu_btn.addEventListener("click", handleMenuBtn);
    window.addEventListener("scroll", handleScroll);
    
    ling_card.addEventListener("mousemove", mouseMove);
    remy_card.addEventListener("mousemove", mouseMove);
    colette_card.addEventListener("mousemove", mouseMove);
    // ling_card.addEventListener("mouseout", mouseLeave);
    
}

document.addEventListener("DOMContentLoaded", mainFunction);