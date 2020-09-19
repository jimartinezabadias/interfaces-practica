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

    board = new Board(context);

    board.draw();
    
    let chipImage = await Utils.getChipImage(PLAYER_COLORS.PLAYER_2); 
    // let chipImage_P2 = await Utils.getChipImage(PLAYER_COLORS.PLAYER_2); 
    
    chip = new Chip(PLAYER_COLORS.PLAYER_2,chipImage,context);
    
    chip.draw();


    canvas.addEventListener("mousedown",Mouse.handleMouseDown);
    canvas.addEventListener("mouseup",Mouse.handleMouseUp);
    

}

document.addEventListener("DOMContentLoaded", mainFunction);
