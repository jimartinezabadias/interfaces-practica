
const PLAYER_1 = {
    COLOR: 'yellow'
}

const PLAYER_2 = {
    COLOR: 'red'
}


class Game {

    constructor (context){

        this.context = context;
        this.board = null;
        this.turn = null;
        this.tokens_P1 = null;
        this.tokens_P2 = null;
        this.selectedToken = null;

    }

    async initGame(){

        this.board = new Board(this.context);
        
        let tokenImage_P2 = await Utils.getTokenImage(PLAYER_2.COLOR); 
        let tokenImage_P1 = await Utils.getTokenImage(PLAYER_1.COLOR); 
        
        this.tokens_P1 = Utils.getTokenArray(PLAYER_1.COLOR,tokenImage_P1,this.context);
        this.tokens_P2 = Utils.getTokenArray(PLAYER_2.COLOR,tokenImage_P2,this.context);

        Utils.placeTokens(this.tokens_P1,this.tokens_P2);
        
        this.turn = PLAYER_1.COLOR;

        canvas.addEventListener("mousedown", Mouse.handleMouseDown);

        return true;

    }

    getContext(){
        return this.context;
    }
    
    getTokens_P1(){
        return this.tokens_P1;
    }

    getTokens_P2(){
        return this.tokens_P2;
    }
    
    getSelectedToken(){
        return this.selectedToken;
    }

    getBoard(){
        return this.board;
    }

    setSelectedToken(token){
        this.selectedToken = token;
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