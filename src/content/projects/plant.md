---
title: 식물 잎 병해 진단 — 이종 지식 증류
status: completed
order: 3
summary: Kaggle FGVC7 Plant Pathology 대회에서 1위 솔루션을 분석해 이종 지식 증류(ConvNeXt→ResNeSt)를 직접 구현. ROC-AUC 0.977, Kaggle 18위 상당.
domain: Computer Vision / 딥러닝
role: 개인 · 설계·구현 전담
methods: [이종 지식 증류(KD), pHash 누출 진단, Top-k 앙상블, PyTorch Lightning]
tools: [PyTorch Lightning, ResNeSt, ConvNeXt, timm, W&B, ONNX, Streamlit]
keyMetric: ROC-AUC 0.977 · Kaggle 18위 상당
date: "2026.01"
thumb: plant
image: /projects/plant-demo.jpg
github: https://github.com/buzziru/Plant-Pathology-2020
demo: https://ingyoun-plant-pathology-demo.static.hf.space
demoNote: 샘플 잎 이미지를 누르면 4개 병해 클래스 확률이 즉시 표시됩니다. 직접 이미지를 올리면 ResNeSt101e 모델(ONNX)이 실시간으로 추론합니다.
---

## Problem

Kaggle FGVC7 Plant Pathology 대회 — 식물 잎 이미지에서 병해(healthy / multiple_diseases / rust / scab)를 분류합니다. 검증 성능(0.980)과 리더보드 점수(0.960) 사이 갭이 크게 벌어지는 데이터 누출 문제가 있었습니다.

## Data

Plant Pathology 2020 (Kaggle FGVC7) · 이미지 분류 · 4클래스 · 학습 1,821장 / 테스트 1,821장.

## Approach

1. **누출 진단**: pHash + CNN 유사도로 train-test 중복 이미지 식별 → 동일 인물 폴드 묶기
2. **라벨 노이즈 교정**: 누출 이미지 기반 라벨 재검토
3. **이종 지식 증류**: ConvNeXt(Teacher) → ResNeSt(Student), 온도 T=1.25
4. **Top-k(3) 앙상블**: 최종 제출 앙상블
5. **재사용 가능한 Lightning 구조 설계**: 어댑터 패턴 기반 ML 하니스와 연계

## Model / Analysis

1위 솔루션을 코드 없이 논문·설명만으로 분석해 직접 구현했습니다. ConvNeXt를 Teacher, ResNeSt를 Student로 설정한 이종 증류는 Teacher의 soft label을 Student가 학습하는 구조입니다. timm 라이브러리로 백본을 빠르게 교체 실험했습니다.

## Results

- ROC-AUC 0.977
- Kaggle 리더보드 18위 상당
- 재사용 가능한 PyTorch Lightning 구조 → ML 하니스에 패턴 흡수

## What I Learned

- 검증/LB 갭은 데이터 누출의 신호 — pHash로 즉시 진단할 수 있다.
- 이종 증류는 구조가 다른 Teacher/Student 간에도 soft label 전달이 유효하다.
- 1위 솔루션을 역추적해 재구현하는 과정이 모델 설계 직관을 키우는 가장 빠른 방법이었다.

## Deployment

ONNX 경량화 배포 완료 · 정적 인터랙티브 데모 운영 중(Hugging Face).
