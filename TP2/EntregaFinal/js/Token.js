

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

    setPosition(point){
        this.figure.setPosition(point);
    }

    setInitialPosition(){
        
        let randomPoint;

        switch (this.color) {
            case PLAYER_1.COLOR:
                randomPoint = {
                    x: Utils.randomInteger(
                        50,
                        (canvas.width - BOARD_WIDTH) / 2 - 50),
                    y: Utils.randomInteger(
                        canvas.height / 2 - 50 ,
                        canvas.height / 2 + 50)
                };    
                break;
            case PLAYER_2.COLOR:
                randomPoint = {
                    x: Utils.randomInteger(
                        BOARD_WIDTH + (canvas.width - BOARD_WIDTH) / 2 + 50,
                        canvas.width - 50),
                    y: Utils.randomInteger(
                        canvas.height / 2 - 50,
                        canvas.height / 2 + 50)
                };
                break;
        }

        this.figure.setPosition(randomPoint);
    
    }

    draw(){
        this.figure.draw();
    }

}