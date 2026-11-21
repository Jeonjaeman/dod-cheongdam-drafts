/* B01 — 단일 반투명 유리 렌즈 (three.js)
 * 명세: 0.08rad/s 자전, 포인터 ±0.08rad, 첫 1.5 viewport 스크롤 연동 0→0.7rad(고정 스크롤 없음),
 * DPR 최대 1.5(모바일 1.25), 화면 밖 렌더 중지, WebGL 실패 시 동일 장면 포스터.
 */
const hero = document.getElementById('B01');
const canvas = document.getElementById('lens');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 767px)').matches;

function fallback() { hero.classList.add('no-webgl'); }

function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch (e) { return false; }
}

async function init() {
  if (!hasWebGL()) return fallback();
  let THREE;
  try {
    THREE = await import('three');
  } catch (e) { return fallback(); }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return fallback(); }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // 렌즈: 다면 유리 구체를 납작하게 — 비유기적 기하
  const group = new THREE.Group();
  scene.add(group);
  const geo = new THREE.IcosahedronGeometry(1.55, 1);
  geo.scale(1, 1, 0.78);
  // 유리 질감: 투과(transmission) 대신 프레넬 셰이더 — GPU 편차 없이 같은 장면, 모바일 비용 낮음
  const glassShader = (side, strength) => new THREE.ShaderMaterial({
    side, transparent: true, depthWrite: false,
    uniforms: {
      uBase: { value: new THREE.Color('#0f3a36') },
      uRim: { value: new THREE.Color('#a8e4ce') },
      uLight: { value: new THREE.Vector3(0.45, 0.7, 0.55).normalize() },
      uStrength: { value: strength },
    },
    vertexShader: `
      varying vec3 vViewPos;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vViewPos = mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform vec3 uBase; uniform vec3 uRim; uniform vec3 uLight; uniform float uStrength;
      varying vec3 vViewPos;
      void main(){
        vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));   // 면 단위 법선 → 다면체 커팅
        vec3 v = normalize(-vViewPos);
        if (!gl_FrontFacing) n = -n;
        float fres = pow(1.0 - clamp(abs(dot(n, v)), 0.0, 1.0), 2.4);
        float diff = clamp(dot(n, uLight), 0.0, 1.0);
        float spec = pow(clamp(dot(reflect(-uLight, n), v), 0.0, 1.0), 28.0);
        vec3 col = uBase * (0.35 + 0.65 * diff) + uRim * (fres * 1.1 + diff * 0.18) + vec3(1.0) * spec * 0.9;
        float a = (0.22 + fres * 0.7 + diff * 0.22 + spec * 0.8) * uStrength;
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
      }`,
  });
  const back = new THREE.Mesh(geo, glassShader(THREE.BackSide, 0.55));
  const lens = new THREE.Mesh(geo, glassShader(THREE.FrontSide, 1.0));
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 1),
    new THREE.LineBasicMaterial({ color: 0xd9f5ea, transparent: true, opacity: 0.22 })
  );
  lens.add(edges);
  group.add(back, lens);
  back.renderOrder = 1; lens.renderOrder = 2;

  // 렌즈 뒤 좌표 그리드 — 굴절이 보이도록 하는 배경 선(장식)
  const grid = new THREE.GridHelper(14, 28, 0x2f6b60, 0x173a36);
  grid.rotation.x = Math.PI / 2; grid.position.z = -3.2;
  grid.material.transparent = true; grid.material.opacity = 0.55;
  scene.add(grid);

  // 가는 테두리 링 — 정밀함의 선
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.05, 0.006, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0xa8e4ce, transparent: true, opacity: 0.55 })
  );
  ring.rotation.x = Math.PI * 0.5;
  group.add(ring);

  // 바닥 카우스틱 빛 — 방사형 텍스처 평면
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(168,228,206,0.38)'); grad.addColorStop(0.45, 'rgba(95,211,176,0.18)'); grad.addColorStop(1, 'rgba(8,23,26,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.rotation.x = -Math.PI / 2; glow.position.y = -1.9;
  scene.add(glow);


  // 배치: .lens-slot(PC 우측 / 모바일 텍스트 사이 42svh) 중심에 렌즈를 맞춘다
  const slot = hero.querySelector('.lens-slot');
  function layout() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const visW = visH * camera.aspect;
    const hr = hero.getBoundingClientRect(), sr = slot.getBoundingClientRect();
    const cx = sr.left - hr.left + sr.width / 2, cy = sr.top - hr.top + sr.height / 2;
    group.position.set((cx / w - 0.5) * visW, (0.5 - cy / h) * visH, 0);
    const slotWorld = Math.min(sr.width / w * visW, sr.height / h * visH);
    group.scale.setScalar(Math.min(1.15, (slotWorld * 0.82) / 4.2));
    glow.position.x = group.position.x;
    glow.position.y = group.position.y - 1.9 * group.scale.x;
  }
  layout();
  window.addEventListener('resize', layout);
  if (document.fonts) document.fonts.ready.then(layout);

  // 포인터 ±0.08rad (마우스 없어도 정보 동일)
  let px = 0, py = 0, tx = 0, ty = 0;
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      tx = ((e.clientX / window.innerWidth) * 2 - 1) * 0.08;
      ty = ((e.clientY / window.innerHeight) * 2 - 1) * 0.08;
    }, { passive: true });
  }

  // 스크롤 연동 0→0.7rad (첫 1.5 viewport)
  let scrollRot = 0;
  const onScroll = () => { scrollRot = Math.min(1, window.scrollY / (window.innerHeight * 1.5)) * 0.7; };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // 화면 밖·탭 숨김 시 렌더 중지
  let visible = true, running = false;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });

  const clock = new THREE.Clock();
  let spin = 0;
  function frame() {
    if (!visible || document.hidden) { running = false; return; }
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!reduce) spin += 0.08 * dt;
    px += (tx - px) * 0.06; py += (ty - py) * 0.06;
    group.rotation.y = spin + scrollRot + px;
    group.rotation.x = 0.18 + py;
    lens.rotation.z = back.rotation.z = spin * 0.35;
    renderer.render(scene, camera);
    if (reduce) { running = false; return; } // 정지 장면 1회 렌더
    requestAnimationFrame(frame);
  }
  function start() { if (running) return; running = true; clock.getDelta(); requestAnimationFrame(frame); }
  start();

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); fallback(); });
  hero.classList.add('webgl-on');
}

init().catch(fallback);
