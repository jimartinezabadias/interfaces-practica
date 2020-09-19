
const TOKEN_SIZE = 25;

class Token extends Circle {
    
    constructor (color,tokenImage,context){
        
        super(50,50,TOKEN_SIZE,tokenImage,context);
        
        this.color = color;

    }

    getColor() {
        return this.color;
    }

    isDraggable(){
        // if in players turn
    }

}