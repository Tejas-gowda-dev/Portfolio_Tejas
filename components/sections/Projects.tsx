"use client";

import { useRef } from "react";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SectionLabel from "../ui/SectionLabel";
import MagneticButton from "../ui/MagneticButton";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "01",
    title: "Nexus Platform",
    description:
      "A comprehensive SaaS analytics dashboard designed for high-growth startups. Features real-time data processing, custom reporting, and multi-tenant architecture.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
    live: "#",
    github: "#",
    color: "primary",
  },
  {
    id: "02",
    title: "Orbit CMS",
    description:
      "Modern headless CMS built for speed and developer experience. Includes real-time collaboration features, version control, and a powerful plugin system.",
    tags: ["TypeScript", "Node.js", "Redis", "AWS"],
    live: "#",
    github: "#",
    color: "secondary",
  },
  {
    id: "03",
    title: "Spectral AI",
    description:
      "ML-powered design critique tool that analyzes UI layouts for accessibility and best practices. Provides actionable insights to improve user experience.",
    tags: ["Python", "React", "TensorFlow", "GraphQL"],
    live: "#",
    github: "#",
    color: "primary",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card) => {
        const left = card.querySelector(".project-left");
        const right = card.querySelector(".project-right");

        gsap.fromTo(
          left,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
            },
          }
        );

        gsap.fromTo(
          right,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mb-20">
        <SectionLabel label="/ Selected Work" />
        <div className="flex items-baseline gap-4">
          <h2 className="text-4xl md:text-6xl font-display font-bold">Featured Projects</h2>
          <span className="text-sm font-mono text-text-muted">( 03 projects )</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={cn(
              "project-card flex flex-col gap-12 items-center",
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            )}
          >
            {/* Left Panel */}
            <div className="project-left flex-1 flex flex-col gap-6">
              <span className="text-6xl md:text-8xl font-display font-black text-border/50">
                {project.id}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-surface border border-border text-[10px] font-mono uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold">{project.title}</h3>
              <p className="text-lg text-text-muted leading-relaxed max-w-xl">
                {project.description}
              </p>
              <div className="flex gap-4 mt-4">
                <MagneticButton className="bg-primary text-background font-bold px-6 py-3 flex items-center gap-2 text-sm">
                  Live Demo <ExternalLink size={16} />
                </MagneticButton>
                <MagneticButton className="border border-border text-text-primary hover:bg-surface font-bold px-6 py-3 flex items-center gap-2 text-sm">
                  GitHub <Github size={16} />
                </MagneticButton>
              </div>
            </div>

            {/* Right Panel - Visual Placeholder */}
            <div className="project-right flex-1 w-full aspect-video rounded-3xl bg-surface border border-border overflow-hidden relative group">
              <div
                className={cn(
                  "absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700",
                  project.color === "primary"
                    ? "bg-gradient-to-br from-primary to-transparent"
                    : "bg-gradient-to-br from-secondary to-transparent"
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-xl bg-background/50 backdrop-blur-sm border border-border p-6 flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="h-4 w-1/2 bg-border rounded" />
                    <div className="h-4 w-full bg-border rounded" />
                    <div className="h-4 w-3/4 bg-border rounded" />
                    <div className="mt-auto flex gap-4">
                      <div className="h-8 w-24 bg-primary/20 rounded" />
                      <div className="h-8 w-24 bg-border rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-32 text-center">
        <Link
          href="#"
          className="group inline-flex items-center gap-4 text-xl font-display font-bold hover:text-primary transition-colors"
        >
          See all projects on GitHub
          <div className="h-[2px] w-12 bg-primary group-hover:w-24 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
