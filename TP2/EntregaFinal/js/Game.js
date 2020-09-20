
const TOKEN_NUMBER = 21;

class Game {

    constructor (context){

        this.context = context;
        this.board = null;
        this.turn = null;
        this.tokens_P1 = null;
        this.tokens_P2 = null;

    }

    async initGame(){

        this.board = new Board(context);
        
        let tokenImage_P2 = await Utils.getTokenImage(PLAYER_2.COLOR); 
        let tokenImage_P1 = await Utils.getTokenImage(PLAYER_1.COLOR); 
        
        this.tokens_P1 = Utils.getTokenArray(PLAYER_1.COLOR,tokenImage_P1,this.context);
        this.tokens_P2 = Utils.getTokenArray(PLAYER_2.COLOR,tokenImage_P2,this.context);

        this.turn = PLAYER_1.COLOR;

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