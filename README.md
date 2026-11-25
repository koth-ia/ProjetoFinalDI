# ArenaManager

> **Seu campeonato, organizado do início ao fim.**

Site para criar, organizar e acompanhar campeonatos esportivos. O destaque é o **montador automático**: você informa equipes, quadras, datas e horários, e o sistema gera os confrontos, distribui os jogos entre as quadras, calcula os horários sem conflitos e, se não couber tudo, sugere soluções que já testou.

Trabalho acadêmico de Engenharia de Software, feito só com **HTML, CSS e JavaScript puro**, sem React, sem frameworks e sem instalar nada.

---

## Arquivos

| Arquivo | O que tem |
|---|---|
| `index.html` | Estrutura da página: cabeçalho de metadados, link “Pular para o conteúdo”, área onde o site é desenhado, região de notificações e as janelas de diálogo |
| `style.css` | Todo o visual: cores dos temas claro, escuro e alto contraste, tipografia, componentes, layout responsivo e regras de impressão |
| `app.js` | Toda a lógica, em seções comentadas: dados das modalidades e regras, algoritmo do campeonato, contas de usuário, componentes, páginas e roteador |
| `README.md` | Este arquivo |

## Como abrir

**Dê dois cliques no `index.html`.** O site abre no navegador (Chrome, Edge, Firefox ou Safari atualizados). Não precisa de internet, servidor nem instalação.

- Com internet, o site carrega as fontes *Barlow* do Google Fonts. Sem internet, usa as fontes do sistema e funciona igual.
- Os endereços internos usam `#` (ex.: `index.html#/painel`), por isso funcionam abrindo o arquivo direto.
- Para publicar na internet, envie os 4 arquivos para qualquer hospedagem de site estático (GitHub Pages, Netlify, Vercel…).

**Teste rápido:** crie uma conta e, no Painel, clique em **“Carregar campeonato de exemplo”**. No montador, o botão **“Preencher com exemplo”** carrega o caso do enunciado: vôlei, 08h–18h, 2 quadras, 8 equipes, 45 min de jogo e 15 min de intervalo.

## Funcionalidades

- **Página inicial:** frase de impacto, funcionalidades, carrossel de modalidades, demonstração interativa do algoritmo, benefícios, depoimentos fictícios (identificados como tal) e rodapé.
- **Conta:** cadastro, login, saída e recuperação de senha, com validação e opção de mostrar a senha.
- **Painel:** campeonatos criados, em andamento, próximos jogos, jogos finalizados, equipes cadastradas, gráfico de andamento e atividades recentes.
- **Montador em 5 etapas:**
  1. *Informações gerais:* nome, modalidade, datas, horários, quadras, local, categoria, faixa etária e número de equipes.
  2. *Equipes:* adicionar, editar e excluir (nome, responsável, categoria, cor e logo opcional), em cartões.
  3. *Configuração dos jogos:* duração (tabela por modalidade, editável), intervalo, preparação, troca de quadra, duração máxima da rodada, descansos, jogos simultâneos e regra de placar.
  4. *Formato:* eliminatória simples, eliminatória dupla, todos contra todos, grupos + semifinal + final, pontos corridos ou grupos personalizados. Calcula partidas, rodadas, grupos, classificados, semifinalistas, finalistas e campeão.
  5. *Gerar campeonato:* tabela com nº do jogo, horário, quadra, equipes, fase e status. Avisa se não houver capacidade e oferece alternativas com botão “Aplicar”.
- **Campeonato:** programação com filtros, edição manual de horário, quadra e confronto (com verificação de conflitos), exportação em **CSV**, **PDF** (pela impressão do navegador: “Salvar como PDF”) e **impressão**; resultados por modalidade (sets no vôlei, tênis e badminton; gols ou pontos no futebol, futsal, handebol e basquete; desempate em jogos eliminatórios); classificação; chaveamento; equipes; e o campeão em destaque.
- **Regras dos Esportes:** 10 modalidades, com a entidade oficial (FIVB, IFAB/FIFA, FIBA, IHF, ITF, BWF, ITTF) e as fontes, separadas da sugestão de duração do sistema. Tem pesquisa com destaque do termo, categorias e abas.
- **Acessibilidade:** modo claro e escuro, alto contraste, aumentar, diminuir e restaurar a fonte, reduzir animações, foco reforçado, atalhos de teclado e tabela de contraste calculada ao vivo.
- **Contato:** formulário com validação e número de protocolo.
- **Ajuda:** perguntas frequentes e explicação do algoritmo.

## Como funciona o algoritmo

O código fica na seção **DOMÍNIO** do `app.js` e não depende da interface.

