// Ej 7

function set_pixel(image_data,x,y,r,g,b,a) {
    let index = ( x + y * image_data.width) * 4;
    image_data.data[index+0] = r;
    image_data.data[index+1] = g;
    image_data.data[index+2] = b;
    image_data.data[index+3] = a;
}

let r = 0;
let g = 0;
let b = 0;
let a = 255;

let canvas = document.querySelector("#myCanvas"); 
let image_w = canvas.width;
let image_h = canvas.height;

let ctx = canvas.getContext("2d");
let image_data = ctx.createImageData(image_w,image_h);


gradient_three(image_data,r,g,b,a);
ctx.putImageData(image_data,0,0);


