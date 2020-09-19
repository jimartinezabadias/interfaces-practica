// VEI - TPE2

"use strict"

let canvas = null;
let context = null;

let board;
let token;
let selectedToken = null;

const PLAYER_COLORS = {
    PLAYER_1: 'yellow',
    PLAYER_2: 'red'
}

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    board = new Board(context);

    board.draw();
    
    let tokenImage_P2 = await Utils.getTokenImage(PLAYER_COLORS.PLAYER_2); 
    let tokenImage_P1 = await Utils.getTokenImage(PLAYER_COLORS.PLAYER_1); 
    
    token = new Token(PLAYER_COLORS.PLAYER_1,tokenImage_P1,context);
    
    token.draw();


    canvas.addEventListener("mousedown",Mouse.handleMouseDown);
    canvas.addEventListener("mouseup",Mouse.handleMouseUp);
    

}

document.addEventListener("DOMContentLoaded", mainFunction);
