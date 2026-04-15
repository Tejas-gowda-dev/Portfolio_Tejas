"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SectionLabel from "../ui/SectionLabel";
import { cn } from "@/lib/utils";

const FloatingGeometry = dynamic(() => import("../three/FloatingGeometry"), { ssr: false });

const stats = [
  { label: "Projects", value: 50, suffix: "+" },
  { label: "Years Exp", value: 5, suffix: "+" },
  { label: "Clients", value: 12, suffix: "+" },
  { label: "Cups/month", value: 100, suffix: "∞" },
];

const tags = ["Problem Solver", "Systems Thinker", "Open Source", "Coffee Addict"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-content", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
      });

      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      statItems?.forEach((item) => {
        const val = item.getAttribute("data-value");
        const target = { count: 0 };
        gsap.to(target, {
          count: Number(val),
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
          onUpdate: () => {
            const el = item.querySelector(".stat-number");
            if (el) el.textContent = Math.floor(target.count).toString();
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 bg-surface/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="about-content">
          <SectionLabel label="/ About me" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
            I'm a full-stack developer with 5+ years of experience crafting high-performance web
            applications.
          </h2>
          <p className="text-lg md:text-xl text-text-muted mb-10 leading-relaxed">
            My passion lives in the space where complex systems meet elegant interfaces. I believe
            that every line of code should serve a purpose and contribute to a seamless user
            experience.
          </p>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-border text-xs font-medium hover:border-primary/50 hover:shadow-[0_0_15px_rgba(110,231,183,0.1)] transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-value={stat.value}
                className="stat-item p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  <span className="stat-number">0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="h-[300px] w-full">
            <FloatingGeometry />
          </div>
        </div>
      </div>
    </section>
  );
}
