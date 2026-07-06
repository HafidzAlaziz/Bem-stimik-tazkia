"use client";

import React, { useState } from "react";
import { FiUsers, FiMonitor, FiCpu } from "react-icons/fi";

const pengurusInti = [
  { name: 'Ahmad Fulan', role: 'Presiden Mahasiswa', ig: '@ahmadfulan', color: 'primary' },
  { name: 'Siti Fulanah', role: 'Wakil Presiden Mahasiswa', ig: '@sitifulanah', color: 'secondary' },
  { name: 'Budi Santoso', role: 'Sekretaris Umum', ig: '@budisnts', color: 'tertiary' },
  { name: 'Nurul Hidayah', role: 'Bendahara Umum', ig: '@nurulhdyh', color: 'primary' },
];

const divisions = [
  {
    id: 'psdm',
    name: 'Pengembangan Sumber Daya Mahasiswa (PSDM)',
    icon: 'groups',
    color: 'primary',
    description: 'Fokus pada pengembangan soft skill, hard skill, dan karakter mahasiswa STMIK Tazkia melalui berbagai pelatihan, kaderisasi, dan program pendampingan.',
    members: [
      { name: 'Rizky Pratama', role: 'Menteri PSDM', ig: '@rizky_prtma' },
      { name: 'Siti Aminah', role: 'Wakil Menteri', ig: '@sitiaminah' },
      { name: 'Fajar Hidayat', role: 'Staff Ahli Kaderisasi', ig: '@fajar_h' },
    ]
  },
  {
    id: 'medinfo',
    name: 'Media dan Informasi (Medinfo)',
    icon: 'campaign',
    color: 'secondary',
    description: 'Menjadi ujung tombak penyebaran informasi kampus. Mengelola seluruh aset digital BEM (Website, Instagram, TikTok) serta bertanggung jawab atas publikasi kreatif.',
    members: [
      { name: 'Aulia Rahman', role: 'Menteri Medinfo', ig: '@auliar_design' },
      { name: 'Bagas Koro', role: 'Staff Videografi', ig: '@bagaskoro.vid' },
    ]
  },
  {
    id: 'ristek',
    name: 'Riset dan Teknologi (Ristek)',
    icon: 'biotech',
    color: 'tertiary',
    description: 'Mewadahi inovasi teknologi mahasiswa. Mengelola riset data internal BEM dan mengadakan kompetisi programming serta workshop IT untuk meningkatkan daya saing mahasiswa.',
    members: [
      { name: 'Kevin Wijaya', role: 'Menteri Ristek', ig: '@kevin.tech' },
      { name: 'Nadia Safira', role: 'Staff Riset Data', ig: '@nadiasf' },
      { name: 'Ilham Akbar', role: 'Staff Pengembangan IT', ig: '@ilham_code' },
    ]
  }
];

