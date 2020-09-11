// TPE1 - Visualizacion e Interfaces.

"use strict"

let canvas;
let ctx;
let fileChooser;
let current_image_data;

let selected_tool;
let using_pencil;
let using_rubber;


function white_canvas() {
    
    let aux_image_data = ctx.createImageData(canvas.width,canvas.height);
    
    // for pintando de blanco.
    for ( let x = 0; x < aux_image_data.width; x++){
        for (let y = 0; y < aux_image_data.height; y++){
            let r = 255;
            let g = 255;
            let b = 255;
            set_pixel(aux_image_data,x,y,r,g,b,255);
        }
    }

    current_image_data = aux_image_data;
    
    ctx.putImageData(current_image_data, 0, 0);

    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    disable_buttons(false);
}

function disable_buttons(state) {
    let buttons = document.querySelector(".toolbar").querySelectorAll("button"); 

    buttons.forEach(b => {
        b.disabled = state;
    })

    buttons = document.querySelector(".bottom-functions").querySelectorAll("button"); 
    
    buttons.forEach(b => {
        b.disabled = state;
    })

    let inputs = document.querySelector(".toolbar").querySelectorAll(".filter_range"); 
    
    inputs.forEach(i => {
        i.disabled = state;
    })
}

function showFileChooser() {
    fileChooser.click();
}

function deselect_buttons() {
    let buttons = document.querySelectorAll(".btn-tool");
    buttons.forEach(b => {
        b.classList.remove("selected");
    })
}

function select_pencil() {
    selected_tool = 'pencil';
    // deseleccionar todos los otros botones
    deselect_buttons();
    let button = document.querySelector("#pencil_btn");
    button.classList.add("selected");
}
function select_rubber() {
    selected_tool = 'rubber';
    deselect_buttons();
    let button = document.querySelector("#rubber_btn");
    button.classList.add("selected");
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.readAsDataURL(file); // this is reading as data url

        reader.onload = () => {
        resolve(reader.result);
        };

        reader.onerror = reject;

    })
}

async function processFile(asd) {
    try {
        let file = asd.files[0];
        let content = await readFileAsync(file);
        
        return content;

    } catch(err) {
        console.log(err);
    }
}

function loadImageAsync(content) {
    return new Promise((resolve, reject) => {
        let image = new Image();

        image.src = content;

        image.onload = () => {
            resolve(image);
        };

        image.onerror = reject;

    })
}

function largerThanCanvas(image) {
    return (image.width > canvas.width) || (image.height > canvas.height);
}

function drawPreviewImage(image) {
    
    let imageScaledWidth = image.width;
    let imageScaledHeight = image.height;

    if (largerThanCanvas(image)){
        
        if (image.width > image.height){
            let imageAspectRatio = (1.0 * image.height) / image.width;
            imageScaledWidth = canvas.width;
            imageScaledHeight = canvas.width * imageAspectRatio;
        } else {
            let imageAspectRatio = (1.0 * image.width) / image.height;
            imageScaledWidth = canvas.height * imageAspectRatio;
            imageScaledHeight = canvas.height;
        }

    }
    
    ctx.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);

}

async function setImage() {

    let chosenFile = this;

    let content = await processFile(chosenFile);
    
    let image = await loadImageAsync(content);

    // Draws image to fit canvas
    drawPreviewImage(image);

    current_image_data = ctx.getImageData(0,0,canvas.width,canvas.height);

    disable_buttons(false);

}

function set_pixel(image_data,x,y,r,g,b,a) {
    let index = ( x + y * image_data.width) * 4;
    image_data.data[index+0] = r;
    image_data.data[index+1] = g;
    image_data.data[index+2] = b;
    image_data.data[index+3] = a;
}

function bkpImageData(current_image_data) {
    
    let bkp_image_data = new ImageData(current_image_data.width,current_image_data.height);
    
    for ( let x = 0; x < current_image_data.width; x++){
        for (let y = 0; y < current_image_data.height; y++){
            let index = ( x + y * current_image_data.width) * 4;
            let r = current_image_data.data[index];
            let g = current_image_data.data[index+1];
            let b = current_image_data.data[index+2];
            set_pixel(bkp_image_data,x,y,r,g,b,255);
        }
    }

    return bkp_image_data;

}

