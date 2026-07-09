"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import {
  ACCRUALS,
  AUDIT_TRAIL,
  BUCKET_REPS,
  CFO_SCENARIO,
  CRO_INSIGHTS,
  DEMO_AS_OF,
  DEMO_COMPANY,
  DISTRIBUTION,
  DISTRICTS,
  EXCEPTION_QUEUE,
  MONTHLY,
  MONTHLY_BY_DISTRICT,
  OUTLIERS,
  PERSONAS,
  REQUEST_LOG,
  isPersonaId,
  type Kpi,
  type MonthlyPoint,
  type PersonaId,
  type QA,
} from "@/lib/demoData";

/* Shared dark-panel styling for the dashboard shell. */
const panel = "rounded-lg bg-chart-panel p-5";
const panelTitle = "mb-4 text-xs font-semibold uppercase tracking-wider text-white/50";
const inset = "rounded-md bg-ink-soft/20";
const filterPill = (active: boolean) =>
  `rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
    active ? "bg-gold text-ink-deep" : "bg-white/5 text-white/60 hover:text-white"
  }`;

type ViewProps = { kpis: Kpi[] };

function KpiRow({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className={panel}>
          <p className="text-xs text-white/50">{kpi.label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{kpi.value}</p>
          {kpi.delta && <p className="text-xs font-semibold text-gold-light">{kpi.delta}</p>}
          {kpi.note && <p className="text-xs text-white/50">{kpi.note}</p>}
        </div>
      ))}
    </div>
  );
}

