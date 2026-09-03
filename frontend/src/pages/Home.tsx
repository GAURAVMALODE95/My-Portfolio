import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Capabilities } from "@/components/home/Capabilities";
import { ContactSection } from "@/components/home/ContactSection";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Ticker } from "@/components/home/Ticker";
import { WorkGallery } from "@/components/home/WorkGallery";
import { scrollToId } from "@/lib/lenis";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = setTimeout(() => scrollToId(id, -80), 550);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Ticker />
      <WorkGallery />
      <ExperienceTimeline />
      <Capabilities />
      <Philosophy />
      <ContactSection />
    </>
  );
}