function filterNeg(){
    
    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#neg_filter_btn");
    button.classList.add("selected");

    let bkp_image_data = bkpImageData(current_image_data);

    for ( let x = 0; x < current_image_data.width; x++){
        for (let y = 0; y < current_image_data.height; y++){
            let index = ( x + y * current_image_data.width) * 4;
            let r = 255 - current_image_data.data[index];
            let g = 255 - current_image_data.data[index+1];
            let b = 255 - current_image_data.data[index+2];
            set_pixel(current_image_data,x,y,r,g,b,255);
        }
    }
    
    ctx.putImageData(current_image_data, 0, 0);
    
    current_image_data = bkp_image_data;
}

function avg_rgb(image_data,x,y) {
    let index = ( x + y * image_data.width) * 4;
    let sum = 0;
    sum += image_data.data[index+0];
    sum += image_data.data[index+1];
    sum += image_data.data[index+2];
    return sum / 3;
}

function get_binary_color(color) {
    if (color < 255/2){
        return 0;
    }
    return 255;
}

function filterBinary() {

    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#bin_filter_btn");
    button.classList.add("selected");

    let bkp_image_data = bkpImageData(current_image_data);

    for ( let x = 0; x < current_image_data.width; x++){
        for (let y = 0; y < current_image_data.height; y++){
            let avg = avg_rgb(current_image_data,x,y);
            let r = get_binary_color(avg);
            let g = get_binary_color(avg);
            let b = get_binary_color(avg);
            set_pixel(current_image_data,x,y,r,g,b,255);
        }
    }
    ctx.putImageData(current_image_data, 0, 0);

    current_image_data = bkp_image_data;

}

function filterSepia() {

    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#sepia_filter_btn");
    button.classList.add("selected");


    let bkp_image_data = bkpImageData(current_image_data);

    for ( let x = 0; x < current_image_data.width; x++){
        for (let y = 0; y < current_image_data.height; y++){
            
            let index = ( x + y * current_image_data.width) * 4;
            
            let r = current_image_data.data[index];
            let g = current_image_data.data[index+1];
            let b = current_image_data.data[index+2];

            let tr = 0.393 * r + 0.769 * g + 0.189 * b;
            let tg = 0.349 * r + 0.686 * g + 0.168 * b;
            let tb = 0.272 * r + 0.534 * g + 0.131 * b;
            
            if (tr > 255) {
                r = 255;
            } else {
                r = tr;
            }

            if (tg > 255) {
                g = 255;
            } else {
                g = tg;
            }

            if (tb > 255) {
                b = 255;
            } else {
                b = tb;
            }

            set_pixel(current_image_data,x,y,r,g,b,255);
        }
    }
    
    ctx.putImageData(current_image_data, 0, 0);

    current_image_data = bkp_image_data;
}

function RGBToHSL(r,g,b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        'h': h,
        's': s,
        'l': l
    };

}

function HSLToRGB(h,s,l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {
        'r': r,
        'g': g,
        'b': b
    };

}

function filterBrightness() {
    
    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#bright_filter_btn");
    button.classList.add("selected");

    let bkp_image_data = bkpImageData(current_image_data);

    let filter_ammount = (document.querySelector("#brightness_range").value) / 100;

    for ( let x = 0; x < current_image_data.width; x++){
        for (let y = 0; y < current_image_data.height; y++){
            
            let index = ( x + y * current_image_data.width) * 4;
            
            let r = current_image_data.data[index];
            let g = current_image_data.data[index+1];
            let b = current_image_data.data[index+2];
    
            let hsl_pixel = RGBToHSL(r,g,b);
            
            if (filter_ammount <= 1) {
                hsl_pixel.l = hsl_pixel.l * filter_ammount;
            }
            if (filter_ammount > 1) {
                hsl_pixel.l = hsl_pixel.l + ( (100 - hsl_pixel.l) * ( filter_ammount - 1));
            }
            
            
            let new_rgb = HSLToRGB(hsl_pixel.h,hsl_pixel.s,hsl_pixel.l);

            // update image data

            r = new_rgb.r;
            g = new_rgb.g;
            b = new_rgb.b;
            set_pixel(current_image_data,x,y,r,g,b,255);
      

        }
    }

    ctx.putImageData(current_image_data, 0, 0);

    current_image_data = bkp_image_data;

}

