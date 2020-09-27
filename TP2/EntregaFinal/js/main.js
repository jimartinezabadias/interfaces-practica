// VEI - TPE2

"use strict"

let game = null;
let canvas = null;
let context = null;
let menu = null;
let gameStats = null;
let gameFunctions = null;
let statMessage = null;
let turnMessage = null;
let columnsInput = null;
let rowsInput = null;

let BOARD_COLUMNS = 0;
let BOARD_ROWS = 0;

let BOARD_WIDTH = 0;
let BOARD_HEIGHT = 0;
let TOKEN_NUMBER = 0;

const TOKEN_SIZE = 25;

function displayGame() {
    canvas.style.display = 'block';
    gameStats.style.display = 'block';
    gameFunctions.style.display = 'block';
}

function hideGame() {
    canvas.style.display = 'none';
    gameStats.style.display = 'none';
    gameFunctions.style.display = 'none';
}



async function newGame() {
    
    menu.style.display = 'none';

    BOARD_COLUMNS = columnsInput.value;
    BOARD_ROWS = rowsInput.value;
    
    BOARD_WIDTH = (TOKEN_SIZE * 2) * BOARD_COLUMNS + 10 * BOARD_COLUMNS;
    BOARD_HEIGHT = (TOKEN_SIZE * 2) * BOARD_ROWS + 10 * BOARD_ROWS;
    TOKEN_NUMBER = (BOARD_COLUMNS * BOARD_ROWS) / 2;
    
    game = new Game(context);

    if (await game.initGame()){
        
        displayGame();

        game.drawBoard();
        game.drawTokens();
    
    }

}

function displayMenu() {

    hideGame();

    menu = document.querySelector('#game_menu');
    menu.style.display = 'block';
    
    let platyBtn = document.querySelector('#play_btn');
    platyBtn.addEventListener('click',newGame);

}

function mainFunction() {
    
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    gameStats = document.querySelector('#game_stats');
    gameFunctions = document.querySelector('#game_functions');
    statMessage = document.querySelector('#stat_message');
    turnMessage = document.querySelector('#turn_stat');
    columnsInput = document.querySelector('#columns');
    rowsInput = document.querySelector('#rows');
    

    displayMenu();

}

document.addEventListener("DOMContentLoaded", mainFunction);


// pass turns
// verify board


// Move game matrix to game class
// Create array of slots in board.
