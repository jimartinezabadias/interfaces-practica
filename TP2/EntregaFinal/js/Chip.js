
const CHIP_SIZE = 25;

class Chip extends Circle {
    
    constructor (color,chipImage,context){
        
        super(50,50,CHIP_SIZE,chipImage,context);
        
        this.color = color;

    }

    getColor() {
        return this.color;
    }

    isDraggable(){
        // if in players turn
    }

}