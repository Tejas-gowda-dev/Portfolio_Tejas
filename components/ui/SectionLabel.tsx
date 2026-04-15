"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionLabel({ label, className, align = "left" }: SectionLabelProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "expo.out" }
      ).fromTo(
        textRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-4 mb-8",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
    >
      <div ref={lineRef} className="h-[1px] w-12 bg-primary origin-left" />
      <span ref={textRef} className="text-xs font-mono uppercase tracking-[0.3em] text-primary/80">
        {label}
      </span>
    </div>
  );
}
