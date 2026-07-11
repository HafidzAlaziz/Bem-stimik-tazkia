"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiInfo,
  FiCheckCircle,
  FiUsers,
  FiVideo,
  FiExternalLink
} from "react-icons/fi";

// ─── MOCK DATA ─────────────────────────────────────────────────────────
const eventDetail = {
  id: "1",
  title: "UI/UX Design Bootcamp 2024",
  category: "Workshop",
  date: "Saturday, 24 August 2024",
  time: "09:00 - 15:00 WIB",
  location: "Auditorium STMIK Tazkia",
  imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  // Status live: jika true, munculkan tombol Masuk ke Live
  isLive: true,
  liveUrl: "https://zoom.us/j/123456789",
  
  description: "Tingkatkan skill desain Anda dalam UI/UX Design Bootcamp 2024 yang diselenggarakan oleh BEM STMIK Tazkia. Bootcamp intensif ini dirancang khusus untuk mahasiswa yang ingin memulai karir di bidang desain produk digital.",
  
  curriculum: [
    {
      title: "Introduction to Figma",
      desc: "Pengenalan tools, komponen, dan auto-layout."
    },
    {
      title: "User Research",
      desc: "Memahami kebutuhan pengguna dan membuat user persona."
    },
    {
      title: "Prototyping",
      desc: "Membuat interaksi dan animasi dasar pada desain."
    }
  ],
  
  benefits: [
    {
      title: "E-Certificate",
      desc: "Sertifikat resmi penyelesaian bootcamp"
    },
    {
      title: "Portfolio Project",
      desc: "Proyek nyata untuk portofolio desain Anda"
    },
    {
      title: "Networking Group",
      desc: "Komunitas eksklusif untuk diskusi & sharing"
    }
  ],
  
  mentors: [
    {
      name: "Budi Santoso",
      role: "Senior UX Designer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Siti Aminah",
      role: "Product Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ]
};

function EventDetailPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from");

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (from === "home") {
      router.push("/");
    } else if (from === "agenda-event") {
      router.push("/agenda?tab=event");
    } else if (from === "agenda-volunteer") {
      router.push("/agenda?tab=volunteer");
    } else {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/agenda");
      }
    }
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen pt-24 pb-20 font-sans">
      
      {/* ── BACK BUTTON ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 mb-4 md:mb-6">
        <Link 
          href="/agenda" 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium text-sm"
        >
          <FiArrowLeft /> Kembali
        </Link>
      </section>

      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 mb-6 md:mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/8] min-h-[260px] sm:min-h-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-outline-variant/20 flex flex-col justify-end"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${eventDetail.imageUrl}')` }}
          ></div>
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

          {/* Hero Content */}
          <div className="relative z-10 p-4 md:p-8 text-white w-full">
            <span className="inline-block bg-[#1b4086] text-white text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider mb-2 md:mb-4 shadow-sm">
              {eventDetail.category}
            </span>
            
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-4 leading-tight">
              {eventDetail.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-x-6 gap-y-1.5 md:gap-y-3 text-xs md:text-base text-white/90 font-medium">
              <span className="flex items-center gap-2">
                <FiCalendar className="text-[var(--color-secondary)] shrink-0" size={16} /> {eventDetail.date}
              </span>
              <span className="flex items-center gap-2">
                <FiClock className="text-[var(--color-secondary)] shrink-0" size={16} /> {eventDetail.time}
              </span>
              <span className="flex items-center gap-2">
                <FiMapPin className="text-[var(--color-secondary)] shrink-0" size={16} /> {eventDetail.location}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── LIVE BUTTON (Jika event sedang Live) ───────────────────── */}
        {eventDetail.isLive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-red-400"
          >
            <div className="flex items-center gap-3 md:gap-4 text-white w-full sm:w-auto">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse shrink-0">
                <FiVideo size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">Event Sedang Berlangsung!</h3>
                <p className="text-xs md:text-sm text-red-100">Jangan sampai ketinggalan, segera bergabung ke sesi live sekarang.</p>
              </div>
            </div>
            <a 
              href={eventDetail.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-white text-red-600 font-extrabold rounded-xl shadow-md hover:bg-red-50 hover:scale-105 transition-all text-center flex items-center justify-center gap-2 text-sm"
            >
              Masuk ke Live <FiExternalLink size={16} />
            </a>
          </motion.div>
        )}
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        
        {/* LEFT COLUMN (Tentang & Mentor) */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          
          {/* Tentang Workshop */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-outline-variant/30 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-on-background mb-4 md:mb-6 flex items-center gap-2">
              <FiInfo className="text-primary" size={20} /> Tentang Workshop
            </h3>
            
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              {eventDetail.description}
            </p>
            
            <h4 className="font-bold text-sm md:text-base text-on-background mb-3 md:mb-4">Kurikulum Materi:</h4>
            <div className="flex flex-col gap-3 md:gap-4">
              {eventDetail.curriculum.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-[var(--color-secondary)] shrink-0 mr-1"></div>
                  <div>
                    <span className="font-bold text-on-background">{item.title}: </span>
                    <span className="text-on-surface-variant text-sm md:text-base">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor / Pembicara */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-outline-variant/30 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-on-background mb-4 md:mb-6 flex items-center gap-2">
              <FiUsers className="text-primary" size={20} /> Mentor / Pembicara
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {eventDetail.mentors.map((mentor, idx) => (
                <div key={idx} className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-surface-variant border-2 border-outline-variant/20 shrink-0">
                    <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-on-background text-sm md:text-base">{mentor.name}</h5>
                    <p className="text-xs md:text-sm text-on-surface-variant">{mentor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Benefit) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-outline-variant/30 shadow-sm sticky top-28">
            <h3 className="text-lg md:text-xl font-bold text-on-background mb-4 md:mb-6 flex items-center gap-2">
              <FiCheckCircle className="text-[var(--color-primary)]" size={20} /> Benefit Peserta
            </h3>
            
            <div className="flex flex-col gap-4 md:gap-6">
              {eventDetail.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-0.5 w-5 h-5 rounded-md bg-[#f2791e] text-white flex items-center justify-center shrink-0">
                    <FiCheckCircle size={12} />
                  </div>
                  <div>
                    <h5 className="font-bold text-on-background text-sm md:text-base mb-0.5 md:mb-1">{benefit.title}</h5>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default function EventDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-primary font-bold">Memuat...</div>}>
      <EventDetailPageContent />
    </Suspense>
  );
}
