import Navbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import KitPasoRapido from "@/components/Landing/Kitpasorapido";
import Partners from "@/components/Landing/Partners";
import TiposCuenta from "@/components/Landing/TiposCuenta";
import ManualSection from "@/components/Landing/Manualsection";
import FAQ from "@/components/Landing/Faq";
import Footer from "@/components/Landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <KitPasoRapido />
      <Partners />
      <TiposCuenta />
      <ManualSection />
      <FAQ />
      <Footer />

    </main>
  );
}
