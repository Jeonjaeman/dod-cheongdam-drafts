/* DOD 공통: srcset 이미지의 sizes를 실제 cover 렌더 폭으로 맞춤
 * 세로로 긴 상자에 가로 사진을 cover로 넣으면 실제 그려지는 폭이 상자 폭보다 큼 →
 * sizes를 그 폭(px)으로 주어야 브라우저가 고해상도 후보(2880w)를 고름. 레이아웃 크기 기준(transform 무시). */
(function () {
  function fit() {
    document.querySelectorAll('img[srcset]').forEach(function (im) {
      var w = im.offsetWidth, h = im.offsetHeight; if (!w || !h) return;
      var nw = +im.getAttribute('width') || im.naturalWidth, nh = +im.getAttribute('height') || im.naturalHeight;
      var rw = w;
      if (nw && nh && getComputedStyle(im).objectFit === 'cover') rw = Math.max(w, h * nw / nh);
      var s = Math.ceil(rw) + 'px'; if (im.getAttribute('sizes') !== s) im.setAttribute('sizes', s);
    });
  }
  var t; function later() { clearTimeout(t); t = setTimeout(fit, 150); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fit); else fit();
  addEventListener('load', fit); addEventListener('resize', later);
})();
