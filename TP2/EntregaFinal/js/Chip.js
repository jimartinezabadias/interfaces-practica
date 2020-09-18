
const CHIP_SIZE = 25;

class Chip extends Circle {
    
    constructor (color,fill,context){
        super(50,50,CHIP_SIZE,fill,context);
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    isDraggable(){
        // if in players turn
    }

}