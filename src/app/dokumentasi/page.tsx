"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

import { getKegiatans } from "@/app/admin/kegiatan/actions";

// ============================================================
// DATA (Now fetched dynamically)
// ============================================================



const ITEMS_PER_PAGE = 6;

// ============================================================
// COMPONENTS
// ============================================================

function MediaBadge({ count }: { count: number | string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      {count} Foto
    </div>
  );
}

function KategoriChip({ kategori }: { kategori: string }) {
  const colorMap: Record<string, string> = {
    Event: "text-[#f2791e]",
    Seminar: "text-[#f2791e]",
    Sosial: "text-[#f2791e]",
    Internal: "text-[#1b4086]",
    Galeri: "text-[#006684]",
  };
  return (
    <span className={`text-xs font-bold uppercase tracking-wider ${colorMap[kategori] ?? "text-secondary"}`}>
      {kategori}
    </span>
  );
}

import Link from "next/link";

function DocCard({ item }: { item: any }) {
  return (
    <Link href={`/agenda/${item.id}?from=dokumentasi`} className="block w-full">
      <div className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer h-[260px] md:h-[300px] flex flex-col justify-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        
        {/* Full-bleed Image */}
        <Image
          src={item.image}
          alt={item.judul}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Media badge top-right */}
      <div className="absolute top-3 right-3 z-10">
        <MediaBadge count={item.mediaCount} />
      </div>

      {/* Category badge top-left */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-surface/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/20">
          {item.kategori}
        </span>
      </div>

      {/* Text content at bottom */}
      <div className="relative z-10 p-4 md:p-5">
        <h3 className="font-bold text-white text-sm md:text-base leading-snug mb-2 line-clamp-2 group-hover:text-secondary transition-colors duration-200">
          {item.judul}
        </h3>
        <div className="flex items-center gap-1.5 text-white/70 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {item.tanggal}
        </div>
      </div>
      </div>
    </Link>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPage,
}: {
  currentPage: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Prev */}
      <button
        onClick={() => onPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Halaman sebelumnya"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-on-surface-variant text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p as number)}
            className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-200 ${
              currentPage === p
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "border border-outline-variant/40 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary"
            }`}
            aria-label={`Halaman ${p}`}
            aria-current={currentPage === p ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Halaman berikutnya"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================
export default function DokumentasiPage() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dokumentasiData, setDokumentasiData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const data = await getKegiatans();
        const filtered = data.filter(item => {
           if (!item.is_published) return false;
           const isFinished = item.date && (new Date(item.date).setHours(0,0,0,0) <= new Date().setHours(0,0,0,0));
           if (!isFinished) return false;
           return Array.isArray(item.gallery) && item.gallery.length > 0;
        });

        const mapped = filtered.map(item => ({
          id: item.id,
          kategori: item.category || "Event",
          subKategori: item.category || "General",
          judul: item.title,
          tanggal: item.date ? new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "",
          mediaCount: item.gallery?.length || 0,
          image: item.image_url || ((item.gallery && item.gallery.length > 0) ? item.gallery[0] : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"),
          tags: [ (item.category || "event").toLowerCase(), "semua" ]
        }));
        setDokumentasiData(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const dynamicFilterTabs = useMemo(() => {
    const uniqueCategories = new Set<string>();
    dokumentasiData.forEach((item) => {
      if (item.kategori) {
        uniqueCategories.add(item.kategori);
      }
    });

    const tabs = [{ label: "Semua", value: "semua" }];
    
    Array.from(uniqueCategories).sort().forEach((cat) => {
      tabs.push({ label: cat, value: cat.toLowerCase() });
    });
    
    return tabs;
  }, [dokumentasiData]);

  const filtered = useMemo(() => {
    return dokumentasiData.filter((item) => {
      const matchFilter = item.tags.includes(activeFilter);
      const matchSearch =
        searchQuery === "" ||
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery, dokumentasiData]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleFilter = (val: string) => {
    setActiveFilter(val);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPhotos = useMemo(() => {
    return dokumentasiData.reduce((acc, item) => acc + (typeof item.mediaCount === 'number' ? item.mediaCount : 0), 0);
  }, [dokumentasiData]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto pt-12 pb-16 text-center">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 animate-init-fade-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          KARYA &amp; INOVASI
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-background mb-5 animate-init-fade-up anim-delay-100 leading-tight">
          <span className="text-secondary">Galeri</span>{" "}
          <span className="text-primary">&amp; Dokumentasi</span>
        </h1>

        {/* Sub */}
        <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base md:text-lg animate-init-fade-up anim-delay-200">
          Telusuri jejak karya dan momen berharga dari setiap langkah perjalanan Kabinet Sinergi.
          Setiap dokumentasi adalah saksi dari komitmen dan dedikasi kami.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-8 animate-init-fade-up anim-delay-300">
          <div className="flex items-center gap-2 text-on-surface-variant text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {totalPhotos} Foto
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent mb-12" />

      {/* ── FILTER & SEARCH BAR ── */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto mb-8">
        {/* Scrollable filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide">
          {dynamicFilterTabs.map((tab) => (
            <button
              key={tab.value}
              id={`filter-${tab.value}`}
              onClick={() => handleFilter(tab.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === tab.value
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-surface text-on-surface-variant border border-outline-variant/40 hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="search-dokumentasi"
            type="text"
            placeholder="Cari dokumentasi event..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-11 pr-5 py-2.5 rounded-2xl border border-outline-variant/40 bg-surface text-sm text-on-background placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <h3 className="text-xl font-bold text-on-background">Memuat Dokumentasi...</h3>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-outline">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-on-background mb-2">Tidak ada hasil</h3>
            <p className="text-on-surface-variant text-sm">Coba ubah kata pencarian atau pilih kategori lain.</p>
          </div>
        ) : (
          <div className="flex flex-row overflow-x-auto gap-5 pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 flex-nowrap sm:flex-wrap">
            {paginated.map((item) => (
              <div key={item.id} className="w-[75vw] sm:w-auto shrink-0 sm:shrink">
                <DocCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination — hidden on mobile (cards are swipeable) */}
        {totalPages > 1 && (
          <div className="hidden sm:block">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPage={setCurrentPage} />
          </div>
        )}
      </section>
    </div>
  );
}
