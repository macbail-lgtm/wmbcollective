import IntroAnimation from "@/components/IntroAnimation";
import Logo from "@/components/Logo";
import SectionRow from "@/components/SectionRow";
import Footer from "@/components/Footer";
import { LANDING_SECTIONS } from "@/content";

export default function Home() {
  return (
    <IntroAnimation>
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-col items-center px-6 pb-16 pt-20 sm:pt-28">
          <Logo variant="hero" />
        </div>

        <div className="flex flex-1 flex-col border-t border-border">
          {LANDING_SECTIONS.map((section) => (
            <SectionRow key={section.number} section={section} />
          ))}
        </div>

        <Footer />
      </main>
    </IntroAnimation>
  );
}
