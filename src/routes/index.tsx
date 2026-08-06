import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  INITIAL_MODULES,
  type Module,
  type Tag,
} from "@/lib/course-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Planner de Estudos CPM 2025 | Cronograma por Módulos" },
      {
        name: "description",
        content:
          "Planner de estudos do curso de Product Management: módulos e aulas atualizadas, marcação de concluído, anotações e lista de tarefas.",
      },
      { property: "og:title", content: "Planner de Estudos de Produto" },
      {
        property: "og:description",
        content:
          "Acompanhe módulos e aulas do curso de Product Management, marque o que concluiu e organize suas tarefas de estudo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});

type Task = { id: string; title: string; done: boolean };

const KEY = "pm-course-planner-v2";
const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Math.random());

const TAG_STYLES: Record<string, string> = {
  NOVO: "bg-primary text-primary-foreground",
  REGRAVADO: "bg-accent text-accent-foreground border border-border",
  "EM BREVE": "bg-secondary text-secondary-foreground border border-border",
};

function TagBadge({ tag }: { tag: Tag }) {
  if (!tag) return null;
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TAG_STYLES[tag]}`}
    >
      {tag}
    </span>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function Planner() {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState<Record<string, boolean>>({ m1: true });
  const [loaded, setLoaded] = useState(false);
  const [newModule, setNewModule] = useState("");
  const [newLesson, setNewLesson] = useState<Record<string, string>>({});
  const [newTask, setNewTask] = useState("");
  const [noteFor, setNoteFor] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.modules) setModules(p.modules);
        if (p.tasks) setTasks(p.tasks);
        if (p.open) setOpen(p.open);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded)
      localStorage.setItem(KEY, JSON.stringify({ modules, tasks, open }));
  }, [modules, tasks, open, loaded]);

  const all = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const doneCount = all.filter((x) => x.done).length;
  const progress = all.length ? Math.round((doneCount / all.length) * 100) : 0;

  const patchModule = (id: string, fn: (m: Module) => Module) =>
    setModules((prev) => prev.map((m) => (m.id === id ? fn(m) : m)));

  const toggleLesson = (mid: string, lid: string) =>
    patchModule(mid, (m) => ({
      ...m,
      lessons: m.lessons.map((x) =>
        x.id === lid ? { ...x, done: !x.done } : x,
      ),
    }));

  const setNote = (mid: string, lid: string, note: string) =>
    patchModule(mid, (m) => ({
      ...m,
      lessons: m.lessons.map((x) => (x.id === lid ? { ...x, note } : x)),
    }));

  const addLesson = (mid: string) => {
    const title = (newLesson[mid] || "").trim();
    if (!title) return;
    patchModule(mid, (m) => ({
      ...m,
      lessons: [...m.lessons, { id: uid(), title, tag: null, done: false }],
    }));
    setNewLesson((s) => ({ ...s, [mid]: "" }));
  };

  const removeLesson = (mid: string, lid: string) =>
    patchModule(mid, (m) => ({
      ...m,
      lessons: m.lessons.filter((x) => x.id !== lid),
    }));

  const addModule = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newModule.trim();
    if (!title) return;
    const id = uid();
    setModules((p) => [...p, { id, title, lessons: [] }]);
    setOpen((s) => ({ ...s, [id]: true }));
    setNewModule("");
  };

  const resetAll = () => {
    if (!confirm("Desmarcar todas as aulas concluídas?")) return;
    setModules((p) =>
      p.map((m) => ({ ...m, lessons: m.lessons.map((x) => ({ ...x, done: false })) })),
    );
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Product Management · grade atualizada
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
            Planner de Estudos
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Baseado na coluna "Como ficou" da nova versão do curso. Marque as aulas
            concluídas, adicione anotações, módulos e tarefas. Tudo salva sozinho
            neste navegador.
          </p>
        </header>

        <section className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-card-foreground">Progresso do curso</span>
            <span className="text-muted-foreground">
              {doneCount}/{all.length} aulas · {progress}%
            </span>
          </div>
          <div className="mt-3">
            <Bar value={progress} />
          </div>
          <button
            onClick={resetAll}
            className="mt-3 text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Zerar marcações
          </button>
        </section>

        <div className="space-y-3">
          {modules.map((m) => {
            const d = m.lessons.filter((x) => x.done).length;
            const pct = m.lessons.length
              ? Math.round((d / m.lessons.length) * 100)
              : 0;
            const isOpen = !!open[m.id];
            return (
              <section
                key={m.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpen((s) => ({ ...s, [m.id]: !s[m.id] }))}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-card-foreground">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {d}/{m.lessons.length} concluídas · {pct}%
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
                <div className="px-4 pb-2">
                  <Bar value={pct} />
                </div>

                {isOpen && (
                  <div className="space-y-2 px-4 pb-4 pt-3">
                    {m.lessons.map((x) => (
                      <div
                        key={x.id}
                        className="group rounded-lg border border-border/60 px-3 py-2"
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={x.done}
                            onChange={() => toggleLesson(m.id, x.id)}
                            aria-label={`Concluir ${x.title}`}
                            className="mt-1 size-4"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-sm ${x.done ? "text-muted-foreground line-through" : "text-card-foreground"}`}
                              >
                                {x.title}
                              </span>
                              <TagBadge tag={x.tag} />
                            </div>
                            {x.note && noteFor !== x.id && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {x.note}
                              </p>
                            )}
                            {noteFor === x.id && (
                              <textarea
                                autoFocus
                                value={x.note ?? ""}
                                onChange={(e) => setNote(m.id, x.id, e.target.value)}
                                onBlur={() => setNoteFor(null)}
                                placeholder="Anotações desta aula..."
                                className="mt-2 w-full rounded-md border border-input bg-background p-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                                rows={3}
                              />
                            )}
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1 text-[11px] text-muted-foreground">
                            <button
                              onClick={() =>
                                setNoteFor(noteFor === x.id ? null : x.id)
                              }
                              className="hover:text-foreground"
                            >
                              nota
                            </button>
                            <button
                              onClick={() => removeLesson(m.id, x.id)}
                              className="hover:text-destructive"
                            >
                              remover
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-2 pt-1">
                      <input
                        value={newLesson[m.id] ?? ""}
                        onChange={(e) =>
                          setNewLesson((s) => ({ ...s, [m.id]: e.target.value }))
                        }
                        onKeyDown={(e) => e.key === "Enter" && addLesson(m.id)}
                        placeholder="Adicionar aula ou tópico..."
                        aria-label={`Adicionar aula em ${m.title}`}
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => addLesson(m.id)}
                        className="rounded-md border border-input px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                      >
                        Incluir
                      </button>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <form
          onSubmit={addModule}
          className="mt-4 flex gap-2 rounded-xl border border-dashed border-border p-3"
        >
          <input
            value={newModule}
            onChange={(e) => setNewModule(e.target.value)}
            placeholder="Novo módulo (ex.: Módulo 7: Estudos extras)"
            aria-label="Novo módulo"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Adicionar módulo
          </button>
        </form>

        <section className="mt-8 rounded-xl border border-border bg-card p-4">
          <h2 className="text-base font-semibold text-card-foreground">
            Tarefas a fazer
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Estudos avulsos, leituras, exercícios e revisões.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const t = newTask.trim();
              if (!t) return;
              setTasks((p) => [...p, { id: uid(), title: t, done: false }]);
              setNewTask("");
            }}
            className="mt-3 flex gap-2"
          >
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nova tarefa..."
              aria-label="Nova tarefa"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Adicionar
            </button>
          </form>

          <ul className="mt-3 space-y-2">
            {tasks.length === 0 && (
              <li className="text-sm text-muted-foreground">
                Nenhuma tarefa por enquanto.
              </li>
            )}
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    setTasks((p) =>
                      p.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)),
                    )
                  }
                  aria-label={`Concluir ${t.title}`}
                  className="size-4"
                />
                <span
                  className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : "text-card-foreground"}`}
                >
                  {t.title}
                </span>
                <button
                  onClick={() => setTasks((p) => p.filter((x) => x.id !== t.id))}
                  className="text-[11px] text-muted-foreground hover:text-destructive"
                >
                  remover
                </button>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Módulos 7 e Bônus da versão antiga foram arquivados pelo curso e não
          entram neste plano.
        </p>
      </div>
    </main>
  );
}
