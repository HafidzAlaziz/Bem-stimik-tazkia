import Hero from "@/components/home/Hero";
import BeritaSorotan from "@/components/home/BeritaSorotan";
import KaryaProjek from "@/components/home/KaryaProjek";
import EventVolunteer from "@/components/home/EventVolunteer";
import SaranAduan from "@/components/home/SaranAduan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BEM STMIK Tazkia | Beranda",
  description: "Selamat datang di portal resmi BEM STMIK Tazkia. Satu langkah untuk STMIK Tazkia berdampak.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <KaryaProjek />
      <BeritaSorotan />
      <EventVolunteer showHeader={false} />
      <SaranAduan />
    </>
  );
}
