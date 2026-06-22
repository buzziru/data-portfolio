---
title: Customer Churn Prediction
status: completed
order: 1
summary: 이커머스 구독 사용자의 이탈 여부를 사전에 예측해, 리텐션 마케팅 우선순위를 정하는 문제.
domain: Subscription / E-commerce
role: Solo · End-to-end
methods: [Logistic Regression, RF, XGBoost]
tools: [Python, Pandas, Scikit-learn]
keyMetric: AUC · Recall@Top-decile
thumb: churn
github: https://github.com
---

## Problem

고객의 약 18%가 매월 이탈하는 상황에서, 제한된 리텐션 예산을 어디에 써야 할지 데이터로 판단해야 했습니다.

## Data

가입 정보, 결제 이력, 로그 활동 6개월치. 결측 7%, 클래스 불균형 1:4.5.

## Approach

이탈 정의를 먼저 합의한 뒤, 시간 기반 train/test 분할. 피처는 행동 기반 그룹과 시간 감쇠 가중치로 구성.

## Model / Analysis

Logistic Regression(기준선) → Random Forest → XGBoost 순으로 비교. SHAP으로 상위 피처 해석.

## Results

AUC 0.84, 상위 10% 구간에서 실제 이탈자의 62%를 적중. 비즈니스 임팩트 시나리오 정리.

## What I Learned

- 정확도보다 의사결정 친화적 지표(Recall@decile)를 선택하는 일이 중요하다.
- 데이터 누수(leakage) 점검을 습관화하게 되었다.

## Next Improvements

시계열 특성 강화 · 비용 기반 threshold 튜닝 · 모델 카드 작성.
