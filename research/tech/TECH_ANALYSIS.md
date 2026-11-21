# 레퍼런스 후보 기술 분석 (소연) — 2026-11-22 01:13 KST

방법: Playwright + 실제 Chrome(GPU: RTX 4070, ANGLE D3D11), 1440×900, 로드 5초 후 휠 스크롤로 지연 로드 유발.
근거 종류: **[런타임]** window 전역·WebGL 컨텍스트 생성 감시 / **[네트워크]** 실제 내려받은 파일 / **[소스]** 스크립트 본문 문자열(앞 2MB) — 문자열 매칭만 있는 항목은 *추정*.
원자료: `research/tech/analysis.json`, 캡처 `research/tech/*-0.png` 등. 스크립트: `~/.buzz/.scratch/pw/analyze.js`.

| 사이트 | 확인된 핵심 기술 | 3D/영상 자산 | 스크롤 방식 | 디오디 적용 포인트 |
|---|---|---|---|---|
| lusion.co | **three.js r158** [런타임 `__THREE__`], WebGL2 전체 화면 캔버스 1440×900 [런타임] | `matcap.exr`(HDR 재질) [네트워크], 쇼릴 `desktop.mp4`를 **WebGL 텍스처로** 사용(같은 mp4를 여러 번 요청, `<video>` DOM 없음) [네트워크+런타임] | 문서 높이 900px = **가상 스크롤**(DOM 스크롤 없이 휠 입력으로 장면 진행) [런타임] | B: 렌즈 재질에 matcap/HDR 환경맵 → 뿌연 유리 해결 근거. 영상을 3D 표면 텍스처로 쓰는 기법 |
| igloo.inc | **three.js r165** [런타임], **GSAP + ScrollTrigger** [소스], WebGL2 ×2 | **Draco 압축 지오메트리** 8개(`igloo.drc`, `intro_particles.drc`, `shattered_ring2.drc` 등), **KTX2 텍스처** [네트워크] | 가상 스크롤(문서 900px) [런타임] | 인트로 파티클 → 오브젝트 형성, 부서진 링 등 **스크롤로 진행되는 3D 서사**. 압축 자산(Draco/KTX2)로 모바일 로딩 대응 |
| locomotive.ca | **three.js r165** [런타임], **GSAP·ScrollTrigger** [소스], **Barba 페이지 전환**·Locomotive Scroll/Lenis [HTML 문자열, *추정*] | `ring.compressed.glb`, 리깅된 인물 `maureen-rigged-2.compressed.glb` [네트워크], Vimeo 1080p mp4 배경(muted·loop) [런타임] | 실제 DOM 스크롤 6,598px + 부드러운 스크롤 | **페이지 전환(Barba)** + 섹션별 소형 WebGL 캔버스(440×616) — 전체를 3D로 하지 않고 포인트에만 3D |
| basement.studio | **three.js r180** [런타임], Next.js [네트워크], GSAP [HTML, *추정*] | **베이크된 라이트맵 KTX2**, GLB 모델 다수(office, contactPhone…), 3D 화면 속 **mp4를 텍스처로** [네트워크] | DOM 스크롤 6,714px, sticky 4개 | 라이트맵 베이크로 고급 조명을 가볍게 — 실시간 조명 대신 미리 구운 질감 |
| a24films.com | Next.js·Shopify [네트워크]. WebGL **없음** [런타임] | 키아트 이미지 중심(next/image webp) | DOM 스크롤 8,802px, sticky 2 | C(에디토리얼): 3D 없이 **이미지 크롭·타이포·그리드**만으로 완성도 — 이미지 품질이 핵심 |
| tamburins.com | Next.js [네트워크]. WebGL **없음** [런타임] | AVIF 이미지 [네트워크] | 첫 화면 위주(1,486px) | 한국 브랜드 타이포(Pretendard + Rosarivo 세리프 혼용) [런타임 fonts] |

## 팀에 드리는 기술 결론
1. **최상급 3D 사이트(Lusion·Igloo)는 "가상 스크롤 + 전체 화면 WebGL"**입니다. 우리 1차본은 DOM 위에 장식 캔버스를 얹은 구조라 체급이 달랐습니다.
2. 유리·금속 질감은 **HDR/matcap 환경맵**이 핵심 근거(Lusion `matcap.exr`). 제 B 프로토타입의 뿌연 유리는 이걸로 해결 가능.
3. 고급 사이트는 **영상을 `<video>`로 깔지 않고 WebGL 텍스처로** 씁니다(Lusion, basement). Higgsfield 영상도 이 방식으로 3D 장면 안에 넣을 수 있습니다.
4. 모바일 대응은 연출 삭제가 아니라 **압축 자산(Draco·KTX2)**과 DPR 제한으로 합니다(Igloo, basement, Locomotive).
5. 3D 없이도 최상급인 사례(A24)는 **이미지 품질과 편집 그리드**가 전부입니다 — C 방향의 기준.

## 아직 확인 못 한 것
- 영상 프레임 스크롤(이미지 시퀀스 캔버스)은 이 6곳에서 **발견되지 않음**(프레임 번호형 이미지 0건; basement의 13건은 라이트맵 텍스처로 오탐). 애플 제품 페이지형 사례는 별도 후보 필요.
- PixiJS는 문자열 오탐 가능성이 커서 제외. A24의 three.js 문자열도 런타임 근거 없음 → 미사용으로 판단.

---

# 2차 — 스크롤 연동 경로 추적 (2026-11-22 01:25 KST)

