"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Divisi", path: "/divisi" },
    { name: "Agenda", path: "/agenda" },
    { name: "Saran/Aduan", path: "/#saran" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? "bg-white border-outline-variant/50 shadow-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-20 md:h-24 px-5 md:px-10 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-4 group">
          <img
            alt="BEM STMIK Tazkia Logo"
            className="h-14 md:h-16 object-contain group-hover:scale-105 transition-transform"
            src="/logo.png"
          />
          <div className="hidden sm:flex flex-row items-center gap-1.5">
            <span
              className={`font-bold leading-none text-xl transition-colors duration-300 ${
                isScrolled || !isHome ? "text-primary" : "text-white"
              }`}
            >
              BEM STMIK
            </span>
            <span
              className={`font-bold leading-none text-xl transition-colors duration-300 ${
                isScrolled || !isHome ? "text-secondary" : "text-white"
              }`}
            >
              Tazkia
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative py-2 transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-1 after:rounded-full after:transition-all after:duration-300 ${
                  isActive
                    ? `font-bold after:w-full after:bg-secondary ${isScrolled || !isHome ? "text-primary" : "text-white"}`
                    : `after:w-0 hover:after:w-full after:bg-primary hover:text-primary ${
                        isScrolled || !isHome ? "text-on-surface-variant" : "text-white/90"
                      }`
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/login"
            className={`ml-4 px-8 py-3 rounded-full font-semibold transition-all hover:-translate-y-0.5 shadow-soft ${
              isScrolled || !isHome
                ? "bg-primary text-on-primary hover:bg-primary/90"
                : "bg-white/15 backdrop-blur-md border border-white/40 text-white hover:bg-secondary hover:border-secondary"
            }`}
          >
            Masuk
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            isScrolled || !isHome
              ? "text-primary bg-surface-container border border-outline-variant/30"
              : "text-white bg-white/15 backdrop-blur-md border border-white/30"
          }`}
        >
          {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-outline-variant/30 overflow-hidden shadow-lg"
          >
            <div className="px-5 py-6 flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-4 py-3 rounded-xl font-semibold text-sm ${
                      isActive
                        ? "bg-primary-container text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/login"
                className="mt-2 block w-full bg-primary text-on-primary text-center px-4 py-3 rounded-full font-bold shadow-soft"
              >
                Masuk Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
