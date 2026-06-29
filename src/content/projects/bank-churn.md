---
title: 은행 고객 이탈 예측 — 비용 기반 지표 재정의
status: completed
order: 4
summary: 대회 지표(AUROC) 대신 유치비용 > 방지비용 구조에 맞춰 Recall 중심으로 문제를 재정의. CatBoost로 이탈 고객 78% 포착.
domain: 금융 / 고객 분석
role: 팀 리드 · 문제 정의·모델 선택 주도
methods: [Logistic Regression, XGBoost, CatBoost, class_weight 불균형 처리]
tools: [Python, scikit-learn, XGBoost, CatBoost, Streamlit]
keyMetric: Recall 0.78 (이탈 고객 78% 포착)
thumb: churn
github: https://github.com/buzziru/ML_Team_Project
---

## Problem

은행 고객 이탈 예측 문제. 대회 평가 지표는 AUROC였지만, 실제 비용 구조(신규 고객 유치비용 > 기존 고객 방지비용)를 고려하면 Recall이 핵심 지표임을 파악하고 문제를 재정의했습니다.

## Data

Kaggle Bank Churn 데이터셋 · 테스트 165,034행 · 이탈율 약 20% (클래스 불균형).

## Approach

1. **비용 구조 분석**: 유치비용 > 방지비용 → 이탈 예측 놓침(FN)의 비용이 더 큼 → Recall 우선
2. **불균형 처리**: SMOTE 대비 class_weight 채택 (데이터 증강 없이 손실 가중)
3. **6종 모델 비교**: Logistic Regression, Decision Tree, Random Forest, SVM, XGBoost, CatBoost
4. **최종 선택**: CatBoost — 범주형 변수 처리 우수, 불균형에 강건

## Model / Analysis

class_weight 기반 CatBoost가 SMOTE + 다른 모델 대비 Recall에서 일관되게 우세했습니다. 모델 해석을 위해 피처 중요도 분석 및 임계값(threshold) 튜닝을 수행했습니다.

## Results

- Recall 0.78 (이탈 고객 78% 포착)
- CatBoost + class_weight 조합이 Recall 기준 최우수
- Streamlit 대시보드로 팀 발표 및 결과 공유

## What I Learned

- 대회 지표와 비즈니스 지표가 다를 수 있다 — 문제 정의 단계에서 비용 구조를 먼저 파악해야 한다.
- SMOTE는 정보량 없이 샘플만 늘리는 경우가 있어 class_weight가 더 효과적일 때가 많다.
- 팀리드 경험: 분석 방향 설정과 발표 자료 구성을 주도했다.

## Next Improvements

비용 기반 threshold 최적화 · SHAP으로 이탈 요인 해석 · 시계열 피처 강화.
