"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(".mobile-menu", { x: 0, duration: 0.6, ease: "expo.out" });
        gsap.fromTo(
          ".mobile-link",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out", delay: 0.2 }
        );
      } else {
        gsap.to(".mobile-menu", { x: "100%", duration: 0.6, ease: "expo.in" });
      }
    },
    { dependencies: [isOpen], scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 md:py-6",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border py-3 md:py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter group">
          <span className="text-primary group-hover:text-secondary transition-colors duration-300">D</span>
          <span>EV.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <MagneticButton className="bg-primary text-background font-bold text-xs uppercase tracking-widest px-6 py-2.5">
            Hire Me
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary z-[110]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed inset-0 bg-surface z-[100] translate-x-full md:hidden flex flex-col items-center justify-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="mobile-link text-4xl font-display font-bold hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <MagneticButton className="mobile-link bg-primary text-background font-bold px-10 py-4 mt-4">
          Hire Me
        </MagneticButton>
      </div>
    </nav>
  );
}
