class Rectangle extends Figure {
    
    constructor (posX, posY, width, height, fill, context){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
    }

    draw(){
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
    }

    setLinearGragientFill(color1,color2){
        // recibe colors in arguments
        let gradient = this.context.createLinearGradient(this.posX,this.posY,this.posX,this.posY + this.height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        super.setFill(gradient);
    }

    getWidth(){
        return this.width;
    }
    
    getHeigth(){
        return this.height;
    }

}