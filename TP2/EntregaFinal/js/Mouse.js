class Mouse {

    static getMousePos(e) {
        let bx = e.target.getBoundingClientRect();
    
        return {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top
        };
    
    }
    
    static handleMouseDown(mouseEvent) {
        
        let mousePos = Mouse.getMousePos(mouseEvent);
        
        // let tokens_P1 = game.getTokens_P1();
        
        // tokens_P1.forEach( token => {
        //     if (token.isPointInside(mousePos)){
        //         game.setSelectedToken(token);
        //     }
        // });
        
        // let tokens_P2 = game.getTokens_P2();
        
        // tokens_P2.forEach( token => {
        //     if (token.isPointInside(mousePos)){
        //         game.setSelectedToken(token);
        //     }
        // });

        // if (game.getSelectedToken()){
            canvas.addEventListener("mousemove",Mouse.handleMouseMove);
            canvas.addEventListener("mouseup",Mouse.handleMouseUp);
        // }

    }
    
    static handleMouseMove(mouseEvent) {
        let selectedToken = game.getSelectedToken();
        if (selectedToken){
            
            let mousePos = Mouse.getMousePos(mouseEvent);
            selectedToken.moveTo(mousePos);
            
            Utils.clearCanvas();
            game.drawBoard();
            game.drawTokens();

        }
    }
    
    static handleMouseUp(mouseEvent) {
        
        let selectedToken = game.getSelectedToken();
        
        if (selectedToken){

            // let mousePos = Mouse.getMousePos(mouseEvent);
            
            // let newTokenPosition = null;
            
            // let columsDrops = game.getColumsDrop();
            
            // columsDrops.forEach( drop => {
            //     if (drop.isPointInside(mousePos)){
            //         let color = game.getTurn();
            //         newTokenPosition = game.getBoard().putToken(color,drop.columnNumber);
            //     } else {
            //         newTokenPosition = {
            //             x: Utils.randomInteger(50,150),
            //             y: Utils.randomInteger(250,450)
            //         };
            //     }
            // });

            // game.drawBoard();
            // game.drawTokens();
            // process board
            // next turn
            
            game.setSelectedToken(null);
        }

        canvas.removeEventListener("mousemove",Mouse.handleMouseMove);

        console.log(game.getTurn());
        let mousePos = Mouse.getMousePos(mouseEvent);
        
        let targetColumn = game.getBoard().getColumnIn(mousePos);

        if (targetColumn != -1){
            console.log(targetColumn);
            // game.putToken(targetColumn...);
        }
    }

}