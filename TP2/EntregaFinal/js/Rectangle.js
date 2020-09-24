class Rectangle extends Figure {
    
    constructor (posX, posY, width, height, fill, context){
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
    }

    getWidth(){
        return this.width;
    }
    
    getHeigth(){
        return this.height;
    }

    isPointInside(point){
        return this.posX <= point.x && point.x <= this.posX + this.width &&
               this.posY <= point.y && point.y <= this.posY + this.height;
    }

    draw(){
        
        
        super.draw();
        
        
        this.context.save();
        
        this.context.beginPath();
        
        this.context.moveTo (this.posX, this.posY);
        this.context.lineTo (this.posX + this.width, this.posY);
        this.context.lineTo (this.posX + this.width, this.posY + this.height);
        this.context.lineTo (this.posX, this.posY + this.height);
        this.context.lineTo (this.posX , this.posY);
        
        this.context.fill();
        
        if ( this.fill instanceof Image ){
            // clip
            this.context.clip();
            // insert the image
            this.context.drawImage(
                this.fill,
                this.posX,
                this.posY,
                this.width,
                this.height);
        }

        this.context.closePath();
        
        this.context.restore();

    }

    drawDisabled(){
        this.draw();
        let currentFill = this.getFill();
        this.setFill(`rgba(255,255,255,0.3)`);
        this.draw();
        this.setFill(currentFill);
    }
    
}