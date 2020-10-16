
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
        menu.style.visibility = "hidden";

        mantel.style.animation = "animate_mantel 0.3s steps(3)";
    } else {
        menu_btn.classList.add("visible");
        menu.style.visibility = "visible";

        mantel.style.animation = "animate_mantel 0.3s steps(3)";
        plate.style.animation = "animate_plate 0.3s steps(3) 0.1s forwards";
        knife.style.animation = "animate_knife 0.3s steps(3) 0.2s forwards";
        fork.style.animation = "animate_fork 0.3s steps(3) 0.2s forwards";
        menu_items.style.animation = "animate_menu-items 0.3s ease-in 0.3s forwards";
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

    menu_btn.addEventListener("click", handleMenuBtn);
    window.addEventListener("scroll", handleScroll);
    
}

document.addEventListener("DOMContentLoaded", mainFunction);