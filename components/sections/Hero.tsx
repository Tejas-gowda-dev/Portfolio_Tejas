"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, Download } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import AnimatedText from "../ui/AnimatedText";
import MagneticButton from "../ui/MagneticButton";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-cta",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "expo.out", delay: 1.4 }
      );

      gsap.to(scrollIndicatorRef.current, {
        y: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow shadow-[0_0_10px_#6EE7B7]" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary/80">
              Available for work
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            <AnimatedText text="Creative" className="block" />
            <AnimatedText text="Developer &" className="block" delay={0.1} />
            <AnimatedText text="Engineer" className="block text-primary" delay={0.2} />
          </h1>

          <p className="text-lg md:text-xl text-text-muted max-w-lg mb-10 leading-relaxed hero-cta">
            I build immersive digital experiences that live at the intersection of design and
            technology.
          </p>

          <div className="flex flex-wrap gap-4 hero-cta">
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-background font-bold px-8 py-4"
            >
              View My Work
            </MagneticButton>
            <MagneticButton className="border border-border text-text-primary hover:bg-surface font-bold px-8 py-4 flex items-center gap-2">
              Download CV <Download size={18} />
            </MagneticButton>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative h-[400px] md:h-[600px] w-full lg:block">
          <HeroScene />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown size={20} className="text-primary" />
      </div>
    </section>
  );
}
