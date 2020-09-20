// VEI - TPE2

"use strict"

// let canvas = null;
// let context = null;

// let board;
// let token;
// let selectedToken = null;

async function mainFunction() {
    
    let canvas = document.querySelector("#myCanvas");
    let context = canvas.getContext("2d");

    let game = new Game(canvas,context);

    if (await game.initGame()){
       
        // game.update ?
        game.drawBoard();
        game.drawTokens();
    
    }
    

}

document.addEventListener("DOMContentLoaded", mainFunction);


// initGame: initial position of tokens
// initGame: subscribe events
