# GRAAL.hub — Site (graalhub-site)

Site institucional da GRAAL.hub. No ar em **https://graalhub.com**.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Deploy

- Fonte canônica do código: branch `main` deste repositório.
- Vercel conectado via **Git Integration** (projeto `graalhub-1786424460`, team `graalhub`) — todo push na `main` dispara build + deploy automático, e o domínio `graalhub.com` é auto-apontado pro deployment de produção mais recente assim que o build passa.
- **Limitação conhecida:** sessões de agente (Claude/Cowork) rodando neste projeto não conseguem fazer `git push` direto nem usar a API REST do GitHub (`api.github.com`) neste repositório — ambos batem numa barreira de autorização por sessão (HTTP 403). O workaround em uso é a UI web do GitHub ("Upload files") via automação de navegador. Ver as issues com o label `infra` para o histórico completo.

## Estrutura

- `src/app/`
  - `page.tsx` — home de produção.
  - `capitol/page.tsx` — rota experimental **pausada** (retorna 404 via `notFound()`). Guarda a direção visual "Capitol" (baseada no template Figma comprado "Daily Hero 5 - Arkkhe"), com componentes e dicionário de i18n próprios — nada foi apagado, pronta pra retomar sem reconstruir do zero.
- `src/components/` — componentes de produção (`Nav`, `Hero`, `Nucleo`, `Marcas`, `Footer`, etc.) e as variantes experimentais `*Capitol` (ex: `HeroCapitol.tsx`), usadas só pela rota pausada acima.
- `src/lib/i18n.ts` — dicionário de conteúdo de produção (pt/en/es).
- `src/lib/capitol-i18n.ts` — dicionário separado da direção "Capitol", mantido isolado de propósito para não arriscar o conteúdo já publicado enquanto essa direção está em pausa/revisão.
- `public/` — assets estáticos; `public/capitol/` guarda os assets exclusivos da direção pausada.

## Idiomas

Seletor de idioma BR | EN | ES no site de produção — dicionário em `src/lib/i18n.ts`.

## Marca

- Manifesto atual (v2 "Santo Graal", aprovado 09/08/2026): **"Não é sorte. É performance."**
- Paleta: CG Red/Coral sobre Antique White. Tipografia: Outfit / Instrument Sans / Geist Mono.

## Estado do projeto / histórico de decisões

Achados, decisões e bugs do projeto são rastreados como **issues neste repositório**, uma por item individual (não uma por rodada de trabalho ou documento), com labels:

- Status: `resolvido` / `em-aberto` / `parcial`
- Área: `frontend` / `infra` / `design` / `conteúdo` / `legal`
- Transversais: `aprendizado` (decisão de arquitetura ou lição aprendida) / `segurança`

Ver [issues abertas](https://github.com/graalhub-code/graalhub-site/issues?q=is%3Aissue+is%3Aopen) para o que ainda está pendente, ou filtrar por label (ex: `label:em-aberto`, `label:infra`) para o estado de uma área específica.

## Convenções para quem (ou qual agente) mexer neste repo

- Ao resolver algo que já é uma issue, referenciar `Closes #N` (ou `Fixes #N`) na mensagem do commit — o GitHub fecha a issue sozinho ao entrar na `main`.
- Ao avançar parcialmente algo rastreado numa issue sem resolver de fato, usar `Refs #N` no commit e comentar na issue com o que mudou.
- Ao encontrar um bug, decisão de arquitetura ou limite de plataforma novo durante o trabalho, abrir uma issue na hora, com os labels de área/status/aprendizado de sempre — não deixar para organizar depois.
- **Este README deve ser atualizado no mesmo commit** que tornar alguma frase acima desatualizada (versão, comando, arquitetura, uma rota que mudou de papel, uma feature construída e depois removida). Quando não der para fazer na hora, abrir uma issue com os labels `aprendizado` + `em-aberto` registrando a pendência específica, para não perder o rastro.
