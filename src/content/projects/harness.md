---
title: ML 하니스 — Agentic ML 파이프라인
status: completed
order: 2
summary: 단발성 Kaggle 코드를 에이전트 역할 분리, 로컬 기준 원격 GPU 오프로드, 가드레일을 갖춘 재사용 가능한 ML 하니스로 일반화한 프로젝트.
domain: Kaggle / ML 엔지니어링
role: 개인 · 설계·운영 전담
methods: [Agentic Workflow, 4단계 점진 일반화, 어댑터 패턴, OOF 스태킹·앙상블]
tools: [Python, Claude Code, Hydra, uv, Git, W&B]
keyMetric: 6 에이전트 역할 분리 · 원격 GPU 4채널 오프로드 · 모델 추가 = 어댑터 1개
date: "2026.06"
thumb: harness
github: https://github.com/buzziru/agentic-kaggle-tabular-template
---

> 이 프로젝트의 강조점은 Kaggle 성적이 아니라 **실험 설계와 재사용 구조**입니다. 대회마다 한 번 쓰고 버리던 코드를, 역할이 분리되고 로컬 기준 인프라 위에서 원격 GPU를 오프로드하며 가드레일로 보호되는 **재사용 가능한 ML 하니스**로 일반화했습니다. 첫 실전(F1)에서 낸 상위 4.9% 상당의 성적은 그 구조가 작동한다는 증거일 뿐, 목적이 아닙니다.

## 출발점 — 단일 에이전트 운영의 한계

첫 대회를 단일 에이전트(main 하나)로 운영하면서 세 가지 구조 문제가 드러났습니다.

1. **자기평가 관대** — main이 설계·구현·평가·리뷰를 모두 겸하니, 자기 결과에 대한 평가·리뷰가 후해집니다.
2. **코드 부채 → 재현성 붕괴** — ML 특성상 피처·모델을 끊임없이 고치게 되는데, 이때 코드 부채가 쌓이면 동결돼야 할 결과가 재현 불가능해지고 리팩토링까지 막힙니다.
3. **토끼굴** — ROI가 낮은 작업에 과투자하는 패턴이 반복됩니다.

이때 얻은 성적 자체도 한 모델을 쥐어짠 결과가 아니라 실험 설계의 산물이었습니다 — 저평가 모델 재발굴, 메타러너(여러 모델의 예측을 종합하는 상위 모델) 탐색, 독립 검증 축(fold-split, 데이터를 여러 겹으로 나눠 교차 검증) 추가. **좋은 설계가 성적을 만든다면, 그 설계를 매번 재구축하지 않도록 구조로 굳히는 것**이 다음 과제였습니다.

## 4단계로 굳힌 재사용 하니스

대회를 거치며 정답(대회별 해법)은 격리하고, 재사용 가능한 워크플로·가드만 단계적으로 승격했습니다.

1. **만들기 `v0.1.0`** — F1PitStop 대회에서 코어 패턴을 코드로 굳힘
2. **템플릿화 `v0.1→v0.3`** — "정답"이 아닌 "워크플로·가드"만 승격, 정답은 격리
3. **재적용·보완 `v0.4.0`** — 다른 대회(Stellar)에 적용해 보완점을 탐색하고 하니스에 반영
4. **경화 `v0.5→v0.6`** — 자체 감사 + 데이터 자동 검증 + 로컬 기준 인프라 일반화

## 설계 ① — 6 에이전트로 역할 분리

자기평가 관대 문제를 **작성자와 평가자를 분리**해 구조적으로 해소했습니다. main은 설계·판단만 유지하고, 나머지 역할을 성격에 따라 두 갈래로 나눴습니다.

- **`main`** — 설계·판단 (위임과 분리의 중심)
- **위임 — 구현·실행·탐색** · `feature-smith` · `exp-runner` · `eda-explorer`
- **독립 분리 — 평가·리뷰·감사** · `code-reviewer` · `result-reviewer` · `premise-auditor`

- **작성자 ≠ 리뷰어·평가자** — code-reviewer·result-reviewer를 main과 분리해 self-eval을 차단합니다.
- **평가자는 설계하지 않는다** — result-reviewer는 다음 실험을 제안하지 않습니다. '제2의 설계자'가 생기는 것을 막습니다.
- **감사자는 서사를 읽지 않는다** — premise-auditor는 blind 감사로 누적 숫자만 봅니다. 같은 프레임을 재도출하거나 토끼굴에 빠지는 것을 차단합니다.
- **모델 티어 배분** — 판정·리뷰·감사·구현은 opus, 실행·탐색은 sonnet으로 배분해 난이도와 비용을 맞춥니다.

## 설계 ② — 재사용을 만든 원칙

특정 대회용 코드가 다음 대회에서도 살아남도록, 확장점을 명시적으로 설계했습니다.

