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
        // arrayFigures.forEach(fig => {
            if (token.isPointInside(mousePos)){
                selectedToken = token;
                canvas.addEventListener("mousemove",Mouse.handleMouseMove);
            }
        // });
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
        if (selectedToken){
            selectedToken = null;
            canvas.removeEventListener("mousemove",Mouse.handleMouseMove);
        }
    }

}