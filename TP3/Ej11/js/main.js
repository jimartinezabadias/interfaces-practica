
"use strict"

let card_hover;
let card;
let cX;
let cY;

function mouseMove(e) {
    
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    let dX = mouseX - cX;
    let dY = mouseY - cY;
    
    let transform = "";

    transform += `rotateX(${ -dY * 0.16 }deg) rotateY(${ dX * 0.16 }deg)`; 
    
    card.style.transform = transform;

}

function mainFunction() {
    
    card_hover = document.querySelector(".card_hover");
    card = document.querySelector(".card");

    cX = card_hover.clientWidth / 2 ;
    cY = card_hover.clientHeight / 2 ;

    card_hover.addEventListener("mousemove", mouseMove);

}

document.addEventListener("DOMContentLoaded", mainFunction);