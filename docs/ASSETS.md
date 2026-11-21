# 자산 장부 — Higgsfield 생성물

모든 항목은 **생성 이미지(추상 연출)**. 실제 병원·의료진·환자·장비·시술 결과가 아님.

| 파일 | 용도 | 모델 | 비율·해상도 | 크레딧 | job id | 생성 시각(UTC) | 상태 |
|---|---|---|---|---|---|---|---|
| assets/higgsfield/a01.webp (+ -900) | A01 히어로 우측 58% | nano_banana_pro | 16:9 · 2k | 2 | e4376db2-e2ff-47be-8f5d-d834d01792cc | 2026-11-21 15:39 | 리사 미승인 → v2로 교체(파일 제거) |
| assets/higgsfield/b01.webp (+ -900) | B01 WebGL 참조·대체 포스터 | nano_banana_pro | 16:9 · 2k | 2 | 6bd08d0c-bdf1-4445-adf6-6e7cf7023837 | 2026-11-21 15:39 | 리사 미승인 → v2로 교체(파일 제거) |
| assets/higgsfield/c01.webp (+ -900) | C01 표지 정물 | nano_banana_pro | 4:5 · 2k | 2 | e24dbbe0-e601-49a9-a03a-59017d0de72d | 2026-11-21 15:39 | 리사 미승인 → v2로 교체(파일 제거) |

프롬프트: docs/DOD_THREE_DESIGN_DIRECTIONS_V0.3.md 의 A01/B01/C01 원문 그대로(수정 없음). 원본 PNG(*-src.png)는 git 제외, 로컬 보관.
잔여 크레딧: 2,523.5 → 2,517.5

## 2차 (디자인 명세 v0.5 프롬프트, 2026-11-21 16:01 UTC)

| 파일 | 용도 | 모델 | 비율·해상도 | 크레딧 | job id | 상태 |
|---|---|---|---|---|---|---|
| assets/higgsfield/a01v2.webp (+ -900) | A01 히어로 | nano_banana_pro | 16:9 · 2k | 2 | 95bbdb88-086a-438e-a107-258f4135564b | 리사 검수 대기 |
| assets/higgsfield/a03.webp (+ -900) | A03 리넨 근접 컷 | nano_banana_pro | 4:5 · 2k | 2 | 58130fe1-4ae8-4984-aebd-b61c3c27d76c | 리사 검수 대기 |
| assets/higgsfield/b01v2.webp (+ -900) | B01 WebGL 대체 포스터 | nano_banana_pro | 16:9 · 2k | 2 | a87176f6-b7b3-4b3b-9ba0-cac2b48a06ae | 리사 검수 대기 |
| assets/higgsfield/c01v2.webp (+ -900) | C01 버건디 표지 | nano_banana_pro | 4:5 · 2k | 2 | 5bea79a2-9a46-4c45-98f6-8b96f1a056f8 | 리사 검수 대기 |

A01 프롬프트는 v0.5 원문에서 `generous quiet negative space on left` → `balanced material detail across the frame, central crop-safe composition`(리사 지시). A03은 리사 지정 프롬프트. 나머지는 v0.5 원문.
모서리 실측색: b01v2 #071516 / #051314 / #0B1618 / #101F24 (CSS #08171A와 근접), c01v2 상단 #803A44 · #8D313E, 하단 #3D0E14 · #5C121F (바닥 그림자로 어두움 → 가장자리 그라데이션 필요).
이번 소다 누적 사용: 1차 6 + 2차 8 = 14 크레딧. (계정 잔액 변동에는 다른 팀 Seedance·GPT Image 사용분이 섞여 있음)

## 3차 — 리사 승인분 C 추가 정물 (2026-11-21 16:07 UTC)

| 파일 | 용도 | 모델 | 비율·해상도 | 크레딧 | job id | 상태 |
|---|---|---|---|---|---|---|
| assets/higgsfield/c02.webp (+ -900) | C01 표지 2번 칸 · 흰 리본 근접 | nano_banana_pro | 3:4 · 2k | 2 | f32d1d12-f6dd-4651-905c-c423605ecb89 | 리사 검수 대기 |
| assets/higgsfield/c03.webp (+ -900) | C01 표지 3번 칸 · C03 리드 · 살구 유리 | nano_banana_pro | 4:5 · 2k | 2 | dc8443f6-04a4-46a3-be3d-7f83ed42b65e | 리사 검수 대기 |

프롬프트: v0.5 C01 팔레트·금지어 그대로(버건디 #802B3A 전면, 아이보리·가지 없음), 피사체만 리본 근접 / 살구 유리로 지정. 원문은 assets/higgsfield/c02.json · c03.json의 params.prompt.
누적: 18 크레딧.

## 영상 1차 — Kling 4.0 image-to-video, 6초 1080p (2026-11-21 16:08 UTC 제출, 리사 중단 요청 직전)
| 파일 | 시작 이미지 | job id | 크레딧 | 상태 |
|---|---|---|---|---|
| assets/video/va-src.mp4 | a01v2 | adc23e74-9c22-4ebb-8c42-93c808bc1fb0 | 22.5 | 보관(현재 안 미적용) |
| assets/video/vb-src.mp4 | b01v2 | 918fe95f-ca84-404b-8b5d-9e0cab13f739 | 22.5 | 보관 · 스크럽 기술 테스트 재료 |
| assets/video/vc-src.mp4 | c01v2 | 14d9eb20-4c82-44b4-817a-f46069c2eb9d | 22.5 | 보관(현재 안 미적용) |
스크럽용 재인코딩: scrub-pc.mp4(1920w, GOP 4, 2.1MB), scrub-m.mp4(720×900 4:5 크롭, GOP 4, 0.8MB), 포스터 poster-pc/m.webp, 정지 장면 still-pc/m.webp.
누적: 이미지 18 + 영상 67.5 = 85.5 크레딧.
