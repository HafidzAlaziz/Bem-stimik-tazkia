"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiMapPin, FiMail, FiBell } from "react-icons/fi";

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="w-full pt-20 pb-8 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

      <div className="px-5 md:px-10 max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Karya & Inovasi Showcase Banner */}
        <div className="w-full bg-surface/10 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex-1 relative z-10">
            <h3 className="text-xl md:text-3xl text-white font-bold mb-2">Punya Karya, atau Inovasi Keren?</h3>
            <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
              Tunjukkan karya terbaikmu kepada seluruh civitas akademika STMIK Tazkia. Masuk dengan akun email kampus dan unggah karyamu!
            </p>
          </div>

          <div className="relative w-full md:w-auto shrink-0 z-10">
            <Link
              href="/dashboard/upload"
              className="group bg-secondary text-white font-bold py-3.5 px-6 md:px-8 rounded-2xl text-sm md:text-base hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(242,121,30,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap shadow-soft"
            >
              <span>Unggah Karya</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-surface p-2 rounded-xl mb-6 shadow-sm inline-block w-fit">
              <Image
                src="/images/logo.png"
                alt="Logo BEM"
                width={80}
                height={48}
                className="h-12 w-auto object-contain bg-surface rounded-lg p-1.5 shadow-sm"
              />
            </div>
            <div className="flex flex-row items-center gap-1.5">
              <span className="font-bold leading-none text-xl text-white">BEM STMIK</span>
              <span className="font-bold leading-none text-xl text-secondary">Tazkia</span>
            </div>
            <p className="text-white/80 max-w-sm leading-relaxed">
              Badan Eksekutif Mahasiswa STMIK Tazkia Bogor. Satu langkah untuk STMIK Tazkia berdampak.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <h4 className="text-lg text-white font-bold tracking-wide">Layanan BEM</h4>
            <div className="flex flex-col gap-4 text-white/80">
              <a className="flex items-start gap-3 hover:text-white hover:-translate-y-0.5 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300" href="#">
                <FiMapPin className="text-xl shrink-0 mt-0.5" />
                <span>Jl. Ir. H. Juanda No. 78,<br />Bogor, Jawa Barat 16122</span>
              </a>
              <a className="flex items-center gap-3 hover:text-white hover:-translate-y-0.5 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300" href="mailto:bem@tazkia.ac.id">
                <FiMail className="text-xl shrink-0" />
                bem@tazkia.ac.id
              </a>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-lg text-white font-bold tracking-wide">Sosial Media</h4>
            <div className="flex gap-4 text-white/80 mt-2">
              <a className="hover:text-[#E1306C] hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(225,48,108,0.6)] transition-all duration-300" href="#" aria-label="Instagram"><FiInstagram size={26} /></a>
              <a className="hover:text-[#1DA1F2] hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(29,161,242,0.6)] transition-all duration-300" href="#" aria-label="Twitter"><FiTwitter size={24} /></a>
              <a className="hover:text-[#0077b5] hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,119,181,0.6)] transition-all duration-300" href="#" aria-label="LinkedIn"><FiLinkedin size={26} /></a>
              <a className="hover:text-[#FF0000] hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-all duration-300" href="#" aria-label="YouTube"><FiYoutube size={26} /></a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-12 border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} BEM STMIK Tazkia. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
