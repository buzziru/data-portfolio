---
title: 얼굴 나이·성별·감정 멀티태스크 추정
status: completed
order: 2
summary: RetinaFace 얼굴 검출 후 나이(회귀)·성별·감정(분류) 세 속성을 동시 추정하는 멀티태스크 딥러닝 파이프라인.
domain: Computer Vision / 딥러닝
role: 팀 3인 · 팀장 · 나이 회귀·멀티태스크 결합·Streamlit 담당
methods: [RetinaFace, InceptionResNetv1 전이학습, CNN, 멀티태스크 학습]
tools: [Python, PyTorch, RetinaFace, InceptionResNetv1, Streamlit]
keyMetric: 나이 MAE 4.66 · 성별 Acc 89.4% · 감정 Acc 67.8%
date: "2024"
thumb: cnn
github: https://github.com/buzziru/DL_FACE_REC
---

## Problem

얼굴 이미지 또는 영상에서 나이·성별·감정 세 가지 속성을 한 번에 추정합니다. 회귀(나이)와 분류(성별·감정)가 섞여 있어 태스크별 최적 구조가 다르고, 학습 데이터의 연령·클래스 분포 편중이 핵심 난제입니다.

## Data

- **성별/나이**: AI허브 안면 에이징 76.84GB · 1인당 유아\~현재 약 50장 수집 · 저연령(0\~19세) 편중 약 75%
- **감정**: FER-2013 감정 7클래스 · 'disgust' 클래스 희소
- 총 학습 이미지: 40,150장(나이/성별) + 28,709장(감정)

## Approach

1. **RetinaFace** 얼굴 검출 및 얼굴 부위 정렬
2. **과업별 전용 백본 분리 학습**: 나이 회귀(InceptionResNetv1), 성별 분류(CNN), 감정 분류(CNN)
3. **멀티태스크 결합**: 검출된 얼굴 → 세 모델 병렬 추론 → 결과 통합
4. **Streamlit 대시보드**: 이미지/영상 입력 지원, 6인 동시 추정 데모

## Model / Analysis

**나이 회귀(본인 담당):** InceptionResNetv1 마지막 블록 미세조정. 60대 이상 이미지 오버샘플링. 데이터 분포(0~19세 ~75% 편중)가 집계 지표를 왜곡해 고연령 실패를 은폐하는 문제를 발견 → 연령대별 MAE·CS(5) 분리 지표 도입.

**진단한 한계:**
- 입력 형태 의존성: 정사각 바운딩박스·정면일수록 정확도 ↑, 측면 각도에서 성능 저하
- 데이터 분포: 61+ 연령 5세 이내 비율 7.9%

## Results

| 태스크 | 지표 | 결과 |
|---|---|---|
| 나이 | MAE | 4.66 |
| 성별 | Accuracy | 89.4% |
| 감정 (7클래스) | Accuracy | 67.8% |

## What I Learned

- 집계 지표(전체 MAE)가 데이터 다수 구간에 끌려가 꼬리 실패를 은폐한다. 세분화 지표가 필수.
- 오버샘플링은 정보량을 늘리지 않는다 — 불균형 회귀(LDS/FDS)·손실 재가중이 올바른 접근.
- 팀장으로서 역할 분리(나이/성별/감정)와 통합 파이프라인 설계를 병행했다.

## Next Improvements

40대+ 데이터 수집·증강 · 비율유지 리사이즈 전처리 · 불균형 인지 지표(AAR) 도입.
