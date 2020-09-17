class Circle extends Figure {
    
    constructor (posX, posY, radius, fill, context){
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    getRadius(){
        return this.radius;
    }
    
    isPointInside(point){
        let distance =  (point.x - this.posX) * (point.x - this.posX) +
        (point.y - this.posY) * (point.y - this.posY);
        
        if (distance < (this.radius) * (this.radius)) {
            return true;
        }
        return false;
    }

    draw(){
        
        super.draw();

        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius, 0, 2 * Math.PI);
        this.context.fill();
        
        if ( this.fill instanceof Image ){
            // clip
            this.context.clip();
            // insert the image
            this.context.drawImage(
                this.fill,
                this.posX - this.radius,
                this.posY - this.radius,
                this.radius * 2,
                this.radius * 2);
        }

        this.context.closePath();

    }
    
}