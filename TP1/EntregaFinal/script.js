// TPE1 - Visualizacion e Interfaces.

"use strict"

let canvas;
let ctx;
let fileChooser;

let using_pencil;
let using_goma;


function white_canvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    disable_buttons(false);
}

function disable_buttons(state) {
    let buttons = document.querySelector(".toolbar").querySelectorAll("button"); 

    buttons.forEach(b => {
        b.disabled = state;
    })

    buttons = document.querySelector(".bottom-functions").querySelectorAll("button"); 
    
    buttons.forEach(b => {
        b.disabled = state;
    })
}

function showFileChooser() {
    fileChooser.click();
}

function pencil() {
    using_pencil = true;
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
    
    let image_data = await loadImageAsync(content);

    drawPreviewImage(image_data);

    disable_buttons(false);

}

function set_pixel(image_data,x,y,r,g,b,a) {
    let index = ( x + y * image_data.width) * 4;
    image_data.data[index+0] = r;
    image_data.data[index+1] = g;
    image_data.data[index+2] = b;
    image_data.data[index+3] = a;
}

function filterNeg(){
    
    let image_data = ctx.getImageData(0,0,canvas.width,canvas.height);

    for ( let x = 0; x < image_data.width; x++){
        for (let y = 0; y < image_data.height; y++){
            let index = ( x + y * image_data.width) * 4;
            let r = 255 - image_data.data[index];
            let g = 255 - image_data.data[index+1];
            let b = 255 - image_data.data[index+2];
            set_pixel(image_data,x,y,r,g,b,255);
        }
    }
    ctx.putImageData(image_data, 0, 0);
}

function use_mouse(e){

    let image_data = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    let bx = e.target.getBoundingClientRect();

    let mouse_x = e.clientX - bx.left;
    let mouse_y =  e.clientY - bx.top;

    // console.log(mouse_x + ", " + mouse_y);
    // console.log(canvas.);
    
    if (using_pencil){
        set_pixel(image_data,mouse_x,mouse_y,0,0,0,255);
    }

    if (using_goma){

    }

    ctx.putImageData(image_data,0,0);
}

function initPaint() {
    
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");

    fileChooser = document.querySelector('.fileChooser');

    using_pencil = false;
    using_goma = false;

    disable_buttons(true);

    fileChooser.addEventListener("change",setImage);

    canvas.addEventListener("click",use_mouse);

}

document.addEventListener("DOMContentLoaded", initPaint);