// VEI - TP2 - EJ3

"use strict"

let colorDiv = null;

function randomInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    
    let r = randomInteger(0,255);
    let g = randomInteger(0,255);
    let b = randomInteger(0,255);
    return `rgba(${r},${g},${b},255)`;

}

function changeDivColor() {
    
    let newColor = getRandomColor();
    colorDiv.style.backgroundColor = newColor;

}

function mainFunction() {

    colorDiv = document.querySelector("#colorDiv");

    document.addEventListener("click",changeDivColor);
    document.addEventListener("keydown",changeDivColor);
    

}

document.addEventListener("DOMContentLoaded", mainFunction);