import Hero from "@/components/home/Hero";
import BeritaSorotan from "@/components/home/BeritaSorotan";
import KaryaProjek from "@/components/home/KaryaProjek";
import EventVolunteer from "@/components/home/EventVolunteer";
import SaranAduan from "@/components/home/SaranAduan";
import { Metadata } from "next";
import { getKegiatans } from "@/app/admin/kegiatan/actions";
import { AgendaKegiatan } from "@/types/agenda";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "BEM STMIK Tazkia | Beranda",
  description: "Selamat datang di portal resmi BEM STMIK Tazkia. Satu langkah untuk STMIK Tazkia berdampak.",
};

export default async function Home() {
  const supabase = await createClient();
  const { data: topKaryaData } = await supabase
    .from('karya')
    .select('*')
    .eq('status', 'approved')
    .order('likes', { ascending: false })
    .order('views', { ascending: false })
    .limit(3);

  const agendas = await getKegiatans();
  const publishedAgendas = agendas.filter(a => a.is_published);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const liveEvents: AgendaKegiatan[] = [];
  const upcomingEvents: AgendaKegiatan[] = [];
  const pastEvents: AgendaKegiatan[] = [];
  const volunteerOpportunities: AgendaKegiatan[] = [];

  for (const agenda of publishedAgendas) {
    if (agenda.type === 'event') {
      const eventDate = agenda.date ? new Date(agenda.date) : new Date();
      eventDate.setHours(0, 0, 0, 0);

      // Past event
      if (eventDate.getTime() < today.getTime()) {
        pastEvents.push(agenda);
      } 
      // Live event (Today)
      else if (eventDate.getTime() === today.getTime()) {
        liveEvents.push(agenda);
      } 
      // Upcoming event
      else {
        upcomingEvents.push(agenda);
      }
    } else if (agenda.type === 'volunteer') {
      const deadlineDate = agenda.deadline ? new Date(agenda.deadline) : new Date();
      deadlineDate.setHours(0, 0, 0, 0);

      if (deadlineDate.getTime() >= today.getTime()) {
        volunteerOpportunities.push(agenda);
      }
    }
  }

  return (
    <>
      <Hero />
      <KaryaProjek karyaList={topKaryaData || []} />
      <BeritaSorotan />
      <EventVolunteer 
        showHeader={false} 
        liveEvents={liveEvents}
        upcomingEvents={upcomingEvents}
        volunteerOpportunities={volunteerOpportunities}
        pastEvents={pastEvents}
      />
      <SaranAduan />
    </>
  );
}

