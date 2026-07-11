"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiArrowLeft, FiHeart, FiEye, FiGithub, FiExternalLink,
  FiCalendar, FiTag, FiShare2,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// ─── FULL MOCK DATA ─────────────────────────────────────────────────────────
const projectsDetail: Record<number, {
  id: number;
  category: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  image: string;
  galleryImages: string[];
  likes: number;
  views: number;
  tech: string[];
  status: string;
  team: { name: string; role: string; avatar: string; github?: string; linkedin?: string }[];
  challenges: { title: string; desc: string }[];
  process: { phase: string; desc: string; image: string }[];
  quote: string;
  githubUrl?: string;
  liveUrl?: string;
  specs: Record<string, string>;
}> = {
  1: {
    id: 1,
    category: "TECHNOLOGY",
    title: "Autonomous Campus Rover",
    tagline: "Self-navigating delivery robot untuk logistik intra-kampus",
    description:
      "The Autonomous Campus Rover adalah robot pengiriman mandiri yang dirancang untuk navigasi intra-kampus menggunakan algoritma SLAM dan pemetaan berbasis AI. Robot dapat menavigasi lingkungan kampus yang kompleks, menghindari hambatan, dan mengantarkan dokumen medis antar gedung secara efisien.\n\nProyek ini diluncurkan untuk mengatasi tantangan distribusi dokumen antar laboratorium dengan biaya rendah. Ini merupakan langkah signifikan menuju tujuan kami membangun 'Smart Campus' di STMIK Tazkia.",
    date: "Jan 2024",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=800&q=80",
      "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    ],
    likes: 145,
    views: 1205,
    tech: ["Python", "ROS", "LIDAR", "Raspberry Pi"],
    status: "Completed",
    specs: {
      Platform: "ROS, LIDAR, Raspberry Pi 4",
      Sensor: "LIDAR 360°, Ultrasonic",
      Kecepatan: "1.2 m/s max",
      Baterai: "8 jam continuous",
    },
    team: [
      { name: "Adrian Pratama", role: "Project Lead / Robotics Eng.", avatar: "https://i.pravatar.cc/80?img=11", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Siti Rahayu", role: "Software Engineer", avatar: "https://i.pravatar.cc/80?img=47", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Dimas Kurniawan", role: "Hardware Engineer", avatar: "https://i.pravatar.cc/80?img=52", github: "https://github.com", linkedin: "https://linkedin.com" },
    ],
    challenges: [
      { title: "Dynamic Obstacles", desc: "Membangun sistem prediksi hambatan bergerak di koridor kampus yang padat menjadi tantangan utama kami." },
      { title: "Battery Efficiency", desc: "Mengoptimalkan konsumsi daya agar robot dapat beroperasi penuh selama 8 jam dalam sekali pengisian." },
      { title: "Real-time Mapping", desc: "Memproses data sensor LIDAR secara real-time dengan latensi kurang dari 50ms pada hardware terbatas." },
    ],
    process: [
      { phase: "Research & Design", desc: "Riset mendalam terhadap algoritma navigasi otonom, studi lingkungan kampus, dan desain arsitektur sistem selama 6 minggu.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" },
      { phase: "Prototyping", desc: "Membangun prototipe pertama dengan chassis aluminium custom dan integrasi sensor LIDAR + kamera untuk pengujian awal.", image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&q=80" },
    ],
    quote: "The development phase involved over 200 hours of testing across three different faculty buildings to fine-tune the mapping accuracy.",
    githubUrl: "https://github.com",
    liveUrl: "#",
  },
  2: {
    id: 2,
    category: "UI/UX",
    title: "Student Portal Redesign",
    tagline: "Transformasi pengalaman digital mahasiswa secara menyeluruh",
    description:
      "Proyek Student Portal Redesign hadir untuk mengatasi frustrasi mahasiswa terhadap antarmuka portal lama yang rumit dan tidak intuitif. Pendekatan user-centric dengan 50+ sesi user testing memastikan setiap keputusan desain berbasis data nyata.\n\nHasilnya adalah portal baru yang meningkatkan task completion rate sebesar 67% dan mengurangi waktu navigasi rata-rata hingga 40%.",
    date: "Sept 2023",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
    ],
    likes: 312,
    views: 2840,
    tech: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    status: "Completed",
    specs: {
      Tools: "Figma, Maze",
      Framework: "Next.js 14",
      "User Testing": "50+ sesi",
      "Task Completion": "+67%",
    },
    team: [
      { name: "Laila Firdaus", role: "Lead Designer", avatar: "https://i.pravatar.cc/80?img=49", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Reza Mahendra", role: "Frontend Dev", avatar: "https://i.pravatar.cc/80?img=57", github: "https://github.com", linkedin: "https://linkedin.com" },
    ],
    challenges: [
      { title: "User Diversity", desc: "Mengakomodasi kebutuhan 3000+ mahasiswa dari berbagai jurusan dengan kebiasaan digital yang berbeda-beda." },
      { title: "Legacy System", desc: "Mengintegrasikan desain baru dengan sistem backend lama yang memiliki keterbatasan API yang signifikan." },
      { title: "Accessibility", desc: "Memastikan WCAG 2.1 AA compliance di seluruh komponen untuk mahasiswa berkebutuhan khusus." },
    ],
    process: [
      { phase: "User Research", desc: "Survey kepada 200 mahasiswa, 30 wawancara mendalam, dan analisis heatmap portal lama selama 4 minggu.", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80" },
      { phase: "Design & Testing", desc: "Iterasi cepat dengan 12 versi prototype yang diuji ke pengguna nyata menggunakan platform Maze.", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80" },
    ],
    quote: "Every pixel was validated by real students. We ran over 50 usability testing sessions to ensure the portal truly works for everyone.",
    githubUrl: "https://github.com",
    liveUrl: "#",
  },
  3: {
    id: 3,
    category: "RESEARCH",
    title: "Sustainable Energy Audit",
    tagline: "Analisis konsumsi energi kampus berbasis IoT & machine learning",
    description:
      "Proyek ini melakukan audit menyeluruh terhadap konsumsi energi kampus STMIK Tazkia menggunakan jaringan sensor IoT yang dipasang di 12 gedung. Data dikumpulkan selama 6 bulan dan dianalisis menggunakan model machine learning untuk mengidentifikasi pola pemborosan.\n\nTemuan kami berpotensi menghemat hingga 28% biaya listrik kampus per tahun jika rekomendasi kami diimplementasikan sepenuhnya.",
    date: "Aug 2023",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    ],
    likes: 89,
    views: 654,
    tech: ["Python", "TensorFlow", "IoT Sensors", "Power BI"],
    status: "Published",
    specs: {
      Sensor: "48 node IoT",
      Periode: "6 bulan",
      "Data Points": "2.3 juta",
      "Potensi Hemat": "28% per tahun",
    },
    team: [
      { name: "Fauzan Hakim", role: "Research Lead", avatar: "https://i.pravatar.cc/80?img=60", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Anisa Dewi", role: "Data Analyst", avatar: "https://i.pravatar.cc/80?img=44", github: "https://github.com", linkedin: "https://linkedin.com" },
    ],
    challenges: [
      { title: "Data Heterogeneity", desc: "Menggabungkan data dari 48 sensor berbeda merk dengan format dan frekuensi sampling yang tidak seragam." },
      { title: "Anomaly Detection", desc: "Membangun model yang dapat membedakan lonjakan energi normal (kegiatan kampus) dari pemborosan yang sesungguhnya." },
      { title: "Stakeholder Buy-in", desc: "Meyakinkan pihak rektorat tentang validitas data dan urgensi implementasi rekomendasi." },
    ],
    process: [
      { phase: "Sensor Deployment", desc: "Pemasangan 48 node sensor IoT di 12 gedung kampus dan kalibrasi jaringan pengumpulan data terpusat.", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80" },
      { phase: "Analysis & Report", desc: "Analisis 2.3 juta data point menggunakan model time-series dan clustering untuk identifikasi pola konsumsi.", image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=800&q=80" },
    ],
    quote: "After six months of meticulous data collection, the patterns became clear the biggest culprits were HVAC systems running overnight in empty buildings.",
    githubUrl: "https://github.com",
  },
};

const categoryColors: Record<string, string> = {
  TECHNOLOGY: "bg-blue-100 text-blue-700",
  "UI/UX": "bg-purple-100 text-purple-700",
  RESEARCH: "bg-green-100 text-green-700",
  PROGRAMMING: "bg-orange-100 text-orange-700",
  "COMMUNITY SERVICE": "bg-pink-100 text-pink-700",
  MULTIMEDIA: "bg-yellow-100 text-yellow-700",
};

type Direction = 1 | -1;

export default function ProjectDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const project = projectsDetail[id];
  const [liked, setLiked] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isPaused, setIsPaused] = useState(false);

  const allImages = project ? [project.image, ...project.galleryImages] : [];

  const goTo = useCallback((index: number, dir: Direction) => {
    setDirection(dir);
    setActiveGallery(index);
  }, []);

  const next = useCallback(() => {
    const nextIndex = (activeGallery + 1) % allImages.length;
    goTo(nextIndex, 1);
  }, [activeGallery, allImages.length, goTo]);

  const prev = useCallback(() => {
    const prevIndex = (activeGallery - 1 + allImages.length) % allImages.length;
    goTo(prevIndex, -1);
  }, [activeGallery, allImages.length, goTo]);

  useEffect(() => {
    if (isPaused || !project) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next, project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">404</h1>
          <p className="text-gray-500 mb-6">Proyek tidak ditemukan.</p>
          <Link href="/karya" className="text-[var(--color-primary)] font-semibold flex items-center gap-2 justify-center hover:gap-3 transition-all">
            <FiArrowLeft /> Kembali ke Karya
          </Link>
        </div>
      </main>
    );
  }

  const slideVariants = {
    enter: (dir: Direction) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: Direction) => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] pt-28 pb-32 md:pb-20">

      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <div
        className="relative h-[420px] md:h-[520px] w-full overflow-hidden mb-0"
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.innerWidth >= 1024) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (typeof window !== "undefined" && window.innerWidth >= 1024) setIsPaused(false);
        }}
      >
        {/* Animated slide */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={activeGallery}
            src={allImages[activeGallery]}
            alt={project.title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/55 hover:scale-110 transition-all"
        >
          <FiChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/55 hover:scale-110 transition-all"
        >
          <FiChevronRight size={18} />
        </button>

        {/* Back button */}
        <Link
          href="/karya"
          className="absolute top-6 left-6 md:left-10 z-20 flex items-center gap-2 text-white/90 hover:text-white bg-black/30 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-x-1"
        >
          <FiArrowLeft size={15} /> Semua Karya
        </Link>

        {/* Category badge */}
        <div className="absolute top-6 right-6 md:right-10 z-20">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[project.category] ?? "bg-white/20 text-white"} backdrop-blur-sm`}>
            {project.category}
          </span>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-14 md:px-10 pb-14 md:pb-10 max-w-7xl mx-auto z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 leading-tight max-w-3xl">
              {project.title}
            </h1>
            <p className="text-white/70 text-xs md:text-lg mb-4 md:mb-5 max-w-2xl">{project.tagline}</p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80 text-[11px] md:text-sm">
              <span className="flex items-center gap-1.5"><FiCalendar size={13} /> {project.date}</span>
              <span className="flex items-center gap-1.5"><FiEye size={13} /> {project.views.toLocaleString()} views</span>
              <span className="flex items-center gap-1.5"><FiHeart size={13} /> {project.likes + (liked ? 1 : 0)} likes</span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${project.status === "Completed" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
                {project.status}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 right-6 md:right-10 z-20 hidden md:flex gap-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeGallery ? 1 : -1)}
              className={`w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 transition-all ${activeGallery === i ? "border-white scale-105" : "border-white/30 opacity-60 hover:opacity-90"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT SIDEBAR ─────────────────────────────── */}
          <aside className="lg:col-span-1 space-y-6">

            {/* Action buttons */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${liked ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500"}`}
              >
                <div className="w-6 h-6 flex items-center justify-center -ml-1 shrink-0">
                  {liked ? (
                    <DotLottieReact src="/animations/Heart Animated.lottie" autoplay loop={false} />
                  ) : (
                    <FiHeart size={16} />
                  )}
                </div>
                {project.likes + (liked ? 1 : 0)}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border border-gray-200 text-gray-500 hover:border-gray-400">
                <FiShare2 size={16} /> Share
              </button>
            </div>

            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Links</h3>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    <FiGithub size={16} /> GitHub Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    <FiExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            )}

            {/* Team */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Project Creator</h3>
              <div className="space-y-5">
                {project.team.map((member) => (
                  <div key={member.name} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100" />
                      <div>
                        <p className="font-bold text-sm text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:-translate-y-0.5 transition-all">
                          <FiGithub size={12} /> Github
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:-translate-y-0.5 hover:border-gray-400 transition-all">
                          <FiExternalLink size={12} /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Detail Proyek</h3>
              <div className="space-y-3">
                {Object.entries(project.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-start gap-4 text-sm">
                    <span className="text-gray-400 font-medium shrink-0">{key}</span>
                    <span className="font-semibold text-gray-700 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold rounded-full">
                    <FiTag size={10} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN ARTICLE ─────────────────────────────── */}
          <article className="lg:col-span-2 space-y-10">

            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-[var(--color-secondary)] block" /> Overview
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4 text-[15px]">
                {project.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.section>

            {/* Fitur / Tantangan */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-[var(--color-secondary)] block" /> Fitur Utama
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.challenges.map((ch, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">{ch.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{ch.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Process & Development */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-[var(--color-secondary)] block" /> Process & Development
              </h2>
              <div className="space-y-6">
                {project.process.map((phase, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row group hover:shadow-md transition-all duration-300">
                    <div className="md:w-64 shrink-0 h-48 md:h-auto overflow-hidden">
                      <img src={phase.image} alt={phase.phase} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        <h4 className="font-bold text-[var(--color-primary)]">{phase.phase}</h4>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Navigate to more */}
            <div className="flex items-center pt-4 border-t border-gray-200">
              <Link href="/karya" className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] font-semibold text-sm transition-colors group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Semua Proyek
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
