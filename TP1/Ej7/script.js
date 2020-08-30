// Ej 7

function drawImage(ctx,image) {
    ctx.drawImage(image,0,0);
}

let image = new Image();
// image.src = 'TafidelValle_Tucuman.JPG';
image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/TafidelValle_Tucuman.JPG/800px-TafidelValle_Tucuman.JPG';

image.onload = function () {
    let canvas = document.querySelector("#myCanvas"); 
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext("2d");

    drawImage(ctx,this);
    let image_data = ctx.getImageData(0,0,this.width,this.height);

    
    ctx.putImageData(image_data,0,0);
}

