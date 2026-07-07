"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
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
    { name: "Karya & Inovasi", path: "/karya" },
    { name: "Event & Rekrutmen", path: "/agenda" },
    { 
      name: "Publikasi", 
      dropdown: true,
      children: [
        { name: "Berita", path: "/berita" },
        { name: "Galeri", path: "/galeri" }
      ]
    },
    { 
      name: "Profil BEM", 
      dropdown: true,
      children: [
        { name: "Kabinet", path: "/kabinet" },
        { name: "Kotak Saran/Aduan", path: "/#saran" }
      ]
    },
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
            if (link.dropdown) {
              const isActive = link.children?.some(child => pathname === child.path);
              return (
                <div key={link.name} className="relative group">
                  <button
                    className={`flex items-center gap-1 py-2 transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-1 after:rounded-full after:transition-all after:duration-300 ${
                      isActive
                        ? `font-bold after:w-full after:bg-secondary ${isScrolled || !isHome ? "text-primary" : "text-white"}`
                        : isScrolled || !isHome
                          ? "text-on-surface-variant after:w-0 hover:after:w-full after:bg-primary hover:text-primary"
                          : "text-white/80 after:w-0 hover:after:w-full after:bg-white hover:text-white"
                    }`}
                  >
                    {link.name}
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 min-w-[200px]">
                    <div className="bg-white rounded-xl shadow-lg border border-outline-variant/30 py-2 overflow-hidden flex flex-col">
                      {link.children?.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          className="px-4 py-2.5 text-on-surface-variant hover:bg-primary-container hover:text-primary transition-colors text-sm font-semibold"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path!}
                className={`relative py-2 transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-1 after:rounded-full after:transition-all after:duration-300 ${
                  isActive
                    ? `font-bold after:w-full after:bg-secondary ${isScrolled || !isHome ? "text-primary" : "text-white"}`
                    : isScrolled || !isHome
                      ? "text-on-surface-variant after:w-0 hover:after:w-full after:bg-primary hover:text-primary"
                      : "text-white/80 after:w-0 hover:after:w-full after:bg-white hover:text-white"
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
                if (link.dropdown) {
                  const isActive = link.children?.some(child => pathname === child.path);
                  const isOpen = openMobileDropdown === link.name;
                  return (
                    <div key={link.name} className="flex flex-col gap-1">
                      <button 
                        onClick={() => setOpenMobileDropdown(isOpen ? null : link.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        {link.name}
                        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-1 overflow-hidden"
                          >
                            <div className="pl-4 border-l-2 border-outline-variant/30 ml-6 py-1 flex flex-col gap-1">
                              {link.children?.map(child => {
                                const isChildActive = pathname === child.path;
                                return (
                                  <Link
                                    key={child.name}
                                    href={child.path}
                                    className={`block px-4 py-2.5 rounded-xl font-semibold text-sm ${
                                      isChildActive
                                        ? "bg-primary-container text-primary font-bold"
                                        : "text-on-surface-variant hover:bg-surface-container"
                                    }`}
                                  >
                                    {child.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path!}
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
