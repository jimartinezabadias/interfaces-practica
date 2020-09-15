// VEI - TP2 - EJ4

"use strict"

let canvas = null;
let context = null;
let mousePos = null;
let maxFigures = 30;
let arrayFigures = null;
let selectedFigure = null;

function randomInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    
    let r = randomInteger(0,255);
    let g = randomInteger(0,255);
    let b = randomInteger(0,255);
    return `rgba(${r},${g},${b},255)`;

}

function clearCanvas() {
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fill();
}

function drawArrayFigures(arrFigures) {

    arrFigures.forEach(figure => {
        figure.draw();
    });

}

function setRandomFill(figure) {
    
    let fillType = randomInteger(0,1); 

    let r = randomInteger(0,255);
    let g = randomInteger(0,255);
    let b = randomInteger(0,255);
    let color = `rgba(${r},${g},${b},255)`;
    
    switch (fillType) {
        case 0:
            // color solido
            figure.setFill(color);
            break;
        case 1:
            // gradiente
            figure.setLinearGragientFill(color,`rgba(255,255,255,255)`);
            break;
        }

}

function newRandomFigure(canvas,context) {

    let newFigure = null;
    let figureType = randomInteger(0,1); 

    let posX = randomInteger(0,canvas.width);
    let posY = randomInteger(0,canvas.height);

    switch (figureType) {
        case 0:
            let width = randomInteger(5,50);
            let height = randomInteger(5,50);
            newFigure = new Rectangle(posX,posY,width,height,0,context);
            break;
        case 1:
            let radius = randomInteger(5,30);
            newFigure = new Circle(posX,posY,radius,0,context);
            break;
        }
    
    setRandomFill(newFigure);
    return newFigure;

}

function getArrayRandomFigures(canvas,context,maxFigures) {
    
    let arrFigures = new Array;

    for (let i = 0; i < maxFigures; i++) {
        arrFigures[i] = newRandomFigure(canvas,context); 
    }
    
    return arrFigures;

}

function getMousePos(e) {
    let bx = e.target.getBoundingClientRect();

    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top
    };

}

function handleMouseDown(mouseEvent) {
    let mousePos = getMousePos(mouseEvent);
    arrayFigures.forEach(fig => {
        if (fig.pointBelongs(mousePos)){
            selectedFigure = fig;
        }
    });
}

function handleMouseMove(mouseEvent) {
    if (selectedFigure){
        let mousePos = getMousePos(mouseEvent);
        selectedFigure.moveTo(mousePos);
        clearCanvas();
        drawArrayFigures(arrayFigures)
    }
}

function handleMouseUp() {
    if (selectedFigure)
        selectedFigure = null;
}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    arrayFigures = getArrayRandomFigures(canvas,context,maxFigures);

    drawArrayFigures(arrayFigures);

    canvas.addEventListener("mousedown",handleMouseDown);
    canvas.addEventListener("mousemove",handleMouseMove);
    canvas.addEventListener("mouseup",handleMouseUp);
}

document.addEventListener("DOMContentLoaded", mainFunction);