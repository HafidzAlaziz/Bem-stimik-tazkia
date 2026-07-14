"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiEye, FiCalendar } from "react-icons/fi";

export default function BeritaSorotan() {
  return (
    <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-12 md:py-20 bg-background overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 uppercase tracking-wide">
            Berita Sorotan
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
            Berita sorotan mengenai kegiatan dan pencapaian terbaru di lingkungan kampus.
          </p>
        </div>
        <Link
          href="/berita"
          className="group flex items-center gap-1.5 text-primary hover:text-secondary font-semibold text-sm transition-colors duration-300 whitespace-nowrap"
        >
          View All Activity <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured News Banner - Single consistent card */}
      <div className="w-full">
        <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 bg-surface min-h-[420px] sm:min-h-[380px] md:min-h-[420px] flex flex-col justify-end transition-all duration-300 hover:shadow-xl">
          {/* Background Image with Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-102"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
          ></div>
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4086]/95 via-[#1b4086]/70 to-[#1b4086]/30 md:to-transparent"></div>

          {/* Featured Content */}
          <div className="relative z-10 p-5 sm:p-6 md:p-10 text-white w-full md:max-w-4xl text-left">
            {/* Featured Badge */}
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Sorotan
              </span>
              <span className="bg-surface/20 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                <FiCalendar className="inline shrink-0 text-white" /> 16 Jun 2026
              </span>
            </div>

            <span className="text-secondary-container font-semibold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mb-2 block">
              Pendidikan
            </span>
            <h2 className="text-lg sm:text-xl md:text-4xl font-extrabold mb-3 md:mb-4 leading-tight group-hover:text-secondary-container transition-colors duration-300">
              The Future of AI in Campus Management: STMIK Leads the Way
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4 md:mb-6 font-light leading-relaxed line-clamp-3 md:line-clamp-3">
              STMIK Tazkia menjadi pionir dalam mengintegrasikan kecerdasan buatan (Artificial Intelligence) guna mengoptimalkan sistem manajemen administrasi kampus, pelayanan akademik, dan analisis data kemahasiswaan untuk menciptakan ekosistem kampus digital yang efisien.
            </p>
            <div className="flex flex-row gap-3 items-center justify-between flex-wrap">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 transition-all duration-300 px-4 sm:px-6 py-2 md:py-3 rounded-full font-bold text-xs sm:text-sm shadow-md hover:translate-x-1 shrink-0"
              >
                Baca Selengkapnya <FiArrowRight />
              </Link>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1"><FiHeart /> 350 Suka</span>
                <span className="flex items-center gap-1"><FiEye /> 1240 Dilihat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

