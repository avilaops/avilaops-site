# Entrega ao Claude — 10 imagens editoriais

Data: 09/10/2026. Branch: `codex/imagens-primeiro-lote-10`.

## Escopo e estado

Este lote entrega 10 imagens internas que faltavam nos guias existentes. Não altera
textos, status editoriais, datas, capas nem metadados de compartilhamento.
Arquivos WebP de 1200 × 800, até 120 KiB, com símbolo da Avila Ops por referência.
As cenas são geradas por IA; não representam clientes ou operações reais.

As URLs de produção abaixo são **previstas**. Este PR não faz deploy e não comprova
que elas já estejam disponíveis. Para revisar antes do merge, abra os arquivos em
`public/editorial/guias/` na branch do PR. O manifesto já contém a integração.

## Como continuar os guias

1. Faça checkout da branch do PR e confira os arquivos antes de integrar em main.
2. Consulte `content/lotes-imagens/2026-10-09-primeiras-10.json` para prompts,
   originais locais, dimensões, peso e textos alternativos. Os PNG originais ficam
   na máquina geradora; os WebP versionados são suficientes para usar as imagens.
3. Use `content/imagens.json` como fonte de integração. Cada entrada associa
   `slug`, `src`, `alt`, `width`, `height`, `section` e `position: 2`.
4. Preserve os títulos das seções abaixo. Se precisar renomear um H2, atualize a
   propriedade `section` no manifesto e no registro do lote no mesmo commit.
5. Não acrescente imagens Markdown duplicadas: `MarkdownBody.tsx` insere a figura
   ao final da seção correspondente e ignora imagens escritas no Markdown.
6. Finalize os textos com verificação das fontes, especialmente preços, pagamentos,
   legislação e frete. As imagens são conceituais, não comprovam números ou regras.
7. Preserve as regras de aprovação e datas do repositório. A presença de uma imagem
   não aprova nem antecipa a publicação de um artigo.

## Imagens, URLs e inserção

### 005-2 — para-que-serve-o-pix-numa-loja

- Guia: https://avilaops.com/guias/para-que-serve-o-pix-numa-loja/
- Imagem prevista: https://avilaops.com/editorial/guias/para-que-serve-o-pix-numa-loja-2.webp
- Seção H2: Como funciona o Pix dentro da loja?
- Alt: Caixa de pedido e confirmação de pagamento compartilham um identificador visual, mostrando a associação automática do Pix ao pedido.

### 010-2 — o-que-e-frete-e-quem-paga

- Guia: https://avilaops.com/guias/o-que-e-frete-e-quem-paga/
- Imagem prevista: https://avilaops.com/editorial/guias/o-que-e-frete-e-quem-paga-2.webp
- Seção H2: Do que o frete é feito?
- Alt: Vela, caixa, proteção e fita mostram os materiais de embalagem que também compõem o custo de envio.

### 012-2 — pix-cartao-ou-boleto-o-que-custa

- Guia: https://avilaops.com/guias/pix-cartao-ou-boleto-o-que-custa/
- Imagem prevista: https://avilaops.com/editorial/guias/pix-cartao-ou-boleto-o-que-custa-2.webp
- Seção H2: O que cada meio custa?
- Alt: Miniaturas de celular, cartão e documento representam os meios de pagamento comparados no guia.

### 013-2 — prazo-de-recebimento-do-cartao

- Guia: https://avilaops.com/guias/prazo-de-recebimento-do-cartao/
- Imagem prevista: https://avilaops.com/editorial/guias/prazo-de-recebimento-do-cartao-2.webp
- Seção H2: Por que o prazo existe?
- Alt: Cartão, relógio e caixa da loja representam a espera entre a venda e o recebimento do dinheiro.

### 014-2 — foto-de-produto-fundo-padronizado

- Guia: https://avilaops.com/guias/foto-de-produto-fundo-padronizado/
- Imagem prevista: https://avilaops.com/editorial/guias/foto-de-produto-fundo-padronizado-2.webp
- Seção H2: O que o fundo padronizado muda na prática?
- Alt: Três canecas de tamanhos diferentes são mostradas com fundo e enquadramento padronizados para facilitar a comparação.

### 015-2 — como-fotografar-produto-com-celular

- Guia: https://avilaops.com/guias/como-fotografar-produto-com-celular/
- Imagem prevista: https://avilaops.com/editorial/guias/como-fotografar-produto-com-celular-2.webp
- Seção H2: Onde e quando fotografar?
- Alt: Celular apoiado fotografa um calçado com fundo branco e luz lateral filtrada por uma cortina.

### 018-2 — como-escolher-nome-da-loja

- Guia: https://avilaops.com/guias/como-escolher-nome-da-loja/
- Imagem prevista: https://avilaops.com/editorial/guias/como-escolher-nome-da-loja-2.webp
- Seção H2: O que faz um nome funcionar?
- Alt: Uma pessoa fala enquanto outra se prepara para anotar, ilustrando o teste de compreensão do nome da loja.

### 019-2 — preco-de-e-por-quando-vira-mentira

- Guia: https://avilaops.com/guias/preco-de-e-por-quando-vira-mentira/
- Imagem prevista: https://avilaops.com/editorial/guias/preco-de-e-por-quando-vira-mentira-2.webp
- Seção H2: O que a lei exige?
- Alt: Etiquetas anteriores guardadas em uma pasta acompanham uma nova etiqueta promocional, representando o histórico de preços.

### 022-2 — calculo-de-frete-por-cep

- Guia: https://avilaops.com/guias/calculo-de-frete-por-cep/
- Imagem prevista: https://avilaops.com/editorial/guias/calculo-de-frete-por-cep-2.webp
- Seção H2: Como o cálculo funciona?
- Alt: Caixa sobre balança e fita de medição representam o peso e as dimensões usados no cálculo do frete.

### 023-2 — embalagem-medida-custo-do-frete

- Guia: https://avilaops.com/guias/embalagem-medida-custo-do-frete/
- Imagem prevista: https://avilaops.com/editorial/guias/embalagem-medida-custo-do-frete-2.webp
- Seção H2: O que é peso cúbico e por que ele manda?
- Alt: A mesma almofada aparece em uma caixa ajustada e em outra grande demais, comparando o espaço ocupado na embalagem.

## Validação e publicação

Na raiz do projeto, execute:

```powershell
node scripts/validar-lotes-imagens.mjs
npm run verificar
```

Depois do merge e das validações, siga o processo de deploy do projeto. Em Windows,
com `out/` gerado pelo build validado:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy-avilaops-com.ps1
npm run headers:validate:public
npm run seo:validate
```

Não use `npm run deploy` para este lote: esse comando inclui anúncios sociais.
Após publicar, verifique cada URL de imagem com HTTP 200 e Content-Type image/webp.
Confira visualmente os guias publicados em desktop e celular, sem imagens duplicadas
nem deslocamento de layout. Só então informe as URLs como publicadas.

## Continuação diária

Consulte arquivos existentes, manifesto, lotes versionados e PRs abertos antes de
selecionar IDs pendentes. Não regenere os 10 IDs deste PR mesmo antes do merge.
O planejamento completo está em `marketing/conteudo/guias/imagens-planejamento.json`,
que é local e não foi incluído neste PR. Ao concluir este lote, há 119 das 732
imagens planejadas no workspace e 613 ainda sem arquivo; recontar antes de retomar.
O lote anterior `2026-10-09-065-066.json` já está em main, mas seu deploy não foi
confirmado nesta entrega. Não confundir disponibilidade local com URL publicada.
