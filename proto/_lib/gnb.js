/* DOD 초안 공용 전체 메뉴(GNB) v2
 * - 메뉴 구성: dodskin.com 공식 1·2·3차 메뉴 + 언어 5종 (나주 공통 목록 OUTBOX/DOD_COMMON_NAV_INVENTORY.md, 2026-11-22)
 * - 모든 메뉴 항목 = 같은 모양의 버튼: 누르면 "초안은 메인페이지만" 안내 (링크 아님, 빈 # 없음)
 * - 메인에 해당 섹션이 있는 항목만 옆에 별도 '메인에서 보기' 링크 (window.GNB_MAP: {라벨: '#id'})
 * - PC: 1차 = 버튼(aria-expanded). 누르거나 마우스를 올리면 전체 폭 메가메뉴. Esc로 닫고 포커스 복귀
 *   한 줄에 다 안 들어가면 글자를 줄이지 않고 바로 '전체 메뉴' 버튼 방식으로 전환
 * - 모바일/좁은 폭: 햄버거 → 전체 화면 아코디언
 * 사용: <header id="hd"> 안 <span data-gnb-slot></span>, 바로 뒤에서 이 파일을 동기 로드
 *       (각 안의 a[href^="#"]·[data-to] 스크롤 처리기가 '메인에서 보기' 링크에도 붙도록 본 스크립트보다 먼저 실행)
 */
