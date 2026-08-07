export type LessonStatus = "pendente" | "andamento" | "concluido";

export type Lesson = {
  id: string;
  title: string;
  seconds: number;
  optional?: boolean;
  soon?: boolean;
  material?: string;
};

export type Topic = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Module = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  topics: Topic[];
};

export const COURSE_TITLE = "Curso de Product Management";

export const MODULES: Module[] = [
  {
    id: "m1",
    title: "Módulo 1 - A área de Produto e seu papel no Negócio",
    description: "Explore os fundamentos da área de Produto, o papel do PM no negócio, ciclos de vida, times e cultura para gerar impacto real.",
    deadline: "2026-02-11",
    topics: [
      {
        id: "m1t1",
        title: "Onboarding",
        lessons: [
          { id: "l1", title: "1. Sua primeira atividade prática!", seconds: 93, material: "Prompt: sua primeira atividade prática", },
        ],
      },
      {
        id: "m1t2",
        title: "O Product Manager que impacta em resultados",
        lessons: [
          { id: "l2", title: "1. Por que contratamos pessoas de produto?", seconds: 856, },
          { id: "l3", title: "2. Outputs e Outcomes", seconds: 589, },
          { id: "l4", title: "Artigo: Outcomes e Outputs: A Diferença Crucial para o Product Manager", seconds: 420, },
          { id: "l5", title: "3. Focando em resultados", seconds: 1215, },
          { id: "l6", title: "4. Meios de ação", seconds: 1140, },
          { id: "l7", title: "5. Papo com a liderança: o que é esperado de um PM que gera impacto?", seconds: 0, soon: true, },
        ],
      },
      {
        id: "m1t3",
        title: "Fundamentos de produto",
        lessons: [
          { id: "l8", title: "1. O que é um produto digital", seconds: 557, },
          { id: "l9", title: "2. O que é gestão de produtos", seconds: 637, },
          { id: "l10", title: "3. Ciclo de vida de produto", seconds: 695, },
          { id: "l11", title: "4. Como gerir o ciclo de vida do produto​", seconds: 1004, },
        ],
      },
      {
        id: "m1t4",
        title: "Times de Produto",
        lessons: [
          { id: "l12", title: "1. Introdução a times de produto", seconds: 1206, },
          { id: "l13", title: "Artigo: Princípios de bons times de Produto", seconds: 420, },
          { id: "l14", title: "2. Papéis dentro de um time de produto", seconds: 753, material: "Template - Mapeamento de dependência", },
          { id: "l15", title: "3.Diferentes maneiras de organizar o time de produto", seconds: 540, material: "Exemplo de estrutura - Grupo Boticario", },
          { id: "l16", title: "4. Escalando times de produto", seconds: 1473, },
          { id: "l17", title: "5. Case Creditas: mudando a cultura de produto", seconds: 774, },
          { id: "l18", title: "6. Times ruins vs times bons de produto", seconds: 538, },
        ],
      },
      {
        id: "m1t5",
        title: "Transformação Digital e a Cultura de Produto",
        lessons: [
          { id: "l19", title: "1. Tipos de empresas", seconds: 774, },
          { id: "l20", title: "Artigo: AI Natives: Empresas, Cultura de Produto e a Transformação Digital", seconds: 420, },
          { id: "l21", title: "2. Cultura de Produto", seconds: 673, },
          { id: "l22", title: "3. Princípios: Entregas rápidas e frequentes", seconds: 1285, },
          { id: "l23", title: "4. Princípios: Foco no problema", seconds: 869, },
          { id: "l24", title: "5. Principios: Entrega de resultado", seconds: 1141, },
          { id: "l25", title: "6. Princípios: Mentalidade de ecossistema", seconds: 555, },
          { id: "l26", title: "7. Transformação Digital", seconds: 1112, },
          { id: "l27", title: "8. Mentalidade de produto", seconds: 943, },
          { id: "l28", title: "9. Oportunidades e intervenções", seconds: 763, },
        ],
      },
    ],
  },
  {
    id: "m2",
    title: "Módulo 2 - Product Market Fit",
    description: "Explore Product Market Fit por meio de pesquisa de mercado, modelos de negócio, proposta de valor, riscos e uso de IA para decisões mais assertivas.",
    deadline: "2026-03-23",
    topics: [
      {
        id: "m2t1",
        title: "Pesquisa de Mercado",
        lessons: [
          { id: "l29", title: "Artigo: Modelos de negócio", seconds: 420, },
          { id: "l30", title: "1. Fundamentos sobre pesquisa de mercado", seconds: 562, },
          { id: "l31", title: "2. Estimando o mercado", seconds: 378, },
          { id: "l32", title: "3. Estruturando a pesquisa de mercado com IA", seconds: 668, },
          { id: "l33", title: "4. Fechando análise e gerando insights", seconds: 362, },
          { id: "l34", title: "5. Case Soccer Punch - Parte 1", seconds: 1007, },
          { id: "l35", title: "6. Case Soccer Punch - Parte 2", seconds: 1342, },
        ],
      },
      {
        id: "m2t2",
        title: "Business Model Canvas & Proposta de Valor",
        lessons: [
          { id: "l36", title: "1. Passo a Passo do Business Model Canvas", seconds: 978, material: "Template - Business e Lean Model Canvas", },
          { id: "l37", title: "3. Riscos", seconds: 225, material: "Template - Business Model Canvas", },
          { id: "l38", title: "4. Proposta de Valor", seconds: 898, },
        ],
      },
      {
        id: "m2t3",
        title: "Bônus: BMC e Lean Canvas com IA Generativa",
        lessons: [
          { id: "l39", title: "1. BMC e Lean Canvas: Contextos", seconds: 170, },
          { id: "l40", title: "2. Como Funciona: Fundamentos", seconds: 255, },
          { id: "l41", title: "3. Aplicando na prática: parte 1", seconds: 279, },
          { id: "l42", title: "4. Aplicando na prática: parte 2", seconds: 579, },
          { id: "l43", title: "5. Gerando valor com o BMC no dia a dia", seconds: 156, },
        ],
      },
      {
        id: "m2t4",
        title: "Bônus - Dinâmica de negócio de marketplaces",
        lessons: [
          { id: "l44", title: "1. Marketplace", seconds: 739, },
        ],
      },
      {
        id: "m2t5",
        title: "Os \"fits\" de Produto",
        lessons: [
          { id: "l45", title: "1. Introdução", seconds: 1214, },
          { id: "l46", title: "2. Por onde começar?", seconds: 1208, },
          { id: "l47", title: "3. Como atacar o problema?", seconds: 1130, },
          { id: "l48", title: "4. Como medir PMF", seconds: 1022, },
          { id: "l49", title: "5. E se der errado?", seconds: 876, },
        ],
      },
      {
        id: "m2t6",
        title: "Exemplos de estratégias de mitigação de risco",
        lessons: [
          { id: "l50", title: "Artigo: Riscos em Produtos e Negócios", seconds: 420, },
          { id: "l51", title: "1. Risco de Valor", seconds: 1436, },
          { id: "l52", title: "2. Risco de Negócio", seconds: 1626, },
          { id: "l53", title: "3. Riscos de Usabilidade", seconds: 1201, },
          { id: "l54", title: "4. Risco de Viabilidade", seconds: 993, },
        ],
      },
      {
        id: "m2t7",
        title: "Acelerando a mitigação de riscos com IA",
        lessons: [
          { id: "l55", title: "1. Como a IA pode ajudar com os riscos", seconds: 677, },
          { id: "l56", title: "2. Com a IA surgem novos riscos", seconds: 230, },
          { id: "l57", title: "3. Case: Deep Research com IA", seconds: 649, material: "Template: Prompt para desk research", },
          { id: "l58", title: "4. Tipos de Experimentos", seconds: 220, },
          { id: "l59", title: "5. Case: Lovable e Pipefy", seconds: 326, },
          { id: "l60", title: "Artigo - Conceitos, diferenças e exemplos PoC, MVP e Protótipo", seconds: 900, },
        ],
      },
      {
        id: "m2t8",
        title: "Desafio prático",
        lessons: [
          { id: "l61", title: "Parte 1: Direcionamento e leitura de contexto do produto", seconds: 0, optional: true, material: "Para conquistar o Certificado de Menção Honrosa, basta concluir e enviar o desafio prático.", },
        ],
      },
    ],
  },
  {
    id: "m3",
    title: "Módulo 3 - Discovery na era da IA",
    description: "Desenvolva oportunidades de produto da descoberta à validação, explorando ideação, soluções, UX e experimentos.",
    deadline: "2026-06-01",
    topics: [
      {
        id: "m3t1",
        title: "Encontrando e avaliando oportunidades",
        lessons: [
          { id: "l62", title: "1. A diferença entre ideias, problemas e oportunidades", seconds: 853, },
          { id: "l63", title: "2. Como encontrar oportunidades e Jobs to be done", seconds: 936, },
          { id: "l64", title: "3. Características de um Job bem definido", seconds: 1289, },
          { id: "l65", title: "4. Imersão no problema e técnicas", seconds: 903, },
          { id: "l66", title: "5. Case Involves: Matriz CSD", seconds: 895, material: "Matriz CSD", },
          { id: "l67", title: "6. Case Involves: Montando a entrevista", seconds: 671, material: "Modelo de Entrevista - Miro", },
          { id: "l68", title: "7. Estruturando aprendizados", seconds: 712, },
          { id: "l69", title: "8. Organizando oportunidades na Árvore de Oportunidades", seconds: 365, },
          { id: "l70", title: "9. Triangulação de pesquisa", seconds: 304, },
          { id: "l71", title: "10. Quais problemas valem a pena serem resolvidos", seconds: 658, },
        ],
      },
      {
        id: "m3t2",
        title: "Ideando e definindo soluções",
        lessons: [
          { id: "l72", title: "1. Tecnologia, colaboração e criatividade", seconds: 692, },
          { id: "l73", title: "2. Técnicas de ideação: How might we", seconds: 670, },
          { id: "l74", title: "3. Gerando perguntas HMW", seconds: 963, },
          { id: "l75", title: "4. Técnicas de ideação: Crazy8", seconds: 278, },
          { id: "l76", title: "5. Soluções concorrentes", seconds: 918, },
          { id: "l77", title: "6. A mentalidade do MVP", seconds: 842, },
          { id: "l78", title: "7. De protótipos a sistemas funcionais com IA", seconds: 513, },
          { id: "l79", title: "8. Case: ContaMais.ai", seconds: 1017, },
        ],
      },
      {
        id: "m3t3",
        title: "Validação, Iteração & Dicas Finais",
        lessons: [
          { id: "l80", title: "1. O que tem valor de verdade na validação?", seconds: 517, },
          { id: "l81", title: "2. A pirâmide do sacrifício", seconds: 715, },
          { id: "l82", title: "3.Construindo com Lovable para validar ideias: parte 1", seconds: 1132, },
          { id: "l83", title: "4.Construindo com Lovable para validar ideias: parte 2", seconds: 514, },
          { id: "l84", title: "5. Case Involves: Validação através do protótipo", seconds: 1024, },
          { id: "l85", title: "6. Case Involves: Prompt de refinamento", seconds: 1237, },
          { id: "l86", title: "7. Case Involves: Implementações e ajustes finais", seconds: 316, },
          { id: "l87", title: "8. Prática bônus: App já existente", seconds: 296, },
          { id: "l88", title: "9. Iterando e dicas finais", seconds: 646, },
        ],
      },
      {
        id: "m3t4",
        title: "Fundamentos de UX",
        lessons: [
          { id: "l89", title: "1. O que é experiência", seconds: 577, },
          { id: "l90", title: "2. Elementos e metodologias para o design da experiência", seconds: 769, },
        ],
      },
      {
        id: "m3t5",
        title: "Bônus: Como um PM e UX trabalham juntos",
        lessons: [
          { id: "l91", title: "1. O papel do profissional de UX", seconds: 411, },
          { id: "l92", title: "2. Case Creditas", seconds: 1301, },
          { id: "l93", title: "3. Contribuições para o delivery e casos de uso para inspiração", seconds: 635, },
        ],
      },
      {
        id: "m3t6",
        title: "Jornada do Usuário",
        lessons: [
          { id: "l94", title: "1. Jornada do cliente", seconds: 1069, },
          { id: "l95", title: "2. Encontre a jornada", seconds: 1864, },
          { id: "l96", title: "3. Onboarding", seconds: 845, },
          { id: "l97", title: "4. Dicas para desenhar o onboarding", seconds: 610, },
        ],
      },
      {
        id: "m3t7",
        title: "Artigo Bônus",
        lessons: [
          { id: "l98", title: "Ferramentas com IA para potencializar o Discovery remoto", seconds: 900, },
        ],
      },
    ],
  },
  {
    id: "m4",
    title: "Módulo 4 - Dados e Analytics",
    description: "Domine métricas, dados e experimentos para tomar decisões de produto mais seguras, usando analytics, testes A/B e IA orientados a impacto.",
    deadline: "2026-07-11",
    topics: [
      {
        id: "m4t1",
        title: "Lidando com métricas de negócio e produto",
        lessons: [
          { id: "l99", title: "1. Introdução a métricas", seconds: 949, },
          { id: "l100", title: "2. Principais métricas - Parte 1", seconds: 1121, },
          { id: "l101", title: "3. Principais métricas - Parte 2", seconds: 586, },
          { id: "l102", title: "4. Frameworks de métricas", seconds: 425, },
          { id: "l103", title: "5. Métricas no dia-a-dia", seconds: 786, },
        ],
      },
      {
        id: "m4t2",
        title: "Como usar dados para tomar decisões",
        lessons: [
          { id: "l104", title: "1. Papel de Business Intelligence", seconds: 985, },
          { id: "l105", title: "2. Case: ordenação de loja de pedidos", seconds: 749, },
          { id: "l106", title: "3. Estrutura e perfil do time de dados", seconds: 544, },
        ],
      },
      {
        id: "m4t3",
        title: "Bônus - Case Tempo: Análise de dados com IA",
        lessons: [
          { id: "l107", title: "1. Entendendo o contexto da Tempo", seconds: 577, },
          { id: "l108", title: "2. O produto Zoe", seconds: 761, },
          { id: "l109", title: "3. Zoe: visão de Produto, Tecnologia e Operações", seconds: 444, },
          { id: "l110", title: "4. Etapas de criação de um produto com IA", seconds: 681, },
          { id: "l111", title: "5. Homologação e GO para Produção: como foi o processo", seconds: 498, },
          { id: "l112", title: "6. O valor do produto para o negócio e o que vem a seguir", seconds: 343, },
        ],
      },
      {
        id: "m4t4",
        title: "Testes A/B",
        lessons: [
          { id: "l113", title: "1. Introdução", seconds: 905, },
          { id: "l114", title: "2. Etapas de um Teste A/B - parte 1", seconds: 1057, },
          { id: "l115", title: "3. Etapas de um Teste A/B - parte 2", seconds: 776, },
          { id: "l116", title: "4. Boas práticas para seu Teste A/B", seconds: 622, },
          { id: "l117", title: "5. Como interpretar e comunicar resultados", seconds: 502, },
        ],
      },
      {
        id: "m4t5",
        title: "Artigo Bônus",
        lessons: [
          { id: "l118", title: "1. Ferramentas de analytics no dia a dia", seconds: 600, },
        ],
      },
      {
        id: "m4t6",
        title: "Desafio prático",
        lessons: [
          { id: "l119", title: "Parte 2: Discovery, validação e aprendizado orientado a dados", seconds: 0, optional: true, material: "Para conquistar o Certificado de Menção Honrosa, basta concluir e enviar o desafio prático.", },
        ],
      },
    ],
  },
  {
    id: "m5",
    title: "Módulo 5 - Estratégia e Liderança",
    description: "Desenvolva visão e liderança de produto para alinhar estratégia, decisões e times ao negócio.",
    deadline: "2026-08-20",
    topics: [
      {
        id: "m5t1",
        title: "Papel da Liderança de Produto",
        lessons: [
          { id: "l120", title: "1. Quem é a Liderança de Produto", seconds: 783, material: "Template - SWOT", },
          { id: "l121", title: "Artigo: Princípios e valores de uma liderança de produto eficaz", seconds: 420, material: "Template - Mapa de Empatia", },
          { id: "l122", title: "2. Principais Responsabilidades - Definir ou evoluir visão", seconds: 943, material: "Temlate - Persona", },
          { id: "l123", title: "3. Ferramentas para liderar times de produto", seconds: 1446, },
          { id: "l124", title: "4. Gestão de relacionamento e Combinados", seconds: 758, },
        ],
      },
      {
        id: "m5t2",
        title: "Estratégia e visão do Produto",
        lessons: [
          { id: "l125", title: "1. Estratégia vs Visão", seconds: 962, },
          { id: "l126", title: "2. Estratégia boa vs Estratégia ruim", seconds: 991, },
          { id: "l127", title: "3. Passo-a-passo da estratégia", seconds: 1081, },
          { id: "l128", title: "Artigo: Usando OKR no dia a dia", seconds: 420, },
        ],
      },
      {
        id: "m5t3",
        title: "Roadmap de Produto",
        lessons: [
          { id: "l129", title: "1. O que é um roadmap?", seconds: 428, },
          { id: "l130", title: "2. Desenvolvendo um roadmap", seconds: 638, },
          { id: "l131", title: "3. Tipos de Roadmap", seconds: 521, },
          { id: "l132", title: "4. Planejar orientado à resultados", seconds: 331, },
        ],
      },
    ],
  },
  {
    id: "m6",
    title: "Módulo 6 - Dia a dia de produto",
    description: "Aplique metodologias ágeis no dia a dia, com técnicas de priorização, gestão de stakeholders, especificação, rollout e casos práticos com IA.",
    deadline: "2026-09-29",
    topics: [
      {
        id: "m6t1",
        title: "Metodologias ágeis",
        lessons: [
          { id: "l133", title: "1. Introdução", seconds: 882, },
          { id: "l134", title: "2. Scrum", seconds: 960, },
          { id: "l135", title: "3. Kanban", seconds: 865, },
          { id: "l136", title: "4. Agilidade na prática - parte 1", seconds: 733, },
          { id: "l137", title: "5. Agilidade na prática - parte 2", seconds: 1016, },
          { id: "l138", title: "6. Fechamento", seconds: 361, },
        ],
      },
      {
        id: "m6t2",
        title: "Ágil no Dia a dia",
        lessons: [
          { id: "l139", title: "1.1 Introdução", seconds: 665, },
          { id: "l140", title: "1.2 Pensamento Sistêmico", seconds: 506, },
          { id: "l141", title: "1.3 Eficácia", seconds: 1270, },
          { id: "l142", title: "1.4 Eficiência", seconds: 693, },
          { id: "l143", title: "1.5 Fechamento", seconds: 482, },
        ],
      },
      {
        id: "m6t3",
        title: "Técnicas de priorização",
        lessons: [
          { id: "l144", title: "1. Técnicas de priorização", seconds: 694, },
          { id: "l145", title: "2. Frameworks de priorização: MoSCoW", seconds: 655, },
          { id: "l146", title: "3. Frameworks de priorização: Portfólio de investimentos", seconds: 449, },
          { id: "l147", title: "4. Frameworks de priorização: Matriz PICK", seconds: 330, },
          { id: "l148", title: "5. Frameworks de priorização: ICE e RICE Score", seconds: 387, },
          { id: "l149", title: "6. Frameworks de priorização: Kano Model", seconds: 609, },
          { id: "l150", title: "7. Priorização de hipóteses ou dores do usuário", seconds: 686, },
          { id: "l151", title: "8. Boas práticas para priorização", seconds: 976, },
        ],
      },
      {
        id: "m6t4",
        title: "Bônus - Case Logbit: Priorização de Backlog com IA",
        lessons: [
          { id: "l152", title: "1. Case Logbit: o que fizemos por aqui", seconds: 954, },
          { id: "l153", title: "2. Case Logbit: resultados alcançados", seconds: 215, },
          { id: "l154", title: "3. Case Logbit: entendendo o fluxo", seconds: 638, },
          { id: "l155", title: "4. Case Logbit: próximos passos", seconds: 466, },
        ],
      },
      {
        id: "m6t5",
        title: "Especificações de requerimentos e rollout",
        lessons: [
          { id: "l156", title: "1. Working Backward", seconds: 1098, },
          { id: "l157", title: "2. Specs", seconds: 1165, },
          { id: "l158", title: "3. Pós release", seconds: 479, },
          { id: "l159", title: "4. Lançamento", seconds: 557, },
          { id: "l160", title: "Artigo: User Stories: como escrever boas histórias de usuário", seconds: 420, },
        ],
      },
      {
        id: "m6t6",
        title: "Stakeholders: Mapeamento e buy-in",
        lessons: [
          { id: "l161", title: "1. O que são organizações?", seconds: 318, },
          { id: "l162", title: "2. Mapeamento de Stakeholders", seconds: 833, },
          { id: "l163", title: "3. Exercício: um novo olhar para a RACI", seconds: 274, },
          { id: "l164", title: "4. Como conquistar o buy-in?", seconds: 336, },
          { id: "l165", title: "5. Co-criação: gerando buy-in com dois cases", seconds: 539, },
          { id: "l166", title: "6. Exercício: Qual é o caminho do seu buy-in?", seconds: 356, },
        ],
      },
      {
        id: "m6t7",
        title: "Gestão de Stakeholders: Negociação e Conflitos",
        lessons: [
          { id: "l167", title: "1. A negociação no centro da vida do PM", seconds: 767, },
          { id: "l168", title: "2. Transforme seu mindset", seconds: 420, },
          { id: "l169", title: "3. O método de negociação de Harvard", seconds: 470, },
          { id: "l170", title: "4. Escuta ativa e go to the balcony", seconds: 917, },
          { id: "l171", title: "5. Criando valor na negociação integrativa", seconds: 414, },
          { id: "l172", title: "6. O mapa da negociação", seconds: 383, },
          { id: "l173", title: "7. Situações difíceis", seconds: 388, },
          { id: "l174", title: "8. SUM-UP 360º", seconds: 161, },
        ],
      },
      {
        id: "m6t8",
        title: "Case: RAG em produto",
        lessons: [
          { id: "l175", title: "1. Fundamentos sobre RAG", seconds: 431, },
          { id: "l176", title: "2. Case: Desafios enfrentados pelo time", seconds: 426, },
          { id: "l177", title: "3. Case: Configuração do fluxo N8n", seconds: 807, },
          { id: "l178", title: "4. Case: Ajustando Prompts", seconds: 942, },
          { id: "l179", title: "5. Case: refinando os últimos passos no n8n", seconds: 633, },
          { id: "l180", title: "6. Outras aplicações do RAG para produto", seconds: 207, },
          { id: "l181", title: "7. Próximos passos: multiagentes", seconds: 163, },
        ],
      },
      {
        id: "m6t9",
        title: "Bônus: Delivery e interação com Engenharia",
        lessons: [
          { id: "l182", title: "1. O que realmente significa delivery?", seconds: 263, },
          { id: "l183", title: "2. Falhamos ao interagir com engenharia?", seconds: 374, },
          { id: "l184", title: "Artigo: Estrutura de comunicação entre Produto e Engenharia", seconds: 420, },
          { id: "l185", title: "3. O impacto prático da comunicação", seconds: 476, },
          { id: "l186", title: "4. Como começar a melhorar o delivery?", seconds: 260, },
          { id: "l187", title: "5. Pressão e Performance: como equilibrar?", seconds: 434, },
          { id: "l188", title: "6. O produto em primeiro lugar", seconds: 457, },
        ],
      },
      {
        id: "m6t10",
        title: "Desafio prático",
        lessons: [
          { id: "l189", title: "Parte 3: Direcionamento estratégico e liderança do produto", seconds: 0, optional: true, material: "Para conquistar o Certificado de Menção Honrosa, basta concluir e enviar o desafio prático.", },
        ],
      },
    ],
  },
];

export const ALL_LESSONS = MODULES.flatMap((m) =>
  m.topics.flatMap((t) => t.lessons.map((l) => ({ ...l, moduleId: m.id, topicId: t.id }))),
);

export const TOTAL_SECONDS = ALL_LESSONS.reduce((a, l) => a + l.seconds, 0);
