"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHome, FiLogOut } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";

export default function AdminTopbar({ user }: { user?: any }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const fullName = user?.user_metadata?.full_name || "BEM Tazkia";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-end gap-6 sticky top-0 z-10">
      
      {/* Profile Card */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-900 leading-tight">{fullName}</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 shrink-0 object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold border border-blue-100 shrink-0">
            {initial}
          </div>
        )}
      </div>

      <div className="w-px h-8 bg-gray-200"></div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link 
          href="/" 
          title="Kembali ke Web"
          className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200 shadow-sm"
        >
          <FiHome size={18} />
        </Link>
        <button 
          onClick={handleLogout}
          title="Logout"
          className="flex items-center justify-center w-10 h-10 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-100 shadow-sm"
        >
          <FiLogOut size={18} />
        </button>
      </div>

    </header>
  );
}
