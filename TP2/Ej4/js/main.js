// VEI - TP2 - EJ1

"use strict"

let canvas = null;
let context = null;
let fileChooser = null;
let imageUploadBtn = null;
let currentImage = null;

function randomInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    // let fig = new Rectangle(200,200,100,100,0,context);
    // fig.draw();

    // let point = {
    //     x: 200,
    //     y: 250
    // };

    // console.log(fig.pointBelongs(point));
}

document.addEventListener("DOMContentLoaded", mainFunction);