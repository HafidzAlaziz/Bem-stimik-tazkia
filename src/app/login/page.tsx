"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Ini halaman demonstrasi. Sistem belum terhubung ke database.");
  };

  return (
    <main className="min-h-screen bg-surface-variant/30 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 sm:p-10 relative z-10 border border-outline-variant/20 animate-fade-up">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md mb-6">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali
        </Link>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center p-3 mb-5 shadow-inner">
            <img src="/logo.png" alt="Logo BEM" className="w-full h-full object-contain hover:scale-105 transition-transform" />
          </div>
          <h1 className="text-2xl font-display-md text-on-background mb-1.5 font-bold">Selamat Datang 👋</h1>
          <p className="text-sm text-on-surface-variant">Silakan masuk ke portal internal pengurus.</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Email/NIM Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-background uppercase tracking-wider">NIM / Email</label>
            <div className="flex items-center w-full rounded-xl border border-outline-variant/40 bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all px-4 py-3.5 gap-3">
              <span className="material-symbols-outlined text-outline text-[20px] shrink-0">person</span>
              <input type="text" required placeholder="Masukkan NIM atau Email" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm text-on-background" />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-background uppercase tracking-wider">Kata Sandi</label>
            <div className="flex items-center w-full rounded-xl border border-outline-variant/40 bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all px-4 py-3.5 gap-3">
              <span className="material-symbols-outlined text-outline text-[20px] shrink-0">lock</span>
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="Masukkan kata sandi" 
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm text-on-background" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-outline hover:text-primary transition-colors focus:outline-none flex items-center justify-center shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between mt-1 mb-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-outline-variant/50 text-primary focus:ring-primary transition-all cursor-pointer" />
              <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">Ingat Saya</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Hubungi Menteri Ristek untuk reset password.'); }} className="text-sm font-bold text-primary hover:text-secondary transition-colors">Lupa Sandi?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 cursor-pointer">
            Masuk Sekarang
            <span className="material-symbols-outlined text-[18px]">login</span>
          </button>

        </form>

      </div>
    </main>
  );
}
