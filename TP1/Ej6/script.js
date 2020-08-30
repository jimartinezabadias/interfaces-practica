// Ej 6
// HSL

let canvas_1 = document.querySelector("#canvas_1"); 
let ctx_1 = canvas_1.getContext("2d");
let image_w = canvas_1.width;
let image_h = canvas_1.height;

let h = 0;
let s = 100;
let l = 50;

let h2 = (h + (180 - 30));
let h3 = (h + (180 + 30));

let grd = ctx_1.createLinearGradient(0, 0, 0, image_h);

grd.addColorStop(0, `hsl(${h},${s}%,${l}%)`);

grd.addColorStop(0.5, `hsl(${h2},${s}%,${l}%)`);

grd.addColorStop(1, `hsl(${h3},${s}%,${l}%)`);

ctx_1.fillStyle = grd;
ctx_1.fillRect(0, 0, image_w, image_h);


// RGB

let canvas_2 = document.querySelector("#canvas_2"); 
let ctx_2 = canvas_2.getContext("2d");

image_w = canvas_2.width;
image_h = canvas_2.height;

let image_data = ctx_2.createImageData(image_w,image_h);

function set_pixel(image_data,x,y,r,g,b,a) {
    let index = ( x + y * image_data.width) * 4;
    image_data.data[index+0] = r;
    image_data.data[index+1] = g;
    image_data.data[index+2] = b;
    image_data.data[index+3] = a;
}

function dif_color(color_1,color_2) {
    let result = [];
    result[0] = color_2[0] - color_1[0];
    result[1] = color_2[1] - color_1[1];
    result[2] = color_2[2] - color_1[2];
    return result;
}

function gradient_three(image_data,color_1,color_2,color_3) {
    
    let dif_1 = dif_color(color_1,color_2);
    let cft_1_r = dif_1[0] / (image_data.height / 2);
    let cft_1_g = dif_1[1] / (image_data.height / 2);
    let cft_1_b = dif_1[2] / (image_data.height / 2);

    let dif_2 = dif_color(color_2,color_3);
    let cft_2_r = dif_2[0] / (image_data.height / 2);
    let cft_2_g = dif_2[1] / (image_data.height / 2);
    let cft_2_b = dif_2[2] / (image_data.height / 2);

    for ( let x = 0; x < image_data.width; x++){
        for (let y = 0; y < image_data.height; y++){            
            if (y <= image_h / 2){
                r = color_1[0] + cft_1_r * y;
                g = color_1[1] + cft_1_g * y;
                b = color_1[2] + cft_1_b * y;
            } else {
                r = color_2[0] + cft_2_r * (y - (image_data.height / 2));
                g = color_2[1] + cft_2_g * (y - (image_data.height / 2));
                b = color_2[2] + cft_2_b * (y - (image_data.height / 2));
            } 
            set_pixel(image_data,x,y,r,g,b,255);
        }
    }
    
}

color_1 = [255,0,0];
color_2 = [240,240,0];
color_3 = [170,170,170];

gradient_three(image_data,color_1,color_2,color_3);
ctx_2.putImageData(image_data,0,0);
