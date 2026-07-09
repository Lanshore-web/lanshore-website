/* Decorative hero graphics per pillar: dashboard UI mockup, workflow diagram,
   app-interface mockup. Pure SVG so no image assets are needed. */

function DashboardMockup() {
  return (
    <svg viewBox="0 0 480 300" className="w-full" role="img" aria-label="Executive dashboard mockup">
      <rect width="480" height="300" rx="12" fill="var(--chart-surface)" />
      <rect x="24" y="24" width="432" height="36" rx="6" fill="var(--chart-panel)" />
      <circle cx="44" cy="42" r="8" fill="var(--gold)" />
      <rect x="60" y="36" width="220" height="12" rx="4" fill="var(--chart-blue)" />
      <rect x="24" y="76" width="200" height="90" rx="6" fill="var(--chart-panel)" />
      <polyline
        points="40,146 70,120 100,132 130,104 160,116 190,92 208,98"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="240" y="76" width="216" height="90" rx="6" fill="var(--chart-panel)" />
      <rect x="256" y="140" width="24" height="14" rx="2" fill="var(--chart-blue)" />
      <rect x="288" y="120" width="24" height="34" rx="2" fill="var(--chart-blue)" />
      <rect x="320" y="104" width="24" height="50" rx="2" fill="var(--gold)" />
      <rect x="352" y="128" width="24" height="26" rx="2" fill="var(--chart-blue)" />
      <rect x="384" y="94" width="24" height="60" rx="2" fill="var(--chart-blue)" />
      <rect x="24" y="182" width="432" height="42" rx="6" fill="var(--chart-panel)" />
      <rect x="40" y="196" width="280" height="12" rx="4" fill="var(--chart-blue)" />
      <rect x="336" y="192" width="104" height="22" rx="11" fill="var(--gold)" />
      <rect x="24" y="240" width="432" height="36" rx="6" fill="var(--chart-panel)" />
      <rect x="40" y="252" width="180" height="12" rx="4" fill="var(--chart-blue)" />
    </svg>
  );
}

function WorkflowDiagram() {
  return (
    <svg viewBox="0 0 480 300" className="w-full" role="img" aria-label="Agent workflow diagram">
      <rect width="480" height="300" rx="12" fill="var(--chart-surface)" />
      {[
        { x: 32, label: 1 },
        { x: 152, label: 2 },
        { x: 272, label: 3 },
        { x: 392, label: 4 },
      ].map((step, i) => (
        <g key={step.x}>
          <rect x={step.x} y="118" width="56" height="56" rx="10" fill="var(--chart-panel)" stroke={i === 2 ? "var(--gold)" : "var(--chart-blue)"} strokeWidth="2" />
          {i < 3 && (
            <path
              d={`M${step.x + 64} 146h40`}
              stroke="var(--gold)"
              strokeWidth="2.5"
              markerEnd="none"
            />
          )}
          {i < 3 && <path d={`M${step.x + 98} 140l8 6-8 6`} fill="none" stroke="var(--gold)" strokeWidth="2.5" />}
        </g>
      ))}
      <rect x="44" y="138" width="32" height="6" rx="3" fill="var(--chart-blue)" />
      <rect x="44" y="150" width="24" height="6" rx="3" fill="var(--chart-blue)" />
      <rect x="164" y="138" width="32" height="6" rx="3" fill="var(--chart-blue)" />
      <rect x="164" y="150" width="24" height="6" rx="3" fill="var(--chart-blue)" />
      <circle cx="300" cy="146" r="12" fill="none" stroke="var(--gold)" strokeWidth="2.5" />
      <path d="M295 146l4 4 7-8" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="404" y="138" width="32" height="6" rx="3" fill="var(--chart-blue)" />
      <rect x="404" y="150" width="24" height="6" rx="3" fill="var(--chart-blue)" />
      <rect x="140" y="52" width="200" height="30" rx="15" fill="var(--chart-panel)" />
      <rect x="160" y="63" width="160" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="140" y="218" width="200" height="30" rx="15" fill="var(--chart-panel)" />
      <rect x="160" y="229" width="160" height="8" rx="4" fill="var(--chart-blue)" />
    </svg>
  );
}

function AppMockup() {
  return (
    <svg viewBox="0 0 480 300" className="w-full" role="img" aria-label="Custom app interface mockup">
      <rect width="480" height="300" rx="12" fill="var(--chart-surface)" />
      <rect x="24" y="24" width="130" height="252" rx="8" fill="var(--chart-panel)" />
      <rect x="40" y="44" width="98" height="10" rx="5" fill="var(--gold)" />
      <rect x="40" y="72" width="80" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="40" y="92" width="80" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="40" y="112" width="80" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="170" y="24" width="286" height="60" rx="8" fill="var(--chart-panel)" />
      <rect x="186" y="40" width="160" height="10" rx="5" fill="var(--chart-blue)" />
      <rect x="186" y="58" width="100" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="170" y="96" width="286" height="52" rx="8" fill="var(--chart-panel)" />
      <circle cx="196" cy="122" r="10" fill="var(--gold)" />
      <rect x="216" y="110" width="180" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="216" y="126" width="140" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="170" y="160" width="286" height="52" rx="8" fill="var(--chart-panel)" />
      <circle cx="196" cy="186" r="10" fill="var(--chart-blue)" />
      <rect x="216" y="174" width="180" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="216" y="190" width="140" height="8" rx="4" fill="var(--chart-blue)" />
      <rect x="170" y="224" width="286" height="52" rx="8" fill="var(--chart-panel)" />
      <rect x="186" y="240" width="200" height="10" rx="5" fill="var(--chart-blue)" />
      <rect x="382" y="238" width="58" height="20" rx="10" fill="var(--gold)" />
    </svg>
  );
}

export default function PillarGraphic({ slug }: { slug: string }) {
  if (slug === "executive-dashboards") return <DashboardMockup />;
  if (slug === "operations") return <WorkflowDiagram />;
  return <AppMockup />;
}
