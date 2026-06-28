"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/wedding";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onHero = active === "home" && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 shadow-[0_4px_24px_rgba(90,84,76,0.08)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => handleNav("home")}
          className={`font-script text-3xl leading-none sm:text-4xl ${
            onHero
              ? "text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
              : "text-sage-deep"
          }`}
          aria-label="Arj and Tine — back to top"
        >
          Arj <span className="text-blue-dust">+</span> Tine
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className={`text-sm font-medium uppercase tracking-[0.18em] transition-colors hover:text-sage-deep ${
                  active === link.id
                    ? onHero
                      ? "text-cream"
                      : "text-sage-deep"
                    : onHero
                      ? "text-cream/85 hover:text-cream"
                      : "text-ink/80"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`h-0.5 w-6 transition-transform ${
              onHero ? "bg-cream" : "bg-ink"
            } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-opacity ${
              onHero ? "bg-cream" : "bg-ink"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-transform ${
              onHero ? "bg-cream" : "bg-ink"
            } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-sage/15 bg-cream/98 backdrop-blur transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-92" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className={`w-full py-3 text-left text-sm font-medium uppercase tracking-[0.18em] ${
                  active === link.id ? "text-sage-deep" : "text-ink/80"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
