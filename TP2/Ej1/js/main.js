// VEI - TP2 - EJ1

"use strict"

function randomInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
            newFigure = new Rectangle(posX,posY,width,30,height,context);
            break;
        case 1:
            let radius = randomInteger(5,30);
            newFigure = new Circle(posX,posY,radius,0,context);
            break;
        }
        
    return newFigure;

}

function drawArrayRandomFigures(arrFigures) {

    arrFigures.forEach(figure => {
        figure.draw();
    });

}

function getArrayRandomFigures(canvas,context,maxFigures) {
    
    let arrFigures = new Array;

    for (let i = 0; i < maxFigures; i++) {
        arrFigures[i] = newRandomFigure(canvas,context); 
    }
    
    return arrFigures;

}


function mainFunction() {
    
    let canvas = document.querySelector("#myCanvas");
    let context = canvas.getContext("2d");

    let maxFigures = 30;

    let arrayFigures = getArrayRandomFigures(canvas,context,maxFigures);
    
    drawArrayRandomFigures(arrayFigures);

}

document.addEventListener("DOMContentLoaded", mainFunction);