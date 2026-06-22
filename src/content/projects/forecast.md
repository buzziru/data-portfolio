---
title: Time Series Forecasting
status: planned
order: 3
summary: 소매점 일별 매출 예측을 통해 재고/인력 계획에 활용 가능한 벤치마크 모델을 만드는 과제.
domain: Retail / Operations
role: Solo · Planned
methods: [ARIMA, Prophet, LightGBM]
tools: [Python, statsmodels, Prophet]
keyMetric: MAPE · sMAPE
thumb: forecast
---

## Problem

예정 — 단순 예측 정확도뿐 아니라 '언제 모델이 신뢰할 수 없는가'를 정량화하는 것이 목표.

## Data

공개 소매점 매출 데이터.

## Approach

통계 기반, 머신러닝 기반 두 축을 비교하고, 앙상블/예측 구간을 설계.

## Model / Analysis

계절성·추세 분해 후 잔차 모델링.

## Results

예정 — MAPE 15% 이하를 1차 목표로 설정.

## What I Learned

예정 — 시계열 분할/누수 이슈를 사전 정리할 예정.

## Next Improvements

외생 변수 실험 · 예측 구간 신뢰도 평가.
