/* B — 탭(키보드·터치), 등장 모션. 선택 상태는 URL·저장소·네트워크에 기록하지 않는다. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // B03 탭: 클릭 + ←/→/↑/↓/Home/End, 280ms 크로스페이드
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (on) {
        panel.hidden = false;
        if (!reduce && window.gsap) gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power1.out' });
      } else {
        panel.hidden = true;
      }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') n = tabs[0];
      else if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });

  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('js-motion');

  // 히어로 문구
  gsap.fromTo('.hero [data-in]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15 });

  // 섹션 제목
  document.querySelectorAll('main section:not(.hero) .sec-head').forEach(function (h) {
    gsap.from(h.children, { opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 82%', once: true } });
  });

  // B02 단계선 400ms
  var steps = document.querySelector('[data-steps]');
  if (steps) {
    var lis = steps.querySelectorAll('li');
    var tl = gsap.timeline({ scrollTrigger: { trigger: steps, start: 'top 78%', once: true } });
    tl.fromTo(steps, { '--p': 0 }, { '--p': 1, duration: 0.4 * lis.length, ease: 'none' }, 0);
    lis.forEach(function (li, i) { tl.from(li, { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' }, i * 0.4); });
  }

  // B04 표 행
  gsap.utils.toArray('[data-row]').forEach(function (row, i) {
    gsap.fromTo(row, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
  });
})();
