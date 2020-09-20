
const BOARD_WIDTH = 640;
const BOARD_HEIGHT = 480;
const BOARD_COLOR = `#2F4073`;
const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;

const BOARD_SLOT = {
    EMPTY: 'empty',
    PLAYER_1: PLAYER_1.COLOR,
    PLAYER_2: PLAYER_2.COLOR
}

class Board {

    constructor (context){
        
        this.figure = new Rectangle(
            (canvas.width - BOARD_WIDTH) / 2,
            (canvas.height - BOARD_HEIGHT) / 2,
            BOARD_WIDTH,
            BOARD_HEIGHT,
            BOARD_COLOR,
            context);

        // this.dropArea = new Rectangle(
        //     (canvas.width - BOARD_WIDTH) / 2,
        //     0,
        //     BOARD_WIDTH,
        //     (canvas.height - BOARD_HEIGHT) / 2,
        //     `rgba(0,0,0,50)`,
        //     context);
        
        this.dropTokenArea = Utils.newDropTokenArea(context);

        this.gameMatix = Utils.newGameMatrix();

        console.table(this.gameMatix);
        // console.table(this.dropTokenArea);

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

        console.table(this.gameMatix);

    }

    areFourConnected(){
        // process board
    }

    firstEmptySlot(column){
        for (let i = BOARD_ROWS - 1; i => 0; i--){
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