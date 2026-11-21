# 디오디청담 홈페이지 초안 3종

- 고객: 디오디피부과 청담 (현 사이트 dodskin.com)
- 팀: 나주(기획) · 리사(디자인) · 소연(개발) · 니키타(검수)
- 기존 자료(다른 팀): `D:\work\탱탱소프트\문의관리\디오디청담`, https://jeonjaeman.github.io/dod-cheongdam/ — 참고만, 진단은 새로

## 구조
- `index.html` — 초안 3종 선택 인덱스
- `a/` `b/` `c/` — 서로 다른 스타일의 초안 (각각 독립 HTML/CSS/JS)
- `shared/` — 공통 SEO 요소(JSON-LD 기본값 등)만. 디자인은 공유하지 않음
- `assets/higgsfield/` — Higgsfield 생성 이미지·영상 (원본 프롬프트는 `docs/ASSETS.md`)
- `review/` — 검수 패키지(캡처 1440/390/360, 섹션 앵커표, 메타·헤딩·JSON-LD 표, 빌드 커밋·캡처 시각)
- `docs/` — 기획서·디자인 명세 사본

## 기술 기준
- 빌드 없는 정적 사이트(GitHub Pages 그대로 배포, Gemini가 HTML 원본을 직접 읽을 수 있게)
- 모션: GSAP + ScrollTrigger, Lenis, three.js (ES module, CDN 고정 버전)
- 모바일: dvh, 터치 스크롤, prefers-reduced-motion, 저사양 GPU 분기, word-break: keep-all
