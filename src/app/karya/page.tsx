"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiArrowRight, FiHeart, FiEye, FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { createClient } from "@/utils/supabase/client";

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
          <FiHeart className="text-on-surface-variant/70 group-hover/stat:text-red-500 transition-colors" />
        )}
      </div>
      <span className={liked ? "text-red-500 font-bold" : "text-on-surface-variant"}>
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

export default function KaryaInovasiPage() {
  const supabase = createClient();
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('karya')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [supabase]);

  // Filter projects based on category and search
  const filteredProjects = projects.filter((project) => {
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
      <main className="min-h-screen bg-[var(--color-background)] pt-28 pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">
              Karya & Inovasi
            </h1>
            <p className="text-[var(--color-on-surface-variant)] text-sm md:text-lg max-w-2xl leading-relaxed">
              Discover a collection of student-led initiatives, technological breakthroughs, and innovative research driving our campus community forward.
            </p>
          </div>

          {/* ── CTA BANNER ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14 relative overflow-hidden rounded-3xl bg-[var(--color-primary)] px-6 py-8 md:px-16 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-lg"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-surface/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-surface/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Lottie Animation */}
            <div className="shrink-0 w-20 h-20 md:w-28 md:h-28">
              <DotLottieReact
                src="/animations/Marketing Campaign - Creative 3D Animation.lottie"
                autoplay
                loop
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left relative z-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/60 mb-1.5">Showcase Karyamu</span>
              <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                Ingin Mengajukan Karya?<br />
                <span className="text-white/70 font-normal text-sm md:text-lg">Tampilkan inovasi terbaikmu ke seluruh mahasiswa STMIK Tazkia.</span>
              </h2>
              <p className="text-white/60 text-xs md:text-sm max-w-xl">
                Daftarkan proyekmu mulai dari aplikasi, riset, desain, hingga karya multimedia dan jadilah inspirasi bagi ribuan mahasiswa lainnya.
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 relative z-10 w-full md:w-auto">
              <Link
                href="/dashboard/upload"
                className="group flex items-center justify-center gap-3 w-full md:w-auto px-8 py-3.5 bg-surface text-[var(--color-primary)] font-extrabold rounded-2xl hover:bg-surface/90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm whitespace-nowrap"
              >
                <FiUpload className="group-hover:-translate-y-0.5 transition-transform" size={18} />
                Ajukan Karya Sekarang
              </Link>
            </div>
          </motion.div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12">

            {/* Categories */}
            <div className="flex flex-row gap-2 overflow-x-auto pb-3 md:pb-0 w-full md:w-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === category
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "bg-surface text-[var(--color-on-surface-variant)] border border-outline-variant/30 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-on-surface-variant/70" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-surface border border-outline-variant/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-on-surface-variant mt-4 font-medium">Memuat karya...</p>
            </div>
          ) : paginatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={project.id}
                  className="bg-surface rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/20 hover:shadow-[0_8px_30px_rgba(27,64,134,0.08)] transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-surface-variant/30">
                    <Image
                      src={project.image_url || "https://picsum.photos/seed/placeholder/600/400"}
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
                    <div className="flex items-center gap-4 mt-auto mb-4 text-on-surface-variant text-sm">
                      <LikeButton initialLikes={project.likes} />
                      <div className="flex items-center gap-1.5 group/stat cursor-pointer hover:text-blue-500 transition-colors">
                        <FiEye className="text-on-surface-variant/70 group-hover/stat:text-blue-500 transition-colors" />
                        <span>{project.views}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
                      <span className="text-on-surface-variant/70 text-sm">{new Date(project.created_at).toLocaleDateString('id-ID')}</span>
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
              <h3 className="text-xl font-medium text-on-surface-variant">Belum ada karya yang ditemukan.</h3>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-on-surface-variant hover:text-[var(--color-primary)] disabled:opacity-50 disabled:hover:text-on-surface-variant transition-colors"
              >
                Previous
              </button>
              {getPageNumbers().map((page, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "bg-surface text-on-surface-variant border border-outline-variant/30 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-on-surface-variant hover:text-[var(--color-primary)] disabled:opacity-50 disabled:hover:text-on-surface-variant transition-colors"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
