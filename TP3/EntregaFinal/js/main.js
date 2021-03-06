
"use strict"

// header
let header_background;
let header_ling;
let header_colette;
let lights;
let lightsTransform;

// menu
let menu_btn;
let menu;
let mantel;
let plate;
let knife;
let fork;
let menu_items;
let menu_options;

// contador
let countText;
let countBanner;
let countDownDate;

// cards
let ling_card;
let remy_card;
let colette_card;
let cardX;
let cardY;

// slider
let slideIndex;
let slide_left;
let slide_right;

// eventos
let accordeon_titles;

// formulario
let btn_progress;


function handleScroll() {
    let value = window.scrollY;
    // console.log(value);

    // console.log(lights);

    // Animate Header
    if ( value < 290 ){
        header_background.style.backgroundPosition = `100% ${value * 0.07}%`;

        for (let i = 0; i < lights.length; i++) {
            let orig = lightsTransform[i];
            lights[i].style.transform = `translateX(${orig.x}px) translateY(${orig.y - value * 0.36}px)`;
        }
        
        header_ling.style.bottom = `${-35 + value * 0.12}%`;
        header_colette.style.bottom = `${-35 + value * 0.12}%`;
    }

    // Animate countdown
    if ( value > 200  && value < 350 ) {
        countBanner.style.transform = `skew(-4deg) rotate(-4deg) translateX(${- 500 + value * 1.5}px)`;
    }

}

function getTransform(lights) {
    let transform = new Array();

    for (let i = 0; i < lights.length; i++) {
        let style = window.getComputedStyle(lights[i])
                .getPropertyValue('transform')
                .match(/(-?[0-9\.]+)/g);
        transform.push({x: style[4], y: style[5]});    
    }

    return transform;
}

function showMenu() {
    menu_btn.classList.add("visible");
    menu.style.visibility = "visible";

    mantel.classList.add("mantel_active");
    plate.classList.add("plate_active");
    knife.classList.add("knife_active");
    fork.classList.add("fork_active");
    menu_items.classList.add("menu_items_active");
}

async function hideMenu() {
    menu_btn.classList.remove("visible");
        
    mantel.classList.remove("mantel_active");
    plate.classList.remove("plate_active");
    knife.classList.remove("knife_active");
    fork.classList.remove("fork_active");
    menu_items.classList.remove("menu_items_active");
    
    await new Promise(r => setTimeout(r, 500));

    menu.style.visibility = "hidden";
}


function handleMenuBtn() {
    if (menu_btn.classList.contains("visible")){
        hideMenu();
        menu_options.forEach(item => {
            item.removeEventListener("click",hideMenu);
        });
    } else {
        showMenu();
        menu_options.forEach(item => {
            item.addEventListener("click",hideMenu);
        });
    }
}

function mouseMove(e) {
    // console.log(e.target.id);

    let current_card = document.querySelector(`#${e.currentTarget.id}`);

    cardX = current_card.clientWidth / 2 ;
    cardY = current_card.clientHeight / 2 ;

    let mouseX = e.layerX;
    let mouseY = e.layerY;

    let dX = mouseX - cardX;
    let dY = mouseY - cardY;
    
    

    let transform_1 = `rotateX(${ -dY * 0.09 }deg) rotateY(${ dX * 0.09 }deg) translateZ(1em)`;
    let transform_dot5 = `rotateX(${ -dY * 0.04 }deg) rotateY(${ dX * 0.04 }deg) translateZ(-3em)`;
    let transform_x2 = `rotateX(${ -dY * 0.12 }deg) rotateY(${ dX * 0.12 }deg) translateZ(2em)`;
    

    current_card.childNodes[1].style.transform = transform_dot5;
    current_card.childNodes[3].style.transform = transform_1;
    current_card.childNodes[5].style.transform = transform_x2;

}

// function mouseLeave(e) {
//     ling_card.style.transition = "transform 0.3 ease-in";
// }


