"use client";

import { useEffect, useState } from "react";
import { Menu, X, Car } from "lucide-react";
import { EMPRESA } from "../data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      const offset = 88;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  const navLinks = [
    { label: "Inicio", id: "inicio" },
    { label: "Vehículos", id: "vehiculos" },
    { label: "Quiénes somos", id: "quienes-somos" },
    { label: "Asesores", id: "asesores" },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 z-[80] w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/85 shadow-2xl backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white transition">
              <Car className="h-6 w-6" />
            </div>

            <div className="text-left">
              <span className="block text-xl font-black tracking-tight text-white transition">
                {EMPRESA.nombre}
              </span>

              <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 sm:block">
                Concesionaria premium
              </span>
            </div>
          </button>

          {/* DESKTOP */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className="rounded-full px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="absolute left-0 top-20 w-full border-t border-white/10 bg-black/95 shadow-xl backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="rounded-xl px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}