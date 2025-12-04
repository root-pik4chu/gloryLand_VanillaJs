

export function initMaskScrollAnimation(options = {}) {
    gsap.registerPlugin(ScrollTrigger);

    const {
        trigger = ".mask-container",
        circle = "#mask-circle",
        start = "top 80%",
        end = "top 10%",
        finalRadius = 400,
        scrub = 1
    } = options;

    gsap.to(circle, {
        attr: { r: finalRadius },
        ease: "none",
        scrollTrigger: {
            trigger: trigger,
            start,
            end,
            scrub
        }
    });
}