function AttainmentVsSpendChart({ data }: { data: MonthlyPoint[] }) {
  // Bars = spend ($M), line = attainment (%). Fixed 3-month window.
  const w = 460;
  const h = 200;
  const maxSpend = Math.max(...data.map((m) => m.spend)) * 1.2;
  const barW = 64;
  const slot = w / data.length;
  const x = (i: number) => slot * i + slot / 2;
  const spendY = (v: number) => h - 24 - (v / maxSpend) * (h - 60);
  const attY = (v: number) => h - 24 - ((v - 60) / 45) * (h - 60);
  const linePoints = data.map((m, i) => `${x(i)},${attY(m.attainment)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Attainment versus comp spend by month">
      {data.map((m, i) => (
        <g key={m.month}>
          <rect
            x={x(i) - barW / 2}
            y={spendY(m.spend)}
            width={barW}
            height={h - 24 - spendY(m.spend)}
            rx="4"
            fill="var(--chart-blue)"
            opacity={m.projected ? 0.45 : 1}
          />
          <text x={x(i)} y={spendY(m.spend) - 8} textAnchor="middle" fontSize="12" className="fill-white/60">
            ${m.spend.toFixed(2)}M{m.projected ? " (proj.)" : ""}
          </text>
          <text x={x(i)} y={h - 6} textAnchor="middle" fontSize="12" className="fill-white/60">
            {m.month}
          </text>
        </g>
      ))}
      <polyline points={linePoints} fill="none" stroke="var(--chart-gold)" strokeWidth="3" strokeLinecap="round" />
      {data.map((m, i) => (
        <g key={m.month}>
          <circle cx={x(i)} cy={attY(m.attainment)} r="5" fill="var(--chart-gold)" stroke="var(--chart-panel)" strokeWidth="2" />
          <text x={x(i)} y={attY(m.attainment) - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--gold-light)">
            {m.attainment.toFixed(1)}%
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- CRO ---------- */

function CroView({ kpis }: ViewProps) {
  const [district, setDistrict] = useState<string>("all");
  const [openInsight, setOpenInsight] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<string[]>([]);

  const monthly = district === "all" ? MONTHLY : MONTHLY_BY_DISTRICT[district];
  const selected = DISTRICTS.find((d) => d.name === district);
  const activeKpis: Kpi[] = selected
    ? [
        {
          label: `Attainment (QTD) · ${selected.name}`,
          value: `${selected.attainment}%`,
          note: `${selected.reps} payees on plan`,
        },
        {
          label: "Comp spend (QTD)",
          value: `$${selected.spend.toFixed(2)}M`,
          note: "of $4.28M company-wide",
        },
        {
          label: "Comp cost of revenue",
          value: `${selected.costOfRevenue.toFixed(1)}%`,
          note: "vs. 8.9% blended",
        },
        {
          label: "Projected quarter-end",
          value: `${monthly[monthly.length - 1].attainment.toFixed(0)}%`,
          note: "attainment at current pace",
        },
      ]
    : kpis;
  const insights =
    district === "all" ? CRO_INSIGHTS : CRO_INSIGHTS.filter((i) => i.district === district);

  return (
    <div className="space-y-4">
      {/* District filter — recomputes KPIs and the chart */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by district">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">View:</span>
        <button className={filterPill(district === "all")} onClick={() => setDistrict("all")}>
          All districts
        </button>
        {DISTRICTS.map((d) => (
          <button key={d.name} className={filterPill(district === d.name)} onClick={() => setDistrict(d.name)}>
            {d.name}
          </button>
        ))}
      </div>

      <KpiRow kpis={activeKpis} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className={panel}>
          <h3 className={panelTitle}>
            Attainment vs. comp spend{district === "all" ? "" : ` · ${district}`}
          </h3>
          <AttainmentVsSpendChart data={monthly} />
        </div>
        <div className={panel}>
          <h3 className={panelTitle}>Districts (QTD) · click a row to filter</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-white/50">
                <th className="pb-2 font-semibold">District</th>
                <th className="pb-2 font-semibold">Attainment</th>
                <th className="pb-2 font-semibold">Spend</th>
                <th className="pb-2 font-semibold">Pacing</th>
              </tr>
            </thead>
            <tbody className="text-white/85">
              {DISTRICTS.map((d) => (
                <tr
                  key={d.name}
                  onClick={() => setDistrict(district === d.name ? "all" : d.name)}
                  className={`cursor-pointer border-t border-white/10 ${
                    district === d.name ? "bg-ink-soft/20" : "hover:bg-white/5"
                  }`}
                >
                  <td className="py-2.5 font-semibold text-white">{d.name}</td>
                  <td className="py-2.5">{d.attainment}%</td>
                  <td className="py-2.5">${d.spend.toFixed(2)}M</td>
                  <td className={`py-2.5 font-semibold ${d.pacing < 80 ? "text-gold-light" : ""}`}>
                    {d.pacing}%{d.pacing < 80 ? " ⚑" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent insights */}
      <div className="grid gap-4 lg:grid-cols-2">
        {insights.map((insight) => {
          const isReviewed = reviewed.includes(insight.id);
          return (
            <div key={insight.id} className={`${panel} border border-gold/30`}>
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-bold text-gold-light">
                  <Sparkles size={15} aria-hidden /> Agent insight · {insight.title}
                </p>
                {isReviewed && (
                  <span className="rounded-full bg-emerald-300/15 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                    ✓ Reviewed
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-white/85">{insight.finding}</p>
              {openInsight === insight.id ? (
                <div className={`${inset} mt-3 p-3`}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Recommended action
                  </p>
                  <p className="mt-1 text-sm text-white/85">{insight.action}</p>
                  {!isReviewed && (
                    <button
                      onClick={() => setReviewed((prev) => [...prev, insight.id])}
                      className="mt-3 rounded bg-gold px-3 py-1 text-xs font-bold text-ink-deep hover:bg-gold-hover"
                    >
                      Mark reviewed
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setOpenInsight(insight.id)}
                  className="mt-3 text-xs font-semibold text-gold-light hover:text-gold"
                >
                  Show recommended action →
                </button>
              )}
            </div>
          );
        })}
        {insights.length === 0 && (
          <div className={panel}>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <Sparkles size={15} aria-hidden className="text-gold-light" />
              No anomalies flagged for {district} this cycle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- VP of Sales ---------- */

function DistributionChart({
  selectedBin,
  onSelect,
}: {
  selectedBin: string | null;
  onSelect: (bin: string) => void;
}) {
  const max = Math.max(...DISTRIBUTION.map((d) => d.count));
  return (
    <div className="flex items-end gap-3" role="group" aria-label="Rep attainment distribution — click a bucket to drill in">
      {DISTRIBUTION.map((d) => (
        <button
          key={d.bin}
          onClick={() => onSelect(d.bin)}
          aria-pressed={selectedBin === d.bin}
          className={`flex flex-1 flex-col items-center gap-1 rounded-md pt-1 transition-colors ${
            selectedBin === d.bin ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <span className="text-xs font-semibold text-white/80">{d.count}</span>
          <div
            className={`w-full rounded-t ${d.flagged ? "bg-chart-gold" : "bg-chart-blue"} ${
              selectedBin !== null && selectedBin !== d.bin ? "opacity-40" : ""
            }`}
            style={{ height: `${(d.count / max) * 110 + 6}px` }}
          />
          <span className="text-[10px] text-white/50">{d.bin}</span>
        </button>
      ))}
    </div>
  );
}

