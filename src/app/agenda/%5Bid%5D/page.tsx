import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agendas } from "@/data/agendas";

// Generates static paths at build time
export async function generateStaticParams() {
  return agendas.map((agenda) => ({
    id: agenda.id.toString(),
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agenda = agendas.find((a) => a.id.toString() === id);
  if (!agenda) {
    return {
      title: "Agenda Tidak Ditemukan",
    };
  }
  return {
    title: `${agenda.title} - BEM STMIK Tazkia`,
    description: agenda.description,
  };
}

export default async function AgendaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agenda = agendas.find((a) => a.id.toString() === id);

  if (!agenda) {
    notFound();
  }

  const posterImg = `https://picsum.photos/seed/${agenda.id}/1200/600`;

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-background min-h-screen">
      <div className="px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8 animate-init-fade-up">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link href="/agenda" className="hover:text-primary transition-colors">Agenda</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-background font-medium truncate max-w-[200px] sm:max-w-none">{agenda.title}</span>
        </nav>

        {/* Content Area */}
        <div className="bg-surface rounded-3xl border border-outline-variant/30 shadow-soft overflow-hidden animate-init-fade-up anim-delay-100 relative">
          
          {/* Header Image */}
          <div className="w-full h-64 md:h-96 relative bg-surface-variant overflow-hidden group">
            <img src={posterImg} alt={agenda.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10 flex flex-col items-start text-white">
              <span className={`px-4 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider mb-4 ${agenda.status === 'Akan Datang' ? 'bg-[#25D366]' : 'bg-white/20 backdrop-blur-md'}`}>
                {agenda.status}
              </span>
              <h1 className="font-display-lg text-3xl md:text-5xl font-bold mb-2 text-balance leading-tight text-white font-extrabold">
                {agenda.title}
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left Details */}
            <div className="flex-1 space-y-8">
              <div className="flex flex-wrap items-center gap-4 border-b border-outline-variant/20 pb-8">
                <div className="flex items-center gap-2 bg-primary-container text-primary px-4 py-2 rounded-xl font-label-md">
                  <span className="material-symbols-outlined text-[20px]">category</span>
                  {agenda.category}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium bg-surface-variant/50 px-4 py-2 rounded-xl">
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  {agenda.date}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium bg-surface-variant/50 px-4 py-2 rounded-xl">
                  <span className="material-symbols-outlined text-[20px] text-error">location_on</span>
                  {agenda.location}
                </div>
              </div>

              <div className="prose prose-lg prose-slate max-w-none">
                <h3 className="font-headline-md text-2xl text-on-background mb-4 font-bold">Deskripsi Kegiatan</h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed text-balance text-lg text-slate-600 dark:text-slate-400">
                  {agenda.description}
                </p>
                
                {/* Dummy additional content for layout visual */}
                <h4 className="font-headline-sm text-xl text-on-background mt-8 mb-3 font-bold">Tujuan Kegiatan</h4>
                <ul className="list-disc pl-5 space-y-2 text-on-surface-variant font-body-md text-slate-600 dark:text-slate-400">
                  <li>Meningkatkan kapasitas dan pemahaman partisipan.</li>
                  <li>Membangun relasi dan jejaring yang bermanfaat ke depannya.</li>
                  <li>Menyediakan wadah untuk berinovasi dan berkontribusi.</li>
                </ul>
              </div>
            </div>

            {/* Right Action / Form Area */}
            <div className="w-full lg:w-[400px] shrink-0">
              {agenda.type === 'gform' ? (
                /* Form Pendaftaran */
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-lg lg:sticky lg:top-28 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary-container text-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined">app_registration</span>
                    </div>
                    <h3 className="font-headline-sm text-xl text-primary font-bold">Form Pendaftaran</h3>
                  </div>
                  
                  <p className="text-sm text-on-surface-variant mb-8 mt-2">Silakan lengkapi data diri Anda untuk mengikuti kegiatan ini.</p>
                  
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Pendaftaran Berhasil! Fitur ini adalah dummy untuk demonstrasi.'); e.currentTarget.reset(); }}>
                    <div>
                      <label className="block text-sm font-bold text-on-background mb-2">Nama Lengkap</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-on-background" placeholder="Masukkan nama lengkap" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-background mb-2">NPM / NIM</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-on-background" placeholder="Contoh: 12345678" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-background mb-2">Program Studi</label>
                      <div className="relative">
                        <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md appearance-none text-on-background">
                          <option value="" disabled>Pilih Program Studi</option>
                          <option value="ti">Teknik Informatika</option>
                          <option value="si">Sistem Informasi</option>
                          <option value="bd">Bisnis Digital</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-background mb-2">Nomor WhatsApp</label>
                      <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-on-background" placeholder="08xxxxxxxxxx" />
                    </div>
                    
                    <button type="submit" className="w-full mt-6 bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-primary/90 hover:shadow-[0_8px_20px_-8px_rgba(27,64,134,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      Daftar Sekarang
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Selebaran Saja */
                <div className="bg-white p-6 md:p-10 rounded-3xl border border-outline-variant/30 shadow-lg lg:sticky lg:top-28 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                  <div className="w-24 h-24 bg-secondary-container text-secondary rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[48px]">campaign</span>
                  </div>
                  <h3 className="font-headline-sm text-2xl text-on-background font-bold mb-3">Informasi Selebaran</h3>
                  <p className="text-on-surface-variant font-body-md mb-8">Kegiatan ini bersifat terbuka atau berupa informasi sepihak. Anda dapat mengunduh selebaran untuk disebarluaskan ke pihak lain.</p>
                  
                  <button onClick={() => alert('Mengunduh selebaran...')} className="w-full bg-surface-variant text-on-surface-variant font-bold py-3.5 px-6 rounded-xl hover:bg-outline-variant/30 transition-all duration-300 flex items-center justify-center gap-2 mb-3 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Unduh Selebaran
                  </button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`Ayo ikuti kegiatan: ${agenda.title} di ${agenda.location} pada ${agenda.date}!`)}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#128C7E] shadow-[0_8px_20px_-8px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                    Bagikan ke WhatsApp
                  </a>
                </div>
              )}
            </div>
            
          </div>
        </div>
        
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        input, select {
          color: var(--color-on-background) !important;
        }
      `}} />
    </div>
  );
}
