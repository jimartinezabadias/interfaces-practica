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

// async function loadImage() {

//     // getting a hold of the file reference
//     let file = this.files[0];

//     // setting up the reader
//     let reader = new FileReader();
//     reader.readAsDataURL(file); // this is reading as data url

//     let content = await reader.


// }

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

// async function processImage(asd) {
//     try {
//         let file = asd.files[0];
//         let content = await readFileAsync(file);
        
//         return content;

//     } catch(err) {
//         console.log(err);
//     }
// }

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

async function setImage() {

    let chosenFile = this;

    let content = await processFile(chosenFile);
    
    let imageData = await loadImageAsync(content);


    let imageAspectRatio = (1.0 * imageData.height) / imageData.width;
    let imageScaledWidth = canvas.width;
    let imageScaledHeight = canvas.width * imageAspectRatio;
    
    // draw image on canvas
    ctx.drawImage(imageData, 0, 0, imageScaledWidth, imageScaledHeight);

    // console.log(imageData);
}

document.addEventListener("DOMContentLoaded", initPaint);

fileChooser.addEventListener("change",setImage);
