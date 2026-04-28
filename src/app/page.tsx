import Navbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import KitPasoRapido from "@/components/Landing/Kitpasorapido";
import Partners from "@/components/Landing/Partners";
import TiposCuenta from "@/components/Landing/TiposCuenta";
import HowItWorks from "@/components/Landing/HowItWorks";
import ManualSection from "@/components/Landing/Manualsection";
import FAQ from "@/components/Landing/Faq";
import Footer from "@/components/Landing/Footer";

export default function LandingPage() {
  return (
    <main className="pr-light pr-noise relative min-h-screen overflow-x-clip text-[#0a0a0a] antialiased">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <Partners />
        <KitPasoRapido />
        <TiposCuenta />
        <HowItWorks />
        <ManualSection />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
