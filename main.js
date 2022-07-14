import SimplexNoise from "simplex-noise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

const content = document.querySelector("#content");

gsap.registerPlugin(ScrollTrigger);

const simplex = new SimplexNoise();

// Create circles, step circles and lines
for (let i = 0; i < 1500; i++) {
  // Define it's a step every 250 circles (500px)
  const step = i % 250 === 0 && i !== 0;
  const div = document.createElement("div");

  if (step) {
    div.classList.add("step-circle");
  } else {
    div.classList.add("circle");
  }

  // Create noise coefficients
  const c1 = simplex.noise2D(i * 0.003, i * 0.0033);
  const c2 = simplex.noise2D(i * 0.002, i * 0.001);

  const style = !step
    ? {
        transform: `translate(${c2 * 50}px) rotate(${c2 * 300}deg) scale(${
          3 + c1 * 3
        }, ${3 + c2 * 2})`,
        boxShadow: `0 0 0 .5px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .1)`,
      }
    : {
        transform: `translate(${c2 * 50}px)`,
        border: `solid 5px hsla(${Math.floor(i * 0.3)}, 70%, 70%, 1)`,
      };
  Object.assign(div.style, style);
  content.appendChild(div);

  if (step) {
    const div = document.createElement("div");
    div.classList.add("line");
    const style = {
      "outline-color": `hsla(${Math.floor(i * 0.3)}, 70%, 70%, 1)`,
    };
    Object.assign(div.style, style);
    content.appendChild(div);
  }
}

// Create circles animations
const Circles = document.querySelectorAll(".circle");
const tl = gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    start: "top top",
    end: "bottom center",
  },
});
Circles.forEach((c) => {
  tl.from(c, {
    opacity: 0,
  });
});

// Create Step circles animations
const StepCircles = document.querySelectorAll(".step-circle");
StepCircles.forEach((step_circle) => {
  gsap.from(step_circle, {
    scrollTrigger: {
      trigger: step_circle,
      start: "top center",
      toggleActions: "restart none none reverse",
    },
    scale: 0,
    ease: "back",
  });
});

// Create Line animations
const Lines = document.querySelectorAll(".line");
Lines.forEach((line) => {
  gsap.from(line, {
    scrollTrigger: {
      trigger: line,
      start: "top center",
      toggleActions: "restart none none reverse",
    },
    width: 0,
  });
});

// Create Steps animations
const Steps = document.querySelectorAll(".step");
Steps.forEach((step) => {
  gsap.from(step, {
    scrollTrigger: {
      trigger: step,
      start: "top center",
      toggleActions: "restart none none reverse",
    },
    opacity: 0,
  });
});
