let controller;
let slideScene;
let pageScene;

var x = window.matchMedia("(min-width: 1024px)");

function animateSlides() {
  if (x.matches) {
    //Init controller
    controller = new ScrollMagic.Controller();
    // Select some things
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");
    //loop over each slide
    sliders.forEach((slide, index, slides) => {
      const revealImg = slide.querySelector(".reveal-img");
      const img = slide.querySelector("img");
      const revealText = slide.querySelector(".reveal-text");
      //gsap
      const slideTl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
      });
      slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });

      //reveals the text
      slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=1");
      //slides nav down

      slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" });

      //Create a scene
      slideScene = new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 0.25,
        reverse: false,
      })
        //starts the slide scene on the triggers
        .setTween(slideTl)
        //adds indicators
        // .addIndicators({
        //   name: "slide",
        // })
        .addTo(controller);
      //second slide animation
      const pageTl = gsap.timeline();
      //gets next slide
      let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
      // pushes the next slide down

      pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
      pageTl.fromTo(
        slide,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.5 }
      );
      //pulls the slide back up when its in frame
      pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

      //create new scene
      pageScene = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: "100%",
        triggerHook: 0,
      })
        // .addIndicators({
        //   colorStart: "white",
        //   colorTrigger: "white",
        //   name: "page",
        //   indent: 200,
        // })
        //stays on the page for 100%, push followers get rid of huge gap
        .setPin(slide, { pushFollowers: true })
        .setTween(pageTl)
        .addTo(controller);
    });
  } else {
  }
}

const mouse = document.querySelector(".cursor");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("about-exp")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("saffi-exp")) {
    mouse.classList.add("saffi-active");
  } else {
    mouse.classList.remove("saffi-active");
  }
  if (item.classList.contains("chiltern-exp")) {
    mouse.classList.add("chiltern-active");
  } else {
    mouse.classList.remove("chiltern-active");
  }
  if (item.classList.contains("james-exp")) {
    mouse.classList.add("james-active");
  } else {
    mouse.classList.remove("james-active");
  }
  if (item.classList.contains("sgay-exp")) {
    mouse.classList.add("sgay-active");
  } else {
    mouse.classList.remove("sgay-active");
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "-0", y: -0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
  }
}

burger.addEventListener("click", navToggle);

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();
