import React from "react";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiEye, FiCalendar } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { createClient } from "@/utils/supabase/server";

export default async function BeritaSorotan() {
  const supabase = await createClient();
  
  // Fetch the latest news
  const { data: featuredNews, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching sorotan:", error);
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-12 md:py-20 bg-background overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 uppercase tracking-wide">
            Berita Sorotan
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
            Berita sorotan mengenai kegiatan dan pencapaian terbaru di lingkungan kampus.
          </p>
        </div>
        <Link
          href="/berita"
          className="group flex items-center gap-1.5 text-primary hover:text-secondary font-semibold text-sm transition-colors duration-300 whitespace-nowrap"
        >
          Lihat Semua Berita <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {!featuredNews ? (
        <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 sm:p-10 text-center shadow-sm max-w-3xl mx-auto flex flex-col items-center justify-center gap-2">
          <div className="w-48 h-48 sm:w-60 sm:h-60 relative -my-4">
            <DotLottieReact
              src="/animations/Social Media Marketing announcement.lottie"
              loop
              autoplay
            />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-on-background">Belum Ada Berita Dipublikasikan</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
            Pantau terus halaman ini untuk mendapatkan informasi dan pengumuman terbaru dari BEM STMIK Tazkia.
          </p>
          <Link
            href="/berita"
            className="mt-3 inline-flex items-center gap-2 bg-primary text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md"
          >
            Jelajahi Berita <FiArrowRight />
          </Link>
        </div>
      ) : (
        /* Featured News Banner - Single consistent card */
        <div className="w-full">
        <Link href={`/berita/${featuredNews.slug}`} className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 bg-surface min-h-[420px] sm:min-h-[380px] md:min-h-[420px] flex flex-col justify-end transition-all duration-300 hover:shadow-xl block">
          {/* Background Image with Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${featuredNews.image_url}')` }}
          ></div>
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4086]/95 via-[#1b4086]/70 to-[#1b4086]/30 md:to-transparent"></div>

          {/* Featured Content */}
          <div className="relative z-10 p-5 sm:p-6 md:p-10 text-white w-full md:max-w-4xl text-left">
            {/* Featured Badge */}
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Sorotan
              </span>
              <span className="bg-surface/20 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                <FiCalendar className="inline shrink-0 text-white" /> {new Date(featuredNews.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <span className="text-secondary-container font-semibold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mb-2 block">
              {featuredNews.category}
            </span>
            <h2 className="text-lg sm:text-xl md:text-4xl font-extrabold mb-3 md:mb-4 leading-tight group-hover:text-secondary-container transition-colors duration-300">
              {featuredNews.title}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4 md:mb-6 font-light leading-relaxed line-clamp-3 md:line-clamp-3">
              {featuredNews.excerpt}
            </p>
            <div className="flex flex-row gap-3 items-center justify-between flex-wrap">
              <div
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 transition-all duration-300 px-4 sm:px-6 py-2 md:py-3 rounded-full font-bold text-xs sm:text-sm shadow-md group-hover:translate-x-1 shrink-0"
              >
                Baca Selengkapnya <FiArrowRight />
              </div>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1"><FiHeart /> {featuredNews.likes || 0} Suka</span>
                <span className="flex items-center gap-1"><FiEye /> {featuredNews.views || 0} Dilihat</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      )}
    </section>
  );
}

