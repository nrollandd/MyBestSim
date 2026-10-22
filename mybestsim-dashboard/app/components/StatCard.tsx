import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: "teal" | "sky" | "emerald" | "amber";
};

const accentStyles = {
  teal: {
    icon: "bg-teal-50 text-teal-700",
    value: "text-slate-900",
  },
  sky: {
    icon: "bg-sky-50 text-sky-700",
    value: "text-slate-900",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-700",
    value: "text-slate-900",
  },
  amber: {
    icon: "bg-amber-50 text-amber-700",
    value: "text-slate-900",
  },
};

export default function StatCard({
  title,
  value,
  hint,
  icon: Icon,
  accent = "teal",
}: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p
            className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${styles.value} break-words`}
          >
            {value}
          </p>
          {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
    </article>
  );
}
