class Circle extends Figure {
    
    constructor (posX, posY, radius, fill, context){
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    setLinearGragientFill(color1,color2){
        let gradient = this.context.createLinearGradient(this.posX - this.radius,this.posY - this.radius,this.posX + this.radius,this.posY + this.radius);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        super.setFill(gradient);
    }

    setImageFill(imageData){
        // console.log(imageData);
        this.context.drawImage(
            imageData,
            this.posX - this.radius,
            this.posY - this.radius,
            this.radius * 2,
            this.radius * 2);
        // let scaledImage = this.context.getImageData(this.posY,this.posY,this.width,this.height);
        
        // super.setSingleImageFill(scaledImage);
        
        // 
        // this.context.fillStyle = "#ffffff";
        // this.context.fillRect(this.posY,this.posY,this.width,this.height);
    }

    getRadius(){
        return this.radius;
    }

    pointBelongs(point){
        let distance =  (point.x - this.posX) * (point.x - this.posX) +
                        (point.y - this.posY) * (point.y - this.posY);
        
        if (distance < (this.radius) * (this.radius)) {
            return true;
        }
        return false;
    }

}