"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;

      if (!cursor || !follower) return;

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

      const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
      const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        xFollowerTo(e.clientX);
        yFollowerTo(e.clientY);
      };

      const onMouseDown = () => {
        gsap.to([cursor, follower], { scale: 0.7, duration: 0.2 });
      };

      const onMouseUp = () => {
        gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
      />
    </div>
  );
}
