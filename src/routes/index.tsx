import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Planner de Estudos de Produto | Cronograma PM" },
      {
        name: "description",
        content:
          "Planner simples para organizar seus estudos de Product Management: temas, tarefas por semana e acompanhamento de progresso.",
      },
      { property: "og:title", content: "Planner de Estudos de Produto" },
      {
        property: "og:description",
        content:
          "Organize seu cronograma de estudos de PM por semana, marque o que concluiu e acompanhe seu progresso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});

type Task = {
  id: string;
  title: string;
  topic: string;
  week: number;
  done: boolean;
};

const TOPICS = [
  "Discovery",
  "Priorização",
  "Métricas",
  "Requisitos",
  "Estratégia",
  "Comunicação",
] as const;

const STORAGE_KEY = "pm-study-planner-v1";

const SEED: Task[] = [
  { id: "1", title: "Entrevistar 2 usuários da ferramenta", topic: "Discovery", week: 1, done: false },
  { id: "2", title: "Mapear as 5 dores mais recorrentes do suporte", topic: "Discovery", week: 1, done: false },
  { id: "3", title: "Estudar RICE e aplicar em 3 itens do backlog", topic: "Priorização", week: 2, done: false },
  { id: "4", title: "Escrever 1 problema no formato: contexto, dor, impacto", topic: "Requisitos", week: 2, done: false },
  { id: "5", title: "Definir métrica de sucesso de uma melhoria recente", topic: "Métricas", week: 3, done: false },
  { id: "6", title: "Montar um mapa do produto (módulos e fluxos)", topic: "Estratégia", week: 3, done: false },
  { id: "7", title: "Apresentar uma proposta de melhoria para o time", topic: "Comunicação", week: 4, done: false },
  { id: "8", title: "Revisar aprendizados do mês e ajustar o plano", topic: "Estratégia", week: 4, done: false },
];

const WEEKS = [1, 2, 3, 4];

function Planner() {
  const [tasks, setTasks] = useState<Task[]>(SEED);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    return Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100);
  }, [tasks]);

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: value, topic, week, done: false },
    ]);
    setTitle("");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Product Management
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
            Planner de Estudos
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Um cronograma leve de 4 semanas. Adicione temas, marque o que concluiu
            e acompanhe seu progresso. Tudo fica salvo neste navegador.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-card-foreground">Progresso geral</span>
              <span className="text-muted-foreground">
                {tasks.filter((t) => t.done).length}/{tasks.length} · {progress}%
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <form
          onSubmit={addTask}
          className="mb-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="O que você quer estudar?"
            aria-label="Nova tarefa de estudo"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Tema"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            aria-label="Semana"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {WEEKS.map((w) => (
              <option key={w} value={w}>
                Semana {w}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Adicionar
          </button>
        </form>

        <div className="grid gap-4 sm:grid-cols-2">
          {WEEKS.map((w) => {
            const items = tasks.filter((t) => t.week === w);
            const doneCount = items.filter((t) => t.done).length;
            return (
              <section
                key={w}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-base font-semibold text-card-foreground">
                    Semana {w}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {doneCount}/{items.length}
                  </span>
                </div>

                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nada planejado ainda.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {items.map((t) => (
                      <li
                        key={t.id}
                        className="group flex items-start gap-3 rounded-lg border border-border/60 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={t.done}
                          onChange={() =>
                            setTasks((prev) =>
                              prev.map((x) =>
                                x.id === t.id ? { ...x, done: !x.done } : x,
                              ),
                            )
                          }
                          className="mt-1 size-4 accent-current text-primary"
                          aria-label={`Concluir ${t.title}`}
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm ${t.done ? "text-muted-foreground line-through" : "text-card-foreground"}`}
                          >
                            {t.title}
                          </p>
                          <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                            {t.topic}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setTasks((prev) => prev.filter((x) => x.id !== t.id))
                          }
                          aria-label={`Remover ${t.title}`}
                          className="text-xs text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                        >
                          remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Dica: revise o plano no fim de cada semana e ajuste o que fizer sentido.
        </p>
      </div>
    </main>
  );
}
