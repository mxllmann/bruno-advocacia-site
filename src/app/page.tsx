import { Hero } from "@/components/home/hero";
import { PracticeAreas } from "@/components/home/practice-areas";
import { Office } from "@/components/home/office";
import { Team } from "@/components/home/team";
import { ContactSection } from "@/components/contact/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <PracticeAreas />
      <Team />
      <Office />
      <ContactSection />
    </>
  );
}
