# 디오디청담 — 3개 독립 디자인 방향 v0.5 (기획 v1·생성 이미지 1차 검수 대응)

작성: 리사 / 2026-11-21. 개발 착수용 제안이며 나주의 독립 조사·기획에 맞춰 섹션 카피를 확정한다.

## 조사 범위와 사실 경계
- 직접 HTML 확인: https://jeonjaeman.github.io/dod-cheongdam/ 는 탱탱소프트 제안서. 기존 결론을 디자인 근거로 재사용하지 않았다.
- 직접 HTML 확인: https://www.dodskin.com/ 는 디오디피부과의원 청담 공식 홈페이지. 원본 보관: `.scratch/LISA_DOD_OFFICIAL.html`.
- 공식 본문에 리프팅·콜라겐/스킨부스터·재생 프로그램, MetaVu 진단, 이준 대표원장, 1인 시술실, 프라이빗 케어가 소개되어 있다. 이는 병원 자체 설명이며 외부 입증과 구분한다.
- 공식 본문에 `제공합니다.` 중복 문장이 확인된다. 렌더 화면에서도 보이는지는 아직 미검증.
- 메뉴에 장비·제품명이 많다. 방문자가 서비스명을 모를 경우의 고민별 진입과 진단→설명→선택 동선을 디자인 가설로 제안한다.
- `최초`, 국가 지정, 세포 치료 효과, 경력 및 자격 표현은 나주의 근거 확인과 의료진 검토 전 새 카피에 확정 삽입하지 않는다. 장식적 세포 영상도 치료 과정·효과의 증거처럼 표현하지 않는다.
- 현재 브라우저 렌더·모바일 캡처 진단은 미실시. 아래 레퍼런스는 미리보기 검증을 마친 복제 대상이 아니라 관찰할 방향이다.

## 공통 품질 — 공통 템플릿은 아님
- 한글 본문 Pretendard, 17px/1.75(모바일 16px/1.7), word-break: keep-all; overflow-wrap: break-word. 긴 영어 장비명은 별도 wrapping.
- 본문 대비 4.5:1 이상. 약한 베이지/실버는 장식만. CTA 48px 이상, 모바일 바닥 안전영역 반영.
- 360/390/768/1440px에서 제목·메뉴·상담 버튼·가로 넘침 확인. 줄바꿈은 의미 구절 단위 span으로, 모든 너비에 같은 br를 강제하지 않는다.
- 시각효과는 정보와 클릭을 덮지 않는다. 기본 세로 스크롤 보존. 스크롤 강제 잠금·로딩 인트로·커서 숨김 금지.
- reduced-motion은 영상 정지 포스터, WebGL 정지, 즉시 노출. 이는 디자인 축소가 아니라 같은 구도와 정보의 대체 경험.
- 모든 이미지의 실제/생성/설명용 구분을 자산 장부에 기록. 실제 의료진·시설·장비는 합성으로 위장하지 않는다.

## A — THE PRIVATE ATELIER / 빛과 여백의 프라이빗 아틀리에

**컨셉:** 시술 목록보다 나를 대하는 태도를 먼저 보여 주는 따뜻한 건축·호스피탈리티 브랜드.

