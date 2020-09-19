
const TOKEN_SIZE = 25;

class Token {
    
    constructor (color,tokenImage,context){
        
        this.figure = new Circle(50,50,TOKEN_SIZE,tokenImage,context);
        
        this.color = color;
        this.inBoard = false;

    }

    getColor() {
        return this.color;
    }

    isInBoard(){
        return this.inBoard;
    }

    isDraggable(){
        // if in players turn
    }

    isPointInside(point){
        return this.figure.isPointInside(point);
    }

    moveTo(point){
        this.figure.moveTo(point);
    }

    draw(){
        this.figure.draw();
    }

}