
"use strict"

let paris;
let remy;
let ling;
let col;
let menu_btn;
let menu;

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
    if (menu_btn.classList.contains("active")){
        menu_btn.classList.remove("active");
        menu.style.visibility = "hidden";
    } else {
        menu_btn.classList.add("active");
        menu.style.visibility = "visible";
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

    menu_btn.addEventListener("click", handleMenuBtn);
    window.addEventListener("scroll", handleScroll);
    
}

document.addEventListener("DOMContentLoaded", mainFunction);