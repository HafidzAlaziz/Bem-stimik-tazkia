"use client";

import { motion } from "framer-motion";

const stats = [
  { id: 1, name: "Mahasiswa Aktif", value: "1.200+", icon: "groups", color: "primary" },
  { id: 2, name: "Proyek Teknologi", value: "150+", icon: "devices", color: "secondary" },
  { id: 3, name: "Total Prestasi", value: "85+", icon: "emoji_events", color: "tertiary" },
];

export default function StatistikKampus() {
  return (
    <section className="py-20 px-5 md:px-10 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Pencapaian STMIK Tazkia</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Angka-angka yang mencerminkan dedikasi, inovasi, dan prestasi mahasiswa dalam membangun ekosistem teknologi yang berdampak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-surface rounded-3xl p-8 border border-outline-variant/30 shadow-soft hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`material-symbols-outlined text-${stat.color} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-on-background mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className={`text-${stat.color} font-semibold text-lg`}>
                {stat.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
