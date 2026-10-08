# avilaops-site

<!-- avilaops:contexto:inicio (versão 2026-10-03; gerado a partir de avilaops/contexto, não editar aqui) -->
## Contexto Ávila Ops (vale para todos os projetos)

Este repositório pertence à Ávila Ops Tecnologia, que ajuda pequenas empresas a construir presença digital, organizar a operação e crescer. As contas `avilaops` e `avilainc` no GitHub são a mesma empresa. Nicolas Avila (Nicolas sem acento) é o fundador e quem decide.

### Como trabalhar

- Comunicar em português natural, com resposta direta e evidência. Sem tom de coach, promessa vaga ou jargão comercial. O idioma da interface e do conteúdo acompanha o site, não a conversa.
- Identificar o projeto, o domínio, o repositório e o ambiente antes de alterar qualquer coisa. Não presumir que todos os projetos usam o mesmo deploy.
- Ter iniciativa dentro do pedido e levar a tarefa até um resultado verificado. Plano, código, publicação e funcionamento comprovado são coisas diferentes: não declarar sucesso só porque um build terminou ou um workflow foi ativado.
- Proteger dados, acessos e a separação entre clientes. Nunca gravar segredo em arquivo versionado, issue, PR ou memória.
- Não iniciar comunicação externa nem ação irreversível sem autorização do Nicolas.
- Preservar trabalho em andamento de outra pessoa ou de outro agente. Trabalho não commitado vai para uma branch `resgate/*`.

### Decisões vigentes

- Pagamentos: Mercado Pago no Brasil e PayPal para clientes de fora. Não usar Stripe nem Éfi, mesmo que material antigo diga o contrário.
- Automações em n8n, infraestrutura em Cloudflare e canais em Twilio, preservando integrações existentes.
- Ofertas com três planos: entrada limitada, intermediário como escolha principal e premium como referência. Consultar preços vigentes antes de publicar.
- Build de aplicação roda no GitHub Actions, não no servidor de produção.
- Versão antiga de código fica no GitHub. Não criar `.tgz`, `.tar`, `*-before-*` nem pastas `rollback/`, `releases/` ou `backups/` com código no servidor; voltar versão é republicar o commit. Antes de mexer em dado, fazer dump do banco.

### Sessões na nuvem

- Uma sessão de nuvem não tem acesso à máquina do Nicolas, aos servidores nem à memória compartilhada. Não presumir o estado de produção: buscar evidência ou dizer que não foi verificado.
- Decisão durável tomada na sessão deve ficar registrada na descrição do PR e, quando for do projeto, neste arquivo, fora deste bloco.
- A memória compartilhada completa e as regras corporativas ficam no repositório privado `avilaops/contexto`.
<!-- avilaops:contexto:fim -->

## Este projeto

Site institucional `avilaops.com` (Next.js 16, export estático). Ler o README antes de agir.

- **Git:** toda alteração é commitada e enviada direto para a `main`, na mesma tarefa (regra do Nicolas de 2026-10-05). Sem branch nem PR parado.
- **Publicação.** O workflow do Actions roda os validadores e constrói a imagem; o job `deploy` só publica com a variável `DEPLOY_ENABLED=true` e os quatro segredos `DEPLOY_*` no repositório (em 2026-10-08 ainda não gravados: conferir com `gh variable list` e `gh secret list`). Enquanto isso, quem põe o site no ar é `npm run deploy` (Windows) ou `npm run deploy:linux`, que envia `out/` para o servidor `applications` e troca o symlink `/var/www/avilaops.com`. Terminou a alteração: push e, se o deploy automático estiver desligado, deploy pelo script.
- **Build pesado não roda no `creators`.** Use o `apps-noclient` (modelo em `~/.agents/claude/out/avilaops-site/`).
- **CSS:** um arquivo por área em `src/styles/`, importados em ordem por `src/app/globals.css`. A ordem é a cascata.
- **A marca é Avila Ops e o domínio é `avilaops.com`.** "Avila.inc" não existe mais: não usar em texto, schema nem imagem. O `avila.inc` só redireciona para cá; o nome do Worker de leads (`avila-inc-lead-intake`) é endereço técnico e ficou.
- **Antes de publicar:** `npm run verificar` (lint, build, SEO, links, cabeçalhos e contraste). Os validadores de cabeçalhos e de contraste precisam do Chromium do Playwright.
- **Links internos terminam com `/`.** `links:validate` recusa o contrário.
- **Cor de fundo de seção é variável, não hex.** O tema troca pelo relógio (escuro das 18h às 6h); fundo fixo deixa o texto ilegível em um dos temas. `contraste:validate` confere os dois.
- **Cabeçalhos HTTP:** a fonte é `config/security-headers.mjs`. Em produção quem serve é o Caddy, que importa `/etc/caddy/avilaops-site.caddy` (gerado no build, enviado pelo deploy). Não editar esse arquivo no servidor.
- **Domínios citados no site precisam existir.** `cliente.avilaops.com` e `arxisbim.com.br` não resolvem e `crm.avilaops.com` responde 502 (2026-10-08); por isso saíram dos links. Antes de voltar a apontar para um deles, conferir que responde.
