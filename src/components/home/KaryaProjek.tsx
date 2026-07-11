"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiEye, FiHeart, FiChevronLeft, FiChevronRight, FiTrendingUp } from "react-icons/fi";

// Sorted by likes (top liked first)
const projects = [
  {
    id: 2,
    rank: 1,
    badge: "UI/UX",
    title: "Student Portal Redesign",
    desc: "Transformasi menyeluruh pengalaman digital mahasiswa, meningkatkan task completion rate hingga 67%.",
    imgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    likes: 312,
    views: 2800,
    viewsLabel: "2.8k",
    date: "Sept 2023",
    badgeColor: "bg-purple-50 text-purple-600",
    accentColor: "#9333ea",
  },
  {
    id: 1,
    rank: 2,
    badge: "TECHNOLOGY",
    title: "Autonomous Campus Rover",
    desc: "Robot pengiriman mandiri untuk logistik intra-kampus menggunakan algoritma SLAM dan navigasi AI.",
    imgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    likes: 145,
    views: 1200,
    viewsLabel: "1.2k",
    date: "Jan 2024",
    badgeColor: "bg-blue-50 text-blue-600",
    accentColor: "#1b4086",
  },
  {
    id: 3,
    rank: 3,
    badge: "RESEARCH",
    title: "Sustainable Energy Audit",
    desc: "Analisis konsumsi energi kampus berbasis IoT & machine learning dengan potensi penghematan 28%.",
    imgUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    likes: 89,
    views: 654,
    viewsLabel: "654",
    date: "Aug 2023",
    badgeColor: "bg-green-50 text-green-600",
    accentColor: "#16a34a",
  },
];

const AUTOPLAY_INTERVAL = 4500;

// const rankColors = ["#f59e0b", "#9ca3af", "#cd7c2e"]; // gold, silver, bronze
const rankLabel = ["🥇", "🥈", "🥉"];

export default function KaryaProjek() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir?: number) => {
    const d = dir ?? (index > active ? 1 : -1);
    setDirection(d);
    setActive(index);
    setProgress(0);
  }, [active]);

  const next = useCallback(() => goTo((active + 1) % projects.length, 1), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + projects.length) % projects.length, -1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 0);
    if (paused) return () => clearTimeout(timer);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTOPLAY_INTERVAL) * 100, 100));
    }, 40);
    return () => {
      clearTimeout(timer);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [active, paused]);

  const item = projects[active];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0, scale: 0.95 }),
  };

  return (
    <section
      className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-background overflow-hidden"
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.innerWidth >= 1024) setPaused(true);
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.innerWidth >= 1024) setPaused(false);
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <FiTrendingUp size={13} /> Karya Terbaik
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">
              Karya & Inovasi
            </h2>
            <p className="text-on-surface-variant text-sm mt-1 whitespace-nowrap">3 karya paling disukai mahasiswa</p>
          </div>
          <Link
            href="/karya"
            className="group flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-secondary transition-colors whitespace-nowrap shrink-0"
          >
            Lihat Semua <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ===== DESKTOP: 3-column grid ===== */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/karya/${p.id}`}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg bg-gray-100 block"
            >
              <img
                src={p.imgUrl}
                alt={p.title}
                className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 text-2xl drop-shadow-lg">{rankLabel[p.rank - 1]}</div>
              {/* accent top bar */}
              <div className="absolute top-0 left-0 w-full h-1 rounded-full" style={{ backgroundColor: p.accentColor }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{p.badge}</span>
                <h3 className="text-white font-extrabold text-base leading-tight mt-0.5">{p.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-white/70 text-xs"><FiEye size={12} /> {p.viewsLabel} dilihat</span>
                  <span className="flex items-center gap-1 text-white/70 text-xs"><FiHeart size={12} /> {p.likes} suka</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== MOBILE: Slider/Carousel ===== */}
        <div className="lg:hidden max-w-2xl mx-auto w-full">
          <div
            className="relative"
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.dragX = String(e.clientX); }}
            onMouseUp={(e) => {
              const start = Number((e.currentTarget as HTMLElement).dataset.dragX);
              const diff = start - e.clientX;
              if (Math.abs(diff) > 40) {
                if (diff > 0) next();
                else prev();
              }
            }}
            onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.dragX = String(e.touches[0].clientX); }}
            onTouchEnd={(e) => {
              const start = Number((e.currentTarget as HTMLElement).dataset.dragX);
              const diff = start - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) {
                if (diff > 0) next();
                else prev();
              }
            }}
          >
            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg bg-gray-100">
              {/* Progress bar */}
              <div
                className="absolute top-0 left-0 h-1 z-20 transition-none rounded-full"
                style={{ width: `${progress}%`, backgroundColor: item.accentColor }}
              />

              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={item.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.9 }}
                  className="absolute inset-0"
                  style={{ willChange: "transform" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) next();
                    if (info.offset.x > 40) prev();
                  }}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 text-2xl drop-shadow-lg">{rankLabel[item.rank - 1]}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{item.badge}</span>
                    <h3 className="text-white font-extrabold text-lg leading-tight mt-0.5">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-white/70 text-xs"><FiEye size={12} /> {item.viewsLabel} dilihat</span>
                      <span className="flex items-center gap-1 text-white/70 text-xs"><FiHeart size={12} /> {item.likes} suka</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / Next */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-6 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Sebelumnya"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-6 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Berikutnya"
            >
              <FiChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-label={`Karya ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? 24 : 8,
                    backgroundColor: active === i ? item.accentColor : "#c5c6d0",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
