"use client";

import React, { useState } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const pengurusInti = [
  {
    name: "Ahmad Fulan",
    role: "Ketua BEM",
    ig: "@ahmadfulan",
    wa: "6281234567890",
    initials: "AF",
    color: "#1b4086",
    bg: "#e1e7ff",
  },
  {
    name: "Siti Fulanah",
    role: "Wakil Ketua BEM",
    ig: "@sitifulanah",
    wa: "6281234567891",
    initials: "SF",
    color: "#f2791e",
    bg: "#ffdbca",
  },
  {
    name: "Budi Santoso",
    role: "Sekretaris Umum",
    ig: "@budisnts",
    wa: "6281234567892",
    initials: "BS",
    color: "#006684",
    bg: "#bce9ff",
  },
  {
    name: "Nurul Hidayah",
    role: "Bendahara Umum",
    ig: "@nurulhdyh",
    wa: "6281234567893",
    initials: "NH",
    color: "#1b4086",
    bg: "#e1e7ff",
  },
];

const prokerUtama = [
  {
    nama: "STMIK Tazkia Summit",
    deskripsi:
      "Forum diskusi rutin antar UKM dan ORMAWA kampus untuk sinergi kegiatan mahasiswa.",
    icon: "🏆",
    tag: "Tahunan",
  },
  {
    nama: "Malam Apresiasi Mahasiswa",
    deskripsi:
      "Penghargaan bagi mahasiswa berprestasi akademik dan non-akademik setiap akhir semester.",
    icon: "🌟",
    tag: "Semester",
  },
  {
    nama: "BEM Goes to School",
    deskripsi:
      "Sosialisasi kampus ke SMA/SMK sekitar Bogor untuk meningkatkan kesadaran pendidikan tinggi.",
    icon: "🏫",
    tag: "Tahunan",
  },
  {
    nama: "Olimpiade Mahasiswa Internal",
    deskripsi:
      "Kompetisi lintas departemen dalam bidang IT, desain, dan soft skill untuk mahasiswa STMIK Tazkia.",
    icon: "🎯",
    tag: "Semester",
  },
];

