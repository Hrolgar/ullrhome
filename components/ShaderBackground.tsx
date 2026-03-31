"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
}

export default function ShaderBackground({ src, className = "" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "mousemove",
          x: e.clientX,
          y: e.clientY,
        },
        "*"
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 w-full h-full border-none pointer-events-none z-0 ${className}`}
    />
  );
}
