// VEI - TPE2

"use strict"

let canvas = null;
let context = null;

let board;
let token;
let selectedToken = null;

const PLAYER_1 = {
    COLOR: 'yellow'
}

const PLAYER_2 = {
    COLOR: 'red'
}

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");

    let game = new Game(context);

    if (await game.initGame()){
       
        game.drawBoard();
        game.drawTokens();
    
    }

    // board = new Board(context);

    // board.draw();

    
    // board.putToken(PLAYER_1.COLOR,0);
    // board.putToken(PLAYER_2.COLOR,0);
    // board.putToken(PLAYER_1.COLOR,1);
    
    // let tokenImage_P2 = await Utils.getTokenImage(PLAYER_2.COLOR); 
    // let tokenImage_P1 = await Utils.getTokenImage(PLAYER_1.COLOR); 
    
    // token = new Token(PLAYER_1.COLOR,tokenImage_P1,context);
    
    // token.draw();


    // canvas.addEventListener("mousedown",Mouse.handleMouseDown);
    // canvas.addEventListener("mouseup",Mouse.handleMouseUp);
    

}

document.addEventListener("DOMContentLoaded", mainFunction);
