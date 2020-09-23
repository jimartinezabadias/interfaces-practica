
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
        
        this.tokens_P1 = this.newTokenArray(PLAYER_1.COLOR,tokenImage_P1,this.context);
        this.tokens_P2 = this.newTokenArray(PLAYER_2.COLOR,tokenImage_P2,this.context);

        this.placeTokens(this.tokens_P1,this.tokens_P2);
        
        this.turn = PLAYER_1.COLOR;

        canvas.addEventListener("mousedown", User.handleMouseDown);

        return true;

    }

    //#region Getters

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

    getTurn(){
        return this.turn;
    }

    //#endregion

    setSelectedToken(token){
        this.selectedToken = token;
    }

    setTurn(turn){
        this.turn = turn;
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

    nextTurn(){
        if (this.turn == PLAYER_1.COLOR){
            
            this.setTurn(PLAYER_2.COLOR);
        } else {
            this.setTurn(PLAYER_1.COLOR);
        }
    }

    newTokenArray(color,tokenImage,context){

        let array = new Array();

        for (let i = 0; i < TOKEN_NUMBER; i++) {
            let newToken = new Token(color,tokenImage,context);
            array[i] = newToken;
        }

        return array;
    }

    placeTokens(tokens_P1,tokens_P2){
        
        tokens_P1.forEach(token => { token.setInitialPosition(); });
        
        tokens_P2.forEach(token => {token.setInitialPosition(); });
    }
        


}