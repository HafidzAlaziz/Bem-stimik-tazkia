import React from "react";
import { createClient } from "@/utils/supabase/server";
import { FiUsers, FiFileText, FiBriefcase, FiCalendar } from "react-icons/fi";

export const revalidate = 0; // Disable static caching for admin

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts
  const { count: beritaCount } = await supabase.from('berita').select('*', { count: 'exact', head: true });
  const { count: karyaCount } = await supabase.from('karya').select('*', { count: 'exact', head: true });
  const { count: agendaCount } = await supabase.from('agendas').select('*', { count: 'exact', head: true });

  const stats = [
    { label: "Total Berita", value: beritaCount || 0, icon: <FiFileText size={24} />, color: "bg-blue-50 text-blue-600" },
    { label: "Total Karya", value: karyaCount || 0, icon: <FiBriefcase size={24} />, color: "bg-purple-50 text-purple-600" },
    { label: "Total Agenda", value: agendaCount || 0, icon: <FiCalendar size={24} />, color: "bg-green-50 text-green-600" },
    { label: "Pengunjung", value: "2.4K", icon: <FiUsers size={24} />, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang, Admin! 👋</h2>
      <p className="text-gray-500 mb-8">Berikut adalah ringkasan data di website BEM STMIK Tazkia saat ini.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions or Recent Activities can go here */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Pusat Kendali</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">Pilih menu di sidebar sebelah kiri untuk mulai menambahkan atau mengedit konten website.</p>
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full">
          <FiFileText size={32} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
