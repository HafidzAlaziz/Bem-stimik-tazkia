"use client";

import React, { useState, useRef } from "react";
import { FiX, FiFileText, FiLoader } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileUpload({ 
  value, 
  onChange, 
  className = "", 
  accept = "*",
  maxSizeMB = 5 
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Ukuran maksimal ${maxSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("public_images")
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("public_images")
        .getPublicUrl(filePath);

      onChange(publicUrl);
      
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Gagal mengunggah file");
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
        accept={accept} 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />
      
      {value ? (
        <div className="flex items-center gap-3 p-3 border border-outline-variant/30 rounded-xl bg-surface-variant/20 max-w-sm">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FiFileText size={20} />
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-xs font-bold text-on-surface truncate">File terunggah</p>
            <a href={value} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline truncate block">Lihat Dokumen</a>
          </div>
          <button 
            onClick={handleRemove}
            className="w-8 h-8 rounded-full text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors"
            type="button"
          >
            <FiX />
          </button>
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
            w-full p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all
            ${isUploading ? 'border-primary/50 bg-primary/5 text-primary' : ''}
            ${isDragging ? 'border-primary bg-primary/10 text-primary scale-[1.02]' : !isUploading ? 'border-outline-variant/50 bg-surface-variant/10 text-on-surface-variant hover:border-primary hover:bg-primary/5 hover:text-primary' : ''}
            ${error ? 'border-red-400 bg-red-50 text-red-500' : ''}
          `}
        >
          {isUploading ? (
            <FiLoader className="animate-spin text-2xl" />
          ) : (
            <>
              <FiFileText className="text-2xl opacity-70" />
              <span className="text-sm font-bold mt-1">Upload File / Dokumen</span>
              <span className="text-xs opacity-70 font-medium">Klik atau drop file di sini (Max {maxSizeMB}MB)</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>
      )}
    </div>
  );
}
