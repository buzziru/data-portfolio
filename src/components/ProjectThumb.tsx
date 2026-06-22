// Inline SVG thumbnails keyed by the project's `thumb` frontmatter value.
// Add a new `case` here when introducing a new thumb key; unknown keys fall
// back to a generic line chart.

interface Props {
  thumb: string;
}

export default function ProjectThumb({ thumb }: Props) {
  switch (thumb) {
    case 'churn':
      return (
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <line x1="10" y1="85" x2="190" y2="85" stroke="#cdc6b4" strokeWidth="1" />
          <line x1="10" y1="10" x2="10" y2="85" stroke="#cdc6b4" strokeWidth="1" />
          <rect x="22" y="60" width="14" height="25" fill="#2c3e5c" opacity=".7" />
          <rect x="44" y="48" width="14" height="37" fill="#2c3e5c" opacity=".7" />
          <rect x="66" y="32" width="14" height="53" fill="#2c3e5c" opacity=".7" />
          <rect x="88" y="22" width="14" height="63" fill="#1f5d6b" />
          <rect x="110" y="38" width="14" height="47" fill="#2c3e5c" opacity=".7" />
          <rect x="132" y="52" width="14" height="33" fill="#2c3e5c" opacity=".7" />
          <rect x="154" y="65" width="14" height="20" fill="#2c3e5c" opacity=".7" />
          <polyline points="29,55 51,44 73,28 95,18 117,34 139,48 161,61" fill="none" stroke="#a8443a" strokeWidth="1.4" />
        </svg>
      );

    case 'cnn':
      return (
        <svg viewBox="0 0 200 100">
          <g stroke="#2c3e5c" strokeWidth="1" fill="none">
            <rect x="14" y="30" width="20" height="40" />
            <rect x="18" y="34" width="20" height="40" />
            <rect x="22" y="38" width="20" height="40" />
          </g>
          <g stroke="#1f5d6b" strokeWidth="1" fill="rgba(31,93,107,.1)">
            <rect x="62" y="36" width="14" height="28" />
            <rect x="80" y="36" width="14" height="28" />
          </g>
          <g stroke="#2c3e5c" strokeWidth="1" fill="none">
            <circle cx="118" cy="50" r="6" />
            <circle cx="134" cy="50" r="6" />
            <circle cx="150" cy="50" r="6" />
          </g>
          <line x1="42" y1="50" x2="62" y2="50" stroke="#6b7079" strokeDasharray="2 2" />
          <line x1="94" y1="50" x2="112" y2="50" stroke="#6b7079" strokeDasharray="2 2" />
          <line x1="156" y1="50" x2="178" y2="50" stroke="#6b7079" markerEnd="url(#thumbArr)" />
          <text x="178" y="68" fontFamily="JetBrains Mono" fontSize="8" fill="#6b7079">class</text>
          <defs>
            <marker id="thumbArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="#6b7079" />
            </marker>
          </defs>
        </svg>
      );

    case 'forecast':
      return (
        <svg viewBox="0 0 200 100">
          <line x1="10" y1="80" x2="190" y2="80" stroke="#cdc6b4" />
          <line x1="10" y1="10" x2="10" y2="80" stroke="#cdc6b4" />
          <polyline points="14,60 30,52 46,58 62,42 78,48 94,38 110,44 126,30 142,40 158,28 174,36 188,24" fill="none" stroke="#2c3e5c" strokeWidth="1.4" />
          <polyline points="126,30 142,40 158,28 174,36 188,24" fill="none" stroke="#1f5d6b" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="126" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="#6b7079">forecast →</text>
        </svg>
      );

    case 'nlp':
      return (
        <svg viewBox="0 0 200 100">
          <g fontFamily="JetBrains Mono" fontSize="9" fill="#3a3f4a">
            <rect x="14" y="34" width="34" height="14" fill="rgba(31,93,107,.12)" stroke="#1f5d6b" /><text x="31" y="44" textAnchor="middle">token</text>
            <rect x="56" y="34" width="34" height="14" fill="rgba(31,93,107,.12)" stroke="#1f5d6b" /><text x="73" y="44" textAnchor="middle">embed</text>
            <rect x="98" y="34" width="34" height="14" fill="rgba(31,93,107,.12)" stroke="#1f5d6b" /><text x="115" y="44" textAnchor="middle">encode</text>
            <rect x="140" y="34" width="34" height="14" fill="rgba(168,68,58,.15)" stroke="#a8443a" /><text x="157" y="44" textAnchor="middle">label</text>
            <line x1="48" y1="41" x2="56" y2="41" stroke="#6b7079" />
            <line x1="90" y1="41" x2="98" y2="41" stroke="#6b7079" />
            <line x1="132" y1="41" x2="140" y2="41" stroke="#6b7079" />
          </g>
          <text x="10" y="78" fontFamily="JetBrains Mono" fontSize="8" fill="#6b7079">"배송이 너무 느려요..." → [부정]</text>
        </svg>
      );

    case 'recsys':
      return (
        <svg viewBox="0 0 200 100">
          <g>
            <circle cx="40" cy="35" r="9" fill="rgba(31,93,107,.15)" stroke="#1f5d6b" />
            <circle cx="40" cy="65" r="9" fill="rgba(31,93,107,.15)" stroke="#1f5d6b" />
            <circle cx="160" cy="35" r="9" fill="rgba(168,68,58,.12)" stroke="#a8443a" />
            <circle cx="160" cy="65" r="9" fill="rgba(168,68,58,.12)" stroke="#a8443a" />
            <line x1="49" y1="35" x2="151" y2="35" stroke="#6b7079" strokeDasharray="1 2" />
            <line x1="49" y1="65" x2="151" y2="65" stroke="#6b7079" strokeDasharray="1 2" />
            <line x1="49" y1="35" x2="151" y2="65" stroke="#1f5d6b" strokeWidth="1.2" />
            <line x1="49" y1="65" x2="151" y2="35" stroke="#6b7079" strokeDasharray="1 2" />
            <text x="100" y="92" fontFamily="JetBrains Mono" fontSize="8" fill="#6b7079" textAnchor="middle">user × item</text>
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 200 100">
          <line x1="10" y1="80" x2="190" y2="80" stroke="#cdc6b4" />
          <line x1="10" y1="10" x2="10" y2="80" stroke="#cdc6b4" />
          <polyline points="14,70 46,52 78,58 110,38 142,44 174,26" fill="none" stroke="#1f5d6b" strokeWidth="1.4" />
        </svg>
      );
  }
}
