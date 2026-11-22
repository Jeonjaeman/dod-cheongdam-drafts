/* DOD 공통: 캔버스 프레임 스크럽
 * new FrameScrub(canvas, { base:'../_media/s1/pc/', count:96, ext:'webp', focusX:.5, focusY:.5 })
 *   .progress(p)  // 0..1, rAF당 1회 그림
 * - 첫 프레임 + 8장 간격 키프레임만 먼저, 나머지(4·2·1 간격)는 페이지 load 뒤 또는 스크롤 시작 시 로드
 * - 아직 안 온 프레임은 가장 가까운 로드된 프레임으로 대체(빈 화면·깜빡임 없음)
 * - cover 맞춤, DPR 최대 2
 */
(function (g) {
  class FrameScrub {
    constructor(canvas, o) {
      this.c = canvas; this.ctx = canvas.getContext('2d', { alpha: false });
      this.o = Object.assign({ ext: 'webp', focusX: .5, focusY: .5, pad: 3, zoom: 1 }, o);
      this.n = this.o.count; this.img = new Array(this.n); this.ok = new Uint8Array(this.n);
      this.p = 0; this.drawn = -1; this.dirty = true;
      this._resize = this.resize.bind(this); addEventListener('resize', this._resize); this.resize();
      this.load();
      const tick = () => { if (this.dirty) this.draw(); this.raf = requestAnimationFrame(tick); };
      this.raf = requestAnimationFrame(tick);
    }
    url(i) { return this.o.base + String(i + 1).padStart(this.o.pad, '0') + '.' + this.o.ext; }
    load() {
      // 1단계: 첫 프레임 + 8장 간격 키프레임(첫 화면 로드를 막지 않을 만큼만)
      // 2단계: 나머지는 페이지 load 이후, 또는 사용자가 스크롤을 시작하면 바로
      const first = [0]; const seen = new Set(first);
      for (let i = 0; i < this.n; i += 8) if (!seen.has(i)) { seen.add(i); first.push(i); }
      const rest = [];
      for (const step of [4, 2, 1]) for (let i = 0; i < this.n; i += step) if (!seen.has(i)) { seen.add(i); rest.push(i); }
      const order = first.slice(); let k = 0, active = 0; const par = 6;
      const next = () => {
        if (k >= order.length) return; const i = order[k++]; active++;
        const im = new Image(); im.decoding = 'async';
        const done = () => { active--; next(); };
        im.onload = () => { (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).then(() => { this.img[i] = im; this.ok[i] = 1; this.dirty = true; if (i === 0 && this.o.onFirst) this.o.onFirst(); done(); }); };
        im.onerror = done; im.src = this.url(i);
      };
      const pump = () => { while (active < par && k < order.length) next(); };
      this._more = () => { if (!rest.length) return; order.push(...rest.splice(0)); pump(); };
      if (document.readyState === 'complete') setTimeout(this._more, 300);
      else addEventListener('load', () => setTimeout(this._more, 300), { once: true });
      pump();
    }
    resize() {
      const r = this.c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      this.c.width = Math.max(1, Math.round(r.width * d)); this.c.height = Math.max(1, Math.round(r.height * d));
      this.dirty = true; this.drawn = -1;
    }
    progress(p) { this.p = Math.min(1, Math.max(0, p)); this.dirty = true; if (this.p > 0 && this._more) this._more(); }
    nearest(t) { if (this.ok[t]) return t; for (let d = 1; d < this.n; d++) { if (t - d >= 0 && this.ok[t - d]) return t - d; if (t + d < this.n && this.ok[t + d]) return t + d; } return -1; }
    draw() {
      this.dirty = false;
      const t = Math.round(this.p * (this.n - 1)), i = this.nearest(t);
      if (i < 0) { this.dirty = true; return; }
      if (i !== t) this.dirty = true; // 더 가까운 프레임이 오면 다시 그림
      if (i === this.drawn) return; this.drawn = i;
      const im = this.img[i], W = this.c.width, H = this.c.height;
      const s = Math.max(W / im.naturalWidth, H / im.naturalHeight) * this.o.zoom;
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      this.ctx.drawImage(im, (W - w) * this.o.focusX, (H - h) * this.o.focusY, w, h);
    }
    destroy() { cancelAnimationFrame(this.raf); removeEventListener('resize', this._resize); }
  }
  g.FrameScrub = FrameScrub;
})(window);
