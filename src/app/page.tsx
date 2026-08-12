import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import TresLeituras from "@/components/TresLeituras";
import Pilares from "@/components/Pilares";
import Nucleo from "@/components/Nucleo";
import Marcas from "@/components/Marcas";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Manifesto />
      <TresLeituras />
      <Pilares />
      <Nucleo />
      <Marcas />
      <Contato />
      <Footer />
      <CookieConsent />
      <BackToTop />
    </>
  );
}
