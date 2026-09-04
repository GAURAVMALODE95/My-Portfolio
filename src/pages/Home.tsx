import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Capabilities } from "@/components/home/Capabilities";
import { ContactSection } from "@/components/home/ContactSection";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Stats } from "@/components/home/Stats";
import { WorkGallery } from "@/components/home/WorkGallery";
import { useSeo } from "@/hooks/useSeo";
import { scrollToId } from "@/lib/lenis";

export default function Home() {
  const location = useLocation();
  useSeo(
    "Gaurav Malode — Software Developer",
    "Secure financial software, from the mobile screen to the market-data layer. Flutter · React Native · React · Node.js · FastAPI.",
  );

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = setTimeout(() => scrollToId(id, -80), 550);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Stats />
      <WorkGallery />
      <ExperienceTimeline />
      <Capabilities />
      <Philosophy />
      <ContactSection />
    </>
  );
}
