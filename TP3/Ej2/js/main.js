"use strict"

let canvas = null;
let context = null;

let centerX = 0;
let centerY = 0;
let radius = 0;
let hoursArrowLenght = 0;
let minArrowLenght = 0;
let secArrowLenght = 0;

function redraw() {
    context.fillStyle = '#CCCCCC';
    context.fillRect(0,0,canvas.width,canvas.height);

    context.strokeStyle = '#000000';
    context.lineWidth = 8;
    context.beginPath();
    context.arc(centerX,centerY,radius,0,2 * Math.PI);
    context.stroke();
    context.closePath();

    let now = new Date();

    context.strokeStyle = '#000000';
    
    // draw hours
    context.lineWidth = 6;
    let angle = ( now.getHours() / 60 ) * 2 * Math.PI - Math.PI / 2;
    let px = centerX + Math.cos(angle) * hoursArrowLenght;
    let py = centerY + Math.sin(angle) * hoursArrowLenght;
    context.moveTo(centerX,centerY);
    context.lineTo(px,py);
    context.stroke();

    // draw minutes
    context.lineWidth = 4;
    angle = ( now.getMinutes() / 60 ) * 2 * Math.PI - Math.PI / 2;
    px = centerX + Math.cos(angle) * hoursArrowLenght;
    py = centerY + Math.sin(angle) * hoursArrowLenght;
    context.moveTo(centerX,centerY);
    context.lineTo(px,py);
    context.stroke();

    // draw seconds
    context.lineWidth = 2;
    angle = ( now.getSeconds() / 60 ) * 2 * Math.PI - Math.PI / 2;
    px = centerX + Math.cos(angle) * hoursArrowLenght;
    py = centerY + Math.sin(angle) * hoursArrowLenght;
    context.moveTo(centerX,centerY);
    context.lineTo(px,py);
    context.stroke();

}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    
    radius = (canvas.width / 2) * 0.8;

    hoursArrowLenght = radius * 0.65;
    minArrowLenght = radius * 0.75;
    secArrowLenght = radius * 0.85;
    
    setInterval(redraw,1000);
}

document.addEventListener("DOMContentLoaded", mainFunction);