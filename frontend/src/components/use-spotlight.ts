"use client";

import { useRef, type MouseEvent } from "react";

/**
 * Tracks cursor position over an element via CSS custom properties
 * (--spot-x/--spot-y) without triggering React re-renders, so a
 * radial-gradient spotlight can follow the cursor cheaply.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (event: MouseEvent<T>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    ref.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return { ref, onMouseMove };
}
