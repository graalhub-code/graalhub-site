import Nav from "@/components/Nav";
import HeroCapitol from "@/components/HeroCapitol";
import ManifestoCapitol from "@/components/ManifestoCapitol";
import TresLeiturasCapitol from "@/components/TresLeiturasCapitol";
import PilaresCapitol from "@/components/PilaresCapitol";
import NucleoCapitol from "@/components/NucleoCapitol";
import MarcasCapitol from "@/components/MarcasCapitol";
import ContatoCapitol from "@/components/ContatoCapitol";
import FooterCapitol from "@/components/FooterCapitol";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";

/**
 * Preview da direção "Capitol" — site inteiro na linguagem visual dark/luxo
 * do template comprado (halo vermelho, cards de vidro, texto reescrito),
 * não é a home de produção. Cada seção tem sua própria variante "Capitol"
 * (ManifestoCapitol, PilaresCapitol etc.) com copy própria em
 * src/lib/capitol-i18n.ts — nada aqui toca no conteúdo/i18n de produção.
 *
 * O wrapper "t-dark" no root garante que os elementos fixos/flutuantes
 * (CookieConsent, BackToTop) também herdem a paleta escura em vez de cair
 * de volta pro :root claro — eles vivem fora de qualquer <section> então
 * não pegariam o tema automaticamente sem isso.
 */
export default function CapitolPreview() {
  return (
    <div className="t-dark">
      <Nav />
      <HeroCapitol />
      <ManifestoCapitol />
      <TresLeiturasCapitol />
      <PilaresCapitol />
      <NucleoCapitol />
      <MarcasCapitol />
      <ContatoCapitol />
      <FooterCapitol />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}
