"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  type?: "chars" | "words" | "lines";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedText({
  text,
  type = "chars",
  delay = 0,
  duration = 0.8,
  className,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const elements = container.querySelectorAll(".anim-item");

      gsap.fromTo(
        elements,
        {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: duration,
          stagger: 0.02,
          ease: "expo.out",
          delay: delay,
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [text, delay, duration, once] }
  );

  const renderContent = () => {
    if (type === "chars") {
      return text.split("").map((char, i) => (
        <span key={i} className="inline-block anim-item">
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    if (type === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.3em] anim-item">
          {word}
        </span>
      ));
    }
    return <span className="inline-block anim-item">{text}</span>;
  };

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {renderContent()}
    </div>
  );
}
