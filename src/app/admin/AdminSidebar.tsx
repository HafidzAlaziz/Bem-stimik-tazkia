"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFileText, FiBriefcase, FiCalendar, FiChevronLeft, FiChevronRight, FiCheckCircle, FiUsers } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Kelola Berita", href: "/admin/berita", icon: FiFileText },
  { name: "Kelola Karya", href: "/admin/karya", icon: FiBriefcase },
  { name: "Kelola Agenda", href: "/admin/agenda", icon: FiCalendar },
  { name: "Manajemen User", href: "/admin/users", icon: FiUsers },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`transition-all duration-300 ease-in-out bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border-r border-outline-variant/30 md:h-screen md:sticky top-0 flex flex-col shadow-sm w-full relative z-20 ${
        isCollapsed ? "md:w-24" : "md:w-72"
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-4 top-10 w-8 h-8 bg-surface border border-outline-variant/30 shadow-sm rounded-full items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors z-30"
      >
        {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
      </button>

      {/* Header Logo */}
      <div className={`p-6 md:p-8 flex items-center mb-4 transition-all duration-300 ${isCollapsed ? "justify-center px-4" : "gap-4"}`}>
        <div className="w-12 h-12 bg-surface rounded-2xl shadow-sm border border-outline-variant/20 flex items-center justify-center shrink-0">
          <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-bold text-on-surface text-lg tracking-tight leading-tight">Admin BEM</h1>
            <p className="text-xs text-primary font-medium uppercase tracking-widest mt-0.5">Portal Inovasi</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto space-y-1.5 ${isCollapsed ? "px-3" : "px-4 md:px-6"}`}>
        {!isCollapsed && (
          <p className="px-4 text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider mb-4 mt-2 whitespace-nowrap">Menu Utama</p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href + "/"));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : ""}
              className={`flex items-center rounded-xl transition-all duration-300 font-semibold text-sm group relative overflow-hidden ${
                isCollapsed ? "justify-center py-3.5 px-0" : "gap-3 px-4 py-3.5"
              } ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface hover:text-primary hover:shadow-sm"
              }`}
            >
              {isActive && !isCollapsed && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
              )}
              <Icon size={20} className={`shrink-0 ${isActive ? "text-white" : "text-on-surface-variant/70 group-hover:text-primary"}`} /> 
              {!isCollapsed && <span className="relative z-10 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
