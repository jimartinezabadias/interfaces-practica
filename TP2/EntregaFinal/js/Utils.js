
class Utils {
    
    static randomInteger(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static clearCanvas() {
        let context = game.getContext();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.fill();
    }

    //#region Token Images 
    
    // returns token image of the given color.
    static getTokenImage(color) {

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

    //#endregion

    
    static newGameMatrix(){

        let matrix =  new Array();

        for (let i = 1; i <= BOARD_COLUMNS; i++){
            let column = new Array();
            let slotX = ( (canvas.width - BOARD_WIDTH) / 2 ) + 
                        ( ((2 * i) - 1) * ((BOARD_WIDTH / BOARD_COLUMNS) / 2) );

            for (let j = 1; j <= BOARD_ROWS; j++){
                
                let newSlot = Utils.getNewBoardSlot();
                
                let slotY = ( (canvas.height - BOARD_HEIGHT) / 2 ) + 
                            ( ((2 * j) - 1) * ((BOARD_HEIGHT / BOARD_ROWS) / 2) );

                newSlot.state = BOARD_SLOT.EMPTY;
                newSlot.tokenPosition.x = slotX;
                newSlot.tokenPosition.y = slotY;
                column.push(newSlot);
            }
            matrix.push(column);
        }
        
        return matrix;

    }

    static async newDropTokenArea(context){

        let dropArea = new Array();

        let image = await Utils.loadImage('images/Untitled2.jpg');

        for (let i = 1; i <= BOARD_COLUMNS; i++){
            
            let dropSlot = new Rectangle(
                (canvas.width - BOARD_WIDTH) / 2 + (BOARD_WIDTH / BOARD_COLUMNS) * (i - 1),
                0,
                (BOARD_WIDTH / BOARD_COLUMNS),
                (canvas.height - BOARD_HEIGHT) / 2 - 20,
                image,
                context
            );
            
            dropArea.push(dropSlot);

        }

        return dropArea;

    }


    static getNewBoardSlot(){
        
        let slot = {
            state: null,
            tokenPosition : {
                x: null,
                y: null
            }
        };

        return slot;
        
    }

    static isValidColumn(index){
        return 0 <= index && index < BOARD_COLUMNS;
    }

    static isValidRow(index){
        return 0 <= index && index < BOARD_ROWS;
    }

    static sameTokenColor(gameMatrix,posToken1,posToken2){
        return (gameMatrix[posToken1.i][posToken1.j].state == gameMatrix[posToken2.i][posToken2.j].state);
    }

    static sameSlot(token1,token2){
        return (token1.i == token2.i) && (token1.j == token2.j); 
    }

    static getMousePos(e) {
        let bx = e.target.getBoundingClientRect();
    
        return {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top
        };
    
    }

}
