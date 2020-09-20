
const PLAYER_1 = {
    COLOR: 'yellow'
}

const PLAYER_2 = {
    COLOR: 'red'
}

const TOKEN_NUMBER = 21;

class Game {

    constructor (canvas,context){

        this.canvas = canvas;
        this.context = context;
        this.board = null;
        this.turn = null;
        this.tokens_P1 = null;
        this.tokens_P2 = null;

    }

    async initGame(){

        this.board = new Board(this.context);
        
        let tokenImage_P2 = await Utils.getTokenImage(PLAYER_2.COLOR); 
        let tokenImage_P1 = await Utils.getTokenImage(PLAYER_1.COLOR); 
        
        this.tokens_P1 = Utils.getTokenArray(PLAYER_1.COLOR,tokenImage_P1,this.context);
        this.tokens_P2 = Utils.getTokenArray(PLAYER_2.COLOR,tokenImage_P2,this.context);

        this.turn = PLAYER_1.COLOR;

        this.canvas.addEventListener("mousedown",Mouse.handleMouseDown);
        // canvas.addEventListener("mouseup",Mouse.handleMouseUp);

        return true;

    }

    drawBoard(){
        this.board.draw();
    }

    drawTokens(){

        this.tokens_P1.forEach( token => {
            token.draw();
        });
        
        this.tokens_P2.forEach( token => {
            token.draw();
        });

    }

    getTurn(){
        return this.turn;
    }


}