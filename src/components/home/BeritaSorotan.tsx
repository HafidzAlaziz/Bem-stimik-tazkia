"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiChevronRight, FiHeart, FiEye } from "react-icons/fi";

export default function BeritaSorotan() {
  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto py-20 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 uppercase tracking-wide">
            Berita & Sorotan
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
            Informasi terkini mengenai kegiatan dan pencapaian terbaru di lingkungan kampus.
          </p>
        </div>
        <Link 
          href="/berita" 
          className="group flex items-center gap-1.5 text-primary hover:text-secondary font-semibold text-sm transition-colors duration-300 whitespace-nowrap"
        >
          View All Activity <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Large Featured Card */}
        <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-md cursor-pointer h-[400px] md:h-[500px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
          ></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4086]/90 via-[#1b4086]/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col items-start text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-md shadow-sm uppercase tracking-wider">
                Berita Utama
              </span>
              <div className="flex items-center gap-3 text-xs text-white/90 font-medium">
                <span className="flex items-center gap-1"><FiHeart size={14} /> 542</span>
                <span className="flex items-center gap-1"><FiEye size={14} /> 2.1k</span>
              </div>
            </div>
            
            <h3 className="text-2xl md:text-4xl font-bold mb-3 leading-tight text-white group-hover:text-secondary transition-colors duration-300">
              Inovasi Kampus Hijau: Menuju Masa Depan Berkelanjutan
            </h3>
            <p className="text-white/90 text-sm md:text-base mb-6 max-w-3xl line-clamp-2 md:line-clamp-none">
              STMIK Tazkia meluncurkan inisiatif kampus ramah lingkungan dengan integrasi panel surya dan sistem pengelolaan limbah mandiri.
            </p>
            <Link 
              href="#" 
              className="flex items-center gap-2 text-sm font-bold tracking-wider hover:text-secondary transition-colors"
            >
              BACA SELENGKAPNYA <FiArrowRight className="text-lg" />
            </Link>
          </div>
        </div>

        {/* Right Side: 2 Small Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Top Small Card (Berita Terbaru 1) */}
          <div className="bg-surface-variant/30 hover:bg-surface-variant/60 border border-outline-variant/30 rounded-3xl p-8 flex flex-col h-full justify-between transition-colors duration-300 group cursor-pointer shadow-sm hover:shadow-md">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
                  Berita Terbaru
                </span>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1"><FiHeart size={12} /> 128</span>
                  <span className="flex items-center gap-1"><FiEye size={12} /> 850</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">
                Prestasi Mahasiswa: Juara 1 Lomba Web Design Nasional
              </h4>
              <p className="text-sm text-on-surface-variant line-clamp-3 mb-6">
                Tim mahasiswa STMIK Tazkia berhasil meraih juara pertama dalam kompetisi desain antarmuka bergengsi tingkat nasional yang diselenggarakan di Jakarta.
              </p>
            </div>
            <Link href="#" className="flex items-center gap-1.5 text-primary font-bold text-sm hover:text-secondary transition-colors w-fit">
              BACA ARTIKEL <FiChevronRight />
            </Link>
          </div>

          {/* Bottom Small Card (Berita Terbaru 2) */}
          <div className="bg-surface-variant/30 hover:bg-surface-variant/60 border border-outline-variant/30 rounded-3xl p-8 flex flex-col h-full justify-between transition-colors duration-300 group cursor-pointer shadow-sm hover:shadow-md">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
                  Berita Terbaru
                </span>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1"><FiHeart size={12} /> 94</span>
                  <span className="flex items-center gap-1"><FiEye size={12} /> 620</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">
                Advocacy Success: New 24/7 Library Access Policy
              </h4>
              <p className="text-sm text-on-surface-variant line-clamp-3 mb-6">
                Setelah beberapa bulan negosiasi, administrasi kampus menyetujui perpanjangan jam operasional perpustakaan untuk mendukung riset dan masa ujian.
              </p>
            </div>
            <Link href="#" className="flex items-center gap-1.5 text-primary font-bold text-sm hover:text-secondary transition-colors w-fit">
              BACA ARTIKEL <FiChevronRight />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
