"use client";

import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ProkerIcon({ icon }: { icon: string }) {
  if (icon.endsWith('.json') || icon.endsWith('.lottie')) {
    return <div className="w-10 h-10"><DotLottieReact src={icon} loop autoplay /></div>;
  } else if (icon.startsWith('http') || icon.startsWith('/')) {
    return <img src={icon} alt="Icon" className="w-10 h-10 object-contain" />;
  }
  return <span className="text-2xl">{icon}</span>;
}
