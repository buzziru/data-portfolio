---
title: 이커머스 고객 세분화 — SQL·RFM 분석
status: completed
order: 5
summary: AWS RDS 5테이블 관계형 DB를 직접 설계하고, SQL·RFM 분석으로 고객 1,468명을 11개 세그먼트로 구조화.
domain: 이커머스 / 고객 분석
role: 팀 프로젝트 · DB 설계 · RFM 분석 담당
methods: [관계형 DB 설계, SQL 분석, RFM 세분화, ARPU/ARPPU 지표 산출]
tools: [SQL, AWS RDS, Python, pandas]
keyMetric: AWS RDS 5테이블 직접 설계 · 1,468명 RFM 11개 그룹 세분화
thumb: recsys
image: /projects/ecommerce-rfm-strategy.svg
thumbImage: /projects/ecommerce-rfm-strategy-thumb.svg
github: https://github.com/buzziru/ML_COMMERCE
---

## Problem

이커머스 고객 데이터를 단순 집계가 아니라 세분화·행동 패턴 분석으로 구조화해 마케팅 전략을 제안하는 문제. 데이터가 흩어진 형태였고, 팀 프로젝트에서 관계형 DB 설계와 RFM 기반 고객 세분화를 담당했습니다.

## Data

Dacon 이커머스 데이터셋 · 고객 1,468명 · 주문/상품/카테고리/회원/결제 테이블.

<figure class="detail-fig">
  <img src="/projects/ecommerce-db.svg" alt="AWS RDS 5테이블 관계형 DB 스키마 — customer·sales·discount·product·marketing·tax 테이블과 PK/FK 관계" />
  <figcaption>AWS RDS 관계형 스키마 — 5개 테이블의 PK·FK 관계를 직접 설계</figcaption>
</figure>

## Approach

1. **AWS RDS 5테이블 관계형 DB 직접 설계**: 고객·주문·상품·카테고리·결제 테이블 관계 정의
2. **SQL 조회 + ARPU/ARPPU 지표 산출**: 복잡 조인 및 윈도우 함수로 지표 계산
3. **RFM 세분화**: Recency·Frequency·Monetary 점수로 1,468명을 11개 그룹(핵심 4 · 비핵심 7)으로 분류

## Model / Analysis

RFM(Recency·Frequency·Monetary) 점수 임계값(R/F/M ≷ 3)을 순차 적용해 고객 1,468명을 11개 세그먼트로 분류했습니다. 핵심 4개 그룹(Loyal Champion · Potential Loyalist · Promising Newcomer · Bargain Lover)을 먼저 식별하고, 각 그룹의 R·F·M 프로파일에 맞춘 차별화 마케팅 전략을 제안했습니다.

<figure class="detail-fig">
  <img src="/projects/ecommerce-rfm-matrix.svg" alt="RFM 핵심 4개 세그먼트의 Recency·Frequency·Monetary 매트릭스" />
  <figcaption>핵심 4개 세그먼트의 R·F·M 프로파일</figcaption>
</figure>

## Results

- AWS RDS 5테이블 관계형 DB 설계 및 운영
- SQL 복합 조인·윈도우 함수로 ARPU/ARPPU 지표 산출
- 1,468명을 11개 RFM 세그먼트(핵심 4 · 비핵심 7)로 분류
- 핵심 4개 그룹별 차별화 마케팅 전략 제안

## What I Learned

- DB 설계 단계에서 분석 목적을 먼저 정의하면 조회가 훨씬 단순해진다.
- RFM 점수 임계값(R/F/M ≷ 3) 설계에 따라 세그먼트 정의가 크게 달라져, 기준 설정이 분석의 핵심이었다.
- 관계형 스키마로 지표를 정의해두면 ARPU/ARPPU 같은 파생 지표를 일관되고 재현 가능하게 산출할 수 있다.
