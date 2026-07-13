"use client";

import React from "react";

export default function SaranAduan() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Terima kasih! Saran/Aduan Anda telah terkirim.");
    event.currentTarget.reset();
  };

  return (
    <section id="saran" className="py-10 md:py-20 relative bg-surface-variant overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="animate-on-scroll animate-fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container text-primary font-label-md text-xs mb-4 md:mb-6">
              <span className="material-symbols-outlined text-[15px]">forum</span>
              Suara Mahasiswa
            </div>
            
            <h2 className="font-display-md text-2xl md:text-4xl lg:text-5xl text-on-background mb-3 md:mb-6 leading-tight">
              Kotak <span className="text-primary">Saran & Aduan</span>
            </h2>
            
            <p className="font-body-lg text-on-surface-variant leading-relaxed mb-5 md:mb-8 max-w-xl text-balance text-sm md:text-base">
              BEM STMIK Tazkia selalu terbuka untuk mendengar aspirasi, kritik, maupun keluhan dari seluruh mahasiswa. Suara Anda sangat berarti untuk membangun kampus yang lebih baik.
            </p>

            <div className="flex flex-col gap-3 md:gap-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-variant/50 shadow-soft flex items-center justify-center shrink-0 text-secondary">
                  <span className="material-symbols-outlined text-[18px] md:text-[24px]">lightbulb</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm md:text-lg text-on-background mb-0.5 md:mb-1">Saran Konstruktif</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant">Punya ide program kerja atau masukan untuk BEM? Sampaikan di sini.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-variant/50 shadow-soft flex items-center justify-center shrink-0 text-error">
                  <span className="material-symbols-outlined text-[18px] md:text-[24px]">report</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm md:text-lg text-on-background mb-0.5 md:mb-1">Aduan Fasilitas / Layanan</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant">Laporkan kendala terkait fasilitas kampus atau layanan kemahasiswaan. Kami jamin kerahasiaannya.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div className="bg-surface rounded-2xl md:rounded-3xl p-5 md:p-10 shadow-[0_20px_60px_-15px_rgba(27,64,134,0.1)] border border-outline-variant/30">
            <form className="flex flex-col gap-3 md:gap-5" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs md:text-sm font-bold text-on-background">Nama (Opsional)</label>
                  <input type="text" placeholder="Anonim" className="w-full px-3 py-2 md:px-4 md:py-3 text-sm rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-background" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs md:text-sm font-bold text-on-background">NIM (Opsional)</label>
                  <input type="text" placeholder="12345678" className="w-full px-3 py-2 md:px-4 md:py-3 text-sm rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-background" />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-on-surface mb-2 px-1">
                  Kategori Laporan <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select required defaultValue="" className="w-full bg-surface-variant/30 border border-outline-variant/50 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-300 text-sm text-on-surface appearance-none cursor-pointer">
                    <option value="" disabled>Pilih Kategori</option>
                    <option value="saran">Saran & Masukan</option>
                    <option value="aduan">Aduan Mahasiswa</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-on-surface mb-2 px-1">
                  Deskripsi Detail <span className="text-error">*</span>
                </label>
                <textarea required rows={5} placeholder="Jelaskan secara rinci apa yang ingin Anda sampaikan..." className="w-full bg-surface-variant/30 border border-outline-variant/50 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-300 text-sm text-on-surface resize-none"></textarea>
              </div>

              <button type="submit" className="mt-1 w-full bg-primary text-white font-bold py-2.5 md:py-3.5 px-6 rounded-xl text-sm hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                Kirim Pesan
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">send</span>
              </button>
              
              <p className="text-[10px] md:text-xs text-center text-on-surface-variant">
                Identitas pelapor (jika ada) akan dirahasiakan dan hanya digunakan untuk keperluan tindak lanjut internal BEM.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
