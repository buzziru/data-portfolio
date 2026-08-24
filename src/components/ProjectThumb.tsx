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
          <rect x="74" y="2" width="52" height="15" rx="3" fill="rgba(11,110,79,0.3)" stroke="#0b6e4f" strokeWidth="1" />
          <text x="100" y="12.5" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#101214">main</text>
          <line x1="82" y1="17" x2="48" y2="22" stroke="rgba(11,110,79,0.45)" strokeWidth="0.8" markerEnd="url(#h-arr)" />
          <line x1="118" y1="17" x2="152" y2="22" stroke="rgba(11,110,79,0.45)" strokeWidth="0.8" markerEnd="url(#h-arr)" />
          <rect x="3" y="22" width="90" height="68" rx="3" fill="none" stroke="rgba(16,18,20,0.15)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="48" y="30" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">위임 — 구현·실행·탐색</text>
          <rect x="107" y="22" width="90" height="68" rx="3" fill="none" stroke="rgba(11,110,79,0.35)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="152" y="30" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#7b7f7d">독립 분리 — 평가·리뷰·감사</text>
          <rect x="6" y="33" width="84" height="16" rx="2" fill="rgba(16,18,20,0.04)" stroke="rgba(16,18,20,0.1)" strokeWidth="0.7" />
          <text x="48" y="44" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">feature-smith</text>
          <rect x="6" y="52" width="84" height="16" rx="2" fill="rgba(16,18,20,0.04)" stroke="rgba(16,18,20,0.1)" strokeWidth="0.7" />
          <text x="48" y="63" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">exp-runner</text>
          <rect x="6" y="71" width="84" height="16" rx="2" fill="rgba(16,18,20,0.04)" stroke="rgba(16,18,20,0.1)" strokeWidth="0.7" />
          <text x="48" y="82" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">eda-explorer</text>
          <rect x="110" y="33" width="84" height="16" rx="2" fill="rgba(11,110,79,0.08)" stroke="rgba(11,110,79,0.25)" strokeWidth="0.7" />
          <text x="152" y="44" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">code-reviewer</text>
          <rect x="110" y="52" width="84" height="16" rx="2" fill="rgba(11,110,79,0.08)" stroke="rgba(11,110,79,0.25)" strokeWidth="0.7" />
          <text x="152" y="63" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">result-reviewer</text>
          <rect x="110" y="71" width="84" height="16" rx="2" fill="rgba(11,110,79,0.08)" stroke="rgba(11,110,79,0.25)" strokeWidth="0.7" />
          <text x="152" y="82" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">premise-auditor</text>
          <text x="100" y="97" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">작성자 ≠ 평가자 — self-eval 구조 차단</text>
          <defs>
            <marker id="h-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(11,110,79,0.6)" />
            </marker>
          </defs>
        </svg>
      );

    case 'churn':
      return (
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <line x1="10" y1="85" x2="190" y2="85" stroke="rgba(16,18,20,0.15)" strokeWidth="1" />
          <line x1="10" y1="10" x2="10" y2="85" stroke="rgba(16,18,20,0.15)" strokeWidth="1" />
          <rect x="22" y="60" width="14" height="25" fill="rgba(11,110,79,0.4)" />
          <rect x="44" y="48" width="14" height="37" fill="rgba(11,110,79,0.4)" />
          <rect x="66" y="32" width="14" height="53" fill="rgba(11,110,79,0.4)" />
          <rect x="88" y="22" width="14" height="63" fill="#0b6e4f" />
          <rect x="110" y="38" width="14" height="47" fill="rgba(11,110,79,0.4)" />
          <rect x="132" y="52" width="14" height="33" fill="rgba(11,110,79,0.4)" />
          <rect x="154" y="65" width="14" height="20" fill="rgba(11,110,79,0.4)" />
          <polyline points="29,55 51,44 73,28 95,18 117,34 139,48 161,61" fill="none" stroke="#0b6e4f" strokeWidth="1.4" />
        </svg>
      );

    case 'cnn':
      return (
        <svg viewBox="0 0 200 100">
          <line x1="14" y1="8" x2="196" y2="8" stroke="rgba(16,18,20,0.06)" strokeWidth="0.6" />
          <line x1="14" y1="44" x2="196" y2="44" stroke="rgba(16,18,20,0.06)" strokeWidth="0.6" />
          <line x1="14" y1="80" x2="196" y2="80" stroke="rgba(16,18,20,0.1)" strokeWidth="0.6" />
          <rect x="16" y="18" width="16" height="62" rx="1.5" fill="rgba(11,110,79,0.45)" stroke="#0b6e4f" strokeWidth="0.6" />
          <text x="24" y="26" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#0b6e4f">86.3</text>
          <rect x="42" y="26" width="16" height="54" rx="1.5" fill="rgba(11,110,79,0.35)" stroke="#0b6e4f" strokeWidth="0.6" />
          <text x="50" y="34" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#0b6e4f">75.2</text>
          <rect x="68" y="32" width="16" height="48" rx="1.5" fill="rgba(11,110,79,0.25)" stroke="#5c605f" strokeWidth="0.6" />
          <text x="76" y="40" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#5c605f">67.0</text>
          <rect x="94" y="49" width="16" height="31" rx="1.5" fill="rgba(16,18,20,0.07)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.6" />
          <rect x="120" y="48" width="16" height="32" rx="1.5" fill="rgba(16,18,20,0.07)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.6" />
          <rect x="146" y="50" width="16" height="30" rx="1.5" fill="rgba(16,18,20,0.07)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.6" />
          <rect x="172" y="74" width="16" height="6" rx="1.5" fill="rgba(16,18,20,0.05)" stroke="rgba(16,18,20,0.1)" strokeWidth="0.6" />
          <text x="180" y="72" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#6e7271">7.9</text>
          <text x="24" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">0-10</text>
          <text x="50" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">11-20</text>
          <text x="76" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">21-30</text>
          <text x="102" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">31-40</text>
          <text x="128" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">41-50</text>
          <text x="154" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">51-60</text>
          <text x="180" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4" fill="#6e7271">61+</text>
          <text x="100" y="97" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">연령대별 CS(5) — 30대↑ 데이터 희소</text>
        </svg>
      );

    case 'plant':
      return (
        <svg viewBox="0 0 200 100">
          {/* Teacher → Student KD diagram */}
          <rect x="14" y="30" width="52" height="40" rx="4" fill="rgba(11,110,79,0.2)" stroke="#0b6e4f" strokeWidth="1" />
          <text x="40" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#0b6e4f">ConvNeXt</text>
          <text x="40" y="60" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#5c605f">Teacher</text>
          <rect x="134" y="30" width="52" height="40" rx="4" fill="rgba(92,96,95,0.15)" stroke="#5c605f" strokeWidth="1" />
          <text x="160" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#3d4144">ResNeSt</text>
          <text x="160" y="60" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#7b7f7d">Student</text>
          <line x1="66" y1="50" x2="134" y2="50" stroke="rgba(11,110,79,0.5)" strokeWidth="1.5" markerEnd="url(#kd)" />
          <text x="100" y="44" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#0b6e4f">soft labels</text>
          <text x="100" y="56" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#7b7f7d">T=1.25</text>
          <text x="100" y="86" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="#0b6e4f">ROC-AUC 0.977</text>
          <defs>
            <marker id="kd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(11,110,79,0.5)" />
            </marker>
          </defs>
        </svg>
      );

    case 'forecast':
      return (
        <svg viewBox="0 0 200 100">
          <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(16,18,20,0.12)" />
          <line x1="10" y1="10" x2="10" y2="80" stroke="rgba(16,18,20,0.12)" />
          <polyline points="14,60 30,52 46,58 62,42 78,48 94,38 110,44 126,30 142,40 158,28 174,36 188,24" fill="none" stroke="#5c605f" strokeWidth="1.4" />
          <polyline points="126,30 142,40 158,28 174,36 188,24" fill="none" stroke="#0b6e4f" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="126" y="20" fontFamily="IBM Plex Mono" fontSize="8" fill="#7b7f7d">forecast →</text>
        </svg>
      );

    case 'recsys':
      return (
        <svg viewBox="0 0 200 100">
          <circle cx="40" cy="35" r="9" fill="rgba(11,110,79,0.15)" stroke="#0b6e4f" />
          <circle cx="40" cy="65" r="9" fill="rgba(11,110,79,0.15)" stroke="#0b6e4f" />
          <circle cx="160" cy="35" r="9" fill="rgba(11,110,79,0.12)" stroke="#5c605f" />
          <circle cx="160" cy="65" r="9" fill="rgba(11,110,79,0.12)" stroke="#5c605f" />
          <line x1="49" y1="35" x2="151" y2="35" stroke="rgba(16,18,20,0.1)" strokeDasharray="1 2" />
          <line x1="49" y1="65" x2="151" y2="65" stroke="rgba(16,18,20,0.1)" strokeDasharray="1 2" />
          <line x1="49" y1="35" x2="151" y2="65" stroke="#0b6e4f" strokeWidth="1.2" />
          <line x1="49" y1="65" x2="151" y2="35" stroke="rgba(16,18,20,0.1)" strokeDasharray="1 2" />
          <text x="100" y="92" fontFamily="IBM Plex Mono" fontSize="8" fill="#7b7f7d" textAnchor="middle">RFM · cohort</text>
        </svg>
      );

    case 'patent':
      return (
        <svg viewBox="0 0 200 100">
          {/* 특허문헌 → 장문 인코더 → 17대분류/188중분류 계층 */}
          <rect x="10" y="30" width="30" height="40" rx="2.5" fill="rgba(16,18,20,0.05)" stroke="rgba(16,18,20,0.18)" strokeWidth="0.8" />
          <line x1="15" y1="39" x2="35" y2="39" stroke="rgba(16,18,20,0.22)" strokeWidth="0.8" />
          <line x1="15" y1="45" x2="35" y2="45" stroke="rgba(16,18,20,0.15)" strokeWidth="0.8" />
          <line x1="15" y1="51" x2="35" y2="51" stroke="rgba(16,18,20,0.15)" strokeWidth="0.8" />
          <line x1="15" y1="57" x2="30" y2="57" stroke="rgba(16,18,20,0.15)" strokeWidth="0.8" />
          <text x="25" y="80" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">특허문헌</text>
          <rect x="60" y="36" width="46" height="28" rx="4" fill="rgba(11,110,79,0.2)" stroke="#0b6e4f" strokeWidth="1" />
          <text x="83" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#0b6e4f">ModernBERT</text>
          <text x="83" y="58" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#5c605f">4,096 tok</text>
          <line x1="40" y1="50" x2="59" y2="50" stroke="rgba(11,110,79,0.5)" strokeWidth="1" markerEnd="url(#p-arr)" />
          <line x1="106" y1="50" x2="122" y2="50" stroke="rgba(11,110,79,0.5)" strokeWidth="1" markerEnd="url(#p-arr)" />
          <rect x="124" y="28" width="42" height="14" rx="2" fill="rgba(11,110,79,0.16)" stroke="#0b6e4f" strokeWidth="0.7" />
          <text x="145" y="37.5" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#3d4144">188 중분류</text>
          <line x1="132" y1="42" x2="145" y2="52" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <line x1="145" y1="42" x2="145" y2="52" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <line x1="158" y1="42" x2="145" y2="52" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <rect x="124" y="53" width="42" height="13" rx="2" fill="rgba(16,18,20,0.05)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <text x="145" y="62" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#5c605f">17 대분류</text>
          <text x="100" y="92" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">다중 레이블 · 중분류 예측 → 대분류 유도</text>
          <defs>
            <marker id="p-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(11,110,79,0.6)" />
            </marker>
          </defs>
        </svg>
      );

    case 'sft':
      return (
        <svg viewBox="0 0 200 100">
          {/* frozen 4-bit base + LoRA 어댑터 → 페르소나/유보 출력 */}
          <rect x="14" y="26" width="60" height="48" rx="5" fill="rgba(16,18,20,0.04)" stroke="rgba(16,18,20,0.18)" strokeWidth="0.9" />
          <text x="44" y="43" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6.5" fill="#5c605f">instruct 14B</text>
          <text x="44" y="53" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#6e7271">frozen · 4-bit</text>
          <rect x="26" y="58" width="36" height="12" rx="2" fill="rgba(11,110,79,0.22)" stroke="#0b6e4f" strokeWidth="0.9" />
          <text x="44" y="66.5" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#0b6e4f">QLoRA</text>
          <line x1="74" y1="40" x2="118" y2="34" stroke="rgba(11,110,79,0.45)" strokeWidth="1" markerEnd="url(#s-arr)" />
          <line x1="74" y1="60" x2="118" y2="66" stroke="rgba(11,110,79,0.45)" strokeWidth="1" markerEnd="url(#s-arr)" />
          <rect x="120" y="26" width="70" height="16" rx="3" fill="rgba(11,110,79,0.1)" stroke="rgba(11,110,79,0.35)" strokeWidth="0.7" />
          <text x="155" y="36.5" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#5c605f">페르소나 응대</text>
          <rect x="120" y="58" width="70" height="16" rx="3" fill="rgba(16,18,20,0.04)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <text x="155" y="68.5" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="#5c605f">근거부재 → 유보</text>
          <text x="100" y="92" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">페르소나 준수율 · 범위밖 유보율</text>
          <defs>
            <marker id="s-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(11,110,79,0.6)" />
            </marker>
          </defs>
        </svg>
      );

    case 'rag':
      return (
        <svg viewBox="0 0 200 100">
          {/* 회의록 청크 → 검색 → FT 생성기 → 근거 정박 답변 */}
          <rect x="10" y="30" width="30" height="12" rx="2" fill="rgba(16,18,20,0.05)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <rect x="10" y="45" width="30" height="12" rx="2" fill="rgba(11,110,79,0.18)" stroke="#0b6e4f" strokeWidth="0.8" />
          <rect x="10" y="60" width="30" height="12" rx="2" fill="rgba(16,18,20,0.05)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <text x="25" y="26" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">회의록 청크</text>
          <line x1="40" y1="51" x2="56" y2="51" stroke="rgba(11,110,79,0.5)" strokeWidth="1" markerEnd="url(#r-arr)" />
          <rect x="57" y="40" width="34" height="22" rx="4" fill="rgba(11,110,79,0.12)" stroke="#0b6e4f" strokeWidth="0.9" />
          <text x="74" y="49" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#0b6e4f">retrieve</text>
          <text x="74" y="57" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#5c605f">recall@k</text>
          <line x1="91" y1="51" x2="107" y2="51" stroke="rgba(11,110,79,0.5)" strokeWidth="1" markerEnd="url(#r-arr)" />
          <rect x="108" y="38" width="40" height="26" rx="4" fill="rgba(11,110,79,0.2)" stroke="#0b6e4f" strokeWidth="1" />
          <text x="128" y="49" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5.5" fill="#0b6e4f">FT 생성기</text>
          <text x="128" y="58" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#5c605f">P2 재활용</text>
          <line x1="148" y1="51" x2="164" y2="51" stroke="rgba(11,110,79,0.5)" strokeWidth="1" markerEnd="url(#r-arr)" />
          <rect x="165" y="40" width="26" height="22" rx="3" fill="rgba(16,18,20,0.05)" stroke="rgba(16,18,20,0.15)" strokeWidth="0.7" />
          <text x="178" y="53" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="5" fill="#5c605f">근거답변</text>
          <text x="100" y="92" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="4.5" fill="#6e7271">RAG · FT · hybrid — faithfulness 비교</text>
          <defs>
            <marker id="r-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="rgba(11,110,79,0.6)" />
            </marker>
          </defs>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 200 100">
          <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(16,18,20,0.12)" />
          <line x1="10" y1="10" x2="10" y2="80" stroke="rgba(16,18,20,0.12)" />
          <polyline points="14,70 46,52 78,58 110,38 142,44 174,26" fill="none" stroke="#0b6e4f" strokeWidth="1.4" />
        </svg>
      );
  }
}
