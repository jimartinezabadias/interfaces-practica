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

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    
    let chipImage = await Utils.loadImage('images/texture1.png');

    board = new Board(context);

    board.draw();
    
    chip = new Chip(PLAYER_COLORS.PLAYER_1,chipImage,context);
    
    chip.draw();


    canvas.addEventListener("mousedown",Mouse.handleMouseDown);
    canvas.addEventListener("mouseup",Mouse.handleMouseUp);
    

}

document.addEventListener("DOMContentLoaded", mainFunction);
