import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingPetals3D } from "@/components/effects/FloatingPetals3D";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Inquiry } from "@/components/sections/Inquiry";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { useLenis, useScrollReveal } from "@/hooks/useLenis";

export default function App() {
  useLenis();
  useScrollReveal();

  return (
    <>
      <FloatingPetals3D />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <Inquiry />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
