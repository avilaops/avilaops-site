/**
 * Biblioteca de prompts de imagem publicada em /guias/ia/prompts-para-ia.
 *
 * Cada prompt precisa ser rodado com uma foto nossa antes de virar exemplo
 * público. Para preencher, salve os arquivos em `public/prompts/` e aponte aqui:
 *
 *   before: { src: "/prompts/efeito-clone-antes.jpg", alt: "..." },
 *   after: [{ src: "/prompts/efeito-clone-depois-gemini.jpg", alt: "...", tool: "Gemini" }],
 *
 * `after` é lista porque o mesmo prompt em ferramentas diferentes dá resultados
 * diferentes — e mostrar isso lado a lado é metade do valor da página. O `tool`
 * vira etiqueta na moldura ("DEPOIS · GEMINI").
 *
 * Com `before: null` e `after: []`, a página renderiza as molduras vazias com
 * as etiquetas ANTES e DEPOIS no lugar certo.
 */

export type PromptImage = {
  src: string;
  alt: string;
  /** Ferramenta que gerou o resultado, creditada na etiqueta da moldura. */
  tool?: string;
};

export type AiPrompt = {
  slug: string;
  title: string;
  tagline: string;
  useCase: string;
  /** Texto exato que o usuário copia e cola na ferramenta de imagem. */
  prompt: string;
  /** Trechos entre colchetes que precisam ser trocados antes de usar. */
  variables?: { token: string; hint: string }[];
  tips?: string[];
  before: PromptImage | null;
  after: PromptImage[];
};