const departemen = [
  {
    id: "hubma",
    nama: "Hubungan Mahasiswa",
    singkatan: "HUBMA",
    deskripsi:
      "Menjalin relasi eksternal BEM, memperkuat jejaring antar organisasi kampus, dan menjadi jembatan antara mahasiswa dengan pihak akademik.",
    warna: "#1b4086",
    warnaBg: "#e1e7ff",
    icon: "🤝",
    anggota: [
      { name: "Rizky Pratama", role: "Kepala Departemen", initials: "RP", ig: "@rizky_prtma", wa: "6281111111111" },
      { name: "Siti Aminah", role: "Wakil Kepala", initials: "SA", ig: "@sitiaminah", wa: "6281111111112" },
      { name: "Fajar Hidayat", role: "Staff Hubungan Eksternal", initials: "FH", ig: "@fajar_h", wa: "6281111111113" },
      { name: "Lina Marlina", role: "Staff Hubungan Internal", initials: "LM", ig: "@lina.m", wa: "6281111111114" },
    ],
    proker: [
      {
        nama: "Forum ORMAWA",
        deskripsi: "Pertemuan rutin antar pimpinan organisasi mahasiswa kampus.",
        tag: "Rutin",
      },
      {
        nama: "Kunjungan Instansi",
        deskripsi: "Kunjungan ke instansi pemerintah dan swasta untuk networking mahasiswa.",
        tag: "Semesteran",
      },
      {
        nama: "MoU Kolaborasi",
        deskripsi: "Penyusunan nota kesepahaman bersama organisasi eksternal kampus.",
        tag: "Tahunan",
      },
    ],
  },
  {
    id: "ristek",
    nama: "Riset & Teknologi",
    singkatan: "RISTEK",
    deskripsi:
      "Mewadahi inovasi teknologi mahasiswa, mengelola riset internal BEM, dan mengadakan kompetisi serta workshop IT untuk meningkatkan daya saing.",
    warna: "#006684",
    warnaBg: "#bce9ff",
    icon: "💡",
    anggota: [
      { name: "Kevin Wijaya", role: "Kepala Departemen", initials: "KW", ig: "@kevin.tech", wa: "6282222222221" },
      { name: "Nadia Safira", role: "Staff Riset Data", initials: "NS", ig: "@nadiasf", wa: "6282222222222" },
      { name: "Ilham Akbar", role: "Staff Pengembangan IT", initials: "IA", ig: "@ilham_code", wa: "6282222222223" },
      { name: "Putri Dewi", role: "Staff Web & Desain", initials: "PD", ig: "@putridewi_dev", wa: "6282222222224" },
      { name: "Reza Maulana", role: "Staff Workshop", initials: "RM", ig: "@reza.ml", wa: "6282222222225" },
    ],
    proker: [
      {
        nama: "Workshop Coding & AI",
        deskripsi: "Pelatihan pemrograman dan kecerdasan buatan untuk mahasiswa.",
        tag: "Triwulan",
      },
      {
        nama: "Hackathon STMIK Tazkia",
        deskripsi: "Kompetisi pembuatan aplikasi dalam waktu 24 jam bagi mahasiswa.",
        tag: "Tahunan",
      },
      {
        nama: "Riset Data BEM",
        deskripsi: "Penelitian internal terkait kebutuhan dan aspirasi mahasiswa.",
        tag: "Rutin",
      },
      {
        nama: "IT Talk",
        deskripsi: "Seminar teknologi menghadirkan praktisi industri digital.",
        tag: "Semester",
      },
    ],
  },
  {
    id: "medibrand",
    nama: "Media & Branding",
    singkatan: "MEDIBRAND",
    deskripsi:
      "Menjadi ujung tombak komunikasi digital BEM. Mengelola seluruh aset visual, konten media sosial, dan identitas brand BEM STMIK Tazkia.",
    warna: "#f2791e",
    warnaBg: "#ffdbca",
    icon: "📣",
    anggota: [
      { name: "Aulia Rahman", role: "Kepala Departemen", initials: "AR", ig: "@auliar_design", wa: "6283333333331" },
      { name: "Bagas Koro", role: "Staff Videografi", initials: "BK", ig: "@bagaskoro.vid", wa: "6283333333332" },
      { name: "Maya Sari", role: "Staff Desain Grafis", initials: "MS", ig: "@maya.creative", wa: "6283333333333" },
      { name: "Dani Putra", role: "Staff Konten & Copywriting", initials: "DP", ig: "@dani.write", wa: "6283333333334" },
    ],
    proker: [
      {
        nama: "Rebrand BEM Annual",
        deskripsi: "Pembaruan identitas visual dan panduan brand BEM setiap tahun.",
        tag: "Tahunan",
      },
      {
        nama: "Social Media Campaign",
        deskripsi: "Kampanye konten edukatif dan informatif di semua platform digital BEM.",
        tag: "Rutin",
      },
      {
        nama: "Newsletter BEM",
        deskripsi: "Publikasi berkala tentang kegiatan dan prestasi mahasiswa.",
        tag: "Bulanan",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
function WaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function IgIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  Rutin: "bg-emerald-100 text-emerald-700",
  Bulanan: "bg-blue-100 text-blue-700",
  Triwulan: "bg-violet-100 text-violet-700",
  Semester: "bg-amber-100 text-amber-700",
  Semesteran: "bg-amber-100 text-amber-700",
  Tahunan: "bg-rose-100 text-rose-700",
};

function ProkerTag({ tag }: { tag: string }) {
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] ?? "bg-surface-variant/30 text-on-surface-variant"}`}>
      {tag}
    </span>
  );
}

// ─────────────────────────────────────────────
// PENGURUS CARD — layout horizontal, compact
// ─────────────────────────────────────────────
function PengurusCard({ person }: { person: (typeof pengurusInti)[0] }) {
  return (
    <div className="group bg-surface rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 p-4">
      {/* Avatar */}
      <div
        className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-lg font-black select-none"
        style={{ backgroundColor: person.bg, color: person.color }}
      >
        {person.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: person.color }}>
          {person.role}
        </p>
        <h3 className="font-bold text-on-background text-base leading-tight truncate">{person.name}</h3>
        <p className="text-xs text-on-surface-variant mt-0.5">{person.ig}</p>
      </div>

      {/* Social buttons */}
      <div className="flex gap-2 shrink-0">
        <a
          href={`https://wa.me/${person.wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-xl border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200"
          aria-label={`WhatsApp ${person.name}`}
        >
          <WaIcon />
        </a>
        <a
          href={`https://instagram.com/${person.ig.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-xl border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-200"
          aria-label={`Instagram ${person.name}`}
        >
          <IgIcon />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ANGGOTA CARD — very compact for grid
// ─────────────────────────────────────────────
function AnggotaCard({
  member,
  warna,
  warnaBg,
}: {
  member: (typeof departemen)[0]["anggota"][0];
  warna: string;
  warnaBg: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/10 hover:border-outline-variant/30 hover:bg-surface transition-all duration-200">
      <div
        className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-xs font-black"
        style={{ backgroundColor: warnaBg, color: warna }}
      >
        {member.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-on-background truncate leading-tight">{member.name}</p>
        <p className="text-xs text-on-surface-variant truncate">{member.role}</p>
      </div>
      <div className="flex gap-1.5 shrink-0">
        <a
          href={`https://wa.me/${member.wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200"
          aria-label={`WhatsApp ${member.name}`}
        >
          <WaIcon />
        </a>
        <a
          href={`https://instagram.com/${member.ig.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-[#bc1888] hover:border-[#bc1888] transition-all duration-200"
          aria-label={`Instagram ${member.name}`}
        >
          <IgIcon />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROKER ROW — compact list item
// ─────────────────────────────────────────────
function ProkerRow({ proker }: { proker: { nama: string; deskripsi: string; tag: string } }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/10 hover:border-outline-variant/30 hover:bg-surface transition-all duration-200">
      <div className="w-5 h-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="font-bold text-sm text-on-background">{proker.nama}</span>
          <ProkerTag tag={proker.tag} />
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">{proker.deskripsi}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DEPARTEMEN CARD — tab anggota / proker
// ─────────────────────────────────────────────
function DepartemenCard({ dept }: { dept: (typeof departemen)[0] }) {
  const [tab, setTab] = useState<"anggota" | "proker">("anggota");
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination for Anggota
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(dept.anggota.length / ITEMS_PER_PAGE) || 1;
  const paginatedAnggota = dept.anggota.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-start gap-4 p-6" style={{ borderLeft: `4px solid ${dept.warna}` }}>
        <div
          className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl mt-0.5"
          style={{ backgroundColor: dept.warnaBg }}
        >
          {dept.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-extrabold text-lg text-on-background leading-tight">{dept.nama}</h3>
            <span
              className="text-[11px] font-black px-2.5 py-0.5 rounded-full tracking-wide"
              style={{ backgroundColor: dept.warnaBg, color: dept.warna }}
            >
              {dept.singkatan}
            </span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">{dept.deskripsi}</p>
        </div>
      </div>

      {/* ── Tab switcher ── */}
      <div className="flex border-t border-outline-variant/20 bg-surface-container-lowest">
        {(["anggota", "proker"] as const).map((t) => {
          const isActive = tab === t;
          const count = t === "anggota" ? dept.anggota.length : dept.proker.length;
          const label = t === "anggota" ? "Anggota" : "Program Kerja";
          return (
            <button
              key={t}
              id={`tab-${dept.id}-${t}`}
              onClick={() => {
                setTab(t);
                setCurrentPage(1);
              }}
              className={`flex-1 py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-b-2 ${isActive
                ? "text-on-background"
                : "text-on-surface-variant hover:text-on-background border-transparent"
                }`}
              style={isActive ? { borderBottomColor: dept.warna } : {}}
            >
              <span className="opacity-80">
                {t === "anggota" ? <UsersIcon /> : <CheckIcon />}
              </span>
              {label}
              <span
                className="text-xs font-black w-5 h-5 rounded-full flex items-center justify-center"
                style={
                  isActive
                    ? { backgroundColor: dept.warnaBg, color: dept.warna }
                    : { backgroundColor: "#ededf4", color: "#44474f" }
                }
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <div className="p-5">
        {tab === "anggota" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {paginatedAnggota.map((member, i) => (
                <AnggotaCard key={i} member={member} warna={dept.warna} warnaBg={dept.warnaBg} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs text-on-surface-variant hover:text-primary disabled:opacity-50 disabled:hover:text-on-surface-variant transition-colors"
                >
                  Prev
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${currentPage === page
                      ? "text-white shadow-sm"
                      : "bg-surface text-on-surface-variant border border-outline-variant/30 hover:border-primary hover:text-primary"
                      }`}
                    style={currentPage === page ? { backgroundColor: dept.warna } : {}}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs text-on-surface-variant hover:text-primary disabled:opacity-50 disabled:hover:text-on-surface-variant transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {dept.proker.map((p, i) => (
              <ProkerRow key={i} proker={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function KabinetPage() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-background overflow-hidden">

      {/* ── HERO ── */}
      <section className="px-5 md:px-10 max-w-5xl mx-auto pt-12 pb-14 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[280px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-10 right-0 md:right-1/4 w-32 md:w-40 h-32 md:h-40 bg-secondary/8 rounded-full blur-3xl -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-primary font-bold text-sm mb-6 animate-init-fade-up">
          <UsersIcon />
          KABINET 2024/2025
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-on-background mb-4 animate-init-fade-up anim-delay-100 leading-tight">
          Profil BEM <span className="text-primary">Kabinet</span>{" "}
          <span className="text-secondary">Sinergi Aktif</span>
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto text-base leading-relaxed animate-init-fade-up anim-delay-200">
          Mengenal para penggerak BEM STMIK Tazkia dari pimpinan inti hingga setiap departemen yang berdedikasi mewujudkan visi bersama.
        </p>
      </section>

      {/* ── VISI MISI & LOGO ── */}
      <section className="px-5 md:px-10 max-w-5xl mx-auto mb-20">
        <div className="flex flex-col items-center text-center mb-16 animate-init-fade-up anim-delay-300">
          <img src="/images/logo2.png" alt="Logo BEM" className="w-32 h-32 object-contain mb-8 drop-shadow-md hover:scale-105 transition-transform duration-300" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-background mb-4">Arah Gerak Kami</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Fondasi dan komitmen yang menjadi kompas dalam setiap langkah BEM STMIK Tazkia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-init-fade-up anim-delay-400">
          {/* VISI */}
          <div className="bg-surface rounded-3xl p-8 border border-outline-variant/30 shadow-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-on-background mb-4 group-hover:text-primary transition-colors">Visi</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              Mewujudkan BEM STMIK Tazkia sebagai inisiator pergerakan yang progresif, inklusif, dan berdampak nyata bagi sivitas akademika dan masyarakat berbasis data dan keilmuan statistik.
            </p>
          </div>

          {/* MISI */}
          <div className="bg-surface rounded-3xl p-8 border border-outline-variant/30 shadow-sm hover:border-secondary/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-on-background mb-4 group-hover:text-secondary transition-colors">Misi</h3>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex items-start gap-3">
                <svg className="text-secondary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Membangun sinergi internal BEM yang solid, transparan, dan profesional.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="text-secondary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Menyelenggarakan program kerja berbasis teknologi informasi dan dakwah yang inovatif.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="text-secondary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Menjadi wadah aspirasi yang responsif terhadap kebutuhan mahasiswa STMIK Tazkia.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="px-5 md:px-10 max-w-5xl mx-auto space-y-14">

        {/* ── PENGURUS INTI ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-lg font-extrabold text-on-background whitespace-nowrap">Pengurus Inti</h2>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* Horizontal scroll on mobile, 2-col grid on desktop */}
          <div className="flex flex-row overflow-x-auto gap-4 pb-3 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 flex-nowrap sm:flex-wrap">
            {pengurusInti.map((p, i) => (
              <div key={i} className="w-[80vw] sm:w-auto shrink-0 sm:shrink">
                <PengurusCard person={p} />
              </div>
            ))}
          </div>
        </section>

        {/* ── PROKER UTAMA BEM ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-lg font-extrabold text-on-background whitespace-nowrap">Program Kerja Utama BEM</h2>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* Horizontal scroll on mobile, 2-col grid on desktop */}
          <div className="flex flex-row overflow-x-auto gap-4 pb-3 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 flex-nowrap sm:flex-wrap">
            {prokerUtama.map((p, i) => (
              <div
                key={i}
                className="group w-[80vw] sm:w-auto shrink-0 sm:shrink bg-surface rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex gap-4 items-start"
              >
                <div className="text-2xl shrink-0 pt-0.5">{p.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-on-background text-sm group-hover:text-primary transition-colors duration-200">
                      {p.nama}
                    </h3>
                    <ProkerTag tag={p.tag} />
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{p.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent" />

        {/* ── DEPARTEMEN ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 bg-tertiary rounded-full shrink-0" />
            <h2 className="text-lg font-extrabold text-on-background whitespace-nowrap">Departemen</h2>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>
          <p className="text-sm text-on-surface-variant mb-8 pl-4">
            Klik tab <strong>Anggota</strong> atau <strong>Program Kerja</strong> untuk melihat detail tiap departemen.
          </p>

          <div className="flex flex-col gap-5">
            {departemen.map((dept) => (
              <DepartemenCard key={dept.id} dept={dept} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
