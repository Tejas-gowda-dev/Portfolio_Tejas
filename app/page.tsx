"use client";

import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  useGSAP(() => {
    // Refresh ScrollTrigger on page load to ensure correct positions
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    // Page load animation sequence
    const tl = gsap.timeline();
    
    tl.from("main", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <div className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
