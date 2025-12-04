// buttonArc.js
export function initButtonArcAnimation(buttonSelector) {
  const wrapper = document.querySelector(buttonSelector);
  if (!wrapper) return;

  const front = wrapper.querySelector(".front");
  const back = wrapper.querySelector(".back");

  function reset() {
    gsap.set(front, { x: 0, y: 0, rotate: 0 });
    gsap.set(back, { x: "-100%", y: 0, rotate: -12,  });
  }

  function runAnimation() {
    const tl = gsap.timeline({ onComplete: reset });

    tl.to(front, {
      x: "100%",
      y: 10,
      rotate: 12,
  
      duration: 0.35,
      ease: "back.in(0.7)"
    }).to(
      back,
      {
        x: "0%",
        y: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.35,
        ease: "back.out(0.7)"
      }
    );
  }

  wrapper.addEventListener("mouseenter", runAnimation);

  reset();
}
