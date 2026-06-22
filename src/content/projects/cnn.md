---
title: Image Classification with CNN
status: progress
order: 2
summary: 소규모 이미지 데이터셋에서 CNN 아키텍처 선택이 분류 성능과 학습 안정성에 미치는 영향을 비교.
domain: Computer Vision (toy)
role: Solo · Learning project
methods: [CNN, Transfer learning (ResNet)]
tools: [PyTorch, torchvision]
keyMetric: Val Accuracy · F1
thumb: cnn
github: https://github.com
---

## Problem

딥러닝 입문용으로, 단순 분류기가 아니라 '왜 이 아키텍처가 이 데이터에 더 나은가'를 실험으로 보고 싶었습니다.

## Data

공개 이미지 데이터셋(~5K). 클래스 불균형 존재. train/val/test 7:1.5:1.5.

## Approach

직접 설계한 작은 CNN vs pretrained ResNet 미세조정을 동일한 파이프라인에서 비교.

## Model / Analysis

Augmentation, learning rate finder, early stopping 적용. 실험 로그를 표로 정리.

## Results

진행 중 — 현재 baseline val-acc 82%, ResNet-finetune 89%. 해석은 grad-cam 예정.

## What I Learned

- 딥러닝도 결국 '실험 설계와 비교'가 핵심임을 체감.
- 하이퍼파라미터 튜닝보다 데이터 증강이 더 큰 효과를 냄.

## Next Improvements

grad-cam 시각화 · confusion matrix 분석 · 모델 경량화 실험.
