
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

function handleMenuBtn() {
    if (menu_btn.classList.contains("visible")){
        menu_btn.classList.remove("visible");
        // menu.style.visibility = "hidden";
        
        mantel.classList.remove("mantel_active");
        plate.classList.remove("plate_active");
        knife.classList.remove("knife_active");
        fork.classList.remove("fork_active");
        menu_items.classList.remove("menu_items_active");

    } else {
        menu_btn.classList.add("visible");
        // menu.style.visibility = "visible";

        mantel.classList.add("mantel_active");
        plate.classList.add("plate_active");
        knife.classList.add("knife_active");
        fork.classList.add("fork_active");
        menu_items.classList.add("menu_items_active");
    }
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

    // Events
    menu_btn.addEventListener("click", handleMenuBtn);
    window.addEventListener("scroll", handleScroll);
    
}

document.addEventListener("DOMContentLoaded", mainFunction);