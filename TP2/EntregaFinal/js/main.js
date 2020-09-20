// VEI - TPE2

"use strict"

let game = null;
let canvas = null;

// let context = null;

// let board;
// let token;
// let selectedToken = null;

async function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    let context = canvas.getContext("2d");

    game = new Game(context);

    if (await game.initGame()){
       
        game.drawBoard();
        game.drawTokens();
    
    }
    

}

document.addEventListener("DOMContentLoaded", mainFunction);



// initGame: subscribe events
