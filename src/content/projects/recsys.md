---
title: Recommendation System Prototype
status: planned
order: 5
summary: 협업 필터링과 내용 기반 필터링을 결합한 하이브리드 추천 프로토타입 설계.
domain: Recommender
role: Solo · Planned
methods: [CF, Content-based, Hybrid]
tools: [Python, Surprise, scikit-learn]
keyMetric: Recall@K · NDCG@K
thumb: recsys
---

## Problem

예정 — 콜드스타트 상황에서 어떤 방식이 더 견고한가를 비교 실험으로 다룰 예정.

## Data

공개 영화/도서 평점 데이터.

## Approach

user-based CF → matrix factorization → hybrid 순으로 비교.

## Model / Analysis

예정 — offline 평가와 간단한 시뮬레이션 평가 병행.

## Results

예정 — Recall@10 기준 baseline 대비 +5%p 개선을 1차 목표.

## What I Learned

예정 — 평가 지표의 함정과 추천의 비즈니스 맥락 정리.

## Next Improvements

순위 학습(rank learning) 도입 검토.
