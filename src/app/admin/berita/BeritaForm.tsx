import React from "react";
import { saveBerita } from "./actions";
import Link from "next/link";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function BeritaForm({ initialData = null }: { initialData?: any }) {
  return (
    <form action={saveBerita} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <Link href="/admin/berita" className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
      </div>

      {initialData && <input type="hidden" name="id" value={initialData.id} />}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita</label>
          <input 
            type="text" 
            name="title" 
            required 
            defaultValue={initialData?.title}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
            placeholder="Masukkan judul berita" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
            <input 
              type="text" 
              name="slug" 
              required 
              defaultValue={initialData?.slug}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
              placeholder="judul-berita-anda" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
            <select 
              name="category" 
              required 
              defaultValue={initialData?.category || "Kampus"}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="Kampus">Kampus</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Event">Event</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Banner (URL)</label>
          <input 
            type="url" 
            name="image_url" 
            required 
            defaultValue={initialData?.image_url}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
            placeholder="https://..." 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Pisahkan dengan koma)</label>
          <input 
            type="text" 
            name="tags" 
            defaultValue={initialData?.tags?.join(', ')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
            placeholder="Teknologi, Kampus, Inovasi" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Ringkasan (Excerpt)</label>
          <textarea 
            name="excerpt" 
            required 
            rows={3}
            defaultValue={initialData?.excerpt}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" 
            placeholder="Tuliskan ringkasan singkat berita..." 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Isi Konten Berita (HTML/Text)</label>
          <textarea 
            name="content" 
            required 
            rows={10}
            defaultValue={initialData?.content}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-sm" 
            placeholder="<p>Tulis paragraf pertama di sini...</p>" 
          />
        </div>

      </div>

      <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Link href="/admin/berita" className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">
          Batal
        </Link>
        <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <FiSave size={18} /> Simpan Berita
        </button>
      </div>
    </form>
  );
}
