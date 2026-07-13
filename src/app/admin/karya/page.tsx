"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FiCheck, FiX, FiEye } from "react-icons/fi";

export default function KaryaApprovalPage() {
  const supabase = createClient();
  const [karyaList, setKaryaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Reject modal state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const fetchKarya = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('karya')
      .select('*, profiles:user_id(full_name)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (!error && data) setKaryaList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKarya();
  }, []);

  const handleApprove = async (id: string) => {
    if (!confirm("Yakin ingin menyetujui karya ini?")) return;
    
    await supabase
      .from('karya')
      .update({ status: 'approved' })
      .eq('id', id);
      
    fetchKarya();
  };

  const handleReject = async () => {
    if (!rejectingId || !rejectReason.trim()) return;

    await supabase
      .from('karya')
      .update({ 
        status: 'rejected',
        reject_reason: rejectReason 
      })
      .eq('id', rejectingId);
      
    setRejectingId(null);
    setRejectReason("");
    fetchKarya();
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface">Persetujuan Karya</h2>
        <p className="text-on-surface-variant">Daftar karya inovasi mahasiswa yang menunggu persetujuan (pending).</p>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-variant/20 text-on-surface-variant text-sm border-b border-outline-variant/20">
                <th className="py-4 px-6 font-medium">Judul Karya</th>
                <th className="py-4 px-6 font-medium">Pengunggah</th>
                <th className="py-4 px-6 font-medium">Kategori</th>
                <th className="py-4 px-6 font-medium">Tanggal</th>
                <th className="py-4 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-on-surface-variant/70">Loading...</td>
                </tr>
              ) : karyaList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-on-surface-variant/70">Tidak ada karya yang menunggu persetujuan.</td>
                </tr>
              ) : (
                karyaList.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-surface-variant/20/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-on-surface line-clamp-1">{item.title}</div>
                      <div className="text-xs text-on-surface-variant line-clamp-1">{item.description}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-on-surface-variant">
                      {item.profiles?.full_name || 'Unknown User'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-surface-variant/30 text-on-surface-variant px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider">{item.category}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-on-surface-variant">
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(item.id)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                          <FiCheck /> Terima
                        </button>
                        <button 
                          onClick={() => setRejectingId(item.id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                          <FiX /> Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-outline-variant/20">
              <h3 className="text-lg font-bold text-on-surface">Tolak Karya</h3>
              <p className="text-sm text-on-surface-variant mt-1">Berikan alasan penolakan agar pengunggah tahu kekurangannya.</p>
            </div>
            <div className="p-6">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Misal: Link github tidak valid, atau deskripsi kurang jelas..."
                className="w-full p-3 bg-surface-variant/20 border border-outline-variant/30 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 resize-none min-h-[100px]"
              />
            </div>
            <div className="px-6 py-4 bg-surface-variant/20 border-t border-outline-variant/20 flex justify-end gap-3">
              <button 
                onClick={() => { setRejectingId(null); setRejectReason(""); }}
                className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
