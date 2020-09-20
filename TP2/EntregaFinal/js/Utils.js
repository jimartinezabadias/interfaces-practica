
class Utils {
    
    static randomInteger(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async getTokenImage(color) {

        let imageURL = '';

        if (color == PLAYER_1.COLOR)
            imageURL = 'images/Yellow_token_1.jpg';
        else 
            imageURL = 'images/Red_token_1.jpg';

        let image = Utils.loadImage(imageURL);
        
        return image;

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

        for (let i = 0; i <= BOARD_COLUMNS - 1; i++){
            let column = new Array();
            for (let j = 0; j <= BOARD_ROWS - 1; j++){
                column.push(BOARD_SLOT.EMPTY);
            }
            matrix.push(column);
        }
        
        return matrix;

    }

    static getTokenArray(color,tokenImage,context){

        let array = new Array();

        for (let i = 0; i < TOKEN_NUMBER - 1; i++) {
            let newToken = new Token(color,tokenImage,context);
            array[i] = newToken;
        }

        return array;
    }

    static placeTokens(tokens_P1,tokens_P2){
        
        tokens_P1.forEach(token => {
            let randomPoint = {
                x: Utils.randomInteger(50,150),
                y: Utils.randomInteger(250,450)
            };
            token.moveTo(randomPoint);
        });
        
        tokens_P2.forEach(token => {
            let randomPoint = {
                x: Utils.randomInteger(874,974),
                y: Utils.randomInteger(250,450)
            };
            token.moveTo(randomPoint);
        });
    }

}
