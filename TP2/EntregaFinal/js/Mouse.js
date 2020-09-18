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
            if (chip.isPointInside(mousePos)){
                selectedChip = chip;
                canvas.addEventListener("mousemove",Mouse.handleMouseMove);
            }
        // });
    }
    
    static handleMouseMove(mouseEvent) {
        if (selectedChip){
            let mousePos = Mouse.getMousePos(mouseEvent);
            selectedChip.moveTo(mousePos);
            Utils.clearCanvas();
            board.draw();
            selectedChip.draw();
        }
    }
    
    static handleMouseUp() {
        if (selectedChip){
            selectedChip = null;
            canvas.removeEventListener("mousemove",Mouse.handleMouseMove);
        }
    }

}