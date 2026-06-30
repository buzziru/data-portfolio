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
          <rect x="74" y="2" width="52" height="15" rx="3" fill="rgba(94,106,210,0.3)" stroke="#5e6ad2" strokeWidth="1" />
          <text x="100" y="12.5" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#f7f8f8">main</text>
          <line x1="82" y1="17" x2="48" y2="22" stroke="rgba(94,106,210,0.45)" strokeWidth="0.8" markerEnd="url(#h-arr)" />
          <line x1="118" y1="17" x2="152" y2="22" stroke="rgba(94,106,210,0.45)" strokeWidth="0.8" markerEnd="url(#h-arr)" />
          <rect x="3" y="22" width="90" height="68" rx="3" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="48" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4.5" fill="#62666d">위임 — 구현·실행·탐색</text>
          <rect x="107" y="22" width="90" height="68" rx="3" fill="none" stroke="rgba(94,106,210,0.35)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="152" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4.5" fill="#6a6b6c">독립 분리 — 평가·리뷰·감사</text>
          <rect x="6" y="33" width="84" height="16" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
          <text x="48" y="44" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#8a8f98">feature-smith</text>
          <rect x="6" y="52" width="84" height="16" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
          <text x="48" y="63" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#8a8f98">exp-runner</text>
          <rect x="6" y="71" width="84" height="16" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
          <text x="48" y="82" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#8a8f98">eda-explorer</text>
          <rect x="110" y="33" width="84" height="16" rx="2" fill="rgba(94,106,210,0.08)" stroke="rgba(94,106,210,0.25)" strokeWidth="0.7" />
          <text x="152" y="44" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#7877c6">code-reviewer</text>
          <rect x="110" y="52" width="84" height="16" rx="2" fill="rgba(94,106,210,0.08)" stroke="rgba(94,106,210,0.25)" strokeWidth="0.7" />
          <text x="152" y="63" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#7877c6">result-reviewer</text>
          <rect x="110" y="71" width="84" height="16" rx="2" fill="rgba(94,106,210,0.08)" stroke="rgba(94,106,210,0.25)" strokeWidth="0.7" />
          <text x="152" y="82" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#7877c6">premise-auditor</text>
          <text x="100" y="97" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4.5" fill="#62666d">작성자 ≠ 평가자 — self-eval 구조 차단</text>
          <defs>
            <marker id="h-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(94,106,210,0.6)" />
            </marker>
          </defs>
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
          <line x1="14" y1="8" x2="196" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
          <line x1="14" y1="44" x2="196" y2="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
          <line x1="14" y1="80" x2="196" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <rect x="16" y="18" width="16" height="62" rx="1.5" fill="rgba(94,106,210,0.45)" stroke="#5e6ad2" strokeWidth="0.6" />
          <text x="24" y="26" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5" fill="#ba9cff">86.3</text>
          <rect x="42" y="26" width="16" height="54" rx="1.5" fill="rgba(94,106,210,0.35)" stroke="#5e6ad2" strokeWidth="0.6" />
          <text x="50" y="34" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5" fill="#ba9cff">75.2</text>
          <rect x="68" y="32" width="16" height="48" rx="1.5" fill="rgba(94,106,210,0.25)" stroke="#7877c6" strokeWidth="0.6" />
          <text x="76" y="40" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5" fill="#7877c6">67.0</text>
          <rect x="94" y="49" width="16" height="31" rx="1.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <rect x="120" y="48" width="16" height="32" rx="1.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <rect x="146" y="50" width="16" height="30" rx="1.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <rect x="172" y="74" width="16" height="6" rx="1.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
          <text x="180" y="72" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5" fill="#62666d">7.9</text>
          <text x="24" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">0-10</text>
          <text x="50" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">11-20</text>
          <text x="76" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">21-30</text>
          <text x="102" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">31-40</text>
          <text x="128" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">41-50</text>
          <text x="154" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">51-60</text>
          <text x="180" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4" fill="#62666d">61+</text>
          <text x="100" y="97" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="4.5" fill="#62666d">연령대별 CS(5) — 30대↑ 데이터 희소</text>
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
