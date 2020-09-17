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

    setLinearGragientFill(color1,color2){
        let gradient = this.context.createLinearGradient(this.posX - this.radius,this.posY - this.radius,this.posX + this.radius,this.posY + this.radius);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        super.setFill(gradient);
    }

    // setImageFill(image){

        

        // console.log(imageData);
        
        // let scaledImage = this.context.getImageData(this.posY,this.posY,this.width,this.height);
        
        // super.setSingleImageFill(scaledImage);
        
        // 
        // this.context.fillStyle = "#ffffff";
        // this.context.fillRect(this.posY,this.posY,this.width,this.height);
    // }

    getRadius(){
        return this.radius;
    }

}