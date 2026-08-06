export type Tag = "NOVO" | "REGRAVADO" | "EM BREVE" | null;

export type Lesson = {
  id: string;
  title: string;
  tag: Tag;
  done: boolean;
  note?: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

let n = 0;
const l = (title: string, tag: Tag = null): Lesson => ({
  id: `l${++n}`,
  title,
  tag,
  done: false,
});

export const INITIAL_MODULES: Module[] = [
  {
    id: "m1",
    title: "Módulo 1: A área de Produto e seu papel no Negócio",
    lessons: [
      l("1.1 O Product Manager que impacta em resultados", "NOVO"),
      l("1.2 Fundamentos de produto", "REGRAVADO"),
      l("1.3 Times de Produto"),
      l("1.4 Transformação Digital e a Cultura de Produto", "NOVO"),
    ],
  },
  {
    id: "m2",
    title: "Módulo 2: Product Market Fit",
    lessons: [
      l("2.1 Pesquisa de Mercado", "REGRAVADO"),
      l("2.2 Business Model Canvas & Proposta de Valor"),
      l("Bônus: BMC e Lean Canvas com IA Generativa", "NOVO"),
      l('2.3 Os "fits" de Produto'),
      l("2.4 Exemplos de estratégias de mitigação de risco"),
      l("2.5 Acelerando a mitigação de riscos com IA", "NOVO"),
    ],
  },
  {
    id: "m3",
    title: "Módulo 3: Discovery na era da IA",
    lessons: [
      l("3.1 Encontrando e avaliando oportunidades", "REGRAVADO"),
      l("3.2 Ideando e definindo soluções", "REGRAVADO"),
      l("3.3 Validação, Iteração & Dicas Finais", "REGRAVADO"),
      l("3.4 Fundamentos de UX"),
      l("Bônus: Como um PM e UX trabalham juntos"),
    ],
  },
  {
    id: "m4",
    title: "Módulo 4: Dados e Analytics",
    lessons: [
      l("4.1 Lidando com métricas de negócio e produto"),
      l("4.2 Como usar dados para tomar decisões"),
      l("Bônus: Case Tempo: Análise de dados com IA", "NOVO"),
      l("4.3 Testes A/B"),
    ],
  },
  {
    id: "m5",
    title: "Módulo 5: Estratégia e liderança",
    lessons: [
      l("5.1 Papel da Liderança de Produto"),
      l("5.2 Estratégia e visão do Produto"),
      l("5.3 Roadmap de Produto"),
    ],
  },
  {
    id: "m6",
    title: "Módulo 6: Dia a dia de Produto",
    lessons: [
      l("6.1 Metodologias ágeis"),
      l("6.2 Ágil no Dia a dia"),
      l("6.3 Técnicas de priorização"),
      l("Bônus: Case Logbit: Priorização de Backlog com IA", "NOVO"),
      l("6.4 Especificações de requerimentos e rollout"),
      l("6.5 Stakeholders: Mapeamento e buy-in", "REGRAVADO"),
      l("6.6 Gestão de Stakeholders: Negociação e Conflitos", "REGRAVADO"),
      l("Bônus: Case: RAG em produto", "EM BREVE"),
      l("Bônus: Delivery e interação com Engenharia", "NOVO"),
    ],
  },
];
