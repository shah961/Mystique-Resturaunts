/**
 * MYSTIQUE RESTAURANTS LAHORE - GSAP MOTION ARCHITECTURE
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  // Respect user motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initEntranceAnimations();
  initScrollReveals();
});

function initEntranceAnimations() {
  const heroElements = document.querySelectorAll('.hero-section .animate-gsap');
  const pageHeaderElements = document.querySelectorAll('.page-header .animate-gsap');

  if (heroElements.length) {
    gsap.from(heroElements, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  if (pageHeaderElements.length) {
    gsap.from(pageHeaderElements, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}

function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-gsap');

  if (!revealElements.length || typeof ScrollTrigger === 'undefined') return;

  revealElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}
