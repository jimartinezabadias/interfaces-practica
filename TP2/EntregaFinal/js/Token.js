

class Token {
    
    constructor (color,tokenImage,context){
        
        this.figure = new Circle(512,50,TOKEN_SIZE,tokenImage,context);
        
        this.color = color;
        this.inBoard = false;

    }

    getColor() {
        return this.color;
    }

    setUsed(){
        this.inBoard = true;
    }
    
    isDraggable(){
        return !this.inBoard;
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