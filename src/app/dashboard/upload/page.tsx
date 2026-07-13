"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { FiPlus, FiTrash2, FiSend, FiArrowLeft, FiLoader } from "react-icons/fi";
import Link from "next/link";

const KATEGORI_OPTIONS = ["Technology", "UI/UX", "Research", "Programming", "Community Service", "Multimedia"];

export default function UploadKaryaPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
    features: [
      { title: "", desc: "" }
    ],
    team: [
      { name: "", role: "" }
    ],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFitur = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, features: updated }));
  };

  const handleTim = (index: number, field: "name" | "role", value: string) => {
    const updated = [...formData.team];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, team: updated }));
  };

  const addFitur = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, { title: "", desc: "" }] }));
  }

  const removeFitur = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  }

  const addAnggota = () => {
    setFormData(prev => ({ ...prev, team: [...prev.team, { name: "", role: "" }] }));
  };

  const removeAnggota = (index: number) => {
    setFormData(prev => ({ ...prev, team: prev.team.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Anda harus login untuk upload karya.");

      // Clean up tech stack string to array
      const techStackArray = formData.tech_stack.split(',').map(item => item.trim()).filter(Boolean);

      // Clean up team to array of strings for simplicity if needed, or store as JSON. 
      // Based on schema, team is TEXT[]. Let's format it as "Name (Role)".
      const teamArray = formData.team.map(member => `${member.name} (${member.role})`).filter(m => m !== ' ()');

      const { error } = await supabase.from('karya').insert({
        user_id: user.id,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6),
        category: formData.category,
        description: formData.description,
        tech_stack: techStackArray,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        team: teamArray,
        features: formData.features.filter(f => f.title.trim() !== ""),
        status: 'pending',
        image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', // Placeholder
      });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
      
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Terjadi kesalahan saat upload karya.");
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-surface-variant/20 border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] transition-all";
  const labelClass = "block text-sm font-semibold text-on-surface mb-1.5";

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-[var(--color-primary)] transition-colors text-sm font-medium mb-4">
            <FiArrowLeft /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">
            Upload Karya Baru
          </h1>
          <p className="text-on-surface-variant">
            Lengkapi formulir di bawah ini untuk mengajukan karyamu agar dapat direview oleh BEM.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface p-6 md:p-8 rounded-3xl shadow-sm border border-outline-variant/20 space-y-8">
          
          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
              {errorMsg}
            </div>
          )}

          {/* Informasi Utama */}
          <div>
            <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Informasi Utama
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Judul Karya <span className="text-red-400">*</span></label>
                <input name="title" type="text" required value={formData.title} onChange={handleInput} placeholder="Contoh: Smart Campus Navigation System" className={inputClass} />
              </div>
              
              <div>
                <label className={labelClass}>Kategori <span className="text-red-400">*</span></label>
                <select name="category" required value={formData.category} onChange={handleInput} className={inputClass}>
                  <option value="">Pilih kategori...</option>
                  {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Deskripsi / Abstrak <span className="text-red-400">*</span></label>
                <textarea name="description" required rows={4} value={formData.description} onChange={handleInput} placeholder="Jelaskan latar belakang, tujuan, dan hasil dari proyekmu..." className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>

          {/* Tech & Links */}
          <div>
            <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Tech Stack & Tautan
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Tech Stack</label>
                <input name="tech_stack" type="text" value={formData.tech_stack} onChange={handleInput} placeholder="Contoh: React, Next.js, Python (pisahkan dengan koma)" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GitHub Repository</label>
                  <input name="github_url" type="url" value={formData.github_url} onChange={handleInput} placeholder="https://github.com/..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Live Demo / Link Karya</label>
                  <input name="live_url" type="url" value={formData.live_url} onChange={handleInput} placeholder="https://..." className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* Fitur Utama */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Fitur Utama
              </h3>
              <button type="button" onClick={addFitur} className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                <FiPlus size={14} /> Tambah Fitur
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((fitur, i) => (
                <div key={i} className="bg-surface-variant/20 rounded-2xl p-4 border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wide">Fitur {i + 1}</p>
                    {i > 0 && (
                      <button type="button" onClick={() => removeFitur(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <input type="text" value={fitur.title} onChange={(e) => handleFitur(i, "title", e.target.value)} placeholder={`Nama fitur ${i + 1}...`} className={inputClass} />
                    <textarea rows={2} value={fitur.desc} onChange={(e) => handleFitur(i, "desc", e.target.value)} placeholder="Deskripsi singkat fitur ini..." className={`${inputClass} resize-none`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anggota Tim */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-[var(--color-secondary)] rounded-full block" /> Anggota Tim
              </h3>
              {formData.team.length < 5 && (
                <button type="button" onClick={addAnggota} className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                  <FiPlus size={14} /> Tambah Anggota
                </button>
              )}
            </div>
            <div className="space-y-3">
              {formData.team.map((anggota, i) => (
                <div key={i} className="bg-surface-variant/20 rounded-2xl p-4 border border-outline-variant/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wide">{i === 0 ? "Project Lead" : `Anggota ${i + 1}`}</p>
                    {i > 0 && (
                      <button type="button" onClick={() => removeAnggota(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={anggota.name} onChange={e => handleTim(i, "name", e.target.value)} placeholder="Nama Lengkap" className={inputClass} />
                    <input type="text" value={anggota.role} onChange={e => handleTim(i, "role", e.target.value)} placeholder="Peran (Cth: UI Designer)" className={inputClass} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-[var(--color-primary)] text-white font-extrabold rounded-2xl hover:bg-[var(--color-primary)]/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isLoading ? <FiLoader className="animate-spin" size={18} /> : <FiSend size={18} />}
              {isLoading ? 'Mengirim Data...' : 'Kirim Pengajuan Karya'}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
