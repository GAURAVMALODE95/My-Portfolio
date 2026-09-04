import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Capabilities } from "@/components/home/Capabilities";
import { ContactSection } from "@/components/home/ContactSection";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { WorkGallery } from "@/components/home/WorkGallery";
import { useSeo } from "@/hooks/useSeo";
import { scrollToId } from "@/lib/lenis";

export default function Home() {
  const location = useLocation();
  useSeo(
    "Gaurav Malode — Software Developer",
    "Gaurav Malode is a software developer in Nashik, India, building secure financial software — Flutter and React Native apps for fintech and enterprise banking, desktop market terminals, and Node.js / FastAPI services. 1.4M+ app downloads.",
    { path: "/" },
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
      <ContactSection />
    </>
  );
}
