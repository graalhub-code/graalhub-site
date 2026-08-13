import type { Metadata } from "next";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
// serif display face used only by the "Capitol" direction (see /capitol) —
// production headings stay on Montserrat, this is additive and doesn't
// touch anything outside components that opt in via the .font-display
// utility class (see globals.css).
import "@fontsource/ibarra-real-nova/400.css";
import "@fontsource/ibarra-real-nova/600-italic.css";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";

const TITLE = "GRAAL.hub — Não é sorte. É performance.";
const DESCRIPTION =
  "Estratégia, planejamento e compra de mídia — offline e digital — concentrados em um só hub. Hub de comunicação e mídia em Salvador, Bahia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://graalhub.com"),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/simbolo.svg", type: "image/svg+xml" },
    ],
  },
  // og-image.png is a static 1200x630 card (dark theme, matches the Hero
  // section's look) so links shared on WhatsApp/Twitter/LinkedIn/iMessage
  // etc. render a proper preview instead of a blank/generic card.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://graalhub.com",
    siteName: "GRAAL.hub",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GRAAL.hub — Não é sorte. É performance.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
