import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ProjectsPreview } from "@/components/sections/ProjectsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PartnersSection />
      <TeamSection />
      <ProjectsPreview />
      <ClientsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
