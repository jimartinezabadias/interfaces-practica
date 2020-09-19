
const BOARD_WIDTH = 480;
const BOARD_HEIGHT = 320;
const BOARD_COLOR = `#2F4073`;
const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;

const BOARD_SLOT = {
    EMPTY: null,
    PLAYER_1: PLAYER_COLORS.PLAYER_1,
    PLAYER_2: PLAYER_COLORS.PLAYER_2
}

class Board {

    constructor (context){
        
        this.figure = new Rectangle(50,50,BOARD_WIDTH,BOARD_HEIGHT,BOARD_COLOR,context);
        this.gameMatix = Utils.newGameMatrix();
        // console.table(this.gameMatix);

    }

    putToken(color,column){
        // set token in board matrix
        // return position

        let targetSlot = this.firstEmptySlot(column);

        if (targetSlot != -1) {
            this.gameMatix[column][targetSlot] = color;
        } else {
            // reject play
        }

        console.table(this.gameMatix);

    }

    areFourConnected(){
        // process board
    }

    firstEmptySlot(column){
        for (let i = 0; i <= BOARD_ROWS - 1; i++){
            if (this.gameMatix[column][i] == BOARD_SLOT.EMPTY){
                return i;
            }
        }
        return -1;
    }

    draw(){
        this.figure.draw();
    }

}