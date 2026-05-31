import { useEffect } from "react";

const DAMPING = 0.14;
const MAX_WHEEL_DELTA = 180;
const SETTLE_THRESHOLD = 0.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function hasScrollableParent(target: EventTarget | null) {
  let element = target instanceof Element ? target : null;

  while (element && element !== document.body) {
    const { overflowY } = window.getComputedStyle(element);
    if (
      /(auto|scroll)/.test(overflowY) &&
      element.scrollHeight > element.clientHeight
    ) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

export function useDampedScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const usesPrecisePointer = window.matchMedia("(pointer: fine)");
    let frame: number | undefined;
    let targetY = window.scrollY;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stopAnimation = () => {
      if (frame === undefined) return;

      window.cancelAnimationFrame(frame);
      frame = undefined;
    };

    const animate = () => {
      const nextY = window.scrollY + (targetY - window.scrollY) * DAMPING;

      if (Math.abs(targetY - nextY) <= SETTLE_THRESHOLD) {
        window.scrollTo({ top: targetY });
        frame = undefined;
        return;
      }

      window.scrollTo({ top: nextY });
      frame = window.requestAnimationFrame(animate);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        prefersReducedMotion.matches ||
        !usesPrecisePointer.matches ||
        document.documentElement.classList.contains("page-transition-active") ||
        hasScrollableParent(event.target)
      ) {
        return;
      }

      event.preventDefault();
      targetY = clamp(
        targetY + clamp(event.deltaY, -MAX_WHEEL_DELTA, MAX_WHEEL_DELTA),
        0,
        getMaxScroll(),
      );

      if (frame === undefined) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const target = link?.hash
        ? document.querySelector<HTMLElement>(link.hash)
        : null;

      if (
        !link ||
        !target ||
        prefersReducedMotion.matches ||
        !usesPrecisePointer.matches
      ) {
        return;
      }

      event.preventDefault();
      window.history.pushState({}, "", link.href);
      targetY = clamp(target.offsetTop, 0, getMaxScroll());

      if (frame === undefined) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const syncTarget = () => {
      if (frame === undefined) targetY = window.scrollY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", syncTarget);
    window.addEventListener("scroll", syncTarget, { passive: true });
    document.addEventListener("click", handleClick);

    return () => {
      stopAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", syncTarget);
      window.removeEventListener("scroll", syncTarget);
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