function VpView({ kpis }: ViewProps) {
  const [selectedBin, setSelectedBin] = useState<string | null>(null);
  const [whyOpen, setWhyOpen] = useState<string[]>([]);

  const bucket = selectedBin ? DISTRIBUTION.find((d) => d.bin === selectedBin) : null;
  const bucketReps = selectedBin ? BUCKET_REPS[selectedBin] : null;

  return (
    <div className="space-y-4">
      <KpiRow kpis={kpis} />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={panel}>
          <h3 className={panelTitle}>Rep attainment distribution (170 payees) · click a bucket</h3>
          <DistributionChart
            selectedBin={selectedBin}
            onSelect={(bin) => setSelectedBin(selectedBin === bin ? null : bin)}
          />
          <p className="mt-3 text-[11px] text-white/45">
            Gold bins are outlier zones the agent watches: under-pacing and payout spikes.
          </p>
          {bucket && bucketReps && (
            <div className={`${inset} mt-4 p-3`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {bucket.bin} attainment · {bucket.count} payees
                </p>
                <button
                  onClick={() => setSelectedBin(null)}
                  className="text-xs font-semibold text-white/50 hover:text-white"
                >
                  Clear ✕
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {bucketReps.map((rep) => (
                  <div key={rep.name} className="flex items-baseline justify-between gap-2 border-t border-white/10 pt-2 text-sm">
                    <div>
                      <span className="font-semibold text-white">{rep.name}</span>
                      <span className="text-white/60"> · {rep.role}, {rep.district}</span>
                      {rep.note && <p className="text-[11px] text-gold-light">{rep.note}</p>}
                    </div>
                    <span className="shrink-0 font-semibold text-white/85">{rep.attainment}%</span>
                  </div>
                ))}
              </div>
              {bucket.count > bucketReps.length && (
                <p className="mt-2 text-[11px] text-white/45">
                  Showing {bucketReps.length} of {bucket.count} — full list one click away on an engagement.
                </p>
              )}
            </div>
          )}
        </div>
        <div className={panel}>
          <h3 className={panelTitle}>Flagged this month</h3>
          <div className="space-y-3">
            {OUTLIERS.map((o) => (
              <div key={o.rep} className={`${inset} p-3`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">
                    {o.rep} · {o.district}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      o.flag === "Clean" ? "bg-ink-soft text-white" : "bg-gold text-ink-deep"
                    }`}
                  >
                    {o.attainment}% · {o.flag}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-white/70">{o.detail}</p>
                {whyOpen.includes(o.rep) ? (
                  <div className="mt-2 rounded border-l-2 border-gold bg-chart-panel/60 p-2.5">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold text-gold-light">
                      <Sparkles size={12} aria-hidden /> Agent explanation
                    </p>
                    <p className="mt-1 text-xs text-white/80">{o.agentWhy}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setWhyOpen((prev) => [...prev, o.rep])}
                    className="mt-2 text-xs font-semibold text-gold-light hover:text-gold"
                  >
                    Ask the agent why →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- CFO ---------- */

function CfoView({ kpis }: ViewProps) {
  const [scenario, setScenario] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [auditFilter, setAuditFilter] = useState<"all" | "agent" | "human">("all");

  const rows = ACCRUALS.map((row) =>
    scenario && row.month.startsWith("June") ? { ...row, ...CFO_SCENARIO.june } : row
  );
  const max = Math.max(2.6, ...rows.map((r) => Math.max(r.booked, r.calculated)));
  const drill = selectedMonth ? rows.find((r) => r.month === selectedMonth) : null;
  const drillTotal = drill ? drill.drivers.reduce((sum, d) => sum + d.amountK, 0) : 0;

  const activeKpis = scenario
    ? kpis.map((k) =>
        k.label === "Q2 liability (proj.)"
          ? { ...k, value: CFO_SCENARIO.liability, note: CFO_SCENARIO.liabilityNote }
          : k.label === "True-up exposure"
            ? { ...k, value: CFO_SCENARIO.trueUp, delta: CFO_SCENARIO.trueUpDelta }
            : k
      )
    : kpis;

  const auditRows = AUDIT_TRAIL.filter((row) =>
    auditFilter === "all"
      ? true
      : auditFilter === "agent"
        ? row.actor.startsWith("Agent")
        : !row.actor.startsWith("Agent")
  );

  return (
    <div className="space-y-4">
      {/* Scenario toggle — recomputes June accrual, liability, and true-up */}
      <button
        onClick={() => setScenario(!scenario)}
        aria-pressed={scenario}
        className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors ${
          scenario
            ? "border-gold bg-gold/10 text-gold-light"
            : "border-white/15 bg-white/5 text-white/80 hover:border-gold/50"
        }`}
      >
        <span className="flex items-center gap-2">
          <Sparkles size={15} aria-hidden className="text-gold-light" />
          Scenario: {CFO_SCENARIO.label}
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
            scenario ? "bg-gold text-ink-deep" : "bg-white/10 text-white/60"
          }`}
        >
          {scenario ? "ON — June recomputed" : "OFF"}
        </span>
      </button>

      <KpiRow kpis={activeKpis} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className={panel}>
          <h3 className={panelTitle}>Booked vs. calculated accrual · click a month to drill in</h3>
          <div className="space-y-4" aria-label="Booked versus calculated accrual by month">
            {rows.map((row) => (
              <button
                key={row.month}
                onClick={() => setSelectedMonth(selectedMonth === row.month ? null : row.month)}
                aria-pressed={selectedMonth === row.month}
                className={`block w-full rounded-md p-1.5 text-left transition-colors ${
                  selectedMonth === row.month ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="mb-1 flex justify-between text-xs text-white/70">
                  <span>{row.month}</span>
                  <span className="font-semibold text-gold-light">{row.variance}</span>
                </div>
                <div className="space-y-1">
                  <div className="h-3 rounded bg-chart-blue" style={{ width: `${(row.booked / max) * 100}%` }} />
                  <div className="h-3 rounded bg-chart-gold" style={{ width: `${(row.calculated / max) * 100}%` }} />
                </div>
              </button>
            ))}
            <div className="flex gap-5 text-[11px] text-white/60">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded bg-chart-blue" /> Booked accrual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded bg-chart-gold" /> Agent-calculated liability
              </span>
            </div>
          </div>
          {drill && (
            <div className={`${inset} mt-4 p-3`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {drill.month} variance drivers · ${drillTotal}K total
                </p>
                <button
                  onClick={() => setSelectedMonth(null)}
                  className="text-xs font-semibold text-white/50 hover:text-white"
                >
                  Clear ✕
                </button>
              </div>
              <div className="mt-2 space-y-1.5">
                {drill.drivers.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-2 border-t border-white/10 pt-1.5 text-sm">
                    <span className="text-white/85">{d.label}</span>
                    <span className="shrink-0 font-semibold text-gold-light">${d.amountK}K</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-white/45">
                Status: {drill.status} · every driver traceable to a calc run and deal record.
              </p>
            </div>
          )}
        </div>
        <div className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className={panelTitle}>Audit trail (latest)</h3>
            <div className="mb-4 flex gap-1.5" role="group" aria-label="Filter audit trail by actor">
              <button className={filterPill(auditFilter === "all")} onClick={() => setAuditFilter("all")}>
                All
              </button>
              <button className={filterPill(auditFilter === "agent")} onClick={() => setAuditFilter("agent")}>
                Agent
              </button>
              <button className={filterPill(auditFilter === "human")} onClick={() => setAuditFilter("human")}>
                Human
              </button>
            </div>
          </div>
          <div className="space-y-2.5">
            {auditRows.map((row) => (
              <div key={row.action} className="border-l-2 border-gold pl-3">
                <p className="text-xs text-white/50">{row.timestamp}</p>
                <p className="text-sm text-white/85">{row.action}</p>
                <p className="text-[11px] font-semibold text-gold-light">{row.actor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- RevOps ---------- */

type QueueStatus = "open" | "approved" | "routed";

function AgeBadge({ hours }: { hours: number }) {
  const cls =
    hours < 8
      ? "bg-emerald-300/15 text-emerald-300"
      : hours <= 24
        ? "bg-gold/15 text-gold-light"
        : "bg-red-300/15 text-red-300";
  return (
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${cls}`}>
      {hours}h{hours > 24 ? " · SLA breach" : ""}
    </span>
  );
}

function RevOpsView({ kpis }: ViewProps) {
  const [items, setItems] = useState(
    EXCEPTION_QUEUE.map((item) => ({ ...item, status: "open" as QueueStatus }))
  );
  const [suggestionOpen, setSuggestionOpen] = useState<number[]>([]);

  const openCount = items.filter((i) => i.status === "open").length;
  const activeKpis = kpis.map((k) =>
    k.label === "Open exceptions"
      ? { ...k, value: String(openCount), note: openCount === 0 ? "queue clear" : "all with suggested fixes" }
      : k
  );

  function triage(id: number, status: QueueStatus) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  return (
    <div className="space-y-4">
      <KpiRow kpis={activeKpis} />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={panel}>
          <h3 className={panelTitle}>Leadership questions answered by the agent</h3>
          <div className="space-y-2.5">
            {REQUEST_LOG.map((row) => (
              <div key={row.question} className={`${inset} p-3`}>
                <p className="text-sm text-white/85">&ldquo;{row.question}&rdquo;</p>
                <p className="mt-1 text-[11px] text-white/45">
                  {row.asked} · <span className="font-semibold text-gold-light">{row.time}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/45">
            Median resolution time on exceptions is 3.1 hours — it was 2.4 days before agents.
            Statement disputes for the May run: 9, down from 31 in February.
          </p>
        </div>
        <div className={panel}>
          <h3 className={panelTitle}>
            Exception queue · {openCount} open · SLA: review within 24h
          </h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className={`${inset} p-3 ${item.status !== "open" ? "opacity-80" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <AgeBadge hours={item.ageHours} />
                </div>
                <p className="mt-0.5 text-[11px] text-white/45">Source: {item.source}</p>
                {suggestionOpen.includes(item.id) ? (
                  <p className="mt-2 text-xs text-white/80">
                    <span className="font-semibold text-gold-light">Agent suggests:</span>{" "}
                    {item.suggestion}
                  </p>
                ) : (
                  <button
                    onClick={() => setSuggestionOpen((prev) => [...prev, item.id])}
                    className="mt-2 text-xs font-semibold text-gold-light hover:text-gold"
                  >
                    View agent suggestion →
                  </button>
                )}
                {item.status === "open" ? (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      onClick={() => triage(item.id, "approved")}
                      className="rounded bg-gold px-3 py-1 text-xs font-bold text-ink-deep hover:bg-gold-hover"
                    >
                      Approve fix
                    </button>
                    <button
                      onClick={() => triage(item.id, "routed")}
                      className="rounded border border-white/25 px-3 py-1 text-xs font-bold text-white/80 hover:border-white/60 hover:text-white"
                    >
                      Route to comp admin
                    </button>
                    <button
                      onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                      className="rounded px-3 py-1 text-xs font-bold text-white/50 hover:text-white"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : item.status === "approved" ? (
                  <p className="mt-2.5 text-xs font-bold text-emerald-300">
                    ✓ Fix applied — logged to audit trail
                  </p>
                ) : (
                  <p className="mt-2.5 text-xs font-bold text-gold-light">
                    → Routed to comp admin with full context attached
                  </p>
                )}
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-sm text-white/70">
                Queue clear — the repetitive 80% runs itself; your team designs plans.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shared Q&A + shell ---------- */

function AskTheData({ qa }: { qa: QA[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className={panel}>
      <h3 className={panelTitle}>Ask your comp data</h3>
      <div className="space-y-3">
        {qa.map((item, i) => (
          <div key={item.question} className={inset}>
            <button
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white hover:text-gold-light"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>&ldquo;{item.question}&rdquo;</span>
              <span aria-hidden className="text-gold-light">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm text-white/85">{item.answer}</p>
                <p className="mt-2 text-[11px] text-white/45">Sources: {item.sources}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS: Record<PersonaId, (props: ViewProps) => React.ReactNode> = {
  cro: CroView,
  "vp-sales": VpView,
  cfo: CfoView,
  revops: RevOpsView,
};

export default function DemoDashboard() {
  const searchParams = useSearchParams();
  const paramPersona = searchParams.get("persona");
  const [active, setActive] = useState<PersonaId>(
    isPersonaId(paramPersona) ? paramPersona : "cro"
  );
  const persona = PERSONAS.find((p) => p.id === active)!;
  const View = VIEWS[active];

  return (
    <div className="overflow-hidden rounded-xl bg-chart-surface shadow-2xl">
      {/* Dashboard chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
        <div>
          <p className="font-bold text-white">{DEMO_COMPANY}</p>
          <p className="text-xs text-white/50">{DEMO_AS_OF}</p>
        </div>
        <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink-deep">
          Live demo · fictitious data
        </span>
      </div>

      {/* Persona tabs */}
      <div className="flex flex-wrap gap-1 border-b border-white/10 px-5 pt-3" role="tablist" aria-label="Choose a persona">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={active === p.id}
            onClick={() => setActive(p.id)}
            className={`rounded-t-md px-4 py-2 text-sm font-semibold ${
              active === p.id
                ? "bg-chart-panel text-gold-light"
                : "text-white/60 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 p-5">
        <p className="text-sm text-white/70">{persona.tagline}</p>

        {/* Persona-specific panels (each renders its own KPI row) */}
        <View kpis={persona.kpis} />

        {/* Natural-language Q&A */}
        <AskTheData qa={persona.qa} />
      </div>
    </div>
  );
}
