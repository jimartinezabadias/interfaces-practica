// VEI - TPE2

"use strict"

let canvas = null;
let context = null;

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    
    let fillImage = await Utils.loadImage('../../images/texture1.png');

    let posX = Utils.randomInteger(0,canvas.width);
    let posY = Utils.randomInteger(0,canvas.height);
    let width = Utils.randomInteger(20,200);
    let height = Utils.randomInteger(20,200);
    
    // let figure = new Rectangle(posX,posY,width,height,fillImage,context);
    let figure = new Circle(posX,posY,height,fillImage,context);
    
    figure.draw();

}

document.addEventListener("DOMContentLoaded", mainFunction);
