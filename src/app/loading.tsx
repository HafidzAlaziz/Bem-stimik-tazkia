"use client";

import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center py-24 px-4 gap-4 animate-init-fade-up">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-on-surface-variant animate-pulse">Sedang mengambil data...</p>
    </div>
  );
}
