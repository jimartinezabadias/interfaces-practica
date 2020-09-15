class Figure {
    
    constructor (posX, posY, fill, context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
    }

    setFill(fill){
        this.fill = fill;
    }

    getPosition(){
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    setImagePatternFill(img){
        let pattern = this.context.createPattern(img,'repeat');
        this.setFill(pattern);
    }

    setSingleImageFill(img){
        let fillImage = this.context.createPattern(img,'no-repeat');
        this.setFill(fillImage);
    }

    draw(){
        this.context.fillStyle = this.fill;
    }

    moveTo(point){
        this.posX = point.x;
        this.posY = point.y;
    }

}