- 팔레트: 배경 #F3EFE7 / 본문 #28251F / 포인트 #70583D / 선 #D6CEC1.
- 서체: 영어 Cormorant Garamond 500(최대 108px), 한글 Noto Serif KR 500(PC 56px/1.3, 모바일 34px/1.35); 설명 Pretendard.
- 히어로: 좌측 42% 텍스트, 우측 58% 키 큰 빛·석재 무빙이미지. 전체 화면 영상 위 중앙 카피 구성 금지. 좌측 하단 01/03과 세로 선.
- 헤드라인: 나주 기획 v1의 `나의 피부에 집중하는 시간`만 사용. 아래 대응 절의 의미 단위 줄바꿈 적용.
- PC 12열, 최대 1320px, 거터 28px, 바깥 64px. 섹션 상하 padding 각각 160px(연속 섹션 콘텐츠 사이 합계 320px). 모바일 바깥 24px, 섹션 상하 padding 각각 88px(콘텐츠 사이 합계 176px). 넓은 호흡을 의도한 기준이며 요소 내부 간격과는 별개.
- 화면 구성: A01 분할 히어로 → A02 진료 철학 → A03 실제 공간 → A04 의료진 → A05 서비스 → A06 방문 순서 → A07 위치·전화 문의. 카피는 기획 v1 기준.
- 공간·의료진은 공식 원본을 출처와 함께 확보하고 실제 사진 사용 권한을 확인한다. 생성된 건축 영상은 배경 무드에만 사용하고 실제 병원 전경으로 표시하지 않는다.
- 모션: 히어로 이미지 마스크가 아래→위로 1100ms, 텍스트 구절별 120ms 간격/800ms; 단어별 산산이 등장 금지. 이미지 패럴랙스 ±24px, 일반 섹션 24px y/900ms. 여정은 세로 선 드로잉(각 항목 500ms). easing cubic-bezier(.22,1,.36,1).
- 모바일: 텍스트 우선 → 4:5 이미지. 패럴랙스 최대 12px, 1열 여정. 3안 중 가장 느리고 부드러운 리듬.
- 힉스필드 A01 이미지: `Extreme close-up abstract study of ivory travertine surface and translucent linen folds, warm raking late-afternoon light, tactile material textures fill the entire frame edge to edge, sculptural composition, generous quiet negative space on left, premium Korean luxury editorial. No window, no garden, no room, no interior, no architecture, no building, no vase, no clinic, no people, no text, no logo, no medical equipment. 16:9.`
- A02 영상: A01 승인 이미지 기반 6초 루프, 거의 정지한 카메라, 천 그림자만 미세하게 이동. 프레임 끝과 시작의 광량 일치. 16:9와 모바일 4:5 별도 crop.
- 자산: a-atmosphere.webp(PC 1920, 모바일 900), a-atmosphere.mp4(6초, 무음), a-poster.webp.

## B — PRECISION ATLAS / 정교함을 시각화한 디지털 랩

**컨셉:** 장비를 늘어놓지 않고 관찰·진단·설계의 정밀함을 추상 3D와 읽기 쉬운 정보로 보여 주는 데이터 중심 브랜드.

- 팔레트: #08171A 배경 / #F0F6F2 본문 / #A8E4CE 포인트 / #8FAAA4 보조 글자.
- 서체: 영어 Space Grotesk 500(PC 88px), 한글 Pretendard 500(PC 64px/1.15, 모바일 38px/1.2). 작은 인덱스 IBM Plex Mono.
- 히어로: 전체 공간에 단일 반투명 렌즈형 3D 오브젝트. 좌상단 2줄 타이포, 우하단 진단 철학 설명. 금색 입자·피부 얼굴 스캔·의료 진단인 척하는 수치 금지.
- 헤드라인: 나주 기획 v1의 `선택에 앞서, 피부를 이해하다`만 사용.
- PC 비대칭 7:5, max 1440px, 바깥 48px. 1px 구분선과 넘버링; 라운드 카드 반복 금지. 섹션 상하 padding 각각 120px. 모바일 바깥 20px, 섹션 상하 padding 각각 72px, 요소 사이 24px.
- 구성: B01 WebGL 히어로 → B02 진단 과정 → B03 관심사 탐색 → B04 분야별 설명 → B05 의료진 → B06 FAQ → B07 질문 체크리스트·상담. 진단장비 설명은 B02 안에 배치한다.
- 모션: three.js 투명 렌즈 또는 비유기적 유리 오브젝트 1개, 천천히 0.08rad/s 회전; 포인터 이동 시 최대 ±0.08rad, 마우스가 없어도 동일 정보 표시. 해상도 DPR 최대 1.5(모바일 1.25), 화면 밖 render 중지. WebGL 실패 시 동일 장면 포스터.
- 첫 1.5 viewport 구간에 스크롤 연동 회전 0→0.7rad, 고정 스크롤 금지. 단계선 진행 400ms. 서비스 탭 선택은 텍스트·이미지 crossfade 280ms, 키보드 가능. 카운트업으로 임의 효과 수치 만들지 않는다.
- 모바일: 히어로 텍스트 상단/오브젝트 하단 42svh, 가로 스크롤 없음. 저사양은 승인된 오브젝트 영상 루프 또는 포스터. 정보 선택 기능은 동일.
- 힉스필드 B01 이미지: `Single sculptural translucent optical glass lens, non-biological abstract geometry, subtle pale jade highlights, almost-black deep teal seamless background target hex #08171A, background and floor uniformly dark, subdued caustics localized directly beneath object, no bright teal gradient, off-center object on right with empty upper left, premium abstract editorial still life, realistic glass, no skin, no faces, no cells, no charts, no text, no logo. 16:9.`
- B02 영상: 승인 B01을 6초, 유리 오브젝트 10도 이하 서서히 회전, 형태 변형 없음, 카메라 정지, 무음. WebGL 대체 영상이며 실제 기기 작동처럼 설명하지 않는다.
- 자산: b-optic-reference.webp, b-optic-loop.mp4, b-optic-poster.webp. 실시간 WebGL의 렌즈 재질·광원은 이 승인 이미지와 맞춘다.

