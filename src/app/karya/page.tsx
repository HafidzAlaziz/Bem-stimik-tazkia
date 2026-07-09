"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiArrowRight, FiHeart, FiEye, FiX, FiPlus, FiTrash2, FiUpload, FiSend, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
      }}
      className="flex items-center gap-1.5 group/stat cursor-pointer hover:text-red-500 transition-colors"
    >
      <div className="w-5 h-5 flex items-center justify-center -ml-1 shrink-0">
        {liked ? (
          <DotLottieReact src="/animations/Heart Animated.lottie" autoplay loop={false} />
        ) : (
          <FiHeart className="text-gray-400 group-hover/stat:text-red-500 transition-colors" />
        )}
      </div>
      <span className={liked ? "text-red-500 font-bold" : "text-gray-500"}>
        {initialLikes + (liked ? 1 : 0)}
      </span>
    </div>
  );
}

const categories = [
  "All Projects",
  "Technology",
  "Community service",
  "Research",
  "UI/UX",
  "Programming",
];

const mockProjects = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title: "Autonomous Campus Rover",
    description: "A self-navigating delivery robot designed for intra-campus logistics and medicine transport.",
    date: "Jan 2024",
    image: "https://picsum.photos/seed/rover/600/400",
    likes: 145,
    views: 1205,
  },
  {
    id: 2,
    category: "UI/UX",
    title: "Student Portal Redesign",
    description: "User-centric overhaul of the digital student experience, improving accessibility and navigation.",
    date: "Sept 2023",
    image: "https://picsum.photos/seed/portal/600/400",
    likes: 312,
    views: 2840,
  },
  {
    id: 3,
    category: "RESEARCH",
    title: "Sustainable Energy Audit",
    description: "Comprehensive analysis of campus energy consumption patterns with optimization proposals.",
    date: "Aug 2023",
    image: "https://picsum.photos/seed/energy/600/400",
    likes: 89,
    views: 654,
  },
  {
    id: 4,
    category: "PROGRAMMING",
    title: "Block-Chain Voting System",
    description: "A secure, transparent e-voting platform for student organization elections using Web3 tech.",
    date: "July 2023",
    image: "https://picsum.photos/seed/blockchain/600/400",
    likes: 275,
    views: 1930,
  },
  {
    id: 5,
    category: "COMMUNITY SERVICE",
    title: "Digital Literacy Workshop",
    description: "Empowering local SMEs with essential digital marketing and cybersecurity skills.",
    date: "June 2023",
    image: "https://picsum.photos/seed/workshop/600/400",
    likes: 198,
    views: 1420,
  },
  {
    id: 6,
    category: "MULTIMEDIA",
    title: "Virtual Campus Tour 360",
    description: "An immersive VR experience allowing prospective students to explore campus facilities remotely.",
    date: "May 2023",
    image: "https://picsum.photos/seed/vrtour/600/400",
    likes: 420,
    views: 3100,
  },
];

const KATEGORI_OPTIONS = ["Technology", "UI/UX", "Research", "Programming", "Community Service", "Multimedia"];
const STATUS_OPTIONS = ["Completed", "In Progress", "Published", "Prototype"];

