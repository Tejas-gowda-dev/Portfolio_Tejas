"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.4,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = button.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const radius = Math.max(width, height) * 1.5;

        if (distance < radius) {
          xTo(deltaX * strength);
          yTo(deltaY * strength);
        } else {
          xTo(0);
          yTo(0);
        }
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      window.addEventListener("mousemove", onMouseMove);
      button.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        button.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { dependencies: [strength], scope: buttonRef }
  );

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 rounded-full transition-colors duration-300",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
