---
title: 이커머스 고객 세분화 — SQL·RFM 분석
status: completed
order: 5
summary: AWS RDS 5테이블 관계형 DB를 직접 설계해 SQL로 고객을 세분화. RFM·클러스터링·코호트 분석으로 1,468명 구조화.
domain: 이커머스 / 고객 분석
role: DB 설계·SQL·RFM·코호트 분석 담당
methods: [RFM 분석, 코호트 분석, 클러스터링, ARPU/ARPPU 지표 산출]
tools: [SQL, AWS RDS, Python, pandas, scikit-learn]
keyMetric: 1,468명 세분화 · 재방문율 85.8%↓ · 매출 67% Nest 카테고리 편중 발견
thumb: recsys
github: https://github.com/buzziru/ML_COMMERCE
---

## Problem

이커머스 고객 데이터를 단순 집계가 아니라 세분화·행동 패턴 분석으로 구조화해 마케팅 전략을 제안하는 문제. 데이터가 흩어진 형태였고, 관계형 DB 설계부터 분석까지 전 과정을 담당했습니다.

## Data

Dacon 이커머스 데이터셋 · 고객 1,468명 · 주문/상품/카테고리/회원/결제 테이블.

## Approach

1. **AWS RDS 5테이블 관계형 DB 직접 설계**: 고객·주문·상품·카테고리·결제 테이블 관계 정의
2. **SQL 조회 + ARPU/ARPPU 지표 산출**: 복잡 조인 및 윈도우 함수로 지표 계산
3. **RFM 세분화**: Recency·Frequency·Monetary 기반 고객 등급화
4. **클러스터링**: K-Means로 행동 패턴 유사 고객 묶기
5. **코호트 분석**: 첫 구매 월 기준 재방문율 추적

## Model / Analysis

RFM 점수를 기반으로 5개 고객 등급(VIP / 충성 / 잠재 / 위험 / 휴면)을 정의하고 각 등급별 마케팅 전략을 제안했습니다. 코호트 분석에서 재방문율이 첫 달 이후 85.8% 급감하는 패턴을 발견했습니다.

## Results

- 1,468명 RFM 세분화 완료
- 재방문율 85.8%↓ (첫 구매 후 급락 패턴 확인)
- 매출 67%가 'Nest' 카테고리에 편중 → 카테고리 다변화 전략 제안
- 5테이블 관계형 DB 설계 및 운영

## What I Learned

- DB 설계 단계에서 분석 목적을 먼저 정의하면 조회가 훨씬 단순해진다.
- RFM만으로는 행동 패턴의 풍부함이 부족 — 클러스터링 병용이 효과적.
- 코호트 분석은 단일 지표로 리텐션 전략의 근거를 직관적으로 제시할 수 있다.

## Next Improvements

시계열 기반 LTV 예측 · 추천 시스템 연계 · Streamlit 대시보드 배포.
