---
title: 얼굴 나이·성별·감정 멀티태스크 추정
status: completed
order: 2
summary: RetinaFace 얼굴 검출 후 나이(회귀)·성별·감정(분류) 세 속성을 동시 추정하는 멀티태스크 딥러닝 파이프라인.
domain: Computer Vision / 딥러닝
role: 팀 3인 · 팀장 · 나이 회귀·멀티태스크 결합·Streamlit 담당
methods: [RetinaFace, InceptionResNetv1 전이학습, CNN, 멀티태스크 학습]
tools: [Python, PyTorch, RetinaFace, InceptionResNetv1, ONNX, Streamlit]
keyMetric: 나이 MAE 4.66 · 성별 Acc 89.4% · 감정 Acc 67.8%
date: "2024"
thumb: cnn
image: /projects/face-demo.jpg
github: https://github.com/buzziru/DL_FACE_REC
demo: https://ingyoun-face-rec-demo.static.hf.space
demoNote: 샘플 이미지를 누르면 얼굴별 나이·성별·감정 추론 결과가 즉시 표시됩니다. 직접 이미지를 올리면 RetinaFace 검출과 나이·성별·감정 모델(ONNX)이 실시간으로 추론합니다.
---

## Problem

얼굴 이미지 또는 영상에서 나이·성별·감정 세 가지 속성을 한 번에 추정합니다. 회귀(나이)와 분류(성별·감정)가 섞여 있어 태스크별 최적 구조가 다르고, 학습 데이터의 연령·클래스 분포 편중이 핵심 난제입니다.

## Data

- **성별/나이**: AI허브 안면 에이징 76.84GB · 1인당 유아\~현재 약 50장 수집 · 저연령(0\~19세) 편중 약 75%
- **감정**: FER-2013 감정 7클래스 · 'disgust' 클래스가 희소해 제외하고 6클래스로 학습
- 총 학습 이미지: 40,150장(나이/성별) + 28,709장(감정)

## Approach

1. **RetinaFace** 얼굴 검출 및 얼굴 부위 정렬
2. **과업별 전용 백본 분리 학습**: 나이 회귀(InceptionResNetv1), 성별 분류(CNN), 감정 분류(CNN)
3. **멀티태스크 결합**: 검출된 얼굴 → 세 모델 병렬 추론 → 결과 통합

## Model / Analysis

<figure class="fig-wide">
<svg viewBox="0 0 200 100" role="img" aria-label="연령대별 CS(5) 정확도 — 30대 이상 데이터 희소">
<line x1="14" y1="8" x2="196" y2="8" stroke="rgba(255,255,255,0.06)" stroke-width="0.6" />
<line x1="14" y1="44" x2="196" y2="44" stroke="rgba(255,255,255,0.06)" stroke-width="0.6" />
<line x1="14" y1="80" x2="196" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" />
<rect x="16" y="18" width="16" height="62" rx="1.5" fill="rgba(94,106,210,0.45)" stroke="#5e6ad2" stroke-width="0.6" />
<text x="24" y="26" text-anchor="middle" font-family="JetBrains Mono" font-size="5" fill="#ba9cff">86.3</text>
<rect x="42" y="26" width="16" height="54" rx="1.5" fill="rgba(94,106,210,0.35)" stroke="#5e6ad2" stroke-width="0.6" />
<text x="50" y="34" text-anchor="middle" font-family="JetBrains Mono" font-size="5" fill="#ba9cff">75.2</text>
<rect x="68" y="32" width="16" height="48" rx="1.5" fill="rgba(94,106,210,0.25)" stroke="#7877c6" stroke-width="0.6" />
<text x="76" y="40" text-anchor="middle" font-family="JetBrains Mono" font-size="5" fill="#7877c6">67.0</text>
<rect x="94" y="49" width="16" height="31" rx="1.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" />
<rect x="120" y="48" width="16" height="32" rx="1.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" />
<rect x="146" y="50" width="16" height="30" rx="1.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" stroke-width="0.6" />
<rect x="172" y="74" width="16" height="6" rx="1.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="0.6" />
<text x="180" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="5" fill="#62666d">7.9</text>
<text x="24" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">0-10</text>
<text x="50" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">11-20</text>
<text x="76" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">21-30</text>
<text x="102" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">31-40</text>
<text x="128" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">41-50</text>
<text x="154" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">51-60</text>
<text x="180" y="88" text-anchor="middle" font-family="JetBrains Mono" font-size="4" fill="#62666d">61+</text>
<text x="100" y="97" text-anchor="middle" font-family="JetBrains Mono" font-size="4.5" fill="#62666d">연령대별 CS(5) — 30대↑ 데이터 희소</text>
</svg>
<figcaption>학습 데이터가 0~20대에 집중되어 30대 이상은 표본이 희소하고, 연령대별 CS(5)가 급감한다 — 집계 지표가 감추던 고연령 실패를 드러낸 편중 진단.</figcaption>
</figure>

**나이 회귀(본인 담당):** InceptionResNetv1 마지막 블록 미세조정. 60대 이상 이미지 오버샘플링. 데이터 분포(0~19세 ~75% 편중)가 집계 지표를 왜곡해 고연령 실패를 은폐하는 문제를 발견 → 연령대별 MAE·CS(5) 분리 지표 도입.

**진단한 한계:**
- 입력 형태 의존성: 정사각 바운딩박스·정면일수록 정확도 ↑, 측면 각도에서 성능 저하
- 데이터 분포: 61+ 연령 5세 이내 비율 7.9%

## Results

| 태스크 | 지표 | 결과 |
|---|---|---|
| 나이 | MAE | 4.66 |
| 성별 | Accuracy | 89.4% |
| 감정 (6클래스) | Accuracy | 67.8% |

## What I Learned

- 집계 지표(전체 MAE)가 데이터 다수 구간에 끌려가 꼬리 실패를 은폐한다. 세분화 지표가 필수.
- 오버샘플링은 정보량을 늘리지 않는다 — 불균형 회귀(LDS/FDS)·손실 재가중이 올바른 접근.
- 팀장으로서 역할 분리(나이/성별/감정)와 통합 파이프라인 설계를 병행했다.

## Next Improvements

40대+ 데이터 수집·증강 · 비율유지 리사이즈 전처리 · 불균형 인지 지표(AAR) 도입.

## Deployment

기존 Streamlit 데모는 GitHub의 학습 모델(PyTorch·Keras)을 그대로 로드해 추론 지연이 컸습니다. 세 모델을 **ONNX로 변환**하고 검출을 RetinaFace ONNX로 대체해 onnxruntime(CPU)로 경량화 배포했습니다. 정적 인터랙티브 데모 운영 중(Hugging Face) — 샘플은 사전 추론 결과 내장, 업로드 시에만 실시간 추론.
