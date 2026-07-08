"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiZap, FiCheckCircle } from "react-icons/fi";

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
  return (
    <div className="bg-[#f8f9fc] py-16">

      {/* ============================================ */}
      {/*  HERO HEADER                                */}
      {/* ============================================ */}
      {showHeader && (
      <section className="px-5 md:px-10 max-w-7xl mx-auto mb-16 text-center">
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
      <section className="px-5 md:px-10 max-w-7xl mx-auto mb-16">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-on-background">Event Sedang Berjalan</h2>
          <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            <FiZap size={11} /> LIVE
          </span>
        </div>

        {/* Live Event Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-72 md:h-80 group cursor-pointer">
          {/* BG Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${liveEvent.imgUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm w-fit border border-white/30">
              {liveEvent.category}
            </span>

            <div className="max-w-xl">
              <h3 className="text-white text-2xl md:text-4xl font-bold mb-3 leading-tight">{liveEvent.title}</h3>
              <p className="text-white/90 text-sm md:text-base mb-5 line-clamp-2">{liveEvent.desc}</p>

              <div className="flex flex-wrap gap-4 text-white/80 text-sm mb-6">
                <span className="flex items-center gap-1.5"><FiCalendar size={14} /> {liveEvent.date}</span>
                <span className="flex items-center gap-1.5"><FiClock size={14} /> {liveEvent.time}</span>
                <span className="flex items-center gap-1.5"><FiMapPin size={14} /> {liveEvent.location}</span>
              </div>

              <div className="flex gap-3">
                <Link href="#" className="bg-secondary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-secondary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md flex items-center gap-2">
                  Masuk ke Live <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/*  SECTION 2: UPCOMING EVENTS + CALENDAR      */}
      {/* ============================================ */}
      <section id="upcoming" className="px-5 md:px-10 max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-on-background">Upcoming Events</h2>
          <Link href="/agenda" className="group flex items-center gap-1.5 text-primary hover:text-secondary font-semibold text-sm transition-colors">
            Lihat Semua <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Link key={event.id} href={`/agenda/${event.id}`}
              className="group bg-white border border-outline-variant/30 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-surface-variant relative shrink-0">
                <img src={event.imgUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {event.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="font-bold text-lg md:text-xl text-on-background group-hover:text-primary transition-colors mb-3 line-clamp-2">{event.title}</h4>
                <div className="flex flex-col gap-2 text-sm text-on-surface-variant mb-6 flex-grow">
                  <span className="flex items-center gap-2"><FiCalendar size={14} className="text-primary" /> {event.date}</span>
                  <span className="flex items-center gap-2"><FiClock size={14} className="text-primary" /> {event.time}</span>
                  <span className="flex items-center gap-2"><FiMapPin size={14} className="text-primary" /> {event.location}</span>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-outline-variant/20 mt-auto">
                  <span className="text-primary text-sm font-bold group-hover:text-secondary transition-colors flex items-center gap-1.5">
                    Detail Event <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/*  SECTION 3: VOLUNTEER OPPORTUNITIES         */}
      {/* ============================================ */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto mb-16">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-on-background mb-1">Volunteer Opportunities</h2>
          <p className="text-sm text-on-surface-variant">Kembangkan dirimu, bangun jaringan, dan tinggalkan jejak nyata di kampus. Bergabunglah sebagai relawan!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {volunteerOpportunities.map((vol) => (
            <div key={vol.id} className="group bg-white border border-outline-variant/30 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="h-40 overflow-hidden bg-surface-variant relative">
                <img src={vol.imgUrl} alt={vol.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {vol.isUrgent && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <FiClock size={10} /> SEGERA
                  </span>
                )}
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-2">{vol.category}</span>
                <h4 className="font-bold text-base text-on-background group-hover:text-primary transition-colors mb-2">{vol.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3">{vol.desc}</p>

                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4">
                  <FiClock size={12} className="text-primary" />
                  <span>Deadline: <span className="font-semibold text-on-background">{vol.deadline}</span></span>
                </div>

                <Link href="#"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2.5 rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                >
                  <FiCheckCircle size={15} /> Apply Posisi
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/*  SECTION 4: PAST EVENTS                     */}
      {/* ============================================ */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-on-background">Event yang Sudah Berakhir</h2>
          <Link href="/agenda" className="group flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-semibold text-sm transition-colors">
            Lihat Arsip <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pastEvents.map((ev) => (
            <Link key={ev.id} href="#"
              className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer shadow-sm"
            >
              <img src={ev.imgUrl} alt={ev.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">{ev.category}</span>
                <h4 className="text-white font-bold text-sm leading-tight">{ev.title}</h4>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
