class Mouse {

    static getMousePos(e) {
        let bx = e.target.getBoundingClientRect();
    
        return {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top
        };
    
    }
    
    static handleMouseDown(mouseEvent) {

        let selectedToken = null;
        
        let mousePos = Mouse.getMousePos(mouseEvent);
        
        let tokens_P1 = game.getTokens_P1();
        
        tokens_P1.forEach( token => {
            if (token.isPointInside(mousePos)){
                game.setSelectedToken(token);
            }
        });
        
        let tokens_P2 = game.getTokens_P2();
        
        tokens_P2.forEach( token => {
            if (token.isPointInside(mousePos)){
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
            selectedToken.moveTo(mousePos);
            Utils.clearCanvas();
            game.drawBoard();
            game.drawTokens();
        }
    }
    
    static handleMouseUp() {
        let selectedToken = game.getSelectedToken();
        if (selectedToken){
            game.setSelectedToken(null);
            canvas.removeEventListener("mousemove",Mouse.handleMouseMove);
        }
    }

}