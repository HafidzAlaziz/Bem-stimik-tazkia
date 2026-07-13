import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { FiPlus, FiAlertCircle, FiCheckCircle, FiClock, FiFileText } from "react-icons/fi";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function UserDashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get user's karya
  const { data: karyaList } = await supabase
    .from("karya")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2">
              Dashboard Karya
            </h1>
            <p className="text-on-surface-variant">
              Halo, <span className="font-semibold text-on-surface">{profile?.full_name || 'User'}</span>. Kelola dan pantau status karya inovasimu di sini.
            </p>
          </div>
          <Link 
            href="/dashboard/upload" 
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--color-primary)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <FiPlus size={20} /> Upload Karya Baru
          </Link>
        </div>

        {/* Karya List */}
        <div className="bg-surface rounded-3xl shadow-sm border border-outline-variant/30 p-6 md:p-8">
          <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <FiFileText className="text-[var(--color-secondary)]" /> Karya Saya
          </h2>

          {!karyaList || karyaList.length === 0 ? (
            <div className="text-center py-16 bg-surface-variant/20 rounded-2xl border border-dashed border-outline-variant/50">
              <div className="w-16 h-16 bg-surface-variant/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFileText size={24} className="text-on-surface-variant/50" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Belum Ada Karya</h3>
              <p className="text-on-surface-variant mb-6 max-w-sm mx-auto text-sm">
                Kamu belum mengunggah karya apapun. Yuk, bagikan inovasimu sekarang juga!
              </p>
              <Link 
                href="/dashboard/upload" 
                className="inline-flex items-center gap-2 bg-surface border border-outline-variant/50 text-on-surface px-5 py-2.5 rounded-xl font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
              >
                Upload Karya Pertamamu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {karyaList.map((karya) => (
                <div key={karya.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-outline-variant/30 hover:border-outline-variant/60 hover:bg-surface-variant/20 transition-all gap-4">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-on-surface">{karya.title}</h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-surface-variant text-on-surface-variant uppercase tracking-wider">
                        {karya.category}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-1 mb-2">
                      {karya.description}
                    </p>
                    <div className="text-xs text-on-surface-variant/70">
                      Diunggah pada {new Date(karya.created_at).toLocaleDateString('id-ID')}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col md:items-end gap-2">
                    {/* Status Badge */}
                    {karya.status === 'pending' && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 font-semibold text-sm border border-amber-100 w-fit">
                        <FiClock size={16} /> Menunggu Review
                      </div>
                    )}
                    {karya.status === 'approved' && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-600 font-semibold text-sm border border-green-100 w-fit">
                        <FiCheckCircle size={16} /> Disetujui
                      </div>
                    )}
                    {karya.status === 'rejected' && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-semibold text-sm border border-red-100 w-fit">
                          <FiAlertCircle size={16} /> Ditolak
                        </div>
                      </div>
                    )}
                  </div>

                  {karya.status === 'rejected' && karya.reject_reason && (
                    <div className="w-full mt-2 md:mt-0 md:w-auto md:max-w-xs md:ml-4 bg-red-50 p-3 rounded-xl border border-red-100 text-xs text-red-700">
                      <strong>Alasan:</strong> {karya.reject_reason}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