function filterSaturation() {
    
    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#saturation_filter_btn");
    button.classList.add("selected");

    let bkp_image_data = bkpImageData(current_image_data);

    let filter_ammount = (document.querySelector("#saturation_range").value) / 100;

    for ( let x = 0; x < current_image_data.width; x++){
        for (let y = 0; y < current_image_data.height; y++){
            
            let index = ( x + y * current_image_data.width) * 4;
            
            let r = current_image_data.data[index];
            let g = current_image_data.data[index+1];
            let b = current_image_data.data[index+2];
    
            let hsl_pixel = RGBToHSL(r,g,b);
            
            if (filter_ammount <= 1) {
                hsl_pixel.s = hsl_pixel.s * filter_ammount;
            }
            if (filter_ammount > 1) {
                hsl_pixel.s = hsl_pixel.s + ( (100 - hsl_pixel.s) * ( filter_ammount - 1));
            }
            
            
            let new_rgb = HSLToRGB(hsl_pixel.h,hsl_pixel.s,hsl_pixel.l);

            // update image data

            r = new_rgb.r;
            g = new_rgb.g;
            b = new_rgb.b;
            set_pixel(current_image_data,x,y,r,g,b,255);
      

        }
    }

    ctx.putImageData(current_image_data, 0, 0);

    current_image_data = bkp_image_data;
}

function filterEdge() {

    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#edge_filter_btn");
    button.classList.add("selected");

    let bkp_image_data = bkpImageData(current_image_data);

    let width = current_image_data.width;
    let height = current_image_data.height;

    let kernelX = [
        [-1,0,1],
        [-2,0,2],
        [-1,0,1]
    ];

    let kernelY = [
      [-1,-2,-1],
      [0,0,0],
      [1,2,1]
    ];

    let sobelData = current_image_data;
    let grayscaleData = [];

    function bindPixelAt(data) {
      return function(x, y, i) {
        i = i || 0;
        return data[((width * y) + x) * 4 + i];
      };
    }

    let data = current_image_data.data;
    let pixelAt = bindPixelAt(data);
    let x, y;

    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        let r = pixelAt(x, y, 0);
        let g = pixelAt(x, y, 1);
        let b = pixelAt(x, y, 2);

        let avg = (r + g + b) / 3;
        grayscaleData.push(avg, avg, avg, 255);
      }
    }

    pixelAt = bindPixelAt(grayscaleData);

    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        let pixelX = (
            (kernelX[0][0] * pixelAt(x - 1, y - 1)) +
            (kernelX[0][1] * pixelAt(x, y - 1)) +
            (kernelX[0][2] * pixelAt(x + 1, y - 1)) +
            (kernelX[1][0] * pixelAt(x - 1, y)) +
            (kernelX[1][1] * pixelAt(x, y)) +
            (kernelX[1][2] * pixelAt(x + 1, y)) +
            (kernelX[2][0] * pixelAt(x - 1, y + 1)) +
            (kernelX[2][1] * pixelAt(x, y + 1)) +
            (kernelX[2][2] * pixelAt(x + 1, y + 1))
        );

        let pixelY = (
            (kernelY[0][0] * pixelAt(x - 1, y - 1)) +
            (kernelY[0][1] * pixelAt(x, y - 1)) +
            (kernelY[0][2] * pixelAt(x + 1, y - 1)) +
            (kernelY[1][0] * pixelAt(x - 1, y)) +
            (kernelY[1][1] * pixelAt(x, y)) +
            (kernelY[1][2] * pixelAt(x + 1, y)) +
            (kernelY[2][0] * pixelAt(x - 1, y + 1)) +
            (kernelY[2][1] * pixelAt(x, y + 1)) +
            (kernelY[2][2] * pixelAt(x + 1, y + 1))
        );

        let magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;
        magnitude = (magnitude/1000) * 255;
        // sobelData.push(magnitude, magnitude, magnitude, 255);
        set_pixel(sobelData,x,y,magnitude,magnitude,magnitude,255);
      }
    }
    ctx.putImageData(sobelData, 0, 0);

    current_image_data = bkp_image_data;
}

