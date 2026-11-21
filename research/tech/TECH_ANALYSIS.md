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