export default function KaryaInovasiPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    tagline: "",
    kategori: "",
    deskripsi: "",
    techStack: "",
    status: "",
    githubUrl: "",
    liveUrl: "",
    fiturUtama: [
      { title: "", desc: "" },
      { title: "", desc: "" },
      { title: "", desc: "" },
    ],
    timAnggota: [
      { name: "", role: "", github: "", linkedin: "" },
    ],
    catatanTambahan: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFitur = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...formData.fiturUtama];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, fiturUtama: updated }));
  };

  const handleTim = (index: number, field: "name" | "role" | "github" | "linkedin", value: string) => {
    const updated = [...formData.timAnggota];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, timAnggota: updated }));
  };

  const addAnggota = () => {
    setFormData(prev => ({ ...prev, timAnggota: [...prev.timAnggota, { name: "", role: "", github: "", linkedin: "" }] }));
  };

  const removeAnggota = (index: number) => {
    setFormData(prev => ({ ...prev, timAnggota: prev.timAnggota.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitSuccess(false);
      setFormData({
        judul: "", tagline: "", kategori: "", deskripsi: "",
        techStack: "", status: "", githubUrl: "", liveUrl: "",
        fiturUtama: [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }],
        timAnggota: [{ name: "", role: "", github: "", linkedin: "" }],
        catatanTambahan: "",
      });
    }, 2500);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] transition-all";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  // Filter projects based on category and search
  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "All Projects" ||
      project.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <>
      <main className="min-h-screen bg-[var(--color-background)] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
              Karya & Inovasi
            </h1>
            <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl leading-relaxed">
              Discover a collection of student-led initiatives, technological breakthroughs, and innovative research driving our campus community forward.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">

            {/* Categories */}
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === category
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "bg-white text-[var(--color-on-surface-variant)] border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {paginatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(27,64,134,0.08)] transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[var(--color-secondary)] text-xs font-bold tracking-wider uppercase mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-[var(--color-on-surface-variant)] text-sm mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-auto mb-4 text-gray-500 text-sm">
                      <LikeButton initialLikes={project.likes} />
                      <div className="flex items-center gap-1.5 group/stat cursor-pointer hover:text-blue-500 transition-colors">
                        <FiEye className="text-gray-400 group-hover/stat:text-blue-500 transition-colors" />
                        <span>{project.views}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-gray-400 text-sm">{project.date}</span>
                      <Link
                        href={`/karya/${project.id}`}
                        className="text-[var(--color-primary)] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        View Details <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-500">No projects found matching your criteria.</h3>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-500 hover:text-[var(--color-primary)] disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
              >
                Previous
              </button>
              {getPageNumbers().map((page, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-gray-500 hover:text-[var(--color-primary)] disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* ── CTA BANNER ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 relative overflow-hidden rounded-3xl bg-[var(--color-primary)] px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center gap-8"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Lottie Animation */}
            <div className="shrink-0 w-28 h-28">
              <DotLottieReact
                src="/animations/Marketing Campaign - Creative 3D Animation.lottie"
                autoplay
                loop
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left relative z-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/60 mb-2">Showcase Karyamu</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Ingin Mengajukan Karya?<br />
                <span className="text-white/70 font-normal text-lg md:text-xl">Tampilkan inovasi terbaikmu ke seluruh mahasiswa STMIK Tazkia.</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl">
                Daftarkan proyekmu mulai dari aplikasi, riset, desain, hingga karya multimedia dan jadilah inspirasi bagi ribuan mahasiswa lainnya.
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 relative z-10">
              <button
                id="btn-ajukan-karya"
                onClick={() => setShowModal(true)}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-[var(--color-primary)] font-extrabold rounded-2xl hover:bg-white/90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm whitespace-nowrap"
              >
                <FiUpload className="group-hover:-translate-y-0.5 transition-transform" size={18} />
                Ajukan Karya Sekarang
              </button>
            </div>
          </motion.div>

        </div>
      </main>

      {/* ── SUBMISSION MODAL ───────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-8 pb-8 overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--color-primary)]">Formulir Pengajuan Karya</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Lengkapi semua informasi proyek kamu dengan detail</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Success State */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center gap-4 text-center p-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <FiCheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-800">Karya Berhasil Diajukan!</h3>
                    <p className="text-gray-500 max-w-sm text-sm">Terima kasih! Tim BEM STMIK Tazkia akan me-review dan menghubungi kamu segera.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 py-7 space-y-7">

                {/* ─ Informasi Utama ─ */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Informasi Utama
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass} htmlFor="judul">Judul Karya <span className="text-red-400">*</span></label>
                      <input id="judul" name="judul" type="text" required value={formData.judul} onChange={handleInput} placeholder="Contoh: Smart Campus Navigation System" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="tagline">Tagline / Slogan <span className="text-red-400">*</span></label>
                      <input id="tagline" name="tagline" type="text" required value={formData.tagline} onChange={handleInput} placeholder="Deskripsi singkat satu kalimat tentang proyekmu" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="kategori">Kategori <span className="text-red-400">*</span></label>
                        <select id="kategori" name="kategori" required value={formData.kategori} onChange={handleInput} className={inputClass}>
                          <option value="">Pilih kategori...</option>
                          {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="status">Status Proyek <span className="text-red-400">*</span></label>
                        <select id="status" name="status" required value={formData.status} onChange={handleInput} className={inputClass}>
                          <option value="">Pilih status...</option>
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="deskripsi">Deskripsi / Abstrak <span className="text-red-400">*</span></label>
                      <textarea id="deskripsi" name="deskripsi" required rows={4} value={formData.deskripsi} onChange={handleInput} placeholder="Jelaskan latar belakang, tujuan, dan hasil dari proyekmu secara singkat..." className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                </div>

                {/* ─ Tech & Links ─ */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Tech Stack & Tautan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass} htmlFor="techStack">Tech Stack <span className="text-red-400">*</span></label>
                      <input id="techStack" name="techStack" type="text" required value={formData.techStack} onChange={handleInput} placeholder="Contoh: React, Next.js, Python, Figma (pisahkan dengan koma)" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="githubUrl">GitHub Repository</label>
                        <input id="githubUrl" name="githubUrl" type="url" value={formData.githubUrl} onChange={handleInput} placeholder="https://github.com/..." className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="liveUrl">Live Demo / Link Karya</label>
                        <input id="liveUrl" name="liveUrl" type="url" value={formData.liveUrl} onChange={handleInput} placeholder="https://..." className={inputClass} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─ Fitur Utama ─ */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Fitur Utama
                  </h3>
                  <div className="space-y-3">
                    {formData.fiturUtama.map((fitur, i) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Fitur {i + 1}</p>
                        <input
                          type="text"
                          value={fitur.title}
                          onChange={(e) => handleFitur(i, "title", e.target.value)}
                          placeholder={`Nama fitur ${i + 1}...`}
                          className={inputClass}
                        />
                        <textarea
                          rows={2}
                          value={fitur.desc}
                          onChange={(e) => handleFitur(i, "desc", e.target.value)}
                          placeholder="Deskripsi singkat fitur ini..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─ Anggota Tim ─ */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Anggota Tim
                    </h3>
                    {formData.timAnggota.length < 5 && (
                      <button type="button" onClick={addAnggota} className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                        <FiPlus size={14} /> Tambah Anggota
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {formData.timAnggota.map((anggota, i) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{i === 0 ? "Project Lead" : `Anggota ${i + 1}`}</p>
                          {i > 0 && (
                            <button type="button" onClick={() => removeAnggota(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                              <FiTrash2 size={14} />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value={anggota.name} onChange={e => handleTim(i, "name", e.target.value)} placeholder="Nama Lengkap" className={inputClass} />
                          <input type="text" value={anggota.role} onChange={e => handleTim(i, "role", e.target.value)} placeholder="Peran / Jabatan" className={inputClass} />
                          <input type="url" value={anggota.github} onChange={e => handleTim(i, "github", e.target.value)} placeholder="GitHub URL (opsional)" className={inputClass} />
                          <input type="url" value={anggota.linkedin} onChange={e => handleTim(i, "linkedin", e.target.value)} placeholder="LinkedIn URL (opsional)" className={inputClass} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─ Catatan Tambahan ─ */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Catatan Tambahan
                  </h3>
                  <textarea id="catatanTambahan" name="catatanTambahan" rows={3} value={formData.catatanTambahan} onChange={handleInput} placeholder="Informasi lain yang ingin kamu sampaikan ke tim BEM (opsional)..." className={`${inputClass} resize-none`} />
                </div>

                {/* Submit */}
                <div className="pt-2 pb-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-[var(--color-primary)] text-white font-extrabold rounded-2xl hover:bg-[var(--color-primary)]/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
                  >
                    <FiSend size={16} /> Kirim Pengajuan Karya
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">Dengan mengirimkan formulir ini, kamu setuju karya akan ditampilkan di halaman Karya & Inovasi BEM STMIK Tazkia.</p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
