
"use strict"

function accFunct(params) {
    
    this.classList.toggle("active");
    var accContent = this.nextElementSibling;
    if (accContent.style.maxHeight) {
        accContent.style.maxHeight = null;
    } else {
        accContent.style.maxHeight = accContent.scrollHeight + "px";
    } 
    
}

function mainFunction() {
    
    let acc = document.querySelectorAll(".acord-title");

    for (let i = 0; i < acc.length; i++) {
        
        acc[i].addEventListener("click", accFunct);

    }

}

document.addEventListener("DOMContentLoaded", mainFunction);
