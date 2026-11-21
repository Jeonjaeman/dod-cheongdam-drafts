/* A — PRIVATE ATELIER 모션 · 명세 v0.3
 * 히어로 마스크 아래→위 1100ms, 구절 120ms 간격/800ms, 패럴랙스 ±24px(모바일 12px),
 * 섹션 24px y/900ms, 여정 세로선 항목당 500ms, ease cubic-bezier(.22,1,.36,1)
 */
(function () {
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  if (window.CustomEase) gsap.registerPlugin(CustomEase);
  document.documentElement.classList.add('js-motion');

  var EASE = 'cubic-bezier(.22,1,.36,1)';
  if (window.CustomEase) { EASE = CustomEase.create('atelier', '.22,1,.36,1'); }
  else { EASE = 'expo.out'; }
  var isMobile = window.matchMedia('(max-width: 767px)').matches;
  var PARALLAX = isMobile ? 12 : 24;

  // Lenis: 기본 세로 스크롤을 유지하는 관성만 추가(잠금 없음). 터치는 네이티브 그대로.
  if (window.Lenis) {
    var lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -(header.offsetHeight + 8) });
        history.replaceState(null, '', a.getAttribute('href'));
      });
    });
  }

  // A01 히어로: 이미지 마스크 아래→위 1100ms, 텍스트 구절 120ms 간격 800ms
  var heroMask = document.querySelector('.hero [data-mask]');
  var heroImg = heroMask && heroMask.querySelector('img');
  var tl = gsap.timeline({ defaults: { ease: EASE } });
  if (heroMask) {
    tl.fromTo(heroMask, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1 }, 0)
      .fromTo(heroImg, { scale: 1.16 }, { scale: 1.08, duration: 1.6 }, 0);
  }
  tl.fromTo('.hero .eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
    .fromTo('.hero [data-phrase]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.3);

  // 이미지 패럴랙스
  document.querySelectorAll('[data-parallax]').forEach(function (img) {
    gsap.fromTo(img, { y: -PARALLAX }, {
      y: PARALLAX, ease: 'none',
      scrollTrigger: { trigger: img.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // 비(非)히어로 마스크: 화면 진입 시 아래→위
  document.querySelectorAll('section:not(.hero) [data-mask]').forEach(function (m) {
    gsap.fromTo(m, { clipPath: 'inset(100% 0 0 0)' }, {
      clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: EASE,
      scrollTrigger: { trigger: m, start: 'top 85%', once: true }
    });
  });

  // 일반 섹션 등장: 24px y / 900ms, 같은 섹션 안에서 120ms 간격
  document.querySelectorAll('main section:not(.hero)').forEach(function (sec) {
    var items = sec.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    gsap.fromTo(items, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: EASE,
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true }
    });
  });

  // A06 여정: 세로선 드로잉, 항목당 500ms
  var steps = document.querySelector('[data-journey]');
  if (steps) {
    var lis = steps.querySelectorAll('li');
    gsap.set(lis, { opacity: 0, y: 16 });
    var jt = gsap.timeline({ scrollTrigger: { trigger: steps, start: 'top 75%', once: true } });
    jt.fromTo(steps, { '--draw': 0 }, { '--draw': 1, duration: 0.5 * lis.length, ease: 'none' }, 0);
    lis.forEach(function (li, i) { jt.to(li, { opacity: 1, y: 0, duration: 0.5, ease: EASE }, i * 0.5); });
  }

  // 폰트 로드 후 레이아웃 재계산
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
