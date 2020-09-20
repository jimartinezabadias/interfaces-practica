
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
        
        this.dropArea = Utils.newDropArea(context);

        this.gameMatix = Utils.newGameMatrix();

        console.table(this.gameMatix);
        console.table(this.dropArea);

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

        // console.table(this.gameMatix);

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
        // console.table(this.gameMatix);
    }

    getColumnIn(mousePos) {

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            if (this.dropArea[i].isPointInside(mousePos)){
                return i;
            }
        }

        return -1;

    }

}