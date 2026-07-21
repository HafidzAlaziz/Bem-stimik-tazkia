"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const EMOJI_DB = [
  { emoji: '🍎', name: 'Buah Apel' },
  { emoji: '🍌', name: 'Buah Pisang' },
  { emoji: '🍉', name: 'Buah Semangka' },
  { emoji: '🍇', name: 'Buah Anggur' },
  { emoji: '🍓', name: 'Buah Stroberi' },
  { emoji: '🍔', name: 'Burger' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🚗', name: 'Mobil Merah' },
  { emoji: '⚽', name: 'Bola Sepak' },
  { emoji: '🎸', name: 'Gitar' },
  { emoji: '🐶', name: 'Wajah Anjing' },
  { emoji: '🐱', name: 'Wajah Kucing' },
  { emoji: '🐼', name: 'Wajah Panda' },
  { emoji: '🚀', name: 'Roket' },
  { emoji: '🌻', name: 'Bunga Matahari' }
];

export default function SaranAduan() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ kategori: false, deskripsi: false });
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  // Form states
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [captchaOptions, setCaptchaOptions] = useState<typeof EMOJI_DB>([]);
  const [captchaTarget, setCaptchaTarget] = useState<typeof EMOJI_DB[0] | null>(null);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    setIsCaptchaSolved(false);
    setCaptchaError(false);
    const shuffled = [...EMOJI_DB].sort(() => 0.5 - Math.random());
    const selectedOptions = shuffled.slice(0, 5);
    setCaptchaOptions(selectedOptions);
    const target = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];
    setCaptchaTarget(target);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleCaptchaClick = (item: typeof EMOJI_DB[0]) => {
    if (isCaptchaSolved) return;
    
    if (item.emoji === captchaTarget?.emoji) {
      setIsCaptchaSolved(true);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      setTimeout(() => {
        generateCaptcha();
      }, 1500);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setFieldErrors({ kategori: false, deskripsi: false });

    // Manual Validation
    let hasError = false;
    let newFieldErrors = { kategori: false, deskripsi: false };

    if (!kategori) {
      newFieldErrors.kategori = true;
      hasError = true;
    }
    if (!deskripsi || !deskripsi.trim()) {
      newFieldErrors.deskripsi = true;
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      setErrorMsg("Mohon lengkapi kolom yang wajib diisi (berwarna merah).");
      return;
    }

    // Handle empty name and nim
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const finalNama = nama && nama.trim() !== "" ? nama : `Anonim-${randomId}`;
    const finalNim = nim && nim.trim() !== "" ? nim : "Tidak disertakan";

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("saran_aduan")
        .insert([{ nama: finalNama, nim: finalNim, kategori, deskripsi }]);

      if (error) {
        throw error;
      }

      // Try to forward to Google Sheets if Webhook URL is set
      try {
        const { data: settingData } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', 'google_sheets_webhook_url')
          .single();
        
        if (settingData && settingData.value) {
          await fetch('/api/saran-webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              webhookUrl: settingData.value,
              payload: {
                nama: finalNama,
                nim: finalNim,
                kategori,
                deskripsi,
                tanggal: new Date().toLocaleString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                }) + ' WIB'
              }
            })
          });
        }
      } catch (webhookErr) {
        console.error("Gagal mengirim ke Excel Webhook:", webhookErr);
        // Kita tidak menggagalkan proses form jika excel gagal
      }

      setSuccessMsg("Terima kasih! Saran/Aduan Anda telah terkirim.");
      setNama("");
      setNim("");
      setKategori("");
      setDeskripsi("");
      generateCaptcha(); // Reset puzzle untuk pengiriman berikutnya
    } catch (error: any) {
      console.error("Error submitting:", error);
      setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="saran" className="py-10 md:py-20 relative bg-surface-variant overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="">
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
            <form className="flex flex-col gap-3 md:gap-5" onSubmit={handleSubmit} noValidate>
              
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-end">
                    <label className="text-xs md:text-sm font-bold text-on-background">Nama (Opsional)</label>
                    <span className={`text-[10px] ${nama.length >= 50 ? 'text-red-500 font-bold' : 'text-on-surface-variant'}`}>{nama.length}/50 {nama.length >= 50 && "(Maksimal)"}</span>
                  </div>
                  <input type="text" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} maxLength={50} placeholder="Anonim" className={`w-full px-3 py-2 md:px-4 md:py-3 text-sm rounded-xl border bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-background ${nama.length >= 50 ? 'border-red-500' : 'border-outline-variant/40'}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-end">
                    <label className="text-xs md:text-sm font-bold text-on-background">NIM (Opsional)</label>
                    <span className={`text-[10px] ${nim.length >= 15 ? 'text-red-500 font-bold' : 'text-on-surface-variant'}`}>{nim.length}/15 {nim.length >= 15 && "(Maksimal)"}</span>
                  </div>
                  <input type="text" name="nim" value={nim} onChange={(e) => setNim(e.target.value)} maxLength={15} placeholder="12345678" className={`w-full px-3 py-2 md:px-4 md:py-3 text-sm rounded-xl border bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-background ${nim.length >= 15 ? 'border-red-500' : 'border-outline-variant/40'}`} />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-on-surface mb-2 px-1">
                  Kategori Laporan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select name="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} className={`w-full bg-surface-variant/30 border rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm text-on-surface appearance-none cursor-pointer ${fieldErrors.kategori ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" : "border-outline-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/10"}`}>
                    <option value="" disabled>Pilih Kategori</option>
                    <option value="saran">Saran & Masukan</option>
                    <option value="aduan">Aduan Mahasiswa</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-end mb-2 px-1">
                  <label className="block text-sm font-semibold text-on-surface">
                    Deskripsi Detail <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs font-medium ${deskripsi.length >= 1000 ? 'text-red-500 font-bold' : 'text-on-surface-variant'}`}>{deskripsi.length}/1000 {deskripsi.length >= 1000 ? "- Batas Maksimal" : "karakter"}</span>
                </div>
                <textarea name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} maxLength={1000} rows={5} placeholder="Jelaskan secara rinci apa yang ingin Anda sampaikan..." className={`w-full bg-surface-variant/30 border rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm text-on-surface resize-none ${fieldErrors.deskripsi || deskripsi.length >= 1000 ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" : "border-outline-variant/50 focus:border-primary focus:ring-4 focus:ring-primary/10"}`}></textarea>
              </div>

              {/* Custom Error Message */}
              {errorMsg && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-200 animate-fade-in">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {errorMsg}
                </div>
              )}

              {/* Custom Success Message */}
              {successMsg && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-bold border border-green-200 animate-fade-in">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  {successMsg}
                </div>
              )}

            {/* Anti-Spam Puzzle */}
            <div className={`mt-4 p-5 rounded-2xl border ${isCaptchaSolved ? 'bg-green-50/50 border-green-200' : captchaError ? 'bg-red-50/50 border-red-200' : 'bg-surface-variant/20 border-outline-variant/30'} transition-colors`}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-sm font-bold ${isCaptchaSolved ? 'text-green-700' : captchaError ? 'text-red-600' : 'text-on-surface'}`}>
                      {isCaptchaSolved ? '✓ Keamanan Lolos' : captchaError ? '❌ Salah tebak!' : '🛡️ Verifikasi Keamanan'}
                    </h4>
                    {!isCaptchaSolved && (
                      <p className="text-xs text-on-surface-variant mt-1">
                        Buktikan Anda bukan robot, klik gambar <strong className="text-primary font-extrabold">{captchaTarget?.name}</strong>:
                      </p>
                    )}
                  </div>
                  {isCaptchaSolved && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full border border-green-200">Terverifikasi</span>
                  )}
                </div>
                
                {!isCaptchaSolved && (
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-1">
                    {captchaOptions.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleCaptchaClick(item)}
                        disabled={captchaError}
                        className={`text-2xl sm:text-3xl p-3 sm:p-4 rounded-xl border-2 transition-all hover:-translate-y-1 hover:shadow-md active:scale-95 ${captchaError ? 'opacity-50 cursor-not-allowed border-red-200 bg-red-50' : 'bg-surface border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5'}`}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !kategori || deskripsi.trim() === "" || deskripsi.length > 1000 || !isCaptchaSolved}
              className="mt-6 flex w-full justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2 group"
            >
              {isLoading ? "Mengirim..." : !isCaptchaSolved ? "Selesaikan Puzzle Dahulu" : "Kirim Pesan"}
              {!isLoading && isCaptchaSolved && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">send</span>}
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
