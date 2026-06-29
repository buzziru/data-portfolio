// Inline SVG thumbnails keyed by the project's `thumb` frontmatter value.
// Add a new `case` here when introducing a new thumb key; unknown keys fall
// back to a generic line chart.

interface Props {
  thumb: string;
}

export default function ProjectThumb({ thumb }: Props) {
  switch (thumb) {
    case 'harness':
      return (
        <svg viewBox="0 0 200 100">
          {/* 6-agent architecture diagram */}
          <rect x="80" y="8" width="40" height="20" rx="3" fill="rgba(94,106,210,0.3)" stroke="#5e6ad2" strokeWidth="1" />
          <text x="100" y="21" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#ba9cff">main</text>
          {/* agents */}
          {[['impl',14,48],['exec',46,48],['reviewer',78,48],['result',110,48],['auditor',142,48],['explore',174,48]].map(([label, x]) => (
            <g key={String(label)}>
              <rect x={Number(x)} y={42} width="28" height="16" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <text x={Number(x)+14} y={53} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#6a6b6c">{String(label).slice(0,5)}</text>
            </g>
          ))}
          {/* connector lines */}
          {[28,60,92,124,156,188].map((x) => (
            <line key={x} x1="100" y1="28" x2={x} y2="42" stroke="rgba(94,106,210,0.4)" strokeWidth="0.8" />
          ))}
          {/* guard rail */}
          <rect x="60" y="74" width="80" height="14" rx="3" fill="rgba(94,106,210,0.1)" stroke="rgba(94,106,210,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="100" y="84" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#7877c6">guardrail hook</text>
        </svg>
      );

    case 'churn':
      return (
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <line x1="10" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="10" y1="10" x2="10" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <rect x="22" y="60" width="14" height="25" fill="rgba(94,106,210,0.4)" />
          <rect x="44" y="48" width="14" height="37" fill="rgba(94,106,210,0.4)" />
          <rect x="66" y="32" width="14" height="53" fill="rgba(94,106,210,0.4)" />
          <rect x="88" y="22" width="14" height="63" fill="#5e6ad2" />
          <rect x="110" y="38" width="14" height="47" fill="rgba(94,106,210,0.4)" />
          <rect x="132" y="52" width="14" height="33" fill="rgba(94,106,210,0.4)" />
          <rect x="154" y="65" width="14" height="20" fill="rgba(94,106,210,0.4)" />
          <polyline points="29,55 51,44 73,28 95,18 117,34 139,48 161,61" fill="none" stroke="#ba9cff" strokeWidth="1.4" />
        </svg>
      );

    case 'cnn':
      return (
        <svg viewBox="0 0 200 100">
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            <rect x="14" y="30" width="20" height="40" />
            <rect x="18" y="34" width="20" height="40" />
            <rect x="22" y="38" width="20" height="40" />
          </g>
          <g stroke="#5e6ad2" strokeWidth="1" fill="rgba(94,106,210,0.1)">
            <rect x="62" y="36" width="14" height="28" />
            <rect x="80" y="36" width="14" height="28" />
          </g>
          <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
            <circle cx="118" cy="50" r="6" />
            <circle cx="134" cy="50" r="6" />
            <circle cx="150" cy="50" r="6" />
          </g>
          <line x1="42" y1="50" x2="62" y2="50" stroke="#6a6b6c" strokeDasharray="2 2" />
          <line x1="94" y1="50" x2="112" y2="50" stroke="#6a6b6c" strokeDasharray="2 2" />
          <line x1="156" y1="50" x2="178" y2="50" stroke="#6a6b6c" markerEnd="url(#thumbArr)" />
          <text x="178" y="68" fontFamily="JetBrains Mono" fontSize="8" fill="#6a6b6c">class</text>
          <defs>
            <marker id="thumbArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="#6a6b6c" />
            </marker>
          </defs>
        </svg>
      );

    case 'plant':
      return (
        <svg viewBox="0 0 200 100">
          {/* Teacher → Student KD diagram */}
          <rect x="14" y="30" width="52" height="40" rx="4" fill="rgba(94,106,210,0.2)" stroke="#5e6ad2" strokeWidth="1" />
          <text x="40" y="48" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#ba9cff">ConvNeXt</text>
          <text x="40" y="60" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#7877c6">Teacher</text>
          <rect x="134" y="30" width="52" height="40" rx="4" fill="rgba(119,119,198,0.15)" stroke="#7877c6" strokeWidth="1" />
          <text x="160" y="48" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#b4bcd0">ResNeSt</text>
          <text x="160" y="60" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#6a6b6c">Student</text>
          <line x1="66" y1="50" x2="134" y2="50" stroke="rgba(186,156,255,0.5)" strokeWidth="1.5" markerEnd="url(#kd)" />
          <text x="100" y="44" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#ba9cff">soft labels</text>
          <text x="100" y="56" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#6a6b6c">T=1.25</text>
          <text x="100" y="86" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#5e6ad2">ROC-AUC 0.977</text>
          <defs>
            <marker id="kd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(186,156,255,0.5)" />
            </marker>
          </defs>
        </svg>
      );

    case 'forecast':
      return (
        <svg viewBox="0 0 200 100">
          <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(255,255,255,0.12)" />
          <line x1="10" y1="10" x2="10" y2="80" stroke="rgba(255,255,255,0.12)" />
          <polyline points="14,60 30,52 46,58 62,42 78,48 94,38 110,44 126,30 142,40 158,28 174,36 188,24" fill="none" stroke="#7877c6" strokeWidth="1.4" />
          <polyline points="126,30 142,40 158,28 174,36 188,24" fill="none" stroke="#5e6ad2" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="126" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="#6a6b6c">forecast →</text>
        </svg>
      );

    case 'recsys':
      return (
        <svg viewBox="0 0 200 100">
          <circle cx="40" cy="35" r="9" fill="rgba(94,106,210,0.15)" stroke="#5e6ad2" />
          <circle cx="40" cy="65" r="9" fill="rgba(94,106,210,0.15)" stroke="#5e6ad2" />
          <circle cx="160" cy="35" r="9" fill="rgba(186,156,255,0.12)" stroke="#7877c6" />
          <circle cx="160" cy="65" r="9" fill="rgba(186,156,255,0.12)" stroke="#7877c6" />
          <line x1="49" y1="35" x2="151" y2="35" stroke="rgba(255,255,255,0.1)" strokeDasharray="1 2" />
          <line x1="49" y1="65" x2="151" y2="65" stroke="rgba(255,255,255,0.1)" strokeDasharray="1 2" />
          <line x1="49" y1="35" x2="151" y2="65" stroke="#5e6ad2" strokeWidth="1.2" />
          <line x1="49" y1="65" x2="151" y2="35" stroke="rgba(255,255,255,0.1)" strokeDasharray="1 2" />
          <text x="100" y="92" fontFamily="JetBrains Mono" fontSize="8" fill="#6a6b6c" textAnchor="middle">RFM · cohort</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 200 100">
          <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(255,255,255,0.12)" />
          <line x1="10" y1="10" x2="10" y2="80" stroke="rgba(255,255,255,0.12)" />
          <polyline points="14,70 46,52 78,58 110,38 142,44 174,26" fill="none" stroke="#5e6ad2" strokeWidth="1.4" />
        </svg>
      );
  }
}
