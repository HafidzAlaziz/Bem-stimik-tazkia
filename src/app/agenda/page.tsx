"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FiSearch, 
  FiCalendar, 
  FiMapPin, 
  FiArrowRight, 
  FiClock, 
  FiFilter,
  FiCheckCircle
} from "react-icons/fi";
import { agendas, categories } from "../../data/agendas";

// Mock Data Volunteer
const volunteerOpportunities = [
  {
    id: "1",
    category: "KOORDINASI ACARA",
    title: "Sponsorship Liaison",
    desc: "Responsible for securing funding/partnerships for student events, facilitating communication and negotiation with respective parties.",
    deadline: "31 Jan 2025",
    isUrgent: true,
    imgUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    category: "KREATIF & KONTEN",
    title: "Content Creator",
    desc: "Creating engaging visual content for social media platforms, including design of HTML, CSS, and social media assets.",
    deadline: "15 Feb 2025",
    isUrgent: false,
    imgUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    category: "TEKNOLOGI & WEB",
    title: "Web Developer Assistant",
    desc: "Assist in maintaining and developing features for the BEM website. Knowledge of HTML, CSS, or JavaScript is required.",
    deadline: "20 Feb 2025",
    isUrgent: false,
    imgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState<"event" | "volunteer">("event");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  // Filter Logic untuk Agenda
  const filteredAgendas = useMemo(() => {
    return agendas.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "Semua" || 
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Pagination Logic
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredAgendas.length / ITEMS_PER_PAGE) || 1;
  const paginatedAgendas = filteredAgendas.slice(
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
    <div className="flex flex-col min-h-screen bg-background pt-24 pb-20 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <main className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto w-full pt-8">
        
        {/* Header */}
        <header className="mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-container text-secondary font-semibold text-xs uppercase tracking-wider mb-4">
            Event & Rekrutmen
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-4 font-black tracking-tight leading-none">
            Agenda Kegiatan BEM
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-base md:text-lg font-light leading-relaxed">
            Ikuti berbagai acara, kompetisi, dan program rekrutmen terbaru yang diselenggarakan oleh BEM STMIK Tazkia.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 mb-8 border-b border-outline-variant/30 pb-2 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveTab("event")}
            className={`pb-2 px-2 text-lg font-bold transition-all whitespace-nowrap ${
              activeTab === "event" ? "text-primary border-b-4 border-primary" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Agenda & Event
          </button>
          <button 
            onClick={() => setActiveTab("volunteer")}
            className={`pb-2 px-2 text-lg font-bold transition-all whitespace-nowrap ${
              activeTab === "volunteer" ? "text-primary border-b-4 border-primary" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Open Recruitment / Volunteer
          </button>
        </div>

        {activeTab === "event" && (
          <>
            {/* Filter and Search Section */}
            <section className="mb-10 bg-white border border-outline-variant/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <FiSearch size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Cari agenda atau event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-outline-variant/40 rounded-xl text-sm placeholder-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
                <FiFilter className="text-on-surface-variant shrink-0 mr-1" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface-variant/45 text-on-surface-variant hover:bg-surface-variant/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Grid Content Agenda */}
            {paginatedAgendas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedAgendas.map((agenda, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    key={agenda.id}
                  >
                    <Link 
                      href={`/agenda/${agenda.id}`}
                      className="group bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="h-48 overflow-hidden bg-surface-variant relative shrink-0">
                        <img src={agenda.imgUrl} alt={agenda.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {agenda.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="font-bold text-lg md:text-xl text-on-background group-hover:text-primary transition-colors mb-4 line-clamp-2">
                          {agenda.title}
                        </h4>
                        
                        <div className="flex flex-col gap-2 text-sm text-on-surface-variant mb-6 flex-grow">
                          <span className="flex items-center gap-2">
                            <FiCalendar size={14} className="text-primary shrink-0" /> {agenda.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <FiClock size={14} className="text-primary shrink-0" /> {agenda.time}
                          </span>
                          <span className="flex items-center gap-2">
                            <FiMapPin size={14} className="text-primary shrink-0" /> {agenda.location}
                          </span>
                        </div>

                        <div className="flex items-center justify-end pt-4 border-t border-outline-variant/20 mt-auto">
                          <span className="text-primary text-sm font-bold group-hover:text-secondary transition-colors flex items-center gap-1.5">
                            Detail Event <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-outline-variant/30 rounded-3xl shadow-sm">
                <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">event_busy</span>
                <h3 className="text-xl font-bold text-primary mb-2">Agenda Tidak Ditemukan</h3>
                <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
                  Tidak ada agenda atau event yang sesuai dengan filter/pencarian Anda.
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-primary disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
                >
                  Previous
                </button>
                {getPageNumbers().map((page, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-primary disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB VOLUNTEER                                             */}
        {/* ========================================================= */}
        {activeTab === "volunteer" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {volunteerOpportunities.map((vol, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={vol.id}
              >
                <div className="group bg-white border border-outline-variant/30 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="h-40 overflow-hidden bg-surface-variant relative shrink-0">
                    <img src={vol.imgUrl} alt={vol.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {vol.isUrgent && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <FiClock size={10} /> SEGERA
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-2">{vol.category}</span>
                    <h4 className="font-bold text-lg text-on-background group-hover:text-primary transition-colors mb-2">{vol.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">{vol.desc}</p>

                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-5">
                      <FiClock size={14} className="text-primary" />
                      <span>Deadline: <span className="font-semibold text-on-background">{vol.deadline}</span></span>
                    </div>

                    <Link href={`/volunteer/${vol.id}`}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-3 rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 mt-auto"
                    >
                      <FiCheckCircle size={16} /> Apply Posisi
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
