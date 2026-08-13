import { notFound } from "next/navigation";

/**
 * Projeto "Capitol" pausado a pedido do usuário (13/08) — rota tirada do ar
 * (404) sem apagar nada. Todo o trabalho continua intacto no repositório
 * (componentes *Capitol, src/lib/capitol-i18n.ts, assets em public/capitol)
 * pronto pra retomar quando o projeto voltar: basta reverter este arquivo
 * pro que estava antes (ver histórico do commit "Add files via upload"
 * anterior a esta pausa) em vez de reconstruir do zero.
 *
 * A home de produção (`/`) não foi tocada por essa pausa.
 */
export default function CapitolPreview() {
  notFound();
}
