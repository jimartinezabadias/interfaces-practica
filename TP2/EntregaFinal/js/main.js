// VEI - TPE2

"use strict"

let game = null;
let canvas = null;
let context = null;
let menu = null;
let gameStats = null;
let statMessage = null;
let turnMessage = null;

function displayGame() {
    canvas.style.display = 'block';
    gameStats.style.display = 'block';
}

async function newGame() {
    
    menu.style.display = 'none';
    
    game = new Game(context);

    if (await game.initGame()){
        
        displayGame();

        game.drawBoard();
        game.drawTokens();
    
    }

}

function displayMenu() {

    menu = document.querySelector('#game_menu');
    menu.style.display = 'block';
    
    let platyBtn = document.querySelector('#play_btn');
    platyBtn.addEventListener('click',newGame);

}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    gameStats = document.querySelector('#game_stats');
    statMessage = document.querySelector('#stat_message');
    turnMessage = document.querySelector('#turn_stat');
    

    displayMenu();

}

document.addEventListener("DOMContentLoaded", mainFunction);


// pass turns
// verify board


// Move game matrix to game class
// Create array of slots in board.
