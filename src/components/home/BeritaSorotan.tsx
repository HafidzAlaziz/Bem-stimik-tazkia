"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiEye, FiCalendar } from "react-icons/fi";

export default function BeritaSorotan() {
  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto py-20 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 uppercase tracking-wide">
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
        <div className="group relative rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 bg-surface min-h-[350px] md:min-h-[400px] flex flex-col justify-end transition-all duration-300 hover:shadow-xl">
          {/* Background Image with Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-102"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
          ></div>
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4086]/95 via-[#1b4086]/50 to-transparent"></div>

          {/* Featured Badge */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Sorotan
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
              <FiCalendar className="inline shrink-0 text-white" /> 16 Jun 2026
            </span>
          </div>

          {/* Featured Content */}
          <div className="relative z-10 p-6 md:p-10 text-white max-w-4xl text-left">
            <span className="text-secondary-container font-semibold text-sm uppercase tracking-widest mb-2 block">
              Pendidikan
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight group-hover:text-secondary-container transition-colors duration-300">
              The Future of AI in Campus Management: STMIK Leads the Way
            </h2>
            <p className="text-white/85 text-sm md:text-base mb-6 font-light leading-relaxed line-clamp-3">
              STMIK Tazkia menjadi pionir dalam mengintegrasikan kecerdasan buatan (Artificial Intelligence) guna mengoptimalkan sistem manajemen administrasi kampus, pelayanan akademik, dan analisis data kemahasiswaan untuk menciptakan ekosistem kampus digital yang efisien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 transition-all duration-300 px-6 py-3.5 rounded-full font-bold text-sm hover:translate-x-1"
              >
                Baca Selengkapnya <FiArrowRight />
              </Link>
              <div className="flex items-center gap-4 text-xs text-white/70">
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

