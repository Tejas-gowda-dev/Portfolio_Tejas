"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SectionLabel from "../ui/SectionLabel";
import { cn } from "@/lib/utils";

const experiences = [
  {
    year: "2024–Present",
    company: "Acme Corp",
    role: "Senior Frontend Engineer",
    description:
      "Leading the frontend development of core products, mentoring junior developers, and implementing modern architectural patterns.",
    tags: ["React", "TypeScript", "AWS"],
    side: "right",
  },
  {
    year: "2022–2024",
    company: "DevStudio",
    role: "Full Stack Developer",
    description:
      "Developed and maintained complex web applications for various clients using the MERN stack and Next.js.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    side: "left",
  },
  {
    year: "2020–2022",
    company: "Freelance",
    role: "Web Developer & Designer",
    description:
      "Crafted bespoke digital experiences for startups and small businesses, focusing on performance and aesthetics.",
    tags: ["Webflow", "React", "Figma"],
    side: "right",
  },
  {
    year: "2018–2020",
    company: "StartupXYZ",
    role: "Junior Developer",
    description:
      "Assisted in the development of a real-time messaging platform and learned the fundamentals of scalable web architecture.",
    tags: ["JavaScript", "Firebase", "CSS"],
    side: "left",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Node animations
      const nodes = sectionRef.current?.querySelectorAll(".timeline-node");
      nodes?.forEach((node) => {
        const side = node.getAttribute("data-side");
        gsap.fromTo(
          node,
          { x: side === "left" ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
            },
          }
        );

        const dot = node.querySelector(".timeline-dot");
        gsap.to(dot, {
          backgroundColor: "#6EE7B7",
          boxShadow: "0 0 15px #6EE7B7",
          duration: 0.5,
          scrollTrigger: {
            trigger: node,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto mb-20">
        <SectionLabel label="/ Journey" align="center" />
        <h2 className="text-4xl md:text-6xl font-display font-bold text-center">Experience</h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 hidden md:block" />
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary -translate-x-1/2 origin-top hidden md:block"
        />

        <div className="flex flex-col gap-12 md:gap-0">
          {experiences.map((exp, index) => (
            <div
              key={index}
              data-side={exp.side}
              className={cn(
                "timeline-node relative flex flex-col md:flex-row items-center w-full md:mb-24",
                exp.side === "left" ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Content Card */}
              <div className={cn("w-full md:w-1/2", exp.side === "left" ? "md:pl-12" : "md:pr-12")}>
                <div className="p-8 rounded-3xl bg-surface border border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                  <span className="absolute -top-4 -right-4 text-8xl font-display font-black text-border/20 group-hover:text-primary/10 transition-colors pointer-events-none">
                    {exp.year.split("–")[0]}
                  </span>
                  <div className="relative z-10">
                    <span className="text-xs font-mono text-primary mb-2 block">{exp.year}</span>
                    <h3 className="text-2xl font-display font-bold mb-1">{exp.company}</h3>
                    <p className="text-sm font-medium text-text-muted mb-4">{exp.role}</p>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded bg-background border border-border text-[10px] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="timeline-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-border border-4 border-background z-10 hidden md:block" />

              {/* Empty space for the other side */}
              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
