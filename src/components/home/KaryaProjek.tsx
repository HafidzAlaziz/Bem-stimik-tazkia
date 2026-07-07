"use client";

import React from "react";
import Link from "next/link";
import { FiHeart, FiEye, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    badge: "TECHNOLOGY",
    title: "Autonomous Campus Rover",
    desc: "Robot pengiriman mandiri untuk logistik intra-kampus menggunakan algoritma SLAM dan navigasi berbasis AI.",
    imgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    likes: 145,
    views: "1.2k",
    date: "Jan 2024",
  },
  {
    id: 2,
    badge: "UI/UX",
    title: "Student Portal Redesign",
    desc: "Transformasi menyeluruh pengalaman digital mahasiswa, meningkatkan task completion rate hingga 67%.",
    imgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    likes: 312,
    views: "2.8k",
    date: "Sept 2023",
  },
  {
    id: 3,
    badge: "RESEARCH",
    title: "Sustainable Energy Audit",
    desc: "Analisis konsumsi energi kampus berbasis IoT & machine learning dengan potensi penghematan 28% per tahun.",
    imgUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    likes: 89,
    views: "654",
    date: "Aug 2023",
  },
];

const badgeColors: Record<string, string> = {
  TECHNOLOGY: "bg-blue-50 text-blue-600",
  "UI/UX": "bg-purple-50 text-purple-600",
  RESEARCH: "bg-green-50 text-green-600",
  PROGRAMMING: "bg-orange-50 text-orange-600",
  "COMMUNITY SERVICE": "bg-pink-50 text-pink-600",
  MULTIMEDIA: "bg-yellow-50 text-yellow-700",
  "PROJEK MAHASISWA": "bg-orange-50 text-orange-600",
};

export default function KaryaProjek() {
  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto py-20 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Karya &amp; Inovasi
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
            Inovasi dan kreativitas mahasiswa STMIK Tazkia dalam berbagai bidang.
          </p>
        </div>
        <Link
          href="/karya"
          className="group flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm hover:text-[var(--color-secondary)] transition-colors whitespace-nowrap"
        >
          Lihat Semua
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(27,64,134,0.10)] transition-all duration-400 group flex flex-col h-full hover:-translate-y-1"
          >
            {/* Image */}
            <Link href={`/karya/${item.id}`} className="block relative h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-[var(--color-primary)] text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Lihat Detail
                </span>
              </div>
            </Link>

            {/* Content */}
            <div className="p-7 flex flex-col flex-grow">
              <span className={`text-xs font-bold tracking-wider uppercase mb-3 block w-fit px-2.5 py-1 rounded-full ${badgeColors[item.badge] ?? "bg-gray-100 text-gray-600"}`}>
                {item.badge}
              </span>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[var(--color-on-surface-variant)] text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                {item.desc}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-auto mb-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                  <FiHeart size={13} />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
                  <FiEye size={13} />
                  <span>{item.views}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-gray-400 text-sm">{item.date}</span>
                <Link
                  href={`/karya/${item.id}`}
                  className="text-[var(--color-primary)] text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 hover:text-[var(--color-secondary)] transition-all duration-300"
                >
                  View Details <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
