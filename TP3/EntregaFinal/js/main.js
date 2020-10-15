
"use strict"

let paris;
let remy;
let ling;
let col;

function handleScroll() {
    let value = window.scrollY;
    // console.log(value);

    paris.style.backgroundPosition = `100% ${value * 0.12}%`;
    ling.style.backgroundPosition = `200px ${335 - value * 0.4}px`;
    col.style.backgroundPosition = `1070px ${430 - value * 0.4}px`;


}



function mainFunction() {
    paris = document.querySelector("#paris");
    remy = document.querySelector("#header_remy");
    ling = document.querySelector("#header_linguini");
    col = document.querySelector("#header_colete");

    window.addEventListener("scroll", handleScroll);
    
}

document.addEventListener("DOMContentLoaded", mainFunction);