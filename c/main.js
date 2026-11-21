/* C — THE DOD EDIT 모션 · 명세 v0.3
 * 마스트헤드 clip reveal 650ms, 사진 3장 90ms 간격 30px/700ms, 편집 띠 18px/s(정지 버튼),
 * 목차 선 450ms + Chapter 행 80ms 간격/500ms. 가로 강제 스크롤·자동 페이지 넘김 없음.
 */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 주소 복사 (C06 해외 방문)
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var status = document.querySelector('.copy-status');
      var text = b.getAttribute('data-copy');
      var done = function () { status.textContent = 'Address copied · 주소를 복사했습니다'; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () { status.textContent = text; });
      else status.textContent = text;
    });
  });

  // 편집 띠 18px/s — requestAnimationFrame, 정지 버튼, reduced-motion이면 정지 상태로 시작
  var track = document.querySelector('.band-track');
  var toggle = document.querySelector('.band-toggle');
  var paused = reduce, x = 0, last = 0, half = 0;
  function measure() { half = track.firstElementChild.getBoundingClientRect().width; }
  function tick(t) {
    if (!last) last = t;
    var dt = Math.min((t - last) / 1000, 0.1); last = t;
    if (!paused && half) { x -= 18 * dt; if (-x >= half) x += half; track.style.transform = 'translate3d(' + x + 'px,0,0)'; }
    requestAnimationFrame(tick);
  }
  function setLabel() { toggle.textContent = paused ? '흐르는 띠 재생' : '흐르는 띠 멈춤'; toggle.setAttribute('aria-pressed', String(paused)); }
  if (track && toggle) {
    measure(); window.addEventListener('resize', measure);
    if (document.fonts) document.fonts.ready.then(measure);
    toggle.addEventListener('click', function () { paused = !paused; setLabel(); });
    setLabel();
    requestAnimationFrame(tick);
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('js-motion');

  // 표지
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.masthead .mh-line', { clipPath: 'inset(0 0% 0 0)', duration: 0.65, stagger: 0.12 }, 0.05)
    .fromTo('[data-photo]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.35)
    .from('.cover-copy > *', { opacity: 0, y: 16, duration: 0.6, stagger: 0.07 }, 0.3);

  // 목차: 선 450ms → 행 80ms 간격 500ms
  var toc = document.querySelector('[data-toc]');
  if (toc) {
    var t2 = gsap.timeline({ scrollTrigger: { trigger: toc, start: 'top 80%', once: true } });
    t2.fromTo(toc, { '--l': 0 }, { '--l': 1, duration: 0.45, ease: 'power2.out' })
      .fromTo(toc.querySelectorAll('li'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.2);
  }

  // 본문 블록
  gsap.utils.toArray('[data-rise]').forEach(function (el) {
    gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  gsap.utils.toArray('.chapter-head, .contents-head').forEach(function (el) {
    gsap.from(el.children, { opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  if (document.fonts) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
