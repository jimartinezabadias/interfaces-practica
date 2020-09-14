// VEI - TP2 - EJ4

"use strict"

let canvas = null;
let context = null;
let mousePos = null;
let fig = null;

function randomInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    
    let r = randomInteger(0,255);
    let g = randomInteger(0,255);
    let b = randomInteger(0,255);
    return `rgba(${r},${g},${b},255)`;

}

function getMousePos(e) {
    let bx = e.target.getBoundingClientRect();

    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top
    };

}

function verifyMousePos(mouseEvent) {
    let mousePos = getMousePos(mouseEvent);
    if (fig.pointBelongs(mousePos)){
        let fill = getRandomColor();
        fig.setFill(fill);
        fig.draw();
    }
}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    fig = new Circle(200,200,100,0,context);
    fig.draw();


    canvas.addEventListener("click",verifyMousePos);
}

document.addEventListener("DOMContentLoaded", mainFunction);