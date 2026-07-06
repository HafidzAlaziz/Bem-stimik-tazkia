"use client";

import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 34,
    seconds: 44,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) {
                // Timer expired
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop bg-surface relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-primary to-[#102b5e] rounded-[2rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden text-white border border-white/10 animate-on-scroll animate-scale-up">
          {/* Inner decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
          
          <div className="relative z-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-6 tracking-wide">
              AGENDA TERDEKAT
            </span>
            <h2 className="font-display-lg text-4xl md:text-5xl font-extrabold mb-12 text-white">Menuju Pemira STMIK Tazkia 2026</h2>
            
            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto">
              <div className="timer-unit glass-panel !bg-white/10 !border-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-md group hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:!border-white/40 transition-all duration-300 cursor-default">
                <span className="font-display-lg text-3xl md:text-6xl text-white font-black drop-shadow-md group-hover:text-primary-container transition-colors duration-300" id="days">
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="font-label-md text-xs md:text-sm text-white/70 uppercase tracking-widest mt-2 group-hover:text-white transition-colors duration-300">Hari</span>
              </div>
              <div className="timer-unit glass-panel !bg-white/10 !border-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-md group hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:!border-white/40 transition-all duration-300 cursor-default">
                <span className="font-display-lg text-3xl md:text-6xl text-white font-black drop-shadow-md group-hover:text-primary-container transition-colors duration-300" id="hours">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="font-label-md text-xs md:text-sm text-white/70 uppercase tracking-widest mt-2 group-hover:text-white transition-colors duration-300">Jam</span>
              </div>
              <div className="timer-unit glass-panel !bg-white/10 !border-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-md group hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:!border-white/40 transition-all duration-300 cursor-default">
                <span className="font-display-lg text-3xl md:text-6xl text-white font-black drop-shadow-md group-hover:text-primary-container transition-colors duration-300" id="minutes">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="font-label-md text-xs md:text-sm text-white/70 uppercase tracking-widest mt-2 group-hover:text-white transition-colors duration-300">Menit</span>
              </div>
              <div className="timer-unit glass-panel !bg-white/10 !border-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-md group hover:scale-110 hover:-translate-y-2 hover:shadow-glow hover:!border-secondary/50 transition-all duration-300 cursor-default">
                <span className="font-display-lg text-3xl md:text-6xl text-secondary font-black drop-shadow-glow group-hover:text-[#ff984d] group-hover:scale-105 transition-all duration-300" id="seconds">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="font-label-md text-xs md:text-sm text-white/70 uppercase tracking-widest mt-2 group-hover:text-white transition-colors duration-300">Detik</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
