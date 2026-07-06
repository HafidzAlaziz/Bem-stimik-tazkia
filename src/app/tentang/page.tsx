import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - BEM STMIK Tazkia",
  description: "Profil dan sejarah Badan Eksekutif Mahasiswa STMIK Tazkia.",
};

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section Tentang */}
      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto mb-20 relative pt-12 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-primary font-label-md mb-6 animate-init-fade-up">
          <span className="material-symbols-outlined text-[18px]">info</span>
          Mengenal Lebih Dekat
        </div>
        
        <h1 className="font-display-lg text-4xl md:text-6xl text-on-background mb-6 animate-init-fade-up anim-delay-100 font-extrabold leading-tight">
          Sejarah & Perjalanan <br/>
          <span className="text-primary">BEM STMIK Tazkia</span>
        </h1>
        
        <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed animate-init-fade-up anim-delay-200 text-lg">
          Berdiri sebagai pilar pergerakan mahasiswa yang progresif dan inklusif. Kami berdedikasi untuk menciptakan ruang kolaborasi yang positif bagi seluruh sivitas akademika kampus.
        </p>
      </section>

      {/* Sejarah Singkat */}
      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto mb-32">
        <div className="glass-panel p-8 md:p-16 rounded-card shadow-soft relative overflow-hidden animate-on-scroll animate-fade-up">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-background mb-6 font-bold">Awal Mula Pergerakan</h2>
              <div className="space-y-4 font-body-lg text-on-surface-variant leading-relaxed text-slate-600 dark:text-slate-400">
                <p>
                  BEM STMIK Tazkia dibentuk atas dasar kesadaran mahasiswa akan pentingnya sebuah wadah yang tidak hanya berfungsi sebagai penyalur aspirasi, tetapi juga sebagai motor penggerak inovasi teknologi dan dakwah di lingkungan kampus.
                </p>
                <p>
                  Sejak didirikan, kami terus bertransformasi menyesuaikan diri dengan perkembangan zaman, mengedepankan nilai-nilai keislaman, keilmuan, dan kepemimpinan dalam setiap program kerja yang dirancang.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-surface-variant rounded-2xl overflow-hidden shadow-lg group">
                <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                  {/* Placeholder for History Image/Video */}
                  <span className="material-symbols-outlined text-6xl text-primary/50 group-hover:scale-110 transition-transform duration-500">history_edu</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl animate-on-scroll delay-200">
                <span className="block font-display-lg text-4xl text-secondary mb-1 font-black">5+</span>
                <span className="font-label-md text-on-surface-variant">Tahun Berdiri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi Lengkap */}
      <section className="px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16 animate-on-scroll animate-fade-up">
          <h2 className="font-display-lg text-4xl md:text-5xl text-on-background mb-4 font-bold">Arah Gerak Kami</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Fondasi dan komitmen yang menjadi kompas dalam setiap langkah BEM STMIK Tazkia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-card p-10 border border-outline-variant/30 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group animate-on-scroll animate-fade-up delay-100">
            <div className="w-16 h-16 bg-primary-container text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h3 className="font-headline-lg text-2xl text-on-background mb-4 group-hover:text-primary transition-colors font-bold">Visi</h3>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Mewujudkan BEM STMIK Tazkia sebagai inisiator pergerakan yang progresif, inklusif, dan berdampak nyata bagi sivitas akademika dan masyarakat berbasis data dan keilmuan statistik.
            </p>
          </div>

          <div className="bg-surface rounded-card p-10 border border-outline-variant/30 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 group animate-on-scroll animate-fade-up delay-200">
            <div className="w-16 h-16 bg-secondary-container text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">format_list_bulleted</span>
            </div>
            <h3 className="font-headline-lg text-2xl text-on-background mb-4 group-hover:text-secondary transition-colors font-bold">Misi</h3>
            <ul className="space-y-4 font-body-lg text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1 shrink-0">check_circle</span>
                <span>Membangun sinergi internal BEM yang solid, transparan, dan profesional.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1 shrink-0">check_circle</span>
                <span>Menyelenggarakan program kerja berbasis teknologi informasi dan dakwah yang inovatif.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1 shrink-0">check_circle</span>
                <span>Menjadi wadah aspirasi yang responsif terhadap kebutuhan mahasiswa STMIK Tazkia.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
