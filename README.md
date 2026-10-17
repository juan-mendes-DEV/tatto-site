# TRAÇO — Estúdio de tatuagem

Site demonstrativo com três páginas, pensado para celular. Marca, personas e desenhos de portfólio fictícios. Não representa um estúdio em funcionamento.

## Páginas

- dist/index.html — abertura, manifesto, destaques da galeria e personas de artistas.
- dist/portfolio.html — seis flash arts vetoriais, filtros por estilo e visualização ampliada.
- dist/orcamento.html — formulário demonstrativo em três etapas, validação, resumo e reinício; perguntas frequentes.

## Abrir

Você pode abrir dist/index.html diretamente no navegador. Para prévia com servidor, execute na pasta do projeto:

```sh
python3 -m http.server 8000 --directory dist
```

Abra http://localhost:8000. Não é necessário instalar pacotes ou executar build. Fontes, fotografia e ilustrações são locais.

## Vercel

Envie esta pasta inteira para um repositório. Se o repositório contiver apenas este projeto, use a raiz como Root Directory; se estiver dentro de uma pasta maior, selecione a pasta traco-estudio. Output Directory: dist. Framework Preset: Other. O vercel.json já declara essa configuração.

## Animações

Entrada de título e fotografia, faixa contínua, selo giratório e revelações durante a rolagem. Cards possuem transições; menu, diálogo e formulário têm movimentos de abertura. A preferência de movimento reduzido é respeitada. O rodapé oferece um botão para pausar as animações.

## Personalização

- Conteúdo: os três arquivos HTML.
- Cores e layout: dist/style.css, variáveis no início após as declarações de fontes.
- Interações: dist/app.js.
- Artes, foto e fontes: dist/assets/.

## Limites

O formulário não envia nem armazena dados, não agenda e não gera preços reais. Não existe telefone, WhatsApp, endereço ou equipe real associada. Para usar comercialmente, substitua o conteúdo fictício, configure um canal de atendimento e revise as informações reais do negócio.

## Créditos

Fotografia ilustrativa: Unsplash, https://images.unsplash.com/photo-1565058379802-bbe93b2f703a . As seis flash arts SVG foram criadas para este conceito e não são fotografias de tatuagens realizadas.
Fontes Barlow Condensed e DM Sans via Google Fonts, com licenças SIL Open Font License incluídas em assets/.

## Verificação

Três páginas revisadas no navegador, com conferência em desktop e telas de 320 e 390 px. Filtros, ampliação/fechamento da galeria, menu mobile, campos obrigatórios, avanço e resumo do formulário, conclusão e reinício verificados. JavaScript validado com node --check; referências locais e arquivo ZIP conferidos.