export const aiPrompts: AiPrompt[] = [
  {
    slug: "efeito-vazio-cromatico",
    title: "Efeito de vazio cromático",
    tagline: "Esculturas de cromo líquido crescendo ao redor da pessoa.",
    useCase:
      "Campanha de moda, lançamento de produto premium e capa de conteúdo que precisa parar o feed sem descaracterizar a pessoa.",
    before: {
      src: "/prompts/efeito-vazio-cromatico-antes.jpg",
      alt: "Homem de camiseta branca e bermuda preta, de pé em um corredor estreito de paredes claras e piso de cerâmica, fazendo joia com as duas mãos.",
    },
    after: [
      {
        src: "/prompts/efeito-vazio-cromatico-depois-gemini.jpg",
        alt: "A mesma pessoa, mesma roupa e mesma pose, agora cercada por formas orgânicas de cromo líquido que emolduram o corredor.",
        tool: "Gemini",
      },
      {
        src: "/prompts/efeito-vazio-cromatico-depois-gpt.jpg",
        alt: "A mesma pessoa, mesma roupa e mesma pose, dentro de um túnel de cromo líquido com reflexos de alto contraste.",
        tool: "ChatGPT",
      },
    ],
    prompt: `Transforme esta imagem em uma edição de moda surreal premium, preservando a identidade da pessoa, as características faciais, o penteado, o tom de pele, a roupa, as proporções do corpo e o ângulo da câmera exatamente como estão. Não troque nenhuma peça de roupa, acessório ou detalhe facial. Mantenha o sujeito perfeitamente nítido, fotorrealista e naturalmente integrado.

Crie uma composição surrealista e realista ao redor do sujeito com estruturas orgânicas de cromo líquido de grande escala inspiradas em metal fluido, formas abstratas biomórficas e esculturas futuristas. O cromo deve parecer que cresce naturalmente ao redor do sujeito sem cobrir partes importantes do rosto ou da fisionomia. Adicione reflexos realistas, sombras suaves, profundidade e perspectiva para que as formas metálicas pareçam fisicamente presentes. Mantenha um ambiente limpo e minimalista enquanto integra os elementos de cromo perfeitamente.

Use luz natural suave do dia com contraste cinematográfico e realces sutis. Crie uma estética de revista de moda de luxo semelhante a Vogue, Numéro e Highsnobiety. Preserve as cores originais da roupa e da pele. Não adicione pessoas extras, textos, logotipos, marcas-d'água ou objetos desnecessários.

A imagem final deve parecer uma campanha de moda de IA de alto nível, com detalhes ultra-realistas, texturas nítidas, HDR de alta qualidade, resolução 8K e qualidade editorial. Feita com posição de edição, gradação de cores premium, profundidade dramática de campo e fotografia profissional comercial.`,
    tips: [
      "Funciona melhor com foto de corpo inteiro e fundo simples (parede lisa, areia, asfalto).",
      "Se o cromo cobrir o rosto, repita o pedido de não cobrir a fisionomia na primeira linha do prompt.",
    ],
  },
  {
    slug: "efeito-clone",
    title: "Efeito clone",
    tagline: "A mesma pessoa repetida várias vezes na mesma cena.",
    useCase:
      "Mostrar equipe enxuta que faz o trabalho de muitos, escala de operação, capacidade de atendimento e anúncio de vaga.",
    before: null,
    after: [],
    prompt: `Fotografia surreal cinematográfica de clonagem usando a imagem de referência enviada como fonte de identidade exata.

BLOQUEIO DE IDENTIDADE CRÍTICO: a pessoa da imagem de referência enviada deve ser replicada exatamente. Isso não é uma semelhança próxima. Preserve a mesma estrutura facial: formato do rosto, linha do maxilar, maçãs do rosto, testa, formato dos olhos, sobrancelhas, formato do nariz, lábios, tom de pele, cor do cabelo, penteado, textura do cabelo, maquiagem (se houver), idade, gênero, apresentação étnica, proporções corporais e aparência geral. Preserve a mesma roupa: [ROUPA]. Preserve a mesma identidade exata em cada clone. Não altere o rosto com modelo genérico. Cada versão é a mesma pessoa idêntica.

Cena: uma grande praça urbana de concreto no final da tarde, com luz quente e sombras longas. Crie vários clones da mesma pessoa em pé, caminhando ou virando-se em diferentes direções.

Câmera: lente grande angular cinematográfica em ângulo alto, ligeiramente acima do nível dos olhos, mas não tão alta a ponto de o rosto ficar irreconhecível. A pessoa central deve estar de pé, voltada para a câmera com as mãos nos bolsos, enquanto os outros clones estão posicionados por toda a cena, caminhando em várias direções.

Profundidade de campo: profunda o suficiente para manter todos os clones claramente visíveis. O clone central deve estar perfeitamente nítido e em foco, com todos os detalhes faciais exatos.

Iluminação: luz dourada natural do final da tarde, com sombras longas e suaves.

Estilo: cinematográfico e realista, com gradação de cores de cinema.

Fundo: uma praça de concreto grande e vazia ou calçada urbana, com luz quente do final da tarde e pavimento claro e minimalista ao redor.

O resultado deve parecer surreal, mas fotorrealista. Preservar 100% da identidade exata da pessoa da imagem de referência em cada clone. Não alterar etnia, tom de pele ou características fundamentais. Não adicionar pessoas extras ou objetos desnecessários. Não desfocar o rosto. Manter todos os clones nítidos e consistentes. Alta resolução, ultra-realista, composição cinematográfica.`,
    variables: [
      {
        token: "[ROUPA]",
        hint: "descreva a roupa da foto original peça por peça — ex.: suéter branco, calça preta larga, tênis brancos",
      },
    ],
    tips: [
      "Descrever a roupa peça por peça é o que segura a identidade entre os clones.",
      "Foto original de corpo inteiro e com boa luz reduz muito a deformação de rosto nos clones do fundo.",
    ],
  },
  {
    slug: "efeito-boneco",
    title: "Efeito boneco",
    tagline: "A pessoa vira uma figura de ação colecionável de plástico.",
    useCase:
      "Apresentar time, criar mascote de campanha, brincar com um case famoso e gerar conteúdo compartilhável sem produção de foto.",
    before: null,
    after: [],
    prompt: `Transforme a pessoa da referência em uma figura de brinquedo de plástico de alta qualidade e colecionável, preservando a pose exata, a expressão facial, o penteado, as cores da roupa, os acessórios, a posição do corpo, o ângulo da câmera, o enquadramento, a composição e a cena geral da imagem original. O personagem não deve parecer um brinquedo fabricado em massa, e sim uma figura de linha premium — não um desenho animado.

Use plástico ABS injetado liso, superfícies pintadas brilhantes, costuras de molde sutis, linhas suaves e nítidas, articulações de esfera visíveis nos ombros, cotovelos, quadris, joelhos, punhos e pescoço, e um leve brilho simplificado típico da anatomia de brinquedos. A cabeça deve ser aproximadamente 15–20% maior que as proporções realistas, enquanto o corpo permanece equilibrado como uma figura colecionável premium.

A cena deve ser traduzida para um diorama realista: cabelo pintado com relevos brilhantes, cílios moldados limpos, sobrancelhas e detalhes plásticos claros em vez de pelos reais, e um rosto esculpido em plástico mais nítido do que as fibras reais da pele.

A roupa deve parecer plástico rígido moldado, preservando cada ruga, dobra, costura, logotipo, grafismo e textura como detalhe esculpido, em vez de tecido simulado. Os acessórios devem se tornar peças de plástico em escala de brinquedo, com acabamento pintado limpo, mantendo o design original. Qualquer arma deve se tornar plástico rígido moldado translúcido, e joias devem se assemelhar a peças de brinquedo em miniatura fundidas sob pressão.

Preserve a perspectiva exata, o corte, as características, a direção da luz e a composição da referência original, para parecer uma miniatura colecionável. Mantenha o mesmo ambiente, objetos, cores e relações espaciais encontrados na imagem de referência.

O resultado deve ter a aparência de uma figura de ação genuinamente fabricada de uma linha colecionável premium, com base de embalagem, reflexos plásticos de qualidade de estúdio, renderização realista de produto (PBR), realismo plástico, reflexos brilhantes, luz indireta, gradientes suaves, bordas nítidas, cores vibrantes, ultra-alta resolução e acabamento colecionável.

Sem textura de argila. Sem superfície fosca. Sem horror. Sem personagens extras. Sem texto. Sem marcas d'água. A imagem final deve parecer sinceramente um brinquedo colecionável premium fotografado profissionalmente, e não um quadro de desenho.`,
    tips: [
      "A cabeça 15–20% maior é o detalhe que faz o resultado ler como boneco, e não como pessoa vestida de plástico.",
      "Cenário com um objeto grande atrás (carro, balcão, fachada) ajuda a IA a montar o diorama.",
    ],
  },
  {
    slug: "poster-de-perfil-grafico",
    title: "Pôster de perfil gráfico",
    tagline: "Retrato de perfil traduzido em cartaz editorial de quatro cores.",
    useCase:
      "Capa de artigo, anúncio de palestra, post de autoridade e material impresso com cara de estúdio de design.",
    before: null,
    after: [],
    prompt: `Pôster editorial com a pessoa da imagem de referência em perfil estritamente voltado para a esquerda, recortada do meio do peito para cima, mantendo o mesmo penteado e o mesmo formato de rosto da referência, vestindo [ROUPA]. Preserve a estrutura facial reconhecível, as proporções e a identidade ao traduzi-las para uma arte editorial clássica.

Coloque a figura de perfil sobre o pôster, com uma forma geométrica plana de círculo diretamente atrás da cabeça, para criar contraste gráfico. Use formas planas nítidas, traços faciais com linhas de contorno controladas, textura de granulação de impressão em meio-tom e textura de papel.

Construa o pôster com uma cor de fundo dominante, uma cor primária e uma secundária, limitando a paleta a exatamente quatro cores: [PALETA].

Adicione o título minimalista "[TÍTULO]" no canto superior esquerdo, em fonte sem serifa condensada e caixa alta, com a linha menor "[SUBTÍTULO]" logo abaixo. Hierarquia clara, espaço negativo generoso, composição polida.

Proporção vertical 4:5.`,
    variables: [
      { token: "[ROUPA]", hint: "ex.: blazer preto sobre camisa branca" },
      {
        token: "[PALETA]",
        hint: "as quatro cores exatas — ex.: bege papel, vermelho profundo, preto e branco quente",
      },
      { token: "[TÍTULO]", hint: "nome da pessoa ou da marca, em caixa alta" },
      { token: "[SUBTÍTULO]", hint: "cargo, tema da palestra ou nome do conteúdo" },
    ],
    tips: [
      "Peça a paleta com nomes de cor, não com códigos hex: o modelo acerta mais.",
      "Foto de referência frontal e bem iluminada gera um perfil melhor do que uma foto já de lado.",
    ],
  },
  {
    slug: "efeito-halo",
    title: "Efeito halo",
    tagline: "Contraluz forte, fundo preto e contorno luminoso no sujeito.",
    useCase:
      "Retrato dramático de estúdio sem estúdio: foto de perfil, bastidores e destaque de produto na mão.",
    before: null,
    after: [],
    prompt: `Retrato com forte brilho de contraluz na borda, sujeito em semissilhueta contra fundo preto, contorno de halo luminoso ao redor do corpo, contorno de halo brilhante ao redor de [OBJETO], iluminação de alto contraste cinematográfica, aparência dramática de estúdio, ultra limpa, 4K.`,
    variables: [
      {
        token: "[OBJETO]",
        hint: "o objeto em destaque — ex.: a bola, o copo, o produto. Remova o trecho se não houver objeto",
      },
    ],
    tips: [
      "É o prompt mais curto da lista e o que mais depende da foto original: quanto mais recortável o contorno, melhor.",
      "Serve como acabamento em cima de outro efeito — rode o halo depois, na imagem já gerada.",
    ],
  },
  {
    slug: "efeito-lego",
    title: "Efeito LEGO",
    tagline: "Pessoas viram minifiguras e a cena vira diorama de peças.",
    useCase:
      "Conteúdo leve de equipe, post de data comemorativa, apresentação de processo em etapas e material para público família.",
    before: null,
    after: [],
    prompt: `Use a foto fornecida como imagem de referência. Transforme a pessoa ou as pessoas em minifiguras LEGO clássicas autênticas. Preserve as características originais: número de pessoas, pose, expressão facial, penteado, roupa, cores do traje, acessórios, relação entre os sujeitos, ângulo da câmera, enquadramento, conceito de fundo e composição geral.

Converta cada pessoa em minifigura LEGO oficial somente: cabeça amarela cilíndrica com rosto de impressão clássica LEGO, mãos amarelas, pernas retangulares curtas e pés retangulares planos integrados. Não preserve proporções humanas realistas. As proporções são críticas: as pernas devem ser curtas e robustas, no estilo LEGO — parte superior grossa e curta, parte inferior plana e larga, pés integrados.

Construa o cenário usando peças LEGO, com correspondência de cores e níveis de detalhe impressos nas pernas e nos pés. Para vestidos, batas, saias, camisas, gravatas, conjuntos, túnicas, robes, casacos, roupas e uniformes: use impressão LEGO em estilo minifigura clássica. A saia impressa será rígida, simétrica e plana na parte inferior. Não mostre pernas humanas sob o vestido, saia, túnica, robe, casaco ou uniforme. Para acessórios e bolsas: use peças LEGO moldadas.

Preserve os detalhes reconhecíveis — relógios, bolsas, chapéus, logotipos e acessórios — como peças LEGO simplificadas. Reconstrua a cena como um diorama baseado na foto original. Mantenha o mesmo plano de fundo, feito com peças LEGO e adereços de cenário.

Renderize como fotografia de brinquedo LEGO realista: plástico brilhante, iluminação realista de estúdio, reflexos naturais, profundidade de campo rasa e escala de minifigura autêntica.

Sem humanos reais, sem pele real, sem partes do corpo humano expostas, sem pernas humanas sob roupas LEGO, sem dedos reais, sem elementos não LEGO, sem texto extra, sem marcas d'água.`,
    tips: [
      "A lista final de proibições é a parte que mais importa: sem ela o modelo devolve pessoa real com cabeça de LEGO.",
      "LEGO é marca registrada. Use em conteúdo orgânico e evite em anúncio pago ou em peça que venda um produto.",
    ],
  },
  {
    slug: "efeito-comida-minecraft",
    title: "Efeito comida Minecraft",
    tagline: "Só o prato e a bebida viram blocos; o resto continua real.",
    useCase:
      "Restaurante, cafeteria, delivery e food service que precisam de post divertido com o produto ainda reconhecível.",
    before: null,
    after: [],
    prompt: `Transforme SOMENTE os alimentos e bebidas da foto original em comida voxel autêntica no estilo Minecraft, mantendo todo o resto completamente fotorrealista.

A comida / bebida transformada deve:
- Ser reconhecível e com estilo autêntico de Minecraft — não aleatória.
- Manter formato, tamanho e posição originais.
- Usar textura voxel visível (quadrados visíveis), sem bordas suaves, sem sombreamento ou brilho.
- Ter aparência de item Minecraft oficial, colocado naturalmente no mundo real.
- Flutuar levemente, com um rótulo de item Minecraft acima de cada comida / bebida, usando:
  - fonte em pixel do Minecraft;
  - fundo preto translúcido da caixa do Minecraft;
  - bordas em pixel;
  - ícone do item à esquerda (se existir).
- Os rótulos devem corresponder aos alimentos reais mostrados na imagem.
- Manter iluminação e sombras consistentes com a cena real.
- As mãos, pessoas, roupas, fundo, móveis e iluminação devem permanecer totalmente fotorrealistas.

Regras rígidas:
- Transformar APENAS alimentos / bebidas.
- Sem comidas aleatórias de Minecraft adicionadas.
- Fundo e pessoas permanecem intocados.
- Rótulos devem corresponder à comida real na imagem.`,
    tips: [
      "Diga o nome do prato no pedido se o rótulo sair errado — o modelo escreve o que reconhece.",
      "Minecraft é marca registrada da Mojang. Vale para post orgânico; evite em campanha paga.",
    ],
  },
];

export function getAiPrompt(slug: string) {
  return aiPrompts.find((item) => item.slug === slug);
}
