
"use strict"

let selected = 1;

function showPrevSlide() {
    let actual_slide = document.querySelector(`#slide-${selected}`);
    selected--;
    if (selected < 1) {
        selected = 3;
    }
    let next_slide = document.querySelector(`#slide-${selected}`);
    
    actual_slide.classList.remove("selected");
    next_slide.classList.add("selected");
}

function showNextSlide() {
    let actual_slide = document.querySelector(`#slide-${selected}`);
    selected++;
    if (selected > 3) {
        selected = 1;
    }
    let next_slide = document.querySelector(`#slide-${selected}`);
    
    actual_slide.classList.remove("selected");
    next_slide.classList.add("selected");
}

function mainFunction() {
    
    let prev = document.querySelector("[data-slide=prev]");
    let next = document.querySelector("[data-slide=next]");

    let first_slide = document.querySelector(`#slide-${selected}`);
    first_slide.classList.add("selected");

    prev.addEventListener("click", showPrevSlide);
    next.addEventListener("click", showNextSlide);


}

document.addEventListener("DOMContentLoaded", mainFunction);