"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SectionLabel from "../ui/SectionLabel";

const marquee1 = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GraphQL",
  "Prisma",
  "Redis",
];
const marquee2 = [
  "Three.js",
  "GSAP",
  "Figma",
  "Python",
  "Rust",
  "Kubernetes",
  "Terraform",
  "WebGL",
  "Framer Motion",
  "TailwindCSS",
];

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js / WebGL", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "PostgreSQL / Prisma", level: 85 },
      { name: "GraphQL / Apollo", level: 80 },
      { name: "Python / Django", level: 75 },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Docker / K8s", level: 80 },
      { name: "AWS / GCP", level: 85 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Git / GitHub", level: 95 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const bars = sectionRef.current?.querySelectorAll(".progress-bar-fill");
      bars?.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-level");
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(targetWidth) / 100,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 95%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" ref={sectionRef} className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <SectionLabel label="/ What I Work With" align="center" />
      </div>

      {/* Marquee Section */}
      <div className="flex flex-col gap-6 mb-24">
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-6 pr-6">
            {[...marquee1, ...marquee1].map((skill, i) => (
              <div
                key={i}
                className="px-8 py-4 rounded-full border border-border bg-surface text-xl font-display font-bold hover:border-primary transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused] gap-6 pr-6">
            {[...marquee2, ...marquee2].map((skill, i) => (
              <div
                key={i}
                className="px-8 py-4 rounded-full border border-border bg-surface text-xl font-display font-bold hover:border-secondary transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {skillCategories.map((category) => (
          <div key={category.title} className="flex flex-col gap-8">
            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-text-muted">
              {category.title}
            </h3>
            <div className="flex flex-col gap-6">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-[10px] font-mono text-text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <div
                      className="progress-bar-fill h-full bg-gradient-to-r from-primary to-secondary origin-left"
                      data-level={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
