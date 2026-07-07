"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiArrowRight, FiHeart, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";

const categories = [
  "All Projects",
  "Technology",
  "Community service",
  "Research",
  "UI/UX",
  "Programming",
];

const mockProjects = [
  {
    id: 1,
    category: "TECHNOLOGY",
    title: "Autonomous Campus Rover",
    description: "A self-navigating delivery robot designed for intra-campus logistics and medicine transport.",
    date: "Jan 2024",
    image: "https://picsum.photos/seed/rover/600/400",
    likes: 145,
    views: 1205,
  },
  {
    id: 2,
    category: "UI/UX",
    title: "Student Portal Redesign",
    description: "User-centric overhaul of the digital student experience, improving accessibility and navigation.",
    date: "Sept 2023",
    image: "https://picsum.photos/seed/portal/600/400",
    likes: 312,
    views: 2840,
  },
  {
    id: 3,
    category: "RESEARCH",
    title: "Sustainable Energy Audit",
    description: "Comprehensive analysis of campus energy consumption patterns with optimization proposals.",
    date: "Aug 2023",
    image: "https://picsum.photos/seed/energy/600/400",
    likes: 89,
    views: 654,
  },
  {
    id: 4,
    category: "PROGRAMMING",
    title: "Block-Chain Voting System",
    description: "A secure, transparent e-voting platform for student organization elections using Web3 tech.",
    date: "July 2023",
    image: "https://picsum.photos/seed/blockchain/600/400",
    likes: 275,
    views: 1930,
  },
  {
    id: 5,
    category: "COMMUNITY SERVICE",
    title: "Digital Literacy Workshop",
    description: "Empowering local SMEs with essential digital marketing and cybersecurity skills.",
    date: "June 2023",
    image: "https://picsum.photos/seed/workshop/600/400",
    likes: 198,
    views: 1420,
  },
  {
    id: 6,
    category: "MULTIMEDIA",
    title: "Virtual Campus Tour 360",
    description: "An immersive VR experience allowing prospective students to explore campus facilities remotely.",
    date: "May 2023",
    image: "https://picsum.photos/seed/vrtour/600/400",
    likes: 420,
    views: 3100,
  },
];

export default function KaryaInovasiPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter projects based on category and search
  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "All Projects" ||
      project.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Karya & Inovasi
          </h1>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl leading-relaxed">
            Discover a collection of student-led initiatives, technological breakthroughs, and innovative research driving our campus community forward.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[var(--color-primary)] text-white shadow-md"
                    : "bg-white text-[var(--color-on-surface-variant)] border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(27,64,134,0.08)] transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[var(--color-secondary)] text-xs font-bold tracking-wider uppercase mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[var(--color-on-surface-variant)] text-sm mb-6 line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-auto mb-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1.5 group/stat cursor-pointer hover:text-red-500 transition-colors">
                      <FiHeart className="text-gray-400 group-hover/stat:text-red-500 transition-colors" />
                      <span>{project.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 group/stat cursor-pointer hover:text-blue-500 transition-colors">
                      <FiEye className="text-gray-400 group-hover/stat:text-blue-500 transition-colors" />
                      <span>{project.views}</span>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-400 text-sm">{project.date}</span>
                    <Link
                      href={`/karya/${project.id}`}
                      className="text-[var(--color-primary)] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      View Details <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-500">No projects found matching your criteria.</h3>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > 0 && (
          <div className="flex justify-center items-center gap-2">
            <button className="px-4 py-2 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors">
              Previous
            </button>
            {[1, 2, 3, "...", 9].map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[var(--color-primary)] text-white"
                    : page === "..."
                    ? "text-gray-400 cursor-default"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors">
              Next
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
