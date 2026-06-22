---
title: NLP Text Classification
status: planned
order: 4
summary: 리뷰 텍스트에서 긍/부정과 주제를 함께 분류하는 다중 태스크 파이프라인 설계 학습.
domain: NLP · Review mining
role: Solo · Planned
methods: [TF-IDF, BiLSTM, HuggingFace]
tools: [Python, transformers]
keyMetric: F1 (macro) · per-class
thumb: nlp
---

## Problem

예정 — 한국어 리뷰 데이터를 다루며 토크나이저와 모델 선택이 성능에 미치는 영향 실험.

## Data

공개 한국어 리뷰 데이터셋.

## Approach

baseline(TF-IDF + LR) → BiLSTM → pretrained 언어모델 미세조정 순서로 비교.

## Model / Analysis

예정 — 클래스 불균형 처리와 per-class 오류 분석에 집중.

## Results

예정 — F1 macro 0.75+를 1차 목표.

## What I Learned

예정 — 한국어 전처리 특성(형태소, 토크나이저) 정리 예정.

## Next Improvements

오류 샘플 정성 분석 · 라벨 노이즈 정제.
