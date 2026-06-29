---
title: ML 하니스 — 재사용 가능한 Agentic ML 파이프라인
status: completed
order: 1
summary: 단발성 Kaggle 코드를 6 에이전트 역할 분리, 3환경 자동 실행, 가드레일을 갖춘 재사용 가능한 ML 하니스로 일반화한 프로젝트.
domain: Kaggle / ML 엔지니어링
role: 개인 · 설계·운영 전담
methods: [OOF 스태킹, 앙상블, Agentic Workflow, 4단계 증류 파이프라인]
tools: [Python, LightGBM, XGBoost, CatBoost, Claude Code, W&B, Hydra]
keyMetric: ROC-AUC 0.95460 · 상위 4.9% (148/3,023팀)
thumb: harness
github: https://github.com/buzziru/agentic-kaggle-tabular-template
---

## Problem

Kaggle 대회를 거칠수록 드러난 구조 문제가 있었습니다. 단일 에이전트로 설계·구현·평가·리뷰를 모두 겸하면 자기 평가가 관대해지고, 잦은 수정으로 코드 부채가 누적되어 재현성이 무너집니다. 한 번 쓰고 버릴 코드가 대회마다 반복됩니다.

## Data

Kaggle Playground Series S6E5 (이진분류 · ROC-AUC) · train 439K / test 188K · 합성 데이터 · n=3,023팀.

## Approach

4단계 증류 파이프라인으로 하니스를 점진 경화했습니다.

1. **만들기 (v0.1.0)** — F1PitStop 대회에서 코어 패턴을 코드로 굳힘
2. **템플릿화 (v0.1→v0.3)** — 정답은 격리, "워크플로·가드"만 승격
3. **재적용·보완 (v0.4.0)** — Stellar(S6E6) 다중분류에 재적용해 보완점 탐색
4. **경화 (v0.5→v0.6)** — 자체 감사 + 데이터 자동 검증 추가

## Model / Analysis

**6 에이전트 역할 분리:** main(설계·판단) / implementer / executor / code-reviewer / result-reviewer / premise-auditor. 작성자와 평가자를 분리해 self-eval을 구조적으로 차단합니다.

**설계 원칙:** 어댑터 패턴(모델 추가 ≈ 40줄), 컨트랙트 명시(단계 간 산출물 규격), 단일 책임(피처 생성·선택 모듈 분리), 설정 선언 기반 실험 확장.

**3단계 가드레일:** 확정 결과 동결(자동 검증) · 가설 사전등록 강제 · 시크릿 커밋 하드 차단.

## Results

- ROC-AUC 0.95460 · Private · 상위 4.9% (148/3,023팀)
- Stellar(S6E6) 재적용 balanced accuracy ≈ 0.9709 (3클래스 다중분류)
- 고성능은 저평가 모델 재발굴 + 메타러너 탐색 + 독립 검증 축 추가(fold-split)의 결과

## What I Learned

- 평가·리뷰·감사를 작성자와 분리하면 실험 평가의 관대함이 구조적으로 차단된다.
- 재현성은 코드 품질이 아니라 실험 결과 동결 + 자동 검증 체계에서 나온다.
- 헤드리스 비동기 위임(Kaggle 커널 오프로드)으로 로컬 메인의 컨텍스트를 분석에만 집중시킬 수 있다.

## Next Improvements

v0.7 목표: 멀티모달 탭형 데이터 지원 · RealMLP/TabM 어댑터 추가 · 비용 기반 실험 예산 관리.
