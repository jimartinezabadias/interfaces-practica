var cols = 3;
var rows = 3;

var matrix = [];
for (let i = 0; i < cols; i++){
    matrix[i] = [];
    for (let j = 0; j < rows; j++){
        matrix[i][j]= Math.random() * 100;
    }
}

console.table(matrix);

function max(matrix) {
    let m = 0;
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            if (matrix[i][j] > m){
                m = matrix[i][j];
            }
        }
    }   
    return m;
}

console.log("1)a) Max de matriz es: " + max(matrix));