## C — THE DOD EDIT / 대담한 에디토리얼 스킨 저널

**컨셉:** 현대 뷰티 매거진처럼 선명한 타이포와 인물·정물의 편집으로 자기다운 아름다움을 이야기하는 문화적 브랜드.

- 팔레트: C01 표지는 #802B3A 버건디 전면 바탕 + #FFFFFF 글자. 본문 지면 #FFFFFF / 본문 글자 #231F20 / 포인트 #802B3A / 장식 #E4BCAB. 아이보리 지면 사용 금지. CSS --cover-bg: #802B3A. C02 목차는 먹색 바탕과 흰 글자로, C03 이후는 순백 편집면으로 대비.
- 서체: 영어 Bodoni Moda 500(PC 160px, 모바일 76px), 한글 Pretendard 600(PC 64px, 모바일 36px), 캡션 Pretendard 13px. A의 한국어 세리프와 명확히 구분.
- 히어로: 화면 폭의 `THE DOD EDIT` 대형 마스트헤드 → 하단 서로 다른 높이의 3개 비정형 사진/정물 + 버건디 문장 띠. 중앙 정렬 전체 영상 금지. 대형 타이포도 실제 h1은 명확한 한글로 유지.
- 헤드라인: 나주 기획 v1의 `오늘의 관심에서 시작하는 피부 이야기`만 사용. 모바일 3행: `오늘의 관심에서` / `시작하는` / `피부 이야기`.
- PC 3열 편집 그리드, 중간 이미지가 80px 아래로 내려가는 구조. 숫자 ISSUE 01, 얇은 자막과 큰 제목 대비. 섹션 상하 padding 각각 100px, 좌우 40px. 모바일 좌우 20px, 섹션 상하 padding 각각 64px, 기사 사이 40px, 제목-설명 20px.
- 구성: C01 표지 → C02 Vol.01·Chapter 순서형 목차 → C03 분야 스토리 → C04 의료진 저널 편집 → C05 프로그램 → C06 방문·카카오 채널. 고민 선택 UI는 B에만 사용.
- 모션: 마스트헤드 clip reveal 650ms, 사진 3장이 90ms 간격으로 30px 이동/700ms. 편집 띠 18px/s(정지 버튼 제공). 데스크톱 사진 hover scale 1.035/500ms, 타이틀 underline 240ms. 인터뷰 챕터는 본문 읽기 흐름 유지, 가로 강제 스크롤 없음.
- 모바일: 마스트헤드 2행, 사진은 큰 1장+작은 2장. 대형 텍스트 넘침을 마스킹으로 숨기지 말고 실제 레이아웃 내 맞춘다. 띠는 reduced-motion에서 정지.
- 힉스필드 C01: `Premium contemporary beauty magazine cover still life, full-bleed matte deep burgundy background and floor target hex #802B3A, peach translucent glass sculpture and sculptural bright white satin ribbon, expressive direct studio flash with crisp shadows, lower-half object placement and generous clean burgundy space in upper half for typography, sophisticated bold art-school composition. No ivory, no cream background, no beige paper, no branches, no flowers, no plants, no cosmetic packaging, no face, no medical claims, no text, no logo. 4:5.`
- C02: C01과 같은 조명·소재로 천이 좌측 하단을 가로지르는 별도 3:4 컷. 얼굴이 필요하면 생성 인물임을 표시하고 환자·의료진·시술 후 사례로 제시하지 않는다.
- C03 영상: 리본이 한 번 부드럽게 휘어지는 5초 편집형 영상. A의 자연광 고정 건축/ B의 회전 유리와 명확히 다르게. 불필요한 얼굴 합성 금지.
- 자산: c-editorial-01.webp, c-editorial-02.webp, c-ribbon.mp4, c-poster.webp.

## 레퍼런스 수집 상태 — 출처와 검증 수준
- Awwwards health/fitness 탐색 페이지 https://www.awwwards.com/websites/health-fitness/ : HTTP 200 확인. 아직 개별 사례 화면·모션 직접 검증 전. 수상작 명칭을 임의 기재하지 않는다.
- Aman https://www.aman.com/ : HTTP 200. A의 공간·호스피탈리티 편집 관찰 후보. 실제 레이아웃·모션 분석은 브라우저 검증 후 추가.
- Aesop https://www.aesop.com/ : 현재 요청 HTTP 403. 열람한 레퍼런스로 주장하지 않는다.
- 웹쟁이·Mobbin MCP: 현재 Buzz 플러그인 목록 및 노출 도구에서 연결 미확인. 로컬 Claude MCP 이름에도 Mobbin 없음. 미사용 상태.
- 화면 관찰 전 링크 후보를 '수집 완료 레퍼런스 보드'라 보고하지 않는다. 위 3안은 지금 시점 리사의 독립 아트디렉션 제안이다.

