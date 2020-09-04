// TPE1 - Visualizacion e Interfaces.

"use strict"

let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let fileChooser = document.querySelector('.fileChooser');

function white_canvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function showFileChooser() {
    fileChooser.click();
}

function initPaint() {
    
    
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.readAsDataURL(file); // this is reading as data url

        reader.onload = () => {
        resolve(reader.result);
        };

        reader.onerror = reject;

    })
}

async function processFile(asd) {
    try {
        let file = asd.files[0];
        let content = await readFileAsync(file);
        
        return content;

    } catch(err) {
        console.log(err);
    }
}

function loadImageAsync(content) {
    return new Promise((resolve, reject) => {
        let image = new Image();

        image.src = content;

        image.onload = () => {
            resolve(image);
        };

        image.onerror = reject;

    })
}

function largerThanCanvas(imageData) {
    return (imageData.width > canvas.width) || (imageData.height > canvas.height);
}

function drawPreviewImage(imageData) {
    
    let imageScaledWidth = imageData.width;
    let imageScaledHeight = imageData.height;

    if (largerThanCanvas(imageData)){
        
        if (imageData.width > imageData.height){
            let imageAspectRatio = (1.0 * imageData.height) / imageData.width;
            imageScaledWidth = canvas.width;
            imageScaledHeight = canvas.width * imageAspectRatio;
        } else {
            let imageAspectRatio = (1.0 * imageData.width) / imageData.height;
            imageScaledWidth = canvas.height * imageAspectRatio;
            imageScaledHeight = canvas.height;
        }

        
    }
    
    // draw image on canvas
    ctx.drawImage(imageData, 0, 0, imageScaledWidth, imageScaledHeight);

}

async function setImage() {

    let chosenFile = this;

    let content = await processFile(chosenFile);
    
    let imageData = await loadImageAsync(content);

    drawPreviewImage(imageData);

}

document.addEventListener("DOMContentLoaded", initPaint);

fileChooser.addEventListener("change",setImage);
