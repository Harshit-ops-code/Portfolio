import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, ScrollToPlugin };

let activeScrollTween: gsap.core.Tween | null = null;

/**
 * Smoothly scrolls to an element ID, selector, element, or numeric Y coordinate
 * using GSAP ScrollToPlugin without hijacking native compositor wheel scrolling.
 */
export function smoothScrollTo(target: string | number | HTMLElement, offsetY = 0) {
  if (typeof window === 'undefined') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  let destY: number | null = null;
  if (typeof target === 'number') {
    destY = Math.max(0, Math.min(maxScroll, target));
  } else {
    const el =
      typeof target === 'string'
        ? document.getElementById(target.replace(/^#/, '')) ||
          document.querySelector<HTMLElement>(target)
        : target;
    if (el) {
      destY = Math.max(
        0,
        Math.min(maxScroll, el.getBoundingClientRect().top + window.scrollY - offsetY)
      );
    }
  }

  if (destY === null) return;

  activeScrollTween?.kill();

  if (reducedMotion) {
    window.scrollTo(0, destY);
    ScrollTrigger.update();
    return;
  }

  activeScrollTween = gsap.to(window, {
    scrollTo: { y: destY, autoKill: true },
    duration: 0.95,
    ease: 'power3.inOut',
    onUpdate: () => ScrollTrigger.update(),
    onComplete: () => {
      activeScrollTween = null;
      ScrollTrigger.update();
    },
    onInterrupt: () => {
      activeScrollTween = null;
    },
  });
}

/**
 * Wires anchor link interception (`a[href^="#"]`) and resize refreshes
 * while leaving wheel/trackpad scrolling on the browser's hardware compositor thread
 * so 3D WebGL scenes and scrubbed ScrollTriggers remain zero-jank.
 */
export function initSmoothWheelScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  const onDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    smoothScrollTo(el);
  };

  let resizeTimer: number | null = null;
  const onResize = () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
  };

  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('click', onDocumentClick);

  return () => {
    activeScrollTween?.kill();
    if (resizeTimer) window.clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('click', onDocumentClick);
  };
}
