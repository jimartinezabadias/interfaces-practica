
const BOARD_COLOR = `#2F4073`;
const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;
const TOKEN_SIZE = 25;
const BOARD_WIDTH = (TOKEN_SIZE * 2) * BOARD_COLUMNS + 10 * BOARD_COLUMNS;
const BOARD_HEIGHT = (TOKEN_SIZE * 2) * BOARD_ROWS + 10 * BOARD_ROWS;
const TOKEN_NUMBER = (BOARD_COLUMNS * BOARD_ROWS) / 2;

const BOARD_SLOT = {
    EMPTY: 'empty',
    PLAYER_1: PLAYER_1.COLOR,
    PLAYER_2: PLAYER_2.COLOR
}

class Board {

    constructor (context){
        
        this.figure = null;
        
        this.dropTokenArea = null;

        this.selectedDropArea = null;

        this.gameMatix = null;

        this.lastInsertedToken = null;

        this.context = context;

        // console.table(this.gameMatix);

    }

    async initBoard(){

        this.gameMatix = Utils.newGameMatrix();
        
        this.dropTokenArea = await Utils.newDropTokenArea(this.context);
        
        this.figure = new Rectangle(
            (canvas.width - BOARD_WIDTH) / 2 - 10,
            (canvas.height - BOARD_HEIGHT) / 2 - 10,
            BOARD_WIDTH + 20,
            BOARD_HEIGHT + 20,
            BOARD_COLOR,
            this.context);

    }

    putToken(color,targetColumn,targetRow){
        // set token in board matrix
        // returns new token position
        // sets lastInsertedToken

        if (targetRow != -1) {
            this.gameMatix[targetColumn][targetRow].state = color;
            this.lastInsertedToken = {i: targetColumn, j: targetRow };
            return this.gameMatix[targetColumn][targetRow].tokenPosition;
        } else {
            console.log('no empty slot');
        }

    }

    
    areFourConnected(){
        
        let row = this.arrayRow(this.lastInsertedToken.j);
        let col = this.arrayColumn(this.lastInsertedToken.i);
        let diagA = this.arrayDiagA(this.lastInsertedToken);
        let diagB = this.arrayDiagB(this.lastInsertedToken);


        let maxInRow = Utils.sumTokens(this.gameMatix,row);
        let maxInColumn = Utils.sumTokens(this.gameMatix,col);
        let maxInDiagA = Utils.sumTokens(this.gameMatix,diagA);
        let maxInDiagB = Utils.sumTokens(this.gameMatix,diagB);
        
        //#region console log 
        // console.log('rows:');
        // console.log(maxInRow);
        
        // console.log('columns:');
        // console.log(maxInColumn);

        // console.log('diagA:');
        // console.log(maxInDiagA);

        // console.log('diagB:');
        // console.log(maxInDiagB);
        // console.log('-------------');
        //#endregion

        return maxInRow == 4 || maxInColumn == 4 || maxInDiagA == 4 || maxInDiagB == 4; 


    }

    //#region Get Neighbors 
    arrayRow(row){
        let arr = new Array();
        for (let col = 0; col < BOARD_COLUMNS; col++){
            arr.push({i: col, j: row})
        }
        return arr;
    }
    
    arrayColumn(col){
        let arr = new Array();
        for (let row = 0; row < BOARD_ROWS; row++){
            arr.push({i: col, j: row})
        }
        return arr;
    }

    arrayDiagA(currentToken){
        
        let arr = new Array();
        
        let col = currentToken.i;
        let row = currentToken.j;
        
        while ((col > 0) && (row > 0)){
            col--;
            row--;
        }

        while ((col < BOARD_COLUMNS) && (row < BOARD_ROWS)) {
            arr.push({i: col, j: row});
            col++;
            row++;

        }

        return arr;
    
    }

    arrayDiagB(currentToken){
        
        let arr = new Array();
        
        let col = currentToken.i;
        let row = currentToken.j;
        
        while ( (col + 1 < BOARD_COLUMNS) && (row > 0)){
            col++;
            row--;
        }

        while ((col >= 0) && (row < BOARD_ROWS)) {
            arr.push({i: col, j: row});
            col--;
            row++;

        }

        return arr;
    
    }
    //#endregion


    firstEmptySlot(column){
        for (let i = BOARD_ROWS - 1; i >= 0; i--){
            if (this.gameMatix[column][i].state == BOARD_SLOT.EMPTY){
                return i;
            }
        }
        return -1;
    }

    draw(){

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            if ( i == this.selectedDropArea){
                this.dropTokenArea[i].draw();
            } else {
                this.dropTokenArea[i].drawDisabled();
            }
        }

        // this.dropTokenArea.forEach( drop => {
        //     drop.drawDisabled();
        // });

        this.figure.draw();

        this.drawBoardFront();

        this.selectedDropArea = null;
        // console.table(this.gameMatix);
    }

    getColumnIn(mousePos) {

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            if (this.dropTokenArea[i].isPointInside(mousePos)){
                return i;
            }
        }

        return -1;

    }

    getLastInsertedToken(){
        return this.lastInsertedToken;
    }

    drawBoardFront(){
        for (let i = 0; i < BOARD_COLUMNS; i++){
            for (let j = 0; j < BOARD_ROWS; j++){
                let circle = new Circle(
                    this.gameMatix[i][j].tokenPosition.x,
                    this.gameMatix[i][j].tokenPosition.y,
                    TOKEN_SIZE,
                    `#FFFFFF`,
                    this.context
                );
                circle.draw();

            }
        }
    }

    setSelectedDropArea(column){
        this.selectedDropArea = column;
    }

    getSelectedDropArea(){
        return this.selectedDropArea;
    }

}