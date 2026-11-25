/*!
 * ArenaManager — app.js
 * Plataforma de criação e gerenciamento de campeonatos esportivos.
 * JavaScript puro (sem frameworks). Trabalho acadêmico de Engenharia de Software.
 *
 * Organização deste arquivo:
 *   1. Ícones (desenhos da biblioteca Lucide, licença ISC — https://lucide.dev)
 *   2. Dados: modalidades, regras oficiais, paleta de cores
 *   3. Domínio (regras de negócio, sem interface): tempo, confrontos, agenda,
 *      planejador e sugestões, placar, classificação, andamento
 *   4. Validação das etapas do montador
 *   5. Interface: utilitários, armazenamento, contas, preferências, componentes
 *   6. Páginas: início, login/cadastro, painel, campeonatos, montador,
 *      campeonato (programação/resultados/classificação/chave/equipes),
 *      regras, acessibilidade, ajuda, contato
 *   7. Roteador e inicialização
 */
(function () {
'use strict';

/* ======================================================================
 * ÍCONES
 * ====================================================================== */
const ICONS = {
  "menu": "<path d=\"M4 5h16\"/><path d=\"M4 12h16\"/><path d=\"M4 19h16\"/>",
  "x": "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>",
  "moon": "<path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"/>",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/>",
  "log-out": "<path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/>",
  "user-round": "<circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/>",
  "plus": "<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>",
  "keyboard": "<path d=\"M10 8h.01\"/><path d=\"M12 12h.01\"/><path d=\"M14 8h.01\"/><path d=\"M16 12h.01\"/><path d=\"M18 8h.01\"/><path d=\"M6 8h.01\"/><path d=\"M7 16h10\"/><path d=\"M8 12h.01\"/><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/>",
  "shield-alert": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/><path d=\"M12 8v4\"/><path d=\"M12 16h.01\"/>",
  "mail": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\"/><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/>",
  "accessibility": "<circle cx=\"16\" cy=\"4\" r=\"1\"/><path d=\"m18 19 1-7-6 1\"/><path d=\"m5 8 3-3 5.5 3-2.36 3.5\"/><path d=\"M4.24 14.5a5 5 0 0 0 6.88 6\"/><path d=\"M13.76 17.5a5 5 0 0 0-6.88-6\"/>",
  "book-open": "<path d=\"M12 5v16\"/><path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\"/>",
  "wand-sparkles": "<path d=\"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72\"/><path d=\"m14 7 3 3\"/><path d=\"M5 6v4\"/><path d=\"M19 14v4\"/><path d=\"M10 2v2\"/><path d=\"M7 8H3\"/><path d=\"M21 16h-4\"/><path d=\"M11 3H9\"/>",
  "calendar-clock": "<path d=\"M16 2v3\"/><path d=\"M17 15.5v1.7l1 .625\"/><path d=\"M21 8.936V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h3.935\"/><path d=\"M3 9h9.873\"/><path d=\"M8 2v3\"/><circle cx=\"17\" cy=\"17\" r=\"5\"/>",
  "trophy": "<path d=\"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2\"/><path d=\"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2\"/><path d=\"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3\"/><path d=\"M4 22h16\"/><path d=\"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z\"/><path d=\"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3\"/>",
  "file-down": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/><path d=\"M12 18v-6\"/><path d=\"m9 15 3 3 3-3\"/>",
  "gauge": "<path d=\"m12 14 4-4\"/><path d=\"M3.34 19a10 10 0 1 1 17.32 0\"/>",
  "clock-3": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6h4\"/>",
  "arrow-right": "<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>",
  "arrow-left": "<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>",
  "quote": "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"/><path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"/>",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m16 9-5.5 5.5L8 12\"/>",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>",
  "eye-off": "<path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"/><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"/><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"/><path d=\"m2 2 20 20\"/>",
  "check": "<path d=\"M20 6 9 17l-5-5\"/>",
  "circle-play": "<path d=\"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/>",
  "calendar-days": "<path d=\"M8 2v3\"/><path d=\"M16 2v3\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18\"/><path d=\"M8 13h.01\"/><path d=\"M12 13h.01\"/><path d=\"M16 13h.01\"/><path d=\"M8 17h.01\"/><path d=\"M12 17h.01\"/><path d=\"M16 17h.01\"/>",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><path d=\"M16 3.128a4 4 0 0 1 0 7.744\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/>",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"/><path d=\"M20 2v4\"/><path d=\"M22 4h-4\"/><circle cx=\"4\" cy=\"20\" r=\"2\"/>",
  "activity": "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\"/>",
  "pencil": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"/><path d=\"m15 5 4 4\"/>",
  "trash-2": "<path d=\"M10 11v6\"/><path d=\"M14 11v6\"/><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"/><path d=\"M3 6h18\"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/>",
  "search": "<path d=\"m21 21-4.34-4.34\"/><circle cx=\"11\" cy=\"11\" r=\"8\"/>",
  "search-x": "<path d=\"m13.5 8.5-5 5\"/><path d=\"m8.5 8.5 5 5\"/><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>",
  "triangle-alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>",
  "circle-x": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6\"/><path d=\"m9 9 6 6\"/>",
  "upload": "<path d=\"M12 3v12\"/><path d=\"m17 8-5-5-5 5\"/><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/>",
  "coffee": "<path d=\"M10 2v2\"/><path d=\"M14 2v2\"/><path d=\"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1\"/><path d=\"M6 2v2\"/>",
  "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/>",
  "shuffle": "<path d=\"m18 14 4 4-4 4\"/><path d=\"m18 2 4 4-4 4\"/><path d=\"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22\"/><path d=\"M2 6h1.972a4 4 0 0 1 3.6 2.2\"/><path d=\"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45\"/>",
  "lightbulb": "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/>",
  "save": "<path d=\"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\"/><path d=\"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7\"/><path d=\"M7 3v4a1 1 0 0 0 1 1h7\"/>",
  "calendar-range": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v3\"/><path d=\"M3 9h18\"/><path d=\"M8 2v3\"/><path d=\"M17 13h-6\"/><path d=\"M13 17H7\"/><path d=\"M7 13h.01\"/><path d=\"M17 17h.01\"/>",
  "clipboard-list": "<rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\"/><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"/><path d=\"M12 11h4\"/><path d=\"M12 16h4\"/><path d=\"M8 11h.01\"/><path d=\"M8 16h.01\"/>",
  "git-branch": "<path d=\"M15 6a9 9 0 0 0-9 9V3\"/><circle cx=\"18\" cy=\"6\" r=\"3\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/>",
  "file-spreadsheet": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/><path d=\"M8 13h2\"/><path d=\"M14 13h2\"/><path d=\"M8 17h2\"/><path d=\"M14 17h2\"/>",
  "printer": "<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\"/><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\"/>",
  "hourglass": "<path d=\"M5 22h14\"/><path d=\"M5 2h14\"/><path d=\"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22\"/><path d=\"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2\"/>",
  "crown": "<path d=\"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z\"/><path d=\"M5 21h14\"/>",
  "medal": "<path d=\"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15\"/><path d=\"M11 12 5.12 2.2\"/><path d=\"m13 12 5.88-9.8\"/><path d=\"M8 7h8\"/><circle cx=\"12\" cy=\"17\" r=\"5\"/><path d=\"M12 18v-2h-.5\"/>",
  "landmark": "<path d=\"M10 18v-7\"/><path d=\"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z\"/><path d=\"M14 18v-7\"/><path d=\"M18 18v-7\"/><path d=\"M3 22h18\"/><path d=\"M6 18v-7\"/>",
  "settings-2": "<path d=\"M14 17H5\"/><path d=\"M19 7h-9\"/><circle cx=\"17\" cy=\"17\" r=\"3\"/><circle cx=\"7\" cy=\"7\" r=\"3\"/>",
  "external-link": "<path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/>",
  "calendar-check": "<path d=\"M8 2v3\"/><path d=\"M16 2v3\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18\"/><path d=\"m9 15 2 2 4-4\"/>",
  "contrast": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 18a6 6 0 0 0 0-12v12z\"/>",
  "focus": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M3 7V5a2 2 0 0 1 2-2h2\"/><path d=\"M17 3h2a2 2 0 0 1 2 2v2\"/><path d=\"M21 17v2a2 2 0 0 1-2 2h-2\"/><path d=\"M7 21H5a2 2 0 0 1-2-2v-2\"/>",
  "a-arrow-up": "<path d=\"m14 11 4-4 4 4\"/><path d=\"M18 16V7\"/><path d=\"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16\"/><path d=\"M3.304 13h6.392\"/>",
  "a-arrow-down": "<path d=\"m14 12 4 4 4-4\"/><path d=\"M18 16V7\"/><path d=\"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16\"/><path d=\"M3.304 13h6.392\"/>",
  "monitor": "<rect width=\"20\" height=\"14\" x=\"2\" y=\"3\" rx=\"2\"/><line x1=\"8\" x2=\"16\" y1=\"21\" y2=\"21\"/><line x1=\"12\" x2=\"12\" y1=\"17\" y2=\"21\"/>",
  "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\"/><path d=\"m21.854 2.147-10.94 10.939\"/>",
  "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\"/>",
  "circle-help": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5\"/><path d=\"M12 17h.01\"/>",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\"/>",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\"/>",
  "calendar-x-2": "<path d=\"M16 2v3\"/><path d=\"m17 16 5 5\"/><path d=\"m17 21 5-5\"/><path d=\"M21 12V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8\"/><path d=\"M3 9h18\"/><path d=\"M8 2v3\"/>",
  "clipboard-pen": "<path d=\"M16 4h2a2 2 0 0 1 2 2v2\"/><path d=\"M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\"/><path d=\"M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"/><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\"/>",
  "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>",
  "layout-grid": "<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/>",
  "key-round": "<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>",
  "log-in": "<path d=\"m10 17 5-5-5-5\"/><path d=\"M15 12H3\"/><path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"/>",
  "user-plus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\"/><line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\"/>",
  "mail-check": "<path d=\"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/><path d=\"m16 19 2 2 4-4\"/>",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/><path d=\"m9 12 2 2 4-4\"/>",
};

/* ======================================================================
 * DADOS — MODALIDADES
 * ====================================================================== */
/**
 * Base interna de modalidades do ArenaManager.
 *
 * ATENÇÃO: `defaultDuration` é uma ESTIMATIVA DE PLANEJAMENTO (sugestão do sistema),
 * não uma regra oficial. O organizador pode alterar esses valores.
 *
 * `scoring` descreve como o placar é registrado e validado.
 * `standingsPoints` são os pontos padrão na classificação (editáveis por campeonato).
 * Onde o padrão segue uma entidade oficial, isso é indicado em `standingsNote`.
 */

const SPORTS = [
  {
    id: 'volei',
    name: 'Vôlei',
    category: 'quadra',
    defaultDuration: 45,
    venueLabel: 'quadra',
    scoring: { type: 'sets', setsToWin: 3, pointsPerSet: 25, decidingSetPoints: 15, winBy: 2 },
    standingsPoints: { mode: 'fivb' },
    standingsNote: 'Padrão FIVB: vitória por 3–0 ou 3–1 = 3 pts; 3–2 = 2 pts ao vencedor e 1 ao perdedor.',
  },
  {
    id: 'futebol',
    name: 'Futebol',
    category: 'campo',
    defaultDuration: 90,
    venueLabel: 'campo',
    scoring: { type: 'goals', allowDraw: true, unitLabel: 'gols', tiebreakLabel: 'Pênaltis' },
    standingsPoints: { mode: 'wdl', win: 3, draw: 1, loss: 0 },
    standingsNote: 'Padrão mais usado em competições de futebol: vitória 3, empate 1, derrota 0 (o regulamento de cada competição pode definir outro).',
  },
  {
    id: 'futsal',
    name: 'Futsal',
    category: 'quadra',
    defaultDuration: 40,
    venueLabel: 'quadra',
    scoring: { type: 'goals', allowDraw: true, unitLabel: 'gols', tiebreakLabel: 'Pênaltis' },
    standingsPoints: { mode: 'wdl', win: 3, draw: 1, loss: 0 },
    standingsNote: 'Sugestão do sistema: vitória 3, empate 1, derrota 0.',
  },
  {
    id: 'basquete',
    name: 'Basquete',
    category: 'quadra',
    defaultDuration: 40,
    venueLabel: 'quadra',
    scoring: { type: 'goals', allowDraw: false, unitLabel: 'pontos', noDrawReason: 'No basquete não há empate: joga-se prorrogação até haver vencedor.' },
    standingsPoints: { mode: 'wdl', win: 2, draw: 0, loss: 1 },
    standingsNote: 'Padrão FIBA: vitória 2 pts, derrota 1 pt.',
  },
  {
    id: 'handebol',
    name: 'Handebol',
    category: 'quadra',
    defaultDuration: 60,
    venueLabel: 'quadra',
    scoring: { type: 'goals', allowDraw: true, unitLabel: 'gols', tiebreakLabel: 'Tiros de 7 metros' },
    standingsPoints: { mode: 'wdl', win: 2, draw: 1, loss: 0 },
    standingsNote: 'Padrão usado em competições de handebol: vitória 2, empate 1, derrota 0.',
  },
  {
    id: 'tenis',
    name: 'Tênis',
    category: 'raquete',
    defaultDuration: 60,
    venueLabel: 'quadra',
    scoring: { type: 'sets', setsToWin: 2, tennis: true },
    standingsPoints: { mode: 'wdl', win: 1, draw: 0, loss: 0 },
    standingsNote: 'Sugestão do sistema: 1 ponto por vitória; desempate por saldo de sets e de games.',
  },
  {
    id: 'beach-tennis',
    name: 'Beach Tennis',
    category: 'areia',
    defaultDuration: 45,
    venueLabel: 'quadra',
    scoring: { type: 'sets', setsToWin: 2, tennis: true },
    standingsPoints: { mode: 'wdl', win: 1, draw: 0, loss: 0 },
    standingsNote: 'Sugestão do sistema: 1 ponto por vitória; desempate por saldo de sets e de games.',
  },
  {
    id: 'volei-praia',
    name: 'Vôlei de praia',
    category: 'areia',
    defaultDuration: 45,
    venueLabel: 'quadra',
    scoring: { type: 'sets', setsToWin: 2, pointsPerSet: 21, decidingSetPoints: 15, winBy: 2 },
    standingsPoints: { mode: 'wdl', win: 2, draw: 0, loss: 1 },
    standingsNote: 'Sugestão do sistema: vitória 2 pts, derrota 1 pt.',
  },
  {
    id: 'badminton',
    name: 'Badminton',
    category: 'raquete',
    defaultDuration: 40,
    venueLabel: 'quadra',
    scoring: { type: 'sets', setsToWin: 2, pointsPerSet: 21, decidingSetPoints: 21, winBy: 2, cap: 30 },
    standingsPoints: { mode: 'wdl', win: 1, draw: 0, loss: 0 },
    standingsNote: 'Sugestão do sistema: 1 ponto por vitória.',
  },
  {
    id: 'tenis-mesa',
    name: 'Tênis de mesa',
    category: 'raquete',
    defaultDuration: 30,
    venueLabel: 'mesa',
    scoring: { type: 'sets', setsToWin: 3, pointsPerSet: 11, decidingSetPoints: 11, winBy: 2 },
    standingsPoints: { mode: 'wdl', win: 1, draw: 0, loss: 0 },
    standingsNote: 'Sugestão do sistema: 1 ponto por vitória.',
  },
];

const SPORT_CATEGORIES = [
  { id: 'todos', label: 'Todas' },
  { id: 'quadra', label: 'Quadra' },
  { id: 'campo', label: 'Campo' },
  { id: 'raquete', label: 'Raquete e mesa' },
  { id: 'areia', label: 'Areia' },
];

const CATEGORIES = [
  { id: 'masculino', label: 'Masculino' },
  { id: 'feminino', label: 'Feminino' },
  { id: 'misto', label: 'Misto' },
  { id: 'livre', label: 'Livre' },
];

function getSport(id) {
  return SPORTS.find((s) => s.id === id) ?? SPORTS[0];
}

/** Mescla durações personalizadas do organizador com a base interna. */
function getDurationTable(overrides = {}) {
  return SPORTS.map((s) => ({
    id: s.id,
    name: s.name,
    duration: Number(overrides[s.id]) > 0 ? Number(overrides[s.id]) : s.defaultDuration,
    isCustom: Number(overrides[s.id]) > 0 && Number(overrides[s.id]) !== s.defaultDuration,
  }));
}

/* ======================================================================
 * DADOS — REGRAS OFICIAIS
 * ====================================================================== */
/**
 * Conteúdo da seção "Regras dos Esportes".
 *
 * - Cada modalidade indica a ENTIDADE que regulamenta o esporte e o DOCUMENTO de referência.
 * - Os textos são RESUMOS informativos em português, escritos para este projeto a partir das fontes
 *   listadas em `sources`. Em caso de dúvida, vale sempre o documento oficial vigente.
 * - Regulamentos de competições (federações nacionais, ligas, escolas) podem adaptar regras.
 * - A "sugestão do sistema" (duração estimada para planejamento) fica em data/sports.js e é
 *   exibida separadamente, nunca misturada com a regra oficial.
 *
 * Para atualizar: edite o objeto da modalidade, mantenha `reviewedAt` com a data da revisão
 * e confira as URLs em `sources`.
 */

const RULES_REVIEWED_AT = '2026-11-25';

const RULES = [
  {
    sportId: 'volei',
    body: 'FIVB — Fédération Internationale de Volleyball',
    bodyShort: 'FIVB',
    document: 'Official Volleyball Rules 2025–2028',
    nationalBody: 'No Brasil: Confederação Brasileira de Voleibol (CBV)',
    sections: {
      objective: 'Enviar a bola por cima da rede de modo que ela toque o chão da quadra adversária, e impedir que o adversário faça o mesmo.',
      players: '6 jogadores em quadra por equipe. O líbero é um jogador especialista em defesa, com uniforme de cor diferente.',
      field: 'Quadra de 18 m × 9 m, dividida em duas metades de 9 m × 9 m, com zona livre mínima de 3 m em volta. Rede a 2,43 m (masculino) e 2,24 m (feminino). Linha de ataque a 3 m da linha central.',
      duration: 'Não há tempo fixo: a partida é disputada em melhor de 5 sets. A duração depende do equilíbrio do jogo.',
      scoring: 'Sistema de ponto por rali: todo rali vale ponto. Sets 1 a 4 vão até 25 pontos, com 2 de vantagem (ex.: 26–24). O 5º set (tie-break) vai até 15 pontos, também com 2 de vantagem. Vence quem ganhar 3 sets.',
      mainRules: [
        'Cada equipe tem no máximo 3 toques para devolver a bola (o toque do bloqueio não conta).',
        'O mesmo jogador não pode tocar a bola duas vezes seguidas (exceto no bloqueio).',
        'Ao recuperar o direito de sacar, a equipe faz o rodízio no sentido horário.',
        'Jogadores da defesa não podem atacar a bola acima da rede a partir da zona de ataque.',
      ],
      fouls: 'Faltas comuns: tocar a rede entre as antenas, invadir a quadra adversária por baixo da rede, conduzir ou carregar a bola, dois toques, erro de rodízio e saque irregular. Comportamentos antidesportivos recebem sanções progressivas (advertência, penalidade com ponto para o adversário, expulsão e desqualificação).',
      substitutions: 'Até 6 substituições por set por equipe. As trocas do líbero são ilimitadas e não contam nesse total.',
      equipment: 'Bola esférica de couro ou material sintético, uniformes numerados, rede com antenas e postes.',
      tiebreak: 'Em fases de classificação, a FIVB costuma ordenar por número de vitórias, pontos de classificação, razão de sets e razão de pontos. Pontos de classificação: vitória por 3–0 ou 3–1 vale 3 pontos; vitória por 3–2 vale 2 ao vencedor e 1 ao perdedor.',
      refereeing: '1º árbitro (sobre a plataforma), 2º árbitro, apontador e juízes de linha.',
    },
    sources: [
      { label: 'FIVB — site oficial (regras da modalidade)', url: 'https://www.fivb.com/' },
      { label: 'Olympics.com — Volleyball rules', url: 'https://olympics.com/en/news/how-to-play-volleyball-rules-game-court-about-match-set-smash-spike' },
    ],
  },
  {
    sportId: 'futebol',
    body: 'IFAB — International Football Association Board (aplicadas pela FIFA)',
    bodyShort: 'IFAB / FIFA',
    document: 'Laws of the Game (Regras do Jogo), edição vigente',
    nationalBody: 'No Brasil: Confederação Brasileira de Futebol (CBF)',
    sections: {
      objective: 'Marcar mais gols que o adversário. É gol quando a bola ultrapassa totalmente a linha de meta, entre as traves e por baixo do travessão.',
      players: '11 jogadores por equipe, sendo um goleiro. A partida não começa nem continua se uma equipe tiver menos de 7 jogadores.',
      field: 'Retangular, com comprimento entre 90 e 120 m e largura entre 45 e 90 m. Em jogos internacionais: 100–110 m × 64–75 m.',
      duration: '2 tempos de 45 minutos, com intervalo de até 15 minutos. O árbitro pode acrescentar tempo pelas paralisações.',
      scoring: 'Cada gol vale 1. Vence quem marcar mais gols; o empate é possível no tempo normal.',
      mainRules: [
        'Impedimento: o atacante não pode participar do lance estando adiantado em relação à bola e ao penúltimo defensor no momento do passe.',
        'Bola fora pela lateral: arremesso lateral com as mãos; pela linha de fundo: tiro de meta ou escanteio.',
        'Somente o goleiro pode tocar a bola com as mãos, e apenas dentro da sua área penal.',
      ],
      fouls: 'Faltas são punidas com tiro livre direto, tiro livre indireto ou pênalti (falta com tiro livre direto dentro da área). Cartão amarelo é advertência; cartão vermelho é expulsão (dois amarelos geram vermelho).',
      substitutions: 'Em competições oficiais, até 5 substituições por equipe, conforme o regulamento. Nas competições de alto nível que adotam 5 trocas, cada equipe tem no máximo 3 oportunidades durante o jogo, além do intervalo.',
      equipment: 'Bola esférica (tamanho 5 no futebol adulto), camisa, calção, meias, caneleiras e calçados. Os goleiros usam cores diferentes.',
      tiebreak: 'Em jogos eliminatórios empatados, o regulamento da competição define prorrogação (2 tempos de 15 min) e/ou tiros do ponto penal. Em fases de pontos, os critérios de desempate são definidos pelo regulamento da competição.',
      refereeing: 'Árbitro, dois árbitros assistentes e, em algumas competições, quarto árbitro e árbitro de vídeo (VAR).',
    },
    sources: [
      { label: 'The IFAB — Laws of the Game', url: 'https://theifab.com/laws' },
      { label: 'The IFAB — Modificações (número de substituições)', url: 'https://theifab.com/laws/latest/general-modifications' },
    ],
  },
  {
    sportId: 'futsal',
    body: 'FIFA — Fédération Internationale de Football Association',
    bodyShort: 'FIFA',
    document: 'Futsal Laws of the Game 2025–26',
    nationalBody: 'No Brasil: Confederação Brasileira de Futebol de Salão (CBFS)',
    sections: {
      objective: 'Marcar mais gols que o adversário, em uma quadra menor e com jogo mais rápido que o futebol de campo.',
      players: '5 jogadores por equipe em quadra, sendo um goleiro.',
      field: 'Quadra de 25 a 42 m de comprimento e 16 a 25 m de largura. Em jogos internacionais: 38–42 m × 20–25 m.',
      duration: '2 períodos de 20 minutos de tempo cronometrado (o relógio para quando a bola sai de jogo), com intervalo de até 15 minutos. Cada equipe tem direito a 1 pedido de tempo de 1 minuto por período.',
      scoring: 'Cada gol vale 1. O empate é possível no tempo normal.',
      mainRules: [
        'Não existe impedimento.',
        'Reinícios (lateral, escanteio, tiro livre) devem ser cobrados em até 4 segundos.',
        'A bola é menor e quica menos que a do futebol de campo.',
      ],
      fouls: 'As faltas punidas com tiro livre direto ou pênalti são contadas como faltas acumuladas em cada período. A partir da 6ª falta acumulada de uma equipe no período, o adversário cobra tiro livre direto sem barreira. Jogador expulso deixa sua equipe com um a menos por 2 minutos ou até a equipe sofrer um gol.',
      substitutions: 'Ilimitadas e "volantes" (com a bola em jogo), sempre pela zona de substituição da própria equipe.',
      equipment: 'Bola tamanho 4, camisa numerada, calção, meias, caneleiras e calçado próprio para quadra.',
      tiebreak: 'Em jogos eliminatórios empatados, o regulamento pode prever prorrogação e/ou tiros do ponto penal. As faltas acumuladas do 2º período continuam contando na prorrogação.',
      refereeing: 'Árbitro, segundo árbitro e, em competições oficiais, terceiro árbitro e cronometrista.',
    },
    sources: [
      { label: 'FIFA — The rules of Futsal explained', url: 'https://www.fifa.com/news/the-rules-of-futsal-explained' },
      { label: 'FIFA — A crash course in futsal rules', url: 'https://www.fifa.com/news/a-crash-course-in-futsal-rules' },
    ],
  },
  {
    sportId: 'basquete',
    body: 'FIBA — Fédération Internationale de Basketball',
    bodyShort: 'FIBA',
    document: 'Official Basketball Rules (edição vigente)',
    nationalBody: 'No Brasil: Confederação Brasileira de Basketball (CBB)',
    sections: {
      objective: 'Fazer a bola passar por dentro da cesta adversária e impedir que o adversário faça cestas.',
      players: '5 jogadores em quadra por equipe; até 12 jogadores relacionados para a partida.',
      field: 'Quadra de 28 m × 15 m. Aro a 3,05 m do chão. Linha de 3 pontos a 6,75 m da cesta.',
      duration: '4 quartos de 10 minutos de tempo cronometrado. Não existe empate: se o placar estiver igual, jogam-se prorrogações de 5 minutos até haver um vencedor.',
      scoring: 'Lance livre vale 1 ponto; cesta de dentro da linha de 3 vale 2; cesta de fora da linha de 3 vale 3.',
      mainRules: [
        'A equipe tem 24 segundos para arremessar a cada posse de bola.',
        'São 8 segundos para levar a bola da quadra de defesa para a de ataque.',
        'O atacante não pode ficar mais de 3 segundos seguidos no garrafão adversário.',
        'Andar com a bola sem quicar ou voltar a quicar depois de segurar são violações.',
      ],
      fouls: 'Jogador com 5 faltas é excluído da partida. A partir da 5ª falta coletiva da equipe em um quarto, as faltas seguintes geram lances livres para o adversário.',
      substitutions: 'Ilimitadas, feitas com a bola morta e autorizadas pela arbitragem.',
      equipment: 'Bola tamanho 7 (masculino) ou 6 (feminino), tabelas e aros, placar e relógio de 24 segundos.',
      tiebreak: 'Na classificação FIBA a vitória vale 2 pontos e a derrota 1 ponto. Em caso de empate em pontos, considera-se primeiro o resultado dos jogos entre as equipes empatadas.',
      refereeing: 'Um árbitro principal e um ou dois auxiliares, com apoio da mesa (apontador, cronometrista e operador do relógio de 24 s).',
    },
    sources: [
      { label: 'FIBA — site oficial (documentos e regras)', url: 'https://www.fiba.basketball/' },
    ],
  },
  {
    sportId: 'handebol',
    body: 'IHF — International Handball Federation',
    bodyShort: 'IHF',
    document: 'IX. Rules of the Game — a) Indoor Handball (edição de 1º de julho de 2025)',
    nationalBody: 'No Brasil: Confederação Brasileira de Handebol (CBHb)',
    sections: {
      objective: 'Arremessar a bola com as mãos para dentro do gol adversário mais vezes que o oponente.',
      players: '7 jogadores em quadra por equipe (6 de linha e 1 goleiro).',
      field: 'Quadra de 40 m × 20 m. Área de gol de 6 m; linha de tiro livre a 9 m. Gol de 3 m de largura por 2 m de altura.',
      duration: 'Para atletas a partir de 16 anos: 2 tempos de 30 minutos, com intervalo normal de 10 minutos. Categorias de base têm tempos menores (2 × 25 min ou 2 × 20 min).',
      scoring: 'Cada gol vale 1. O empate é possível no tempo normal.',
      mainRules: [
        'O jogador pode dar no máximo 3 passos com a bola na mão.',
        'O jogador pode segurar a bola por no máximo 3 segundos.',
        'Somente o goleiro pode ficar dentro da área de gol.',
        'Jogo passivo (manter a posse sem tentar atacar) é punido.',
      ],
      fouls: 'Punição progressiva: advertência (cartão amarelo), exclusão de 2 minutos (a equipe joga com um a menos) e desqualificação (cartão vermelho). A terceira exclusão de um mesmo jogador gera desqualificação. Faltas que impedem uma chance clara de gol resultam em tiro de 7 metros.',
      substitutions: 'Ilimitadas, sem avisar a arbitragem, desde que feitas pela zona de substituição da própria equipe.',
      equipment: 'Bola tamanho 1, 2 ou 3, conforme idade e gênero; uniformes numerados; goleiro com cor diferente.',
      tiebreak: 'Quando é preciso um vencedor: prorrogação de 2 × 5 minutos; persistindo o empate, nova prorrogação; depois, tiros de 7 metros.',
      refereeing: 'Dupla de árbitros com o mesmo poder de decisão, mais cronometrista e secretário.',
    },
    sources: [
      { label: 'IHF — Resumo das regras (folheto oficial)', url: 'https://www.ihf.info/sites/default/files/2020-03/IHF_trifold_rules_FV_E.pdf' },
      { label: 'IHF — Rules of the Game (Indoor Handball)', url: 'https://www.ihf.info/sites/default/files/2022-03/09A%20-%20Rules%20of%20the%20Game_Indoor%20Handball_E.pdf' },
    ],
  },
  {
    sportId: 'tenis',
    body: 'ITF — International Tennis Federation',
    bodyShort: 'ITF',
    document: 'ITF Rules of Tennis 2026',
    nationalBody: 'No Brasil: Confederação Brasileira de Tênis (CBT)',
    sections: {
      objective: 'Golpear a bola com a raquete por cima da rede para dentro da quadra adversária, de modo que o oponente não consiga devolvê-la.',
      players: 'Simples (1 contra 1) ou duplas (2 contra 2).',
      field: 'Quadra de 23,77 m de comprimento por 8,23 m de largura (simples) ou 10,97 m (duplas). A rede tem 0,914 m de altura no centro.',
      duration: 'Não há tempo fixo. A partida é em melhor de 3 sets (ou de 5 em alguns torneios masculinos).',
      scoring: 'Pontos de um game: 15, 30, 40 e game; em 40–40 (iguais), é preciso fazer 2 pontos seguidos. Um set é vencido com 6 games e 2 de vantagem; em 6–6 joga-se o tie-break (até 7 pontos com 2 de vantagem).',
      mainRules: [
        'O saque é feito na diagonal, alternando os lados a cada ponto; o sacador tem duas tentativas.',
        'A bola pode quicar no máximo uma vez antes de ser devolvida.',
        'Os jogadores trocam de lado nos games ímpares de cada set.',
      ],
      fouls: 'Dupla falta (errar os dois saques), pisar na linha ao sacar, tocar a rede com o corpo ou a raquete e golpear a bola duas vezes. O código de conduta das competições prevê advertência, perda de ponto e perda de game.',
      substitutions: 'Não há substituições.',
      equipment: 'Raquete e bolas aprovadas pela ITF.',
      tiebreak: 'Em torneios de grupo, os critérios de desempate (vitórias, saldo de sets e de games, confronto direto) são definidos pelo regulamento da competição.',
      refereeing: 'Árbitro de cadeira, juízes de linha ou sistema eletrônico, e árbitro geral do torneio.',
    },
    sources: [
      { label: 'ITF — Rules of Tennis 2026 (PDF)', url: 'https://www.itftennis.com/media/7221/2026-rules-of-tennis-english.pdf' },
      { label: 'ITF — Tennis glossary', url: 'https://itftennis.com/en/about-us/organisation/tennis-glossary' },
    ],
  },
  {
    sportId: 'beach-tennis',
    body: 'ITF — International Tennis Federation',
    bodyShort: 'ITF',
    document: 'ITF Rules of Beach Tennis',
    nationalBody: 'No Brasil: Confederação Brasileira de Tênis (CBT)',
    sections: {
      objective: 'Golpear a bola com a raquete por cima da rede, sem deixá-la tocar a areia, até que o adversário não consiga devolver.',
      players: 'Jogado principalmente em duplas; também existe a modalidade simples.',
      field: 'Quadra de areia de 16 m × 8 m (duplas); para simples, 16 m × 4,5 m. Rede a 1,70 m de altura; nos torneios masculinos do circuito mundial da ITF, 1,80 m.',
      duration: 'Não há tempo fixo. O formato (número de sets) é definido pelo regulamento da competição.',
      scoring: 'Contagem semelhante à do tênis (15, 30, 40, game), sem vantagem: em 40–40, o ponto seguinte decide o game. Os sets vão a 6 games, com tie-break em 6–6.',
      mainRules: [
        'A bola não pode quicar na areia: é sempre golpeada no ar.',
        'Cada sacador tem uma única tentativa de saque.',
        'A bola pode tocar a rede no saque e continuar em jogo.',
      ],
      fouls: 'Errar o saque, deixar a bola tocar a areia do próprio lado, tocar a rede com o corpo ou a raquete e golpear a bola duas vezes.',
      substitutions: 'Não há substituições.',
      equipment: 'Raquete de beach tennis (sem cordas) e bola de pressão reduzida aprovada pela ITF.',
      tiebreak: 'Definido pelo regulamento de cada competição.',
      refereeing: 'Árbitro de cadeira nas partidas oficiais; em torneios amadores é comum a autoarbitragem.',
    },
    sources: [
      { label: 'ITF — A guide to beach tennis', url: 'https://itftennis.com/en/news-and-media/articles/a-guide-to-beach-tennis' },
      { label: 'ITF — Rules of Beach Tennis 2023 (PDF)', url: 'https://www.itftennis.com/media/8999/rules-of-beach-tennis-2023.pdf' },
    ],
  },
  {
    sportId: 'volei-praia',
    body: 'FIVB — Fédération Internationale de Volleyball',
    bodyShort: 'FIVB',
    document: 'Official Beach Volleyball Rules 2025–2028',
    nationalBody: 'No Brasil: Confederação Brasileira de Voleibol (CBV)',
    sections: {
      objective: 'Fazer a bola tocar a areia da quadra adversária, passando por cima da rede, e impedir que o adversário faça o mesmo.',
      players: '2 jogadores por equipe.',
      field: 'Quadra de areia de 16 m × 8 m, com zona livre mínima de 3 m. Rede a 2,43 m (masculino) e 2,24 m (feminino).',
      duration: 'Não há tempo fixo: a partida é em melhor de 3 sets.',
      scoring: 'Ponto por rali. Os sets 1 e 2 vão até 21 pontos, com 2 de vantagem; o 3º set (desempate) vai até 15, também com 2 de vantagem.',
      mainRules: [
        'Cada equipe tem até 3 toques; no vôlei de praia o toque do bloqueio conta como um deles.',
        'As equipes trocam de lado a cada 7 pontos nos sets 1 e 2, e a cada 5 pontos no 3º set.',
        'Não há posições fixas nem rodízio como no vôlei de quadra, mas a ordem de saque deve ser mantida.',
      ],
      fouls: 'Faltas comuns: tocar a rede, conduzir a bola, dois toques, erro na ordem de saque e "largada" com as pontas dos dedos.',
      substitutions: 'Não há substituições.',
      equipment: 'Bola própria para areia, rede com antenas e marcação da quadra com fitas.',
      tiebreak: 'Os critérios de classificação em grupos são definidos pelo regulamento da competição.',
      refereeing: '1º e 2º árbitros, apontador e juízes de linha nas competições oficiais.',
    },
    sources: [
      { label: 'FIVB — Beach Volleyball basic rules', url: 'https://www.fivb.com/beach-volleyball/the-game/basic-rules/' },
      { label: 'FIVB — Official Beach Volleyball Rules', url: 'https://www.fivb.com/beach-volleyball/the-game/official-rules-of-the-games/' },
    ],
  },
  {
    sportId: 'badminton',
    body: 'BWF — Badminton World Federation',
    bodyShort: 'BWF',
    document: 'Laws of Badminton (edição vigente)',
    nationalBody: 'No Brasil: Confederação Brasileira de Badminton (CBBd)',
    sections: {
      objective: 'Golpear a peteca por cima da rede para que ela caia dentro da quadra adversária.',
      players: 'Simples (1 contra 1), duplas ou duplas mistas.',
      field: 'Quadra de 13,40 m × 6,10 m (duplas); a quadra de simples tem 5,18 m de largura. A rede tem 1,524 m de altura no centro.',
      duration: 'Não há tempo fixo. A partida é em melhor de 3 games.',
      scoring: 'Ponto por rali. Cada game vai até 21 pontos; em 20–20, vence quem abrir 2 pontos de vantagem; em 29–29, quem fizer o 30º ponto vence o game.',
      mainRules: [
        'O saque é feito por baixo, na diagonal, e a peteca deve ser golpeada abaixo da altura definida pela regra.',
        'Há um intervalo curto quando um lado chega a 11 pontos em um game.',
        'A peteca só pode ser golpeada uma vez de cada lado.',
      ],
      fouls: 'Peteca fora da quadra, tocar a rede com o corpo ou a raquete, invadir o lado adversário, saque irregular e golpe duplo.',
      substitutions: 'Não há substituições durante a partida.',
      equipment: 'Raquete e peteca (de penas ou sintética) aprovadas.',
      tiebreak: 'Definido pelo regulamento da competição (em geral vitórias, games e pontos).',
      refereeing: 'Árbitro (umpire), juiz de serviço e juízes de linha nas competições oficiais.',
    },
    sources: [
      { label: 'BWF — site institucional (estatutos e regras)', url: 'https://corporate.bwfbadminton.com/' },
    ],
  },
  {
    sportId: 'tenis-mesa',
    body: 'ITTF — International Table Tennis Federation',
    bodyShort: 'ITTF',
    document: 'ITTF Handbook — The Laws of Table Tennis',
    nationalBody: 'No Brasil: Confederação Brasileira de Tênis de Mesa (CBTM)',
    sections: {
      objective: 'Golpear a bola com a raquete por cima da rede para que ela quique no lado adversário, sem que o oponente consiga devolvê-la.',
      players: 'Simples (1 contra 1) ou duplas.',
      field: 'Mesa de 2,74 m × 1,525 m, com a superfície a 76 cm do chão. A rede tem 15,25 cm de altura.',
      duration: 'Não há tempo fixo. A partida é em melhor de um número ímpar de games (3, 5 ou 7). Se um game passar de 10 minutos, entra em vigor o sistema de aceleração (exceto se já houver pelo menos 18 pontos no game).',
      scoring: 'Cada game vai até 11 pontos; em 10–10, vence quem abrir 2 pontos de vantagem.',
      mainRules: [
        'O saque alterna a cada 2 pontos; a partir de 10–10, alterna a cada ponto.',
        'No saque, a bola é lançada da palma da mão aberta, praticamente na vertical, a pelo menos 16 cm de altura.',
        'Bola que toca a borda superior da mesa é válida; na lateral da mesa, não.',
      ],
      fouls: 'Saque irregular, mover a mesa, tocar a rede, apoiar a mão livre na mesa e devolver a bola sem que ela quique do seu lado.',
      substitutions: 'Não há substituições durante a partida.',
      equipment: 'Bola de 40 mm e raquete com um lado preto e outro de cor diferente aprovada.',
      tiebreak: 'Em grupos, o regulamento define os critérios (vitórias, razão de games e de pontos).',
      refereeing: 'Árbitro e árbitro assistente.',
    },
    sources: [
      { label: 'ITTF — Handbook', url: 'https://www.ittf.com/handbook/' },
    ],
  },
];

const RULE_SECTIONS = [
  { key: 'objective', label: 'Objetivo', tab: 'overview' },
  { key: 'players', label: 'Quantidade de jogadores', tab: 'overview' },
  { key: 'field', label: 'Dimensões oficiais', tab: 'overview' },
  { key: 'duration', label: 'Duração das partidas', tab: 'overview' },
  { key: 'scoring', label: 'Sistema de pontuação', tab: 'game' },
  { key: 'mainRules', label: 'Regras principais', tab: 'game' },
  { key: 'tiebreak', label: 'Regras de desempate', tab: 'game' },
  { key: 'fouls', label: 'Faltas e penalidades', tab: 'conduct' },
  { key: 'substitutions', label: 'Substituições', tab: 'conduct' },
  { key: 'equipment', label: 'Equipamentos necessários', tab: 'conduct' },
  { key: 'refereeing', label: 'Arbitragem', tab: 'conduct' },
];

const RULE_TABS = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'game', label: 'Pontuação e jogo' },
  { id: 'conduct', label: 'Faltas, trocas e arbitragem' },
  { id: 'sources', label: 'Fontes' },
];

/* ======================================================================
 * DADOS — PALETA E CONTRASTE
 * ====================================================================== */
/**
 * Paleta oficial do ArenaManager. Fonte única usada pelo CSS (tokens.css espelha estes valores),
 * pela página de acessibilidade e pelo script de verificação de contraste (scripts/contrast-check.js).
 */
const PALETTE = {
  light: {
    bg: '#F4F3EE',          // Cal de Quadra — fundo da página
    surface: '#FFFFFF',     // cartões
    surface2: '#ECEBE4',    // áreas secundárias
    border: '#CFCCC0',      // bordas discretas
    text: '#0E1A2B',        // Tinta Noturna — texto principal
    textMuted: '#4A5768',   // texto secundário
    primary: '#1B47C9',     // Azul Arena — ações principais
    primaryHover: '#15389F',
    onPrimary: '#FFFFFF',
    accent: '#C5EE3A',      // Lima Placar — destaques e marcações
    onAccent: '#0E1A2B',
    secondary: '#C2410C',   // Laranja Apito — "ao vivo", alertas de atenção, detalhes
    onSecondary: '#FFFFFF',
    success: '#126B43',
    warning: '#8A4B00',
    danger: '#B42323',
    info: '#1B47C9',
    focus: '#1B47C9',
  },
  dark: {
    bg: '#0A111C',
    surface: '#111B2A',
    surface2: '#172438',
    border: '#2A3A52',
    text: '#E9EEF5',
    textMuted: '#A3B1C2',
    primary: '#86A6FF',
    primaryHover: '#A9C0FF',
    onPrimary: '#0A111C',
    accent: '#D3FF52',
    onAccent: '#0A111C',
    secondary: '#FF8A4C',
    onSecondary: '#0A111C',
    success: '#5BE0A0',
    warning: '#FFC266',
    danger: '#FF8A8A',
    info: '#86A6FF',
    focus: '#D3FF52',
  },
  highContrast: {
    bg: '#000000',
    surface: '#000000',
    surface2: '#0D0D0D',
    border: '#FFFFFF',
    text: '#FFFFFF',
    textMuted: '#F0F0F0',
    primary: '#FFE14D',
    primaryHover: '#FFF09A',
    onPrimary: '#000000',
    accent: '#FFE14D',
    onAccent: '#000000',
    secondary: '#FFB27A',
    onSecondary: '#000000',
    success: '#7CFFB2',
    warning: '#FFE14D',
    danger: '#FF9C9C',
    info: '#9CC2FF',
    focus: '#FFE14D',
  },
};

/** Pares de cor que a interface realmente usa e o mínimo exigido pela WCAG 2.2 AA. */
const CONTRAST_PAIRS = [
  ['text', 'bg', 4.5, 'Texto principal sobre o fundo'],
  ['text', 'surface', 4.5, 'Texto principal sobre cartões'],
  ['text', 'surface2', 4.5, 'Texto sobre áreas secundárias'],
  ['textMuted', 'bg', 4.5, 'Texto secundário sobre o fundo'],
  ['textMuted', 'surface', 4.5, 'Texto secundário sobre cartões'],
  ['textMuted', 'surface2', 4.5, 'Texto secundário sobre áreas secundárias'],
  ['onPrimary', 'primary', 4.5, 'Texto de botão principal'],
  ['onPrimary', 'primaryHover', 4.5, 'Texto de botão principal (hover)'],
  ['primary', 'surface', 4.5, 'Links e ícones de ação sobre cartões'],
  ['primary', 'bg', 4.5, 'Links sobre o fundo'],
  ['onAccent', 'accent', 4.5, 'Texto sobre destaque lima'],
  ['onSecondary', 'secondary', 4.5, 'Texto sobre selo laranja'],
  ['secondary', 'surface', 4.5, 'Texto laranja sobre cartões'],
  ['success', 'surface', 4.5, 'Mensagem de sucesso'],
  ['warning', 'surface', 4.5, 'Mensagem de atenção'],
  ['danger', 'surface', 4.5, 'Mensagem de erro'],
  ['border', 'surface', 1.4, 'Borda decorativa de cartão (não informativa)'],
  ['textMuted', 'surface', 3, 'Borda de campo de formulário (componente de interface, 1.4.11)'],
  ['focus', 'bg', 3, 'Indicador de foco sobre o fundo (2.4.13 / 1.4.11)'],
  ['focus', 'surface', 3, 'Indicador de foco sobre cartões'],
];

function channel(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/* ======================================================================
 * DOMÍNIO — TEMPO
 * ====================================================================== */
/**
 * Utilitários de tempo usados pelo algoritmo de agendamento.
 * Horários do dia são representados em minutos desde 00:00 (ex.: 08:30 → 510).
 * Datas são strings ISO "AAAA-MM-DD" tratadas em UTC para evitar problemas de fuso.
 */

const DAY_MS = 86_400_000;

function toMinutes(hhmm) {
  if (typeof hhmm !== 'string' || !/^\d{1,2}:\d{2}$/.test(hhmm)) return NaN;
  const [h, m] = hhmm.split(':').map(Number);
  if (h > 24 || m > 59) return NaN;
  return h * 60 + m;
}

function toHHMM(minutes) {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function isValidISODate(iso) {
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
}

/** Lista todas as datas entre início e fim (inclusive). */
function listDates(startISO, endISO) {
  if (!isValidISODate(startISO) || !isValidISODate(endISO)) return [];
  const out = [];
  let t = Date.parse(`${startISO}T00:00:00Z`);
  const end = Date.parse(`${endISO}T00:00:00Z`);
  while (t <= end && out.length < 366) {
    out.push(new Date(t).toISOString().slice(0, 10));
    t += DAY_MS;
  }
  return out;
}

function addDays(iso, days) {
  const t = Date.parse(`${iso}T00:00:00Z`) + days * DAY_MS;
  return new Date(t).toISOString().slice(0, 10);
}

/** Minutos absolutos (desde a época Unix) de uma data + horário. Permite comparar dias diferentes. */
function absoluteMinutes(iso, minutesOfDay) {
  return Date.parse(`${iso}T00:00:00Z`) / 60000 + minutesOfDay;
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function formatDateBR(iso) {
  if (!isValidISODate(iso)) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
function weekdayShort(iso) {
  if (!isValidISODate(iso)) return '';
  return WEEKDAYS[new Date(`${iso}T00:00:00Z`).getUTCDay()];
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
}

/* ======================================================================
 * DOMÍNIO — CONFRONTOS
 * ====================================================================== */
/**
 * Geração de confrontos (chaveamento) para cada formato de campeonato.
 *
 * Os participantes de uma partida são REFERÊNCIAS, porque nas fases eliminatórias
 * os times só são conhecidos depois que os jogos anteriores terminam:
 *   { kind: 'team',   teamId }            equipe conhecida
 *   { kind: 'winner', matchId }           vencedor de outra partida
 *   { kind: 'loser',  matchId }           perdedor de outra partida (eliminatória dupla / 3º lugar)
 *   { kind: 'group',  groupId, position } colocado de um grupo (ex.: 1º do Grupo A)
 *   { kind: 'bye' }                       vaga vazia (avanço automático)
 *
 * Este módulo não depende de React: é usado pela interface, pelos testes e pela documentação.
 */

const FORMATS = [
  {
    id: 'single-elimination',
    name: 'Eliminatória simples',
    short: 'Mata-mata',
    description: 'Quem perde está fora. É o formato mais rápido: N equipes precisam de N − 1 jogos.',
    minTeams: 2,
  },
  {
    id: 'double-elimination',
    name: 'Eliminatória dupla',
    short: 'Dupla eliminação',
    description: 'A equipe só é eliminada após a segunda derrota. Há chave superior, chave inferior e grande final.',
    minTeams: 3,
  },
  {
    id: 'round-robin',
    name: 'Todos contra todos',
    short: 'Turno único',
    description: 'Cada equipe enfrenta todas as outras uma única vez. Campeã é a líder da classificação.',
    minTeams: 2,
  },
  {
    id: 'groups-knockout',
    name: 'Fase de grupos + semifinal + final',
    short: 'Grupos + mata-mata',
    description: 'Grupos em todos contra todos; as melhores de cada grupo avançam para o mata-mata.',
    minTeams: 4,
  },
  {
    id: 'league',
    name: 'Pontos corridos',
    short: 'Turno e returno',
    description: 'Todos contra todos em dois turnos (ida e volta). Campeã é quem somar mais pontos.',
    minTeams: 2,
  },
  {
    id: 'custom-groups',
    name: 'Grupos personalizados',
    short: 'Grupos sob medida',
    description: 'Você escolhe quantos grupos, quais equipes ficam em cada um e se haverá mata-mata.',
    minTeams: 2,
  },
];

const getFormat = (id) => FORMATS.find((f) => f.id === id) ?? FORMATS[0];

/* ---------- referências ---------- */
const BYE = Object.freeze({ kind: 'bye' });
const teamRef = (teamId) => ({ kind: 'team', teamId });
const winnerOf = (matchId) => ({ kind: 'winner', matchId });
const loserOf = (matchId) => ({ kind: 'loser', matchId });
const groupPos = (groupId, position) => ({ kind: 'group', groupId, position });

const groupLetter = (index) => String.fromCharCode(65 + index);

function idFactory(prefix = 'm') {
  let n = 0;
  return () => `${prefix}${++n}`;
}

function createMatch(fields) {
  return {
    stage: 'league',
    phase: '',
    round: null,
    groupId: null,
    conditional: false,
    status: 'scheduled',
    result: null,
    ...fields,
  };
}

function nextPowerOfTwo(n) {
  let p = 1;
  while (p < n) p *= 2;
  return p;
}

/** Ordem clássica de cabeças de chave: 1×8, 4×5, 2×7, 3×6 (para 8 vagas). */
function seedOrder(size) {
  let order = [1];
  while (order.length < size) {
    const len = order.length * 2;
    order = order.flatMap((s) => [s, len + 1 - s]);
  }
  return order;
}

function knockoutPhaseName(teamsInRound) {
  switch (teamsInRound) {
    case 2: return 'Final';
    case 4: return 'Semifinal';
    case 8: return 'Quartas de final';
    case 16: return 'Oitavas de final';
    default: return `Fase de ${teamsInRound}`;
  }
}

/* ---------- todos contra todos (método do círculo) ---------- */

/**
 * Retorna as rodadas de um turno de todos contra todos.
 * Com número ímpar de equipes, uma equipe folga por rodada.
 * Garante que nenhuma equipe joga duas vezes na mesma rodada.
 */
function roundRobinRounds(teamIds) {
  const list = [...teamIds];
  if (list.length < 2) return [];
  if (list.length % 2 === 1) list.push(null); // folga
  const n = list.length;
  const rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const pairs = [];
    for (let i = 0; i < n / 2; i++) {
      const a = list[i];
      const b = list[n - 1 - i];
      if (a !== null && b !== null) {
        // alterna mando para equilibrar quem aparece como "Equipe A"
        pairs.push((r + i) % 2 === 0 ? [a, b] : [b, a]);
      }
    }
    rounds.push(pairs);
    list.splice(1, 0, list.pop()); // gira mantendo o primeiro fixo
  }
  return rounds;
}

function buildRoundRobin(teamIds, { legs = 1, groupId = null, groupName = null, idGen = idFactory(), stage } = {}) {
  const base = roundRobinRounds(teamIds);
  const matches = [];
  for (let leg = 0; leg < legs; leg++) {
    base.forEach((pairs, r) => {
      const roundNumber = leg * base.length + r + 1;
      const legLabel = legs > 1 ? `${leg + 1}º turno · ` : '';
      const phase = `${groupName ? `${groupName} · ` : ''}${legLabel}Rodada ${r + 1}`;
      pairs.forEach(([a, b]) => {
        const [home, away] = leg % 2 === 0 ? [a, b] : [b, a];
        matches.push(createMatch({
          id: idGen(),
          stage: stage ?? (groupId ? 'group' : 'league'),
          phase,
          round: roundNumber,
          groupId,
          home: teamRef(home),
          away: teamRef(away),
        }));
      });
    });
  }
  return matches;
}

/* ---------- eliminatória simples ---------- */

function buildSingleElimination(entrants, { idGen = idFactory(), thirdPlace = false, stage = 'knockout', phasePrefix = '' } = {}) {
  const size = nextPowerOfTwo(Math.max(entrants.length, 2));
  let current = seedOrder(size).map((seed) => entrants[seed - 1] ?? BYE);
  const matches = [];
  const totalRounds = Math.log2(size);
  let semis = [];
  for (let r = 1; r <= totalRounds; r++) {
    const teamsInRound = size / 2 ** (r - 1);
    const next = [];
    const roundMatches = [];
    for (let i = 0; i < current.length; i += 2) {
      const m = createMatch({
        id: idGen(),
        stage,
        phase: `${phasePrefix}${knockoutPhaseName(teamsInRound)}`,
        bracketRound: r,
        bracketSlot: i / 2,
        home: current[i],
        away: current[i + 1],
      });
      roundMatches.push(m);
      next.push(winnerOf(m.id));
    }
    if (teamsInRound === 4) semis = roundMatches;
    if (r === totalRounds && thirdPlace && semis.length === 2) {
      matches.push(createMatch({
        id: idGen(),
        stage: 'third',
        phase: `${phasePrefix}Disputa de 3º lugar`,
        bracketRound: r,
        bracketSlot: 1,
        home: loserOf(semis[0].id),
        away: loserOf(semis[1].id),
      }));
    }
    matches.push(...roundMatches);
    current = next;
  }
  return { matches, championRef: current[0] };
}

/* ---------- eliminatória dupla ---------- */

function buildDoubleElimination(entrants, { idGen = idFactory(), withReset = true } = {}) {
  const size = nextPowerOfTwo(Math.max(entrants.length, 4));
  const k = Math.log2(size);
  let current = seedOrder(size).map((seed) => entrants[seed - 1] ?? BYE);
  const matches = [];
  const wbLosers = {};

  // Chave superior (vencedores)
  for (let r = 1; r <= k; r++) {
    const teamsInRound = size / 2 ** (r - 1);
    const next = [];
    wbLosers[r] = [];
    for (let i = 0; i < current.length; i += 2) {
      const m = createMatch({
        id: idGen(),
        stage: 'winners',
        phase: r === k ? 'Final da chave superior' : `Chave superior · ${knockoutPhaseName(teamsInRound)}`,
        bracketSide: 'winners',
        bracketRound: r,
        bracketSlot: i / 2,
        home: current[i],
        away: current[i + 1],
      });
      matches.push(m);
      next.push(winnerOf(m.id));
      wbLosers[r].push(loserOf(m.id));
    }
    current = next;
  }
  const wbChampion = current[0];

  // Chave inferior (repescagem)
  let lbRound = 0;
  const totalLbRounds = 2 * (k - 1);
  const lbPhase = () => (lbRound === totalLbRounds ? 'Final da chave inferior' : `Chave inferior · Rodada ${lbRound}`);
  let lb = [];

  lbRound++;
  for (let i = 0; i < wbLosers[1].length; i += 2) {
    const m = createMatch({
      id: idGen(), stage: 'losers', phase: lbPhase(), bracketSide: 'losers', bracketRound: lbRound, bracketSlot: i / 2,
      home: wbLosers[1][i], away: wbLosers[1][i + 1],
    });
    matches.push(m);
    lb.push(winnerOf(m.id));
  }

  for (let r = 2; r <= k; r++) {
    // rodada de "queda": vencedores da chave inferior × perdedores da rodada r da chave superior
    const drops = r % 2 === 0 ? [...wbLosers[r]].reverse() : wbLosers[r];
    lbRound++;
    lb = lb.map((ref, i) => {
      const m = createMatch({
        id: idGen(), stage: 'losers', phase: lbPhase(), bracketSide: 'losers', bracketRound: lbRound, bracketSlot: i,
        home: ref, away: drops[i],
      });
      matches.push(m);
      return winnerOf(m.id);
    });
    if (r < k) {
      // rodada interna: vencedores da chave inferior se enfrentam
      lbRound++;
      const next = [];
      for (let i = 0; i < lb.length; i += 2) {
        const m = createMatch({
          id: idGen(), stage: 'losers', phase: lbPhase(), bracketSide: 'losers', bracketRound: lbRound, bracketSlot: i / 2,
          home: lb[i], away: lb[i + 1],
        });
        matches.push(m);
        next.push(winnerOf(m.id));
      }
      lb = next;
    }
  }
  const lbChampion = lb[0];

  const grandFinal = createMatch({
    id: idGen(), stage: 'grandfinal', phase: 'Grande final', bracketSide: 'final', bracketRound: 1, bracketSlot: 0,
    home: wbChampion, away: lbChampion,
  });
  matches.push(grandFinal);
  if (withReset) {
    matches.push(createMatch({
      id: idGen(), stage: 'reset', phase: 'Grande final · jogo extra (se necessário)', bracketSide: 'final', bracketRound: 2, bracketSlot: 0,
      home: wbChampion, away: lbChampion, conditional: true, resetOf: grandFinal.id,
    }));
  }
  return { matches, championRef: null };
}

/* ---------- vagas vazias (bye) ---------- */

/**
 * Remove partidas que envolvem uma vaga vazia: o adversário avança automaticamente.
 * Referências a essas partidas são substituídas pela equipe que avançou.
 * As partidas precisam estar em ordem topológica (dependências antes).
 */
function resolveByes(matches) {
  const auto = new Map();
  const resolve = (ref) => {
    if ((ref.kind === 'winner' || ref.kind === 'loser') && auto.has(ref.matchId)) {
      const a = auto.get(ref.matchId);
      return resolve(ref.kind === 'winner' ? a.winner : a.loser);
    }
    return ref;
  };
  for (const m of matches) {
    m.home = resolve(m.home);
    m.away = resolve(m.away);
    const homeBye = m.home.kind === 'bye';
    const awayBye = m.away.kind === 'bye';
    if (homeBye || awayBye) auto.set(m.id, { winner: homeBye ? m.away : m.home, loser: BYE });
  }
  return matches.filter((m) => !auto.has(m.id));
}

/* ---------- grupos ---------- */

/** Distribui equipes em grupos no sistema "serpentina", equilibrando cabeças de chave. */
function distributeGroups(teamIds, groupsCount) {
  const g = Math.max(1, Math.min(groupsCount, teamIds.length));
  const groups = Array.from({ length: g }, (_, i) => ({ id: groupLetter(i), name: `Grupo ${groupLetter(i)}`, teamIds: [] }));
  teamIds.forEach((teamId, idx) => {
    const row = Math.floor(idx / g);
    const col = idx % g;
    groups[row % 2 === 0 ? col : g - 1 - col].teamIds.push(teamId);
  });
  return groups;
}

/** Evita que duas equipes do mesmo grupo se enfrentem na primeira rodada do mata-mata. */
function avoidSameGroupPairs(entrants) {
  const size = nextPowerOfTwo(entrants.length);
  const order = seedOrder(size);
  const list = [...entrants];
  const pairIdx = [];
  for (let i = 0; i < order.length; i += 2) pairIdx.push([order[i] - 1, order[i + 1] - 1]);
  const groupOf = (idx) => (list[idx]?.kind === 'group' ? list[idx].groupId : null);
  const clash = ([a, b]) => groupOf(a) && groupOf(a) === groupOf(b);
  for (const p of pairIdx) {
    if (!clash(p)) continue;
    for (const q of pairIdx) {
      if (q === p || list[q[1]] === undefined || list[p[1]] === undefined) continue;
      [list[p[1]], list[q[1]]] = [list[q[1]], list[p[1]]];
      if (!clash(p) && !clash(q)) break;
      [list[p[1]], list[q[1]]] = [list[q[1]], list[p[1]]];
    }
  }
  return list;
}

function buildGroupsWithKnockout(teamIds, {
  groupsCount = 2, advancePerGroup = 2, thirdPlace = false, groups: customGroups = null, knockout = true, idGen = idFactory(),
} = {}) {
  const groups = customGroups?.length
    ? customGroups.map((g, i) => ({ id: g.id ?? groupLetter(i), name: g.name ?? `Grupo ${groupLetter(i)}`, teamIds: [...g.teamIds] }))
    : distributeGroups(teamIds, groupsCount);

  const matches = [];
  for (const g of groups) {
    matches.push(...buildRoundRobin(g.teamIds, { groupId: g.id, groupName: g.name, idGen }));
  }
  let qualified = 0;
  if (knockout) {
    const entrants = [];
    for (let pos = 1; pos <= advancePerGroup; pos++) {
      const ordered = pos % 2 === 1 ? groups : [...groups].reverse();
      for (const g of ordered) {
        if (g.teamIds.length >= pos) entrants.push(groupPos(g.id, pos));
      }
    }
    qualified = entrants.length;
    if (entrants.length >= 2) {
      const { matches: ko } = buildSingleElimination(avoidSameGroupPairs(entrants), { idGen, thirdPlace });
      matches.push(...ko);
    }
  }
  return { matches, groups, qualified };
}

/* ---------- dependências e rodadas ---------- */

function dependenciesOf(match, matchesById, matchesByGroup) {
  const deps = [];
  for (const ref of [match.home, match.away]) {
    if (ref.kind === 'winner' || ref.kind === 'loser') {
      const src = matchesById.get(ref.matchId);
      if (src) deps.push(src);
    } else if (ref.kind === 'group') {
      deps.push(...(matchesByGroup.get(ref.groupId) ?? []));
    }
  }
  if (match.resetOf && matchesById.get(match.resetOf)) deps.push(matchesById.get(match.resetOf));
  return [...new Set(deps)];
}

function indexMatches(matches) {
  const byId = new Map(matches.map((m) => [m.id, m]));
  const byGroup = new Map();
  for (const m of matches) {
    if (m.groupId && (m.stage === 'group')) {
      if (!byGroup.has(m.groupId)) byGroup.set(m.groupId, []);
      byGroup.get(m.groupId).push(m);
    }
  }
  return { byId, byGroup };
}

/**
 * "Onda" de execução de cada partida: 1 + a maior onda das partidas de que ela depende.
 * Partidas de todos contra todos usam o número da rodada. A quantidade de rodadas
 * do campeonato é a maior onda.
 */
function assignWaves(matches) {
  const { byId, byGroup } = indexMatches(matches);
  const memo = new Map();
  const wave = (m) => {
    if (memo.has(m.id)) return memo.get(m.id);
    memo.set(m.id, m.round ?? 1); // proteção contra ciclos
    const deps = dependenciesOf(m, byId, byGroup);
    const w = Math.max(m.round ?? 1, ...deps.map((d) => wave(d) + 1));
    memo.set(m.id, w);
    return w;
  };
  for (const m of matches) m.wave = wave(m);
  return matches;
}

/* ---------- ponto de entrada ---------- */

function validateFormatOptions(format, teamCount, options = {}) {
  const errors = [];
  const f = getFormat(format);
  if (teamCount < f.minTeams) errors.push(`O formato “${f.name}” precisa de pelo menos ${f.minTeams} equipes (há ${teamCount}).`);
  if (format === 'groups-knockout' || format === 'custom-groups') {
    const groups = format === 'custom-groups' && options.groups?.length
      ? options.groups
      : distributeGroups(Array.from({ length: teamCount }, (_, i) => i), options.groupsCount ?? 2);
    const g = groups.length;
    if (format === 'groups-knockout' && (options.groupsCount ?? 2) < 1) errors.push('Informe ao menos 1 grupo.');
    const smallest = Math.min(...groups.map((x) => x.teamIds.length));
    if (groups.some((x) => x.teamIds.length < 2)) errors.push('Cada grupo precisa de pelo menos 2 equipes.');
    const knockout = format === 'groups-knockout' || options.knockout !== false;
    if (knockout) {
      const a = options.advancePerGroup ?? 2;
      if (a < 1) errors.push('Pelo menos 1 equipe deve avançar de cada grupo.');
      if (a > smallest) errors.push(`Não é possível classificar ${a} equipes por grupo: o menor grupo tem ${smallest}.`);
      if (g * a < 2) errors.push('O mata-mata precisa de pelo menos 2 classificados no total.');
    }
    if (format === 'custom-groups' && options.groups?.length) {
      const assigned = options.groups.reduce((s, x) => s + x.teamIds.length, 0);
      if (assigned !== teamCount) errors.push(`Há ${teamCount - assigned} equipe(s) sem grupo definido.`);
    }
  }
  return errors;
}

/**
 * Gera todos os confrontos de um campeonato.
 * @returns {{ matches, groups, qualified }}
 */
function generateFixture(format, teamIds, options = {}) {
  const idGen = idFactory('m');
  let result;
  switch (format) {
    case 'single-elimination': {
      const { matches } = buildSingleElimination(teamIds.map(teamRef), { idGen, thirdPlace: !!options.thirdPlace });
      result = { matches: resolveByes(matches), groups: [], qualified: null };
      break;
    }
    case 'double-elimination': {
      const { matches } = buildDoubleElimination(teamIds.map(teamRef), { idGen, withReset: options.withReset !== false });
      result = { matches: resolveByes(matches), groups: [], qualified: null };
      break;
    }
    case 'round-robin':
      result = { matches: buildRoundRobin(teamIds, { legs: 1, idGen }), groups: [], qualified: null };
      break;
    case 'league':
      result = { matches: buildRoundRobin(teamIds, { legs: 2, idGen }), groups: [], qualified: null };
      break;
    case 'groups-knockout':
    case 'custom-groups': {
      const r = buildGroupsWithKnockout(teamIds, {
        groupsCount: options.groupsCount ?? 2,
        advancePerGroup: options.advancePerGroup ?? 2,
        thirdPlace: !!options.thirdPlace,
        groups: format === 'custom-groups' ? options.groups : null,
        knockout: format === 'groups-knockout' ? true : options.knockout !== false,
        idGen,
      });
      r.matches = resolveByes(r.matches);
      result = r;
      break;
    }
    default:
      throw new Error(`Formato desconhecido: ${format}`);
  }
  assignWaves(result.matches);
  return result;
}

/**
 * Números do formato (sem precisar das equipes reais): total de partidas, rodadas,
 * grupos, classificados, semifinalistas, finalistas e campeão.
 */
function summarizeFormat(format, teamCount, options = {}) {
  const errors = validateFormatOptions(format, teamCount, options);
  if (errors.length) return { errors };
  const ids = Array.from({ length: teamCount }, (_, i) => `t${i + 1}`);
  const opts = format === 'custom-groups' && options.groups?.length
    ? { ...options, groups: options.groups.map((g, gi) => ({ ...g, teamIds: g.teamIds.map((_, j) => `g${gi}_${j}`) })) }
    : options;
  const { matches, groups, qualified } = generateFixture(format, format === 'custom-groups' && options.groups?.length
    ? opts.groups.flatMap((g) => g.teamIds) : ids, opts);
  const phases = new Set(matches.map((m) => m.phase));
  const hasPhase = (name) => [...phases].some((p) => p.endsWith(name));
  const isLeague = ['round-robin', 'league'].includes(format) || (format === 'custom-groups' && options.knockout === false);
  return {
    errors: [],
    totalMatches: matches.filter((m) => !m.conditional).length,
    conditionalMatches: matches.filter((m) => m.conditional).length,
    rounds: Math.max(0, ...matches.map((m) => m.wave ?? 0)),
    groups: groups.length || null,
    groupSizes: groups.map((g) => g.teamIds.length),
    qualified,
    semifinalists: hasPhase('Semifinal') ? 4 : (format === 'double-elimination' ? null : null),
    finalists: isLeague ? null : 2,
    champion: 1,
    championRule: isLeague ? 'Líder da classificação ao fim de todas as rodadas' : 'Vencedor da final',
  };
}

/* ======================================================================
 * DOMÍNIO — AGENDA (QUADRAS E HORÁRIOS)
 * ====================================================================== */
/**
 * Algoritmo de distribuição de partidas em quadras e horários.
 *
 * Estratégia: agendamento guloso por lista (list scheduling).
 *  1. Monta a grade de horários de um dia: cada horário ocupa `matchDuration` minutos
 *     e o próximo começa após o intervalo operacional (`interval`). Horários que
 *     invadem um período de descanso são empurrados para o fim do descanso.
 *  2. Ordena as partidas pela "onda" (rodada lógica) e pela ordem de criação.
 *  3. Para cada partida, procura o primeiro par (horário, quadra) livre em que:
 *     - o número de jogos simultâneos não passa do limite;
 *     - cada equipe já descansou o tempo de preparação desde o seu último jogo
 *       (+ tempo de troca de quadra, se mudar de quadra);
 *     - todas as partidas de que ela depende (ex.: semifinais antes da final) já
 *       terminaram, também respeitando a preparação.
 *  4. Partidas que não cabem até o último dia ficam em `unscheduled`.
 *
 * Como cada equipe só é colocada depois do fim do seu jogo anterior, é impossível
 * uma equipe jogar em duas quadras ao mesmo tempo.
 */


const DAY = 1440;

function normalizeScheduleConfig(cfg) {
  const courts = Math.max(1, Math.floor(Number(cfg.courts) || 1));
  const maxSimRaw = Math.floor(Number(cfg.maxSimultaneous) || courts);
  return {
    startDate: cfg.startDate,
    endDate: cfg.endDate,
    dayStart: toMinutes(cfg.dayStart),
    dayEnd: toMinutes(cfg.dayEnd),
    courts,
    maxSimultaneous: Math.max(1, Math.min(courts, maxSimRaw)),
    matchDuration: Math.max(1, Number(cfg.matchDuration) || 1),
    interval: Math.max(0, Number(cfg.interval) || 0),
    prepTime: Math.max(0, Number(cfg.prepTime) || 0),
    courtChangeTime: Math.max(0, Number(cfg.courtChangeTime) || 0),
    maxRoundDuration: Math.max(0, Number(cfg.maxRoundDuration) || 0),
    breaks: (cfg.breaks ?? [])
      .map((b) => ({ start: toMinutes(b.start), end: toMinutes(b.end), label: b.label }))
      .filter((b) => Number.isFinite(b.start) && Number.isFinite(b.end) && b.end > b.start)
      .sort((a, b) => a.start - b.start),
  };
}

/** Horários de início possíveis em um dia, já descontando os descansos. */
function buildDailySlots(conf) {
  const slots = [];
  let t = conf.dayStart;
  let guard = 0;
  while (t + conf.matchDuration <= conf.dayEnd && guard++ < 2000) {
    const blocking = conf.breaks.find((b) => overlaps(t, t + conf.matchDuration, b.start, b.end));
    if (blocking) {
      t = blocking.end;
      continue;
    }
    slots.push({ start: t, end: t + conf.matchDuration });
    t += conf.matchDuration + conf.interval;
  }
  return slots;
}

function capacityOf(cfg) {
  const conf = normalizeScheduleConfig(cfg);
  const days = listDates(conf.startDate, conf.endDate).length;
  const slotsPerDay = buildDailySlots(conf).length;
  return { days, slotsPerDay, perDay: slotsPerDay * conf.maxSimultaneous, total: days * slotsPerDay * conf.maxSimultaneous };
}

/**
 * Agenda as partidas.
 * @param {Array} matches partidas geradas por generateFixture (com `wave`)
 * @param {object} cfg configuração (datas, horários, quadras, tempos, descansos)
 * @returns {{ matches, unscheduled, stats, warnings }}
 */
function scheduleMatches(matches, cfg) {
  const conf = normalizeScheduleConfig(cfg);
  const dates = listDates(conf.startDate, conf.endDate);
  const slots = buildDailySlots(conf);
  const { byId, byGroup } = indexMatches(matches);

  const occupancy = new Map(); // "dia|slot" -> Set(quadras)
  const teamState = new Map(); // teamId -> { endAbs, court }
  const placed = new Map(); // matchId -> { endAbs, court }
  const unscheduled = [];

  const ordered = matches
    .map((m, index) => ({ m, index }))
    .sort((a, b) => (a.m.wave ?? 1) - (b.m.wave ?? 1) || a.index - b.index)
    .map((x) => x.m);

  for (const m of ordered) {
    // restrições de cada participante: precisa estar livre a partir de endAbs + preparação
    const constraints = [];
    let blocked = null;
    for (const ref of [m.home, m.away]) {
      if (ref.kind === 'team') {
        const st = teamState.get(ref.teamId);
        if (st) constraints.push(st);
      } else if (ref.kind === 'winner' || ref.kind === 'loser') {
        const p = placed.get(ref.matchId);
        if (!p) blocked = 'dependency';
        else constraints.push(p);
      } else if (ref.kind === 'group') {
        const groupMatches = byGroup.get(ref.groupId) ?? [];
        let last = null;
        for (const gm of groupMatches) {
          const p = placed.get(gm.id);
          if (!p) { blocked = 'dependency'; break; }
          if (!last || p.endAbs > last.endAbs) last = p;
        }
        if (last) constraints.push(last);
      }
    }
    if (m.resetOf) {
      const p = placed.get(m.resetOf);
      if (!p) blocked = 'dependency';
      else constraints.push(p);
    }
    if (blocked) {
      unscheduled.push({ match: m, reason: blocked });
      continue;
    }

    const earliest = constraints.reduce((mx, c) => Math.max(mx, c.endAbs + conf.prepTime), -Infinity);
    let chosen = null;
    outer: for (let d = 0; d < dates.length; d++) {
      for (let s = 0; s < slots.length; s++) {
        const startAbs = d * DAY + slots[s].start;
        if (startAbs < earliest) continue;
        const key = `${d}|${s}`;
        const used = occupancy.get(key) ?? new Set();
        if (used.size >= conf.maxSimultaneous) continue;
        for (let c = 1; c <= conf.courts; c++) {
          if (used.has(c)) continue;
          const ok = constraints.every((k) => startAbs >= k.endAbs + conf.prepTime + (k.court && k.court !== c ? conf.courtChangeTime : 0));
          if (ok) {
            chosen = { d, s, c, startAbs, endAbs: d * DAY + slots[s].end };
            break outer;
          }
        }
      }
    }

    if (!chosen) {
      unscheduled.push({ match: m, reason: 'capacity' });
      continue;
    }
    const key = `${chosen.d}|${chosen.s}`;
    if (!occupancy.has(key)) occupancy.set(key, new Set());
    occupancy.get(key).add(chosen.c);
    const info = { endAbs: chosen.endAbs, court: chosen.c };
    placed.set(m.id, info);
    for (const ref of [m.home, m.away]) if (ref.kind === 'team') teamState.set(ref.teamId, info);
    Object.assign(m, {
      date: dates[chosen.d],
      start: slots[chosen.s].start,
      end: slots[chosen.s].end,
      court: chosen.c,
    });
  }

  // partidas não agendadas não guardam horário
  const unscheduledIds = new Set(unscheduled.map((u) => u.match.id));
  for (const m of matches) {
    if (unscheduledIds.has(m.id)) {
      delete m.date; delete m.start; delete m.end; delete m.court;
    }
  }

  const capacity = dates.length * slots.length * conf.maxSimultaneous;
  const warnings = roundDurationWarnings(matches, conf);
  const scheduled = matches.filter((m) => m.date);
  const lastMatch = scheduled.reduce((best, m) => (!best || absoluteMinutes(m.date, m.end) > absoluteMinutes(best.date, best.end) ? m : best), null);

  return {
    matches,
    unscheduled,
    warnings,
    stats: {
      days: dates.length,
      slotsPerDay: slots.length,
      capacity,
      required: matches.length,
      scheduled: scheduled.length,
      usedDays: new Set(scheduled.map((m) => m.date)).size,
      lastDate: lastMatch?.date ?? null,
      lastEnd: lastMatch ? toHHMM(lastMatch.end) : null,
      reason: unscheduled.length === 0 ? null : (matches.length > capacity ? 'capacity' : 'constraints'),
    },
  };
}

function roundDurationWarnings(matches, conf) {
  if (!conf.maxRoundDuration) return [];
  const byWave = new Map();
  for (const m of matches) {
    if (!m.date) continue;
    const s = absoluteMinutes(m.date, m.start);
    const e = absoluteMinutes(m.date, m.end);
    const w = byWave.get(m.wave) ?? { start: Infinity, end: -Infinity };
    byWave.set(m.wave, { start: Math.min(w.start, s), end: Math.max(w.end, e) });
  }
  const warnings = [];
  for (const [wave, span] of [...byWave.entries()].sort((a, b) => a[0] - b[0])) {
    const minutes = span.end - span.start;
    if (minutes > conf.maxRoundDuration) {
      warnings.push({
        type: 'round-duration',
        wave,
        minutes,
        message: `A rodada ${wave} ocupa ${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}, acima do limite de ${conf.maxRoundDuration} min por rodada.`,
      });
    }
  }
  return warnings;
}

/**
 * Verifica uma programação (inclusive depois de edições manuais) e lista os conflitos.
 * severity "error": impede a realização (sobreposição, fora do horário…);
 * severity "warning": possível, mas desrespeita uma preferência (descanso curto…).
 */
function validateSchedule(matches, cfg, { teamName = (id) => id, matchLabel = (m) => m.id } = {}) {
  const conf = normalizeScheduleConfig(cfg);
  const dates = new Set(listDates(conf.startDate, conf.endDate));
  const issues = [];
  const scheduled = matches.filter((m) => m.date && Number.isFinite(m.start) && m.status !== 'not_needed');
  const abs = (m) => [absoluteMinutes(m.date, m.start), absoluteMinutes(m.date, m.end)];

  for (const m of scheduled) {
    if (!dates.has(m.date)) issues.push({ severity: 'error', matchIds: [m.id], message: `${matchLabel(m)} está fora do período do campeonato.` });
    if (m.start < conf.dayStart || m.end > conf.dayEnd) issues.push({ severity: 'error', matchIds: [m.id], message: `${matchLabel(m)} está fora do horário de funcionamento (${toHHMM(conf.dayStart)}–${toHHMM(conf.dayEnd)}).` });
    const br = conf.breaks.find((b) => overlaps(m.start, m.end, b.start, b.end));
    if (br) issues.push({ severity: 'error', matchIds: [m.id], message: `${matchLabel(m)} invade o descanso ${br.label ? `“${br.label}” ` : ''}(${toHHMM(br.start)}–${toHHMM(br.end)}).` });
    if (m.court > conf.courts || m.court < 1) issues.push({ severity: 'error', matchIds: [m.id], message: `${matchLabel(m)} usa a quadra ${m.court}, mas só há ${conf.courts}.` });
  }

  // quadra ocupada por dois jogos ao mesmo tempo
  const byCourt = new Map();
  for (const m of scheduled) {
    const k = `${m.date}|${m.court}`;
    if (!byCourt.has(k)) byCourt.set(k, []);
    byCourt.get(k).push(m);
  }
  for (const list of byCourt.values()) {
    list.sort((a, b) => a.start - b.start);
    for (let i = 1; i < list.length; i++) {
      const prev = list[i - 1];
      const cur = list[i];
      if (overlaps(prev.start, prev.end, cur.start, cur.end)) {
        issues.push({ severity: 'error', matchIds: [prev.id, cur.id], message: `${matchLabel(prev)} e ${matchLabel(cur)} estão na mesma quadra ao mesmo tempo.` });
      } else if (cur.start - prev.end < conf.interval) {
        issues.push({ severity: 'warning', matchIds: [prev.id, cur.id], message: `Intervalo de ${cur.start - prev.end} min entre ${matchLabel(prev)} e ${matchLabel(cur)} na quadra ${cur.court} (configurado: ${conf.interval} min).` });
      }
    }
  }

  // jogos simultâneos acima do limite
  const bySlot = new Map();
  for (const m of scheduled) {
    const k = `${m.date}|${m.start}`;
    bySlot.set(k, [...(bySlot.get(k) ?? []), m]);
  }
  for (const list of bySlot.values()) {
    if (list.length > conf.maxSimultaneous) issues.push({ severity: 'warning', matchIds: list.map((m) => m.id), message: `${list.length} jogos simultâneos às ${toHHMM(list[0].start)}; o limite configurado é ${conf.maxSimultaneous}.` });
  }

  // mesma equipe em jogos sobrepostos ou sem descanso
  const byTeam = new Map();
  for (const m of scheduled) {
    for (const id of [m.homeTeamId, m.awayTeamId]) {
      if (!id) continue;
      if (!byTeam.has(id)) byTeam.set(id, []);
      byTeam.get(id).push(m);
    }
  }
  for (const [teamId, list] of byTeam) {
    list.sort((a, b) => abs(a)[0] - abs(b)[0]);
    for (let i = 1; i < list.length; i++) {
      const [ps, pe] = abs(list[i - 1]);
      const [cs] = abs(list[i]);
      if (cs < pe && ps < abs(list[i])[1]) {
        issues.push({ severity: 'error', matchIds: [list[i - 1].id, list[i].id], message: `${teamName(teamId)} estaria em dois jogos ao mesmo tempo (${matchLabel(list[i - 1])} e ${matchLabel(list[i])}).` });
      } else {
        const need = conf.prepTime + (list[i - 1].court !== list[i].court ? conf.courtChangeTime : 0);
        if (cs - pe < need) issues.push({ severity: 'warning', matchIds: [list[i - 1].id, list[i].id], message: `${teamName(teamId)} tem só ${cs - pe} min entre ${matchLabel(list[i - 1])} e ${matchLabel(list[i])} (mínimo configurado: ${need} min).` });
      }
    }
  }

  // ordem das fases: um jogo não pode começar antes dos jogos de que depende
  const { byId, byGroup } = indexMatches(matches);
  for (const m of scheduled) {
    const sources = [];
    for (const ref of [m.home, m.away]) {
      if (ref.kind === 'winner' || ref.kind === 'loser') sources.push(byId.get(ref.matchId));
      if (ref.kind === 'group') sources.push(...(byGroup.get(ref.groupId) ?? []));
    }
    if (m.resetOf) sources.push(byId.get(m.resetOf));
    for (const src of sources) {
      if (!src?.date) continue;
      if (abs(m)[0] < abs(src)[1]) {
        issues.push({ severity: 'error', matchIds: [m.id, src.id], message: `${matchLabel(m)} começa antes do fim de ${matchLabel(src)}, de que ele depende.` });
        break;
      }
    }
  }
  return issues;
}

/* ======================================================================
 * DOMÍNIO — PLANEJADOR E SUGESTÕES
 * ====================================================================== */
/**
 * Orquestra o montador automático: gera os confrontos, distribui em quadras e horários,
 * numera os jogos e, quando não houver capacidade, testa alternativas reais
 * (mais quadras, mais dias, horário ampliado, intervalo menor ou outro formato)
 * executando o próprio algoritmo de novo com cada alteração.
 */


function numberMatches(matches) {
  const scheduled = matches.filter((m) => m.date).sort((a, b) => (
    absoluteMinutes(a.date, a.start) - absoluteMinutes(b.date, b.start) || a.court - b.court
  ));
  const pending = matches.filter((m) => !m.date).sort((a, b) => (a.wave ?? 0) - (b.wave ?? 0));
  [...scheduled, ...pending].forEach((m, i) => { m.number = i + 1; });
  return matches;
}

function runOnce(input) {
  const teamIds = input.teams.map((t) => t.id);
  const fixture = generateFixture(input.format, teamIds, input.formatOptions ?? {});
  const schedule = scheduleMatches(fixture.matches, input.schedule);
  numberMatches(fixture.matches);
  return { ...fixture, schedule };
}

const fits = (input) => runOnce(input).schedule.unscheduled.length === 0;

function validatePlanInput(input) {
  const errors = [];
  const s = input.schedule ?? {};
  if (!input.teams?.length || input.teams.length < 2) errors.push('Cadastre pelo menos 2 equipes.');
  if (!listDates(s.startDate, s.endDate).length) errors.push('O período do campeonato é inválido: a data de término precisa ser igual ou posterior à de início.');
  const ds = toMinutes(s.dayStart);
  const de = toMinutes(s.dayEnd);
  if (!(de > ds)) errors.push('O horário de encerramento precisa ser depois do horário de início.');
  else if (de - ds < Number(s.matchDuration)) errors.push('A janela diária é menor que a duração de uma partida.');
  if (!(Number(s.courts) >= 1)) errors.push('Informe pelo menos 1 quadra ou campo.');
  if (!(Number(s.matchDuration) >= 1)) errors.push('A duração da partida deve ser maior que zero.');
  errors.push(...validateFormatOptions(input.format, input.teams?.length ?? 0, input.formatOptions ?? {}));
  return errors;
}

function suggestAlternatives(input, { max = 5 } = {}) {
  const out = [];
  const s = input.schedule;
  const courts = Number(s.courts);
  const maxSim = Math.min(courts, Number(s.maxSimultaneous) || courts);
  const withSchedule = (patch) => ({ ...input, schedule: { ...s, ...patch } });

  if (maxSim < courts && fits(withSchedule({ maxSimultaneous: courts }))) {
    out.push({ type: 'simultaneous', label: `Permitir ${courts} jogos simultâneos`, detail: `Hoje o limite é ${maxSim}, mas há ${courts} quadras disponíveis.`, patch: { schedule: { maxSimultaneous: courts } } });
  }
  for (let extra = 1; extra <= 12; extra++) {
    const patch = { courts: courts + extra, maxSimultaneous: maxSim === courts ? courts + extra : maxSim + extra };
    if (fits(withSchedule(patch))) {
      out.push({ type: 'courts', label: `Adicionar ${extra} ${extra === 1 ? 'quadra' : 'quadras'} (total ${courts + extra})`, detail: 'Mais jogos acontecem ao mesmo tempo, sem mudar datas nem horários.', patch: { schedule: patch } });
      break;
    }
  }
  for (let extra = 1; extra <= 60; extra++) {
    const endDate = addDays(s.endDate, extra);
    if (fits(withSchedule({ endDate }))) {
      const total = listDates(s.startDate, endDate).length;
      out.push({ type: 'days', label: `Ampliar para ${total} ${total === 1 ? 'dia' : 'dias'} (até ${formatDateBR(endDate)})`, detail: `Acrescenta ${extra} ${extra === 1 ? 'dia' : 'dias'} de competição.`, patch: { schedule: { endDate } } });
      break;
    }
  }
  const de = toMinutes(s.dayEnd);
  for (let t = de + 30; t <= 23 * 60 + 30; t += 30) {
    if (fits(withSchedule({ dayEnd: toHHMM(t) }))) {
      out.push({ type: 'hours', label: `Encerrar às ${toHHMM(t)} em vez de ${s.dayEnd}`, detail: 'Amplia a janela diária de jogos.', patch: { schedule: { dayEnd: toHHMM(t) } } });
      break;
    }
  }
  const ds = toMinutes(s.dayStart);
  for (let t = ds - 30; t >= 6 * 60; t -= 30) {
    if (fits(withSchedule({ dayStart: toHHMM(t) }))) {
      out.push({ type: 'hours-start', label: `Começar às ${toHHMM(t)} em vez de ${s.dayStart}`, detail: 'Antecipa o início dos jogos em cada dia.', patch: { schedule: { dayStart: toHHMM(t) } } });
      break;
    }
  }
  const interval = Number(s.interval) || 0;
  for (let v = interval - 5; v >= 0; v -= 5) {
    if (fits(withSchedule({ interval: v }))) {
      out.push({ type: 'interval', label: `Reduzir o intervalo entre partidas para ${v} min`, detail: `Hoje são ${interval} min entre um jogo e outro na mesma quadra.`, patch: { schedule: { interval: v } } });
      break;
    }
  }
  if (input.format !== 'single-elimination' && input.teams.length >= 2 && fits({ ...input, format: 'single-elimination', formatOptions: {} })) {
    out.push({ type: 'format', label: 'Trocar para eliminatória simples', detail: `Precisa de apenas ${input.teams.length - 1} jogos.`, patch: { format: 'single-elimination' } });
  }
  return out.slice(0, max);
}

/**
 * Executa o montador completo.
 * @param {{ teams, format, formatOptions, schedule }} input
 */
function planChampionship(input) {
  const errors = validatePlanInput(input);
  if (errors.length) return { ok: false, errors };
  const result = runOnce(input);
  const summary = summarizeFormat(input.format, input.teams.length, input.formatOptions ?? {});
  const suggestions = result.schedule.unscheduled.length ? suggestAlternatives(input) : [];
  return {
    ok: true,
    errors: [],
    format: getFormat(input.format),
    matches: result.matches,
    groups: result.groups,
    qualified: result.qualified,
    schedule: result.schedule,
    capacity: capacityOf(input.schedule),
    summary,
    suggestions,
  };
}

/* ======================================================================
 * DOMÍNIO — PLACAR
 * ====================================================================== */
/**
 * Validação de placares por modalidade.
 *
 * Modalidades por gols/pontos (futebol, futsal, handebol, basquete): placar simples,
 * com desempate (pênaltis, tiros de 7 m…) quando um jogo eliminatório termina empatado.
 *
 * Modalidades por sets (vôlei, vôlei de praia, badminton, tênis de mesa, tênis, beach tennis):
 * o placar é a lista de sets; os sets vencidos são calculados a partir dela.
 */

const isInt = (v) => Number.isInteger(v) && v >= 0;

function maxSets(scoring) {
  return scoring.setsToWin * 2 - 1;
}

/** Verifica se um set termina de forma válida pela regra configurada. */
function validateSet(set, index, scoring) {
  const { home, away } = set;
  if (!isInt(home) || !isInt(away)) return 'Use números inteiros a partir de 0.';
  if (home === away) return 'Um set não pode terminar empatado.';
  const w = Math.max(home, away);
  const l = Math.min(home, away);
  if (scoring.tennis) {
    const ok = (w === 6 && l <= 4) || (w === 7 && (l === 5 || l === 6));
    return ok ? null : 'No tênis/beach tennis um set termina em 6 games com 2 de vantagem, ou 7–5 / 7–6 (tie-break).';
  }
  const deciding = index === maxSets(scoring) - 1;
  const target = deciding && scoring.decidingSetPoints ? scoring.decidingSetPoints : scoring.pointsPerSet;
  const winBy = scoring.winBy ?? 2;
  if (scoring.cap && w === scoring.cap && l === scoring.cap - 1) return null;
  if (w < target) return `O vencedor do set precisa chegar a ${target} pontos.`;
  if (w === target && w - l < winBy) return `É preciso vencer o set por ${winBy} pontos de diferença.`;
  if (w > target && w - l !== winBy) return `Acima de ${target} pontos, o set termina quando alguém abre exatamente ${winBy} de vantagem.`;
  if (scoring.cap && w > scoring.cap) return `O set termina, no máximo, com ${scoring.cap} pontos.`;
  return null;
}

/**
 * Valida o placar informado e calcula o resultado.
 * @param {object} input { home, away, sets: [{home, away}], tiebreak: {home, away} }
 * @param {object} scoring perfil de pontuação da modalidade
 * @param {object} opts { knockout: boolean, strict: boolean }
 * @returns {{ ok, errors, result }}
 */
function evaluateResult(input, scoring, { knockout = false, strict = true } = {}) {
  const errors = [];
  if (scoring.type === 'goals') {
    const home = Number(input.home);
    const away = Number(input.away);
    if (!isInt(home) || !isInt(away)) {
      return { ok: false, errors: ['Informe o placar das duas equipes com números inteiros a partir de 0.'], result: null };
    }
    let winner = home > away ? 'home' : away > home ? 'away' : 'draw';
    let tiebreak = null;
    if (winner === 'draw') {
      if (!scoring.allowDraw) {
        errors.push(scoring.noDrawReason ?? 'Esta modalidade não admite empate. Informe o placar final após a prorrogação.');
      } else if (knockout) {
        const th = Number(input.tiebreak?.home);
        const ta = Number(input.tiebreak?.away);
        if (!isInt(th) || !isInt(ta)) errors.push(`Jogo eliminatório empatado: informe o resultado do desempate (${scoring.tiebreakLabel ?? 'desempate'}).`);
        else if (th === ta) errors.push('O desempate precisa ter um vencedor.');
        else {
          tiebreak = { home: th, away: ta };
          winner = th > ta ? 'home' : 'away';
        }
      }
    }
    if (errors.length) return { ok: false, errors, result: null };
    return { ok: true, errors: [], result: { home, away, winner, tiebreak, decidedBy: tiebreak ? 'tiebreak' : 'regular' } };
  }

  // sets
  const sets = (input.sets ?? [])
    .filter((s) => s && (s.home !== '' && s.home !== null && s.home !== undefined) || (s && s.away !== '' && s.away !== null && s.away !== undefined))
    .map((s) => ({ home: Number(s.home), away: Number(s.away) }));
  if (!sets.length) return { ok: false, errors: ['Informe a pontuação de pelo menos um set.'], result: null };
  let wonHome = 0;
  let wonAway = 0;
  sets.forEach((s, i) => {
    if (wonHome === scoring.setsToWin || wonAway === scoring.setsToWin) {
      errors.push(`O ${i + 1}º set não deveria existir: a partida já estava decidida.`);
      return;
    }
    const err = strict ? validateSet(s, i, scoring) : (!isInt(s.home) || !isInt(s.away) || s.home === s.away ? 'Set inválido: use inteiros e sem empate.' : null);
    if (err) errors.push(`${i + 1}º set: ${err}`);
    if (s.home > s.away) wonHome++;
    else if (s.away > s.home) wonAway++;
  });
  if (!errors.length && wonHome < scoring.setsToWin && wonAway < scoring.setsToWin) {
    errors.push(`A partida termina quando uma equipe vence ${scoring.setsToWin} sets. Placar atual em sets: ${wonHome}–${wonAway}.`);
  }
  if (errors.length) return { ok: false, errors, result: null };
  return {
    ok: true,
    errors: [],
    result: {
      home: wonHome,
      away: wonAway,
      sets,
      pointsHome: sets.reduce((a, s) => a + s.home, 0),
      pointsAway: sets.reduce((a, s) => a + s.away, 0),
      winner: wonHome > wonAway ? 'home' : 'away',
      decidedBy: 'regular',
    },
  };
}

/** Pontos de classificação de cada lado para um resultado. */
function standingsPointsFor(result, pointsConfig, scoring) {
  if (pointsConfig.mode === 'fivb') {
    const loserSets = Math.min(result.home, result.away);
    const close = loserSets === scoring.setsToWin - 1;
    const win = close ? 2 : 3;
    const loss = close ? 1 : 0;
    return result.winner === 'home' ? { home: win, away: loss } : { home: loss, away: win };
  }
  const { win = 3, draw = 1, loss = 0 } = pointsConfig;
  if (result.winner === 'draw') return { home: draw, away: draw };
  // jogo eliminatório decidido no desempate conta como empate no tempo normal apenas
  // em competições específicas; aqui o vencedor do desempate recebe a vitória.
  return result.winner === 'home' ? { home: win, away: loss } : { home: loss, away: win };
}

/* ======================================================================
 * DOMÍNIO — CLASSIFICAÇÃO
 * ====================================================================== */
/**
 * Classificação (tabela) calculada a partir dos resultados registrados.
 *
 * Critérios de ordenação (nesta ordem):
 *  1. pontos;
 *  2. vitórias;
 *  3. saldo (de sets nas modalidades por sets; de gols/pontos nas demais);
 *  4. nas modalidades por sets, saldo de pontos/games;
 *  5. pontos/gols marcados;
 *  6. confronto direto entre as equipes empatadas (quando houver um único jogo entre elas);
 *  7. nome (ordem alfabética), apenas para manter a ordem estável.
 */


function emptyRow(teamId) {
  return {
    teamId, played: 0, wins: 0, draws: 0, losses: 0,
    goalsFor: 0, goalsAgainst: 0, setsFor: 0, setsAgainst: 0, points: 0, form: [],
  };
}

/**
 * @param {string[]} teamIds equipes que entram na tabela
 * @param {Array} matches partidas com homeTeamId, awayTeamId e result
 * @param {{ scoring, pointsConfig, teamName }} ctx
 */
function computeStandings(teamIds, matches, { scoring, pointsConfig, teamName = (id) => id }) {
  const rows = new Map(teamIds.map((id) => [id, emptyRow(id)]));
  const finished = matches.filter((m) => m.result && rows.has(m.homeTeamId) && rows.has(m.awayTeamId));
  const isSets = scoring.type === 'sets';

  for (const m of finished) {
    const r = m.result;
    const h = rows.get(m.homeTeamId);
    const a = rows.get(m.awayTeamId);
    h.played++; a.played++;
    if (isSets) {
      h.setsFor += r.home; h.setsAgainst += r.away;
      a.setsFor += r.away; a.setsAgainst += r.home;
      h.goalsFor += r.pointsHome ?? 0; h.goalsAgainst += r.pointsAway ?? 0;
      a.goalsFor += r.pointsAway ?? 0; a.goalsAgainst += r.pointsHome ?? 0;
    } else {
      h.goalsFor += r.home; h.goalsAgainst += r.away;
      a.goalsFor += r.away; a.goalsAgainst += r.home;
    }
    const pts = standingsPointsFor(r, pointsConfig, scoring);
    h.points += pts.home; a.points += pts.away;
    if (r.winner === 'home') { h.wins++; a.losses++; h.form.push('V'); a.form.push('D'); }
    else if (r.winner === 'away') { a.wins++; h.losses++; a.form.push('V'); h.form.push('D'); }
    else { h.draws++; a.draws++; h.form.push('E'); a.form.push('E'); }
  }

  const list = [...rows.values()].map((r) => ({
    ...r,
    goalDiff: r.goalsFor - r.goalsAgainst,
    setDiff: r.setsFor - r.setsAgainst,
    form: r.form.slice(-5),
  }));

  const headToHead = (x, y) => {
    const games = finished.filter((m) => (m.homeTeamId === x.teamId && m.awayTeamId === y.teamId) || (m.homeTeamId === y.teamId && m.awayTeamId === x.teamId));
    let xWins = 0; let yWins = 0;
    for (const g of games) {
      const winnerId = g.result.winner === 'home' ? g.homeTeamId : g.result.winner === 'away' ? g.awayTeamId : null;
      if (winnerId === x.teamId) xWins++;
      if (winnerId === y.teamId) yWins++;
    }
    return yWins - xWins;
  };

  list.sort((x, y) => (
    y.points - x.points
    || y.wins - x.wins
    || (isSets ? y.setDiff - x.setDiff : y.goalDiff - x.goalDiff)
    || (isSets ? y.goalDiff - x.goalDiff : 0)
    || y.goalsFor - x.goalsFor
    || headToHead(x, y)
    || String(teamName(x.teamId)).localeCompare(String(teamName(y.teamId)), 'pt-BR')
  ));
  list.forEach((row, i) => { row.position = i + 1; });
  return list;
}

/* ======================================================================
 * DOMÍNIO — ANDAMENTO
 * ====================================================================== */
/**
 * Andamento do campeonato: a partir dos resultados registrados, descobre quem são
 * as equipes de cada jogo eliminatório, o status de cada partida, as classificações,
 * os classificados e o campeão. Função pura: não altera o campeonato recebido.
 */


const MATCH_STATUS = {
  scheduled: { label: 'Agendado', tone: 'info' },
  in_progress: { label: 'Em andamento', tone: 'live' },
  finished: { label: 'Finalizado', tone: 'success' },
  waiting: { label: 'Aguardando definição', tone: 'neutral' },
  not_needed: { label: 'Não necessário', tone: 'neutral' },
  unscheduled: { label: 'Sem horário', tone: 'danger' },
};

function scoringOf(ch) {
  const sport = getSport(ch.sport);
  return { ...sport.scoring, ...(ch.scoringOverrides ?? {}) };
}

function pointsConfigOf(ch) {
  const sport = getSport(ch.sport);
  return ch.pointsConfig ?? sport.standingsPoints;
}

function isKnockoutMatch(m) {
  return !['group', 'league'].includes(m.stage);
}

function resolveChampionship(ch) {
  const teamsById = new Map((ch.teams ?? []).map((t) => [t.id, t]));
  const teamName = (id) => teamsById.get(id)?.name ?? '—';
  const scoring = scoringOf(ch);
  const pointsConfig = pointsConfigOf(ch);
  const matches = (ch.matches ?? []).map((m) => ({ ...m }));
  const { byId, byGroup } = indexMatches(matches);
  const groups = ch.groups ?? [];
  const groupStandingsCache = new Map();
  const memo = new Map();

  const groupComplete = (groupId) => (byGroup.get(groupId) ?? []).every((m) => m.result);

  const groupStandings = (group) => {
    if (groupStandingsCache.has(group.id)) return groupStandingsCache.get(group.id);
    const gm = (byGroup.get(group.id) ?? []).map((m) => ({ ...m, homeTeamId: m.home.teamId, awayTeamId: m.away.teamId }));
    const table = computeStandings(group.teamIds, gm, { scoring, pointsConfig, teamName });
    groupStandingsCache.set(group.id, table);
    return table;
  };

  const resolveTeam = (ref, depth = 0) => {
    if (!ref || depth > 64) return null;
    if (ref.kind === 'team') return ref.teamId;
    const key = JSON.stringify(ref);
    if (memo.has(key)) return memo.get(key);
    let value = null;
    if (ref.kind === 'winner' || ref.kind === 'loser') {
      const src = byId.get(ref.matchId);
      if (src?.result && src.result.winner !== 'draw') {
        const h = resolveTeam(src.home, depth + 1);
        const a = resolveTeam(src.away, depth + 1);
        const winnerIsHome = src.result.winner === 'home';
        value = ref.kind === 'winner' ? (winnerIsHome ? h : a) : (winnerIsHome ? a : h);
      }
    } else if (ref.kind === 'group') {
      const g = groups.find((x) => x.id === ref.groupId);
      if (g && groupComplete(g.id)) value = groupStandings(g)[ref.position - 1]?.teamId ?? null;
    }
    memo.set(key, value);
    return value;
  };

  for (const m of matches) {
    m.homeTeamId = resolveTeam(m.home);
    m.awayTeamId = resolveTeam(m.away);
  }
  for (const m of matches) {
    if (m.result) m.status = 'finished';
    else if (m.resetOf) {
      const gf = byId.get(m.resetOf);
      if (gf?.result) m.status = gf.result.winner === 'home' ? 'not_needed' : (m.date ? (m.live ? 'in_progress' : 'scheduled') : 'unscheduled');
      else m.status = 'waiting';
    } else if (!m.homeTeamId || !m.awayTeamId) m.status = m.date ? 'waiting' : 'unscheduled';
    else if (!m.date) m.status = 'unscheduled';
    else m.status = m.live ? 'in_progress' : 'scheduled';
  }

  // classificações
  const groupTables = groups.map((g) => {
    const table = groupStandings(g);
    const complete = groupComplete(g.id);
    const advance = ch.formatOptions?.advancePerGroup ?? 2;
    const hasKnockout = matches.some((m) => isKnockoutMatch(m));
    return {
      group: g,
      complete,
      rows: table.map((r) => ({ ...r, qualified: hasKnockout && r.position <= advance, confirmed: complete })),
    };
  });

  const leagueMatches = matches.filter((m) => m.stage === 'league');
  const leagueTable = leagueMatches.length
    ? computeStandings((ch.teams ?? []).map((t) => t.id), leagueMatches, { scoring, pointsConfig, teamName })
    : null;

  // campeão
  let champion = null;
  let runnerUp = null;
  let third = null;
  const winnerOfMatch = (m) => (m?.result ? (m.result.winner === 'home' ? m.homeTeamId : m.awayTeamId) : null);
  const loserOfMatch = (m) => (m?.result ? (m.result.winner === 'home' ? m.awayTeamId : m.homeTeamId) : null);

  if (ch.format === 'double-elimination') {
    const gf = matches.find((m) => m.stage === 'grandfinal');
    const reset = matches.find((m) => m.stage === 'reset');
    if (reset?.result) { champion = winnerOfMatch(reset); runnerUp = loserOfMatch(reset); }
    else if (gf?.result && (!reset || reset.status === 'not_needed')) { champion = winnerOfMatch(gf); runnerUp = loserOfMatch(gf); }
  } else if (matches.some((m) => m.stage === 'knockout')) {
    const finalMatch = matches.filter((m) => m.stage === 'knockout').sort((a, b) => (b.bracketRound ?? 0) - (a.bracketRound ?? 0))[0];
    champion = winnerOfMatch(finalMatch);
    runnerUp = loserOfMatch(finalMatch);
    third = winnerOfMatch(matches.find((m) => m.stage === 'third'));
  } else if (leagueTable && leagueMatches.every((m) => m.result)) {
    champion = leagueTable[0]?.teamId ?? null;
    runnerUp = leagueTable[1]?.teamId ?? null;
    third = leagueTable[2]?.teamId ?? null;
  } else if (!matches.some((m) => isKnockoutMatch(m)) && groupTables.length && groupTables.every((g) => g.complete)) {
    // grupos personalizados sem mata-mata: um campeão por grupo
    champion = groupTables.length === 1 ? groupTables[0].rows[0]?.teamId : null;
  }

  const active = matches.filter((m) => m.status !== 'not_needed');
  const finishedCount = active.filter((m) => m.status === 'finished').length;
  const championshipStatus = champion || (active.length && finishedCount === active.length)
    ? 'finished'
    : finishedCount > 0 || active.some((m) => m.status === 'in_progress') ? 'in_progress' : 'planned';

  return {
    matches,
    byId: new Map(matches.map((m) => [m.id, m])),
    teamsById,
    teamName,
    groupTables,
    leagueTable,
    champion,
    runnerUp,
    third,
    progress: { finished: finishedCount, total: active.length },
    status: championshipStatus,
  };
}

/** Texto do participante: nome da equipe, ou a origem da vaga ("Vencedor J5", "1º Grupo A"). */
function participantLabel(ref, resolvedTeamId, ctx) {
  if (resolvedTeamId) return ctx.teamName(resolvedTeamId);
  switch (ref?.kind) {
    case 'winner': return `Vencedor J${ctx.byId.get(ref.matchId)?.number ?? '?'}`;
    case 'loser': return `Perdedor J${ctx.byId.get(ref.matchId)?.number ?? '?'}`;
    case 'group': return `${ref.position}º ${ctx.groups?.find((g) => g.id === ref.groupId)?.name ?? `Grupo ${ref.groupId}`}`;
    case 'bye': return 'Folga';
    default: return 'A definir';
  }
}

/** Partidas que dependem (direta ou indiretamente) de uma partida. */
function dependentMatchIds(matchId, matches) {
  const out = new Set();
  const queue = [matchId];
  const src = matches.find((m) => m.id === matchId);
  const groupId = src?.stage === 'group' ? src.groupId : null;
  while (queue.length) {
    const id = queue.shift();
    for (const m of matches) {
      if (out.has(m.id)) continue;
      const refs = [m.home, m.away];
      const depends = refs.some((r) => (r.kind === 'winner' || r.kind === 'loser') && r.matchId === id)
        || m.resetOf === id
        || (id === matchId && groupId && refs.some((r) => r.kind === 'group' && r.groupId === groupId));
      if (depends) { out.add(m.id); queue.push(m.id); }
    }
  }
  return [...out];
}

/* ======================================================================
 * VALIDAÇÃO DAS ETAPAS DO MONTADOR
 * ====================================================================== */
/**
 * Validações de cada etapa do montador. Retornam { campo: mensagem }.
 * Ficam separadas da interface para serem reaproveitadas e testadas.
 */

function validateGeneral(d) {
  const e = {};
  if (!d.name || d.name.trim().length < 3) e.name = 'Dê um nome ao campeonato (mínimo 3 caracteres).';
  if (!d.sport) e.sport = 'Escolha a modalidade.';
  if (!isValidISODate(d.startDate)) e.startDate = 'Informe a data de início.';
  if (!isValidISODate(d.endDate)) e.endDate = 'Informe a data de término.';
  else if (isValidISODate(d.startDate) && d.endDate < d.startDate) e.endDate = 'A data de término não pode ser antes da data de início.';
  else if (isValidISODate(d.startDate) && (Date.parse(d.endDate) - Date.parse(d.startDate)) / 86400000 > 120) e.endDate = 'O período máximo é de 120 dias.';
  const ds = toMinutes(d.dayStart);
  const de = toMinutes(d.dayEnd);
  if (!Number.isFinite(ds)) e.dayStart = 'Informe o horário de início.';
  if (!Number.isFinite(de)) e.dayEnd = 'Informe o horário limite.';
  else if (Number.isFinite(ds) && de <= ds) e.dayEnd = 'O horário limite precisa ser depois do horário de início.';
  const courts = Number(d.courts);
  if (!Number.isInteger(courts) || courts < 1 || courts > 30) e.courts = 'Informe de 1 a 30 quadras ou campos.';
  if (!d.venue || d.venue.trim().length < 2) e.venue = 'Informe o local da competição.';
  if (!d.category) e.category = 'Escolha a categoria.';
  if (!d.ageGroup || !d.ageGroup.trim()) e.ageGroup = 'Informe a faixa etária (ex.: Sub-17, 14 a 18 anos, Livre).';
  const n = Number(d.expectedTeams);
  if (!Number.isInteger(n) || n < 2 || n > 64) e.expectedTeams = 'Informe de 2 a 64 equipes.';
  return e;
}

function validateTeamForm(team, teams) {
  const e = {};
  const name = (team.name ?? '').trim();
  if (name.length < 2) e.name = 'Informe o nome do time (mínimo 2 caracteres).';
  else if (teams.some((t) => t.id !== team.id && t.name.trim().toLowerCase() === name.toLowerCase())) e.name = 'Já existe um time com este nome.';
  if (!team.responsible || team.responsible.trim().length < 2) e.responsible = 'Informe o nome do responsável.';
  if (!team.category) e.category = 'Escolha a categoria.';
  if (!/^#[0-9a-f]{6}$/i.test(team.color ?? '')) e.color = 'Escolha uma cor.';
  return e;
}

function validateTeams(d) {
  const e = {};
  if (d.teams.length < 2) e.teams = 'Cadastre pelo menos 2 equipes para continuar.';
  if (d.teams.length > 64) e.teams = 'O limite é de 64 equipes.';
  return e;
}

function validateGames(d) {
  const e = {};
  const s = d.settings;
  const dur = Number(s.matchDuration);
  if (!Number.isFinite(dur) || dur < 5 || dur > 300) e.matchDuration = 'A duração precisa estar entre 5 e 300 minutos.';
  const window = toMinutes(d.dayEnd) - toMinutes(d.dayStart);
  if (!e.matchDuration && dur > window) e.matchDuration = `A partida (${dur} min) não cabe na janela diária de ${window} min.`;
  for (const [k, label, max] of [['interval', 'O intervalo', 240], ['prepTime', 'O tempo de preparação', 240], ['courtChangeTime', 'O tempo de troca de quadra', 120], ['maxRoundDuration', 'A duração máxima da rodada', 1440]]) {
    const v = Number(s[k]);
    if (!Number.isFinite(v) || v < 0 || v > max) e[k] = `${label} deve estar entre 0 e ${max} minutos.`;
  }
  const sim = Number(s.maxSimultaneous);
  if (!Number.isInteger(sim) || sim < 1) e.maxSimultaneous = 'Informe pelo menos 1 jogo simultâneo.';
  else if (sim > Number(d.courts)) e.maxSimultaneous = `Não é possível ter mais jogos simultâneos (${sim}) do que quadras (${d.courts}).`;
  s.breaks.forEach((b, i) => {
    const bs = toMinutes(b.start);
    const be = toMinutes(b.end);
    if (!Number.isFinite(bs) || !Number.isFinite(be) || be <= bs) e[`break-${i}`] = 'O fim do descanso precisa ser depois do início.';
    else if (bs < toMinutes(d.dayStart) || be > toMinutes(d.dayEnd)) e[`break-${i}`] = 'O descanso precisa estar dentro do horário do campeonato.';
  });
  if (d.scoringOverrides) {
    const so = d.scoringOverrides;
    if (so.setsToWin !== undefined && !(Number(so.setsToWin) >= 1 && Number(so.setsToWin) <= 4)) e.setsToWin = 'Sets para vencer: de 1 a 4.';
    if (so.pointsPerSet !== undefined && !(Number(so.pointsPerSet) >= 5 && Number(so.pointsPerSet) <= 50)) e.pointsPerSet = 'Pontos por set: de 5 a 50.';
  }
  return e;
}

function validateFormat(d) {
  const errors = validateFormatOptions(d.format, d.teams.length, d.formatOptions);
  return errors.length ? { format: errors.join(' ') } : {};
}

const STEP_VALIDATORS = [validateGeneral, validateTeams, validateGames, validateFormat, () => ({})];

/* ======================================================================
 * INTERFACE — UTILITÁRIOS
 * ====================================================================== */

/** Escapa texto do usuário antes de colocá-lo em HTML (evita injeção de código). */
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
let idCounter = 0;
function uid(prefix = 'id') {
  idCounter += 1;
  return `${prefix}_${Date.now().toString(36)}${idCounter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function plural(n, one, many) { return `${n} ${n === 1 ? one : many}`; }
const normalize = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Ícone SVG (desenhos da biblioteca Lucide, licença ISC). Sempre decorativo: o texto vem ao lado. */
function icon(name, size = 18, cls = '') {
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] ?? ''}</svg>`;
}

/* ======================================================================
 * ARMAZENAMENTO NO NAVEGADOR (localStorage)
 * ====================================================================== */
const PREFIX = 'arenamanager:v1:';
const memoryStore = new Map();
let storageOk = true;
const ls = (() => {
  try {
    window.localStorage.setItem('__probe__', '1');
    window.localStorage.removeItem('__probe__');
    return window.localStorage;
  } catch {
    storageOk = false;
    return null;
  }
})();

function readJSON(key, fallback) {
  try {
    const raw = ls ? ls.getItem(PREFIX + key) : memoryStore.get(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key, value) {
  const raw = JSON.stringify(value);
  try {
    if (ls) ls.setItem(PREFIX + key, raw); else memoryStore.set(PREFIX + key, raw);
    return { ok: true };
  } catch (err) {
    memoryStore.set(PREFIX + key, raw);
    return { ok: false, error: err && err.name === 'QuotaExceededError' ? 'O armazenamento do navegador está cheio. Remova logos grandes ou campeonatos antigos.' : 'Não foi possível salvar no navegador.' };
  }
}

/* Repositório de campeonatos, separado por usuário */
const Repo = {
  list: (userId) => readJSON(`championships:${userId}`, []),
  get: (userId, id) => Repo.list(userId).find((c) => c.id === id) ?? null,
  save(userId, ch) {
    const list = Repo.list(userId);
    const now = new Date().toISOString();
    const item = { ...ch, updatedAt: now, createdAt: ch.createdAt ?? now };
    const i = list.findIndex((c) => c.id === item.id);
    if (i >= 0) list[i] = item; else list.unshift(item);
    return { ...writeJSON(`championships:${userId}`, list), championship: item };
  },
  remove: (userId, id) => writeJSON(`championships:${userId}`, Repo.list(userId).filter((c) => c.id !== id)),
  log(userId, entry) {
    const list = readJSON(`activity:${userId}`, []);
    list.unshift({ id: uid('act'), at: new Date().toISOString(), ...entry });
    writeJSON(`activity:${userId}`, list.slice(0, 50));
  },
  activities: (userId) => readJSON(`activity:${userId}`, []),
  draft: (userId) => readJSON(`draft:${userId}`, null),
  saveDraft: (userId, d) => writeJSON(`draft:${userId}`, { ...d, savedAt: new Date().toISOString() }),
  clearDraft: (userId) => writeJSON(`draft:${userId}`, null),
};

/* ======================================================================
 * CONTAS DE USUÁRIO (no próprio navegador)
 * A senha nunca é guardada: guarda-se um hash PBKDF2-SHA256 com sal aleatório.
 * Sem servidor, as contas valem só neste navegador (ver README).
 * ====================================================================== */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function passwordProblems(p) {
  const out = [];
  if (!p || p.length < 8) out.push('ter pelo menos 8 caracteres');
  if (!/[A-Za-zÀ-ÿ]/.test(p ?? '')) out.push('ter pelo menos uma letra');
  if (!/\d/.test(p ?? '')) out.push('ter pelo menos um número');
  return out;
}
const toHex = (bytes) => [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
function randomHex(n) {
  const a = new Uint8Array(n);
  (window.crypto || window.msCrypto).getRandomValues(a);
  return toHex(a);
}

/* SHA-256 em JavaScript puro: usado só se o navegador não oferecer crypto.subtle */
function sha256Hex(message) {
  const bytes = new TextEncoder().encode(message);
  const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const len = bytes.length;
  const total = Math.ceil((len + 9) / 64) * 64;
  const data = new Uint8Array(total);
  data.set(bytes);
  data[len] = 0x80;
  const view = new DataView(data.buffer);
  view.setUint32(total - 4, (len * 8) >>> 0);
  view.setUint32(total - 8, Math.floor((len * 8) / 2 ** 32));
  const w = new Uint32Array(64);
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  for (let off = 0; off < total; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) >>> 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
  }
  return H.map((x) => x.toString(16).padStart(8, '0')).join('');
}

async function hashPassword(password, saltHex) {
  const subtle = window.crypto && window.crypto.subtle;
  if (subtle) {
    const key = await subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const salt = new Uint8Array(saltHex.match(/../g).map((h) => parseInt(h, 16)));
    const bits = await subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 150000 }, key, 256);
    return `pbkdf2$${toHex(bits)}`;
  }
  let h = `${saltHex}:${password}`;
  for (let i = 0; i < 2000; i++) h = sha256Hex(h + saltHex);
  return `sha256x2000$${h}`;
}

class AuthError extends Error {
  constructor(message, fields = {}) { super(message); this.fields = fields; }
}
const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt });

const Auth = {
  current() {
    const id = readJSON('session', null);
    const u = readJSON('users', []).find((x) => x.id === id);
    return u ? publicUser(u) : null;
  },
  async register({ name, email, password }) {
    const fields = {};
    if (!name || name.trim().length < 2) fields.name = 'Informe seu nome (mínimo 2 caracteres).';
    if (!EMAIL_RE.test((email ?? '').trim())) fields.email = 'Informe um e-mail válido, como nome@escola.com.br.';
    const pp = passwordProblems(password);
    if (pp.length) fields.password = `A senha precisa ${pp.join(', ')}.`;
    if (Object.keys(fields).length) throw new AuthError('Verifique os campos destacados.', fields);
    const users = readJSON('users', []);
    const e = email.trim().toLowerCase();
    if (users.some((u) => u.email === e)) throw new AuthError('Já existe uma conta com este e-mail.', { email: 'Este e-mail já está cadastrado. Tente entrar ou recuperar a senha.' });
    const salt = randomHex(16);
    const user = { id: uid('user'), name: name.trim(), email: e, salt, hash: await hashPassword(password, salt), createdAt: new Date().toISOString() };
    writeJSON('users', [...users, user]);
    writeJSON('session', user.id);
    return publicUser(user);
  },
  async login({ email, password }) {
    const tries = readJSON('login-tries', {});
    const e = String(email ?? '').trim().toLowerCase();
    const recent = (tries[e] ?? []).filter((t) => Date.now() - t < 15 * 60 * 1000);
    if (recent.length >= 5) throw new AuthError('Muitas tentativas. Aguarde 15 minutos e tente de novo.');
    const user = readJSON('users', []).find((u) => u.email === e);
    if (!user || (await hashPassword(password ?? '', user.salt)) !== user.hash) {
      tries[e] = [...recent, Date.now()];
      writeJSON('login-tries', tries);
      throw new AuthError('E-mail ou senha incorretos.');
    }
    delete tries[e];
    writeJSON('login-tries', tries);
    writeJSON('session', user.id);
    return publicUser(user);
  },
  logout() { writeJSON('session', null); },
  forgot(email) {
    if (!EMAIL_RE.test((email ?? '').trim())) throw new AuthError('Informe um e-mail válido.', { email: 'Informe um e-mail válido.' });
    const user = readJSON('users', []).find((u) => u.email === email.trim().toLowerCase());
    if (!user) return null;
    const token = randomHex(24);
    writeJSON('reset', { token, userId: user.id, expiresAt: Date.now() + 30 * 60 * 1000 });
    return token;
  },
  async reset(token, password) {
    const pp = passwordProblems(password);
    if (pp.length) throw new AuthError(`A senha precisa ${pp.join(', ')}.`, { password: `A senha precisa ${pp.join(', ')}.` });
    const r = readJSON('reset', null);
    if (!r || r.token !== token || r.expiresAt < Date.now()) throw new AuthError('Link inválido ou expirado. Peça um novo link de recuperação.');
    const users = readJSON('users', []);
    const u = users.find((x) => x.id === r.userId);
    if (!u) throw new AuthError('Link inválido ou expirado.');
    u.salt = randomHex(16);
    u.hash = await hashPassword(password, u.salt);
    writeJSON('users', users);
    writeJSON('reset', null);
  },
};

/* ======================================================================
 * PREFERÊNCIAS (tema, fonte, contraste, movimento, foco)
 * ====================================================================== */
const FONT_STEPS = [0.875, 1, 1.125, 1.25, 1.375, 1.5];
const Prefs = {
  data: { theme: 'system', fontScale: 1, highContrast: false, reduceMotion: null, strongFocus: false, durations: {}, ...readJSON('preferences', {}) },
  resolvedTheme() {
    if (this.data.theme !== 'system') return this.data.theme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  reduceMotion() {
    if (this.data.reduceMotion !== null && this.data.reduceMotion !== undefined) return this.data.reduceMotion;
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  },
  set(patch) {
    Object.assign(this.data, patch);
    writeJSON('preferences', this.data);
    this.apply();
  },
  apply() {
    const root = document.documentElement;
    root.dataset.theme = this.resolvedTheme();
    root.style.setProperty('--font-scale', String(this.data.fontScale));
    if (this.data.highContrast) root.dataset.contrast = 'high'; else delete root.dataset.contrast;
    root.dataset.motion = this.reduceMotion() ? 'reduce' : 'allow';
    if (this.data.strongFocus) root.dataset.focus = 'strong'; else delete root.dataset.focus;
  },
  stepFont(dir) {
    const i = FONT_STEPS.indexOf(this.data.fontScale);
    const next = FONT_STEPS[Math.max(0, Math.min(FONT_STEPS.length - 1, (i < 0 ? 1 : i) + dir))];
    this.set({ fontScale: next });
  },
};

/* ======================================================================
 * NOTIFICAÇÕES, CONFIRMAÇÃO E DIÁLOGOS
 * ====================================================================== */
const TOAST_ICONS = { success: 'circle-check', warning: 'triangle-alert', error: 'circle-x', info: 'info' };
function notify(message, { type = 'success', action = null, duration = 5000 } = {}) {
  const region = $('#toasts');
  if (!region) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  el.innerHTML = `${icon(TOAST_ICONS[type] ?? 'info', 20)}<div>${esc(message)}</div>${action ? `<button type="button" class="btn btn-sm btn-on-ink" data-toast-action>${esc(action.label)}</button>` : ''}<button type="button" class="btn btn-ghost btn-icon btn-sm" style="color:inherit" aria-label="Fechar notificação" data-toast-close>${icon('x')}</button>`;
  el.querySelector('[data-toast-close]').addEventListener('click', () => el.remove());
  if (action) el.querySelector('[data-toast-action]').addEventListener('click', () => { action.onClick(); el.remove(); });
  region.appendChild(el);
  while (region.children.length > 4) region.firstElementChild.remove();
  if (duration) setTimeout(() => el.remove(), duration);
}

/** Abre um diálogo modal (<dialog> nativo: prende o foco, Esc fecha, devolve o foco). */
function openDialog(id, { title, description = '', body, footer = '', wide = false, onMount }) {
  const dlg = document.getElementById(id);
  dlg.style.width = wide ? 'min(860px, calc(100vw - 2rem))' : '';
  dlg.innerHTML = `
    <div class="modal-header">
      <div>
        <h2 id="${id}-title" style="font-size:var(--fs-xl);margin-bottom:4px">${esc(title)}</h2>
        ${description ? `<p id="${id}-desc" class="muted" style="margin:0">${esc(description)}</p>` : ''}
      </div>
      <button type="button" class="btn btn-ghost btn-icon" aria-label="Fechar" data-close>${icon('x', 20)}</button>
    </div>
    <div class="modal-body">${body}</div>
    ${footer ? `<div class="modal-footer">${footer}</div>` : ''}`;
  dlg.setAttribute('aria-labelledby', `${id}-title`);
  if (description) dlg.setAttribute('aria-describedby', `${id}-desc`); else dlg.removeAttribute('aria-describedby');
  dlg._opener = document.activeElement;
  dlg.querySelector('[data-close]').addEventListener('click', () => closeDialog(id));
  if (!dlg.open) dlg.showModal();
  if (onMount) onMount(dlg);
  requestAnimationFrame(() => {
    const target = dlg.querySelector('[data-autofocus]') || dlg.querySelector('.modal-body input, .modal-body select, .modal-body textarea, .modal-footer button');
    if (target) target.focus();
  });
  return dlg;
}
function closeDialog(id) {
  const dlg = document.getElementById(id);
  if (dlg && dlg.open) {
    dlg.close();
    const opener = dlg._opener;
    if (opener && document.body.contains(opener)) opener.focus();
  }
}
function setupDialog(id, onCancel) {
  const dlg = document.getElementById(id);
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); (onCancel || (() => closeDialog(id)))(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) (onCancel || (() => closeDialog(id)))(); });
}

let confirmResolver = null;
/** Pede confirmação antes de ações destrutivas. Retorna uma Promise<boolean>. */
function confirmAction({ title, message, confirmLabel = 'Confirmar', tone = 'danger' }) {
  return new Promise((resolve) => {
    confirmResolver = resolve;
    openDialog('confirm-dialog', {
      title,
      body: `<p>${esc(message)}</p>`,
      footer: `<button type="button" class="btn" data-answer="no">Cancelar</button><button type="button" class="btn ${tone === 'danger' ? 'btn-danger' : 'btn-primary'}" data-answer="yes" data-autofocus>${esc(confirmLabel)}</button>`,
      onMount(dlg) {
        dlg.querySelectorAll('[data-answer]').forEach((b) => b.addEventListener('click', () => answerConfirm(b.dataset.answer === 'yes')));
        dlg.querySelector('[data-close]').addEventListener('click', () => answerConfirm(false));
      },
    });
  });
}
function answerConfirm(value) {
  closeDialog('confirm-dialog');
  if (confirmResolver) { const r = confirmResolver; confirmResolver = null; r(value); }
}

/* ======================================================================
 * COMPONENTES DE INTERFACE (funções que devolvem HTML)
 * ====================================================================== */

/**
 * Campo de formulário com rótulo, dica e erro ligados por aria-describedby.
 * kind: input | select | textarea. options: [{value, label}] para select.
 */
function field({ label, id, name, kind = 'input', type = 'text', value = '', error, hint, required, attrs = '', options = [], cls = '' }) {
  const describedby = [hint ? `${id}-hint` : '', error ? `${id}-err` : ''].filter(Boolean).join(' ');
  const common = `id="${id}" name="${esc(name ?? id)}" ${describedby ? `aria-describedby="${describedby}"` : ''} ${error ? 'aria-invalid="true"' : ''} ${required ? 'aria-required="true"' : ''} ${attrs}`;
  let control;
  if (kind === 'select') {
    control = `<select class="select" ${common}>${options.map((o) => `<option value="${esc(o.value)}" ${String(o.value) === String(value) ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`;
  } else if (kind === 'textarea') {
    control = `<textarea class="textarea" ${common}>${esc(value)}</textarea>`;
  } else {
    control = `<input class="input" type="${type}" value="${esc(value)}" ${common}>`;
  }
  return `<div class="field ${cls}">
    <label class="field-label" for="${id}">${esc(label)}${required ? '<span class="req" aria-hidden="true">*</span>' : ''}</label>
    ${control}
    ${hint ? `<span class="field-hint" id="${id}-hint">${esc(hint)}</span>` : ''}
    ${error ? `<span class="field-error" id="${id}-err">${icon('circle-alert', 14)}${esc(error)}</span>` : ''}
  </div>`;
}

function passwordField({ label, id, name, value = '', error, required, autocomplete }) {
  const describedby = error ? `aria-describedby="${id}-err" aria-invalid="true"` : '';
  return `<div class="field">
    <label class="field-label" for="${id}">${esc(label)}${required ? '<span class="req" aria-hidden="true">*</span>' : ''}</label>
    <div class="input-group">
      <input class="input" type="password" id="${id}" name="${name}" value="${esc(value)}" autocomplete="${autocomplete}" ${describedby} ${required ? 'aria-required="true"' : ''}>
      <button type="button" class="btn btn-ghost btn-icon" data-action="toggle-password" data-target="${id}" aria-label="Mostrar senha" aria-pressed="false">${icon('eye')}</button>
    </div>
    ${error ? `<span class="field-error" id="${id}-err">${icon('circle-alert', 14)}${esc(error)}</span>` : ''}
  </div>`;
}

const ALERT_ICONS = { info: 'info', success: 'circle-check', warning: 'triangle-alert', danger: 'circle-x' };
function alertBox(tone, title, content, role = '') {
  return `<div class="alert alert-${tone}" ${role ? `role="${role}"` : ''}>${icon(ALERT_ICONS[tone], 22)}<div>${title ? `<div class="alert-title">${esc(title)}</div>` : ''}${content}</div></div>`;
}

function statusBadge(status) {
  const s = MATCH_STATUS[status] ?? MATCH_STATUS.scheduled;
  return `<span class="badge badge-${s.tone}">${esc(s.label)}</span>`;
}
const CHAMP_STATUS = { planned: { label: 'Planejado', tone: 'info' }, in_progress: { label: 'Em andamento', tone: 'live' }, finished: { label: 'Finalizado', tone: 'success' } };
function champBadge(status) {
  const s = CHAMP_STATUS[status] ?? CHAMP_STATUS.planned;
  return `<span class="badge badge-${s.tone}">${esc(s.label)}</span>`;
}

function teamName(team, fallback) {
  if (!team) return `<span class="placeholder">${esc(fallback)}</span>`;
  return `<span class="team-cell"><span class="team-dot" style="background:${esc(team.color)}" aria-hidden="true"></span>${esc(team.name)}</span>`;
}

/** Abas acessíveis: setas, Home e End trocam de aba (padrão WAI-ARIA). */
function tabsHtml(tabs, active, label, base) {
  return `<div class="tabs" role="tablist" aria-label="${esc(label)}" data-tabs="${base}">${tabs.map((t) => `
    <button type="button" role="tab" class="tab" id="${base}-tab-${t.id}" aria-selected="${t.id === active}" aria-controls="${base}-panel" tabindex="${t.id === active ? 0 : -1}" data-tab="${t.id}">
      ${t.icon ? icon(t.icon) : ''}${esc(t.label)}${t.count !== undefined ? ` <span class="badge badge-neutral no-dot">${t.count}</span>` : ''}
    </button>`).join('')}</div>`;
}
function bindTabs(root, onChange) {
  $$('[role="tablist"]', root).forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => onChange(tab.dataset.tab));
      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) {
          e.preventDefault();
          onChange(tabs[next].dataset.tab);
          requestAnimationFrame(() => { const t = document.getElementById(tabs[next].id); if (t) t.focus(); });
        }
      });
    });
  });
}

function searchBox({ id, value, label, placeholder, shortcut = true }) {
  return `<div class="search">
    <label for="${id}" class="visually-hidden">${esc(label)}</label>
    ${icon('search')}
    <input id="${id}" type="search" class="input" value="${esc(value)}" placeholder="${esc(placeholder)}" data-search autocomplete="off">
    ${shortcut && !value ? '<kbd aria-hidden="true">/</kbd>' : ''}
  </div>`;
}

function emptyState(iconName, title, text, actions = '') {
  return `<div class="empty">${icon(iconName, 48, 'empty-icon')}<h3 style="margin:0">${esc(title)}</h3>${text ? `<p>${esc(text)}</p>` : ''}${actions}</div>`;
}

function pageHeader(eyebrow, title, lede, actions = '') {
  return `<header class="page-header"><div class="container spread" style="align-items:flex-end">
    <div>${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h1>${esc(title)}</h1>${lede ? `<p class="muted page-lede">${esc(lede)}</p>` : ''}</div>
    ${actions ? `<div class="row">${actions}</div>` : ''}
  </div></header>`;
}

function progressBar(done, total, label) {
  const pct = total ? (done / total) * 100 : 0;
  return `<div class="progress" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><span style="width:${pct}%"></span></div>`;
}

/* ---------- Ilustrações originais das quadras (SVG) ---------- */
const SURFACES = {
  volei: { bg: '#0E1A2B', court: '#D9692E', line: '#FFFFFF', label: 'Quadra de vôlei vista de cima, com rede ao centro' },
  futebol: { bg: '#0E3B23', court: '#1F7A3F', line: '#FFFFFF', label: 'Campo de futebol visto de cima, com faixas de grama' },
  futsal: { bg: '#0E1A2B', court: '#2A62B8', line: '#FFFFFF', label: 'Quadra de futsal vista de cima' },
  basquete: { bg: '#2B1A0E', court: '#C98B4E', line: '#FFFFFF', label: 'Quadra de basquete de madeira vista de cima' },
  handebol: { bg: '#0E1A2B', court: '#2E8C7A', line: '#FFFFFF', label: 'Quadra de handebol vista de cima com áreas de gol' },
  tenis: { bg: '#123B2A', court: '#2D5FA8', line: '#FFFFFF', label: 'Quadra de tênis rápida vista de cima' },
  'beach-tennis': { bg: '#3B6EA5', court: '#E9CF95', line: '#0E1A2B', label: 'Quadra de beach tennis na areia vista de cima' },
  'volei-praia': { bg: '#2E6E9E', court: '#E7C988', line: '#0E1A2B', label: 'Quadra de vôlei de praia na areia vista de cima' },
  badminton: { bg: '#0E1A2B', court: '#2F8F57', line: '#FFFFFF', label: 'Quadra de badminton vista de cima' },
  'tenis-mesa': { bg: '#1A1A1A', court: '#1F4E8C', line: '#FFFFFF', label: 'Mesa de tênis de mesa vista de cima' },
};

function courtLines(sport, s) {
  const L = `stroke="${s.line}" stroke-width="2" fill="none"`;
  const rep = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');
  switch (sport) {
    case 'futebol':
      return `<rect x="30" y="25" width="260" height="150" fill="${s.court}"/>${rep(7, (i) => (i % 2 === 0 ? `<rect x="${30 + i * 37.14}" y="25" width="37.14" height="150" fill="#000" opacity="0.08"/>` : ''))}
        <rect x="30" y="25" width="260" height="150" ${L}/><line x1="160" y1="25" x2="160" y2="175" ${L}/><circle cx="160" cy="100" r="22" ${L}/>
        <rect x="30" y="62" width="34" height="76" ${L}/><rect x="256" y="62" width="34" height="76" ${L}/><rect x="30" y="82" width="12" height="36" ${L}/><rect x="278" y="82" width="12" height="36" ${L}/>`;
    case 'basquete':
      return `<rect x="30" y="30" width="260" height="140" fill="${s.court}"/>${rep(13, (i) => `<line x1="${30 + i * 20}" y1="30" x2="${30 + i * 20}" y2="170" stroke="#000" opacity="0.08"/>`)}
        <rect x="30" y="30" width="260" height="140" ${L}/><line x1="160" y1="30" x2="160" y2="170" ${L}/><circle cx="160" cy="100" r="18" ${L}/>
        <rect x="30" y="76" width="50" height="48" ${L}/><rect x="240" y="76" width="50" height="48" ${L}/>
        <path d="M30 40 H44 A62 62 0 0 1 44 160 H30" ${L}/><path d="M290 40 H276 A62 62 0 0 0 276 160 H290" ${L}/>`;
    case 'handebol':
    case 'futsal':
      return `<rect x="30" y="35" width="260" height="130" fill="${s.court}"/><rect x="30" y="35" width="260" height="130" ${L}/>
        <line x1="160" y1="35" x2="160" y2="165" ${L}/><circle cx="160" cy="100" r="18" ${L}/>
        <path d="M30 58 Q78 100 30 142" ${L}/><path d="M290 58 Q242 100 290 142" ${L}/>
        ${sport === 'handebol' ? `<path d="M30 46 Q98 100 30 154" ${L} stroke-dasharray="6 5"/><path d="M290 46 Q222 100 290 154" ${L} stroke-dasharray="6 5"/>` : ''}`;
    case 'tenis':
    case 'badminton': {
      const t = sport === 'tenis';
      return `<rect x="30" y="40" width="260" height="120" fill="${s.court}"/><rect x="30" y="40" width="260" height="120" ${L}/>
        <line x1="30" y1="54" x2="290" y2="54" ${L}/><line x1="30" y1="146" x2="290" y2="146" ${L}/>
        <line x1="${t ? 95 : 120}" y1="54" x2="${t ? 95 : 120}" y2="146" ${L}/><line x1="${t ? 225 : 200}" y1="54" x2="${t ? 225 : 200}" y2="146" ${L}/>
        <line x1="${t ? 95 : 30}" y1="100" x2="${t ? 225 : 290}" y2="100" ${L}/><line x1="160" y1="34" x2="160" y2="166" stroke="${s.line}" stroke-width="4"/>`;
    }
    case 'tenis-mesa':
      return `<rect x="50" y="45" width="220" height="110" rx="3" fill="${s.court}"/><rect x="50" y="45" width="220" height="110" rx="3" stroke="${s.line}" stroke-width="3" fill="none"/>
        <line x1="50" y1="100" x2="270" y2="100" stroke="${s.line}" stroke-width="1.2"/><line x1="160" y1="38" x2="160" y2="162" stroke="${s.line}" stroke-width="4"/>`;
    default: {
      const sand = sport === 'volei-praia' || sport === 'beach-tennis';
      return `<rect x="40" y="40" width="240" height="120" fill="${s.court}"/>
        ${sand ? rep(40, (i) => `<circle cx="${45 + ((i * 53) % 230)}" cy="${45 + ((i * 37) % 110)}" r="1.2" fill="#000" opacity="0.18"/>`) : ''}
        <rect x="40" y="40" width="240" height="120" ${L}/>
        ${sport === 'volei' ? `<line x1="120" y1="40" x2="120" y2="160" ${L}/><line x1="200" y1="40" x2="200" y2="160" ${L}/>` : ''}
        <line x1="160" y1="32" x2="160" y2="168" stroke="${s.line}" stroke-width="4"/><circle cx="160" cy="32" r="3" fill="${s.line}"/><circle cx="160" cy="168" r="3" fill="${s.line}"/>`;
    }
  }
}

function sportArt(sport = 'volei', { cls = '', decorative = false } = {}) {
  const s = SURFACES[sport] ?? SURFACES.volei;
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : `role="img" aria-label="${esc(s.label)}"`;
  const stripes = Array.from({ length: 9 }, (_, i) => `<line x1="${-40 + i * 50}" y1="200" x2="${i * 50 + 40}" y2="0" stroke="#fff" stroke-width="18"/>`).join('');
  return `<svg viewBox="0 0 320 200" class="${cls}" preserveAspectRatio="xMidYMid slice" ${a11y}><rect width="320" height="200" fill="${s.bg}"/><g opacity="0.1">${stripes}</g>${courtLines(sport, s)}<rect x="0" y="192" width="320" height="8" fill="#C5EE3A"/></svg>`;
}

function logo(withText = true) {
  return `<span class="logo"><svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="10" fill="var(--c-ink)"/><path d="M9 30 L20 9 L31 30" fill="none" stroke="var(--c-accent)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/><path d="M14 23 H26" stroke="#F4F3EE" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="9" r="2.6" fill="#F4F3EE"/></svg>${withText ? '<span class="logo-text">Arena<span>Manager</span></span>' : ''}</span>`;
}

/* ======================================================================
 * MODELO DO CAMPEONATO (rascunho ↔ algoritmo ↔ objeto salvo)
 * ====================================================================== */
const TEAM_COLORS = ['#1B47C9', '#C2410C', '#126B43', '#7A2DB8', '#B42323', '#0F7C8C', '#8A6A00', '#3A4A5E', '#C2185B', '#2E7D32', '#5D4037', '#283593'];

function emptyDraft() {
  const today = todayISO();
  const custom = Prefs.data.durations && Prefs.data.durations.volei;
  return {
    id: null, name: '', sport: 'volei', startDate: today, endDate: today, dayStart: '08:00', dayEnd: '18:00',
    courts: 2, venue: '', category: 'misto', ageGroup: 'Livre', expectedTeams: 8, teams: [],
    settings: { matchDuration: custom || getSport('volei').defaultDuration, interval: 15, prepTime: 0, courtChangeTime: 0, maxRoundDuration: 0, maxSimultaneous: 2, breaks: [] },
    scoringOverrides: {}, strictScoring: true, pointsConfig: null,
    format: 'groups-knockout',
    formatOptions: { groupsCount: 2, advancePerGroup: 2, thirdPlace: false, withReset: true, knockout: true, groups: null },
  };
}

const EXAMPLE_TEAMS = [
  ['Tubarões do 3ºA', 'Profa. Marina Lopes'], ['Falcões do 3ºB', 'Prof. Rafael Dias'], ['Leoas do 2ºA', 'Profa. Carla Nunes'],
  ['Atlético 2ºB', 'Prof. Jonas Prado'], ['Furacão 1ºA', 'Profa. Elisa Rocha'], ['Pantera 1ºB', 'Prof. Diego Matos'],
  ['Relâmpago 9ºA', 'Profa. Sueli Campos'], ['Titãs 9ºB', 'Prof. André Faria'],
];

/** Exemplo do enunciado: vôlei, 08h–18h, 2 quadras, 8 equipes, 45 min + 15 min de intervalo. */
function exampleDraft() {
  const d = emptyDraft();
  d.settings.matchDuration = 45;
  return {
    ...d,
    name: 'Copa Interclasses de Vôlei', venue: 'Ginásio Poliesportivo da Escola', category: 'misto', ageGroup: '14 a 18 anos', expectedTeams: 8,
    teams: EXAMPLE_TEAMS.map(([name, responsible], i) => ({ id: uid('team'), name, responsible, category: 'misto', color: TEAM_COLORS[i], logo: null })),
  };
}

function toPlanInput(d) {
  const sim = Math.min(Number(d.courts) || 1, Number(d.settings.maxSimultaneous) || Number(d.courts) || 1);
  return {
    teams: d.teams,
    format: d.format,
    formatOptions: { ...d.formatOptions, groups: d.format === 'custom-groups' ? d.formatOptions.groups : null },
    schedule: {
      startDate: d.startDate, endDate: d.endDate, dayStart: d.dayStart, dayEnd: d.dayEnd, courts: Number(d.courts), maxSimultaneous: sim,
      matchDuration: Number(d.settings.matchDuration), interval: Number(d.settings.interval), prepTime: Number(d.settings.prepTime),
      courtChangeTime: Number(d.settings.courtChangeTime), maxRoundDuration: Number(d.settings.maxRoundDuration), breaks: d.settings.breaks,
    },
  };
}

function applySuggestion(d, patch) {
  const next = clone(d);
  if (patch.format) next.format = patch.format;
  const s = patch.schedule || {};
  if (s.courts) next.courts = s.courts;
  if (s.maxSimultaneous) next.settings.maxSimultaneous = s.maxSimultaneous;
  if (s.endDate) next.endDate = s.endDate;
  if (s.dayEnd) next.dayEnd = s.dayEnd;
  if (s.dayStart) next.dayStart = s.dayStart;
  if (s.interval !== undefined) next.settings.interval = s.interval;
  return next;
}

function buildChampionship(d, plan) {
  return { ...clone(d), id: d.id || uid('camp'), matches: plan.matches, groups: plan.groups, generatedAt: new Date().toISOString() };
}

/** Campeonato completo de demonstração, com parte dos resultados já lançados. */
function demoChampionship() {
  const d = exampleDraft();
  d.name = 'Copa Interclasses de Vôlei (exemplo)';
  const plan = planChampionship(toPlanInput(d));
  const ch = buildChampionship(d, plan);
  const scoring = scoringOf(ch);
  const sample = [
    [[25, 21], [25, 19], [25, 23]], [[22, 25], [25, 20], [25, 18], [25, 22]], [[25, 17], [23, 25], [25, 21], [21, 25], [15, 12]],
    [[19, 25], [21, 25], [25, 22], [20, 25]], [[25, 23], [25, 16], [25, 20]], [[25, 27], [25, 21], [25, 19], [25, 18]],
    [[25, 15], [25, 18], [25, 20]], [[18, 25], [25, 23], [22, 25], [19, 25]],
  ];
  let i = 0;
  for (const m of ch.matches.filter((x) => x.stage === 'group' && x.round <= 2)) {
    const r = evaluateResult({ sets: sample[i++ % sample.length].map(([home, away]) => ({ home, away })) }, scoring);
    if (r.ok) m.result = r.result;
  }
  const state = resolveChampionship(ch);
  const pending = state.matches.find((m) => m.status === 'scheduled' && !isKnockoutMatch(m));
  if (pending) ch.matches.find((m) => m.id === pending.id).live = true;
  return ch;
}

function venueLabelOf(sportId) {
  const v = getSport(sportId).venueLabel;
  return v === 'campo' ? 'Campo' : v === 'mesa' ? 'Mesa' : 'Quadra';
}

/* ======================================================================
 * ESTADO GLOBAL DA INTERFACE
 * ====================================================================== */
const S = {
  user: null,
  path: '/',
  query: new URLSearchParams(),
  menuOpen: false,
  forms: {},          // valores e erros de formulários simples (login, cadastro…)
  wizard: null,       // estado do montador
  list: { q: '', status: 'all', sport: 'all', sort: 'recent' },
  rules: { q: '', cat: 'todos', sel: 'volei', tab: 'overview' },
  sched: { q: '', date: 'all', court: 'all', phase: 'all', status: 'all' },
};

const NAV = [
  { to: '/', label: 'Início' },
  { to: '/painel', label: 'Painel', auth: true },
  { to: '/campeonatos', label: 'Campeonatos', auth: true },
  { to: '/regras', label: 'Regras' },
  { to: '/acessibilidade', label: 'Acessibilidade' },
  { to: '/ajuda', label: 'Ajuda' },
  { to: '/contato', label: 'Contato' },
];
const SHORTCUTS = [
  ['?', 'Abrir esta lista de atalhos'],
  ['/', 'Ir para a barra de pesquisa da página'],
  ['Alt + N', 'Criar novo campeonato'],
  ['Alt + T', 'Alternar modo claro/escuro'],
  ['Tab / Shift + Tab', 'Avançar / voltar entre elementos'],
  ['← → (em abas)', 'Trocar de aba'],
  ['Esc', 'Fechar diálogos e o menu'],
];

function go(path) {
  if (`#${path}` === location.hash) route();
  else location.hash = `#${path}`;
}

/* ======================================================================
 * ESTRUTURA DA PÁGINA (cabeçalho, avisos, rodapé)
 * ====================================================================== */
function headerHtml() {
  const u = S.user;
  const active = (to) => (to === '/' ? S.path === '/' : S.path === to || S.path.startsWith(`${to}/`));
  const dark = Prefs.resolvedTheme() === 'dark';
  return `<header class="site-header">
    <div class="container header-inner">
      <a href="#/" class="brand" aria-label="ArenaManager — página inicial">${logo()}</a>
      <nav aria-label="Principal" class="main-nav ${S.menuOpen ? 'is-open' : ''}" id="main-nav">
        <ul>${NAV.filter((n) => !n.auth || u).map((n) => `<li><a href="#${n.to}" class="nav-link ${active(n.to) ? 'active' : ''}" ${active(n.to) ? 'aria-current="page"' : ''}>${esc(n.label)}</a></li>`).join('')}</ul>
        <div class="nav-actions-mobile">
          ${u ? `<button type="button" class="btn btn-block" data-action="logout">${icon('log-out')}Sair</button>`
    : '<a href="#/entrar" class="btn btn-block">Entrar</a><a href="#/cadastro" class="btn btn-primary btn-block">Criar conta</a>'}
        </div>
      </nav>
      <div class="header-actions">
        <button type="button" class="btn btn-ghost btn-icon" data-action="shortcuts" aria-label="Atalhos de teclado" title="Atalhos de teclado (?)">${icon('keyboard')}</button>
        <button type="button" class="btn btn-ghost btn-icon" data-action="toggle-theme" aria-label="${dark ? 'Ativar modo claro' : 'Ativar modo escuro'}" title="${dark ? 'Modo claro' : 'Modo escuro'} (Alt+T)">${icon(dark ? 'sun' : 'moon')}</button>
        ${u ? `<a href="#/campeonatos/novo" class="btn btn-primary hide-sm">${icon('plus')}Criar campeonato</a>
          <span class="user-chip hide-sm" title="${esc(u.email)}">${icon('user-round')}<span class="visually-hidden">Conectado como </span>${esc(u.name.split(' ')[0])}</span>
          <button type="button" class="btn btn-ghost btn-icon hide-sm" data-action="logout" aria-label="Sair da conta" title="Sair">${icon('log-out')}</button>`
    : '<a href="#/entrar" class="btn btn-ghost hide-sm">Entrar</a><a href="#/cadastro" class="btn btn-primary hide-sm">Criar conta</a>'}
        <button type="button" class="btn btn-icon menu-toggle" data-action="menu" aria-expanded="${S.menuOpen}" aria-controls="main-nav" aria-label="${S.menuOpen ? 'Fechar menu' : 'Abrir menu'}">${icon(S.menuOpen ? 'x' : 'menu', 20)}</button>
      </div>
    </div>
  </header>`;
}

function footerHtml() {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div>${logo()}<p class="footer-tagline">Seu campeonato, organizado do início ao fim.</p><p class="footer-note">Projeto acadêmico de Engenharia de Software. Depoimentos e dados de exemplo são fictícios.</p></div>
      <nav aria-label="Produto"><h2 class="footer-title">Produto</h2><ul class="list-plain">
        <li><a href="#/campeonatos/novo">Montador de campeonatos</a></li><li><a href="#/campeonatos">Meus campeonatos</a></li><li><a href="#/painel">Painel</a></li></ul></nav>
      <nav aria-label="Recursos"><h2 class="footer-title">Recursos</h2><ul class="list-plain">
        <li><a href="#/regras">${icon('book-open', 16)}Regras dos esportes</a></li><li><a href="#/ajuda">Ajuda e documentação</a></li><li><a href="#/acessibilidade">${icon('accessibility', 16)}Acessibilidade</a></li></ul></nav>
      <nav aria-label="Institucional"><h2 class="footer-title">Contato</h2><ul class="list-plain">
        <li><a href="#/contato">${icon('mail', 16)}Fale conosco</a></li><li><a href="#/cadastro">Criar conta</a></li>
        <li><a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">WCAG 2.2 (W3C)<span class="visually-hidden"> (abre em nova aba)</span></a></li></ul></nav>
    </div>
    <div class="container footer-bottom"><span>© 2026 ArenaManager · trabalho acadêmico</span><span>HTML, CSS e JavaScript puro · as regras oficiais pertencem às respectivas entidades.</span></div>
  </footer>`;
}

function bannersHtml() {
  const out = [];
  if (S.user) out.push(`<div class="demo-banner" role="note"><div class="container row">${icon('shield-alert', 20)}<span><strong>Dados salvos neste navegador:</strong> contas e campeonatos ficam só neste computador e navegador. Não use uma senha que você usa em outros sites.</span></div></div>`);
  if (!storageOk) out.push(`<div class="demo-banner" role="note"><div class="container row">${icon('shield-alert', 20)}<span>Seu navegador bloqueou o armazenamento local: os dados serão perdidos ao fechar a página.</span></div></div>`);
  return out.join('');
}

/* ======================================================================
 * PÁGINA INICIAL
 * ====================================================================== */
const FEATURES = [
  ['wand-sparkles', 'Montador automático', 'Informe equipes, quadras e horários. O sistema gera confrontos, rodadas e a programação completa.'],
  ['calendar-clock', 'Horários sem conflito', 'Nenhuma equipe joga em duas quadras ao mesmo tempo, e os descansos e o horário limite são respeitados.'],
  ['gauge', 'Capacidade calculada', 'Se não houver tempo para todos os jogos, você recebe alternativas já testadas pelo algoritmo.'],
  ['trophy', 'Resultados e classificação', 'Placar por sets ou por gols. Tabela, classificados e próximos confrontos se atualizam sozinhos.'],
  ['file-down', 'Exporte e imprima', 'Programação em planilha CSV, impressão direta ou PDF pela impressão do navegador.'],
  ['accessibility', 'Acessível de verdade', 'Modo escuro, alto contraste, fonte ajustável, navegação por teclado e contraste WCAG 2.2 AA.'],
];
const BENEFITS = [
  'Planeje um campeonato inteiro em poucos minutos, sem planilhas paralelas.',
  'Mude quadras ou horários e veja na hora o impacto na programação.',
  'Evite erros comuns: equipe sem descanso, jogo invadindo o almoço, final antes da semifinal.',
  'Compartilhe uma tabela clara com atletas, técnicos e torcida.',
  'Funciona em computador, tablet e celular — inclusive na beira da quadra.',
  'Regras de cada modalidade com a entidade oficial e a fonte indicadas.',
];
const TESTIMONIALS = [
  ['Organizei os jogos interclasses com 12 turmas e 3 quadras sem nenhum choque de horário.', 'Profª. Helena M.', 'Professora de Educação Física (personagem fictícia)'],
  ['O aviso de falta de horário com sugestão de mais um dia salvou nosso torneio de beach tennis.', 'Caio R.', 'Organizador de torneios amadores (personagem fictício)'],
  ['Lançar o placar set a set e ver a classificação mudar na hora deixou o evento muito mais profissional.', 'Juliana P.', 'Coordenadora de liga universitária (personagem fictícia)'],
];

const demoState = { teams: 8, courts: 2, format: 'groups-knockout', duration: 45, interval: 15 };

function demoOutputHtml() {
  const d = demoState;
  const plan = planChampionship({
    teams: Array.from({ length: d.teams }, (_, i) => ({ id: `d${i}`, name: `Equipe ${i + 1}` })),
    format: d.format,
    formatOptions: { groupsCount: Math.max(1, Math.round(d.teams / 4)), advancePerGroup: 2 },
    schedule: { startDate: '2026-12-05', endDate: '2026-12-05', dayStart: '08:00', dayEnd: '18:00', courts: d.courts, maxSimultaneous: d.courts, matchDuration: d.duration, interval: d.interval, prepTime: 0, courtChangeTime: 0, breaks: [] },
  });
  if (!plan.ok) return `<p class="muted">${esc(plan.errors[0])}</p>`;
  const scheduled = plan.matches.filter((m) => m.date);
  const unscheduled = plan.schedule.unscheduled.length;
  const lanes = Array.from({ length: d.courts }, (_, c) => `<div class="mini-lane"><span class="mini-lane-label">Q${c + 1}</span><div class="mini-lane-track">${scheduled.filter((m) => m.court === c + 1).map((m) => `<span class="mini-block ${m.stage !== 'group' && m.stage !== 'league' ? 'ko' : ''}" style="left:${((m.start - 480) / 600) * 100}%;width:${((m.end - m.start) / 600) * 100}%" title="${esc(m.phase)} · ${toHHMM(m.start)}"></span>`).join('')}</div></div>`).join('');
  return `<div class="stat-inline">
      <div><strong class="tabular">${plan.summary.totalMatches}</strong><span>partidas</span></div>
      <div><strong class="tabular">${plan.summary.rounds}</strong><span>rodadas</span></div>
      <div><strong class="tabular">${plan.capacity.perDay}</strong><span>horários/dia</span></div>
      <div><strong class="tabular">${plan.schedule.stats.lastEnd ?? '—'}</strong><span>último jogo termina</span></div>
    </div>
    <div class="mini-timeline" role="img" aria-label="Linha do tempo: ${scheduled.length} jogos em ${plural(d.courts, 'quadra', 'quadras')}${unscheduled ? `; ${unscheduled} jogos não couberam no dia` : ''}.">
      ${lanes}<div class="mini-axis" aria-hidden="true"><span>08h</span><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span></div>
    </div>
    ${unscheduled > 0
    ? `<p class="demo-verdict warn"><strong>${unscheduled} jogos não cabem no dia.</strong> ${plan.suggestions[0] ? `Sugestão: ${esc(plan.suggestions[0].label.toLowerCase())}.` : ''}</p>`
    : `<p class="demo-verdict ok">${icon('circle-check', 20)} Tudo cabe no dia, sem conflitos.</p>`}`;
}

function pageHome() {
  const createHref = S.user ? '#/campeonatos/novo' : '#/cadastro';
  const games = [['10:00', 1, 'Tubarões', 'Atlético', true], ['10:00', 2, 'Leoas', 'Falcões'], ['11:00', 1, 'Furacão', 'Titãs']];
  const html = `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-lines" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow eyebrow-on-ink">Plataforma para organizadores esportivos</p>
        <h1 id="hero-title">Seu campeonato, organizado do início ao fim.</h1>
        <p class="hero-lede">Crie competições de vôlei, futebol, basquete, beach tennis e mais. O ArenaManager monta a tabela, distribui os jogos entre as quadras e acompanha cada resultado.</p>
        <div class="row">
          <a href="${createHref}" class="btn btn-accent btn-lg">Criar campeonato ${icon('arrow-right')}</a>
          <a href="#demonstracao" data-scroll="demonstracao" class="btn btn-on-ink btn-lg">Ver o montador em ação</a>
        </div>
        <ul class="hero-proof list-plain"><li>${icon('circle-check')}10 modalidades</li><li>${icon('circle-check')}6 formatos de disputa</li><li>${icon('circle-check')}CSV, PDF e impressão</li></ul>
      </div>
      <div class="hero-board" aria-hidden="true">
        <div class="hero-court">${sportArt('volei', { decorative: true })}</div>
        <div class="hero-card hero-card-schedule">
          <div class="hero-card-head"><span>Programação · Sábado</span><span class="hero-pill">2 quadras</span></div>
          ${games.map(([t, c, a, b, live]) => `<div class="hero-row"><span class="hero-time">${t}</span><span class="hero-court-n">Q${c}</span><span class="hero-teams">${a} <em>×</em> ${b}</span>${live ? '<span class="hero-live">ao vivo</span>' : ''}</div>`).join('')}
        </div>
        <div class="hero-card hero-card-score"><span class="hero-score-label">Jogo 5 · 3º set</span><span class="hero-score">2 <em>–</em> 0</span><span class="hero-sets">25–21 · 25–19 · 18–14</span></div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="features-title">
    <div class="container">
      <p class="eyebrow">Funcionalidades</p>
      <h2 id="features-title" class="section-title">Tudo o que um organizador precisa, em um só lugar</h2>
      <div class="grid-3 features">${FEATURES.map(([ic, t, x]) => `<article class="card card-interactive feature-card"><div class="card-icon">${icon(ic, 22)}</div><h3>${t}</h3><p class="muted">${x}</p></article>`).join('')}</div>
    </div>
  </section>

  <section class="section section-alt" aria-labelledby="sports-title">
    <div class="container">
      <div class="spread"><div><p class="eyebrow">Modalidades</p><h2 id="sports-title" class="section-title">Do vôlei de quadra ao tênis de mesa</h2></div><a href="#/regras" class="btn">Ver regras dos esportes ${icon('arrow-right')}</a></div>
      <section class="carousel" aria-roledescription="carrossel" aria-label="Modalidades esportivas">
        <div class="carousel-track" id="carousel-track" tabindex="0" aria-label="Modalidades: use as setas ou role para o lado">
          ${SPORTS.map((s, i) => {
    const rule = RULES.find((r) => r.sportId === s.id);
    return `<div role="group" aria-roledescription="slide" aria-label="${i + 1} de ${SPORTS.length}"><article class="sport-slide card">
              ${sportArt(s.id, { cls: 'sport-slide-art' })}
              <div class="sport-slide-body"><h3>${esc(s.name)}</h3>
                <p class="muted"><span class="badge badge-official no-dot">Regras: ${esc(rule.bodyShort)}</span></p>
                <p class="sport-slide-meta">${icon('clock-3', 16)} Duração estimada no sistema: ${formatDuration(s.defaultDuration)} <span class="badge badge-suggestion no-dot">sugestão editável</span></p>
                <a href="#/regras?modalidade=${s.id}">Regras do ${esc(s.name.toLowerCase())}</a>
              </div></article></div>`;
  }).join('')}
        </div>
        <div class="carousel-controls">
          <div class="carousel-dots">${SPORTS.map((_, i) => `<button type="button" aria-label="Ir para o slide ${i + 1}" data-slide="${i}" ${i === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div>
          <div class="row"><button type="button" class="btn btn-icon" data-slide-step="-1" aria-label="Slide anterior">${icon('chevron-left')}</button><button type="button" class="btn btn-icon" data-slide-step="1" aria-label="Próximo slide">${icon('chevron-right')}</button></div>
        </div>
      </section>
    </div>
  </section>

  <section class="section" id="demonstracao" aria-labelledby="demo-title">
    <div class="container">
      <p class="eyebrow">Demonstração</p>
      <h2 id="demo-title" class="section-title">Mexa nos números e veja o campeonato se montar</h2>
      <p class="muted section-lede">Esta simulação usa o algoritmo real do ArenaManager. Cada bloco é uma partida em uma quadra; os blocos em lima são jogos de mata-mata.</p>
      <div class="builder-demo card">
        <div class="builder-demo-controls">
          <div class="field"><label class="field-label" for="demo-teams">Equipes: <strong id="demo-teams-v">${demoState.teams}</strong></label><input id="demo-teams" type="range" min="4" max="20" value="${demoState.teams}" data-demo="teams"></div>
          <div class="field"><label class="field-label" for="demo-courts">Quadras: <strong id="demo-courts-v">${demoState.courts}</strong></label><input id="demo-courts" type="range" min="1" max="6" value="${demoState.courts}" data-demo="courts"></div>
          ${field({ label: 'Formato', id: 'demo-format', kind: 'select', value: demoState.format, options: FORMATS.filter((f) => f.id !== 'custom-groups').map((f) => ({ value: f.id, label: f.name })), attrs: 'data-demo="format"' })}
          <div class="form-grid" style="grid-template-columns:1fr 1fr">
            ${field({ label: 'Duração (min)', id: 'demo-duration', type: 'number', value: demoState.duration, attrs: 'min="10" max="120" step="5" data-demo="duration"' })}
            ${field({ label: 'Intervalo (min)', id: 'demo-interval', type: 'number', value: demoState.interval, attrs: 'min="0" max="60" step="5" data-demo="interval"' })}
          </div>
          <p class="field-hint">Simulação de um dia, das 08:00 às 18:00, calculada pelo mesmo algoritmo do sistema.</p>
        </div>
        <div class="builder-demo-output" id="demo-output" aria-live="polite">${demoOutputHtml()}</div>
      </div>
    </div>
  </section>

  <section class="section section-alt" aria-labelledby="how-title">
    <div class="container two-col">
      <div><p class="eyebrow">Como funciona</p><h2 id="how-title" class="section-title">Cinco etapas, um campeonato pronto</h2>
        <ol class="how-steps">
          <li><strong>Informações gerais</strong><span>Nome, modalidade, datas, horários, quadras e local.</span></li>
          <li><strong>Equipes</strong><span>Cadastre times com responsável, cor e logo.</span></li>
          <li><strong>Configuração dos jogos</strong><span>Duração, intervalos, descansos e jogos simultâneos.</span></li>
          <li><strong>Formato</strong><span>Mata-mata, grupos, pontos corridos e mais.</span></li>
          <li><strong>Gerar campeonato</strong><span>Tabela pronta, editável e exportável.</span></li>
        </ol></div>
      <div><p class="eyebrow">Benefícios</p><h2 class="section-title">Menos planilha, mais jogo</h2>
        <ul class="benefits list-plain">${BENEFITS.map((b) => `<li>${icon('circle-check', 22)}${b}</li>`).join('')}</ul>
        <div class="row" style="margin-top:var(--sp-4)">${['Escolas', 'Clubes', 'Universidades', 'Federações', 'Eventos'].map((x) => `<span class="badge badge-neutral no-dot">${x}</span>`).join('')}</div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="testimonials-title">
    <div class="container">
      <p class="eyebrow">Depoimentos</p>
      <h2 id="testimonials-title" class="section-title">O que diriam os organizadores</h2>
      <p class="demo-label" role="note">${icon('layout-grid', 16)} Conteúdo demonstrativo: depoimentos fictícios criados para este trabalho acadêmico.</p>
      <div class="grid-3">${TESTIMONIALS.map(([q, n, r]) => `<figure class="card testimonial">${icon('quote', 32, 'testimonial-mark')}<blockquote>${q}</blockquote><figcaption><strong>${n}</strong><span>${r}</span></figcaption></figure>`).join('')}</div>
    </div>
  </section>

  <section class="cta-band" aria-labelledby="cta-title">
    <div class="container spread">
      <div><h2 id="cta-title">Pronto para a primeira rodada?</h2><p>Crie sua conta e monte um campeonato completo em poucos minutos.</p></div>
      <div class="row"><a href="${createHref}" class="btn btn-accent btn-lg">Criar campeonato ${icon('arrow-right')}</a><a href="#/ajuda" class="btn btn-on-ink btn-lg">${icon('shield-check')}Como funciona o algoritmo</a></div>
    </div>
  </section>`;

  function mount(root) {
    root.addEventListener('input', (e) => {
      const k = e.target.dataset.demo;
      if (!k) return;
      if (k === 'format') demoState.format = e.target.value;
      else demoState[k] = Math.max(k === 'interval' ? 0 : k === 'duration' ? 10 : 1, Number(e.target.value) || 0);
      if (k === 'teams') $('#demo-teams-v').textContent = demoState.teams;
      if (k === 'courts') $('#demo-courts-v').textContent = demoState.courts;
      $('#demo-output').innerHTML = demoOutputHtml();
    });
    root.addEventListener('change', (e) => { if (e.target.dataset.demo === 'format') { demoState.format = e.target.value; $('#demo-output').innerHTML = demoOutputHtml(); } });
    // carrossel
    const track = $('#carousel-track');
    const slides = () => [...track.children];
    let index = 0;
    const goSlide = (i) => {
      const target = slides()[Math.max(0, Math.min(slides().length - 1, i))];
      if (target) track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: Prefs.reduceMotion() ? 'auto' : 'smooth' });
    };
    track.addEventListener('scroll', () => {
      const w = (track.firstElementChild?.getBoundingClientRect().width ?? 1) + 16;
      index = Math.round(track.scrollLeft / w);
      $$('[data-slide]', root).forEach((b, i) => { if (i === index) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    }, { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goSlide(index + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goSlide(index - 1); }
    });
    $$('[data-slide]', root).forEach((b) => b.addEventListener('click', () => goSlide(Number(b.dataset.slide))));
    $$('[data-slide-step]', root).forEach((b) => b.addEventListener('click', () => goSlide(index + Number(b.dataset.slideStep))));
  }
  return { title: 'Seu campeonato, organizado do início ao fim', html, mount };
}

/* ======================================================================
 * LOGIN, CADASTRO E RECUPERAÇÃO DE SENHA
 * ====================================================================== */
function passwordChecklist(p) {
  const checks = [['Pelo menos 8 caracteres', (p ?? '').length >= 8], ['Pelo menos uma letra', /[A-Za-zÀ-ÿ]/.test(p ?? '')], ['Pelo menos um número', /\d/.test(p ?? '')]];
  return `<ul class="pw-checklist list-plain" id="pw-checklist" aria-label="Requisitos da senha">${checks.map(([l, ok]) => `<li class="${ok ? 'ok' : ''}">${icon(ok ? 'check' : 'x', 14)}${l}<span class="visually-hidden">${ok ? ': atendido' : ': pendente'}</span></li>`).join('')}</ul>`;
}

function authShell(title, subtitle, iconName, body, footer) {
  return `<div class="auth-page">
    <div class="auth-art" aria-hidden="true">${sportArt('basquete', { decorative: true })}<div class="auth-art-caption">${logo()}<p>Tabelas, horários e resultados em um só lugar.</p></div></div>
    <div class="auth-panel"><div class="auth-card">
      <div class="card-icon accent">${icon(iconName, 22)}</div>
      <h1>${esc(title)}</h1>${subtitle ? `<p class="muted">${esc(subtitle)}</p>` : ''}
      ${body}
      ${footer ? `<div class="auth-footer">${footer}</div>` : ''}
    </div></div>
  </div>`;
}

function formState(key, initial) {
  if (!S.forms[key]) S.forms[key] = { values: { ...initial }, errors: {}, message: '', busy: false, done: null };
  return S.forms[key];
}
function formSummary(f) {
  return f.message ? `<div id="form-summary" tabindex="-1">${alertBox('danger', '', esc(f.message), 'alert')}</div>` : '';
}
function focusFirstError(f) {
  requestAnimationFrame(() => {
    const k = Object.keys(f.errors)[0];
    const el = k ? document.querySelector(`[name="${k}"]`) : $('#form-summary');
    if (el) el.focus();
  });
}
function readForm(form) {
  const out = {};
  for (const el of form.elements) {
    if (!el.name) continue;
    out[el.name] = el.type === 'checkbox' ? el.checked : el.value;
  }
  return out;
}

function pageLogin() {
  const f = formState('login', { email: '', password: '' });
  const html = authShell('Entrar', 'Acesse seus campeonatos.', 'log-in', `
    ${formSummary(f)}
    <form id="login-form" class="stack" novalidate>
      ${field({ label: 'E-mail', id: 'login-email', name: 'email', type: 'email', value: f.values.email, error: f.errors.email, required: true, attrs: 'autocomplete="email" inputmode="email"' })}
      ${passwordField({ label: 'Senha', id: 'login-password', name: 'password', value: '', error: f.errors.password, required: true, autocomplete: 'current-password' })}
      <a href="#/recuperar-senha">Esqueci minha senha</a>
      <button type="submit" class="btn btn-primary btn-lg btn-block" ${f.busy ? 'disabled aria-busy="true"' : ''}>${f.busy ? '<span class="spinner" aria-hidden="true"></span>Entrando…' : 'Entrar'}</button>
    </form>`, '<p>Ainda não tem conta? <a href="#/cadastro">Criar conta</a></p>');
  function mount() {
    $('#login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const v = readForm(e.target);
      f.values.email = v.email;
      f.errors = {};
      if (!EMAIL_RE.test(v.email.trim())) f.errors.email = 'Informe um e-mail válido, como nome@escola.com.br.';
      if (!v.password) f.errors.password = 'Informe sua senha.';
      if (Object.keys(f.errors).length) { f.message = 'Corrija os campos destacados.'; rerenderPage(); focusFirstError(f); return; }
      f.busy = true; f.message = ''; rerenderPage();
      try {
        S.user = await Auth.login({ email: v.email, password: v.password });
        delete S.forms.login;
        notify(`Bem-vindo(a), ${S.user.name.split(' ')[0]}!`);
        go(S.redirectAfterLogin || '/painel');
        S.redirectAfterLogin = null;
      } catch (err) {
        f.busy = false; f.errors = err.fields || {}; f.message = err.message; rerenderPage(); focusFirstError(f);
      }
    });
  }
  return { title: 'Entrar', html, mount };
}

function pageRegister() {
  const f = formState('register', { name: '', email: '', terms: false });
  const html = authShell('Criar conta', 'Gratuito. Leva menos de um minuto.', 'user-plus', `
    ${formSummary(f)}
    <form id="register-form" class="stack" novalidate>
      ${field({ label: 'Nome completo', id: 'reg-name', name: 'name', value: f.values.name, error: f.errors.name, required: true, attrs: 'autocomplete="name"' })}
      ${field({ label: 'E-mail', id: 'reg-email', name: 'email', type: 'email', value: f.values.email, error: f.errors.email, required: true, attrs: 'autocomplete="email" inputmode="email"' })}
      ${passwordField({ label: 'Senha', id: 'reg-password', name: 'password', error: f.errors.password, required: true, autocomplete: 'new-password' })}
      ${passwordChecklist('')}
      ${passwordField({ label: 'Confirme a senha', id: 'reg-confirm', name: 'confirm', error: f.errors.confirm, required: true, autocomplete: 'new-password' })}
      <div class="field">
        <label class="checkbox"><input name="terms" type="checkbox" ${f.values.terms ? 'checked' : ''} ${f.errors.terms ? 'aria-invalid="true" aria-describedby="terms-err"' : ''}><span>Entendi que meus dados ficam salvos neste navegador e são usados apenas para acessar o ArenaManager.</span></label>
        ${f.errors.terms ? `<span class="field-error" id="terms-err">${esc(f.errors.terms)}</span>` : ''}
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block" ${f.busy ? 'disabled aria-busy="true"' : ''}>${f.busy ? '<span class="spinner" aria-hidden="true"></span>Criando conta…' : 'Criar conta'}</button>
    </form>`, '<p>Já tem conta? <a href="#/entrar">Entrar</a></p>');
  function mount() {
    const form = $('#register-form');
    form.password.addEventListener('input', () => { $('#pw-checklist').outerHTML = passwordChecklist(form.password.value); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const v = readForm(form);
      Object.assign(f.values, { name: v.name, email: v.email, terms: v.terms });
      f.errors = {};
      if (v.name.trim().length < 2) f.errors.name = 'Informe seu nome (mínimo 2 caracteres).';
      if (!EMAIL_RE.test(v.email.trim())) f.errors.email = 'Informe um e-mail válido, como nome@escola.com.br.';
      const pp = passwordProblems(v.password);
      if (pp.length) f.errors.password = `A senha precisa ${pp.join(', ')}.`;
      if (v.confirm !== v.password) f.errors.confirm = 'As senhas não são iguais.';
      if (!v.terms) f.errors.terms = 'Confirme que leu como seus dados são usados.';
      if (Object.keys(f.errors).length) { f.message = `Corrija ${Object.keys(f.errors).length} campo(s) destacado(s).`; rerenderPage(); focusFirstError(f); return; }
      f.busy = true; f.message = ''; rerenderPage();
      try {
        S.user = await Auth.register({ name: v.name, email: v.email, password: v.password });
        delete S.forms.register;
        notify('Conta criada! Vamos montar seu primeiro campeonato.');
        go('/painel');
      } catch (err) {
        f.busy = false; f.errors = err.fields || {}; f.message = err.message; rerenderPage(); focusFirstError(f);
      }
    });
  }
  return { title: 'Criar conta', html, mount };
}

function pageForgot() {
  const f = formState('forgot', { email: '' });
  const body = f.done !== null
    ? `<div class="stack" role="status">
        ${alertBox('success', 'Pedido recebido', '<p>Se o e-mail estiver cadastrado neste navegador, o link de redefinição aparece abaixo.</p>')}
        ${f.done ? alertBox('info', 'Link de redefinição', `<p>Este site não tem servidor de e-mail: como as contas ficam neste navegador, o link é mostrado aqui mesmo. Ele vale por 30 minutos.</p><a class="btn btn-sm" href="#/redefinir-senha?token=${esc(f.done)}">${icon('mail-check')}Abrir link de redefinição</a>`) : ''}
      </div>`
    : `${formSummary(f)}<form id="forgot-form" class="stack" novalidate>
        ${field({ label: 'E-mail', id: 'forgot-email', name: 'email', type: 'email', value: f.values.email, error: f.errors.email, required: true, attrs: 'autocomplete="email"' })}
        <button type="submit" class="btn btn-primary btn-lg btn-block">Enviar link</button></form>`;
  const html = authShell('Recuperar senha', 'Informe o e-mail da sua conta para redefinir a senha.', 'key-round', body, '<p><a href="#/entrar">Voltar para o login</a></p>');
  function mount() {
    const form = $('#forgot-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      f.values.email = form.email.value;
      try {
        f.done = Auth.forgot(form.email.value) || '';
        f.errors = {}; f.message = '';
      } catch (err) { f.errors = err.fields || {}; f.message = err.message; }
      rerenderPage();
      if (f.message) focusFirstError(f);
    });
  }
  return { title: 'Recuperar senha', html, mount, onLeave: () => { delete S.forms.forgot; } };
}

function pageReset() {
  const f = formState('reset', {});
  const token = S.query.get('token') || '';
  if (!token && !f.message) f.message = 'Link incompleto. Peça um novo link de recuperação.';
  const html = authShell('Nova senha', 'Escolha uma senha nova para sua conta.', 'key-round', `
    ${formSummary(f)}
    <form id="reset-form" class="stack" novalidate>
      ${passwordField({ label: 'Nova senha', id: 'reset-password', name: 'password', error: f.errors.password, required: true, autocomplete: 'new-password' })}
      ${passwordChecklist('')}
      ${passwordField({ label: 'Confirme a nova senha', id: 'reset-confirm', name: 'confirm', error: f.errors.confirm, required: true, autocomplete: 'new-password' })}
      <button type="submit" class="btn btn-primary btn-lg btn-block" ${token ? '' : 'disabled'}>Salvar nova senha</button>
    </form>`, '<p><a href="#/recuperar-senha">Pedir novo link</a></p>');
  function mount() {
    const form = $('#reset-form');
    form.password.addEventListener('input', () => { $('#pw-checklist').outerHTML = passwordChecklist(form.password.value); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      f.errors = {};
      const pp = passwordProblems(form.password.value);
      if (pp.length) f.errors.password = `A senha precisa ${pp.join(', ')}.`;
      if (form.confirm.value !== form.password.value) f.errors.confirm = 'As senhas não são iguais.';
      if (Object.keys(f.errors).length) { f.message = 'Corrija os campos destacados.'; rerenderPage(); focusFirstError(f); return; }
      try {
        await Auth.reset(token, form.password.value);
        delete S.forms.reset;
        notify('Senha alterada. Entre com a nova senha.');
        go('/entrar');
      } catch (err) { f.errors = err.fields || {}; f.message = err.message; rerenderPage(); focusFirstError(f); }
    });
  }
  return { title: 'Redefinir senha', html, mount, onLeave: () => { delete S.forms.reset; } };
}

/* ======================================================================
 * PAINEL
 * ====================================================================== */
function relativeTime(iso) {
  const diff = (Date.now() - Date.parse(iso)) / 1000;
  if (diff < 60) return 'agora mesmo';
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
  return new Date(iso).toLocaleDateString('pt-BR');
}

function championshipsWithState() {
  return Repo.list(S.user.id).map((c) => ({ c, st: resolveChampionship(c) }));
}

function saveChampionship(ch, activity) {
  const res = Repo.save(S.user.id, ch);
  if (activity) Repo.log(S.user.id, { ...activity, championshipId: res.championship.id });
  if (!res.ok) notify(res.error, { type: 'error' });
  return res;
}

function loadDemoChampionship() {
  const ch = demoChampionship();
  saveChampionship(ch, { type: 'created', text: `Campeonato de exemplo “${ch.name}” criado` });
  notify('Campeonato de exemplo criado com alguns resultados já lançados.');
  go(`/campeonatos/${ch.id}`);
}

function pageDashboard() {
  const items = championshipsWithState();
  const acts = Repo.activities(S.user.id);
  const all = items.flatMap(({ c, st }) => st.matches.map((m) => ({ m, c, st })));
  const upcoming = all.filter(({ m }) => m.date && ['scheduled', 'in_progress', 'waiting'].includes(m.status))
    .sort((a, b) => absoluteMinutes(a.m.date, a.m.start) - absoluteMinutes(b.m.date, b.m.start));
  const kpis = [
    ['Campeonatos criados', items.length, 'trophy'],
    ['Em andamento', items.filter((i) => i.st.status === 'in_progress').length, 'circle-play'],
    ['Próximos jogos', upcoming.length, 'calendar-clock'],
    ['Jogos finalizados', all.filter(({ m }) => m.status === 'finished').length, 'circle-check'],
    ['Equipes cadastradas', items.reduce((s, i) => s + i.c.teams.length, 0), 'users'],
  ];
  const chartRows = items.map(({ c, st }) => {
    const done = st.matches.filter((m) => m.status === 'finished').length;
    const pending = st.matches.filter((m) => !['finished', 'not_needed'].includes(m.status)).length;
    return { name: c.name, done, pending };
  });
  const maxTotal = Math.max(1, ...chartRows.map((r) => r.done + r.pending));

  const content = items.length === 0
    ? emptyState('trophy', 'Nenhum campeonato ainda', 'Comece do zero com o montador em 5 etapas ou carregue um exemplo pronto para explorar as funcionalidades.',
      `<div class="row" style="justify-content:center"><a href="#/campeonatos/novo" class="btn btn-primary">${icon('plus')}Criar meu primeiro campeonato</a><button type="button" class="btn" data-action="load-demo">${icon('sparkles')}Carregar campeonato de exemplo</button></div>`)
    : `<div class="dash-grid">
        <section class="card" aria-labelledby="next-title">
          <div class="card-header"><h2 id="next-title" class="card-title">Próximos jogos</h2><a href="#/campeonatos" class="btn btn-sm btn-ghost">Ver campeonatos ${icon('arrow-right')}</a></div>
          ${upcoming.length === 0 ? '<p class="muted">Nenhum jogo agendado pela frente.</p>' : `<ol class="list-plain next-games">${upcoming.slice(0, 6).map(({ m, c, st }) => {
    const ctx = { teamName: st.teamName, byId: st.byId, groups: c.groups };
    return `<li><a href="#/campeonatos/${c.id}?aba=resultados" class="next-game">
              <span class="next-game-when"><strong>${toHHMM(m.start)}</strong><span>${weekdayShort(m.date)} ${formatDateBR(m.date).slice(0, 5)}</span></span>
              <span class="next-game-body"><span class="next-game-teams">${esc(participantLabel(m.home, m.homeTeamId, ctx))} <em>×</em> ${esc(participantLabel(m.away, m.awayTeamId, ctx))}</span><span class="muted">${esc(c.name)} · ${esc(m.phase)} · Quadra ${m.court}</span></span>
              ${statusBadge(m.status)}</a></li>`;
  }).join('')}</ol>`}
        </section>
        <section class="card" aria-labelledby="chart-title">
          <h2 id="chart-title" class="card-title" style="margin-bottom:var(--sp-3)">Andamento por campeonato</h2>
          <div class="bar-chart" role="img" aria-label="${esc(chartRows.map((r) => `${r.name}: ${r.done} jogos finalizados e ${r.pending} pendentes`).join('. '))}">
            ${chartRows.map((r) => `<div class="bar-row"><span class="bar-label" title="${esc(r.name)}">${esc(r.name)}</span><span class="bar-track"><span class="bar-done" style="width:${(r.done / maxTotal) * 100}%"></span><span class="bar-pending" style="width:${(r.pending / maxTotal) * 100}%"></span></span><span class="bar-value tabular">${r.done}/${r.done + r.pending}</span></div>`).join('')}
          </div>
          <div class="chart-legend" aria-hidden="true"><span><i style="background:var(--c-primary)"></i>Finalizados</span><span><i style="background:var(--c-accent)"></i>Pendentes</span></div>
        </section>
        <section class="card" aria-labelledby="mine-title">
          <div class="card-header"><h2 id="mine-title" class="card-title">Seus campeonatos</h2><a href="#/campeonatos" class="btn btn-sm btn-ghost">Todos ${icon('arrow-right')}</a></div>
          <ul class="list-plain mini-champs">${items.slice(0, 5).map(({ c, st }) => `<li><a href="#/campeonatos/${c.id}"><span><strong>${esc(c.name)}</strong><span class="muted">${icon('map-pin', 13)}${esc(getSport(c.sport).name)} · ${c.teams.length} equipes</span></span><span class="mini-champs-right">${champBadge(st.status)}<span style="width:90px">${progressBar(st.progress.finished, st.progress.total, `Andamento de ${c.name}`)}</span></span></a></li>`).join('')}</ul>
        </section>
        <section class="card" aria-labelledby="activity-title">
          <h2 id="activity-title" class="card-title" style="margin-bottom:var(--sp-3)">${icon('activity', 20, 'inline-icon')}Atividades recentes</h2>
          ${acts.length === 0 ? '<p class="muted">Nenhuma atividade registrada.</p>' : `<ol class="list-plain activity">${acts.slice(0, 7).map((a) => `<li><span class="activity-dot act-${esc(a.type)}" aria-hidden="true"></span><span>${esc(a.text)}</span><time datetime="${esc(a.at)}" class="muted">${relativeTime(a.at)}</time></li>`).join('')}</ol>`}
          <button type="button" class="btn btn-sm" data-action="load-demo" style="margin-top:var(--sp-3)">${icon('sparkles')}Adicionar campeonato de exemplo</button>
        </section>
      </div>`;

  const html = `${pageHeader('Painel de controle', `Olá, ${S.user.name.split(' ')[0]}`, 'Acompanhe seus campeonatos, os próximos jogos e as últimas atividades.', `<a href="#/campeonatos/novo" class="btn btn-primary">${icon('plus')}Criar campeonato</a>`)}
    <div class="container page-body stack">
      <section aria-labelledby="kpi-title"><h2 id="kpi-title" class="visually-hidden">Resumo</h2>
        <div class="grid-4 kpis">${kpis.map(([l, v, ic]) => `<div class="card kpi"><div class="card-icon kpi-icon">${icon(ic, 22)}</div><span class="kpi-value">${v}</span><span class="kpi-label">${l}</span></div>`).join('')}</div>
      </section>
      ${content}
    </div>`;
  return { title: 'Painel', html, mount: (root) => $$('[data-action="load-demo"]', root).forEach((b) => b.addEventListener('click', loadDemoChampionship)) };
}

/* ======================================================================
 * LISTA DE CAMPEONATOS
 * ====================================================================== */
function pageChampionships() {
  const L = S.list;
  const items = championshipsWithState();
  const listHtml = () => {
    const term = normalize(L.q.trim());
    const filtered = items
      .filter(({ c, st }) => (L.status === 'all' || st.status === L.status) && (L.sport === 'all' || c.sport === L.sport)
        && (!term || normalize(`${c.name} ${c.venue} ${c.teams.map((t) => t.name).join(' ')}`).includes(term)))
      .sort((a, b) => (L.sort === 'name' ? a.c.name.localeCompare(b.c.name, 'pt-BR') : L.sort === 'date' ? a.c.startDate.localeCompare(b.c.startDate) : (b.c.updatedAt || '').localeCompare(a.c.updatedAt || '')));
    const count = `<p class="muted results-count" aria-live="polite">${filtered.length} de ${items.length} campeonato(s)</p>`;
    if (!items.length) return count + emptyState('trophy', 'Você ainda não criou campeonatos', 'O montador automático organiza equipes, quadras e horários para você.', `<a href="#/campeonatos/novo" class="btn btn-primary">${icon('plus')}Criar campeonato</a>`);
    if (!filtered.length) return count + emptyState('search-x', 'Nada encontrado', 'Nenhum campeonato corresponde aos filtros atuais.', '<button type="button" class="btn" data-action="clear-filters">Limpar filtros</button>');
    return `${count}<ul class="champ-grid list-plain">${filtered.map(({ c, st }) => `<li><article class="card champ-card card-interactive" aria-labelledby="ch-${c.id}">
        <div class="champ-card-art">${sportArt(c.sport, { decorative: true })}</div>
        <div class="champ-card-body">
          <div class="spread"><span class="badge badge-neutral no-dot">${esc(getSport(c.sport).name)}</span>${champBadge(st.status)}</div>
          <h2 id="ch-${c.id}" class="champ-card-title">${esc(c.name)}</h2>
          <ul class="list-plain champ-meta"><li>${icon('calendar-days', 16)}${formatDateBR(c.startDate)}${c.endDate !== c.startDate ? ` a ${formatDateBR(c.endDate)}` : ''}</li><li>${icon('users', 16)}${c.teams.length} equipes · ${esc(getFormat(c.format).short)}</li></ul>
          ${progressBar(st.progress.finished, st.progress.total, 'Jogos finalizados')}
          <p class="muted champ-progress">${st.progress.finished} de ${st.progress.total} jogos finalizados</p>
          <div class="row champ-actions">
            <a href="#/campeonatos/${c.id}" class="btn btn-primary btn-sm">${icon('eye')}Visualizar<span class="visually-hidden"> ${esc(c.name)}</span></a>
            <a href="#/campeonatos/${c.id}/editar" class="btn btn-sm">${icon('pencil')}Editar<span class="visually-hidden"> ${esc(c.name)}</span></a>
            <button type="button" class="btn btn-ghost btn-sm btn-icon" data-delete="${c.id}" aria-label="Excluir ${esc(c.name)}">${icon('trash-2')}</button>
          </div>
        </div></article></li>`).join('')}</ul>`;
  };
  const html = `${pageHeader('Gestão', 'Campeonatos', 'Todos os campeonatos que você criou. Use a busca e os filtros para encontrar rápido.', `<a href="#/campeonatos/novo" class="btn btn-primary">${icon('plus')}Criar campeonato</a>`)}
    <div class="container page-body">
      <div class="toolbar card card-tight" role="search" aria-label="Filtrar campeonatos">
        ${searchBox({ id: 'list-q', value: L.q, label: 'Buscar campeonato, local ou equipe', placeholder: 'Buscar por nome, local ou equipe' })}
        <div class="toolbar-filters">
          <label class="visually-hidden" for="list-sport">Modalidade</label>
          <select id="list-sport" class="select" data-filter="sport"><option value="all">Todas as modalidades</option>${SPORTS.map((s) => `<option value="${s.id}" ${L.sport === s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select>
          <label class="visually-hidden" for="list-sort">Ordenar por</label>
          <select id="list-sort" class="select" data-filter="sort">${[['recent', 'Mais recentes'], ['date', 'Data de início'], ['name', 'Nome (A–Z)']].map(([v, l]) => `<option value="${v}" ${L.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select>
        </div>
        <div class="segmented" role="group" aria-label="Filtrar por status">${[['all', 'Todos'], ...Object.entries(CHAMP_STATUS).map(([k, v]) => [k, v.label])].map(([k, l]) => `<button type="button" data-status="${k}" aria-pressed="${L.status === k}">${l}</button>`).join('')}</div>
      </div>
      <div id="list-results">${listHtml()}</div>
    </div>`;
  function mount(root) {
    const refresh = () => { $('#list-results').innerHTML = listHtml(); };
    $('#list-q').addEventListener('input', (e) => { L.q = e.target.value; refresh(); });
    $$('[data-filter]', root).forEach((s) => s.addEventListener('change', () => { L[s.dataset.filter] = s.value; refresh(); }));
    $$('[data-status]', root).forEach((b) => b.addEventListener('click', () => {
      L.status = b.dataset.status;
      $$('[data-status]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      refresh();
    }));
    root.addEventListener('click', async (e) => {
      const del = e.target.closest('[data-delete]');
      if (e.target.closest('[data-action="clear-filters"]')) { Object.assign(L, { q: '', status: 'all', sport: 'all' }); rerenderPage(); return; }
      if (!del) return;
      const c = Repo.get(S.user.id, del.dataset.delete);
      const ok = await confirmAction({ title: 'Excluir campeonato?', message: `“${c.name}” e todos os seus ${c.matches.length} jogos e resultados serão apagados. Esta ação não pode ser desfeita.`, confirmLabel: 'Excluir campeonato' });
      if (!ok) return;
      Repo.remove(S.user.id, c.id);
      Repo.log(S.user.id, { type: 'deleted', text: `Campeonato “${c.name}” excluído` });
      notify(`“${c.name}” foi excluído.`);
      rerenderPage();
    });
  }
  return { title: 'Campeonatos', html, mount };
}

/* ======================================================================
 * MONTADOR DE CAMPEONATOS (5 etapas)
 * ====================================================================== */
const STEPS = ['Informações gerais', 'Equipes', 'Configuração dos jogos', 'Formato', 'Gerar campeonato'];

function getPath(obj, path) { return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj); }
function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  keys.slice(0, -1).forEach((k) => { if (o[k] == null) o[k] = {}; o = o[k]; });
  o[keys[keys.length - 1]] = value;
}

function emptyTeamForm(w) {
  return { id: null, name: '', responsible: '', category: w.draft.category, color: TEAM_COLORS[w.draft.teams.length % TEAM_COLORS.length], logo: null };
}

function initWizard(editingId) {
  let draft;
  let recovered = false;
  if (editingId) {
    const ex = Repo.get(S.user.id, editingId);
    if (!ex) return null;
    const { matches, groups, generatedAt, updatedAt, ...rest } = clone(ex); // eslint-disable-line no-unused-vars
    draft = { ...emptyDraft(), ...rest };
  } else {
    const saved = Repo.draft(S.user.id);
    if (saved && saved.savedAt) { draft = saved; recovered = true; } else draft = emptyDraft();
  }
  const w = { editingId, draft, step: 0, maxStep: editingId ? 4 : 0, errors: {}, plan: null, recovered, dirty: false, teamErrors: {}, logoError: '', generating: false };
  w.teamForm = emptyTeamForm(w);
  return w;
}

function markDirty(w) {
  w.dirty = true;
  w.plan = null;
  if (!w.editingId) {
    clearTimeout(w.saveTimer);
    w.saveTimer = setTimeout(() => Repo.saveDraft(S.user.id, w.draft), 300);
  }
}

/* ---------- Etapa 1 ---------- */
function stepGeneralHtml(w) {
  const d = w.draft; const e = w.errors;
  const days = listDates(d.startDate, d.endDate).length;
  const venue = getSport(d.sport).venueLabel;
  const venuePlural = venue === 'campo' ? 'campos' : venue === 'mesa' ? 'mesas' : 'quadras';
  return `<div class="form-grid">
    ${field({ label: 'Nome do campeonato', id: 'w-name', name: 'name', value: d.name, error: e.name, required: true, cls: 'span-2', attrs: 'data-bind="name" maxlength="80" placeholder="Ex.: Copa Interclasses de Vôlei 2026"' })}
    ${field({ label: 'Modalidade esportiva', id: 'w-sport', name: 'sport', kind: 'select', value: d.sport, error: e.sport, required: true, options: SPORTS.map((s) => ({ value: s.id, label: s.name })), attrs: 'data-special="sport"' })}
    ${field({ label: 'Local da competição', id: 'w-venue', name: 'venue', value: d.venue, error: e.venue, required: true, attrs: 'data-bind="venue" autocomplete="off" placeholder="Ex.: Ginásio Municipal"' })}
    ${field({ label: 'Data de início', id: 'w-startDate', name: 'startDate', type: 'date', value: d.startDate, error: e.startDate, required: true, attrs: 'data-bind="startDate" data-rerender' })}
    ${field({ label: 'Data de término', id: 'w-endDate', name: 'endDate', type: 'date', value: d.endDate, error: e.endDate, required: true, hint: days ? `${plural(days, 'dia', 'dias')} de competição` : '', attrs: `data-bind="endDate" data-rerender min="${esc(d.startDate)}"` })}
    ${field({ label: 'Horário de início dos jogos', id: 'w-dayStart', name: 'dayStart', type: 'time', value: d.dayStart, error: e.dayStart, required: true, attrs: 'data-bind="dayStart" step="300"' })}
    ${field({ label: 'Horário limite de encerramento', id: 'w-dayEnd', name: 'dayEnd', type: 'time', value: d.dayEnd, error: e.dayEnd, required: true, hint: 'Nenhum jogo termina depois deste horário.', attrs: 'data-bind="dayEnd" step="300"' })}
    ${field({ label: `Quantidade de ${venuePlural} disponíveis`, id: 'w-courts', name: 'courts', type: 'number', value: d.courts, error: e.courts, required: true, attrs: 'data-special="courts" min="1" max="30"' })}
    ${field({ label: 'Número de equipes participantes', id: 'w-expectedTeams', name: 'expectedTeams', type: 'number', value: d.expectedTeams, error: e.expectedTeams, required: true, hint: 'Você cadastra cada equipe na próxima etapa.', attrs: 'data-bind="expectedTeams" min="2" max="64"' })}
    <fieldset class="span-2"><legend>Categoria <span class="req" aria-hidden="true" style="color:var(--c-danger)">*</span></legend>
      <div class="row" role="radiogroup" aria-label="Categoria">${CATEGORIES.map((c) => `<label class="option-card option-inline"><input type="radio" name="category" value="${c.id}" ${d.category === c.id ? 'checked' : ''} data-bind="category"><span class="option-card-title">${c.label}</span></label>`).join('')}</div>
      ${e.category ? `<span class="field-error">${esc(e.category)}</span>` : ''}
    </fieldset>
    ${field({ label: 'Faixa etária', id: 'w-ageGroup', name: 'ageGroup', value: d.ageGroup, error: e.ageGroup, required: true, hint: 'Ex.: Sub-15, 14 a 18 anos, Adulto, Livre.', attrs: 'data-bind="ageGroup" list="age-groups"' })}
    <datalist id="age-groups">${['Livre', 'Sub-11', 'Sub-13', 'Sub-15', 'Sub-17', 'Sub-19', 'Adulto', 'Master (35+)', '14 a 18 anos'].map((a) => `<option value="${a}"></option>`).join('')}</datalist>
  </div>`;
}

/* ---------- Etapa 2 ---------- */
function stepTeamsHtml(w) {
  const d = w.draft; const f = w.teamForm; const te = w.teamErrors;
  const missing = Math.max(0, d.expectedTeams - d.teams.length);
  const editing = !!f.id;
  return `<div class="teams-step">
    <form class="card team-form" id="team-form" novalidate aria-labelledby="team-form-title">
      <h3 id="team-form-title">${editing ? 'Editar equipe' : 'Adicionar equipe'}</h3>
      <div class="stack">
        ${field({ label: 'Nome do time', id: 'team-name', name: 'team-name', value: f.name, error: te.name, required: true, attrs: 'data-team="name" maxlength="40" autocomplete="off"' })}
        ${field({ label: 'Nome do responsável', id: 'team-responsible', name: 'team-responsible', value: f.responsible, error: te.responsible, required: true, attrs: 'data-team="responsible" maxlength="60" autocomplete="off"' })}
        ${field({ label: 'Categoria', id: 'team-category', name: 'team-category', kind: 'select', value: f.category, error: te.category, required: true, options: CATEGORIES.map((c) => ({ value: c.id, label: c.label })), attrs: 'data-team="category"' })}
        <fieldset><legend class="field-label">Cor de identificação</legend>
          <div class="color-swatches" role="radiogroup" aria-label="Cores sugeridas">
            ${TEAM_COLORS.map((c) => `<button type="button" role="radio" aria-checked="${f.color.toLowerCase() === c.toLowerCase()}" aria-label="Cor ${c}" class="swatch" style="background:${c}" data-color="${c}"></button>`).join('')}
            <label class="swatch-custom"><span class="visually-hidden">Escolher outra cor</span><input type="color" class="input-color" value="${esc(f.color)}" data-team="color" data-rerender-team></label>
          </div>
        </fieldset>
        <div class="field">
          <span class="field-label">Logo ou imagem (opcional)</span>
          <div class="row">
            <span class="team-avatar lg" style="background:${esc(f.color)}" aria-hidden="true">${f.logo ? `<img src="${esc(f.logo)}" alt="">` : esc((f.name.trim()[0] || '?').toUpperCase())}</span>
            <input type="file" accept="image/*" class="visually-hidden" id="team-logo" aria-describedby="logo-hint">
            <label for="team-logo" class="btn btn-sm">${icon('upload')}Escolher imagem</label>
            ${f.logo ? `<button type="button" class="btn btn-sm btn-ghost" data-action="logo-remove">${icon('x')}Remover</button>` : ''}
          </div>
          <span class="field-hint" id="logo-hint">PNG, JPG, SVG ou WebP até 3 MB. A imagem é reduzida para 128 px.</span>
          ${w.logoError ? `<span class="field-error" role="alert">${esc(w.logoError)}</span>` : ''}
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary">${editing ? `${icon('pencil')}Salvar alterações` : `${icon('plus')}Adicionar equipe`}</button>
          ${editing ? '<button type="button" class="btn" data-action="team-cancel">Cancelar edição</button>' : ''}
        </div>
      </div>
    </form>
    <section aria-labelledby="team-list-title" class="team-list-area">
      <div class="spread">
        <h3 id="team-list-title" style="margin:0">Equipes cadastradas <span class="badge badge-neutral no-dot">${d.teams.length} de ${d.expectedTeams}</span></h3>
        ${missing > 0 ? `<button type="button" class="btn btn-sm" data-action="team-autofill">${icon('wand-sparkles')}Completar com ${missing} equipes provisórias</button>` : ''}
      </div>
      <div style="margin:var(--sp-3) 0">${progressBar(Math.min(d.teams.length, d.expectedTeams), d.expectedTeams, 'Equipes cadastradas')}</div>
      ${w.errors.teams ? alertBox('danger', '', esc(w.errors.teams), 'alert') : ''}
      ${d.teams.length > 0 && d.teams.length !== Number(d.expectedTeams) ? alertBox('info', '', `Você informou ${d.expectedTeams} equipes na etapa 1 e cadastrou ${d.teams.length}. <button type="button" class="btn btn-sm" data-action="use-team-count">Usar ${d.teams.length} equipes</button>`) : ''}
      ${d.teams.length === 0 ? `<div class="empty" style="padding:var(--sp-6)">${icon('users', 48, 'empty-icon')}<p>Nenhuma equipe ainda. Use o formulário ou complete com equipes provisórias.</p></div>`
    : `<ul class="team-cards list-plain">${d.teams.map((t, i) => `<li class="team-card" style="--team:${esc(t.color)}">
          <span class="team-avatar" style="background:${esc(t.color)}" aria-hidden="true">${t.logo ? `<img src="${esc(t.logo)}" alt="">` : esc(t.name[0].toUpperCase())}</span>
          <div class="team-card-body"><strong>${esc(t.name)}</strong><span class="muted">${esc(t.responsible)} · ${esc(CATEGORIES.find((c) => c.id === t.category)?.label ?? '')}</span></div>
          <span class="team-seed" title="Ordem de cadastro (cabeça de chave)">#${i + 1}</span>
          <div class="team-card-actions">
            <button type="button" class="btn btn-ghost btn-icon btn-sm" data-team-edit="${t.id}" aria-label="Editar ${esc(t.name)}">${icon('pencil')}</button>
            <button type="button" class="btn btn-ghost btn-icon btn-sm" data-team-delete="${t.id}" aria-label="Excluir ${esc(t.name)}">${icon('trash-2')}</button>
          </div></li>`).join('')}</ul>`}
      ${d.teams.length > 1 ? `<p class="field-hint" style="margin-top:var(--sp-3)">A ordem de cadastro define os cabeças de chave nos formatos eliminatórios e a distribuição nos grupos. <button type="button" class="btn btn-sm btn-ghost" data-action="team-shuffle">${icon('shuffle')}Sortear ordem</button></p>` : ''}
    </section>
  </div>`;
}

function readLogo(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) { reject(new Error('Escolha um arquivo de imagem (PNG, JPG, SVG ou WebP).')); return; }
    if (file.size > 3 * 1024 * 1024) { reject(new Error('A imagem pode ter no máximo 3 MB.')); return; }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const scale = Math.max(size / img.width, size / img.height);
        const wd = img.width * scale; const ht = img.height * scale;
        canvas.getContext('2d').drawImage(img, (size - wd) / 2, (size - ht) / 2, wd, ht);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('Imagem inválida.'));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Etapa 3 ---------- */
function capacityHtml(w) {
  let cap = null;
  try { cap = capacityOf(toPlanInput(w.draft).schedule); } catch { cap = null; }
  const d = w.draft;
  if (!cap) return '<p class="muted">Preencha as etapas anteriores.</p>';
  return `<div class="stat-inline">
      <div><strong class="tabular">${cap.slotsPerDay}</strong><span>horários por quadra/dia</span></div>
      <div><strong class="tabular">${cap.perDay}</strong><span>jogos por dia</span></div>
      <div><strong class="tabular">${cap.total}</strong><span>jogos no total</span></div>
    </div>
    <p class="muted" style="margin-top:var(--sp-3)">Cada horário ocupa ${esc(d.settings.matchDuration)} min de jogo + ${esc(d.settings.interval)} min de intervalo, das ${esc(d.dayStart)} às ${esc(d.dayEnd)}, em ${plural(cap.days, 'dia', 'dias')}${d.settings.breaks.length ? `, descontando ${d.settings.breaks.length} descanso(s)` : ''}.</p>`;
}

function stepGamesHtml(w) {
  const d = w.draft; const e = w.errors; const s = d.settings;
  const sport = getSport(d.sport);
  const scoring = { ...sport.scoring, ...d.scoringOverrides };
  const points = d.pointsConfig || sport.standingsPoints;
  const table = getDurationTable(Prefs.data.durations);
  return `<div class="stack">
    <div class="games-grid">
      <section class="card" aria-labelledby="times-title">
        <h3 id="times-title">${icon('clock-3', 20, 'inline-icon')}Tempos</h3>
        <div class="form-grid">
          ${field({ label: `Duração estimada da partida (${sport.name})`, id: 'w-matchDuration', name: 'matchDuration', type: 'number', value: s.matchDuration, error: e.matchDuration, required: true, hint: `Sugestão do sistema: ${sport.defaultDuration} min. Não é regra oficial.`, attrs: 'data-bind="settings.matchDuration" min="5" max="300" step="5"' })}
          ${field({ label: 'Intervalo entre partidas (min)', id: 'w-interval', name: 'interval', type: 'number', value: s.interval, error: e.interval, hint: 'Tempo operacional entre um jogo e o próximo na mesma quadra. Não faz parte da partida.', attrs: 'data-bind="settings.interval" min="0" max="240" step="5"' })}
          ${field({ label: 'Tempo de preparação das equipes (min)', id: 'w-prepTime', name: 'prepTime', type: 'number', value: s.prepTime, error: e.prepTime, hint: 'Descanso mínimo de uma equipe entre dois jogos seus.', attrs: 'data-bind="settings.prepTime" min="0" max="240" step="5"' })}
          ${field({ label: 'Tempo de troca de quadra (min)', id: 'w-courtChangeTime', name: 'courtChangeTime', type: 'number', value: s.courtChangeTime, error: e.courtChangeTime, hint: 'Somado ao descanso quando a equipe joga em outra quadra.', attrs: 'data-bind="settings.courtChangeTime" min="0" max="120" step="5"' })}
          ${field({ label: 'Duração máxima de cada rodada (min)', id: 'w-maxRoundDuration', name: 'maxRoundDuration', type: 'number', value: s.maxRoundDuration, error: e.maxRoundDuration, hint: '0 = sem limite. Se uma rodada passar disso, você recebe um aviso.', attrs: 'data-bind="settings.maxRoundDuration" min="0" max="1440" step="15"' })}
          ${field({ label: 'Jogos simultâneos', id: 'w-maxSimultaneous', name: 'maxSimultaneous', type: 'number', value: s.maxSimultaneous, error: e.maxSimultaneous, hint: `Máximo: ${d.courts} (número de quadras).`, attrs: `data-bind="settings.maxSimultaneous" min="1" max="${esc(d.courts)}"` })}
        </div>
      </section>
      <aside class="card capacity-card" aria-labelledby="cap-title"><h3 id="cap-title">Capacidade calculada</h3><div id="live-capacity" aria-live="polite">${capacityHtml(w)}</div></aside>
    </div>

    <section class="card" aria-labelledby="breaks-title">
      <div class="spread"><h3 id="breaks-title" style="margin:0">${icon('coffee', 20, 'inline-icon')}Horários de descanso</h3><button type="button" class="btn btn-sm" data-action="add-break">${icon('plus')}Adicionar descanso</button></div>
      <p class="muted">Nenhum jogo é marcado nesses períodos, em todos os dias do campeonato.</p>
      ${s.breaks.length === 0 ? '<p class="field-hint">Nenhum descanso configurado.</p>' : `<ul class="list-plain breaks">${s.breaks.map((b, i) => `<li class="break-row">
          ${field({ label: 'Nome', id: `w-break-${i}-label`, value: b.label, attrs: `data-bind="settings.breaks.${i}.label"` })}
          ${field({ label: 'Início', id: `w-break-${i}-start`, type: 'time', value: b.start, attrs: `data-bind="settings.breaks.${i}.start"` })}
          ${field({ label: 'Fim', id: `w-break-${i}-end`, type: 'time', value: b.end, error: e[`break-${i}`], attrs: `data-bind="settings.breaks.${i}.end"` })}
          <button type="button" class="btn btn-ghost btn-icon" data-remove-break="${i}" aria-label="Remover descanso ${esc(b.label || i + 1)}">${icon('trash-2')}</button></li>`).join('')}</ul>`}
    </section>

    <div class="games-grid">
      <section class="card" aria-labelledby="scoring-title">
        <h3 id="scoring-title">Placar e classificação</h3>
        ${scoring.type === 'sets' ? `<div class="form-grid">
            ${field({ label: 'Sets para vencer a partida', id: 'w-setsToWin', name: 'setsToWin', type: 'number', value: scoring.setsToWin, error: e.setsToWin, hint: `Padrão de ${sport.name}: ${sport.scoring.setsToWin} (melhor de ${sport.scoring.setsToWin * 2 - 1}).`, attrs: 'data-bind="scoringOverrides.setsToWin" min="1" max="4"' })}
            ${scoring.tennis ? '' : `${field({ label: 'Pontos por set', id: 'w-pointsPerSet', name: 'pointsPerSet', type: 'number', value: scoring.pointsPerSet, error: e.pointsPerSet, hint: `Padrão: ${sport.scoring.pointsPerSet}.`, attrs: 'data-bind="scoringOverrides.pointsPerSet" min="5" max="50"' })}
              ${field({ label: 'Pontos no set decisivo', id: 'w-decidingSetPoints', type: 'number', value: scoring.decidingSetPoints, hint: `Padrão: ${sport.scoring.decidingSetPoints}.`, attrs: 'data-bind="scoringOverrides.decidingSetPoints" min="5" max="50"' })}`}
          </div>` : `<p class="muted">Placar por ${esc(scoring.unitLabel)}. ${scoring.allowDraw ? `Empates são permitidos na fase de pontos; no mata-mata, o desempate é por ${esc(scoring.tiebreakLabel.toLowerCase())}.` : esc(scoring.noDrawReason)}</p>`}
        <label class="switch" style="margin-top:var(--sp-3)"><input type="checkbox" data-bind="strictScoring" ${d.strictScoring ? 'checked' : ''}>Validar os placares pela regra de pontuação configurada</label>
        <hr class="divider">
        <p class="field-label">Pontos na classificação</p>
        ${points.mode === 'fivb' ? `<p class="muted">${esc(sport.standingsNote)}</p>` : `<div class="form-grid" style="grid-template-columns:repeat(3,1fr)">${[['win', 'Vitória'], ['draw', 'Empate'], ['loss', 'Derrota']].map(([k, l]) => field({ label: l, id: `w-pts-${k}`, type: 'number', value: points[k] ?? 0, attrs: `data-points="${k}" min="0" max="10"` })).join('')}</div><p class="field-hint">${esc(sport.standingsNote)}</p>`}
      </section>
      <section class="card" aria-labelledby="durations-title">
        <div class="spread"><h3 id="durations-title" style="margin:0">Base de duração por modalidade</h3><button type="button" class="btn btn-sm btn-ghost" data-action="reset-durations">${icon('rotate-ccw')}Restaurar padrões</button></div>
        ${alertBox('info', '', 'Estimativas de planejamento do ArenaManager, não regras oficiais. Os valores ficam salvos para os próximos campeonatos.')}
        <div class="table-wrap" style="margin-top:var(--sp-3)"><table class="table">
          <caption class="visually-hidden">Duração média sugerida por modalidade (editável)</caption>
          <thead><tr><th scope="col">Modalidade</th><th scope="col" class="num">Duração (min)</th></tr></thead>
          <tbody>${table.map((t) => `<tr class="${t.id === d.sport ? 'row-highlight' : ''}"><th scope="row" style="font-weight:600">${esc(t.name)}${t.isCustom ? ' <span class="badge badge-suggestion no-dot">personalizado</span>' : ''}</th>
            <td class="num"><label class="visually-hidden" for="dur-${t.id}">Duração de ${esc(t.name)} em minutos</label><input id="dur-${t.id}" type="number" class="input input-compact" min="5" max="300" step="5" value="${t.duration}" data-duration="${t.id}"></td></tr>`).join('')}</tbody>
        </table></div>
      </section>
    </div>
  </div>`;
}

/* ---------- Etapa 4 ---------- */
function formatSummaryHtml(w) {
  const d = w.draft;
  const s = summarizeFormat(d.format, d.teams.length, d.formatOptions);
  if (w.errors.format || (s.errors && s.errors.length)) return alertBox('danger', '', esc(w.errors.format || s.errors.join(' ')), 'alert');
  return `<dl class="dl format-summary">
    <dt>Total de partidas</dt><dd class="tabular">${s.totalMatches}${s.conditionalMatches ? ` (+${s.conditionalMatches} se necessário)` : ''}</dd>
    <dt>Rodadas</dt><dd class="tabular">${s.rounds}</dd>
    <dt>Grupos</dt><dd>${s.groups ? `${s.groups} (${s.groupSizes.join(', ')} equipes)` : '—'}</dd>
    <dt>Classificados</dt><dd>${s.qualified ? `${s.qualified} para o mata-mata` : '—'}</dd>
    <dt>Semifinalistas</dt><dd>${s.semifinalists ?? '—'}</dd>
    <dt>Finalistas</dt><dd>${s.finalists ?? '—'}</dd>
    <dt>Campeão</dt><dd>1 — ${esc(s.championRule.toLowerCase())}</dd>
  </dl>`;
}

function stepFormatHtml(w) {
  const d = w.draft; const o = d.formatOptions; const n = d.teams.length;
  const usesGroups = d.format === 'groups-knockout' || d.format === 'custom-groups';
  const hasKnockout = ['single-elimination', 'groups-knockout'].includes(d.format) || (d.format === 'custom-groups' && o.knockout !== false);
  let customGroups = '';
  if (d.format === 'custom-groups') {
    const groups = o.groups || distributeGroups(d.teams.map((t) => t.id), 2);
    const groupOf = (id) => groups.find((g) => g.teamIds.includes(id))?.id ?? '';
    customGroups = `<div class="card" style="margin-top:var(--sp-4)">
      <div class="spread"><h3 style="margin:0">Monte os grupos</h3>
        <div class="row"><label for="cg-count" class="field-label">Número de grupos</label><input id="cg-count" type="number" class="input input-compact" min="1" max="16" value="${groups.length}" data-action-change="cg-count"><button type="button" class="btn btn-sm" data-action="cg-redistribute">${icon('shuffle')}Redistribuir</button></div></div>
      <div class="custom-groups">${groups.map((g) => `<div class="custom-group"><strong>${esc(g.name)} <span class="badge badge-neutral no-dot">${g.teamIds.length}</span></strong><ul class="list-plain">${g.teamIds.map((id) => `<li>${esc(d.teams.find((t) => t.id === id)?.name ?? '')}</li>`).join('')}</ul></div>`).join('')}</div>
      <div class="table-wrap"><table class="table"><caption class="visually-hidden">Grupo de cada equipe</caption><thead><tr><th scope="col">Equipe</th><th scope="col">Grupo</th></tr></thead><tbody>
        ${d.teams.map((t) => `<tr><th scope="row" style="font-weight:600">${teamName(t)}</th><td><label class="visually-hidden" for="grp-${t.id}">Grupo de ${esc(t.name)}</label>
          <select id="grp-${t.id}" class="select input-compact" style="width:auto" data-assign="${t.id}"><option value="">Sem grupo</option>${groups.map((g, i) => `<option value="${g.id}" ${groupOf(t.id) === g.id ? 'selected' : ''}>Grupo ${groupLetter(i)}</option>`).join('')}</select></td></tr>`).join('')}
      </tbody></table></div></div>`;
  }
  return `<div class="stack">
    <fieldset><legend class="visually-hidden">Formato do campeonato</legend>
      <div class="format-grid">${FORMATS.map((f) => {
    const s = summarizeFormat(f.id, n, f.id === d.format ? o : { groupsCount: Math.max(2, Math.round(n / 4)), advancePerGroup: 2, groups: f.id === 'custom-groups' ? o.groups : null });
    return `<label class="option-card"><input type="radio" name="format" value="${f.id}" ${d.format === f.id ? 'checked' : ''} data-special="format">
          <span class="option-card-title">${esc(f.name)}</span><span class="muted">${esc(f.description)}</span>
          <span class="format-count">${s.errors && s.errors.length ? `<em>Indisponível para ${n} equipes</em>` : `<strong class="tabular">${s.totalMatches}</strong> jogos · ${s.rounds} rodadas`}</span></label>`;
  }).join('')}</div>
    </fieldset>
    <div class="games-grid">
      <section class="card" aria-labelledby="fmt-opts"><h3 id="fmt-opts">Opções do formato</h3><div class="stack">
        ${d.format === 'groups-knockout' ? `<div class="form-grid">
          ${field({ label: 'Número de grupos', id: 'w-groupsCount', name: 'groupsCount', type: 'number', value: o.groupsCount, hint: `As ${n} equipes são distribuídas em serpentina pela ordem de cadastro.`, attrs: 'data-bind="formatOptions.groupsCount" min="1" max="16"' })}
          ${field({ label: 'Equipes que avançam de cada grupo', id: 'w-advance', name: 'advancePerGroup', type: 'number', value: o.advancePerGroup, attrs: 'data-bind="formatOptions.advancePerGroup" min="1" max="8"' })}</div>` : ''}
        ${d.format === 'custom-groups' ? `<label class="switch"><input type="checkbox" data-bind="formatOptions.knockout" data-rerender ${o.knockout !== false ? 'checked' : ''}>Ter mata-mata depois dos grupos</label>
          ${o.knockout !== false ? field({ label: 'Equipes que avançam de cada grupo', id: 'w-advance', name: 'advancePerGroup', type: 'number', value: o.advancePerGroup, attrs: 'data-bind="formatOptions.advancePerGroup" min="1" max="8"' }) : ''}` : ''}
        ${hasKnockout ? `<label class="switch"><input type="checkbox" data-bind="formatOptions.thirdPlace" data-rerender ${o.thirdPlace ? 'checked' : ''}>Disputa de 3º lugar</label>` : ''}
        ${d.format === 'double-elimination' ? `<label class="switch"><input type="checkbox" data-bind="formatOptions.withReset" data-rerender ${o.withReset !== false ? 'checked' : ''}>Jogo extra se o finalista da chave inferior vencer a grande final</label>` : ''}
        ${!usesGroups && !hasKnockout && d.format !== 'double-elimination' ? '<p class="muted">Este formato não tem opções adicionais.</p>' : ''}
      </div></section>
      <aside class="card capacity-card" aria-labelledby="fmt-sum"><h3 id="fmt-sum">Cálculo automático</h3><div id="live-format" aria-live="polite">${formatSummaryHtml(w)}</div></aside>
    </div>
    ${customGroups}
  </div>`;
}

/* ---------- Etapa 5 ---------- */
function reviewHtml(d) {
  const sport = getSport(d.sport);
  const days = listDates(d.startDate, d.endDate).length;
  return `<dl class="dl review-dl">
    <dt>Campeonato</dt><dd>${esc(d.name)}</dd>
    <dt>Modalidade</dt><dd>${esc(sport.name)} · ${esc(CATEGORIES.find((c) => c.id === d.category)?.label)} · ${esc(d.ageGroup)}</dd>
    <dt>Período</dt><dd>${formatDateBR(d.startDate)}${days > 1 ? ` a ${formatDateBR(d.endDate)}` : ''} (${plural(days, 'dia', 'dias')}), das ${esc(d.dayStart)} às ${esc(d.dayEnd)}</dd>
    <dt>Local</dt><dd>${esc(d.venue)} · ${d.courts} ${d.courts === 1 ? sport.venueLabel : `${sport.venueLabel}s`}</dd>
    <dt>Equipes</dt><dd>${d.teams.length}</dd>
    <dt>Jogos</dt><dd>${esc(d.settings.matchDuration)} min + ${esc(d.settings.interval)} min de intervalo · preparação ${esc(d.settings.prepTime)} min · troca de quadra ${esc(d.settings.courtChangeTime)} min · até ${esc(d.settings.maxSimultaneous)} simultâneos</dd>
    <dt>Descansos</dt><dd>${d.settings.breaks.length ? d.settings.breaks.map((b) => `${esc(b.label || 'Descanso')} ${esc(b.start)}–${esc(b.end)}`).join(', ') : 'Nenhum'}</dd>
    <dt>Formato</dt><dd>${esc(getFormat(d.format).name)}</dd>
  </dl>`;
}

function stepGenerateHtml(w) {
  const d = w.draft; const p = w.plan;
  const existing = w.editingId ? Repo.get(S.user.id, w.editingId) : null;
  const hasResults = existing && existing.matches.some((m) => m.result);
  const sameTeams = existing && existing.teams.length === d.teams.length && existing.teams.every((t) => d.teams.some((x) => x.id === t.id));
  let result = '';
  if (p && !p.ok) result = alertBox('danger', 'Revise os dados', `<ul>${p.errors.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>`, 'alert');
  if (p && p.ok) {
    const ch = { ...d, matches: p.matches, groups: p.groups };
    const st = resolveChampionship(ch);
    const ctx = { teamName: st.teamName, teamsById: st.teamsById, byId: st.byId, groups: p.groups };
    const issues = validateSchedule(st.matches, toPlanInput(d).schedule, { teamName: st.teamName, matchLabel: (m) => `Jogo ${m.number}` });
    const s = p.summary;
    result = `<div class="stack">
      <div class="card result-summary"><div class="stat-inline">
        <div><strong>${s.totalMatches}</strong><span>partidas</span></div><div><strong>${s.rounds}</strong><span>rodadas</span></div>
        ${s.groups ? `<div><strong>${s.groups}</strong><span>grupos</span></div>` : ''}${s.qualified ? `<div><strong>${s.qualified}</strong><span>classificados</span></div>` : ''}
        ${s.semifinalists ? `<div><strong>${s.semifinalists}</strong><span>semifinalistas</span></div>` : ''}${s.finalists ? `<div><strong>${s.finalists}</strong><span>finalistas</span></div>` : ''}
        <div><strong>${p.schedule.stats.usedDays}</strong><span>${p.schedule.stats.usedDays === 1 ? 'dia usado' : 'dias usados'}</span></div>
        <div><strong>${p.schedule.stats.lastEnd ?? '—'}</strong><span>fim do último jogo</span></div>
      </div><p class="muted" style="margin:var(--sp-3) 0 0">Capacidade do período: ${p.capacity.total} horários de jogo (${p.capacity.slotsPerDay} por quadra por dia × ${Math.min(d.courts, d.settings.maxSimultaneous)} simultâneos × ${plural(p.capacity.days, 'dia', 'dias')}).</p></div>
      ${p.schedule.unscheduled.length === 0
    ? alertBox('success', 'Tudo certo!', `Os ${p.matches.length} jogos couberam no período, sem equipe jogando em duas quadras ao mesmo tempo e respeitando descansos e o horário limite.`)
    : `<div class="card suggestions-card">
          ${alertBox('warning', `${p.schedule.unscheduled.length} jogo(s) não couberam no período`, p.schedule.stats.reason === 'capacity' ? `São necessários ${p.schedule.stats.required} horários, mas o período oferece ${p.capacity.total}.` : 'Há horários livres, mas o descanso das equipes e a ordem das fases (ex.: final depois das semifinais) impedem encaixar todos os jogos.', 'alert')}
          ${p.suggestions.length ? `<h3 style="margin-top:var(--sp-4)">${icon('lightbulb', 20, 'inline-icon')}Alternativas testadas pelo algoritmo</h3><p class="muted">Cada opção abaixo foi simulada e resolve o problema sozinha.</p>
            <ul class="list-plain suggestions">${p.suggestions.map((sg, i) => `<li><div><strong>${esc(sg.label)}</strong><span class="muted">${esc(sg.detail)}</span></div><button type="button" class="btn btn-sm btn-primary" data-suggestion="${i}">Aplicar<span class="visually-hidden">: ${esc(sg.label)}</span></button></li>`).join('')}</ul>` : ''}
        </div>`}
      ${p.schedule.warnings.map((x) => alertBox('warning', '', esc(x.message))).join('')}
      ${issues.length ? alertBox('warning', 'Avisos de programação', `<ul>${issues.slice(0, 6).map((i) => `<li>${esc(i.message)}</li>`).join('')}</ul>`) : ''}
      <section aria-labelledby="preview-title">
        <div class="spread"><h3 id="preview-title" style="margin:0">${icon('calendar-range', 20, 'inline-icon')}Prévia da programação</h3>
          <div class="row"><button type="button" class="btn" data-action="generate">${icon('rotate-ccw')}Gerar novamente</button><button type="button" class="btn btn-primary btn-lg" data-action="save">${icon('save')}${w.editingId ? 'Salvar nova tabela' : 'Salvar campeonato'}</button></div></div>
        <p class="field-hint">Depois de salvar você pode editar horários e confrontos manualmente, lançar resultados e exportar a programação.</p>
        ${scheduleTableHtml(st.matches, ctx, { venue: venueLabelOf(d.sport), caption: 'Prévia da programação gerada' })}
      </section>
    </div>`;
  }
  return `<div class="stack">
    <div class="games-grid">
      <section class="card" aria-labelledby="review-title"><h3 id="review-title">Resumo</h3>${reviewHtml(d)}</section>
      <section class="card generate-card" aria-labelledby="gen-title"><h3 id="gen-title">Gerar tabela</h3>
        <p class="muted">O sistema organiza os confrontos, distribui os jogos entre as quadras, calcula os horários e verifica conflitos e capacidade.</p>
        <button type="button" class="btn btn-accent btn-lg btn-block" data-action="generate" ${w.generating ? 'disabled aria-busy="true"' : ''}>${w.generating ? '<span class="spinner" aria-hidden="true"></span>Gerando campeonato…' : `${icon('wand-sparkles')}${p ? 'Gerar novamente' : 'Gerar campeonato'}`}</button>
        ${w.editingId && sameTeams ? `<button type="button" class="btn btn-block" style="margin-top:var(--sp-2)" data-action="save-info">${icon('save')}Salvar só as informações (manter a tabela)</button>` : ''}
        ${hasResults ? `<p class="field-hint" style="margin-top:var(--sp-2)">${icon('triangle-alert', 14)} Gerar novamente substitui os resultados já lançados.</p>` : ''}
      </section>
    </div>
    <div aria-live="polite">${result}</div>
  </div>`;
}

/* ---------- Página do montador ---------- */
function wizardBodyHtml(w) {
  const step = w.step;
  const errCount = Object.keys(w.errors).length;
  const body = [stepGeneralHtml, stepTeamsHtml, stepGamesHtml, stepFormatHtml, stepGenerateHtml][step](w);
  return `
    ${w.recovered ? `<div style="margin-bottom:var(--sp-4)">${alertBox('info', 'Rascunho recuperado', 'Continuamos de onde você parou. <button type="button" class="btn btn-sm" data-action="discard">Começar do zero</button>')}</div>` : ''}
    <nav aria-label="Etapas do montador"><ol class="stepper">${STEPS.map((label, i) => {
    const done = i < w.maxStep && i !== step;
    return `<li><button type="button" class="step-btn ${done ? 'done' : ''}" ${i === step ? 'aria-current="step"' : ''} data-goto="${i}" ${i > w.maxStep + 1 ? 'disabled' : ''}>
        <span class="step-num" aria-hidden="true">${done ? icon('check', 16) : i + 1}</span><span><span class="visually-hidden">Etapa ${i + 1}: </span>${label}</span></button></li>`;
  }).join('')}</ol></nav>
    <section class="wizard-panel" aria-labelledby="step-title">
      <div class="spread wizard-head">
        <h2 id="step-title" tabindex="-1"><span class="step-tag">Etapa ${step + 1} de 5</span>${STEPS[step]}</h2>
        ${errCount ? `<span class="badge badge-danger">${errCount} pendência(s)</span>` : ''}
      </div>
      ${body}
      <div class="wizard-nav">
        <button type="button" class="btn btn-lg" data-goto="${step - 1}" ${step === 0 ? 'disabled' : ''}>${icon('arrow-left')}Voltar</button>
        <span class="muted wizard-progress" aria-hidden="true">${step + 1}/5</span>
        ${step < 4 ? `<button type="button" class="btn btn-primary btn-lg" data-goto="${step + 1}">Continuar${icon('arrow-right')}</button>` : '<span></span>'}
      </div>
    </section>`;
}

/** Re-renderiza a área do montador mantendo o foco no mesmo campo. */
function withFocus(fn) {
  const a = document.activeElement;
  const id = a && a.id;
  let sel = null;
  try { sel = a && typeof a.selectionStart === 'number' ? a.selectionStart : null; } catch { sel = null; }
  fn();
  if (id) {
    const el = document.getElementById(id);
    if (el) { el.focus({ preventScroll: true }); try { if (sel !== null) el.setSelectionRange(sel, sel); } catch { /* campos sem seleção */ } }
  }
}

function pageWizard(params) {
  const editingId = params[0] || null;
  if (!S.wizard || S.wizard.editingId !== editingId) S.wizard = initWizard(editingId);
  const w = S.wizard;
  if (!w) {
    return { title: 'Campeonato não encontrado', html: `<div class="container page-body">${emptyState('trophy', 'Campeonato não encontrado', 'Ele pode ter sido excluído.', '<a href="#/campeonatos" class="btn btn-primary">Ver campeonatos</a>')}</div>` };
  }
  const existing = editingId ? Repo.get(S.user.id, editingId) : null;
  const html = `${pageHeader(editingId ? 'Editar campeonato' : 'Montador automático', editingId ? existing.name : 'Criar campeonato',
    editingId ? 'Altere os dados e gere a tabela novamente, ou salve apenas as informações gerais.' : 'Preencha as cinco etapas. O rascunho é salvo automaticamente neste navegador.',
    editingId ? '' : `<button type="button" class="btn" data-action="example">${icon('sparkles')}Preencher com exemplo</button><button type="button" class="btn btn-ghost" data-action="discard">${icon('trash-2')}Descartar rascunho</button>`)}
    <div class="container page-body" id="wizard">${wizardBodyHtml(w)}</div>`;

  function renderBody(focusHeading = false) {
    withFocus(() => { $('#wizard').innerHTML = wizardBodyHtml(w); });
    if (focusHeading) { const h = $('#step-title'); if (h) h.focus(); }
  }
  function refreshLive() {
    const cap = $('#live-capacity'); if (cap) cap.innerHTML = capacityHtml(w);
    const fs = $('#live-format'); if (fs) fs.innerHTML = formatSummaryHtml(w);
  }

  function goTo(target) {
    if (target < 0 || target > 4) return;
    if (target > w.step) {
      for (let s = w.step; s < target; s++) {
        const errs = STEP_VALIDATORS[s](w.draft);
        if (Object.keys(errs).length) {
          w.step = s; w.errors = errs;
          renderBody();
          notify(`Revise a etapa “${STEPS[s]}”: ${Object.keys(errs).length} campo(s) precisam de atenção.`, { type: 'error' });
          requestAnimationFrame(() => { const el = $('[aria-invalid="true"]'); if (el) el.focus(); });
          return;
        }
      }
    }
    w.errors = {};
    w.step = target;
    w.maxStep = Math.max(w.maxStep, target);
    renderBody(true);
    window.scrollTo(0, 0);
  }

  function generate() {
    w.generating = true;
    renderBody();
    setTimeout(() => {
      w.plan = planChampionship(toPlanInput(w.draft));
      w.generating = false;
      renderBody();
      const p = w.plan;
      if (!p.ok) notify('Não foi possível gerar: revise os dados.', { type: 'error' });
      else if (p.schedule.unscheduled.length) notify(`${p.schedule.unscheduled.length} jogo(s) não couberam no período. Veja as sugestões.`, { type: 'warning' });
      else notify(`Campeonato gerado: ${p.matches.length} jogos distribuídos sem conflitos.`);
    }, 30);
  }

  async function save() {
    const p = w.plan;
    if (!p || !p.ok) return;
    if (p.schedule.unscheduled.length) {
      const ok = await confirmAction({ title: 'Salvar com jogos sem horário?', message: `${p.schedule.unscheduled.length} jogo(s) ficarão sem horário. Você poderá marcá-los manualmente depois, ou aplicar uma das sugestões antes de salvar.`, confirmLabel: 'Salvar mesmo assim', tone: 'primary' });
      if (!ok) return;
    }
    if (existing && existing.matches.some((m) => m.result)) {
      const ok = await confirmAction({ title: 'Gerar a tabela de novo?', message: 'Este campeonato já tem resultados lançados. Ao salvar a nova tabela, todos os jogos e resultados atuais serão substituídos.', confirmLabel: 'Substituir tabela' });
      if (!ok) return;
    }
    const ch = buildChampionship({ ...w.draft, id: editingId || w.draft.id, createdAt: existing?.createdAt }, p);
    const res = saveChampionship(ch, { type: editingId ? 'updated' : 'created', text: editingId ? `Tabela de “${ch.name}” gerada novamente` : `Campeonato “${ch.name}” criado com ${ch.matches.length} jogos` });
    if (!res.ok) return;
    if (!editingId) Repo.clearDraft(S.user.id);
    S.wizard = null;
    notify(editingId ? 'Campeonato atualizado.' : 'Campeonato criado! Boa competição.');
    go(`/campeonatos/${res.championship.id}`);
  }

  function saveInfoOnly() {
    const errs = { ...STEP_VALIDATORS[0](w.draft), ...STEP_VALIDATORS[1](w.draft) };
    if (Object.keys(errs).length) { w.errors = errs; w.step = 0; renderBody(); return; }
    const d = w.draft;
    const ch = { ...existing, name: d.name, venue: d.venue, category: d.category, ageGroup: d.ageGroup, teams: d.teams, strictScoring: d.strictScoring, pointsConfig: d.pointsConfig };
    saveChampionship(ch, { type: 'updated', text: `Informações de “${ch.name}” atualizadas` });
    S.wizard = null;
    notify('Informações salvas. A tabela de jogos foi mantida.');
    go(`/campeonatos/${existing.id}`);
  }

  function submitTeam() {
    const f = w.teamForm;
    w.teamErrors = validateTeamForm(f, w.draft.teams);
    if (Object.keys(w.teamErrors).length) {
      renderBody();
      const k = Object.keys(w.teamErrors)[0];
      const el = document.getElementById(`team-${k}`); if (el) el.focus();
      return;
    }
    const team = { ...f, name: f.name.trim(), responsible: f.responsible.trim() };
    if (f.id) {
      w.draft.teams = w.draft.teams.map((t) => (t.id === f.id ? team : t));
      notify(`Equipe “${team.name}” atualizada.`);
    } else {
      w.draft.teams.push({ ...team, id: uid('team') });
      notify(`Equipe “${team.name}” adicionada.`);
    }
    w.teamForm = emptyTeamForm(w);
    w.teamErrors = {}; w.logoError = ''; w.errors = {};
    markDirty(w);
    renderBody();
    const el = $('#team-name'); if (el) el.focus();
  }

  function mount(root) {
    root.addEventListener('input', (e) => {
      const t = e.target;
      if (t.dataset.bind) {
        const val = t.type === 'checkbox' ? t.checked : t.type === 'number' ? (t.value === '' ? '' : Number(t.value)) : t.value;
        setPath(w.draft, t.dataset.bind, val);
        markDirty(w);
        if (t.dataset.bind === 'startDate' && w.draft.endDate < w.draft.startDate) w.draft.endDate = w.draft.startDate;
        if (t.hasAttribute('data-rerender') || t.type === 'checkbox' || t.type === 'radio') renderBody(); else refreshLive();
      } else if (t.dataset.team) {
        w.teamForm[t.dataset.team] = t.value;
        if (t.dataset.team === 'color') renderBody();
      } else if (t.dataset.points) {
        const sport = getSport(w.draft.sport);
        w.draft.pointsConfig = { ...(w.draft.pointsConfig || sport.standingsPoints), [t.dataset.points]: Number(t.value) };
        markDirty(w);
      } else if (t.dataset.duration) {
        const v = Number(t.value);
        Prefs.set({ durations: { ...Prefs.data.durations, [t.dataset.duration]: v } });
        if (t.dataset.duration === w.draft.sport) { w.draft.settings.matchDuration = v; markDirty(w); }
      } else if (t.dataset.special === 'courts') {
        const courts = Math.max(0, Number(t.value));
        const s = w.draft.settings;
        s.maxSimultaneous = s.maxSimultaneous >= w.draft.courts || s.maxSimultaneous > courts ? courts : s.maxSimultaneous;
        w.draft.courts = courts;
        markDirty(w);
      }
    });
    root.addEventListener('change', async (e) => {
      const t = e.target;
      if (t.dataset.special === 'sport') {
        const duration = getDurationTable(Prefs.data.durations).find((s) => s.id === t.value).duration;
        Object.assign(w.draft, { sport: t.value, scoringOverrides: {}, pointsConfig: null });
        w.draft.settings.matchDuration = duration;
        markDirty(w);
        renderBody();
        notify(`Duração estimada ajustada para ${duration} min (sugestão do sistema, editável na etapa 3).`, { type: 'info' });
      } else if (t.dataset.special === 'format') {
        w.draft.format = t.value;
        if (t.value === 'custom-groups' && !w.draft.formatOptions.groups) w.draft.formatOptions.groups = distributeGroups(w.draft.teams.map((x) => x.id), w.draft.formatOptions.groupsCount || 2);
        w.errors = {};
        markDirty(w);
        renderBody();
      } else if (t.dataset.assign) {
        const groups = w.draft.formatOptions.groups || distributeGroups(w.draft.teams.map((x) => x.id), 2);
        w.draft.formatOptions.groups = groups.map((g) => ({ ...g, teamIds: g.id === t.value ? [...g.teamIds.filter((x) => x !== t.dataset.assign), t.dataset.assign] : g.teamIds.filter((x) => x !== t.dataset.assign) }));
        markDirty(w);
        renderBody();
      } else if (t.dataset.actionChange === 'cg-count') {
        w.draft.formatOptions.groups = distributeGroups(w.draft.teams.map((x) => x.id), Math.max(1, Math.min(16, Number(t.value) || 1)));
        markDirty(w);
        renderBody();
      } else if (t.id === 'team-logo') {
        const file = t.files && t.files[0];
        w.logoError = '';
        if (file) {
          try { w.teamForm.logo = await readLogo(file); } catch (err) { w.logoError = err.message; }
        }
        renderBody();
      } else if (t.dataset.bind && (t.hasAttribute('data-rerender') || t.dataset.bind.startsWith('settings.breaks'))) {
        renderBody();
      } else if (t.dataset.duration) {
        renderBody();
      }
    });
    root.addEventListener('submit', (e) => { if (e.target.id === 'team-form') { e.preventDefault(); submitTeam(); } });
    root.addEventListener('click', async (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.goto !== undefined) { goTo(Number(b.dataset.goto)); return; }
      if (b.dataset.color) { w.teamForm.color = b.dataset.color; renderBody(); return; }
      if (b.dataset.teamEdit) { w.teamForm = clone(w.draft.teams.find((t) => t.id === b.dataset.teamEdit)); w.teamErrors = {}; renderBody(); $('#team-name').focus(); return; }
      if (b.dataset.teamDelete) {
        const team = w.draft.teams.find((t) => t.id === b.dataset.teamDelete);
        const ok = await confirmAction({ title: 'Excluir equipe?', message: `A equipe “${team.name}” será removida da lista.`, confirmLabel: 'Excluir equipe' });
        if (!ok) return;
        const before = clone(w.draft.teams);
        w.draft.teams = w.draft.teams.filter((t) => t.id !== team.id);
        if (w.teamForm.id === team.id) w.teamForm = emptyTeamForm(w);
        markDirty(w); renderBody();
        notify(`Equipe “${team.name}” excluída.`, { action: { label: 'Desfazer', onClick: () => { w.draft.teams = before; markDirty(w); renderBody(); } } });
        return;
      }
      if (b.dataset.removeBreak !== undefined) { w.draft.settings.breaks.splice(Number(b.dataset.removeBreak), 1); markDirty(w); renderBody(); return; }
      if (b.dataset.suggestion !== undefined) {
        const sg = w.plan.suggestions[Number(b.dataset.suggestion)];
        const before = clone(w.draft);
        w.draft = applySuggestion(w.draft, sg.patch);
        markDirty(w);
        w.plan = planChampionship(toPlanInput(w.draft));
        renderBody();
        notify(`Alteração aplicada: ${sg.label}.`, { action: { label: 'Desfazer', onClick: () => { w.draft = before; w.plan = planChampionship(toPlanInput(before)); renderBody(); } } });
        return;
      }
      switch (b.dataset.action) {
        case 'example':
          S.wizard = initWizard(null); Object.assign(w, S.wizard, { draft: exampleDraft(), recovered: false }); S.wizard = w;
          w.teamForm = emptyTeamForm(w);
          markDirty(w); renderBody();
          notify('Exemplo carregado: vôlei, 08h às 18h, 2 quadras, 8 equipes, 45 min + 15 min de intervalo.', { type: 'info' });
          break;
        case 'discard': {
          const ok = await confirmAction({ title: 'Descartar rascunho?', message: 'Os dados preenchidos até aqui serão apagados.', confirmLabel: 'Descartar' });
          if (!ok) return;
          Repo.clearDraft(S.user.id);
          Object.assign(w, initWizard(null), { recovered: false });
          renderBody();
          break;
        }
        case 'team-cancel': w.teamForm = emptyTeamForm(w); w.teamErrors = {}; renderBody(); break;
        case 'team-autofill': {
          const start = w.draft.teams.length;
          const missing = Math.max(0, w.draft.expectedTeams - start);
          for (let i = 0; i < missing; i++) w.draft.teams.push({ id: uid('team'), name: `Equipe ${start + i + 1}`, responsible: 'A definir', category: w.draft.category, color: TEAM_COLORS[(start + i) % TEAM_COLORS.length], logo: null });
          w.errors = {}; markDirty(w); renderBody();
          notify(`${missing} equipes criadas com nomes provisórios. Você pode editá-las a qualquer momento.`);
          break;
        }
        case 'team-shuffle':
          for (let i = w.draft.teams.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [w.draft.teams[i], w.draft.teams[j]] = [w.draft.teams[j], w.draft.teams[i]]; }
          markDirty(w); renderBody(); notify('Ordem das equipes sorteada.');
          break;
        case 'use-team-count': w.draft.expectedTeams = w.draft.teams.length; markDirty(w); renderBody(); break;
        case 'logo-remove': w.teamForm.logo = null; renderBody(); break;
        case 'add-break': w.draft.settings.breaks.push({ start: '12:00', end: '13:00', label: 'Almoço' }); markDirty(w); renderBody(); break;
        case 'reset-durations': Prefs.set({ durations: {} }); w.draft.settings.matchDuration = getSport(w.draft.sport).defaultDuration; markDirty(w); renderBody(); break;
        case 'cg-redistribute': w.draft.formatOptions.groups = distributeGroups(w.draft.teams.map((x) => x.id), (w.draft.formatOptions.groups || []).length || 2); markDirty(w); renderBody(); break;
        case 'generate': generate(); break;
        case 'save': save(); break;
        case 'save-info': saveInfoOnly(); break;
        default: break;
      }
    });
  }
  return { title: editingId ? 'Editar campeonato' : 'Criar campeonato', html, mount };
}

/* ======================================================================
 * PÁGINA DO CAMPEONATO (programação, resultados, classificação, chave, equipes)
 * ====================================================================== */
function sideHtml(m, side, ctx) {
  const teamId = side === 'home' ? m.homeTeamId : m.awayTeamId;
  const team = teamId ? ctx.teamsById.get(teamId) : null;
  return teamName(team, participantLabel(side === 'home' ? m.home : m.away, teamId, ctx));
}
function scoreText(m) {
  if (!m.result) return '';
  const base = `${m.result.home} × ${m.result.away}`;
  return m.result.tiebreak ? `${base} (${m.result.tiebreak.home}–${m.result.tiebreak.away})` : base;
}

/** Tabela da programação. Com `actions`, mostra os botões de resultado e edição. */
function scheduleTableHtml(matches, ctx, { venue = 'Quadra', caption = 'Programação dos jogos', actions = false, issuesByMatch = new Map(), filter = null } = {}) {
  let rows = [...matches].sort((a, b) => a.number - b.number);
  if (filter) {
    const term = normalize(filter.q.trim());
    rows = rows.filter((m) => (filter.date === 'all' || m.date === filter.date)
      && (filter.court === 'all' || String(m.court) === filter.court)
      && (filter.status === 'all' || m.status === filter.status)
      && (filter.phase === 'all' || m.phase.split(' · ')[0] === filter.phase)
      && (!term || normalize(`${participantLabel(m.home, m.homeTeamId, ctx)} ${participantLabel(m.away, m.awayTeamId, ctx)} ${m.phase} j${m.number}`).includes(term)));
  }
  return `<p class="muted results-count no-print" aria-live="polite">${rows.length} de ${matches.length} jogos</p>
  <div class="table-wrap schedule-table"><table class="table">
    <caption class="visually-hidden">${esc(caption)}</caption>
    <thead><tr><th scope="col" class="num">Nº</th><th scope="col">Data</th><th scope="col">Horário</th><th scope="col">${venue}</th><th scope="col">Equipe A</th><th scope="col">Equipe B</th><th scope="col">Fase</th><th scope="col">Status</th><th scope="col">Placar</th>${actions ? '<th scope="col" class="no-print"><span class="visually-hidden">Ações</span></th>' : ''}</tr></thead>
    <tbody>${rows.map((m) => {
    const issues = issuesByMatch.get(m.id) || [];
    const hasError = issues.some((i) => i.severity === 'error');
    const ready = m.homeTeamId && m.awayTeamId;
    return `<tr class="${hasError ? 'row-conflict' : issues.length ? 'row-warn' : m.status === 'in_progress' ? 'row-highlight' : ''}">
        <td class="num"><strong>${m.number}</strong></td>
        <td>${m.date ? `<span class="nowrap">${weekdayShort(m.date)} ${formatDateBR(m.date)}</span>` : `<span class="placeholder">${icon('calendar-x-2', 14)} sem horário</span>`}</td>
        <td class="nowrap tabular">${m.date ? `${toHHMM(m.start)}–${toHHMM(m.end)}` : '—'}</td>
        <td>${m.court ?? '—'}</td>
        <td>${sideHtml(m, 'home', ctx)}</td><td>${sideHtml(m, 'away', ctx)}</td>
        <td>${esc(m.phase)}${issues.length ? `<span class="issue-flag" title="${esc(issues.map((i) => i.message).join('\n'))}">${icon('triangle-alert', 16)}<span class="visually-hidden">Conflito: ${esc(issues.map((i) => i.message).join(' '))}</span></span>` : ''}</td>
        <td>${statusBadge(m.status)}</td>
        <td class="score tabular">${scoreText(m) || '<span class="muted">—</span>'}</td>
        ${actions ? `<td class="no-print"><div class="row" style="flex-wrap:nowrap;gap:4px">
          ${m.status !== 'not_needed' ? `<button type="button" class="btn btn-sm" data-result="${m.id}" ${ready ? '' : 'disabled title="As equipes deste jogo ainda não foram definidas"'}>${icon('clipboard-pen')}${m.result ? 'Editar placar' : 'Resultado'}<span class="visually-hidden"> do jogo ${m.number}</span></button>` : ''}
          <button type="button" class="btn btn-sm btn-ghost btn-icon" data-edit="${m.id}" aria-label="Editar horário e confronto do jogo ${m.number}">${icon('pencil')}</button></div></td>` : ''}
      </tr>`;
  }).join('') || `<tr><td colspan="10" class="muted" style="text-align:center;padding:var(--sp-6)">Nenhum jogo com esses filtros.</td></tr>`}</tbody>
  </table></div>`;
}

function standingsTableHtml(title, rows, ctx, scoring, allowDraw, complete) {
  const isSets = scoring.type === 'sets';
  const sign = (n) => (n > 0 ? `+${n}` : n);
  return `<div class="standings">
    <div class="spread"><h3 style="margin:0">${esc(title)}</h3>${complete !== undefined ? `<span class="badge ${complete ? 'badge-success' : 'badge-neutral'}">${complete ? 'Fase concluída' : 'Em disputa'}</span>` : ''}</div>
    <div class="table-wrap" style="margin-top:var(--sp-3)"><table class="table standings-table">
      <caption class="visually-hidden">${esc(title)}</caption>
      <thead><tr><th scope="col" class="num"><abbr title="Posição">Pos</abbr></th><th scope="col">Equipe</th><th scope="col" class="num"><abbr title="Pontos">Pts</abbr></th><th scope="col" class="num"><abbr title="Jogos">J</abbr></th><th scope="col" class="num"><abbr title="Vitórias">V</abbr></th>${allowDraw ? '<th scope="col" class="num"><abbr title="Empates">E</abbr></th>' : ''}<th scope="col" class="num"><abbr title="Derrotas">D</abbr></th>
        ${isSets ? `<th scope="col" class="num"><abbr title="Sets vencidos">SV</abbr></th><th scope="col" class="num"><abbr title="Sets perdidos">SP</abbr></th><th scope="col" class="num"><abbr title="Saldo de sets">Saldo</abbr></th><th scope="col" class="num"><abbr title="${scoring.tennis ? 'Saldo de games' : 'Saldo de pontos'}">${scoring.tennis ? 'SG' : 'SPt'}</abbr></th>`
    : `<th scope="col" class="num"><abbr title="${esc(scoring.unitLabel)} pró">Pró</abbr></th><th scope="col" class="num"><abbr title="${esc(scoring.unitLabel)} contra">Contra</abbr></th><th scope="col" class="num"><abbr title="Saldo de ${esc(scoring.unitLabel)}">Saldo</abbr></th>`}
        <th scope="col">Últimos</th></tr></thead>
      <tbody>${rows.map((r) => `<tr class="${r.qualified ? 'row-qualified' : ''}">
        <td class="num"><span class="pos">${r.position}</span></td>
        <td><span class="row" style="gap:8px;flex-wrap:nowrap">${teamName(ctx.teamsById.get(r.teamId))}${r.qualified ? `<span class="badge ${r.confirmed ? 'badge-success' : 'badge-info'}">${r.confirmed ? 'Classificado' : 'Zona de classificação'}</span>` : ''}</span></td>
        <td class="num"><strong>${r.points}</strong></td><td class="num">${r.played}</td><td class="num">${r.wins}</td>${allowDraw ? `<td class="num">${r.draws}</td>` : ''}<td class="num">${r.losses}</td>
        ${isSets ? `<td class="num">${r.setsFor}</td><td class="num">${r.setsAgainst}</td><td class="num">${sign(r.setDiff)}</td><td class="num">${sign(r.goalDiff)}</td>` : `<td class="num">${r.goalsFor}</td><td class="num">${r.goalsAgainst}</td><td class="num">${sign(r.goalDiff)}</td>`}
        <td><span class="form-dots" aria-label="${r.form.length ? `Últimos resultados: ${r.form.map((f) => ({ V: 'vitória', E: 'empate', D: 'derrota' }[f])).join(', ')}` : 'Sem jogos'}">${r.form.map((f) => `<span class="form-dot f-${f}" aria-hidden="true">${f}</span>`).join('')}</span></td>
      </tr>`).join('')}</tbody>
    </table></div></div>`;
}

function bracketHtml(matches, ctx) {
  const sections = [
    ['main', null, matches.filter((m) => m.stage === 'knockout' || m.stage === 'third')],
    ['winners', 'Chave superior (vencedores)', matches.filter((m) => m.stage === 'winners')],
    ['losers', 'Chave inferior (repescagem)', matches.filter((m) => m.stage === 'losers')],
    ['final', 'Grande final', matches.filter((m) => m.stage === 'grandfinal' || m.stage === 'reset')],
  ].filter((s) => s[2].length);
  if (!sections.length) return '<p class="muted">Este formato não tem mata-mata.</p>';
  const matchBox = (m) => {
    const win = m.result && m.result.winner;
    return `<div class="bracket-match ${m.status}">
      <div class="bracket-meta"><span>J${m.number}</span><span>${m.date ? `${formatDateBR(m.date).slice(0, 5)} ${toHHMM(m.start)} · Q${m.court}` : 'sem horário'}</span></div>
      <div class="bracket-side ${win === 'home' ? 'win' : ''}">${sideHtml(m, 'home', ctx)}<span class="tabular">${m.result ? m.result.home : ''}</span></div>
      <div class="bracket-side ${win === 'away' ? 'win' : ''}">${sideHtml(m, 'away', ctx)}<span class="tabular">${m.result ? m.result.away : ''}</span></div>
      ${m.result && m.result.tiebreak ? `<div class="bracket-tb">Desempate ${m.result.tiebreak.home}–${m.result.tiebreak.away}</div>` : ''}
      ${m.status === 'not_needed' ? '<div class="bracket-tb">Não foi necessário</div>' : ''}
    </div>`;
  };
  return `<div class="stack">${sections.map(([id, title, list]) => {
    const cols = new Map();
    list.forEach((m) => { const k = m.bracketRound ?? 0; if (!cols.has(k)) cols.set(k, []); cols.get(k).push(m); });
    const colHtml = [...cols.entries()].sort((a, b) => a[0] - b[0]).map(([round, ms]) => {
      ms.sort((a, b) => (a.stage === 'third') - (b.stage === 'third') || (a.bracketSlot ?? 0) - (b.bracketSlot ?? 0));
      const colTitle = id === 'losers' ? `Rodada ${round}` : (ms.find((m) => m.stage !== 'third') || ms[0]).phase.replace(/^Chave (superior|inferior) · /, '');
      return `<div class="bracket-col"><h4 class="bracket-col-title">${esc(colTitle)}</h4><div class="bracket-col-list">${ms.map((m) => `<div>${m.stage === 'third' ? '<span class="bracket-label">Disputa de 3º lugar</span>' : ''}${m.stage === 'reset' ? '<span class="bracket-label">Jogo extra (se necessário)</span>' : ''}${matchBox(m)}</div>`).join('')}</div></div>`;
    }).join('');
    return `<section aria-label="${esc(title || 'Chaveamento')}">${title ? `<h3>${esc(title)}</h3>` : ''}<div class="bracket" tabindex="0" aria-label="Chaveamento: role para o lado para ver todas as fases">${colHtml}</div></section>`;
  }).join('')}</div>`;
}

function matchCardHtml(m, ctx, venue) {
  return `<li class="match-card status-${m.status}">
    <div class="match-card-top"><span class="match-no">Jogo ${m.number}</span><span class="muted">${esc(m.phase)}</span>${statusBadge(m.status)}</div>
    <div class="match-card-teams">${sideHtml(m, 'home', ctx)}<span class="match-card-score tabular">${m.result ? `${m.result.home} × ${m.result.away}` : '×'}</span>${sideHtml(m, 'away', ctx)}</div>
    ${m.result && m.result.sets ? `<p class="match-sets tabular">${m.result.sets.map((s) => `${s.home}–${s.away}`).join(' · ')}</p>` : ''}
    ${m.result && m.result.tiebreak ? `<p class="match-sets">Desempate: ${m.result.tiebreak.home}–${m.result.tiebreak.away}</p>` : ''}
    <div class="match-card-foot"><span class="muted">${icon('clock-3', 14)}${m.date ? `${weekdayShort(m.date)} ${formatDateBR(m.date)} · ${toHHMM(m.start)} · ${venue} ${m.court}` : 'Sem horário definido'}</span>
      ${m.status !== 'not_needed' ? `<button type="button" class="btn btn-sm ${m.result ? '' : 'btn-primary'}" data-result="${m.id}" ${m.homeTeamId && m.awayTeamId ? '' : 'disabled'}>${m.result ? 'Editar placar' : 'Registrar resultado'}<span class="visually-hidden"> do jogo ${m.number}</span></button>` : ''}
    </div></li>`;
}

const DETAIL_TABS = [
  { id: 'programacao', label: 'Programação', icon: 'calendar-days' },
  { id: 'resultados', label: 'Resultados', icon: 'clipboard-list' },
  { id: 'classificacao', label: 'Classificação', icon: 'trophy' },
  { id: 'chave', label: 'Chaveamento', icon: 'git-branch' },
  { id: 'equipes', label: 'Equipes', icon: 'users' },
];

function pageDetail(params) {
  const id = params[0];
  const ch = Repo.get(S.user.id, id);
  if (!ch) {
    return { title: 'Campeonato', html: `<div class="container page-body">${emptyState('trophy', 'Campeonato não encontrado', 'O endereço pode estar errado ou o campeonato foi excluído.', '<a href="#/campeonatos" class="btn btn-primary">Ver meus campeonatos</a>')}</div>` };
  }
  if (S.sched.champId !== id) S.sched = { champId: id, q: '', date: 'all', court: 'all', phase: 'all', status: 'all' };
  const tab = DETAIL_TABS.some((t) => t.id === S.query.get('aba')) ? S.query.get('aba') : 'programacao';
  const st = resolveChampionship(ch);
  const ctx = { teamName: st.teamName, teamsById: st.teamsById, byId: st.byId, groups: ch.groups };
  const sport = getSport(ch.sport);
  const scoring = scoringOf(ch);
  const venue = venueLabelOf(ch.sport);
  const cfg = toPlanInput(ch).schedule;
  const issues = validateSchedule(st.matches, cfg, { teamName: st.teamName, matchLabel: (m) => `Jogo ${m.number}` });
  const issuesByMatch = new Map();
  issues.forEach((i) => i.matchIds.forEach((mid) => issuesByMatch.set(mid, [...(issuesByMatch.get(mid) || []), i])));
  const pending = st.matches.filter((m) => ['scheduled', 'in_progress'].includes(m.status)).sort((a, b) => absoluteMinutes(a.date, a.start) - absoluteMinutes(b.date, b.start));
  const finished = st.matches.filter((m) => m.status === 'finished').sort((a, b) => b.number - a.number);
  const waiting = st.matches.filter((m) => ['waiting', 'unscheduled'].includes(m.status));
  const errors = issues.filter((i) => i.severity === 'error');
  const hasDraws = scoring.type === 'goals' && scoring.allowDraw;
  const subtitle = `${sport.name} · ${ch.venue} · ${formatDateBR(ch.startDate)}${ch.endDate !== ch.startDate ? ` a ${formatDateBR(ch.endDate)}` : ''} · ${getFormat(ch.format).name}`;
  const t = (tid) => st.teamsById.get(tid);
  const F = S.sched;

  const scheduleFilters = () => {
    const dates = [...new Set(st.matches.filter((m) => m.date).map((m) => m.date))].sort();
    const courts = [...new Set(st.matches.filter((m) => m.court).map((m) => m.court))].sort((a, b) => a - b);
    const phases = [...new Set(st.matches.map((m) => m.phase.split(' · ')[0]))];
    const sel = (idv, key, label, opts) => `<label class="visually-hidden" for="${idv}">${label}</label><select id="${idv}" class="select" data-sched="${key}">${opts.map(([v, l]) => `<option value="${esc(v)}" ${String(F[key]) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    return `<div class="toolbar card card-tight no-print" role="search" aria-label="Filtrar programação">
      ${searchBox({ id: 'sched-q', value: F.q, label: 'Buscar equipe ou fase', placeholder: 'Buscar equipe, fase ou nº do jogo', shortcut: false })}
      <div class="toolbar-filters">
        ${sel('sf-date', 'date', 'Data', [['all', 'Todas as datas'], ...dates.map((d) => [d, `${weekdayShort(d)} ${formatDateBR(d)}`])])}
        ${sel('sf-court', 'court', venue, [['all', `Todas as ${venue.toLowerCase()}s`], ...courts.map((c) => [String(c), `${venue} ${c}`])])}
        ${sel('sf-phase', 'phase', 'Fase', [['all', 'Todas as fases'], ...phases.map((p) => [p, p])])}
        ${sel('sf-status', 'status', 'Status', [['all', 'Todos os status'], ...Object.entries(MATCH_STATUS).map(([k, v]) => [k, v.label])])}
      </div></div>`;
  };

  let panel = '';
  if (tab === 'programacao') {
    panel = `<div class="spread no-print" style="margin-bottom:var(--sp-3)">
        <p class="muted" style="margin:0">Clique no lápis para mudar data, horário, quadra ou confronto. Conflitos aparecem destacados.</p>
        <div class="row">
          <button type="button" class="btn btn-sm" data-action="csv">${icon('file-spreadsheet')}CSV</button>
          <button type="button" class="btn btn-sm" data-action="print" title="Na janela de impressão, escolha “Salvar como PDF”">${icon('file-down')}PDF</button>
          <button type="button" class="btn btn-sm" data-action="print">${icon('printer')}Imprimir</button>
        </div></div>
      <div class="print-only"><h2>${esc(ch.name)}</h2><p>${esc(subtitle)}</p></div>
      ${scheduleFilters()}
      <div id="sched-table">${scheduleTableHtml(st.matches, ctx, { venue, actions: true, issuesByMatch, filter: F })}</div>`;
  } else if (tab === 'resultados') {
    panel = `<div class="results-columns">
      <section aria-labelledby="pend-title"><h2 id="pend-title" class="col-title">${icon('circle-play', 22)}Próximos confrontos <span class="badge badge-neutral no-dot">${pending.length}</span></h2>
        ${pending.length ? `<ul class="list-plain match-list">${pending.map((m) => matchCardHtml(m, ctx, venue)).join('')}</ul>` : '<p class="muted">Nenhum jogo pronto para receber resultado.</p>'}
        ${waiting.length ? `<h3 class="col-title" style="margin-top:var(--sp-5)">${icon('hourglass', 22)}Aguardando definição <span class="badge badge-neutral no-dot">${waiting.length}</span></h3><ul class="list-plain match-list compact">${waiting.map((m) => matchCardHtml(m, ctx, venue)).join('')}</ul>` : ''}
      </section>
      <section aria-labelledby="fin-title"><h2 id="fin-title" class="col-title">${icon('circle-check', 22)}Finalizados <span class="badge badge-neutral no-dot">${finished.length}</span></h2>
        ${finished.length ? `<ul class="list-plain match-list">${finished.map((m) => matchCardHtml(m, ctx, venue)).join('')}</ul>` : '<p class="muted">Nenhum resultado registrado ainda.</p>'}
      </section></div>`;
  } else if (tab === 'classificacao') {
    panel = `<div class="stack">
      ${st.leagueTable ? standingsTableHtml('Classificação geral', st.leagueTable.map((r) => ({ ...r, qualified: false })), ctx, scoring, hasDraws) : ''}
      ${st.groupTables.map((g) => standingsTableHtml(g.group.name, g.rows, ctx, scoring, hasDraws, g.complete)).join('')}
      ${!st.leagueTable && !st.groupTables.length ? alertBox('info', '', 'Formatos eliminatórios não têm tabela de pontos: acompanhe o avanço das equipes na aba Chaveamento.') : ''}
      <p class="field-hint">Critérios de ordenação: pontos, vitórias, saldo ${scoring.type === 'sets' ? 'de sets, saldo de pontos' : `de ${esc(scoring.unitLabel)}`}, ${scoring.type === 'sets' ? 'pontos' : esc(scoring.unitLabel)} marcados e confronto direto. ${esc(sport.standingsNote)}</p>
    </div>`;
  } else if (tab === 'chave') {
    panel = bracketHtml(st.matches.filter((m) => isKnockoutMatch(m)), ctx);
  } else {
    panel = `<ul class="team-grid list-plain">${ch.teams.map((team, i) => {
      const played = st.matches.filter((m) => m.result && (m.homeTeamId === team.id || m.awayTeamId === team.id));
      const wins = played.filter((m) => (m.result.winner === 'home' ? m.homeTeamId : m.result.winner === 'away' ? m.awayTeamId : null) === team.id).length;
      const next = st.matches.filter((m) => !m.result && m.date && (m.homeTeamId === team.id || m.awayTeamId === team.id)).sort((a, b) => absoluteMinutes(a.date, a.start) - absoluteMinutes(b.date, b.start))[0];
      const group = (ch.groups || []).find((g) => g.teamIds.includes(team.id));
      return `<li class="card team-profile" style="--team:${esc(team.color)}">
        <div class="row" style="flex-wrap:nowrap"><span class="team-avatar lg" style="background:${esc(team.color)}" aria-hidden="true">${team.logo ? `<img src="${esc(team.logo)}" alt="">` : esc(team.name[0])}</span>
          <div><h3 style="margin:0">${esc(team.name)}</h3><span class="muted">${esc(team.responsible)} · #${i + 1}${group ? ` · ${esc(group.name)}` : ''}</span></div>
          ${st.champion === team.id ? `<span class="team-trophy" role="img" aria-label="Campeão">${icon('trophy', 28)}</span>` : ''}</div>
        <div class="stat-inline" style="margin-top:var(--sp-3)"><div><strong>${played.length}</strong><span>jogos</span></div><div><strong>${wins}</strong><span>vitórias</span></div><div><strong>${played.length - wins}</strong><span>outros</span></div></div>
        <p class="muted team-next">${next ? `Próximo: Jogo ${next.number} · ${weekdayShort(next.date)} ${toHHMM(next.start)} · ${venue} ${next.court} contra ${teamName(t(next.homeTeamId === team.id ? next.awayTeamId : next.homeTeamId), 'a definir')}` : 'Sem jogos agendados.'}</p>
      </li>`;
    }).join('')}</ul>`;
  }

  const tabs = DETAIL_TABS.map((x) => (x.id === 'resultados' ? { ...x, count: pending.length } : x));
  const html = `
    <header class="champ-hero">
      <div class="champ-hero-art" aria-hidden="true">${sportArt(ch.sport, { decorative: true })}</div>
      <div class="container">
        <a href="#/campeonatos" class="back-link no-print">${icon('arrow-left', 16)}Campeonatos</a>
        <div class="spread" style="align-items:flex-end">
          <div>
            <div class="row" style="margin-bottom:var(--sp-2)"><span class="badge badge-neutral no-dot">${esc(sport.name)}</span>${champBadge(st.status)}<span class="badge badge-neutral no-dot">${esc(CATEGORIES.find((c) => c.id === ch.category)?.label)} · ${esc(ch.ageGroup)}</span></div>
            <h1>${esc(ch.name)}</h1>
            <ul class="list-plain champ-hero-meta">
              <li>${icon('map-pin', 16)}${esc(ch.venue)} · ${ch.courts} ${ch.courts === 1 ? venue.toLowerCase() : `${venue.toLowerCase()}s`}</li>
              <li>${icon('calendar-days', 16)}${formatDateBR(ch.startDate)}${ch.endDate !== ch.startDate ? ` a ${formatDateBR(ch.endDate)}` : ''} · ${esc(ch.dayStart)}–${esc(ch.dayEnd)}</li>
              <li>${icon('users', 16)}${ch.teams.length} equipes · ${esc(getFormat(ch.format).name)}</li>
            </ul>
          </div>
          <div class="row no-print"><a href="#/campeonatos/${ch.id}/editar" class="btn">${icon('pencil')}Editar</a><button type="button" class="btn btn-ghost btn-icon" data-action="delete" aria-label="Excluir campeonato">${icon('trash-2')}</button></div>
        </div>
        <div class="champ-progress-row">${progressBar(st.progress.finished, st.progress.total, 'Jogos finalizados')}<span class="muted tabular">${st.progress.finished}/${st.progress.total} jogos finalizados</span></div>
      </div>
    </header>
    <div class="container page-body">
      ${st.champion ? `<div class="podium" role="status">${icon('crown', 52, 'podium-crown')}<div><span class="eyebrow eyebrow-on-ink">Campeão</span><strong class="podium-name">${esc(t(st.champion)?.name)}</strong><span class="podium-others">${st.runnerUp ? `${icon('medal', 16)} Vice: ${esc(t(st.runnerUp)?.name)}` : ''}${st.third ? ` · 3º lugar: ${esc(t(st.third)?.name)}` : ''}</span></div></div>` : ''}
      ${errors.length ? `<div style="margin-bottom:var(--sp-4)">${alertBox('danger', `${errors.length} conflito(s) na programação`, `<ul>${errors.slice(0, 4).map((i) => `<li>${esc(i.message)}</li>`).join('')}</ul>`)}</div>` : ''}
      ${st.matches.some((m) => m.status === 'unscheduled' && !m.resetOf) ? `<div style="margin-bottom:var(--sp-4)">${alertBox('warning', 'Há jogos sem horário', 'Use o botão de edição na programação para marcar data, horário e quadra, ou edite o campeonato e gere a tabela de novo com mais capacidade.')}</div>` : ''}
      ${tabsHtml(tabs, tab, 'Seções do campeonato', 'champ')}
      <div role="tabpanel" id="champ-panel" aria-labelledby="champ-tab-${tab}" tabindex="0" class="tab-panel">${panel}</div>
    </div>`;

  /* ---------- ações ---------- */
  const persist = (next, activity) => saveChampionship(next, activity);
  const reload = () => rerenderPage();

  function openResult(matchId) {
    const m = st.byId.get(matchId);
    if (!m || !m.homeTeamId || !m.awayTeamId) return;
    const knockout = isKnockoutMatch(m);
    const strict = ch.strictScoring !== false;
    const home = participantLabel(m.home, m.homeTeamId, ctx);
    const away = participantLabel(m.away, m.awayTeamId, ctx);
    const state = scoring.type === 'goals'
      ? { home: m.result?.home ?? '', away: m.result?.away ?? '', tbHome: m.result?.tiebreak?.home ?? '', tbAway: m.result?.tiebreak?.away ?? '' }
      : { sets: m.result?.sets ? m.result.sets.map((s) => ({ ...s })) : Array.from({ length: scoring.setsToWin }, () => ({ home: '', away: '' })) };
    let submitted = false;

    const input = () => (scoring.type === 'goals'
      ? { home: state.home === '' ? NaN : Number(state.home), away: state.away === '' ? NaN : Number(state.away), tiebreak: state.tbHome !== '' || state.tbAway !== '' ? { home: state.tbHome === '' ? NaN : Number(state.tbHome), away: state.tbAway === '' ? NaN : Number(state.tbAway) } : null }
      : { sets: state.sets.map((s) => ({ home: s.home === '' ? '' : Number(s.home), away: s.away === '' ? '' : Number(s.away) })) });

    const bodyHtml = () => {
      const ev = evaluateResult(input(), scoring, { knockout, strict });
      const setsWon = scoring.type === 'sets' ? state.sets.reduce((acc, s) => {
        if (s.home === '' || s.away === '' || Number(s.home) === Number(s.away)) return acc;
        return Number(s.home) > Number(s.away) ? { h: acc.h + 1, a: acc.a } : { h: acc.h, a: acc.a + 1 };
      }, { h: 0, a: 0 }) : null;
      const isDraw = scoring.type === 'goals' && state.home !== '' && String(state.home) === String(state.away);
      const board = scoring.type === 'goals' ? `${state.home === '' ? '–' : esc(state.home)} : ${state.away === '' ? '–' : esc(state.away)}` : `${setsWon.h} : ${setsWon.a}`;
      return `<form id="result-form" class="stack" novalidate>
        <div class="scoreboard" aria-hidden="true"><span class="scoreboard-team">${esc(home)}</span><span class="scoreboard-score tabular" id="sb-score">${board}</span><span class="scoreboard-team">${esc(away)}</span></div>
        ${scoring.type === 'goals' ? `<div class="form-grid" style="grid-template-columns:1fr 1fr">
            ${field({ label: `${home} (${scoring.unitLabel})`, id: 'r-home', type: 'number', value: state.home, attrs: 'min="0" inputmode="numeric" data-r="home" data-autofocus' })}
            ${field({ label: `${away} (${scoring.unitLabel})`, id: 'r-away', type: 'number', value: state.away, attrs: 'min="0" inputmode="numeric" data-r="away"' })}
          </div>
          ${knockout && isDraw && scoring.allowDraw ? `<fieldset class="card card-tight"><legend>${esc(scoring.tiebreakLabel)} — jogo eliminatório empatado</legend><div class="form-grid" style="grid-template-columns:1fr 1fr">
            ${field({ label: home, id: 'r-tbh', type: 'number', value: state.tbHome, attrs: 'min="0" data-r="tbHome"' })}${field({ label: away, id: 'r-tba', type: 'number', value: state.tbAway, attrs: 'min="0" data-r="tbAway"' })}</div></fieldset>` : ''}`
    : `<fieldset><legend>Pontuação de cada ${scoring.tennis ? 'set (em games)' : 'set'} · melhor de ${maxSets(scoring)}</legend>
            <div class="table-wrap"><table class="table sets-table"><thead><tr><th scope="col">Set</th><th scope="col">${esc(home)}</th><th scope="col">${esc(away)}</th><th scope="col"><span class="visually-hidden">Remover</span></th></tr></thead><tbody>
            ${state.sets.map((s, i) => `<tr><th scope="row">${i + 1}º</th>
              <td><label class="visually-hidden" for="s${i}h">${i + 1}º set, ${esc(home)}</label><input id="s${i}h" class="input input-compact" type="number" min="0" inputmode="numeric" value="${esc(s.home)}" data-set="${i}" data-side="home" ${i === 0 ? 'data-autofocus' : ''}></td>
              <td><label class="visually-hidden" for="s${i}a">${i + 1}º set, ${esc(away)}</label><input id="s${i}a" class="input input-compact" type="number" min="0" inputmode="numeric" value="${esc(s.away)}" data-set="${i}" data-side="away"></td>
              <td>${state.sets.length > 1 ? `<button type="button" class="btn btn-ghost btn-icon btn-sm" data-remove-set="${i}" aria-label="Remover ${i + 1}º set">${icon('trash-2')}</button>` : ''}</td></tr>`).join('')}
            </tbody></table></div>
            ${state.sets.length < maxSets(scoring) ? `<button type="button" class="btn btn-sm" style="margin-top:var(--sp-2)" data-add-set>${icon('plus')}Adicionar set</button>` : ''}
          </fieldset>`}
        <div aria-live="polite" id="r-feedback">${submitted && !ev.ok ? alertBox('danger', 'Placar inválido', `<ul>${ev.errors.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`, 'alert') : ''}
          ${ev.ok ? `<p class="field-hint">Vencedor: <strong>${ev.result.winner === 'draw' ? 'empate' : esc(ev.result.winner === 'home' ? home : away)}</strong>${scoring.type === 'sets' ? ` · ${ev.result.home} × ${ev.result.away} em sets` : ''}</p>` : ''}</div>
      </form>`;
    };

    const refresh = (dlg) => {
      const body = dlg.querySelector('.modal-body');
      const a = document.activeElement; const focusId = a && a.id;
      body.innerHTML = bodyHtml();
      if (focusId) { const el = document.getElementById(focusId); if (el) { el.focus(); } }
    };

    openDialog('main-dialog', {
      title: `Resultado · Jogo ${m.number}`,
      description: `${m.phase}${m.date ? ` · ${weekdayShort(m.date)} ${formatDateBR(m.date)} às ${toHHMM(m.start)} · ${venue} ${m.court}` : ''}`,
      body: bodyHtml(),
      footer: `${m.result ? `<button type="button" class="btn btn-ghost" data-r-action="clear">${icon('trash-2')}Apagar resultado</button>` : `<button type="button" class="btn btn-ghost" data-r-action="live">${icon('circle-play')}${m.live ? 'Desmarcar “em andamento”' : 'Marcar como em andamento'}</button>`}
        <button type="button" class="btn" data-r-action="cancel">Cancelar</button><button type="button" class="btn btn-primary" data-r-action="save">Salvar resultado</button>`,
      onMount(dlg) {
        const body = dlg.querySelector('.modal-body');
        body.addEventListener('input', (e) => {
          const el = e.target;
          if (el.dataset.r) state[el.dataset.r] = el.value;
          if (el.dataset.set !== undefined) state.sets[Number(el.dataset.set)][el.dataset.side] = el.value;
          const needsTb = scoring.type === 'goals' && knockout && scoring.allowDraw;
          if (needsTb && (el.dataset.r === 'home' || el.dataset.r === 'away')) refresh(dlg);
          else {
            const ev = evaluateResult(input(), scoring, { knockout, strict });
            const fb = $('#r-feedback');
            if (fb) fb.innerHTML = `${submitted && !ev.ok ? alertBox('danger', 'Placar inválido', `<ul>${ev.errors.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`, 'alert') : ''}${ev.ok ? `<p class="field-hint">Vencedor: <strong>${ev.result.winner === 'draw' ? 'empate' : esc(ev.result.winner === 'home' ? home : away)}</strong>${scoring.type === 'sets' ? ` · ${ev.result.home} × ${ev.result.away} em sets` : ''}</p>` : ''}`;
            const sb = $('#sb-score');
            if (sb) {
              if (scoring.type === 'goals') sb.textContent = `${state.home === '' ? '–' : state.home} : ${state.away === '' ? '–' : state.away}`;
              else {
                const w2 = state.sets.reduce((acc, s) => (s.home === '' || s.away === '' || Number(s.home) === Number(s.away) ? acc : Number(s.home) > Number(s.away) ? { h: acc.h + 1, a: acc.a } : { h: acc.h, a: acc.a + 1 }), { h: 0, a: 0 });
                sb.textContent = `${w2.h} : ${w2.a}`;
              }
            }
          }
        });
        body.addEventListener('click', (e) => {
          const b = e.target.closest('button');
          if (!b) return;
          if (b.hasAttribute('data-add-set')) { state.sets.push({ home: '', away: '' }); refresh(dlg); const last = document.getElementById(`s${state.sets.length - 1}h`); if (last) last.focus(); }
          if (b.dataset.removeSet !== undefined) { state.sets.splice(Number(b.dataset.removeSet), 1); refresh(dlg); }
        });
        body.addEventListener('submit', (e) => { e.preventDefault(); dlg.querySelector('[data-r-action="save"]').click(); });
        dlg.querySelector('.modal-footer').addEventListener('click', async (e) => {
          const b = e.target.closest('[data-r-action]');
          if (!b) return;
          const action = b.dataset.rAction;
          if (action === 'cancel') { closeDialog('main-dialog'); return; }
          if (action === 'live') {
            persist({ ...ch, matches: ch.matches.map((x) => (x.id === m.id ? { ...x, live: !m.live } : x)) });
            closeDialog('main-dialog');
            notify(m.live ? 'Jogo voltou para “agendado”.' : `Jogo ${m.number} marcado como em andamento.`);
            reload();
            return;
          }
          if (action === 'clear') {
            const deps = dependentMatchIds(m.id, ch.matches).filter((d) => ch.matches.find((x) => x.id === d)?.result);
            const ok = await confirmAction({ title: 'Apagar resultado?', message: deps.length ? `O resultado do jogo ${m.number} e ${deps.length} resultado(s) que dependem dele serão apagados.` : `O resultado do jogo ${m.number} será apagado.`, confirmLabel: 'Apagar resultado' });
            if (!ok) return;
            persist({ ...ch, matches: ch.matches.map((x) => (x.id === m.id || deps.includes(x.id) ? { ...x, result: null } : x)) }, { type: 'result', text: `Resultado do jogo ${m.number} apagado` });
            closeDialog('main-dialog');
            notify('Resultado apagado.');
            reload();
            return;
          }
          // salvar
          submitted = true;
          const ev = evaluateResult(input(), scoring, { knockout, strict });
          if (!ev.ok) { refresh(dlg); return; }
          const prevWinner = ch.matches.find((x) => x.id === m.id).result?.winner;
          const deps = dependentMatchIds(m.id, ch.matches).filter((d) => ch.matches.find((x) => x.id === d)?.result);
          let matches = ch.matches.map((x) => (x.id === m.id ? { ...x, result: ev.result, live: false } : x));
          if (prevWinner && prevWinner !== ev.result.winner && deps.length) {
            const ok = await confirmAction({ title: 'Alterar o vencedor?', message: `Mudar o vencedor do jogo ${m.number} muda quem joga as fases seguintes. ${deps.length} resultado(s) posterior(es) serão apagados.`, confirmLabel: 'Alterar e apagar posteriores' });
            if (!ok) return;
            matches = matches.map((x) => (deps.includes(x.id) ? { ...x, result: null } : x));
          }
          persist({ ...ch, matches }, { type: 'result', text: `Resultado: ${home} ${ev.result.home} × ${ev.result.away} ${away}` });
          closeDialog('main-dialog');
          const next = resolveChampionship({ ...ch, matches });
          if (next.champion && !st.champion) notify(`🏆 ${next.teamName(next.champion)} é campeão!`);
          else notify(`Resultado do jogo ${m.number} salvo. Classificação atualizada.`);
          reload();
        });
      },
    });
  }

  function openEdit(matchId) {
    const m = st.byId.get(matchId);
    if (!m) return;
    const form = { date: m.date || ch.startDate, start: m.date ? toHHMM(m.start) : ch.dayStart, court: m.court || 1, homeTeamId: m.home.kind === 'team' ? m.home.teamId : null, awayTeamId: m.away.kind === 'team' ? m.away.teamId : null };
    const duration = Number(ch.settings.matchDuration);
    const editableTeams = m.home.kind === 'team' && m.away.kind === 'team' && !m.result;
    const groupTeams = m.groupId ? ((ch.groups || []).find((g) => g.id === m.groupId)?.teamIds || []) : ch.teams.map((x) => x.id);
    const conflicts = () => {
      const start = toMinutes(form.start);
      const edited = st.matches.map((x) => (x.id !== m.id ? x : { ...x, date: form.date, start, end: start + duration, court: Number(form.court), homeTeamId: form.homeTeamId || x.homeTeamId, awayTeamId: form.awayTeamId || x.awayTeamId }));
      return validateSchedule(edited, cfg, { teamName: st.teamName, matchLabel: (x) => `Jogo ${x.number}` }).filter((i) => i.matchIds.includes(m.id));
    };
    const conflictHtml = () => {
      const list = conflicts();
      const errs = list.filter((i) => i.severity === 'error');
      if (form.homeTeamId && form.homeTeamId === form.awayTeamId) return alertBox('danger', '', 'Escolha duas equipes diferentes.', 'alert');
      return list.length === 0 ? alertBox('success', '', 'Sem conflitos com o restante da programação.')
        : alertBox(errs.length ? 'danger' : 'warning', errs.length ? 'Conflitos encontrados' : 'Avisos', `<ul>${list.map((i) => `<li>${esc(i.message)}</li>`).join('')}</ul>`);
    };
    const dates = listDates(ch.startDate, ch.endDate);
    const body = `<div class="stack">
      <div class="form-grid">
        ${field({ label: 'Data', id: 'e-date', kind: 'select', value: form.date, options: dates.map((d) => ({ value: d, label: `${weekdayShort(d)} ${formatDateBR(d)}` })), attrs: 'data-e="date" data-autofocus' })}
        ${field({ label: 'Horário de início', id: 'e-start', type: 'time', value: form.start, hint: `Duração: ${duration} min`, attrs: 'data-e="start" step="300"' })}
        ${field({ label: venue, id: 'e-court', kind: 'select', value: form.court, options: Array.from({ length: ch.courts }, (_, i) => ({ value: i + 1, label: `${venue} ${i + 1}` })), attrs: 'data-e="court"' })}
      </div>
      ${editableTeams ? `<fieldset><legend>Confronto</legend><div class="form-grid">
          ${field({ label: 'Equipe A', id: 'e-home', kind: 'select', value: form.homeTeamId, options: groupTeams.map((x) => ({ value: x, label: st.teamName(x) })), attrs: 'data-e="homeTeamId"' })}
          ${field({ label: 'Equipe B', id: 'e-away', kind: 'select', value: form.awayTeamId, options: groupTeams.map((x) => ({ value: x, label: st.teamName(x) })), attrs: 'data-e="awayTeamId"' })}
        </div><button type="button" class="btn btn-sm" data-swap>Inverter Equipe A e B</button></fieldset>`
    : `<p class="muted">${m.result ? 'O confronto não pode ser alterado depois de lançado o resultado.' : 'As equipes deste jogo são definidas pelos resultados anteriores.'}</p>`}
      <div aria-live="polite" id="e-conflicts">${conflictHtml()}</div>
    </div>`;
    openDialog('main-dialog', {
      title: `Editar jogo ${m.number}`,
      description: m.phase,
      body,
      footer: '<button type="button" class="btn" data-e-action="cancel">Cancelar</button><button type="button" class="btn btn-primary" data-e-action="save">Salvar alterações</button>',
      onMount(dlg) {
        const update = () => { $('#e-conflicts').innerHTML = conflictHtml(); };
        dlg.querySelector('.modal-body').addEventListener('input', (e) => { if (e.target.dataset.e) { form[e.target.dataset.e] = e.target.value; update(); } });
        dlg.querySelector('.modal-body').addEventListener('change', (e) => { if (e.target.dataset.e) { form[e.target.dataset.e] = e.target.value; update(); } });
        const swap = dlg.querySelector('[data-swap]');
        if (swap) swap.addEventListener('click', () => { [form.homeTeamId, form.awayTeamId] = [form.awayTeamId, form.homeTeamId]; $('#e-home').value = form.homeTeamId; $('#e-away').value = form.awayTeamId; update(); });
        dlg.querySelector('.modal-footer').addEventListener('click', async (e) => {
          const b = e.target.closest('[data-e-action]');
          if (!b) return;
          if (b.dataset.eAction === 'cancel') { closeDialog('main-dialog'); return; }
          if (form.homeTeamId && form.homeTeamId === form.awayTeamId) return;
          const errs = conflicts().filter((i) => i.severity === 'error');
          if (errs.length) {
            const ok = await confirmAction({ title: 'Salvar com conflito?', message: errs.map((x) => x.message).join(' '), confirmLabel: 'Salvar mesmo assim', tone: 'primary' });
            if (!ok) return;
          }
          const start = toMinutes(form.start);
          const patch = { date: form.date, start, end: start + duration, court: Number(form.court) };
          if (form.homeTeamId && m.home.kind === 'team') patch.home = { kind: 'team', teamId: form.homeTeamId };
          if (form.awayTeamId && m.away.kind === 'team') patch.away = { kind: 'team', teamId: form.awayTeamId };
          persist({ ...ch, matches: ch.matches.map((x) => (x.id === m.id ? { ...x, ...patch } : x)) }, { type: 'updated', text: `Jogo ${m.number} remarcado para ${formatDateBR(form.date)} às ${form.start}` });
          closeDialog('main-dialog');
          notify(`Jogo ${m.number} atualizado.`);
          reload();
        });
      },
    });
  }

  function exportCSV() {
    const rows = [...st.matches].sort((a, b) => a.number - b.number).map((m) => [
      m.number, m.date ? formatDateBR(m.date) : 'Sem horário', m.date ? `${toHHMM(m.start)}-${toHHMM(m.end)}` : '-', m.court ?? '-',
      participantLabel(m.home, m.homeTeamId, ctx), participantLabel(m.away, m.awayTeamId, ctx), m.phase, MATCH_STATUS[m.status]?.label ?? m.status, scoreText(m)]);
    const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [['Nº', 'Data', 'Horário', venue, 'Equipe A', 'Equipe B', 'Fase', 'Status', 'Placar'], ...rows].map((r) => r.map(q).join(';')).join('\r\n');
    const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${normalize(ch.name).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'campeonato'}-programacao.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    notify('Planilha CSV baixada.');
  }

  function mount(root) {
    bindTabs(root, (newTab) => {
      // troca de aba sem recarregar a página inteira (mantém o foco na aba)
      history.replaceState(null, '', `#/campeonatos/${ch.id}?aba=${newTab}`);
      S.query = parseHash().query;
      rerenderPage();
    });
    const schedRefresh = () => { const el = $('#sched-table'); if (el) el.innerHTML = scheduleTableHtml(st.matches, ctx, { venue, actions: true, issuesByMatch, filter: F }); };
    const q = $('#sched-q');
    if (q) q.addEventListener('input', () => { F.q = q.value; schedRefresh(); });
    $$('[data-sched]', root).forEach((s) => s.addEventListener('change', () => { F[s.dataset.sched] = s.value; schedRefresh(); }));
    root.addEventListener('click', async (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.result) { openResult(b.dataset.result); return; }
      if (b.dataset.edit) { openEdit(b.dataset.edit); return; }
      if (b.dataset.action === 'csv') exportCSV();
      if (b.dataset.action === 'print') { notify('Na janela de impressão, escolha a impressora ou “Salvar como PDF”.', { type: 'info' }); setTimeout(() => window.print(), 300); }
      if (b.dataset.action === 'delete') {
        const ok = await confirmAction({ title: 'Excluir campeonato?', message: `“${ch.name}” e todos os resultados serão apagados. Esta ação não pode ser desfeita.`, confirmLabel: 'Excluir campeonato' });
        if (!ok) return;
        Repo.remove(S.user.id, ch.id);
        Repo.log(S.user.id, { type: 'deleted', text: `Campeonato “${ch.name}” excluído` });
        notify('Campeonato excluído.');
        go('/campeonatos');
      }
    });
    const openId = S.query.get('jogo');
    if (openId) setTimeout(() => openResult(openId), 50);
  }

  return { title: ch.name, html, mount };
}

/* ======================================================================
 * REGRAS DOS ESPORTES
 * ====================================================================== */
function highlight(text, term) {
  if (!term) return esc(text);
  const n = normalize(text);
  const t = normalize(term);
  let out = '';
  let i = 0;
  let idx = n.indexOf(t);
  while (idx >= 0 && t) {
    out += esc(text.slice(i, idx)) + `<mark>${esc(text.slice(idx, idx + t.length))}</mark>`;
    i = idx + t.length;
    idx = n.indexOf(t, i);
  }
  return out + esc(text.slice(i));
}
const ruleText = (r) => normalize([r.body, r.document, ...Object.values(r.sections).flat(), getSport(r.sportId).name].join(' '));

function pageRules() {
  const R = S.rules;
  if (S.query.get('modalidade') && RULES.some((r) => r.sportId === S.query.get('modalidade')) && R.lastQuery !== S.query.get('modalidade')) {
    R.sel = S.query.get('modalidade');
    R.lastQuery = R.sel;
  }
  const bodyHtml = () => {
    const term = R.q.trim();
    const list = RULES.filter((r) => (R.cat === 'todos' || getSport(r.sportId).category === R.cat) && (!term || ruleText(r).includes(normalize(term))));
    if (list.length && !list.some((r) => r.sportId === R.sel)) R.sel = list[0].sportId;
    const count = `<p class="muted results-count" aria-live="polite">${list.length} de ${RULES.length} modalidades${term ? ` contêm “${esc(term)}”` : ''}</p>`;
    if (!list.length) return count + emptyState('search-x', 'Nenhuma regra encontrada', 'Tente outro termo, como “saque”, “falta” ou “prorrogação”.', '<button type="button" class="btn" data-action="rules-clear">Limpar pesquisa</button>');
    const rule = RULES.find((r) => r.sportId === R.sel);
    const sport = getSport(R.sel);
    const hits = (tabId) => RULE_SECTIONS.filter((s) => s.tab === tabId && normalize([].concat(rule.sections[s.key] ?? []).join(' ')).includes(normalize(term))).length;
    const tabs = RULE_TABS.map((t) => (term && t.id !== 'sources' && hits(t.id) ? { ...t, count: hits(t.id) } : t));
    const panel = R.tab === 'sources'
      ? `<ul class="list-plain sources">${rule.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${icon('external-link', 16)}${esc(s.label)}<span class="visually-hidden"> (abre em nova aba)</span></a><span class="muted">${esc(s.url)}</span></li>`).join('')}</ul>
        ${alertBox('info', 'Como este conteúdo é mantido', `Os textos são resumos escritos para o ArenaManager a partir das fontes acima e não substituem o documento oficial. Regulamentos de cada competição podem adaptar regras. Última revisão: ${formatDateBR(RULES_REVIEWED_AT)}.`)}`
      : `<dl class="rule-sections">${RULE_SECTIONS.filter((s) => s.tab === R.tab).map((s) => {
        const v = rule.sections[s.key];
        return `<div class="rule-section"><dt>${esc(s.label)}</dt><dd>${Array.isArray(v) ? `<ul>${v.map((x) => `<li>${highlight(x, term)}</li>`).join('')}</ul>` : `<p>${highlight(v, term)}</p>`}</dd></div>`;
      }).join('')}</dl>`;
    return `${count}<div class="rules-layout">
      <nav aria-label="Modalidades" class="rules-nav"><ul class="list-plain">${list.map((r) => `<li><button type="button" class="rules-nav-item" data-rule="${r.sportId}" ${R.sel === r.sportId ? 'aria-current="true"' : ''}><span class="rules-nav-thumb" aria-hidden="true">${sportArt(r.sportId, { decorative: true })}</span><span><strong>${esc(getSport(r.sportId).name)}</strong><span class="muted">${esc(r.bodyShort)}</span></span></button></li>`).join('')}</ul></nav>
      <article class="card rules-detail" aria-labelledby="rule-title">
        <div class="rules-detail-head">${sportArt(rule.sportId, { cls: 'rules-detail-art' })}<div>
          <h2 id="rule-title">${esc(sport.name)}</h2>
          <p class="rules-entity">${icon('landmark', 20)}<span><span class="badge badge-official no-dot">Regra oficial</span> ${esc(rule.body)}</span></p>
          <p class="muted" style="margin:0">Documento de referência: ${esc(rule.document)}. ${esc(rule.nationalBody)}.</p></div></div>
        <div class="system-suggestion" role="note" aria-label="Sugestão do sistema, não é regra oficial">${icon('settings-2', 22)}<div><span class="badge badge-suggestion no-dot">Sugestão do ArenaManager — não é regra oficial</span><p>Duração estimada para planejamento: <strong>${formatDuration(sport.defaultDuration)}</strong> por partida, editável no montador. ${esc(sport.standingsNote)}</p></div></div>
        ${tabsHtml(tabs, R.tab, `Regras de ${sport.name}`, 'rule')}
        <div role="tabpanel" id="rule-panel" aria-labelledby="rule-tab-${R.tab}" tabindex="0" class="tab-panel">${panel}</div>
        <p class="rules-foot muted">${icon('calendar-check', 14)}Revisado em ${formatDateBR(RULES_REVIEWED_AT)} · ${icon('book-open', 14)}${RULES.length} modalidades</p>
      </article></div>`;
  };
  const html = `${pageHeader('Consulta', 'Regras dos Esportes', 'Resumos das regras oficiais de cada modalidade, com a entidade responsável e as fontes. Use a busca para encontrar uma regra específica.')}
    <div class="container page-body">
      <div class="toolbar card card-tight" role="search" aria-label="Pesquisar regras">
        ${searchBox({ id: 'rules-q', value: R.q, label: 'Pesquisar modalidade ou regra', placeholder: 'Ex.: impedimento, tie-break, líbero, 24 segundos' })}
        <div class="segmented" role="group" aria-label="Filtrar por categoria">${SPORT_CATEGORIES.map((c) => `<button type="button" data-cat="${c.id}" aria-pressed="${R.cat === c.id}">${esc(c.label)}</button>`).join('')}</div>
      </div>
      <div id="rules-body">${bodyHtml()}</div>
    </div>`;
  function mount(root) {
    const refresh = () => {
      withFocus(() => { $('#rules-body').innerHTML = bodyHtml(); });
      bindTabs($('#rules-body'), (tab) => { R.tab = tab; refresh(); });
    };
    bindTabs($('#rules-body'), (tab) => { R.tab = tab; refresh(); });
    $('#rules-q').addEventListener('input', (e) => {
      R.q = e.target.value;
      const term = normalize(R.q.trim());
      if (term) {
        const rule = RULES.find((r) => r.sportId === R.sel);
        const hit = rule && RULE_SECTIONS.find((s) => normalize([].concat(rule.sections[s.key] ?? []).join(' ')).includes(term));
        if (hit) R.tab = hit.tab;
      }
      refresh();
    });
    root.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.cat) { R.cat = b.dataset.cat; $$('[data-cat]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); refresh(); }
      if (b.dataset.rule) { R.sel = b.dataset.rule; R.tab = 'overview'; refresh(); const n = $(`[data-rule="${R.sel}"]`); if (n) n.focus(); }
      if (b.dataset.action === 'rules-clear') { R.q = ''; R.cat = 'todos'; rerenderPage(); }
    });
  }
  return { title: 'Regras dos Esportes', html, mount };
}

/* ======================================================================
 * ACESSIBILIDADE
 * ====================================================================== */
function pageAccessibility() {
  const p = Prefs.data;
  const theme = p.highContrast ? PALETTE.highContrast : PALETTE[Prefs.resolvedTheme()];
  const pct = Math.round(p.fontScale * 100);
  const html = `${pageHeader('Preferências', 'Acessibilidade', 'Ajuste o ArenaManager ao seu jeito. As escolhas ficam salvas neste navegador e valem para todas as páginas.')}
    <div class="container page-body">
      <div class="a11y-grid">
        <section class="card" aria-labelledby="a-theme"><h2 id="a-theme" class="card-title">Tema</h2><p class="muted">O modo escuro tem paleta própria (não é uma inversão de cores).</p>
          <div class="segmented" role="group" aria-label="Tema de cores">${[['light', 'sun', 'Claro'], ['dark', 'moon', 'Escuro'], ['system', 'monitor', 'Do sistema']].map(([v, ic, l]) => `<button type="button" data-theme-set="${v}" aria-pressed="${p.theme === v}">${icon(ic, 16)}${l}</button>`).join('')}</div>
        </section>
        <section class="card" aria-labelledby="a-font"><h2 id="a-font" class="card-title">Tamanho da fonte</h2>
          <p class="muted" aria-live="polite">Tamanho atual: <strong>${pct}%</strong></p>
          <div class="row">
            <button type="button" class="btn" data-font="-1" ${p.fontScale <= FONT_STEPS[0] ? 'disabled' : ''}>${icon('a-arrow-down')}Diminuir fonte</button>
            <button type="button" class="btn" data-font="1" ${p.fontScale >= FONT_STEPS[FONT_STEPS.length - 1] ? 'disabled' : ''}>${icon('a-arrow-up')}Aumentar fonte</button>
            <button type="button" class="btn btn-ghost" data-font="0" ${p.fontScale === 1 ? 'disabled' : ''}>${icon('rotate-ccw')}Restaurar padrão</button>
          </div>
          <p class="field-hint">De 87,5% a 150%. O layout se reorganiza sem cortar conteúdo (WCAG 1.4.4 e 1.4.10).</p>
        </section>
        <section class="card" aria-labelledby="a-more"><h2 id="a-more" class="card-title">Visual e movimento</h2>
          <div class="stack">
            <label class="switch"><input type="checkbox" data-pref="highContrast" ${p.highContrast ? 'checked' : ''}>${icon('contrast')}Alto contraste</label>
            <label class="switch"><input type="checkbox" data-pref="reduceMotion" ${Prefs.reduceMotion() ? 'checked' : ''}>${icon('sparkles')}Reduzir animações</label>
            <label class="switch"><input type="checkbox" data-pref="strongFocus" ${p.strongFocus ? 'checked' : ''}>${icon('focus')}Destacar ainda mais o foco do teclado</label>
          </div>
          <button type="button" class="btn btn-sm" style="margin-top:var(--sp-4)" data-action="reset-prefs">${icon('rotate-ccw')}Restaurar todas as preferências</button>
        </section>
        <section class="card" aria-labelledby="a-kbd"><h2 id="a-kbd" class="card-title">${icon('keyboard', 20, 'inline-icon')}Navegação por teclado</h2>
          <p class="muted">Todo o site funciona sem mouse. O primeiro <kbd>Tab</kbd> mostra o link “Pular para o conteúdo”.</p>
          <table class="table"><caption class="visually-hidden">Atalhos de teclado</caption><thead><tr><th scope="col">Tecla</th><th scope="col">Ação</th></tr></thead><tbody>${SHORTCUTS.map(([k, d]) => `<tr><td><kbd>${esc(k)}</kbd></td><td>${esc(d)}</td></tr>`).join('')}</tbody></table>
        </section>
      </div>
      <section class="card" aria-labelledby="a-contrast" style="margin-top:var(--sp-5)"><h2 id="a-contrast" class="card-title">Contraste das cores do tema atual</h2>
        <p class="muted">Calculado ao vivo com a fórmula da WCAG 2.2. Texto precisa de 4,5:1; componentes de interface e foco, de 3:1.</p>
        <div class="table-wrap"><table class="table"><caption class="visually-hidden">Razões de contraste</caption><thead><tr><th scope="col">Uso</th><th scope="col">Amostra</th><th scope="col" class="num">Razão</th><th scope="col">Resultado</th></tr></thead><tbody>
          ${CONTRAST_PAIRS.filter(([, , min]) => min >= 3).map(([fg, bg, min, label]) => { const r = contrastRatio(theme[fg], theme[bg]); return `<tr><td>${esc(label)}</td><td><span class="contrast-sample" style="color:${theme[fg]};background:${theme[bg]};border-color:${theme.border}">Aa ${theme[fg]}</span></td><td class="num tabular">${r.toFixed(2)}:1</td><td><span class="badge ${r >= min ? 'badge-success' : 'badge-danger'}">${r >= min ? `AA (mín. ${min}:1)` : 'Abaixo'}</span></td></tr>`; }).join('')}
        </tbody></table></div>
      </section>
      <div style="margin-top:var(--sp-5)">${alertBox('info', 'Compromisso de acessibilidade', 'O ArenaManager busca atender à WCAG 2.2 nível AA: contraste mínimo, foco visível, alvos de toque de pelo menos 24 px (botões principais com 44 px), rótulos em todos os campos, mensagens de erro descritivas, estrutura de títulos, regiões nomeadas e anúncio de mudanças para leitores de tela. Encontrou uma barreira? Conte pela página de contato.')}</div>
    </div>`;
  function mount(root) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.themeSet) { Prefs.set({ theme: b.dataset.themeSet }); rerenderAll(); }
      if (b.dataset.font !== undefined) { const v = Number(b.dataset.font); if (v === 0) Prefs.set({ fontScale: 1 }); else Prefs.stepFont(v); rerenderAll(); }
      if (b.dataset.action === 'reset-prefs') { Prefs.set({ theme: 'system', fontScale: 1, highContrast: false, reduceMotion: null, strongFocus: false }); notify('Preferências restauradas.'); rerenderAll(); }
    });
    root.addEventListener('change', (e) => {
      const k = e.target.dataset.pref;
      if (k) { Prefs.set({ [k]: e.target.checked }); rerenderAll(); }
    });
  }
  return { title: 'Acessibilidade', html, mount };
}

/* ======================================================================
 * AJUDA, CONTATO E PÁGINA NÃO ENCONTRADA
 * ====================================================================== */
const FAQ = [
  ['Como o sistema calcula os horários?', 'Ele monta a grade de cada dia: cada horário tem a duração da partida e o próximo começa depois do intervalo operacional. Horários que cairiam em um descanso são empurrados para depois dele. Em seguida, coloca cada jogo, na ordem das rodadas, no primeiro horário e quadra livres em que as duas equipes já descansaram o tempo de preparação (mais o tempo de troca, se mudarem de quadra) e em que todos os jogos anteriores necessários já terminaram.'],
  ['Qual a diferença entre duração da partida e intervalo?', 'A duração é o tempo estimado do jogo. O intervalo é o tempo operacional entre um jogo e o próximo na mesma quadra (limpeza, aquecimento, troca de equipes). Com 45 min de jogo e 15 min de intervalo, os jogos começam de hora em hora.'],
  ['E se não couber tudo?', 'O sistema informa quantos jogos ficaram de fora e por quê. Depois testa alternativas (mais quadras, mais dias, horário ampliado, intervalo menor ou outro formato) e mostra só as que resolvem o problema, com um botão para aplicar.'],
  ['Posso mudar um horário depois?', 'Sim. Na aba Programação, use o lápis de cada jogo para mudar data, horário, quadra e, nos jogos de grupo ou pontos corridos, o confronto. O sistema mostra na hora se a mudança cria conflito.'],
  ['Como funcionam os pontos de classificação?', 'Cada modalidade tem um padrão, que pode ser alterado na etapa 3. O vôlei segue o padrão FIVB (3–0 ou 3–1 vale 3 pontos; 3–2 vale 2 e 1). O desempate considera vitórias, saldo, pontos marcados e confronto direto.'],
  ['Como gero o PDF da programação?', 'Na aba Programação, clique em PDF ou Imprimir. Na janela de impressão do navegador, escolha “Salvar como PDF”. A página de impressão mostra só a tabela, sem menus.'],
  ['Onde ficam meus dados?', 'No próprio navegador (localStorage). Contas e campeonatos valem só neste computador e navegador; limpar os dados do navegador apaga tudo. A senha não é guardada: guarda-se apenas um código derivado dela (hash PBKDF2).'],
];

function pageHelp() {
  const html = `${pageHeader('Ajuda e documentação', 'Como usar o ArenaManager', 'Perguntas frequentes e a explicação do montador automático.')}
    <div class="container page-body help-layout">
      <section aria-labelledby="faq-title"><h2 id="faq-title">Perguntas frequentes</h2>
        <div class="faq">${FAQ.map(([q, a]) => `<details class="card card-tight"><summary>${icon('circle-help', 20)}${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
      </section>
      <aside class="card" aria-labelledby="quick-title"><h2 id="quick-title" class="card-title">Primeiros passos</h2>
        <ol class="how-steps compact"><li><strong>Crie sua conta</strong><span>Leva menos de um minuto.</span></li><li><strong>Abra o montador</strong><span>Ou use “Preencher com exemplo”.</span></li><li><strong>Gere e salve</strong><span>Revise a prévia e aplique sugestões.</span></li><li><strong>Lance resultados</strong><span>A classificação se atualiza sozinha.</span></li></ol>
        <a href="#/campeonatos/novo" class="btn btn-primary btn-block">Abrir o montador</a>
      </aside>
    </div>`;
  return { title: 'Ajuda', html };
}

const SUBJECTS = ['Dúvida sobre o montador', 'Problema técnico', 'Acessibilidade', 'Sugestão de melhoria', 'Outro assunto'];
function pageContact() {
  const f = formState('contact', { name: S.user?.name ?? '', email: S.user?.email ?? '', subject: '', message: '' });
  const html = `${pageHeader('Fale conosco', 'Contato', 'Dúvidas, sugestões ou problemas? Deixe sua mensagem.')}
    <div class="container page-body contact-layout">
      ${f.done ? `<div class="card stack" role="status"><div class="card-icon accent">${icon('circle-check', 22)}</div><h2>Mensagem recebida</h2>
          <p>Obrigado, ${esc(f.values.name.split(' ')[0])}! Seu protocolo é <strong class="tabular">${esc(f.done)}</strong>. A mensagem ficou registrada neste navegador.</p>
          <div class="row"><button type="button" class="btn" data-action="contact-new">Enviar outra mensagem</button><a href="#/" class="btn btn-ghost">Voltar ao início</a></div></div>`
    : `<form class="card stack" id="contact-form" novalidate aria-labelledby="contact-title"><h2 id="contact-title" class="card-title">Envie sua mensagem</h2>
          ${Object.keys(f.errors).length ? alertBox('danger', '', `Corrija ${Object.keys(f.errors).length} campo(s) destacado(s).`, 'alert') : ''}
          <div class="form-grid">
            ${field({ label: 'Nome', id: 'c-name', name: 'name', value: f.values.name, error: f.errors.name, required: true, attrs: 'autocomplete="name"' })}
            ${field({ label: 'E-mail', id: 'c-email', name: 'email', type: 'email', value: f.values.email, error: f.errors.email, required: true, attrs: 'autocomplete="email"' })}
            ${field({ label: 'Assunto', id: 'c-subject', name: 'subject', kind: 'select', value: f.values.subject, error: f.errors.subject, required: true, cls: 'span-2', options: [{ value: '', label: 'Selecione…' }, ...SUBJECTS.map((s) => ({ value: s, label: s }))] })}
            ${field({ label: 'Mensagem', id: 'c-message', name: 'message', kind: 'textarea', value: f.values.message, error: f.errors.message, required: true, cls: 'span-2', hint: `${f.values.message.length}/2000 caracteres`, attrs: 'maxlength="2000"' })}
          </div>
          <button type="submit" class="btn btn-primary btn-lg">${icon('send')}Enviar mensagem</button></form>`}
      <aside class="card contact-aside"><h2 class="card-title">Antes de escrever</h2>
        <ul class="list-plain stack"><li><a href="#/ajuda">Ajuda e documentação</a><span class="muted"> — como funciona o montador e o algoritmo.</span></li><li><a href="#/regras">Regras dos esportes</a><span class="muted"> — dúvidas sobre pontuação e duração.</span></li><li><a href="#/acessibilidade">Acessibilidade</a><span class="muted"> — tema, fonte e atalhos.</span></li></ul>
      </aside>
    </div>`;
  function mount(root) {
    root.addEventListener('click', (e) => { if (e.target.closest('[data-action="contact-new"]')) { f.done = null; f.values.subject = ''; f.values.message = ''; rerenderPage(); } });
    const form = $('#contact-form');
    if (!form) return;
    form.message.addEventListener('input', () => { const h = $('#c-message-hint'); if (h) h.textContent = `${form.message.value.length}/2000 caracteres`; });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = readForm(form);
      f.values = { name: v.name, email: v.email, subject: v.subject, message: v.message };
      f.errors = {};
      if (v.name.trim().length < 2) f.errors.name = 'Informe seu nome.';
      if (!EMAIL_RE.test(v.email.trim())) f.errors.email = 'Informe um e-mail válido, como nome@escola.com.br.';
      if (!v.subject) f.errors.subject = 'Escolha um assunto.';
      if (v.message.trim().length < 10) f.errors.message = 'Escreva pelo menos 10 caracteres.';
      if (Object.keys(f.errors).length) { rerenderPage(); focusFirstError(f); return; }
      const protocol = `AM-${Date.now().toString(36).toUpperCase()}`;
      const list = readJSON('messages', []);
      list.push({ ...f.values, protocol, createdAt: new Date().toISOString() });
      writeJSON('messages', list);
      f.done = protocol;
      notify('Mensagem enviada!');
      rerenderPage();
    });
  }
  return { title: 'Contato', html, mount };
}

function pageNotFound() {
  return { title: 'Página não encontrada', html: `<div class="container page-body"><div class="empty" style="margin-top:var(--sp-7)">${icon('compass', 48, 'empty-icon')}<h1 style="margin:0">Fora da quadra!</h1><p>Não encontramos esta página. Ela pode ter mudado de endereço.</p><div class="row" style="justify-content:center"><a href="#/" class="btn btn-primary">Ir para o início</a><a href="#/ajuda" class="btn">Ajuda</a></div></div></div>` };
}

/* ======================================================================
 * ROTEADOR (endereços com #, funcionam abrindo o arquivo direto)
 * ====================================================================== */
const ROUTES = [
  [/^\/$/, pageHome],
  [/^\/entrar$/, pageLogin],
  [/^\/cadastro$/, pageRegister],
  [/^\/recuperar-senha$/, pageForgot],
  [/^\/redefinir-senha$/, pageReset],
  [/^\/painel$/, pageDashboard, true],
  [/^\/campeonatos$/, pageChampionships, true],
  [/^\/campeonatos\/novo$/, pageWizard, true],
  [/^\/campeonatos\/([^/]+)\/editar$/, pageWizard, true],
  [/^\/campeonatos\/([^/]+)$/, pageDetail, true],
  [/^\/regras$/, pageRules],
  [/^\/acessibilidade$/, pageAccessibility],
  [/^\/ajuda$/, pageHelp],
  [/^\/contato$/, pageContact],
];

let currentPage = null;
let lastPath = null;

function parseHash() {
  const raw = decodeURIComponent(location.hash.replace(/^#/, '')) || '/';
  const [path, qs] = raw.split('?');
  return { path: path.startsWith('/') ? path : '/', query: new URLSearchParams(qs || '') };
}

function resolvePage() {
  for (const [re, fn, needsAuth] of ROUTES) {
    const m = S.path.match(re);
    if (!m) continue;
    if (needsAuth && !S.user) {
      S.redirectAfterLogin = S.path;
      return pageLogin();
    }
    return fn(m.slice(1));
  }
  return pageNotFound();
}

/** Desenha a página inteira (cabeçalho + conteúdo + rodapé). */
function renderShell(page) {
  const app = $('#app');
  app.innerHTML = `${headerHtml()}${bannersHtml()}<main id="conteudo" tabindex="-1"><div id="page">${page.html}</div></main>${footerHtml()}`;
  document.title = page.title ? `${page.title} · ArenaManager` : 'ArenaManager';
  if (page.mount) page.mount($('#page'));
}

function route() {
  const { path, query } = parseHash();
  const changed = path !== lastPath;
  if (changed && currentPage && currentPage.onLeave) currentPage.onLeave();
  if (changed && S.wizard && !path.startsWith('/campeonatos/novo') && !path.endsWith('/editar')) S.wizard = null;
  if (changed) S.forms = {};
  S.path = path;
  S.query = query;
  S.menuOpen = false;
  const hasDialogOpen = $$('dialog[open]').length;
  if (hasDialogOpen) $$('dialog[open]').forEach((d) => d.close());
  currentPage = resolvePage();
  renderShell(currentPage);
  if (changed && lastPath !== null) {
    window.scrollTo(0, 0);
    $('#conteudo').focus({ preventScroll: true });
  }
  lastPath = path;
}

/** Redesenha só o conteúdo da página atual (mantendo o foco quando possível). */
function rerenderPage() {
  currentPage = resolvePage();
  withFocus(() => {
    const page = $('#page');
    page.innerHTML = currentPage.html;
    document.title = currentPage.title ? `${currentPage.title} · ArenaManager` : 'ArenaManager';
    if (currentPage.mount) {
      const fresh = page.cloneNode(true); // remove ouvintes antigos
      page.replaceWith(fresh);
      currentPage.mount(fresh);
    }
  });
}
function rerenderAll() {
  currentPage = resolvePage();
  withFocus(() => renderShell(currentPage));
}

function openShortcuts() {
  openDialog('main-dialog', {
    title: 'Atalhos de teclado',
    description: 'Use o ArenaManager sem mouse.',
    body: `<table class="table"><caption class="visually-hidden">Atalhos disponíveis</caption><thead><tr><th scope="col">Tecla</th><th scope="col">Ação</th></tr></thead><tbody>${SHORTCUTS.map(([k, d]) => `<tr><td><kbd>${esc(k)}</kbd></td><td>${esc(d)}</td></tr>`).join('')}</tbody></table>
      <p class="muted" style="margin-top:var(--sp-3)">Mais opções na <a href="#/acessibilidade">página de acessibilidade</a>.</p>`,
  });
}

/* ======================================================================
 * INICIALIZAÇÃO
 * ====================================================================== */
function init() {
  Prefs.apply();
  S.user = Auth.current();
  setupDialog('main-dialog');
  setupDialog('confirm-dialog', () => answerConfirm(false));

  // cliques globais (cabeçalho, links internos, senha)
  document.addEventListener('click', async (e) => {
    const scrollLink = e.target.closest('[data-scroll]');
    if (scrollLink) { e.preventDefault(); const t = document.getElementById(scrollLink.dataset.scroll); if (t) { t.scrollIntoView({ behavior: Prefs.reduceMotion() ? 'auto' : 'smooth' }); t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); } return; }
    const skip = e.target.closest('.skip-link');
    if (skip) { e.preventDefault(); $('#conteudo').focus(); return; }
    const b = e.target.closest('[data-action]');
    if (!b) return;
    switch (b.dataset.action) {
      case 'menu': S.menuOpen = !S.menuOpen; withFocus(() => { $('.site-header').outerHTML = headerHtml(); }); break;
      case 'toggle-theme': Prefs.set({ theme: Prefs.resolvedTheme() === 'dark' ? 'light' : 'dark' }); withFocus(() => { $('.site-header').outerHTML = headerHtml(); }); if (S.path === '/acessibilidade') rerenderPage(); break;
      case 'shortcuts': openShortcuts(); break;
      case 'logout': Auth.logout(); S.user = null; S.wizard = null; notify('Você saiu da sua conta.'); go('/'); break;
      case 'toggle-password': {
        const input = document.getElementById(b.dataset.target);
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        b.setAttribute('aria-pressed', String(show));
        b.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
        b.innerHTML = icon(show ? 'eye-off' : 'eye');
        break;
      }
      default: break;
    }
  });

  // atalhos de teclado
  document.addEventListener('keydown', (e) => {
    const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable;
    if (e.key === 'Escape' && S.menuOpen) { S.menuOpen = false; $('.site-header').outerHTML = headerHtml(); $('.menu-toggle').focus(); return; }
    if ($$('dialog[open]').length) return;
    if (e.key === '?' && !typing) { e.preventDefault(); openShortcuts(); }
    if (e.key === '/' && !typing) { const s = $('[data-search]'); if (s) { e.preventDefault(); s.focus(); } }
    if (e.altKey && (e.key === 'n' || e.key === 'N')) { e.preventDefault(); go(S.user ? '/campeonatos/novo' : '/entrar'); }
    if (e.altKey && (e.key === 't' || e.key === 'T')) { e.preventDefault(); $('[data-action="toggle-theme"]').click(); }
  });

  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', () => { if (Prefs.data.theme === 'system') { Prefs.apply(); rerenderAll(); } });
  }
  window.addEventListener('hashchange', route);
  route();
}


/* Inicia a aplicação no navegador */
if (typeof document !== 'undefined' && document.getElementById('app')) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}

/* Exporta as regras de negócio quando o arquivo é carregado no Node.js (testes) */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    roundRobinRounds, generateFixture, seedOrder, summarizeFormat, distributeGroups, validateFormatOptions,
    scheduleMatches, buildDailySlots, normalizeScheduleConfig, validateSchedule, capacityOf,
    planChampionship, absoluteMinutes, toMinutes, overlaps, evaluateResult, validateSet,
    computeStandings, resolveChampionship, dependentMatchIds, getSport, sha256Hex,
  };
}
})();