export default function DivisiPage() {
  const [activeDivId, setActiveDivId] = useState<string | null>(null);

  const activeDiv = divisions.find(d => d.id === activeDivId);

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-background min-h-screen">
      {/* Hero Section */}
      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto mb-16 relative pt-12 text-center">
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-primary font-label-md mb-6 animate-init-fade-up">
          <span className="material-symbols-outlined text-[18px]">account_tree</span>
          Kabinet Pergerakan
        </div>
        
        <h1 className="font-display-lg text-4xl md:text-6xl text-on-background mb-6 animate-init-fade-up anim-delay-100 font-extrabold leading-tight">
          Struktur <span className="text-primary">Organisasi</span>
        </h1>
        
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed animate-init-fade-up anim-delay-200">
          Wajah-wajah di balik layar BEM STMIK Tazkia. Klik pada divisi untuk melihat detail kementerian dan anggotanya.
        </p>
      </section>

      {/* Struktur Organisasi Interaktif */}
      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
        <div className="relative max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Tingkat 1: Presma & Wapresma */}
          <div className="flex flex-col md:flex-row justify-center gap-8 z-10 animate-init-fade-up anim-delay-300 w-full md:w-auto">
            {pengurusInti.slice(0, 2).map((person, idx) => (
              <div key={idx} className="bg-white rounded-card overflow-hidden shadow-soft transition-all duration-500 w-full md:w-64 border border-outline-variant/20 group/card relative hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 rounded-[inherit] p-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ background: "linear-gradient(to top right, #3b82f6, #f97316)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}></div>
                <div className="aspect-square bg-surface-variant relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-${person.color}/10 transition-colors duration-500 group-hover/card:bg-${person.color}/20`}></div>
                  
                  {/* Animated Particles & Blobs */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className={`absolute w-16 h-16 rounded-full bg-${person.color}/30 blur-2xl top-0 left-0 transition-all duration-1000 translate-x-[-20px] translate-y-[-20px] group-hover/card:translate-x-4 group-hover/card:translate-y-4`}></div>
                    <div className={`absolute w-20 h-20 rounded-full bg-${person.color}/30 blur-2xl bottom-0 right-0 transition-all duration-1000 translate-x-[20px] translate-y-[20px] group-hover/card:-translate-x-4 group-hover/card:-translate-y-4`}></div>
                    <div className={`absolute w-2 h-2 rounded-full bg-${person.color}/60 top-[30%] left-[20%] transition-all duration-1000 translate-y-4 group-hover/card:-translate-y-4 group-hover/card:translate-x-2`}></div>
                    <div className={`absolute w-3 h-3 rounded-full bg-${person.color}/50 top-[20%] right-[30%] transition-all duration-1000 translate-y-6 group-hover/card:-translate-y-2 group-hover/card:-translate-x-4`}></div>
                    <div className={`absolute w-1.5 h-1.5 rounded-full bg-${person.color}/70 bottom-[30%] left-[40%] transition-all duration-1000 -translate-y-4 group-hover/card:translate-y-6 group-hover/card:-translate-x-2`}></div>
                    <div className={`absolute w-2.5 h-2.5 rounded-full bg-${person.color}/60 bottom-[20%] right-[20%] transition-all duration-1000 -translate-x-4 group-hover/card:translate-x-4 group-hover/card:-translate-y-4`}></div>
                  </div>

                  <span className="material-symbols-outlined text-6xl text-outline transition-transform duration-500 group-hover/card:scale-110">person</span>
                </div>
                <div className="p-6 text-center bg-white flex flex-col h-[160px] relative z-10">
                  <h4 className="font-headline-md text-lg text-on-background line-clamp-1 font-bold">{person.name}</h4>
                  <p className={`text-${person.color} font-label-md mt-1 mb-auto line-clamp-2`}>{person.role}</p>
                  <div className="flex gap-2 mt-4">
                    <a href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(person.name)}`} target="_blank" rel="noopener noreferrer" className="group flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300 border border-outline-variant/30 bg-surface text-on-surface-variant hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </a>
                    <a href={`https://instagram.com/${person.ig.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="group flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300 border border-outline-variant/30 bg-surface text-on-surface-variant hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#bc1888]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sistem Garis Animasi (Desktop Only) */}
          <div className="hidden md:flex flex-col items-center w-full max-w-[800px] animate-init-fade-up anim-delay-400">
            {/* Batang Vertikal Atas */}
            <div className="w-1.5 h-10 tree-line shadow-[0_0_10px_rgba(27,64,134,0.5)] rounded-full"></div>
            
            {/* Percabangan */}
            <div className="w-full flex justify-between relative">
               {/* Garis Horizontal */}
               <div className="absolute top-0 left-[128px] right-[128px] h-1.5 tree-line-horizontal shadow-[0_0_10px_rgba(27,64,134,0.5)] rounded-full"></div>
               
               {/* Cabang Kiri (Sekum) */}
               <div className="w-64 flex justify-center">
                 <div className="w-1.5 h-10 tree-line shadow-[0_0_10px_rgba(27,64,134,0.5)] rounded-full"></div>
               </div>
               
               {/* Cabang Tengah (Ke Divisi) */}
               <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1.5 h-[480px] tree-line -z-10 shadow-[0_0_10px_rgba(27,64,134,0.5)] rounded-full"></div>
               
               {/* Cabang Kanan (Bendum) */}
               <div className="w-64 flex justify-center">
                 <div className="w-1.5 h-10 tree-line shadow-[0_0_10px_rgba(27,64,134,0.5)] rounded-full"></div>
               </div>
            </div>
          </div>

          {/* Tingkat 2: Sekum & Bendum (Desktop) */}
          <div className="hidden md:flex justify-between w-full max-w-[800px] z-10 animate-init-fade-up anim-delay-500">
            {pengurusInti.slice(2, 4).map((person, idx) => (
              <div key={idx} className="bg-white rounded-card overflow-hidden shadow-soft transition-all duration-500 w-64 border border-outline-variant/20 group/card relative hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 rounded-[inherit] p-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ background: "linear-gradient(to top right, #3b82f6, #f97316)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}></div>
                <div className="aspect-square bg-surface-variant relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-${person.color}/10 transition-colors duration-500 group-hover/card:bg-${person.color}/20`}></div>
                  
                  {/* Animated Particles & Blobs */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className={`absolute w-16 h-16 rounded-full bg-${person.color}/30 blur-2xl top-0 left-0 transition-all duration-1000 translate-x-[-20px] translate-y-[-20px] group-hover/card:translate-x-4 group-hover/card:translate-y-4`}></div>
                    <div className={`absolute w-20 h-20 rounded-full bg-${person.color}/30 blur-2xl bottom-0 right-0 transition-all duration-1000 translate-x-[20px] translate-y-[20px] group-hover/card:-translate-x-4 group-hover/card:-translate-y-4`}></div>
                    <div className={`absolute w-2 h-2 rounded-full bg-${person.color}/60 top-[30%] left-[20%] transition-all duration-1000 translate-y-4 group-hover/card:-translate-y-4 group-hover/card:translate-x-2`}></div>
                    <div className={`absolute w-3 h-3 rounded-full bg-${person.color}/50 top-[20%] right-[30%] transition-all duration-1000 translate-y-6 group-hover/card:-translate-y-2 group-hover/card:-translate-x-4`}></div>
                    <div className={`absolute w-1.5 h-1.5 rounded-full bg-${person.color}/70 bottom-[30%] left-[40%] transition-all duration-1000 -translate-y-4 group-hover/card:translate-y-6 group-hover/card:-translate-x-2`}></div>
                    <div className={`absolute w-2.5 h-2.5 rounded-full bg-${person.color}/60 bottom-[20%] right-[20%] transition-all duration-1000 -translate-x-4 group-hover/card:translate-x-4 group-hover/card:-translate-y-4`}></div>
                  </div>

                  <span className="material-symbols-outlined text-6xl text-outline transition-transform duration-500 group-hover/card:scale-110">person</span>
                </div>
                <div className="p-6 text-center bg-white flex flex-col h-[160px] relative z-10">
                  <h4 className="font-headline-md text-lg text-on-background line-clamp-1 font-bold">{person.name}</h4>
                  <p className={`text-${person.color} font-label-md mt-1 mb-auto line-clamp-2`}>{person.role}</p>
                  <div className="flex gap-2 mt-4">
                    <a href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(person.name)}`} target="_blank" rel="noopener noreferrer" className="group flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300 border border-outline-variant/30 bg-surface text-on-surface-variant hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </a>
                    <a href={`https://instagram.com/${person.ig.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="group flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300 border border-outline-variant/30 bg-surface text-on-surface-variant hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#bc1888]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tingkat 2: Sekum & Bendum (Mobile) */}
          <div className="flex md:hidden flex-col gap-8 mt-8 w-full animate-init-fade-up anim-delay-500">
            {pengurusInti.slice(2, 4).map((person, idx) => (
              <div key={idx} className="bg-white rounded-card overflow-hidden shadow-soft transition-all duration-500 w-full border border-outline-variant/20 group/card relative hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute inset-0 rounded-[inherit] p-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ background: "linear-gradient(to top right, #3b82f6, #f97316)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}></div>
                <div className="aspect-square bg-surface-variant relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-${person.color}/10 transition-colors duration-500 group-hover/card:bg-${person.color}/20`}></div>
                  
                  {/* Animated Particles & Blobs */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className={`absolute w-16 h-16 rounded-full bg-${person.color}/30 blur-2xl top-0 left-0 transition-all duration-1000 translate-x-[-20px] translate-y-[-20px] group-hover/card:translate-x-4 group-hover/card:translate-y-4`}></div>
                    <div className={`absolute w-20 h-20 rounded-full bg-${person.color}/30 blur-2xl bottom-0 right-0 transition-all duration-1000 translate-x-[20px] translate-y-[20px] group-hover/card:-translate-x-4 group-hover/card:-translate-y-4`}></div>
                    <div className={`absolute w-2 h-2 rounded-full bg-${person.color}/60 top-[30%] left-[20%] transition-all duration-1000 translate-y-4 group-hover/card:-translate-y-4 group-hover/card:translate-x-2`}></div>
                    <div className={`absolute w-3 h-3 rounded-full bg-${person.color}/50 top-[20%] right-[30%] transition-all duration-1000 translate-y-6 group-hover/card:-translate-y-2 group-hover/card:-translate-x-4`}></div>
                    <div className={`absolute w-1.5 h-1.5 rounded-full bg-${person.color}/70 bottom-[30%] left-[40%] transition-all duration-1000 -translate-y-4 group-hover/card:translate-y-6 group-hover/card:-translate-x-2`}></div>
                    <div className={`absolute w-2.5 h-2.5 rounded-full bg-${person.color}/60 bottom-[20%] right-[20%] transition-all duration-1000 -translate-x-4 group-hover/card:translate-x-4 group-hover/card:-translate-y-4`}></div>
                  </div>

                  <span className="material-symbols-outlined text-6xl text-outline transition-transform duration-500 group-hover/card:scale-110">person</span>
                </div>
                <div className="p-6 text-center bg-white flex flex-col h-[160px] relative z-10">
                  <h4 className="font-headline-md text-lg text-on-background line-clamp-1 font-bold">{person.name}</h4>
                  <p className={`text-${person.color} font-label-md mt-1 mb-auto line-clamp-2`}>{person.role}</p>
                  <div className="flex gap-2 mt-4">
                    <a href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(person.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#25D366]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      WA
                    </a>
                    <a href={`https://instagram.com/${person.ig.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={`flex-1 py-2 bg-surface hover:bg-${person.color}-container text-${person.color} rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-${person.color}/20`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      IG
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ruang Kosong agar Garis Tengah bisa lewat di belakang */}
          <div className="hidden md:block h-32 w-full"></div>

          {/* Tingkat 3: Tombol Divisi Interaktif */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-init-fade-up anim-delay-600 bg-background/80 backdrop-blur-sm p-4 rounded-3xl z-10 border border-outline-variant/20 shadow-sm mt-8 md:mt-0">
            {divisions.map((div) => {
              const isActive = activeDivId === div.id;
              return (
                <button 
                  key={div.id}
                  onClick={() => setActiveDivId(isActive ? null : div.id)}
                  className={`divisi-tab relative px-6 py-4 rounded-2xl bg-surface border border-outline-variant/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group cursor-pointer ${
                    isActive 
                      ? "active shadow-md bg-primary border-primary text-white" 
                      : `hover:bg-${div.color}-container hover:border-${div.color}/50`
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? "text-white" : `text-${div.color}`}`}>{div.icon}</span>
                  <span className={`font-headline-md font-bold ${isActive ? "text-white" : "text-on-background"}`}>{div.name.split('(')[1]?.replace(')', '') || div.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Kontainer Detail Divisi */}
        <div id="division-details-container" className="animate-init-fade-up anim-delay-700 min-h-[500px] w-full">
          {activeDiv ? (
            <div id={`div-${activeDiv.id}`} className="division-content animate-fade-up">
              
              {/* Header Divisi */}
              <div className={`bg-surface border border-outline-variant/30 rounded-t-3xl p-8 md:p-12 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-96 h-96 bg-${activeDiv.color}/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4`}></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left relative z-10">
                  <div className={`w-24 h-24 shrink-0 bg-${activeDiv.color}-container text-${activeDiv.color} rounded-3xl flex items-center justify-center shadow-inner`}>
                    <span className="material-symbols-outlined text-5xl">{activeDiv.icon}</span>
                  </div>
                  <div>
                    <h2 className={`font-display-md text-3xl md:text-4xl text-on-background mb-4 font-bold`}>{activeDiv.name}</h2>
                    <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed text-lg text-slate-600 dark:text-slate-400">
                      {activeDiv.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Anggota Divisi */}
              <div className={`bg-${activeDiv.color}/5 border-x border-b border-outline-variant/30 rounded-b-3xl p-8 pt-10 md:p-12 md:pt-14`}>
                <h3 className="font-headline-lg text-2xl text-on-background mb-8 text-center md:text-left font-bold">Anggota Kementerian</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {activeDiv.members.map((member, idx) => (
                    <div key={idx} className="bg-white rounded-card overflow-hidden shadow-sm transition-all duration-500 group group/card relative hover:-translate-y-2 hover:shadow-xl border border-outline-variant/20">
                      <div className="absolute inset-0 rounded-[inherit] p-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ background: "linear-gradient(to top right, #3b82f6, #f97316)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}></div>
                      
                      <div className="aspect-square bg-surface-variant relative overflow-hidden border-b border-outline-variant/20 flex items-center justify-center">
                        <div className={`absolute inset-0 bg-${activeDiv.color}/10 transition-colors duration-500 group-hover/card:bg-${activeDiv.color}/20`}></div>
                        
                        {/* Animated Particles & Blobs */}
                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className={`absolute w-16 h-16 rounded-full bg-${activeDiv.color}/30 blur-2xl top-0 left-0 transition-all duration-1000 translate-x-[-20px] translate-y-[-20px] group-hover/card:translate-x-4 group-hover/card:translate-y-4`}></div>
                          <div className={`absolute w-20 h-20 rounded-full bg-${activeDiv.color}/30 blur-2xl bottom-0 right-0 transition-all duration-1000 translate-x-[20px] translate-y-[20px] group-hover/card:-translate-x-4 group-hover/card:-translate-y-4`}></div>
                          <div className={`absolute w-2 h-2 rounded-full bg-${activeDiv.color}/60 top-[30%] left-[20%] transition-all duration-1000 translate-y-4 group-hover/card:-translate-y-4 group-hover/card:translate-x-2`}></div>
                          <div className={`absolute w-3 h-3 rounded-full bg-${activeDiv.color}/50 top-[20%] right-[30%] transition-all duration-1000 translate-y-6 group-hover/card:-translate-y-2 group-hover/card:-translate-x-4`}></div>
                          <div className={`absolute w-1.5 h-1.5 rounded-full bg-${activeDiv.color}/70 bottom-[30%] left-[40%] transition-all duration-1000 -translate-y-4 group-hover/card:translate-y-6 group-hover/card:-translate-x-2`}></div>
                          <div className={`absolute w-2.5 h-2.5 rounded-full bg-${activeDiv.color}/60 bottom-[20%] right-[20%] transition-all duration-1000 -translate-x-4 group-hover/card:translate-x-4 group-hover/card:-translate-y-4`}></div>
                        </div>

                        <span className="material-symbols-outlined text-6xl text-outline transition-transform duration-500 group-hover/card:scale-110">person</span>
                      </div>
                      
                      <div className="p-6 text-center flex flex-col h-[160px] relative z-10">
                        <h4 className="font-headline-md text-lg text-on-background group-hover:text-primary transition-colors line-clamp-1 font-bold">{member.name}</h4>
                        <p className={`text-${activeDiv.color} font-label-md mt-1 mb-auto line-clamp-2`}>{member.role}</p>
                        
                        <div className="flex gap-2 mt-4">
                          <a href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(member.name)}`} target="_blank" rel="noopener noreferrer" className="group flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300 border border-outline-variant/30 bg-surface text-on-surface-variant hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                          </a>
                          <a href={`https://instagram.com/${member.ig.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="group flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300 border border-outline-variant/30 bg-surface text-on-surface-variant hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#bc1888]/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div id="empty-state" className="flex flex-col items-center justify-center py-20 text-center animate-fade-up w-full border border-slate-200 border-dashed dark:border-slate-800 rounded-3xl bg-white/50 dark:bg-slate-900/50">
              <div className="w-24 h-24 bg-surface-variant rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-outline">touch_app</span>
              </div>
              <h3 className="font-headline-lg text-2xl text-on-background mb-2 font-bold">Pilih Kementerian</h3>
              <p className="font-body-md text-on-surface-variant max-w-md">Silakan klik salah satu tombol kementerian di atas untuk melihat profil lengkap anggota pengurusnya.</p>
            </div>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Active state for division tabs */
        .divisi-tab.active {
          background-color: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: var(--color-on-primary) !important;
        }

        /* Animated Org Chart Lines */
        .tree-line {
          background: linear-gradient(180deg, var(--color-primary) 0%, #38bdf8 50%, var(--color-primary) 100%);
          background-size: 100% 200%;
          animation: flowVertical 2s linear infinite;
          opacity: 0.7;
        }
        .tree-line-horizontal {
          background: linear-gradient(90deg, var(--color-primary) 0%, #38bdf8 50%, var(--color-primary) 100%);
          background-size: 200% 100%;
          animation: flowHorizontal 2s linear infinite;
          opacity: 0.7;
        }
        @keyframes flowVertical {
          0% { background-position: 0% -100%; }
          100% { background-position: 0% 100%; }
        }
        @keyframes flowHorizontal {
          0% { background-position: -100% 0%; }
          100% { background-position: 100% 0%; }
        }
      `}} />
    </div>
  );
}