- **어댑터 패턴** — 새 모델은 기존 파이프라인을 건드리지 않고 정해진 인터페이스만 구현하면 붙습니다. 모델 교체·추가 비용이 낮아 실험 회전이 빨라집니다.
- **컨트랙트 명시** — 전처리→학습→평가 단계 사이를 정해진 산출물 규격으로만 연결합니다. 한 단계를 바꿔도 규격만 지키면 나머지 단계가 영향받지 않습니다.
- **단일 책임(SRP)** — 피처 생성과 피처 선택을 별도 모듈로 분리합니다. 책임이 섞이지 않아 한쪽을 수정해도 다른 쪽이 깨지지 않고, 재사용·검증이 쉬워집니다.
- **설정 기반 확장** — 모델·하이퍼파라미터·피처 조합 같은 실험 변형을 코드 수정이 아니라 설정 선언으로 다룹니다. 코드는 고정한 채 설정만 갈아 끼워 실험을 확장합니다.

## 설계 ③ — 로컬 기준 실행 인프라 + 가드레일

<div class="detail-split">
<div class="detail-split-body">

**작업 머신은 개발자의 로컬 PC(CPU)** 입니다. EDA·피처 구현·베이스라인·스택 분석·산출물 회수는 전부 로컬에서 돌리고, 대형 모델 훈련과 장시간 튜닝처럼 GPU가 필요한 구간만 원격으로 오프로드합니다. 경로는 넷 — **Kaggle 커널**(무료 쿼터, 기본) · **RunPod**(장시간 무인 · 이미지로 환경 고정) · **Lightning Job**(크레딧 · wandb online) · **Colab**(짧은 왕복).

**헤드리스 비동기 위임** — push가 잡을 백그라운드로 발사하고 턴을 종료하므로, 메인은 대화 컨텍스트를 유지한 채 분석·판단에 집중하고 오버로드가 없습니다. 원격은 'GPU 시간'만 사서 쓰는 자원이라, 발사 전에 의존성·import·설정 로드·단일 fold 스모크를 로컬에서 통과시키는 preflight를 둡니다. GPU 위에서 설정 오타를 디버깅하는 것이 비용이 가장 크게 새는 경로이기 때문입니다.

**왜 로컬을 기준점으로 두는가** — 처음에는 클라우드 IDE(Lightning Studio)를 작업 머신으로 삼았는데, 그러자 런북이 그 플랫폼의 파일시스템·인터프리터 경로에 묶여 다른 머신에서는 그대로 쓸 수 없었습니다. 하니스의 목적이 재사용인데 정작 인프라가 이식을 막고 있던 셈입니다. 기준점을 로컬 PC로 되돌리고 원격은 **잡 제출 대상**으로만 취급하자, 하니스가 특정 플랫폼에 종속되지 않게 됐습니다.

</div>

