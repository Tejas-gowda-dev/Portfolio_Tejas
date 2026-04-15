"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Dribbble } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Dribbble, href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Link href="/" className="text-2xl font-display font-bold tracking-tighter mb-2 block">
              <span className="text-primary">D</span>EV.
            </Link>
            <p className="text-sm text-text-muted">Crafted with Next.js, Three.js & GSAP</p>
          </div>

          <div className="flex gap-8">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="p-3 rounded-xl bg-surface border border-border hover:border-primary hover:text-primary transition-all"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-border/50">
          <p className="text-xs font-mono text-text-muted">
            © 2024 — Designed & Built by [Your Name]
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                Currently in Bangalore
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
              Open to opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
