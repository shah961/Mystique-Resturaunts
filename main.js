/**
 * MYSTIQUE RESTAURANTS LAHORE - CORE JS ARCHITECTURE
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initMenuTabs();
  initFormValidation();
  initThreeJSBackground();
});

/* Mobile Navigation Controller */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  if (!hamburgerBtn || !mobileOverlay) return;

  function openMenu() {
    mobileOverlay.classList.add('is-active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('body-lock-scroll');
  }

  function closeMenu() {
    mobileOverlay.classList.remove('is-active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('body-lock-scroll');
  }

  hamburgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMenu();
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/* Menu Page Category Filter Tabs */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('#menu-items-container .menu-item-card');

  if (!tabBtns.length || !menuCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const category = btn.dataset.category;

      menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Form Validation & Static Submission Notice */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = [
      { id: 'full-name', errorId: 'name-error', check: val => val.trim().length > 1 },
      { id: 'phone-number', errorId: 'phone-error', check: val => val.trim().length >= 7 },
      { id: 'email-address', errorId: 'email-error', check: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
      { id: 'pref-date', errorId: 'date-error', check: val => val !== '' },
      { id: 'pref-time', errorId: 'time-error', check: val => val !== '' },
      { id: 'guests-count', errorId: 'guests-error', check: val => parseInt(val) > 0 }
    ];

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const group = input ? input.closest('.form-group') : null;

      if (input && group) {
        if (!field.check(input.value)) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      }
    });

    if (isValid) {
      feedback.className = 'form-feedback-notice success';
      feedback.innerHTML = `<strong>Inquiry Received!</strong><br>Thank you. Your reservation inquiry has been prepared. Please note this static demonstration website requires direct backend integration. For immediate confirmed table reservations, please call Mystique directly at <strong>+92 306 9047766</strong>.`;
      form.reset();
    }
  });
}

/* Lightweight WebGL Ambient Background Effect */
function initThreeJSBackground() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Gracefully disable on reduced motion preferences or low power
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) {
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const count = 120;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xc5a059,
    size: 0.03,
    transparent: true,
    opacity: 0.35
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  camera.position.z = 5;

  let reqId;
  function animate() {
    reqId = requestAnimationFrame(animate);
    points.rotation.y += 0.0008;
    points.rotation.x += 0.0004;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