방법(`~/.buzz/.scratch/pw/probe.js`, `apple.js`): 페이지 로드 전에 브라우저 API에 계측을 걸고 스크롤 아래→위로 이동하며 기록.
- `video.currentTime` 대입(seek) 횟수·값 / `play()` 호출 수
- 2D 캔버스 `drawImage` 원본 종류별 횟수
- WebGL `texImage2D/texSubImage2D` 업로드 원본(video·image·canvas)
- 번호가 붙은 이미지 요청(프레임 시퀀스 후보)
원자료: `research/tech/probe_*.json`, `research/tech/med/`.

## Apple AirPods Pro — 영상 프레임 스크롤 **확인**
- 주소 전환 없음(`/airpods-pro/` 그대로).
- **경로 = 영상 seek. 이미지 시퀀스·WebGL·2D 캔버스 아님** (번호 이미지 0건, drawImage 0, 텍스처 업로드 0) [런타임].
- 두 가지 기법이 섞여 있음:
  1. **진입 시 재생형**: `anim/hero`, `anim/initial`, `noise-control` 영상은 화면에 들어오면 일반 재생(play)하고 끝나면 멈춤.
  2. **스크롤 스크럽형**: `blob:` 주소 영상(파일을 통째로 받아 Blob URL로 바꿔 탐색 지연 제거) + **sticky 컨테이너 안에서 일시정지 상태로 currentTime을 스크롤 진행률에 맞춰 이동**.
     - PC: 스크롤 6,020→7,700px(약 1,700px) 동안 t 0.15→4.9초. **역스크롤 시 t가 4.9→3.5로 되감김** [런타임].
     - 모바일(iPhone 13 에뮬레이션): 4,760→6,020px(약 1,260px) 동안 0.48→4.9초, 같은 방식.
- **해상도 분기** [네트워크]: PC `large.mp4`/`large.webm`(1728~1800w), 모바일 `small_2x.mp4`/`small_2x.webm`(1468~1762w, 스크럽 영상 798w). 같은 장면을 기기별 파일로 따로 인코딩.
- 디오디 적용: Higgsfield 영상을 **키프레임 간격 짧게(예: 매 프레임 키프레임) 재인코딩 → Blob으로 선로딩 → sticky 구간에서 scroll 진행률 = currentTime**. PC/모바일 해상도 별도 파일. 이 방식이면 WebGL 없이도 모바일까지 동일 연출 가능.

## Lusion — 렌더 경로
- three.js r158 단일 WebGL2 캔버스, 문서 높이 900px(= **가상 스크롤**, DOM 스크롤 없음) [런타임].
- 스크롤 중 이미지→WebGL 텍스처 업로드 54회, 영상 seek 0, 영상 텍스처 업로드 0(쇼릴 mp4는 받지만 이번 스크롤 구간에서는 텍스처로 안 올라감) [런타임]. → 장면 전환이 **WebGL 셰이더·텍스처 교체**로 이뤄짐. 스크롤 값→카메라/셰이더 매핑 자체는 번들 압축으로 코드 지점 특정 못 함(추정).

## Locomotive — 렌더 경로
- 실제 DOM 스크롤(6,598px). 영상은 Vimeo 1080p를 **일반 반복 재생**(seek 0) [런타임].
- 2D 캔버스 drawImage(이미지) 12회, WebGL 텍스처는 image 1·canvas 1·기타 5 — 섹션별 소형 3D 캔버스(440×616)에서만 사용 [런타임].
- → **스크롤 스크럽 영상 없음.** 고급감은 페이지 전환·소형 3D 포인트·편집 레이아웃에서 나옴.

## basement — 렌더 경로
- DOM 스크롤 6,714px + sticky 4개, 화면 크기 WebGL 캔버스 2개 [런타임].
- **영상→WebGL 텍스처 업로드 202회**(3D 사무실 속 모니터·TV 화면 mp4가 실시간 텍스처) [런타임], seek 0 → 영상은 스크롤과 무관하게 재생.
- 3D 카메라가 스크롤에 따라 움직이는지는 계측값만으로 확정 못 함(추정: sticky 캔버스 + DOM 스크롤 구조).

## 나주 후보 3곳
| 사이트 | 확인된 기술 [근거] | 영상 방식 | 메모 |
|---|---|---|---|
| Lanserhof | Framer Motion [소스], 히어로 `medizinisch-hero-1080p-web.mp4` + webp 포스터 [네트워크], 소형 캔버스 257×420 ×4(WebGL 컨텍스트 4) [런타임] | 일반 반복 재생(seek 0) | 3D 문자열은 있으나 런타임 전역 없음 → three.js 사용 미확정 |
| 차움 | **GSAP·ScrollTrigger·Lenis** [런타임 전역] | 홈에 영상·WebGL 없음 | 이미지+스크롤 애니메이션만으로 구성 |
| SHA | **GSAP·ScrollTrigger·Lenis** [런타임], Barba 문자열 [HTML, 추정], WebGL 컨텍스트 2 | 배경 영상 **16:9 / 9:6 두 비율을 따로 인코딩** [네트워크], seek 108회가 모두 0 + play 416회 → 호버·진입 시 **처음부터 다시 재생**(스크럽 아님) | 의료진 사진 720px 별도 크기 |

## 요약
- 영상 프레임 스크롤은 **Apple 방식(Blob 선로딩 + sticky + currentTime = 진행률)**이 확인된 유일한 사례. 역스크롤 되감김, PC/모바일 해상도 분기까지 확인.
- 업종 인접 3곳(Lanserhof·차움·SHA)은 **3D 없이 GSAP/Lenis + 고품질 영상·사진**. 기기별(비율별) 영상 인코딩이 공통.
- 최상급 3D(Lusion·basement)는 영상을 **WebGL 텍스처**로 3D 안에 넣음.
