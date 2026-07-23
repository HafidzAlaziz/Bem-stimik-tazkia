"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false, loading: () => <div className="w-full h-full bg-surface-variant/30 rounded-lg animate-pulse" /> }
);

interface LottieIconProps {
  src: string;
  className?: string;
}

export default function LottieIcon({ src, className = "w-10 h-10" }: LottieIconProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-surface-variant/30 rounded-lg text-lg`}>
        🏢
      </div>
    );
  }

  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop
        autoplay
        onError={() => setHasError(true)}
      />
    </div>
  );
}