function promedioVecinos(image_data,pix_x,pix_y) {
    
    let avg = {
        r : 0,
        g : 0,
        b: 0
    };

    for (let x = pix_x -1; x <= pix_x + 1; x++){
        for (let y = pix_y -1; y <= pix_y + 1; y++){
            let index = ( x + y * image_data.width) * 4;
            avg.r += image_data.data[index];
            avg.g += image_data.data[index+1];
            avg.b += image_data.data[index+2];
        }
    }
    
    avg.r = Math.floor( avg.r / 9);
    avg.g = Math.floor( avg.g / 9);
    avg.b = Math.floor( avg.b / 9);

    return avg;

}

function filterSmooth() {

    deselect_buttons();
    selected_tool = 'none';

    let button = document.querySelector("#smooth_filter_btn");
    button.classList.add("selected");
    
    let bkp_image_data = bkpImageData(current_image_data);
    
    for ( let x = 1; x < current_image_data.width - 1; x++){
        for (let y = 1; y < current_image_data.height - 1; y++){
            
            let promedio = promedioVecinos(bkp_image_data,x,y);

            let r = promedio.r;
            let g = promedio.g;
            let b = promedio.b;

            set_pixel(current_image_data,x,y,r,g,b,255);
        }
    }

    ctx.putImageData(current_image_data, 0, 0);

    current_image_data = bkp_image_data;
}


/*

    Download Image

*/

function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link = null;
  }
  

function downloadImage() {
    let dataURL = canvas.toDataURL();
    downloadURI(dataURL, "modified_image.png");
}


/*
*    Pencil and Rubber functions
*/

function current_mouse_position(e) {
    let bx = e.target.getBoundingClientRect();

    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top
    };
}

function stop_using_mouse(e) {
    using_pencil = false;
    using_rubber = false;
    ctx.closePath();
    current_image_data = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function move_mouse(e) {
    
    let mouse_position = current_mouse_position(e);
    
    if (using_pencil || using_rubber){
        ctx.lineTo(mouse_position.x, mouse_position.y);
        ctx.stroke();
        current_image_data = ctx.getImageData(0,0,canvas.width,canvas.height);
    }

}

function start_using_mouse(e){

    let mouse_position = current_mouse_position(e);
    
    if (selected_tool == 'pencil'){
        using_pencil = true;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#323232';
        // ctx.moveTo(mouse_position.x, mouse_position.y); 
        ctx.lineTo(mouse_position.x, mouse_position.y); 
        ctx.stroke();
        current_image_data = ctx.getImageData(0,0,canvas.width,canvas.height);

    }

    if (selected_tool == 'rubber'){
        using_rubber = true;
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#ffffff';
        // ctx.moveTo(mouse_position.x, mouse_position.y); 
        ctx.lineTo(mouse_position.x, mouse_position.y); 
        ctx.stroke();
        current_image_data = ctx.getImageData(0,0,canvas.width,canvas.height);
    }

}

function initPaint() {
    
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");

    fileChooser = document.querySelector('.fileChooser');

    current_image_data = null;

    selected_tool = 'none';
    
    using_pencil = false;
    using_rubber = false;

    disable_buttons(true);

    fileChooser.addEventListener("change",setImage);

    canvas.addEventListener("mousedown",start_using_mouse);
    canvas.addEventListener("mousemove",move_mouse);
    canvas.addEventListener("mouseup",stop_using_mouse);
    

}

document.addEventListener("DOMContentLoaded", initPaint);



// tamanio de imagen importada
// guardar image width and height para no aplicar los filtros a todo el canvas
// no se nota que herramienta esta seleccionada

// extraer sobel del filter edge (?? comen)
// hacer filtro suavizar usando sobel (hecho sin sobel)