1. **Confrontos.** *Todos contra todos* usa o método do círculo (fixa uma equipe e gira as outras; com número ímpar, uma folga por rodada). Na *eliminatória*, a chave é completada até a potência de 2 seguinte com a ordem de cabeças de chave 1×8, 4×5, 2×7, 3×6, e as vagas vazias dão avanço automático. A *eliminatória dupla* tem chave superior, chave inferior e grande final. Os *grupos* são distribuídos em serpentina e o mata-mata cruza 1º A × 2º B. Nos jogos eliminatórios, as equipes são referências (“Vencedor J5”, “1º Grupo A”) preenchidas conforme os resultados.
2. **Grade de horários.** Cada horário dura a partida e o próximo começa após o intervalo. Com 08h–18h, 45 min de jogo e 15 min de intervalo, são 10 horários por quadra. Horários que invadem um descanso são empurrados para depois dele.
3. **Distribuição.** Os jogos são colocados em ordem de rodada no primeiro horário e quadra livres em que as duas equipes já descansaram o tempo de preparação (mais o tempo de troca, se mudarem de quadra), os jogos anteriores necessários já terminaram e o limite de jogos simultâneos não foi atingido. Assim, **nenhuma equipe joga em duas quadras ao mesmo tempo**.
4. **Capacidade.** Se sobrar jogo, o sistema explica o motivo e roda o algoritmo de novo com mais quadras, mais dias, horário ampliado, intervalo menor ou outro formato. Só mostra as alternativas que resolvem. No exemplo do enunciado, todos contra todos com 8 equipes precisa de 28 jogos, mas o dia oferece 20 horários: o sistema avisa e sugere, por exemplo, uma 3ª quadra ou um 2º dia.
5. **Placar e classificação.** O placar é validado pela regra da modalidade (no vôlei, set a 25 com 2 pontos de vantagem e 5º set a 15). A tabela ordena por pontos, vitórias, saldo, pontos ou gols marcados e confronto direto. No vôlei, os pontos seguem o padrão FIVB (3–0 ou 3–1 vale 3 pontos; 3–2 vale 2 e 1).

## Onde ficam os dados

Não há servidor: **tudo fica salvo no próprio navegador** (`localStorage`).

- Contas e campeonatos valem só no computador e navegador onde foram criados. Limpar os dados do navegador apaga tudo.
- A senha não é guardada: o site guarda um *hash* PBKDF2-SHA256 com sal aleatório. Mesmo assim, como tudo fica no navegador, **não use uma senha que você usa em outros sites**. Isso é avisado na tela.
- Após 5 tentativas erradas de login, o site espera 15 minutos.
- Sem servidor de e-mail, a recuperação de senha mostra o link de redefinição na própria tela (válido por 30 minutos).

## Acessibilidade (WCAG 2.2 AA)

Contraste mínimo de 4,5:1 nos textos dos três temas (ex.: texto principal 15,7:1, botão principal 7,5:1). Também há foco sempre visível, link “Pular para o conteúdo”, navegação completa por teclado (abas com setas, diálogos que fecham com Esc), rótulos em todos os campos, erros explicados em texto, botões principais com 44 px de altura (e nenhum alvo de toque menor que 24 px), layout que se adapta de 390 px (celular) até telas grandes e respeito à opção do sistema de reduzir animações.

**Paleta:** Tinta Noturna `#0E1A2B` (texto e áreas escuras), Azul Arena `#1B47C9` (ações), Lima Placar `#C5EE3A` (destaques, nunca como cor de texto), Cal de Quadra `#F4F3EE` (fundo) e Laranja Apito `#C2410C` (jogo em andamento). O modo escuro tem paleta própria (fundo `#0A111C`, ações `#86A6FF`, foco `#D3FF52`).

## Atalhos de teclado

| Tecla | Ação |
|---|---|
| `?` | Lista de atalhos |
| `/` | Ir para a pesquisa da página |
| `Alt + N` | Criar novo campeonato |
| `Alt + T` | Alternar modo claro/escuro |
| `← →` | Trocar de aba |
| `Esc` | Fechar diálogos e o menu |

## Referências

- Regras oficiais: FIVB (https://www.fivb.com/), IFAB (https://theifab.com/laws), FIFA Futsal (https://www.fifa.com/news/the-rules-of-futsal-explained), FIBA (https://www.fiba.basketball/), IHF (https://www.ihf.info/), ITF (https://www.itftennis.com/), BWF (https://corporate.bwfbadminton.com/), ITTF (https://www.ittf.com/handbook/). Os links por modalidade estão na página Regras do site.
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Heurísticas de Nielsen: https://www.nngroup.com/articles/ten-usability-heuristics/
- Ícones: Lucide (licença ISC), https://lucide.dev · Fontes: Barlow (SIL Open Font License), https://fonts.google.com/specimen/Barlow
- As ilustrações das quadras são originais, desenhadas em SVG dentro do `app.js`.
- Desenvolvido com apoio do Claude (Anthropic).

**Observação:** as durações por modalidade (ex.: vôlei 45 min) são estimativas de planejamento, editáveis, e não regras oficiais.
