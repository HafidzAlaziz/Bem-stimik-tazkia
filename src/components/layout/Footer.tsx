"use client";

import Link from "next/link";
import { FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiMapPin, FiMail, FiBell } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-8 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

      <div className="px-5 md:px-10 max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Subscription Banner */}
        <div className="w-full bg-white/10 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex-1 relative z-10">
            <h3 className="text-2xl md:text-3xl text-white font-bold mb-2">Jangan Ketinggalan Informasi!</h3>
            <p className="text-white/80 max-w-lg">Dapatkan notifikasi kegiatan terbaru BEM STMIK Tazkia secara eksklusif langsung ke WhatsApp Anda.</p>
          </div>

          <div className="relative w-full md:w-auto">
            <div className="absolute -top-12 right-2 md:right-4 bg-white text-primary px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg pointer-events-none z-20 flex items-center gap-1.5 border border-primary/10 animate-bounce">
              <span className="text-base">😁</span>
              Bukan Bayar yah
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-primary/10 rotate-45 rounded-sm"></div>
            </div>

            <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Berhasil Berlangganan! Anda akan menerima notifikasi via WhatsApp."); }}>
              <input
                type="tel"
                required
                placeholder="Nomor WhatsApp (Cth: 0812...)"
                className="w-full sm:w-72 md:w-80 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-secondary focus:bg-white/20 focus:ring-1 focus:ring-secondary transition-all"
              />
              <button
                type="submit"
                className="group bg-secondary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(242,121,30,0.5)] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <FiBell className="text-lg" />
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-4 w-fit">
              <img alt="BEM STMIK Tazkia Logo" className="h-12 w-12 object-contain bg-white rounded-lg p-1.5 shadow-sm" src="/logo.png" />
              <div className="flex flex-row items-center gap-1.5">
                <span className="font-bold leading-none text-xl text-white">BEM STMIK</span>
                <span className="font-bold leading-none text-xl text-secondary">Tazkia</span>
              </div>
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
