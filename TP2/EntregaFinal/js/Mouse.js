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
                selectedToken = token;
            }
        });
        
        let tokens_P2 = game.getTokens_P2();
        
        tokens_P2.forEach( token => {
            if (token.isPointInside(mousePos)){
                selectedToken = token;
            }
        });

        if (selectedToken){
            canvas.addEventListener("mousemove",Mouse.handleMouseMove);
            canvas.addEventListener("mouseup",Mouse.handleMouseUp);
        }

    }
    
    static handleMouseMove(mouseEvent) {
        if (selectedToken){
            let mousePos = Mouse.getMousePos(mouseEvent);
            selectedToken.moveTo(mousePos);
            Utils.clearCanvas();
            board.draw();
            selectedToken.draw();
        }
    }
    
    static handleMouseUp() {
        // if (selectedToken){
            // selectedToken = null;
            canvas.removeEventListener("mousemove",Mouse.handleMouseMove);
        // }
    }

}