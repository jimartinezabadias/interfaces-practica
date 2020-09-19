
class Utils {
    
    static randomInteger(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getTokenImage (color) {

        let imageURL = '';

        if (color == PLAYER_COLORS.PLAYER_1)
            imageURL = 'images/Yellow_token_1.jpg';
        else 
            imageURL = 'images/Red_token_1.jpg';

        return Utils.loadImage(imageURL);

    }
    
    static loadImage(src){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }

    static clearCanvas() {
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fill();
    }

    static newGameMatrix(){

        let matrix =  new Array();

        for (let i = 1; i <= BOARD_COLUMNS; i++){
            let column = new Array();
            for (let j = 1; j <= BOARD_ROWS; j++){
                column.push(BOARD_SLOT.EMPTY);
            }
            matrix.push(column);
        }
        
        return matrix;

    }

}
