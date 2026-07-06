"use client";

import React, { useState } from "react";
import Link from "next/link";
import { agendas, categories } from "@/data/agendas";

export default function AgendaPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredAgendas = agendas.filter(
    (item) => activeCategory === "Semua" || item.category === activeCategory
  );

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-background min-h-screen">
      {/* Hero Section */}
      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto mb-12 relative pt-12 text-center">
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-secondary font-label-md mb-6 animate-init-fade-up">
          <span className="material-symbols-outlined text-[18px]">event</span>
          Program Kerja
        </div>
        
        <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-background mb-6 animate-init-fade-up anim-delay-100 font-extrabold leading-tight">
          Agenda <span className="text-secondary">Kegiatan</span>
        </h1>
        
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed animate-init-fade-up anim-delay-200">
          Jadwal program kerja dan kegiatan interaktif BEM STMIK Tazkia. Mari ikut serta dan berikan dampak positif!
        </p>
      </section>

      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
        
        {/* Filter Kategori */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-init-fade-up anim-delay-300">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-filter px-6 py-2 rounded-full font-label-md transition-all duration-300 border cursor-pointer ${
                  isActive 
                    ? 'bg-secondary text-white border-transparent shadow-md' 
                    : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant hover:text-on-background'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid Cards Container */}
        <div className="relative w-full mx-auto">
          
          {filteredAgendas.length > 0 ? (
            <div id="agenda-list" className="agenda-list-layout">
              {filteredAgendas.map((agenda) => {
                const posterImg = `https://picsum.photos/seed/${agenda.id}/400/500`;
                return (
                  <Link 
                    key={agenda.id} 
                    href={`/agenda/${agenda.id}`} 
                    className="agenda-item agenda-card group animate-on-scroll animate-fade-up is-visible"
                  >
                    {/* Gambar Kiri */}
                    <div className="agenda-card-image">
                      <img src={posterImg} alt={agenda.title} />
                      
                      <div className="agenda-badge-status">
                        <span className={agenda.status === 'Akan Datang' ? 'status-upcoming' : 'status-planning'}>
                          {agenda.status}
                        </span>
                      </div>
                    </div>

                    {/* Informasi Kanan */}
                    <div className="agenda-card-content relative z-10">
                      <div className="agenda-card-header">
                        <span className={`category-badge bg-${agenda.color}-container text-${agenda.color}`}>
                          {agenda.category}
                        </span>
                        <div className="date-badge bg-surface text-on-surface-variant border border-outline-variant/20">
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                          <span>{agenda.date}</span>
                        </div>
                      </div>

                      <h3 className="agenda-card-title text-on-background group-hover:text-primary transition-colors duration-300 font-bold">
                        {agenda.title}
                      </h3>

                      <p className="agenda-card-desc text-on-surface-variant">
                        {agenda.description}
                      </p>

                      <div className="agenda-card-footer border-t border-outline-variant/20">
                        <div className="location-info text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px] text-error">location_on</span>
                          <span>{agenda.location}</span>
                        </div>
                        
                        <div className="detail-link text-primary group-hover:translate-x-2 transition-transform duration-300">
                          Lihat Detail
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div id="agenda-empty" className="flex flex-col items-center justify-center py-20 text-center animate-fade-in w-full bg-surface border border-outline-variant/30 rounded-3xl">
              <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-4xl text-outline">event_busy</span>
              </div>
              <h3 className="font-headline-sm text-xl text-on-background mb-2 font-bold">Agenda Belum Tersedia</h3>
              <p className="font-body-md text-on-surface-variant max-w-sm mx-auto">Belum ada agenda untuk kategori ini. Silakan pilih kategori lain.</p>
            </div>
          )}

        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .agenda-list-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .agenda-card {
          display: flex;
          flex-direction: column;
          background-color: white;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(197, 198, 208, 0.3);
          box-shadow: 0 10px 30px -10px rgba(27, 64, 134, 0.1);
          transition: all 0.3s ease;
          width: 100%;
          position: relative;
          text-decoration: none;
        }

        .agenda-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(27, 64, 134, 0.2);
          border-color: rgba(27, 64, 134, 0.3);
        }

        .agenda-card-image {
          position: relative;
          width: 100%;
          height: 240px;
          flex-shrink: 0;
          overflow: hidden;
          background-color: var(--color-surface-variant);
        }

        .agenda-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .agenda-card:hover .agenda-card-image img {
          transform: scale(1.05);
        }

        .agenda-badge-status {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 10;
        }

        .agenda-badge-status span {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          backdrop-filter: blur(8px);
        }

        .status-upcoming {
          background-color: rgba(37, 211, 102, 0.9);
          color: white;
        }

        .status-planning {
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--color-on-surface-variant);
        }

        .agenda-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          z-index: 10;
        }

        .agenda-card-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .category-badge {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .agenda-card-title {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .agenda-card-desc {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .agenda-card-footer {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 24px;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .detail-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
        }

        /* Desktop layout */
        @media (min-width: 768px) {
          .agenda-card {
            flex-direction: row;
            align-items: stretch;
            min-height: 260px;
          }
          .agenda-card-image {
            width: 320px;
            height: auto;
            min-height: 100%;
          }
          .agenda-card-content {
            padding: 32px;
          }
          .agenda-card-title {
            font-size: 28px;
          }
        }
      `}} />
    </div>
  );
}
