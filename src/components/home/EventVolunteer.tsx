"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiZap, FiCheckCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";


// --- STATIC DATA (akan diganti dengan data dari backend) ---

const liveEvent = {
  id: 1,
  category: "Workshop",
  title: "BEM Leadership Training 2024",
  desc: "Dua hari penuh pengembangan kepemimpinan intensif untuk seluruh pengurus dan calon pemimpin BEM STMIK Tazkia 2024/2025 bersama Dosen & Alumni.",
  date: "20–21 Agustus 2024",
  time: "08:00 - 15:00 WIB",
  location: "Auditorium STMIK",
  registered: 47,
  imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
};

const upcomingEvents = [
  {
    id: 2,
    category: "Workshop",
    title: "UI/UX Design Bootcamp 2024",
    date: "24 August 2024",
    time: "09:00 - 14:00 WIB",
    location: "Auditorium STMIK",
    slots: 4,
    imgUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Seminar",
    title: "Tech Career Talks: AI Future",
    date: "26 August 2024",
    time: "13:00 - 16:00 WIB",
    location: "Aula Utama",
    slots: 12,
    imgUrl: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    category: "Kompetisi",
    title: "Tazkia IT Hackathon",
    date: "10 September 2024",
    time: "08:00 - 20:00 WIB",
    location: "Lab Komputer Terpadu",
    slots: 10,
    imgUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const volunteerOpportunities = [
  {
    id: 1,
    category: "KOORDINASI ACARA",
    title: "Sponsorship Liaison",
    desc: "Responsible for securing funding/partnerships for student events, facilitating communication and negotiation with respective parties.",
    deadline: "31 Jan 2025",
    isUrgent: true,
    imgUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    category: "KREATIF & KONTEN",
    title: "Content Creator",
    desc: "Creating engaging visual content for social media platforms, including design of HTML, CSS, and social media assets.",
    deadline: "15 Feb 2025",
    isUrgent: false,
    imgUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    category: "TEKNOLOGI & WEB",
    title: "Web Developer Assistant",
    desc: "Assist in maintaining and developing features for the BEM website. Knowledge of HTML, CSS, or JavaScript is required.",
    deadline: "20 Feb 2025",
    isUrgent: false,
    imgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

const pastEvents = [
  {
    id: 4,
    category: "Festival",
    title: "Summer Networking Gala",
    imgUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    category: "Kompetisi",
    title: "Annual Hackathon 2024",
    imgUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    category: "Seminar",
    title: "Mental Health Awareness Week",
    imgUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

// --- MAIN COMPONENT ---

export default function EventVolunteer({ showHeader = true }: { showHeader?: boolean }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const AUTOPLAY_INTERVAL = 5000;

  const goTo = useCallback((index: number, dir?: number) => {
    if (upcomingEvents.length === 0) return;
    const d = dir ?? (index > active ? 1 : -1);
    setDirection(d);
    setActive(index);
    setProgress(0);
  }, [active]);

  const next = useCallback(() => {
    if (upcomingEvents.length === 0) return;
    goTo((active + 1) % upcomingEvents.length, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    if (upcomingEvents.length === 0) return;
    goTo((active - 1 + upcomingEvents.length) % upcomingEvents.length, -1);
  }, [active, goTo]);

  useEffect(() => {
    if (paused || upcomingEvents.length <= 1) return;
    intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 0);
    if (paused || upcomingEvents.length <= 1) return () => clearTimeout(timer);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTOPLAY_INTERVAL) * 100, 100));
    }, 40);
    return () => {
      clearTimeout(timer);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [active, paused]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0, scale: 0.95 }),
  };

  // Volunteer Slider States
  const [activeVol, setActiveVol] = useState(0);
  const [directionVol, setDirectionVol] = useState(1);
  const [pausedVol, setPausedVol] = useState(false);
  const [progressVol, setProgressVol] = useState(0);
  const intervalVolRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressVolRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToVol = useCallback((index: number, dir?: number) => {
    if (volunteerOpportunities.length === 0) return;
    const d = dir ?? (index > activeVol ? 1 : -1);
    setDirectionVol(d);
    setActiveVol(index);
    setProgressVol(0);
  }, [activeVol]);

  const nextVol = useCallback(() => {
    if (volunteerOpportunities.length === 0) return;
    goToVol((activeVol + 1) % volunteerOpportunities.length, 1);
  }, [activeVol, goToVol]);

  const prevVol = useCallback(() => {
    if (volunteerOpportunities.length === 0) return;
    goToVol((activeVol - 1 + volunteerOpportunities.length) % volunteerOpportunities.length, -1);
  }, [activeVol, goToVol]);

  useEffect(() => {
    if (pausedVol || volunteerOpportunities.length <= 1) return;
    intervalVolRef.current = setInterval(nextVol, AUTOPLAY_INTERVAL);
    return () => { if (intervalVolRef.current) clearInterval(intervalVolRef.current); };
  }, [pausedVol, nextVol]);

  useEffect(() => {
    const timer = setTimeout(() => setProgressVol(0), 0);
    if (pausedVol || volunteerOpportunities.length <= 1) return () => clearTimeout(timer);
    const start = Date.now();
    progressVolRef.current = setInterval(() => {
      setProgressVol(Math.min(((Date.now() - start) / AUTOPLAY_INTERVAL) * 100, 100));
    }, 40);
    return () => {
      clearTimeout(timer);
      if (progressVolRef.current) clearInterval(progressVolRef.current);
    };
  }, [activeVol, pausedVol]);

  // Past Events Slider States
  const [activePast, setActivePast] = useState(0);
  const [directionPast, setDirectionPast] = useState(1);
  const [pausedPast, setPausedPast] = useState(false);
  const [progressPast, setProgressPast] = useState(0);
  const intervalPastRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressPastRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToPast = useCallback((index: number, dir?: number) => {
    if (pastEvents.length === 0) return;
    const d = dir ?? (index > activePast ? 1 : -1);
    setDirectionPast(d);
    setActivePast(index);
    setProgressPast(0);
  }, [activePast]);

  const nextPast = useCallback(() => {
    if (pastEvents.length === 0) return;
    goToPast((activePast + 1) % pastEvents.length, 1);
  }, [activePast, goToPast]);

  const prevPast = useCallback(() => {
    if (pastEvents.length === 0) return;
    goToPast((activePast - 1 + pastEvents.length) % pastEvents.length, -1);
  }, [activePast, goToPast]);

  useEffect(() => {
    if (pausedPast || pastEvents.length <= 1) return;
    intervalPastRef.current = setInterval(nextPast, AUTOPLAY_INTERVAL);
    return () => { if (intervalPastRef.current) clearInterval(intervalPastRef.current); };
  }, [pausedPast, nextPast]);

  useEffect(() => {
    const timer = setTimeout(() => setProgressPast(0), 0);
    if (pausedPast || pastEvents.length <= 1) return () => clearTimeout(timer);
    const start = Date.now();
    progressPastRef.current = setInterval(() => {
      setProgressPast(Math.min(((Date.now() - start) / AUTOPLAY_INTERVAL) * 100, 100));
    }, 40);
    return () => {
      clearTimeout(timer);
      if (progressPastRef.current) clearInterval(progressPastRef.current);
    };
  }, [activePast, pausedPast]);


  return (
    <div className="bg-[#f8f9fc] py-10 md:py-16">

      {/* ============================================ */}
      {/*  HERO HEADER                                */}
      {/* ============================================ */}
      {showHeader && (
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mb-10 md:mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-5">
          <FiCalendar size={13} /> Program Kegiatan
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Events &amp; <span className="text-[var(--color-primary)]">Volunteer</span> Hub
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-8">
          Temukan event terkini, daftarkan diri sebagai relawan, dan jadilah bagian dari perubahan nyata di kampus.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="#upcoming"
            className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all"
          >
            Lihat Events
          </Link>
          <Link
            href="#volunteer"
            className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[var(--color-primary)]/5 hover:-translate-y-0.5 transition-all"
          >
            Jadi Volunteer
          </Link>
        </div>
      </section>
      )}

      {/* ============================================ */}
      {/*  SECTION 1: LIVE EVENT                      */}
      {/* ============================================ */}
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mb-10 md:mb-16">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-on-background">Event Sedang Berjalan</h2>
          <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            <FiZap size={11} /> LIVE
          </span>
        </div>

        {/* Live Event Card */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
          {/* BG Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${liveEvent.imgUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/75 to-primary/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end p-5 sm:p-7 md:p-10 min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm w-fit border border-white/30 mb-3">
              {liveEvent.category}
            </span>

            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight">{liveEvent.title}</h3>

            <div className="flex flex-col gap-1 text-white/80 text-xs sm:text-sm mb-4">
              <span className="flex items-center gap-1.5"><FiCalendar size={13} /> {liveEvent.date}</span>
              <span className="flex items-center gap-1.5"><FiClock size={13} /> {liveEvent.time}</span>
              <span className="flex items-center gap-1.5"><FiMapPin size={13} /> {liveEvent.location}</span>
            </div>

            <div>
              <Link href="#" className="bg-secondary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-secondary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md inline-flex items-center gap-2">
                Masuk ke Live <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================ */}
      {/*  SECTIONS 2, 3, 4: 3-COLUMN GRID (desktop) */}
      {/* ============================================ */}
      <div className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ---- COLUMN 1: UPCOMING EVENTS ---- */}
          <section
            id="upcoming"
            onMouseEnter={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) setPaused(true);
            }}
            onMouseLeave={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) setPaused(false);
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-on-background">Upcoming Events</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Agenda kegiatan BEM terdekat</p>
              </div>
              <Link href="/agenda" className="group flex items-center gap-1 text-primary hover:text-secondary font-semibold text-xs transition-colors whitespace-nowrap shrink-0">
                Lihat Semua <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="bg-white border border-outline-variant/20 rounded-3xl p-8 text-center shadow-sm">
                <FiCalendar size={40} className="mx-auto text-primary/40 mb-3 animate-pulse" />
                <h3 className="text-base font-bold text-on-background">Belum Ada Event Mendatang</h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Belum ada agenda kegiatan terdekat yang dijadwalkan.</p>
                <Link href="/agenda" className="mt-4 inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-primary/95 transition-all shadow-md">
                  Lihat Arsip <FiArrowRight />
                </Link>
              </div>
            ) : (
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
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg bg-gray-100">
                  {upcomingEvents.length > 1 && (
                    <div
                      className="absolute top-0 left-0 h-1 z-20 transition-none rounded-full"
                      style={{ width: `${progress}%`, backgroundColor: "var(--color-primary)" }}
                    />
                  )}
                  <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                      key={upcomingEvents[active].id}
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
                      <img src={upcomingEvents[active].imgUrl} alt={upcomingEvents[active].title} className="w-full h-full object-cover select-none" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-secondary text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {upcomingEvents[active].category}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-extrabold text-sm leading-tight mb-2">{upcomingEvents[active].title}</h3>
                        <div className="flex flex-col gap-0.5 text-white/80 text-[10px] mb-3">
                          <span className="flex items-center gap-1.5"><FiCalendar size={11} className="text-secondary" /> {upcomingEvents[active].date}</span>
                          <span className="flex items-center gap-1.5"><FiClock size={11} className="text-secondary" /> {upcomingEvents[active].time}</span>
                          <span className="flex items-center gap-1.5"><FiMapPin size={11} className="text-secondary" /> {upcomingEvents[active].location}</span>
                        </div>
                        <Link href={`/agenda/${upcomingEvents[active].id}?from=home`} className="bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md inline-flex items-center gap-1.5">
                          Detail Event <FiArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {upcomingEvents.length > 1 && (
                  <>
                    <button onClick={prev} className="absolute left-3 top-[38%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200" aria-label="Sebelumnya"><FiChevronLeft size={15} /></button>
                    <button onClick={next} className="absolute right-3 top-[38%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200" aria-label="Berikutnya"><FiChevronRight size={15} /></button>
                  </>
                )}
                {upcomingEvents.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {upcomingEvents.map((p, i) => (
                      <button key={p.id} onClick={() => goTo(i)} aria-label={`Event ${i + 1}`} className="rounded-full transition-all duration-300" style={{ width: active === i ? 20 : 6, height: 6, backgroundColor: active === i ? "var(--color-primary)" : "#c5c6d0" }} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ---- COLUMN 2: VOLUNTEER OPPORTUNITIES ---- */}
          <section
            id="volunteer"
            onMouseEnter={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) setPausedVol(true);
            }}
            onMouseLeave={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) setPausedVol(false);
            }}
          >
            <div className="flex justify-between items-start gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-on-background">Volunteer Opportunities</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Bergabunglah dan jadilah bagian perubahan!</p>
              </div>
              <Link href="/volunteer" className="group flex items-center gap-1 text-primary hover:text-secondary font-semibold text-xs transition-colors whitespace-nowrap shrink-0">
                Lihat Semua <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {volunteerOpportunities.length === 0 ? (
              <div className="bg-white border border-outline-variant/20 rounded-3xl p-8 text-center shadow-sm">
                <FiCheckCircle size={40} className="mx-auto text-primary/40 mb-3 animate-pulse" />
                <h3 className="text-base font-bold text-on-background">Belum Ada Lowongan</h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Belum ada posisi relawan baru. Pantau terus!</p>
              </div>
            ) : (
              <div
                className="relative"
                onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.dragX = String(e.clientX); }}
                onMouseUp={(e) => {
                  const start = Number((e.currentTarget as HTMLElement).dataset.dragX);
                  const diff = start - e.clientX;
                  if (Math.abs(diff) > 40) {
                    if (diff > 0) nextVol();
                    else prevVol();
                  }
                }}
                onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.dragX = String(e.touches[0].clientX); }}
                onTouchEnd={(e) => {
                  const start = Number((e.currentTarget as HTMLElement).dataset.dragX);
                  const diff = start - e.changedTouches[0].clientX;
                  if (Math.abs(diff) > 40) {
                    if (diff > 0) nextVol();
                    else prevVol();
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg bg-gray-100">
                  {volunteerOpportunities.length > 1 && (
                    <div className="absolute top-0 left-0 h-1 z-20 transition-none rounded-full" style={{ width: `${progressVol}%`, backgroundColor: "var(--color-primary)" }} />
                  )}
                  <AnimatePresence custom={directionVol} initial={false}>
                    <motion.div
                      key={volunteerOpportunities[activeVol].id}
                      custom={directionVol}
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
                        if (info.offset.x < -40) nextVol();
                        if (info.offset.x > 40) prevVol();
                      }}
                    >
                      <img src={volunteerOpportunities[activeVol].imgUrl} alt={volunteerOpportunities[activeVol].title} className="w-full h-full object-cover select-none" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                      {volunteerOpportunities[activeVol].isUrgent && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <FiClock size={10} /> SEGERA
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">{volunteerOpportunities[activeVol].category}</span>
                        <h3 className="font-extrabold text-sm leading-tight mb-1">{volunteerOpportunities[activeVol].title}</h3>
                        <p className="text-white/80 text-[10px] mb-2 leading-relaxed line-clamp-2">{volunteerOpportunities[activeVol].desc}</p>
                        <div className="flex items-center gap-1 text-[10px] text-white/70 mb-3">
                          <FiClock size={11} className="text-secondary" />
                          <span>Deadline: <span className="font-semibold text-white">{volunteerOpportunities[activeVol].deadline}</span></span>
                        </div>
                        <Link href={`/volunteer/${volunteerOpportunities[activeVol].id}?from=home`} className="bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md inline-flex items-center gap-1.5">
                          <FiCheckCircle size={12} /> Apply Posisi
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {volunteerOpportunities.length > 1 && (
                  <>
                    <button onClick={prevVol} className="absolute left-3 top-[38%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200" aria-label="Sebelumnya"><FiChevronLeft size={15} /></button>
                    <button onClick={nextVol} className="absolute right-3 top-[38%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200" aria-label="Berikutnya"><FiChevronRight size={15} /></button>
                  </>
                )}
                {volunteerOpportunities.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {volunteerOpportunities.map((p, i) => (
                      <button key={p.id} onClick={() => goToVol(i)} aria-label={`Volunteer ${i + 1}`} className="rounded-full transition-all duration-300" style={{ width: activeVol === i ? 20 : 6, height: 6, backgroundColor: activeVol === i ? "var(--color-primary)" : "#c5c6d0" }} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ---- COLUMN 3: PAST EVENTS ---- */}
          <section
            id="past-events"
            onMouseEnter={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) setPausedPast(true);
            }}
            onMouseLeave={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) setPausedPast(false);
            }}
          >
            <div className="flex justify-between items-start gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-on-background">Event yang Sudah Berakhir</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Galeri arsip kegiatan BEM terdahulu</p>
              </div>
              <Link href="/agenda" className="group flex items-center gap-1 text-on-surface-variant hover:text-primary font-semibold text-xs transition-colors whitespace-nowrap shrink-0">
                Lihat Semua <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {pastEvents.length === 0 ? (
              <div className="bg-white border border-outline-variant/20 rounded-3xl p-8 text-center shadow-sm">
                <FiCheckCircle size={40} className="mx-auto text-primary/40 mb-3 animate-pulse" />
                <h3 className="text-base font-bold text-on-background">Belum Ada Arsip</h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Belum ada data dokumentasi kegiatan.</p>
              </div>
            ) : (
              <div
                className="relative"
                onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.dragX = String(e.clientX); }}
                onMouseUp={(e) => {
                  const start = Number((e.currentTarget as HTMLElement).dataset.dragX);
                  const diff = start - e.clientX;
                  if (Math.abs(diff) > 40) {
                    if (diff > 0) nextPast();
                    else prevPast();
                  }
                }}
                onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.dragX = String(e.touches[0].clientX); }}
                onTouchEnd={(e) => {
                  const start = Number((e.currentTarget as HTMLElement).dataset.dragX);
                  const diff = start - e.changedTouches[0].clientX;
                  if (Math.abs(diff) > 40) {
                    if (diff > 0) nextPast();
                    else prevPast();
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg bg-gray-100">
                  {pastEvents.length > 1 && (
                    <div className="absolute top-0 left-0 h-1 z-20 transition-none rounded-full" style={{ width: `${progressPast}%`, backgroundColor: "var(--color-primary)" }} />
                  )}
                  <AnimatePresence custom={directionPast} initial={false}>
                    <motion.div
                      key={pastEvents[activePast].id}
                      custom={directionPast}
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
                        if (info.offset.x < -40) nextPast();
                        if (info.offset.x > 40) prevPast();
                      }}
                    >
                      <img src={pastEvents[activePast].imgUrl} alt={pastEvents[activePast].title} className="w-full h-full object-cover grayscale select-none" draggable={false} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-secondary text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {pastEvents[activePast].category}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-extrabold text-sm leading-tight mb-3">{pastEvents[activePast].title}</h3>
                        <Link href="#" className="bg-white/20 text-white text-[10px] font-bold px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 inline-flex items-center gap-1.5 border border-white/20 backdrop-blur-sm">
                          Lihat Dokumentasi <FiArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {pastEvents.length > 1 && (
                  <>
                    <button onClick={prevPast} className="absolute left-3 top-[38%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200" aria-label="Sebelumnya"><FiChevronLeft size={15} /></button>
                    <button onClick={nextPast} className="absolute right-3 top-[38%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-on-background hover:bg-white hover:scale-110 transition-all duration-200" aria-label="Berikutnya"><FiChevronRight size={15} /></button>
                  </>
                )}
                {pastEvents.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {pastEvents.map((p, i) => (
                      <button key={p.id} onClick={() => goToPast(i)} aria-label={`Arsip ${i + 1}`} className="rounded-full transition-all duration-300" style={{ width: activePast === i ? 20 : 6, height: 6, backgroundColor: activePast === i ? "var(--color-primary)" : "#c5c6d0" }} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

