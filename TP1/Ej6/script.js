// Ej 6

let canvas = document.querySelector("#myCanvas"); 
let ctx = document.querySelector("#myCanvas").getContext("2d");
let image_w = canvas.width;
let image_h = canvas.height;

let h = 270;
let s = 100;
let l = 50;

let h2 = (h + 150);
let h3 = (h + 210);

let grd = ctx.createLinearGradient(0, 0, 0, image_h);

grd.addColorStop(0, `hsl(${h},${s}%,${l}%)`);

grd.addColorStop(0.5, `hsl(${h2},${s}%,${l}%)`);

grd.addColorStop(1, `hsl(${h3},${s}%,${l}%)`);

ctx.fillStyle = grd;
ctx.fillRect(0, 0, image_w, image_h);

