"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiHome, FiAward, FiCalendar, FiBookOpen, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeBottomSheet, setActiveBottomSheet] = useState<'publikasi' | 'profil' | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveBottomSheet(null);
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
        { name: "Dokumentasi", path: "/dokumentasi" }
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
    <>
    <nav
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? "bg-white border-outline-variant/50 shadow-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-20 md:h-24 px-5 md:px-10 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 md:gap-4 group">
          <div className="flex items-center gap-2">
            <Image
              alt="BEM STMIK Tazkia Logo 1"
              src="/images/logo.png"
              width={64}
              height={64}
              priority
              className="h-12 w-auto md:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <Image
              alt="BEM STMIK Tazkia Logo 2"
              src="/images/logo2.png"
              width={64}
              height={64}
              priority
              className="h-12 w-auto md:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
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

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex space-x-8 items-center font-semibold text-sm">
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
        </div>

        {/* Action Button (Tablet & Desktop) */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <Link
              href="/admin"
              className={`ml-4 px-8 py-3 rounded-full font-semibold transition-all hover:-translate-y-0.5 shadow-soft flex items-center gap-2 ${
                isScrolled || !isHome
                  ? "bg-primary text-on-primary hover:bg-primary/90"
                  : "bg-white/15 backdrop-blur-md border border-white/40 text-white hover:bg-secondary hover:border-secondary"
              }`}
            >
              Dashboard Admin
            </Link>
          ) : (
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
          )}
        </div>
      </div>
    </nav>

    {/* Mobile & Tablet Bottom Navigation Bar */}
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-t border-outline-variant/30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-5 pt-2 px-2 flex justify-between items-center rounded-t-3xl">
      <Link href="/" className={`flex-1 flex flex-col items-center gap-1 transition-colors ${pathname === "/" ? "text-secondary" : "text-on-surface-variant hover:text-primary"}`}>
        <FiHome size={22} className={pathname === "/" ? "fill-secondary/20" : ""} />
        <span className="text-[10px] font-bold">Beranda</span>
      </Link>
      
      <Link href="/agenda" className={`flex-1 flex flex-col items-center gap-1 transition-colors ${pathname.startsWith("/agenda") ? "text-secondary" : "text-on-surface-variant hover:text-primary"}`}>
        <FiCalendar size={22} className={pathname.startsWith("/agenda") ? "fill-secondary/20" : ""} />
        <span className="text-[10px] font-bold">Agenda</span>
      </Link>

      <Link href="/karya" className={`flex-1 flex flex-col items-center gap-1 transition-colors ${pathname.startsWith("/karya") ? "text-secondary" : "text-on-surface-variant hover:text-primary"}`}>
        <div className="bg-primary text-white p-3 rounded-full -mt-6 shadow-glow border-4 border-white flex items-center justify-center">
          <FiAward size={22} />
        </div>
        <span className="text-[10px] font-bold">Karya</span>
      </Link>

      <button onClick={() => setActiveBottomSheet(activeBottomSheet === 'publikasi' ? null : 'publikasi')} className={`flex-1 flex flex-col items-center gap-1 transition-colors ${activeBottomSheet === 'publikasi' || pathname.startsWith("/berita") || pathname.startsWith("/dokumentasi") ? "text-secondary" : "text-on-surface-variant hover:text-primary"}`}>
        <FiBookOpen size={22} className={activeBottomSheet === 'publikasi' || pathname.startsWith("/berita") || pathname.startsWith("/dokumentasi") ? "fill-secondary/20" : ""} />
        <span className="text-[10px] font-bold">Publikasi</span>
      </button>

      <button onClick={() => setActiveBottomSheet(activeBottomSheet === 'profil' ? null : 'profil')} className={`flex-1 flex flex-col items-center gap-1 transition-colors ${activeBottomSheet === 'profil' || pathname.startsWith("/kabinet") ? "text-secondary" : "text-on-surface-variant hover:text-primary"}`}>
        <FiUser size={22} className={activeBottomSheet === 'profil' || pathname.startsWith("/kabinet") ? "fill-secondary/20" : ""} />
        <span className="text-[10px] font-bold text-center">Profil BEM</span>
      </button>
    </nav>

    {/* Overlay for Bottom Sheet */}
    <AnimatePresence>
      {activeBottomSheet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setActiveBottomSheet(null)}
        />
      )}
    </AnimatePresence>

    {/* Bottom Sheets */}
    <AnimatePresence>
      {activeBottomSheet === 'publikasi' && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="lg:hidden fixed bottom-24 left-4 right-4 z-50 bg-white rounded-2xl shadow-xl overflow-hidden border border-outline-variant/30"
        >
          <div className="flex flex-col p-2">
            <Link href="/berita" className="px-5 py-4 font-bold text-sm border-b border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between">
              Berita
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link href="/dokumentasi" className="px-5 py-4 font-bold text-sm text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between">
              Dokumentasi
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          </div>
        </motion.div>
      )}
      
      {activeBottomSheet === 'profil' && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="lg:hidden fixed bottom-24 left-4 right-4 z-50 bg-white rounded-2xl shadow-xl overflow-hidden border border-outline-variant/30"
        >
          <div className="flex flex-col p-2">
            <Link href="/kabinet" className="px-5 py-4 font-bold text-sm border-b border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between">
              Kabinet
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link href="/#saran" onClick={() => setActiveBottomSheet(null)} className="px-5 py-4 font-bold text-sm text-on-surface hover:bg-surface-container transition-colors flex items-center justify-between">
              Kotak Saran & Aduan
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
