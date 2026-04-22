"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reduced-motion-safe reusable motion layer for ppt-companion.
 * All hooks respect prefers-reduced-motion and degrade gracefully.
 */

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useFadeIn — fade a single element in on mount.
 */
export function useFadeIn(options = {}) {
  const ref = useRef(null);
  const reduced = getReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      ...options,
    });
  }, { scope: ref });

  return ref;
}

/**
 * useSlideUp — slide an element up into position on mount.
 */
export function useSlideUp(options = {}) {
  const ref = useRef(null);
  const reduced = getReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      ...options,
    });
  }, { scope: ref });

  return ref;
}

/**
 * useStaggerReveal — stagger-reveal child elements by CSS selector.
 * Best for lists, grids, and card sequences.
 */
export function useStaggerReveal(selector, options = {}) {
  const ref = useRef(null);
  const reduced = getReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    const items = ref.current.querySelectorAll(selector);
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      ...options,
    });
  }, { scope: ref });

  return ref;
}

/**
 * useScrollTriggerEntrance — fade + slide up when element enters viewport.
 * Primary workhorse for teaching sequences.
 */
export function useScrollTriggerEntrance(options = {}) {
  const ref = useRef(null);
  const reduced = getReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: 28,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
        ...options.scrollTrigger,
      },
      ...options.gsap,
    });
  }, { scope: ref });

  return ref;
}

/**
 * useScrollStagger — stagger children when their parent enters viewport.
 * Ideal for theorem sequences, evidence lists, and hierarchy reveals.
 */
export function useScrollStagger(selector, options = {}) {
  const ref = useRef(null);
  const reduced = getReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    const items = ref.current.querySelectorAll(selector);
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
        ...options.scrollTrigger,
      },
      ...options.gsap,
    });
  }, { scope: ref });

  return ref;
}

/**
 * useMotionValue — animate a numeric value (e.g. metric counters).
 */
export function useMotionValue(targetValue, options = {}) {
  const ref = useRef(null);
  const reduced = getReducedMotion();

  useGSAP(() => {
    if (reduced || !ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetValue,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent =
            typeof options.format === "function"
              ? options.format(obj.val)
              : Math.round(obj.val).toString();
        }
      },
      ...options,
    });
  }, { scope: ref, dependencies: [targetValue] });

  return ref;
}
