import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  MODULES,
  COURSE_TITLE,
  ALL_LESSONS,
  TOTAL_SECONDS,
  type LessonStatus,
} from "@/lib/course-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plano de Estudos | Curso de Product Management" },
      {
        name: "description",
        content:
          "Plano de estudos do Curso de Product Management: módulos, aulas, duração, status, prazos, anotações e ritmo diário de estudo.",
      },
      { property: "og:title", content: "Plano de Estudos | Curso de Product Management" },
      {
        property: "og:description",
        content:
          "Acompanhe módulos, aulas, duração, status, prazos e o tempo de estudo necessário por dia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});

type Task = { id: string; title: string; done: boolean };
type State = {
  status: Record<string, LessonStatus>;
  notes: Record<string, string>;
  tasks: Task[];
  open: Record<string, boolean>;
  start: string;
  end: string;
};

const KEY = "pm-course-planner-v3";
const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Math.random());

const today = () => new Date().toISOString().slice(0, 10);

const STATUS_LABEL: Record<LessonStatus, string> = {
  pendente: "Pendente",
  andamento: "Em andamento",
  concluido: "Concluído",
};
const STATUS_STYLE: Record<LessonStatus, string> = {
  pendente: "bg-secondary text-secondary-foreground border-border",
  andamento: "bg-accent text-accent-foreground border-border",
  concluido: "bg-primary text-primary-foreground border-primary",
};

