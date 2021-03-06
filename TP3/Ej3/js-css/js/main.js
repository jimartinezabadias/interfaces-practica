"use strict"

let hoursHand = null;
let minutesHand = null;
let secondsHand = null;

function update() {
    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    hoursHand.style.transform = `rotate( ${360 * ((hours - 6) % 12) / 12 }deg)`;
    minutesHand.style.transform = `rotate( ${360 * (minutes - 30) / 60 }deg)`;
    secondsHand.style.transform = `rotate( ${360 * (seconds - 30) / 60 }deg)`;

}

function mainFunction() {
    hoursHand = document.querySelector('.hour');
    minutesHand = document.querySelector('.minute');
    secondsHand = document.querySelector('.second');

    update();
    setInterval(update,1000);
}

document.addEventListener("DOMContentLoaded", mainFunction);