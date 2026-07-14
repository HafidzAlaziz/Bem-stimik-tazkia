export interface KabinetPengurusInti {
  name: string;
  role: string;
  ig: string;
  wa: string;
  initials: string;
  color: string;
  bg: string;
  foto?: string;
}

export interface KabinetProkerUtama {
  nama: string;
  deskripsi: string;
  icon: string;
  tag: string;
}

export interface KabinetDepartemenAnggota {
  name: string;
  role: string;
  initials: string;
  ig: string;
  wa: string;
  foto?: string;
}

export interface KabinetDepartemenProker {
  nama: string;
  deskripsi: string;
  tag: string;
}

export interface KabinetDepartemen {
  id: string;
  nama: string;
  singkatan: string;
  deskripsi: string;
  warna: string;
  warnaBg: string;
  icon: string; // emoji, image url, or lottie url
  anggota: KabinetDepartemenAnggota[];
  proker: KabinetDepartemenProker[];
}

export interface KabinetProfile {
  id: string;
  periode: string;
  nama_kabinet: string;
  visi: string;
  misi: string[];
  pengurus_inti: KabinetPengurusInti[];
  proker_utama: KabinetProkerUtama[];
  departemen: KabinetDepartemen[];
  is_active: boolean;
}