// Next/previous controls
function nextSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("selected");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("selected");
    }

    slides[slideIndex-1].classList.add("selected");
    dots[slideIndex-1].classList.add("selected");
}

function updateCountdown() {
    
    let now = new Date().getTime();

    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);


    // Display the result in the element with id="demo"
    countText.innerHTML = "¡ Faltan " + days + " días, " + hours + " horas, "
    + minutes + " minutos y " + seconds + " segundos para el estreno !";

    // ver de animar algun elemento adentro del banner
    // if (seconds % 2 == 0){
    //     countBanner.style.transform = "skew(-5deg) rotate(-5deg)";
    // } else {
    //     countBanner.style.transform = "skew(-4deg) rotate(-4deg)";
    // }

}

function accFunct() {

    accordeon_titles.forEach(acc => {
        acc.classList.remove("active");
        let accContent = acc.nextElementSibling;
        accContent.style.maxHeight = null;
    });
    
    this.classList.add("active");

    let accContent = this.nextElementSibling;
    if (accContent.style.maxHeight) {
        accContent.style.maxHeight = null;
    } else {
        accContent.style.maxHeight = accContent.scrollHeight + "px";
    }

}

async function handleForm(e) {
    e.preventDefault();
    this.classList.add("loading");
    
    await new Promise(r => setTimeout(r, 1000));
    
    this.classList.add("sent");
    
    await new Promise(r => setTimeout(r, 2000));
    
    this.classList.remove("sent");
    this.classList.remove("loading");

}


function mainFunction() {
    
    // Header elements
    header_background = document.querySelector("#header_background");
    header_ling = document.querySelector("#header_linguini");
    header_colette = document.querySelector("#header_colette");
    lights = document.querySelectorAll(".light");
    lightsTransform = getTransform(lights);

    // Menu
    menu_btn = document.querySelector("#menu-button");
    menu = document.querySelector("#menu-container");
    mantel = document.querySelector("#menu-mantel");
    plate = document.querySelector("#menu-plate");
    knife = document.querySelector("#menu-knife");
    fork = document.querySelector("#menu-fork");
    menu_items = document.querySelector("#menu-items");
    menu_options = document.querySelectorAll(".menu-item");

    // Contador
    countBanner = document.querySelector(".banner");
    countText = document.querySelector("#countdown");
    countDownDate = new Date("Oct 28, 2020 15:37:25").getTime();
    
    // Cards
    ling_card = document.querySelector("#ling_card");
    remy_card = document.querySelector("#remy_card");
    colette_card = document.querySelector("#colette_card");
    
    // Slider
    slide_left = document.querySelector("#slide_left");
    slide_right = document.querySelector("#slide_right");
    slideIndex = 1;
    currentSlide(slideIndex);
    
    // Acordeon
    accordeon_titles = document.querySelectorAll(".acord-title");

    // Formulario
    btn_progress = document.querySelector("#btn_progress");

    // Eventos
    // Header events
    window.addEventListener("scroll", handleScroll);

    // Menu events
    menu_btn.addEventListener("click", handleMenuBtn);
    
    // Cards events
    ling_card.addEventListener("mousemove", mouseMove);
    remy_card.addEventListener("mousemove", mouseMove);
    colette_card.addEventListener("mousemove", mouseMove);

    // Slider Events
    slide_left.addEventListener("click", () => { nextSlide(-1) });
    slide_right.addEventListener("click", () => { nextSlide(1) });

    // Acordeon Events
    accordeon_titles.forEach(ac_item => {
        ac_item.addEventListener("click", accFunct);
    });
    accordeon_titles[0].click();

    // Formulario Events
    btn_progress.addEventListener("click",handleForm);

    // Functions
    // Countdown function
    setInterval(updateCountdown,1000);
    
}

document.addEventListener("DOMContentLoaded", mainFunction);