var cols = 3;
var rows = 3;

var matrix = [];
for (let i = 0; i < rows; i++){
    matrix[i] = [];
    for (let j = 0; j < cols; j++){
        matrix[i][j]= Math.random() * 100;
    }
}

console.table(matrix);

// Ej 1.A
// Escribir una función que retorne el valor máximo de toda la matriz

function max(matrix) {
    let m = 0;
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            if (matrix[i][j] > m){
                m = matrix[i][j];
            }
        }
    }   
    return m;
}

console.log("1)a) Max de matriz es: " + max(matrix));

// Ej 1.B
// Escribir una función que retorne el valor máximo contenido en 
// las filas pares y el valor mínimo en las filas impares.

function es_par(num) {
    return num % 2 == 0;
}

function max_min_por_fila(matrix) {
    result = [-1,100];
    for (let i = 0; i < rows; i++){
        if (es_par(i)){
            for (let j = 0; j < cols; j++){
                if (matrix[i][j] > result[0]){
                    result[0] = matrix[i][j];
                }
            }
        } else {
            for (let j = 0; j < cols; j++){
                if (matrix[i][j] < result[1]){
                    result[1] = matrix[i][j];
                }
            }
        }
    }
    return result;
}

const max_min_matriz = max_min_por_fila(matrix);

console.log("1)b) Max en filas pares: " + max_min_matriz[0] + "\n" +
            "1)b) Min en filas impares: " + max_min_matriz[1]);


// Ej 1.C
// Calcular el valor promedio de cada fila y guardarlos en un arreglo.

function promedio_filas(matrix) {
    let arr_promedios = [];
    for (let i = 0; i < rows; i++){
        let sum_fila = 0;
        for (let j = 0; j < cols; j++){
            sum_fila += matrix[i][j];
        }
        arr_promedios[i] = sum_fila / cols;
    }
    return arr_promedios;
}

console.log("1)c) Promedio de cada fila: ");
console.table(promedio_filas(matrix));