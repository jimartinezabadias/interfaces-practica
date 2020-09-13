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

function setRandomFill(figure,image) {
    
    let fillType = randomInteger(0,2); 

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
        case 2:
            // imagen
            figure.setImagePatternFill(image);
            break;
        }

}

function loadImage(src){
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function loadFile(file){
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

function showFileChooser() {
    fileChooser.click();
}

async function openFile() {
    let fileData = await loadFile(this.files[0]);
    let imageData = await loadImage(fileData);
    currentImage = imageData;
}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    
    imageUploadBtn = document.querySelector("#image_upload_btn");
    fileChooser = document.querySelector('#fileInput');
    
    imageUploadBtn.addEventListener("click",showFileChooser);
    fileChooser.addEventListener("change",openFile);

    let maxFigures = 30;

    // let arrayFigures = getArrayRandomFigures(canvas,context,maxFigures);

    

    // load image
    // let image = await loadImage("../../images/texture1.png");
    // let image = await loadImage("../../images/matechar.jpg");
    
    // arrayFigures.forEach(figure => {
    //     setRandomFill(figure,image);
    // });

    
    // drawArrayRandomFigures(arrayFigures);

}

document.addEventListener("DOMContentLoaded", mainFunction);