## 생성·개발 전달 순서
1. 소연이 확인한 Higgsfield CLI 사용 경로로 A01/B01/C01 이미지부터 각 1개 생성한다. 모델 기본값에 맡기지 말고 실제 지원 비율·모델·크레딧을 확인해 장부 기록. 무제한 재생성하지 않는다.
2. 리사가 3개 이미지를 같은 캔버스 크기로 비교하여 톤·구도·콘셉트 중복과 위조 위험을 검수한다. 승인 전 영상 생성은 하지 않는다.
3. 승인 이미지로 각 영상 1개. PC/모바일 crop에서 타이틀 안전영역 확인. mp4 H.264 무음, playsinline, poster 우선. 모바일 데이터 절약 설정에서는 자동재생하지 않는다.
4. 소연은 세 안의 HTML/CSS/JS 독립 작성. 동일 카드/히어로 DOM에 토큰만 교체하는 방식 금지. 기획 콘텐츠의 출처·사실은 동일하게 유지한다.
5. 니키타가 첫 화면 1440/390 캡처를 나란히 비교. 색을 제거한 흑백에서도 구도·타이포·비주얼 서사가 다르면 차별화 통과 후보.
6. 나주의 최종 섹션/카피를 대응표로 연결. 실제 공개 전 의료 표현·권리·상담 개인정보 전송 여부 검토. 초안 폼은 실제 정보 수집 없이 데모임을 표시.

## 나주 기획 v0 대응 — 본 절이 앞의 구조·카피 가설보다 우선
나주의 DOD_THREE_CONCEPTS_V0.md를 직접 읽고 아래와 같이 연결한다. 색/구도/모션은 본 명세, 실제 화면의 카피·섹션 순서·CTA는 나주 v0가 기준이다.
- A01은 풀 높이(PC min-height: 92svh) 안의 42:58 분할 시네마틱 히어로. 따라서 A의 풀스크린 경험과 비대칭 구도를 함께 충족. 헤드라인은 `나의 피부에` / `집중하는 시간`. A02 철학 → A03 공간 → A04 의료진 → A05 서비스 → A06 방문 순서 → A07 위치 순서를 따른다.
- B01 카피 `선택에 앞서,` / `피부를 이해하다`. B02 진단 → B03 관심사 → B04 분야 → B05 의료진 → B06 FAQ → B07 상담. B03의 3개 주제는 가로 탭/하단 설명으로 구성하되, 좁은 화면에서 3행 버튼으로 전환. 선택 상태는 URL/네트워크/저장소에 기록하지 않는다. UI는 DOM이며 오브젝트는 장식이다.
- C01 한글 H1은 나주 기획 v1 확정문을 의미 단위로 배치. THE DOD EDIT 마스트헤드는 장식 텍스트. C02 순서형 목차 → C03 분야 스토리 → C04 의료진 → C05 프로그램 → C06 방문. C03은 세 개 동일 카드가 아니라 큰 리드 기사+세로 부기사 2개. C04는 승인된 소개문을 편집한 형식이며 가상 인터뷰/인용부호를 만들지 않는다.
- B는 전 섹션 #08171A 짙은 틸 바탕을 유지한다. #F0F6F2 밝은 면은 B04 내부 표 등 안쪽 컴포넌트에만 적용(섹션 면적 30% 이하); 전체 폭 밝은 섹션 교차 사용 금지.
- 모든 인덱스/초안에 noindex, 디자인 데모 표시, 개인정보 미수집. 초기 전달물에는 외부 검증되지 않은 자격·지정 문구를 넣지 않는다.