function fmt(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h ? `${h}h ${m.toString().padStart(2, "0")}min` : `${m}min`;
}
function fmtShort(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
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
  const [st, setSt] = useState<State>({
    status: {},
    notes: {},
    tasks: [],
    open: { m1: true },
    start: today(),
    end: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSt((p) => ({ ...p, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(st));
  }, [st, loaded]);

  const statusOf = (id: string): LessonStatus => st.status[id] ?? "pendente";
  const cycle = (id: string) =>
    setSt((p) => {
      const cur = p.status[id] ?? "pendente";
      const next: LessonStatus =
        cur === "pendente" ? "andamento" : cur === "andamento" ? "concluido" : "pendente";
      return { ...p, status: { ...p.status, [id]: next } };
    });

  const stats = useMemo(() => {
    const done = ALL_LESSONS.filter((l) => (st.status[l.id] ?? "pendente") === "concluido");
    const doneSec = done.reduce((a, l) => a + l.seconds, 0);
    return {
      done: done.length,
      total: ALL_LESSONS.length,
      pct: Math.round((done.length / ALL_LESSONS.length) * 100),
      doneSec,
      leftSec: TOTAL_SECONDS - doneSec,
    };
  }, [st.status]);

  const daysLeft = useMemo(() => {
    if (!st.end) return null;
    const diff = Math.ceil(
      (new Date(st.end + "T00:00:00").getTime() - new Date(today() + "T00:00:00").getTime()) /
        86400000,
    );
    return diff;
  }, [st.end]);

  const perDay = daysLeft && daysLeft > 0 ? stats.leftSec / daysLeft : null;

  const matches = (title: string) =>
    !query || title.toLowerCase().includes(query.toLowerCase());

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Plano de estudos
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
            {COURSE_TITLE}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {stats.total} aulas · {fmt(TOTAL_SECONDS)} de conteúdo. Marque o status de cada
            aula, use as anotações e acompanhe o ritmo necessário até a data limite.
          </p>
        </header>

        <section className="mb-6 grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">
              Data de início
              <input
                type="date"
                value={st.start}
                onChange={(e) => setSt((p) => ({ ...p, start: e.target.value }))}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Data limite
              <input
                type="date"
                value={st.end}
                onChange={(e) => setSt((p) => ({ ...p, end: e.target.value }))}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">Progresso</p>
              <p className="mt-1 text-lg font-semibold text-card-foreground">{stats.pct}%</p>
              <p className="text-xs text-muted-foreground">
                {stats.done}/{stats.total} aulas
              </p>
            </div>
            <div className="rounded-lg border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">Dias restantes</p>
              <p className="mt-1 text-lg font-semibold text-card-foreground">
                {daysLeft === null ? "—" : daysLeft}
              </p>
              <p className="text-xs text-muted-foreground">até a data limite</p>
            </div>
            <div className="rounded-lg border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">Horas restantes</p>
              <p className="mt-1 text-lg font-semibold text-card-foreground">
                {fmt(stats.leftSec)}
              </p>
              <p className="text-xs text-muted-foreground">de conteúdo pendente</p>
            </div>
            <div className="rounded-lg border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">Estudo por dia</p>
              <p className="mt-1 text-lg font-semibold text-card-foreground">
                {perDay ? fmt(perDay) : "—"}
              </p>
              <p className="text-xs text-muted-foreground">para concluir no prazo</p>
            </div>
          </div>

          <div className="sm:col-span-2">
            <Bar value={stats.pct} />
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>Assistido: {fmt(stats.doneSec)}</span>
              <span>·</span>
              <span>Total: {fmt(TOTAL_SECONDS)}</span>
              <button
                onClick={() => {
                  if (confirm("Zerar todos os status de aulas?"))
                    setSt((p) => ({ ...p, status: {} }));
                }}
                className="ml-auto underline-offset-2 hover:underline"
              >
                Zerar marcações
              </button>
            </div>
          </div>
        </section>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar aula..."
            aria-label="Buscar aula"
            className="min-w-48 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={onlyPending}
              onChange={(e) => setOnlyPending(e.target.checked)}
              className="size-4"
            />
            Somente não concluídas
          </label>
          <button
            onClick={() =>
              setSt((p) => ({
                ...p,
                open: Object.fromEntries(MODULES.map((m) => [m.id, true])),
              }))
            }
            className="rounded-md border border-input px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
          >
            Expandir tudo
          </button>
          <button
            onClick={() => setSt((p) => ({ ...p, open: {} }))}
            className="rounded-md border border-input px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
          >
            Recolher tudo
          </button>
        </div>

        <div className="space-y-3">
          {MODULES.map((m) => {
            const lessons = m.topics.flatMap((t) => t.lessons);
            const d = lessons.filter((l) => statusOf(l.id) === "concluido");
            const pct = Math.round((d.length / lessons.length) * 100);
            const modSec = lessons.reduce((a, l) => a + l.seconds, 0);
            const isOpen = !!st.open[m.id] || !!query;
            return (
              <section
                key={m.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() =>
                    setSt((p) => ({ ...p, open: { ...p.open, [m.id]: !p.open[m.id] } }))
                  }
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-card-foreground">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {m.description}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {d.length}/{lessons.length} aulas · {pct}% · {fmt(modSec)} ·{" "}
                      <span className="font-medium">
                        prazo sugerido:{" "}
                        {new Date(m.deadline + "T00:00:00").toLocaleDateString("pt-BR")}
                      </span>
                    </span>
                  </span>
                  <span className="pt-1 text-xs text-muted-foreground">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
                <div className="px-4 pb-2">
                  <Bar value={pct} />
                </div>

                {isOpen && (
                  <div className="space-y-4 px-4 pb-4 pt-3">
                    {m.topics.map((t) => {
                      const visible = t.lessons.filter(
                        (l) =>
                          matches(l.title) &&
                          (!onlyPending || statusOf(l.id) !== "concluido"),
                      );
                      if (!visible.length) return null;
                      const td = t.lessons.filter((l) => statusOf(l.id) === "concluido").length;
                      return (
                        <div key={t.id}>
                          <div className="mb-2 flex items-baseline justify-between gap-2">
                            <h3 className="text-sm font-semibold text-card-foreground">
                              {t.title}
                            </h3>
                            <span className="shrink-0 text-[11px] text-muted-foreground">
                              {td}/{t.lessons.length}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {visible.map((l) => {
                              const s = statusOf(l.id);
                              return (
                                <div
                                  key={l.id}
                                  className="rounded-lg border border-border/60 px-3 py-2"
                                >
                                  <div className="flex items-start gap-3">
                                    <button
                                      onClick={() => cycle(l.id)}
                                      className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLE[s]}`}
                                    >
                                      {STATUS_LABEL[s]}
                                    </button>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span
                                          className={`text-sm ${s === "concluido" ? "text-muted-foreground line-through" : "text-card-foreground"}`}
                                        >
                                          {l.title}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground">
                                          {l.soon
                                            ? "em breve"
                                            : l.optional
                                              ? "opcional"
                                              : fmtShort(l.seconds)}
                                        </span>
                                      </div>
                                      {l.material && (
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                          📎 {l.material}
                                        </p>
                                      )}
                                      {st.notes[l.id] && noteFor !== l.id && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                          {st.notes[l.id]}
                                        </p>
                                      )}
                                      {noteFor === l.id && (
                                        <textarea
                                          autoFocus
                                          value={st.notes[l.id] ?? ""}
                                          onChange={(e) =>
                                            setSt((p) => ({
                                              ...p,
                                              notes: { ...p.notes, [l.id]: e.target.value },
                                            }))
                                          }
                                          onBlur={() => setNoteFor(null)}
                                          placeholder="Anotações desta aula..."
                                          className="mt-2 w-full rounded-md border border-input bg-background p-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                                          rows={3}
                                        />
                                      )}
                                    </div>
                                    <button
                                      onClick={() =>
                                        setNoteFor(noteFor === l.id ? null : l.id)
                                      }
                                      className="shrink-0 text-[11px] text-muted-foreground hover:text-foreground"
                                    >
                                      nota
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <section className="mt-8 rounded-xl border border-border bg-card p-4">
          <h2 className="text-base font-semibold text-card-foreground">Tarefas a fazer</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Estudos avulsos, leituras, exercícios e revisões.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const t = newTask.trim();
              if (!t) return;
              setSt((p) => ({
                ...p,
                tasks: [...p.tasks, { id: uid(), title: t, done: false }],
              }));
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
            {st.tasks.length === 0 && (
              <li className="text-sm text-muted-foreground">Nenhuma tarefa por enquanto.</li>
            )}
            {st.tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    setSt((p) => ({
                      ...p,
                      tasks: p.tasks.map((x) =>
                        x.id === t.id ? { ...x, done: !x.done } : x,
                      ),
                    }))
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
                  onClick={() =>
                    setSt((p) => ({ ...p, tasks: p.tasks.filter((x) => x.id !== t.id) }))
                  }
                  className="text-[11px] text-muted-foreground hover:text-destructive"
                >
                  remover
                </button>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Conteúdo baseado na planilha oficial do curso. Tudo salva automaticamente neste
          navegador.
        </p>
      </div>
    </main>
  );
}
