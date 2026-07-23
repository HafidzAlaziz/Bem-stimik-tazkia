"use client";

import React from "react";
import LoadingIndicator from "@/components/layout/LoadingIndicator";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center py-24 px-4 animate-init-fade-up">
      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-xl shadow-soft animate-bounce">
          BEM
        </div>
        <LoadingIndicator />
      </div>
    </div>
  );
}
