import React from "react";
import { notFound } from "next/navigation";
import { getKegiatanById } from "@/app/admin/kegiatan/actions";
import ApplyClientForm from "./ApplyClientForm";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agenda = await getKegiatanById(id);
  if (!agenda || agenda.type !== 'volunteer') {
    return { title: "Pendaftaran Tidak Ditemukan - BEM STMIK Tazkia" };
  }
  return {
    title: `Daftar ${agenda.title} - BEM STMIK Tazkia`,
    description: `Formulir pendaftaran untuk posisi ${agenda.title}`,
  };
}

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agenda = await getKegiatanById(id);

  if (!agenda || agenda.type !== 'volunteer') {
    notFound();
  }

  // Cek apakah pendaftaran sudah ditutup
  const isClosed = agenda.deadline && new Date(agenda.deadline).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

  return (
    <div className="bg-[#f8f9fc] min-h-screen pt-32 pb-20 font-sans">
      <ApplyClientForm agenda={agenda} isClosed={!!isClosed} />
    </div>
  );
}
