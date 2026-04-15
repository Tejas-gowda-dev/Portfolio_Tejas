"use client";

import { useState, useRef } from "react";
import { Mail, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import { cn } from "@/lib/utils";

const contactMethods = [
  {
    name: "Email",
    value: "developer@example.com",
    icon: Mail,
    href: "mailto:developer@example.com",
  },
  {
    name: "GitHub",
    value: "github.com/devname",
    icon: Github,
    href: "https://github.com",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/devname",
    icon: Linkedin,
    href: "https://linkedin.com",
  },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
        },
      });

      gsap.from(".contact-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-cards",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        setIsSubmitted(true);
        gsap.fromTo(
          ".success-message",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      },
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Noise/Gradient */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#6EE7B710,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#A78BFA10,transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <SectionLabel label="/ Contact" align="center" />
        
        <div className="contact-title flex flex-col mb-16">
          <span className="text-[7vw] font-display font-bold leading-none">Let's Build</span>
          <span className="text-[10vw] font-display font-bold leading-none text-primary">Something</span>
          <span className="text-[7vw] font-display font-bold leading-none">Together.</span>
        </div>

        <div className="contact-cards grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group p-8 rounded-3xl bg-surface border border-border hover:border-primary transition-all duration-500 flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-2xl bg-background border border-border group-hover:text-primary group-hover:border-primary transition-all">
                <method.icon size={24} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
                {method.name}
              </span>
              <span className="text-lg font-medium">{method.value}</span>
            </a>
          ))}
        </div>

        <div className="w-full max-w-3xl relative">
          {!isSubmitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-muted ml-2">Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-muted ml-2">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-muted ml-2">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full p-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-mono uppercase tracking-widest text-text-muted ml-2">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full p-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-center mt-4">
                <MagneticButton className="bg-primary text-background font-bold px-12 py-4 w-full md:w-auto">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          ) : (
            <div className="success-message flex flex-col items-center gap-6 py-12">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-display font-bold">Message Sent!</h3>
              <p className="text-text-muted">Thanks for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary font-mono text-xs uppercase tracking-widest hover:underline"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
