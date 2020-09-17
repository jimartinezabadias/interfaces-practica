// VEI - TPE2

"use strict"

let canvas = null;
let context = null;

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    
    let chipImage = await Utils.loadImage('images/texture1.png');

    let chip = new Chip(chipImage,context);
    
    chip.draw();

}

document.addEventListener("DOMContentLoaded", mainFunction);
