class Game {

    constructor (context){

        this.context = context;
        this.board = null;
        this.turno = null;
        this.tokens_P1 = null;
        this.tokens_P2 = null;

    }

    initGame(){

        this.board = new Board(context);
        
        // this.fichas_P1 = null;
        // this.fichas_P2 = null;

        // this.turno = null;

    }

    drawBoard(){
        this.board.draw();
    }

    drawTokens(){

        this.token_P1.forEach( token => {
            token.draw();
        });
        
        this.token_P2.forEach( token => {
            token.draw();
        });

    }




}