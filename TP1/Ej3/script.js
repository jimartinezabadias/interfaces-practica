// Ej3

function set_pixel(image_data,x,y,r,g,b,a) {
    let index = y * 4 + x * (image_data.width * 4);
    image_data.data[index] = r;
    image_data.data[index+1] = g;
    image_data.data[index+2] = b;
    image_data.data[index+3] = a;
}

function fill_region(image_data,r,g,b,a) {
    for ( let x = 0; x < image_data.height; x++){
        for (let y = 0; y < image_data.width; y++){
            set_pixel(image_data,x,y,r,g,b,a);
        }
    }    
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


fill_region(image_data,r,g,b,a);
ctx.putImageData(image_data,0,0);

