import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

export const revalidate = 0;

export default async function AdminBeritaPage() {
  const supabase = await createClient();
  const { data: berita, error } = await supabase.from('berita').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kelola Berita</h2>
          <p className="text-gray-500">Daftar semua berita dan informasi yang dipublikasikan.</p>
        </div>
        <Link href="/admin/berita/new" className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
          <FiPlus /> Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="py-4 px-6 font-medium">Judul Berita</th>
                <th className="py-4 px-6 font-medium">Kategori</th>
                <th className="py-4 px-6 font-medium">Statistik</th>
                <th className="py-4 px-6 font-medium">Tanggal</th>
                <th className="py-4 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!berita || berita.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">Belum ada berita.</td>
                </tr>
              ) : (
                berita.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider">{item.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600 flex items-center gap-3">
                        <span title="Views">👁 {item.views}</span>
                        <span title="Likes" className="text-red-500">❤ {item.likes}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/berita/${item.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <FiEdit2 size={18} />
                        </Link>
                        <form action={async () => {
                          "use server";
                          const supabase = await createClient();
                          await supabase.from('berita').delete().eq('id', item.id);
                        }}>
                          <button type="submit" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                            <FiTrash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
