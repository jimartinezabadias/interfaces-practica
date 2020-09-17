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

function newRandomFigure() {

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
    let image = await loadImage(fileData);
    // currentImage = imageData;
    
    // let figure = newRandomFigure();

    let posX = randomInteger(0,canvas.width);
    let posY = randomInteger(0,canvas.height);
    let width = randomInteger(5,50);
    let height = randomInteger(5,50);
    
    // let figure = new Rectangle(posX,posY,width,height,null,context);
    let figure = new Circle(posX,posY,height,null,context);
    figure.setFill(image);
    figure.draw();

}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    
    imageUploadBtn = document.querySelector("#image_upload_btn");
    fileChooser = document.querySelector('#fileInput');
    
    imageUploadBtn.addEventListener("click",showFileChooser);
    fileChooser.addEventListener("change",openFile);


}

document.addEventListener("DOMContentLoaded", mainFunction);