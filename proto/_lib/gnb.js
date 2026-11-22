/* DOD 초안 공용 전체 메뉴(GNB)
 * - 메뉴 구성: dodskin.com 실제 1·2차 메뉴(2026-11-22 원본 HTML 기준)
 * - 메인 안에 내용이 있는 메뉴만 #섹션으로 이동(window.GNB_MAP: {라벨: '#id'})
 * - 나머지는 링크 없는 버튼: 누르면 "초안은 메인페이지만" 안내
 * 사용: <header id="hd" data-gnb> 안에 <span data-gnb-slot></span>, 바로 뒤에서 이 파일을 동기 로드
 *       (각 안의 a[href^="#"]·[data-to] 스크롤 처리기가 이 메뉴 링크에도 붙도록 본 스크립트보다 먼저 실행)
 */
(function () {
  var MENU = [
    ['병원 소개', ['의료진 및 연구진', '시설안내', '오시는길']],
    ['줄기세포 센터', ['줄기세포란?', 'NK세포란?', '이나셀', '첨단재생의료 실시기관']],
    ['온디맨드 리프팅', ['울쎄라', '써마지', '덴서티', '티타늄', '튠', '엠페이스', '토르RF', '올타이트', '듀오타이트', '엑시온']],
    ['온디맨드 부스터', ['콜라겐 부스터', '스킨 부스터']],
    ['온디맨드 페이스/바디', ['윤곽', '색소', '모공/흉터', '제모', '힙컬트라', '탈모 치료', '에스테틱']],
    ['특수클리닉', ['고압산소클리닉', '기능의학클리닉', '청담 켈로이드 흉터 클리닉']],
    ['프로그램', ['셀리프팅 프로그램', '셀스캐폴드']],
    ['프로모션', ['이벤트', 'CLUB 더블디 멤버십']],
    ['커뮤니티', ['언론보도']]
  ];
  var MAP = window.GNB_MAP || {};
  var hd = document.getElementById('hd');
  var slot = hd && hd.querySelector('[data-gnb-slot]');
  if (!hd || !slot) return;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function item(label) {
    var to = MAP[label], n;
    if (to) {
      n = el('a', 'gnb-go', label); n.href = to; n.setAttribute('data-to', to);
      n.appendChild(el('span', 'gnb-here', '이 페이지')).setAttribute('aria-hidden', 'true');
    } else {
      n = el('button', 'gnb-x', label); n.type = 'button'; n.setAttribute('data-gnb-note', label);
      n.setAttribute('aria-describedby', 'gnbNoteDesc');
    }
    return n;
  }
  function list(cls, subs) {
    var ul = el('ul', cls);
    subs.forEach(function (s) { var li = el('li'); li.appendChild(item(s)); ul.appendChild(li); });
    return ul;
  }

  /* ---- PC: 1차 한 줄 + 전체 폭 드롭다운 ---- */
  var nav = el('nav', 'gnb'); nav.setAttribute('aria-label', '전체 메뉴');
  var top = el('ul', 'gnb-top');
  MENU.forEach(function (g) {
    var li = el('li', 'gnb-g');
    li.appendChild(el('span', 'gnb-t', g[0]));
    li.appendChild(list('gnb-sub', g[1]));
    top.appendChild(li);
  });
  nav.appendChild(top);
  var band = el('div', 'gnb-band'); band.setAttribute('aria-hidden', 'true');
  var bn = el('p', 'gnb-band-note'); bn.appendChild(el('i'));
  bn.appendChild(document.createTextNode('표시 메뉴는 이 페이지 안의 해당 내용으로 이동합니다 · 나머지는 실제 제작 때 상세페이지로 연결 (초안은 메인페이지만)'));
  band.appendChild(bn);
  slot.replaceWith(nav);
  hd.appendChild(band);
  /* 1차 칸은 같은 폭(flex 1:1, 최소 = 1차 글자 폭). 한 줄에 다 안 들어가면 촘촘하게 → 그래도 넘치면 햄버거로 */
  function fitCols() {
    hd.classList.remove('gnb-tight', 'gnb-fold');
    if (getComputedStyle(nav).display === 'none') return;
    if (top.scrollWidth > nav.clientWidth + 1) hd.classList.add('gnb-tight');
    if (top.scrollWidth > nav.clientWidth + 1) hd.classList.add('gnb-fold');
  }
  fitCols();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitCols);
  var rT; addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(fitCols, 150); });
  fitCols();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitCols);

  var openT;
  function setOpen(on) {
    clearTimeout(openT);
    if (on) {
      var h = 0; nav.querySelectorAll('.gnb-sub').forEach(function (u) { h = Math.max(h, u.scrollHeight); });
      var hr = hd.getBoundingClientRect(), tb = top.getBoundingClientRect().bottom - hr.top;
      hd.style.setProperty('--gnb-line-y', Math.round(tb + 10) + 'px');
      hd.style.setProperty('--gnb-band-h', Math.round(tb + 22 + h + 58) + 'px');
      hd.classList.add('gnb-open');
    } else openT = setTimeout(function () { hd.classList.remove('gnb-open'); }, 120);
  }
  nav.addEventListener('mouseenter', function () { setOpen(true); });
  nav.addEventListener('mouseleave', function () { setOpen(false); });
  band.addEventListener('mouseenter', function () { setOpen(true); });
  band.addEventListener('mouseleave', function () { setOpen(false); });
  nav.addEventListener('focusin', function () { setOpen(true); });
  nav.addEventListener('focusout', function (e) { if (!nav.contains(e.relatedTarget)) setOpen(false); });

  /* ---- 모바일: 햄버거 + 전체 화면 아코디언 ---- */
  var btn = el('button', 'gnb-burger'); btn.type = 'button';
  btn.setAttribute('aria-label', '전체 메뉴 열기'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'gnbPanel');
  btn.innerHTML = '<i></i><i></i><i></i>';
  hd.appendChild(btn);

  var panel = el('div', 'gnb-panel'); panel.id = 'gnbPanel';
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', '전체 메뉴');
  panel.setAttribute('data-lenis-prevent', ''); panel.hidden = true;
  var ph = el('div', 'gnb-ph');
  ph.appendChild(el('span', 'gnb-pmark', 'DOD'));
  var close = el('button', 'gnb-close'); close.type = 'button'; close.setAttribute('aria-label', '전체 메뉴 닫기'); close.innerHTML = '<i></i><i></i>';
  ph.appendChild(close); panel.appendChild(ph);
  var acc = el('div', 'gnb-acc');
  MENU.forEach(function (g, i) {
    var sec = el('div', 'gnb-ag');
    var t = el('button', 'gnb-at'); t.type = 'button'; t.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    t.appendChild(el('span', '', g[0])); t.appendChild(el('em', 'gnb-cnt', String(g[1].length)));
    var ul = list('gnb-asub', g[1]); ul.id = 'gnbA' + i; t.setAttribute('aria-controls', ul.id); ul.hidden = i !== 0;
    t.addEventListener('click', function () { var on = t.getAttribute('aria-expanded') !== 'true'; t.setAttribute('aria-expanded', on); ul.hidden = !on; });
    sec.appendChild(t); sec.appendChild(ul); acc.appendChild(sec);
  });
  panel.appendChild(acc);
  panel.appendChild(el('p', 'gnb-pnote', '초안은 메인페이지만 보여 드립니다. ‘이 페이지’ 표시 메뉴는 이 페이지 안의 해당 내용으로 이동하고, 나머지 메뉴는 실제 제작 때 상세페이지로 연결됩니다.'));
  var tel = el('a', 'gnb-tel', '전화 문의 02-6203-6263'); tel.href = 'tel:02-6203-6263'; panel.appendChild(tel);
  document.body.appendChild(panel);

  var lastFocus;
  function panelOpen(on) {
    if (on) { lastFocus = document.activeElement; panel.hidden = false; requestAnimationFrame(function () { panel.classList.add('on'); }); document.documentElement.classList.add('gnb-lock'); close.focus(); }
    else { panel.classList.remove('on'); document.documentElement.classList.remove('gnb-lock'); setTimeout(function () { if (!panel.classList.contains('on')) panel.hidden = true; }, 320); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    var L = window.__gnbLenis && window.__gnbLenis(); if (L) on ? L.stop() : L.start();
  }
  btn.addEventListener('click', function () { panelOpen(true); });
  close.addEventListener('click', function () { panelOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!panel.hidden) panelOpen(false); hd.classList.remove('gnb-open'); hideNote(); }
  });
  /* 패널 안 이동 링크: 패널을 먼저 닫고(스크롤 잠금 해제) 각 안의 스크롤 처리기가 이어서 이동 */
  panel.addEventListener('click', function (e) { if (e.target.closest('.gnb-go')) panelOpen(false); }, true);
  nav.addEventListener('click', function (e) { if (e.target.closest('.gnb-go')) hd.classList.remove('gnb-open'); });

  /* ---- 서브페이지 메뉴 안내 ---- */
  var desc = el('span', 'gnb-sr', '초안에서는 이동하지 않는 메뉴'); desc.id = 'gnbNoteDesc'; document.body.appendChild(desc);
  var note = el('div', 'gnb-note'); note.setAttribute('role', 'status'); note.setAttribute('aria-live', 'polite');
  document.body.appendChild(note);
  var noteT;
  function hideNote() { note.classList.remove('on'); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-gnb-note]'); if (!b) return;
    note.innerHTML = '';
    note.appendChild(el('b', '', '‘' + b.getAttribute('data-gnb-note') + '’'));
    note.appendChild(document.createTextNode(' 메뉴는 실제 제작 때 상세페이지로 연결됩니다. 초안은 메인페이지만 보여 드립니다.'));
    note.classList.add('on'); clearTimeout(noteT); noteT = setTimeout(hideNote, 3200);
  });
})();
