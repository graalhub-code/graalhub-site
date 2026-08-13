import Nav from "@/components/Nav";
import HeroCapitol from "@/components/HeroCapitol";
import Manifesto from "@/components/Manifesto";
import TresLeituras from "@/components/TresLeituras";
import Pilares from "@/components/Pilares";
import Nucleo from "@/components/Nucleo";
import Marcas from "@/components/Marcas";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";

/**
 * Preview da direção "Capitol" para o Hero — não é a home de produção.
 * Reaproveita o restante das seções normais do site, trocando só o Hero.
 * Ver src/components/HeroCapitol.tsx para o componente em si.
 */
export default function CapitolPreview() {
  return (
    <>
      <Nav />
      <HeroCapitol />
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
