"use client";

import React from "react";

export default function SaranAduan() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Terima kasih! Saran/Aduan Anda telah terkirim.");
    event.currentTarget.reset();
  };

  return (
    <section id="saran" className="py-20 relative bg-surface-variant overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="animate-on-scroll animate-fade-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-primary font-label-md mb-6">
              <span className="material-symbols-outlined text-[18px]">forum</span>
              Suara Mahasiswa
            </div>
            
            <h2 className="font-display-md text-3xl md:text-4xl lg:text-5xl text-on-background mb-6 leading-tight">
              Kotak <span className="text-primary">Saran & Aduan</span>
            </h2>
            
            <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl text-balance">
              BEM STMIK Tazkia selalu terbuka untuk mendengar aspirasi, kritik, maupun keluhan dari seluruh mahasiswa. Suara Anda sangat berarti untuk membangun kampus yang lebih baik.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center shrink-0 text-secondary">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg text-on-background mb-1">Saran Konstruktif</h4>
                  <p className="text-sm text-on-surface-variant">Punya ide program kerja atau masukan untuk BEM? Sampaikan di sini.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center shrink-0 text-error">
                  <span className="material-symbols-outlined">report</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg text-on-background mb-1">Aduan Fasilitas / Layanan</h4>
                  <p className="text-sm text-on-surface-variant">Laporkan kendala terkait fasilitas kampus atau layanan kemahasiswaan. Kami jamin kerahasiaannya.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(27,64,134,0.1)] border border-outline-variant/30 animate-on-scroll animate-fade-left">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-on-background">Nama (Opsional)</label>
                  <input type="text" placeholder="Samarkan jika ingin anonim" className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-background" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-on-background">NIM (Opsional)</label>
                  <input type="text" placeholder="12345678" className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-background" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-on-background">Kategori Pesan <span className="text-error">*</span></label>
                <div className="relative">
                  <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-on-background">
                    <option value="" disabled>Pilih Kategori</option>
                    <option value="saran">Saran & Masukan</option>
                    <option value="aduan">Aduan Mahasiswa</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-on-background">Pesan Anda <span className="text-error">*</span></label>
                <textarea required rows={4} placeholder="Tuliskan detail saran atau aduan Anda di sini..." className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-on-background"></textarea>
              </div>

              <button type="submit" className="mt-2 w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                Kirim Pesan
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
              </button>
              
              <p className="text-xs text-center text-on-surface-variant mt-2">
                Identitas pelapor (jika ada) akan dirahasiakan dan hanya digunakan untuk keperluan tindak lanjut internal BEM.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
