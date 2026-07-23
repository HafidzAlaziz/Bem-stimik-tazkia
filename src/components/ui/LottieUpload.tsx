"use client";

import React, { useState, useRef } from "react";
import { FiUpload, FiX, FiLoader, FiPlayCircle, FiImage } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false, loading: () => <div className="w-full h-full bg-surface-variant/30 rounded-lg animate-pulse" /> }
);

interface LottieUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function LottieUpload({ value = "", onChange, className = "" }: LottieUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const isLottie = value.endsWith('.json') || value.endsWith('.lottie') || value.includes('lottiefiles.com') || value.includes('lottie');
  const isImage = value.startsWith('http') || value.startsWith('/') ? !isLottie : false;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isAllowed = file.type.startsWith("image/") || fileExt === 'json' || fileExt === 'lottie';

    if (!isAllowed) {
      setError("Format file harus Gambar (.png, .jpg, .svg) atau Lottie (.json, .lottie)");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create unique filename
      const fileName = `lottie_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `kabinet/${fileName}`;

      // Upload to supabase
      const { data, error: uploadError } = await supabase.storage
        .from("public_images")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: fileExt === 'json' ? 'application/json' : file.type
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("public_images")
        .getPublicUrl(filePath);

      onChange(publicUrl);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Gagal mengunggah file Lottie");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileChange({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*,.json,.lottie"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-outline-variant/30 aspect-square w-full max-w-[120px] bg-surface-variant/20 flex items-center justify-center p-2">
          {isLottie ? (
            <DotLottieReact src={value} loop autoplay />
          ) : isImage ? (
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
          ) : (
            <span className="text-3xl">{value}</span>
          )}

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md text-xs"
              title="Ganti File Lottie/Gambar"
              type="button"
            >
              <FiUpload />
            </button>
            <button
              onClick={handleRemove}
              className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md text-xs"
              title="Hapus"
              type="button"
            >
              <FiX />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={isUploading}
          className={`
            aspect-square w-full max-w-[120px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 p-2 transition-all text-center
            ${isUploading ? 'border-primary/50 bg-primary/5 text-primary' : ''}
            ${isDragging ? 'border-primary bg-primary/10 text-primary scale-105' : !isUploading ? 'border-outline-variant/50 bg-surface-variant/10 text-on-surface-variant hover:border-primary hover:bg-primary/5 hover:text-primary' : ''}
            ${error ? 'border-red-400 bg-red-50 text-red-500' : ''}
          `}
        >
          {isUploading ? (
            <FiLoader className="animate-spin text-xl" />
          ) : (
            <>
              <FiPlayCircle className="text-2xl opacity-70" />
              <span className="text-[10px] font-bold leading-tight">
                Upload Lottie (.json / .lottie)
              </span>
              <span className="text-[8px] opacity-60">atau tarik file ke sini</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-[10px] text-red-500 mt-1 font-medium absolute -bottom-5 left-0 whitespace-nowrap">{error}</p>
      )}
    </div>
  );
}
