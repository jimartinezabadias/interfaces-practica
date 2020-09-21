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
        
        let tokens_P1 = game.getTokens_P1();
        
        tokens_P1.forEach( token => {
            if (token.isPointInside(mousePos) && token.isDraggable()){
                game.setSelectedToken(token);
            }
        });
        
        let tokens_P2 = game.getTokens_P2();
        
        tokens_P2.forEach( token => {
            if (token.isPointInside(mousePos) && token.isDraggable()){
                game.setSelectedToken(token);
            }
        });

        if (game.getSelectedToken()){
            canvas.addEventListener("mousemove",Mouse.handleMouseMove);
            canvas.addEventListener("mouseup",Mouse.handleMouseUp);
        }

    }
    
    static handleMouseMove(mouseEvent) {
        let selectedToken = game.getSelectedToken();
        if (selectedToken){
            
            let mousePos = Mouse.getMousePos(mouseEvent);
            selectedToken.setPosition(mousePos);
            
            Utils.clearCanvas();
            game.drawBoard();
            game.drawTokens();

        }
    }
    
    static handleMouseUp(mouseEvent) {
        
        let selectedToken = game.getSelectedToken();
        
        if (selectedToken){

            let mousePos = Mouse.getMousePos(mouseEvent);

            let color = game.getTurn();
        
            let board = game.getBoard();
            let targetColumn = board.getColumnIn(mousePos);
            let newTokenPosition = null;

            if (targetColumn != -1){
                if ( board.firstEmptySlot(targetColumn) != -1 ){
                    newTokenPosition = board.putToken(color,targetColumn);
                    selectedToken.setPosition(newTokenPosition);
                    selectedToken.setUsed();
                } else {
                    selectedToken.setInitialPosition();    
                }
            } else {
                // reset token position
                if (board.figure.isPointInside(mousePos)){
                    selectedToken.setInitialPosition();
                }
            }
            
            Utils.clearCanvas();
            game.drawBoard();
            game.drawTokens();
            
            // process board
            // next turn
            
            game.setSelectedToken(null);
        }

        canvas.removeEventListener("mousemove",Mouse.handleMouseMove);

    }

}