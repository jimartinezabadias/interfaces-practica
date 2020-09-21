
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
        
        this.figure = new Rectangle(
            (canvas.width - BOARD_WIDTH) / 2 - 10,
            (canvas.height - BOARD_HEIGHT) / 2 - 10,
            BOARD_WIDTH + 20,
            BOARD_HEIGHT + 20,
            BOARD_COLOR,
            context);
        
        this.dropTokenArea = Utils.newDropTokenArea(context);

        this.gameMatix = Utils.newGameMatrix();

        console.table(this.gameMatix);


    }

    putToken(color,column){
        // set token in board matrix
        // return position

        let targetSlot = this.firstEmptySlot(column);

        if (targetSlot != -1) {
            this.gameMatix[column][targetSlot].state = color;
            return this.gameMatix[column][targetSlot].tokenPosition;
        } else {
            console.log('no empty slot');
        }

    }

    areFourConnected(){
        // process board
    }

    firstEmptySlot(column){
        for (let i = BOARD_ROWS - 1; i >= 0; i--){
            if (this.gameMatix[column][i].state == BOARD_SLOT.EMPTY){
                return i;
            }
        }
        return -1;
    }

    draw(){
        this.figure.draw();
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

}