## 니키타 검토 반영 보완 v0.2 — 시각 명세 우선 적용
- B 주조색은 #08171A 딥 틸로 유지한다. 밝은 면은 B04 안쪽 표·카드 단위(섹션 면적 30% 이하)에만 사용하여 A와 전 페이지 명도부터 분리한다.
- C02는 고민 선택 버튼 대신 `VOL.01 / CONTENTS` 아래 Chapter 01 진료 이야기 / 02 사람 / 03 공간·방문 순의 목차로 제안한다. C01 CTA는 `이번 호 읽기`; 본문을 순서대로 읽고 다음 장 앵커로 이동하는 경험. B03 탭 탐색과 동일한 UI를 재사용하지 않는다. 카피 확정은 나주의 v1을 따른다.
- 의료진 표현은 A04=실제 인물 사진과 넓은 공간 여백 / B05=확인된 전문분야·소개 링크의 정렬된 표 / C04=비대칭 인물+승인 소개문 편집. C에 가상 발언을 생성하지 않는다.
- A/B/C 헤더에 KO·EN·简体·繁體·JA 전환 자리 확보. 실제 목적 URL 확인 전 작동하는 번역인 것처럼 표시하지 않는다. 모바일은 메뉴 내부의 언어 목록으로, 터치 영역 44px 이상.
- C06은 해외 방문자를 위한 방문 정보 블록(주소 복사, 지도, 공식 언어별 안내 링크)을 추가 제안. 통역·외국어 상담 제공 여부를 추정하지 않는다.
- 상담 행동은 A=전화·방문, B=상담 때 확인할 질문을 읽고 공식 문의로 이동, C=공식 메신저 링크를 검증한 경우에만 메신저 안내. 차별화를 위해 존재하지 않는 채널을 만들지 않는다.
- 진료시간은 공식 HTML에 평일 10–19시 / 금요일 10–21시 / 토요일 10–16시, 평일·금요일 휴게 13–14시로 표기되어 있음. 평일의 금요일 중첩은 원문을 그대로 옮기거나 고객 확인 후 월–목으로 명료화. 운영시간 실사 확인은 아님.

## 기획 v1 동기화 v0.3
- C02 목차 확정: `VOL.01` 표제와 Chapter 번호를 세로 편집. 고민 선택형 버튼·필터 제거. 각 항목은 해당 본문 앵커로 이동, 각 장 하단의 `다음 장` 링크로 이어 읽기. 키보드·터치 모두 작동. 원래 C02 id는 유지.
- C01 주 CTA `이번 호 읽기` → #C02. 목차 등장: 얇은 선 450ms, Chapter 행 80ms 간격/500ms. reduced-motion은 즉시 표시. 자동 페이지 넘김·강제 가로 스크롤 없음.
- A04 `진료를 함께할 의료진` 반영.
- 주 행동 A=전화·방문 문의, B=질문 체크리스트 후 공식 상담, C=카카오 채널. 나주가 공식 HTML에서 확인한 링크 `https://pf.kakao.com/_cBamG`를 C에 사용하며, 실제 응대 여부는 미검증으로 구분한다.
- 위 보완은 나주의 2026-11-21 기획 v1 전달(buzz event cdebf28348431260d688430709f692725e532c7289d9993a1e807b7d745f882f) 기준. 개별 카피는 기획 v1, 디자인 수치는 본 명세를 기준으로 한다.

## 착수 우선순위
A 분할 히어로 → B 오브젝트 히어로 → C 표지 히어로를 먼저 구현하고 동일 크기 화면을 비교한다. A의 섹션 카피는 나주의 기획 v1을 적용하고, 레이아웃은 위 기준으로 착수 가능하다. 세 안 모두 같은 순서로 복사하지 않는다.

## v0.4 검수 보완
- 모바일 섹션 padding 기준 A=상하 각각 88px, B=각각 72px, C=각각 64px. 연속 섹션 경계는 각 섹션의 padding을 합산한 실제 간격도 캡처로 검수한다.
- C 전면 버건디 커버로 확정; 흰색 마스트헤드의 얇은 획은 390/360px 실제 렌더에서 검토한다.
- A Noto Serif KR은 필요한 글리프 서브셋·font-display: swap 적용. 영문 장식 글자보다 한글 핵심 카피의 가독성 우선.

## 생성 이미지 1차 검수 / v0.5
비교본 compare-01.jpg 직접 열람 및 Claude Code claude-fable-5-1 / medium 이미지 검수 병행. 실제 modelUsage는 이번 검수에서 claude-fable-5-1만 표기.
- A01 미승인: 창문·정원·실내로 읽힘. 위 A01 수정 프롬프트로 재생성.
- B01 재질 참고 승인, 공개용 포스터 미승인: 밝은 틸 배경. 위 B01 수정 프롬프트로 재생성하고 CSS #08171A 접합 확인.
- C01 공개 표지 미승인: 크림 배경. 위 C01 수정 프롬프트로 버건디 전면·흰 리본·가지 없는 정물 재생성.
- 영상은 세 재생성 이미지 승인 후 진행. 생성 모델은 정확한 hex를 보장하지 않으므로 출력 후 픽셀/화면 접합을 확인하고 필요 시 가장자리 배경만 보정한다.
