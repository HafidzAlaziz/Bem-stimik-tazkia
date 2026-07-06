"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-container-padding-mobile md:px-container-padding-desktop overflow-hidden pt-20 pb-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transform origin-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLvQK-gFUvsVMv4zAELeWrDKR840YLNF3tr6ewofVKHTeGNN5fyvmLli_qSyPTH3Xo5kOjqHZrJnoMaRYUaQw25GKH6rpHsbJeODR5ncHCS0glKSa90cC6TklAFYdDTiX7La3ZK6TMqK0oxpW4_cSyXUdg8gXtChQgzeqUomh6bE4P1BHfqHpa_xWAB5ZMIr7d5xOoJ6hR9HsGv5utydZFe6ZJHwT5ziKcWiFPtlE1ZoVmmpW3mW_iT_ztM')" }}
        ></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-tertiary/20 rounded-full blur-3xl z-10 animate-pulse delay-1000"></div>
      
      <div className="relative z-30 max-w-5xl mx-auto text-center mt-32">
        <h1 className="font-display-lg text-display-lg md:text-[72px] md:leading-[1.1] mb-stack-gap-lg text-on-primary drop-shadow-lg animate-init-fade-up hover:scale-[1.02] transition-transform duration-500 cursor-default">
          Satu Langkah untuk <br />
          <span className="text-secondary drop-shadow-glow hover:text-[#ff984d] transition-colors duration-300">STMIK Tazkia Berdampak</span>
        </h1>
        <p className="font-body-lg text-body-lg md:text-[20px] mb-10 text-on-primary/90 max-w-2xl mx-auto font-light animate-init-fade-up anim-delay-100 hover:text-white transition-colors duration-300 cursor-default">
          Membangun sinergi intelektual dan pergerakan mahasiswa yang progresif, inklusif, dan berbasis data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-init-fade-up anim-delay-200">
          <Link href="/agenda" className="group relative overflow-hidden bg-secondary text-white px-8 py-4 rounded-button font-label-md transition-all duration-300 shadow-glow hover:shadow-[0_0_40px_rgba(242,121,30,0.6)] hover:-translate-y-1.5 hover:scale-105 inline-flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer z-10">
            <span className="relative z-10 flex items-center gap-2">
              Lihat Agenda
              <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </Link>
          <Link href="/tentang" className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-button font-label-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:scale-105 hover:border-primary w-full sm:w-auto justify-center cursor-pointer z-10 flex items-center">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Pelajari Lebih Lanjut</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
