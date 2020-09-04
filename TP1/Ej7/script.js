// Ej 7

function drawImage(ctx,image) {
    ctx.drawImage(image,0,0);
}

function set_pixel(image_data,x,y,r,g,b,a) {
    let index = ( x + y * image_data.width) * 4;
    image_data.data[index+0] = r;
    image_data.data[index+1] = g;
    image_data.data[index+2] = b;
    image_data.data[index+3] = a;
}

function avg_rgb(image_data,x,y) {
    let index = ( x + y * image_data.width) * 4;
    let sum = 0;
    sum += image_data.data[index+0];
    sum += image_data.data[index+1];
    sum += image_data.data[index+2];
    return sum / 3;
}

function bw_filter(image_data) {
    for ( let x = 0; x < image_data.width; x++){
        for (let y = 0; y < image_data.height; y++){
            let avg = avg_rgb(image_data,x,y);
            let r = avg;
            let g = avg;
            let b = avg;
            set_pixel(image_data,x,y,r,g,b,255);
        }
    }
}

let image = new Image();
// image.src = '../images/TafidelValle_Tucuman.JPG';
image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/TafidelValle_Tucuman.JPG/800px-TafidelValle_Tucuman.JPG';
image.crossOrigin = "Anonymous";

image.onload = function () {
    let canvas = document.querySelector("#myCanvas"); 
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext("2d");

    drawImage(ctx,this);
    let image_data = ctx.getImageData(0,0,this.width,this.height);

    bw_filter(image_data);
    
    ctx.putImageData(image_data,0,0);
}

