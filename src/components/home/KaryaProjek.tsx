"use client";

import React from "react";
import Link from "next/link";
import { FiHeart, FiEye } from "react-icons/fi";

const projects = [
  {
    id: 1,
    badge: "PROJEK MAHASISWA",
    title: "The Campus Chronicle",
    desc: "Edisi terbaru majalah kampus yang membahas kebebasan pers dan dinamika akademik mahasiswa.",
    linkText: "DETAIL PROJEK",
    imgUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
    likes: 124,
    views: "1.2k"
  },
  {
    id: 2,
    badge: "PROJEK MAHASISWA",
    title: "Global Cultural Fest",
    desc: "Dokumentasi perayaan keberagaman budaya melalui seni pertunjukan dan pameran interaktif.",
    linkText: "DETAIL PROJEK",
    imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
    likes: 89,
    views: 856
  },
  {
    id: 3,
    badge: "PROJEK MAHASISWA",
    title: "Sports Championship",
    desc: "Sistem manajemen turnamen olahraga antar fakultas berbasis web dengan fitur live score terintegrasi.",
    linkText: "DETAIL PROJEK",
    imgUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
    likes: 215,
    views: "2.4k"
  },
  {
    id: 4,
    badge: "PROJEK MAHASISWA",
    title: "Scholarship Tracker",
    desc: "Platform pencarian beasiswa terintegrasi untuk mahasiswa dengan sistem notifikasi otomatis.",
    linkText: "DETAIL PROJEK",
    imgUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
    likes: 342,
    views: "5.1k"
  }
];

export default function KaryaProjek() {
  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto py-20 bg-background">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 uppercase tracking-wide">
          Karya & Projek Mahasiswa
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
          Inovasi dan kreativitas mahasiswa STMIK Tazkia dalam berbagai bidang.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((item) => (
          <div key={item.id} className="group flex flex-col h-full cursor-pointer">
            {/* Image Container */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-surface-variant shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
              <img 
                src={item.imgUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  {item.badge}
                </span>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1 hover:text-primary transition-colors"><FiHeart size={12} /> {item.likes}</span>
                  <span className="flex items-center gap-1 hover:text-primary transition-colors"><FiEye size={12} /> {item.views}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-on-surface-variant text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                {item.desc}
              </p>
              
              <Link 
                href={item.linkUrl} 
                className="text-[11px] font-bold text-secondary uppercase tracking-widest hover:text-primary transition-colors duration-300 w-fit flex items-center gap-1"
              >
                {item.linkText} <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
