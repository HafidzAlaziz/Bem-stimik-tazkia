import React from "react";
import LottieIcon from "@/components/ui/LottieIcon";

export default function ProkerIcon({ icon }: { icon: string }) {
  if (!icon) return <span className="text-2xl">📋</span>;
  if (icon.endsWith('.json') || icon.endsWith('.lottie') || icon.includes('lottiefiles.com')) {
    return <LottieIcon src={icon} className="w-10 h-10" />;
  } else if (icon.startsWith('http') || icon.startsWith('/')) {
    return <img src={icon} alt="Icon" className="w-10 h-10 object-contain" />;
  }
  return <span className="text-2xl">{icon}</span>;
}
