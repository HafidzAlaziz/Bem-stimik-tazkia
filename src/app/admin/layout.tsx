import React from "react";
import Link from "next/link";
import { FiHome, FiFileText, FiBriefcase, FiCalendar, FiLogOut } from "react-icons/fi";

export const metadata = {
  title: "Admin Dashboard - BEM STMIK Tazkia",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:h-screen md:sticky top-0 p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-10 pb-5 border-b border-gray-100">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">Admin BEM</h1>
            <p className="text-xs text-gray-500">STMIK Tazkia</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium text-sm">
            <FiHome size={18} /> Dashboard
          </Link>
          <Link href="/admin/berita" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium text-sm">
            <FiFileText size={18} /> Kelola Berita
          </Link>
          <Link href="/admin/karya" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium text-sm">
            <FiBriefcase size={18} /> Kelola Karya
          </Link>
          <Link href="/admin/agenda" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium text-sm">
            <FiCalendar size={18} /> Kelola Agenda
          </Link>
        </nav>

        <div className="pt-5 border-t border-gray-100 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
            <FiLogOut size={18} /> Keluar ke Web
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-10 max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