<figure class="detail-split-fig">
<svg viewBox="0 0 200 140" role="img" aria-label="로컬 기준 실행 인프라 — 로컬 PC(CPU)의 push가 GPU·CPU 잡을 Kaggle 커널·RunPod·Lightning Job·Colab 4개 원격 채널로 병렬 발사하고, 완료되면 monitor가 알림을 받아 회수한다">
<rect x="8" y="6" width="184" height="40" rx="5" fill="rgba(255,255,255,0.02)" stroke="#23252a" stroke-width="0.8" />
<text x="100" y="13.5" text-anchor="middle" font-family="JetBrains Mono" font-size="4.6" fill="#8a8f98">로컬 PC (CPU) — 메인은 분석·판단 유지</text>
<rect x="18" y="17" width="72" height="25" rx="4" fill="rgba(94,106,210,0.22)" stroke="#5e6ad2" stroke-width="1" />
<text x="54" y="29" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" fill="#ba9cff">push</text>
<text x="54" y="37" text-anchor="middle" font-family="JetBrains Mono" font-size="4.4" fill="#7877c6">백그라운드 발사 · 턴 종료</text>
<rect x="110" y="17" width="72" height="25" rx="4" fill="rgba(255,255,255,0.03)" stroke="#34343a" stroke-width="0.9" />
<text x="146" y="29" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" fill="#d0d6e0">monitor</text>
<text x="146" y="37" text-anchor="middle" font-family="JetBrains Mono" font-size="4.4" fill="#8a8f98">완료 알림 수신 · 회수</text>
<rect x="8" y="62" width="184" height="76" rx="5" fill="rgba(255,255,255,0.02)" stroke="#34343a" stroke-width="0.8" stroke-dasharray="3 2" />
<text x="100" y="70.5" text-anchor="middle" font-family="JetBrains Mono" font-size="4.6" fill="#8a8f98">실행 인프라 — GPU·CPU 잡을 로컬 밖 4개 채널로 분산</text>
<rect x="14" y="76" width="84" height="26" rx="3.5" fill="rgba(94,106,210,0.14)" stroke="#5e6ad2" stroke-width="0.9" />
<text x="56" y="87" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="#828fff">Kaggle 커널</text>
<text x="56" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="4.4" fill="#8a8f98">기본 경로 · 무료 쿼터</text>
<rect x="102" y="76" width="84" height="26" rx="3.5" fill="rgba(255,255,255,0.02)" stroke="#34343a" stroke-width="0.7" />
<text x="144" y="87" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="#d0d6e0">RunPod</text>
<text x="144" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="4.4" fill="#8a8f98">장시간 무인 · 이미지 고정</text>
<rect x="14" y="106" width="84" height="26" rx="3.5" fill="rgba(255,255,255,0.02)" stroke="#34343a" stroke-width="0.7" />
<text x="56" y="117" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="#d0d6e0">Lightning Job</text>
<text x="56" y="126" text-anchor="middle" font-family="JetBrains Mono" font-size="4.4" fill="#8a8f98">크레딧 · wandb online</text>
<rect x="102" y="106" width="84" height="26" rx="3.5" fill="rgba(255,255,255,0.02)" stroke="#34343a" stroke-width="0.7" />
<text x="144" y="117" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="#d0d6e0">Colab</text>
<text x="144" y="126" text-anchor="middle" font-family="JetBrains Mono" font-size="4.4" fill="#8a8f98">짧은 왕복 · 보조 GPU</text>
<path d="M54,46 L54,60.5" fill="none" stroke="#7877c6" stroke-width="0.9" stroke-dasharray="2.5 2" marker-end="url(#hd-arrow)" />
<text x="51" y="55" text-anchor="end" font-family="JetBrains Mono" font-size="4.4" fill="#828fff">N개 잡 병렬 발사</text>
<path d="M146,60.5 L146,46.5" fill="none" stroke="#7877c6" stroke-width="0.9" stroke-dasharray="2.5 2" marker-end="url(#hd-arrow)" />
<text x="149" y="55" font-family="JetBrains Mono" font-size="4.4" fill="#8a8f98">완료 시 알림</text>
<defs>
<marker id="hd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
<path d="M0,0 L10,5 L0,10" fill="#7877c6" />
</marker>
</defs>
</svg>
<figcaption>로컬 PC(CPU)의 push가 GPU·CPU 잡을 4개 원격 채널로 병렬 발사하고 턴을 종료 — 잡이 끝나면 monitor가 완료 알림을 받아 산출물을 회수한다. 원격은 GPU 시간만 사서 쓰는 잡 제출 대상일 뿐, 작업 머신은 로컬이다.</figcaption>
</figure>

</div>

**반복 실수를 막는 3단계 가드(훅)** — 사람이 지키는 규칙이 아니라 훅으로 강제합니다.

1. **확정 결과 동결** — 확정한 실험 결과는 동결되어, 리팩토링해도 재현성이 깨지지 않습니다(자동 검증).
2. **가설 사전등록 강제** — 풀 실행 전 가설을 사전등록해 토끼굴·사후 합리화를 차단합니다.
3. **시크릿 하드 차단** — 시크릿 커밋을 하드 차단하고, 미커밋 부채가 8건을 넘으면 자동 리마인드합니다.

## 검증 — 재적용이 곧 하니스 검증

| 검증 | 과업 | 결과 |
|---|---|---|
| F1 (S6E5) | 이진분류 · ROC-AUC | **0.95460** · 상위 4.9% 상당 (148/3,023팀) |
| Stellar (S6E6) | 3클래스 다중분류 · balanced acc. | **≈ 0.9709** |

F1은 합성 데이터(train 439K / test 188K)에서 노이즈 σ ≈ 0.0007 수준(순위가 뒤집힐 만한 편차가 거의 없는 안정적 점수)의 Private 점수를 냈습니다. 더 중요한 것은 **다른 문제(Stellar)에 재적용했을 때도 구조가 그대로 작동했다는 점**입니다. 재적용 과정에서는 ML 특성상 모델·피처 코드를 거듭 수정하며 코드량이 계속 불어났는데, 이를 기능별 패키지로 분리·정리하면서 구조를 한층 일반화했습니다. 재적용 자체가 곧 하니스의 검증이 된 셈입니다.

## 배운 점

- 평가·리뷰·감사를 작성자와 분리하면, 관대한 자기평가가 **구조적으로** 차단된다.
- 재사용은 우연이 아니라 설계의 산물이다 — '정답(대회별 해법)'은 격리하고 '워크플로·가드'만 승격해야 코드가 다음 문제로 이어진다.
- 헤드리스 비동기 위임으로 로컬 메인의 컨텍스트를 분석에만 집중시킬 수 있다.
- 인프라도 재사용의 일부다 — 작업 머신을 클라우드 IDE로 두면 런북이 그 플랫폼에 묶인다. 로컬을 기준점으로 두고 원격은 잡 제출 대상으로만 취급해야 하니스가 다른 환경으로 옮겨진다.
