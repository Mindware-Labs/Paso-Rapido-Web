import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";

export default function CuentasMarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pr-light pr-noise relative min-h-screen overflow-x-visible text-[#0a0a0a] antialiased">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
