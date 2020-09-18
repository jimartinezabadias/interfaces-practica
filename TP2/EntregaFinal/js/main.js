// VEI - TPE2

"use strict"

let canvas = null;
let context = null;

let board;
let chip;
let selectedChip = null;

const PLAYER_COLORS = {
    PLAYER_1: 'yellow',
    PLAYER_2: 'red'
}

function clearCanvas() {
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fill();
}

function getMousePos(e) {
    let bx = e.target.getBoundingClientRect();

    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top
    };

}

function handleMouseDown(mouseEvent) {
    let mousePos = getMousePos(mouseEvent);
    // arrayFigures.forEach(fig => {
        if (chip.isPointInside(mousePos)){
            selectedChip = chip;
            canvas.addEventListener("mousemove",handleMouseMove);
        }
    // });
}

function handleMouseMove(mouseEvent) {
    if (selectedChip){
        let mousePos = getMousePos(mouseEvent);
        selectedChip.moveTo(mousePos);
        clearCanvas();
        board.draw();
        selectedChip.draw();
    }
}

function handleMouseUp() {
    if (selectedChip){
        selectedChip = null;
        canvas.removeEventListener("mousemove",handleMouseMove);
    }
}

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    
    let chipImage = await Utils.loadImage('images/texture1.png');

    board = new Board(context);

    board.draw();
    
    chip = new Chip(PLAYER_COLORS.PLAYER_1,chipImage,context);
    
    chip.draw();


    canvas.addEventListener("mousedown",handleMouseDown);
    canvas.addEventListener("mouseup",handleMouseUp);
    

}

document.addEventListener("DOMContentLoaded", mainFunction);