(function () {
  var MENU = [
    ['병원 소개', ['의료진 및 연구진', '시설안내', '오시는길'], '청담피부과 - 디오디피부과의원 청담'],
    ['줄기세포 센터', ['줄기세포란?', 'NK세포란?', ['이나셀', ['이나셀 P', '이나셀 A', '이나셀 G', '이나셀 NK']], '첨단재생의료 실시기관']],
    ['온디맨드 리프팅', ['울쎄라', '써마지', '덴서티', '티타늄', '튠', '엠페이스', '토르RF', '올타이트', '듀오타이트', '엑시온']],
    ['온디맨드 부스터', [['콜라겐 부스터', ['리투오', '레빅스', '레티젠', '쥬베룩', '래디어스', '고우리', '힐로웨이브', '올리디아']], ['스킨 부스터', ['리쥬란', '엑소좀', '필로가', '벨로테로 리바이브']]]],
    ['온디맨드 페이스/바디', [['윤곽', ['스컬트라', '실리프팅', '필러', '보톡스']], ['색소', ['프리미엄 색소레이저']], ['모공/흉터', ['실펌X', '더블타이트', '큐어젯', 'CO2 프락셀']], '제모', '힙컬트라', '탈모 치료', '에스테틱']],
    ['특수클리닉', ['고압산소클리닉', ['기능의학클리닉', ['메디컬 수액', '나드주사', '포톤테라피']], '청담 켈로이드 흉터 클리닉']],
    ['프로그램', ['셀리프팅 프로그램', '셀스캐폴드']],
    ['프로모션', ['이벤트', 'CLUB 더블디 멤버십']],
    ['커뮤니티', ['언론보도']]
  ];
  var LANGS = [['한국어', 'ko', true], ['English', 'en'], ['中文 (简体)', 'zh-Hans'], ['日本語', 'ja'], ['中文 (繁體)', 'zh-Hant']];
  var MAP = window.GNB_MAP || {};
  var hd = document.getElementById('hd');
  var slot = hd && hd.querySelector('[data-gnb-slot]');
  if (!hd || !slot) return;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  /* 메뉴 항목 1개: 안내 버튼 (+ 메인에 섹션이 있으면 별도 '메인에서 보기' 링크) */
  function entry(label, lv) {
    var li = el('li', 'gnb-i gnb-l' + lv);
    var b = el('button', 'gnb-x', label); b.type = 'button'; b.setAttribute('data-gnb-note', label);
    b.setAttribute('aria-describedby', 'gnbNoteDesc'); li.appendChild(b);
    var to = MAP[label];
    if (to) {
      var a = el('a', 'gnb-go'); a.href = to; a.setAttribute('data-to', to);
      a.appendChild(el('span', '', '메인에서 보기'));
      a.setAttribute('aria-label', label + ' — 메인에서 보기');
      li.appendChild(a); li.classList.add('has-go');
    }
    return li;
  }
  function list(cls, items, lv) {
    var ul = el('ul', cls);
    items.forEach(function (it) {
      if (typeof it === 'string') { ul.appendChild(entry(it, lv)); return; }
      var li = entry(it[0], lv); li.classList.add('has-kids');
      li.appendChild(list('gnb-l3s', it[1], lv + 1)); ul.appendChild(li);
    });
    return ul;
  }
  function langs(cls) {
    var w = el('div', cls); w.setAttribute('role', 'group'); w.setAttribute('aria-label', '언어');
    LANGS.forEach(function (l) {
      var b = el('button', 'gnb-lang' + (l[2] ? ' on' : ''), l[0]); b.type = 'button'; b.lang = l[1];
      if (l[2]) { b.setAttribute('aria-current', 'true'); b.setAttribute('data-gnb-lang-cur', ''); b.appendChild(el('small', '', '현재')); }
      else { b.setAttribute('data-gnb-lang', l[0]); b.appendChild(el('small', '', '초안 미제공')); }
      w.appendChild(b);
    });
    return w;
  }

  /* ---- PC: 1차 버튼 한 줄 + 전체 폭 메가메뉴 ---- */
  var nav = el('nav', 'gnb'); nav.setAttribute('aria-label', '전체 메뉴');
  var top = el('ul', 'gnb-top');
  var tops = [];
  MENU.forEach(function (g, i) {
    var li = el('li', 'gnb-g');
    var t = el('button', 'gnb-t', g[0]); t.type = 'button'; t.setAttribute('aria-expanded', 'false'); t.setAttribute('aria-controls', 'gnbS' + i);
    if (g[2]) t.title = g[2];
    var sub = list('gnb-sub', g[1], 2); sub.id = 'gnbS' + i;
    li.appendChild(t); li.appendChild(sub); top.appendChild(li); tops.push(t);
  });
  nav.appendChild(top);
  var band = el('div', 'gnb-band'); band.setAttribute('data-lenis-prevent', '');
  var bf = el('div', 'gnb-band-foot');
  if (window.GNB_TAG) bf.appendChild(el('p', 'gnb-tag', window.GNB_TAG));
  bf.appendChild(el('p', 'gnb-band-note', '초안은 메인페이지만 제공합니다. 상세 메뉴는 구성 확인용이며, ‘메인에서 보기’만 이 페이지의 해당 내용으로 이동합니다.'));
  bf.appendChild(langs('gnb-langs'));
  band.appendChild(bf);
  slot.replaceWith(nav);
  hd.appendChild(band);
  /* 좁은 폭용 '전체 메뉴' 버튼(햄버거) — 패널을 엶 */
  var btn = el('button', 'gnb-burger'); btn.type = 'button';
  btn.setAttribute('aria-label', '전체 메뉴 열기'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'gnbPanel');
  btn.innerHTML = '<i></i><i></i><i></i>';
  hd.appendChild(btn);

  var isOpen = false, openT, lastTop = null;
  function measure() {
    var h = 0; nav.querySelectorAll('.gnb-sub').forEach(function (u) { h = Math.max(h, u.scrollHeight); });
    var hr = hd.getBoundingClientRect(), tb = top.getBoundingClientRect().bottom - hr.top;
    hd.style.setProperty('--gnb-line-y', Math.round(tb + 10) + 'px');
    hd.style.setProperty('--gnb-sub-top', Math.round(tb + 30) + 'px');
    var want = Math.round(tb + 30 + h + 40 + bf.offsetHeight + 20);
    hd.style.setProperty('--gnb-band-h', Math.min(want, innerHeight - hr.top) + 'px');
    return want <= innerHeight - 8;
  }
  function setOpen(on, from, hover) {
    clearTimeout(openT);
    if (on) {
      /* 화면 높이가 메가메뉴보다 낮으면 잘리지 않게 전체 화면 패널로 */
      if (!isOpen && !measure()) { if (!hover) panelOpen(true); return; }
      isOpen = true; hd.classList.add('gnb-open');
      tops.forEach(function (t) { t.setAttribute('aria-expanded', 'true'); });
      if (from) lastTop = from;
    } else {
      /* 닫힘은 즉시: 띠·하위 글자·헤더 글자색이 같은 프레임에 끝나도록 전환을 잠깐 끔 */
      hd.classList.add('gnb-snap');
      isOpen = false; hd.classList.remove('gnb-open');
      void hd.offsetWidth;
      requestAnimationFrame(function () { requestAnimationFrame(function () { hd.classList.remove('gnb-snap'); }); });
      tops.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
    }
  }
  function closeSoon() { clearTimeout(openT); openT = setTimeout(function () { if (!nav.matches(':hover') && !band.matches(':hover') && !nav.contains(document.activeElement) && !band.contains(document.activeElement)) setOpen(false); }, 160); }
  tops.forEach(function (t) {
    t.addEventListener('click', function () { if (isOpen && lastTop === t) { setOpen(false); } else setOpen(true, t); });
  });
  var hoverable = matchMedia('(hover: hover)');
  nav.addEventListener('mouseenter', function () { if (hoverable.matches) setOpen(true, null, true); });
  nav.addEventListener('mouseleave', function () { if (hoverable.matches) closeSoon(); });
  band.addEventListener('mouseenter', function () { clearTimeout(openT); });
  band.addEventListener('mouseleave', function () { if (hoverable.matches) closeSoon(); });
  hd.addEventListener('focusout', function (e) { if (isOpen && !nav.contains(e.relatedTarget) && !band.contains(e.relatedTarget)) setOpen(false); });
  document.addEventListener('pointerdown', function (e) { if (isOpen && !hd.contains(e.target) && !e.target.closest('.gnb-note')) setOpen(false); });
  nav.addEventListener('click', function (e) { if (e.target.closest('.gnb-go')) setOpen(false); });

  /* 열 폭: 같은 비율(flex 1:1)로 나누되 각 열 최소 = max(1차 글자, min(2차 글자, COLW)) */
  var COLW = 96;
  function cols() {
    top.querySelectorAll('.gnb-g').forEach(function (li) {
      var t = li.querySelector('.gnb-t'), u = li.querySelector('.gnb-sub');
      li.style.removeProperty('--gnb-colw');
      /* 한 줄 폭(최대 COLW까지 허용) · 쪼갤 수 없는 가장 긴 단어 폭 · '메인에서 보기' 버튼 폭 중 최대 */
      var tw = Math.ceil(t.scrollWidth), sw = 0, mw = 0;
      u.querySelectorAll(':scope > li > .gnb-x').forEach(function (b) {
        var s = b.style.cssText;
        b.style.whiteSpace = 'nowrap'; b.style.width = 'max-content'; sw = Math.max(sw, b.getBoundingClientRect().width);
        b.style.whiteSpace = ''; b.style.width = 'min-content'; mw = Math.max(mw, b.getBoundingClientRect().width);
        b.style.cssText = s;
      });
      u.querySelectorAll('.gnb-l3s .gnb-x').forEach(function (b) { var s = b.style.cssText; b.style.width = 'min-content'; mw = Math.max(mw, b.getBoundingClientRect().width + 11); b.style.cssText = s; });
      u.querySelectorAll('.gnb-go').forEach(function (a) { mw = Math.max(mw, a.getBoundingClientRect().width); });
      li.style.setProperty('--gnb-colw', Math.ceil(Math.max(tw, Math.min(sw, COLW), mw)) + 'px');
    });
  }
  /* 한 줄에 다 안 들어가면(글자 축소 없이) 전체 메뉴 버튼 방식으로 */
  function fit() {
    hd.classList.remove('gnb-fold');
    if (getComputedStyle(nav).display !== 'none') cols();
    if (getComputedStyle(nav).display === 'none') return;
    if (top.scrollWidth > nav.clientWidth + 1) { hd.classList.add('gnb-fold'); setOpen(false); }
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var rT; addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(function () { fit(); if (isOpen) measure(); }, 150); });

  /* ---- 전체 화면 패널(모바일·좁은 폭) ---- */
  var panel = el('div', 'gnb-panel'); panel.id = 'gnbPanel';
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', '전체 메뉴');
  panel.setAttribute('data-lenis-prevent', ''); panel.hidden = true;
  var ph = el('div', 'gnb-ph');
  var pm = el('span', 'gnb-pmark', 'DOD'); if (window.GNB_TAG) pm.appendChild(el('small', 'gnb-tag', window.GNB_TAG));
  ph.appendChild(pm);
  var close = el('button', 'gnb-close'); close.type = 'button'; close.setAttribute('aria-label', '전체 메뉴 닫기'); close.innerHTML = '<i></i><i></i>';
  ph.appendChild(close); panel.appendChild(ph);
  panel.appendChild(langs('gnb-plangs'));
  var acc = el('div', 'gnb-acc');
  MENU.forEach(function (g, i) {
    var sec = el('div', 'gnb-ag');
    var t = el('button', 'gnb-at'); t.type = 'button'; t.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    t.appendChild(el('span', '', g[0]));
    var n = 0; g[1].forEach(function (it) { n += typeof it === 'string' ? 1 : 1 + it[1].length; });
    t.appendChild(el('em', 'gnb-cnt', String(n)));
    var ul = list('gnb-asub', g[1], 2); ul.id = 'gnbA' + i; t.setAttribute('aria-controls', ul.id); ul.hidden = i !== 0;
    t.addEventListener('click', function () { var on = t.getAttribute('aria-expanded') !== 'true'; t.setAttribute('aria-expanded', on); ul.hidden = !on; });
    sec.appendChild(t); sec.appendChild(ul); acc.appendChild(sec);
  });
  panel.appendChild(acc);
  panel.appendChild(el('p', 'gnb-pnote', '초안은 메인페이지만 제공합니다. 상세 메뉴는 구성 확인용이며, ‘메인에서 보기’만 이 페이지의 해당 내용으로 이동합니다.'));
  var tel = el('a', 'gnb-tel', '전화 문의 02-6203-6263'); tel.href = 'tel:02-6203-6263'; panel.appendChild(tel);
  document.body.appendChild(panel);

  var lastFocus;
  function panelOpen(on) {
    [].forEach.call(document.body.children, function (c) { if (c !== panel && c !== note && c.tagName !== 'SCRIPT') { if (on) c.setAttribute('inert', ''); else c.removeAttribute('inert'); } });
    if (on) { lastFocus = document.activeElement; panel.hidden = false; requestAnimationFrame(function () { panel.classList.add('on'); }); document.documentElement.classList.add('gnb-lock'); close.focus(); }
    else { panel.classList.remove('on'); document.documentElement.classList.remove('gnb-lock'); setTimeout(function () { if (!panel.classList.contains('on')) panel.hidden = true; }, 320); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
    btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    var L = window.__gnbLenis && window.__gnbLenis(); if (L) on ? L.stop() : L.start();
  }
  btn.addEventListener('click', function () { panelOpen(true); });
  close.addEventListener('click', function () { panelOpen(false); });
  /* 패널 안 포커스 가두기 */
  panel.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = [].filter.call(panel.querySelectorAll('button,a[href]'), function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  /* ---- 안내 ---- */
  var desc = el('span', 'gnb-sr', '초안에서는 상세페이지로 이동하지 않고 안내만 표시합니다'); desc.id = 'gnbNoteDesc'; document.body.appendChild(desc);
  var note = el('div', 'gnb-note'); note.setAttribute('role', 'status'); note.setAttribute('aria-live', 'polite');
  document.body.appendChild(note);
  var noteT;
  function hideNote() { note.classList.remove('on'); }
  function say(name, rest) {
    note.innerHTML = '';
    note.appendChild(el('b', '', '‘' + name + '’'));
    note.appendChild(document.createTextNode(rest));
    note.classList.add('on'); clearTimeout(noteT); noteT = setTimeout(hideNote, 3600);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-gnb-note],[data-gnb-lang],[data-gnb-lang-cur]'); if (!b) return;
    if (b.hasAttribute('data-gnb-note')) say(b.getAttribute('data-gnb-note'), ' 상세페이지는 실제 제작 때 연결됩니다. 초안은 메인페이지만 제공합니다.');
    else if (b.hasAttribute('data-gnb-lang')) say(b.getAttribute('data-gnb-lang'), ' 페이지는 초안에서 제공하지 않습니다. 실제 제작 때 언어별 사이트로 연결됩니다.');
    else say('한국어', ' 페이지를 보고 계십니다.');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (note.classList.contains('on')) hideNote();
    if (!panel.hidden) { panelOpen(false); return; }
    if (isOpen) { var back = nav.contains(document.activeElement) || band.contains(document.activeElement) ? (lastTop || tops[0]) : null; setOpen(false); if (back) back.focus(); }
  });
  /* 패널 안 '메인에서 보기': 패널을 먼저 닫고(스크롤 잠금 해제) 각 안의 스크롤 처리기가 이어서 이동 */
  panel.addEventListener('click', function (e) { if (e.target.closest('.gnb-go')) { lastFocus = null; panelOpen(false); } }, true);
  /* 고정(핀) 장면이 아닌 목적지(window.GNB_OFF)는 고정 헤더 아래 16px에 도착하도록 직접 이동 */
  var OFF = window.GNB_OFF || [];
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.gnb-go'); if (!a) return;
    var to = a.getAttribute('href'); if (typeof OFF === 'function' ? !OFF(to) : OFF.indexOf(to) < 0) return;
    var t = document.querySelector(to); if (!t) return;
    e.preventDefault(); e.stopPropagation();
    if (!panel.hidden) { lastFocus = null; panelOpen(false); }
    setOpen(false);
    /* 가로 스크롤 상자 안의 목적지(안1 정적 rail 등)는 상자도 가로로 맞춤 */
    for (var p = t.parentElement; p && p !== document.body; p = p.parentElement) {
      if (p.scrollWidth > p.clientWidth + 1 && /(auto|scroll)/.test(getComputedStyle(p).overflowX)) {
        p.scrollLeft += t.getBoundingClientRect().left - p.getBoundingClientRect().left - (parseFloat(getComputedStyle(p).paddingLeft) || 0);
        break;
      }
    }
    var y = t.getBoundingClientRect().top + scrollY - (hd.getBoundingClientRect().bottom + 16);
    var L = window.__gnbLenis && window.__gnbLenis();
    if (L) L.scrollTo(Math.max(0, y), { duration: 1.4 }); else scrollTo({ top: Math.max(0, y), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, true);
})();
