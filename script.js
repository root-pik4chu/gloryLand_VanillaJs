import { initMaskScrollAnimation } from "./maskScroll.js";
import { initNavMenu } from "./initNavMenu.js";
import { initButtonArcAnimation } from "./buttonArc.js"




const lenis = new Lenis({
  lerp: 0.08, // smoothness
  wheelMultiplier: 1.1,
  touchMultiplier: 1.1,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}



requestAnimationFrame(raf);

// 🚀 VERY IMPORTANT: Sync Lenis with ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

gsap.registerPlugin(ScrollTrigger);

const text = `
I am a frontend developer who loves motion, visual storytelling,
and building interactions that feel alive. I believe animation should
support the message — not distract from it. This small demo shows how
letters begin as chaos but assemble into meaning as you scroll.
`;

const template = document.getElementById("template");
const container = document.getElementById("container");
const wrapper = document.getElementById("wrapper");

// Convert spaces and line breaks to HTML
template.innerHTML = text
  .split("")
  .map((c) => {
    if (c === "\n") return "<br>";
    if (c === " ") return "&nbsp;";
    return `<span>${c}</span>`;
  })
  .join("");

const spans = Array.from(template.querySelectorAll("span"));

// requestAnimationFrame(() => {
  const wrapperRect = wrapper.getBoundingClientRect();

  // Measure each character’s location relative to wrapper
  const charData = spans.map((span) => {
    const rect = span.getBoundingClientRect();
    return {
      x: rect.left - wrapperRect.left,
      y: rect.top - wrapperRect.top,
      char: span.innerText,
    };
  });

  // Create floating characters
  const floatingChars = charData.map((c) => {
    const el = document.createElement("div");
    el.className = "char";
    el.innerHTML = c.char;
    container.appendChild(el);
    return el;
  });

  // Scatter randomly
  floatingChars.forEach((el) => {
    gsap.set(el, {
      x: () => gsap.utils.random(-1200, window.innerWidth + 100),
      y: () => gsap.utils.random(-100, window.innerHeight / 3 + 100),
      rotate: () => gsap.utils.random(-270, 270),
      opacity: 0.3,
    });
  });

  // Animate assembly
  gsap.to(floatingChars, {
    scrollTrigger: {
      trigger: ".page2",
      start: "top 30%",
      end: "bottom 5%",
      scrub: 1,
      pin: "#wrapper",

      // markers: true
    },
    x: (i) => charData[i].x,
    y: (i) => charData[i].y,
    rotate: 0,
    opacity: 1,
    ease: "power2.out",
  });
// });




// maskkk ...

initMaskScrollAnimation({
  trigger: ".mask-container",
  circle: "#mask-circle",
  finalRadius: 400,
});



// navMenu
initNavMenu({
  navBg: "#navBg",
  inner: "#inner",
  ham: "#ham",
  logo: "#logo"
});

  initButtonArcAnimation(".button_container");


const ham = document.getElementById('ham');
ham.addEventListener('click', () => {
  const isOpen = ham.classList.toggle('open');
  ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});






const circle = document.getElementById("circle");
const divisions = circle.querySelectorAll(".division");
const count = divisions.length;

// center of circle
const radius = circle.offsetWidth / 2;
const centerX = radius;
const centerY = radius;

divisions.forEach((div, i) => {
  const angle = (i / count) * (2 * Math.PI);

  // place the CENTER of the item on the circle edge
  const itemCenterX = centerX + Math.cos(angle) * radius;
  const itemCenterY = centerY + Math.sin(angle) * radius;

  // move item so its center aligns with calculated center
  div.style.left = (itemCenterX - div.offsetWidth / 2) + "px";
  div.style.top  = (itemCenterY - div.offsetHeight / 2) + "px";

  // rotate item to face center
  const degrees = angle * (180 / Math.PI);
  div.style.transform = `rotate(${degrees + 90}deg)`;
});


