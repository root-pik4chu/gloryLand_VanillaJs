export function initNavMenu({
  navBg,
  inner,
  ham,
  logo
}) {
  const navBgEl = document.querySelector(navBg);
  const innerEl = document.querySelector(inner);
  const hamEl = document.querySelector(ham);
  const logoEl = document.querySelector(logo);

  let open = false;

  // Expand / collapse navbar background
  const tl = gsap.timeline({ paused: true });

  tl.to(navBgEl, {
    width: "100%",
    duration: 0.45,
    ease: "power2.inOut"
  })
  .to(navBgEl, {
    height: 520,
    duration: 0.42,
    ease: "power2.inOut"
  }, "-=0.05")
  .to(innerEl, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.28,
    ease: "power2.out",
    stagger: 0.02
  }, "-=0.18");

  // small shift animation for logo + ham
  const tlContent = gsap.timeline({ paused: true });

  tlContent.to(logoEl, {
    // x: -10,
    duration: 0.45,
    ease: "power2.inOut"
  }, 0)
  .to(hamEl, {
    // x: 10,
    duration: 0.45,
    ease: "power2.inOut"
  }, 0);

  function toggle() {
    if (!open) {
      tl.play();
      tlContent.play();
    } else {
      tl.reverse();
      tlContent.reverse();
    }
    open = !open;
  }

  hamEl.addEventListener("click", toggle);

  hamEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!open) return;
    if (!navBgEl.contains(e.target)) {
      tl.reverse();
      tlContent.reverse();
      open = false;
    }
  });

  // Prevent spacebar page scroll
  hamEl.addEventListener("keypress", (e) => {
    if (e.key === " ") e.preventDefault();
  });
}
