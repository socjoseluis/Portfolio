const header = document.querySelector('.site-header');
let lastY = window.scrollY;

function syncHeaderOffset() {
  if (!header) return;
  document.documentElement.style.setProperty('--header-offset', `${header.offsetHeight}px`);
}

window.addEventListener('resize', syncHeaderOffset);
syncHeaderOffset();


window.addEventListener(
  'scroll',
  () => {
    if (!header) return;

    const y = window.scrollY;
    const goingDown = y > lastY;
    const delta = Math.abs(y - lastY);

    if (y < 24) {
      header.classList.remove('is-hidden');
    } else if (goingDown && delta > 6) {
      if (!header.contains(document.activeElement)) header.classList.add('is-hidden');
    } else if (!goingDown) {
      header.classList.remove('is-hidden');
    }


    lastY = y;
  },
  { passive: true }
);
window.addEventListener(
  'wheel',
  (e) => {
    if (!header) return;

    if (e.deltaY < -8) header.classList.remove('is-hidden');
    else if (e.deltaY > 12 && window.scrollY > 24)
      header.classList.add('is-hidden');
  },
  { passive: true }
);

const navLinks = Array.from(
  document.querySelectorAll("header nav a[href^='#']")
);
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

for (const a of navLinks) {
  a.addEventListener('click', () => {
    if (!header) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    header.classList.toggle('is-hidden', targetTop > window.scrollY);
  });
}


function setActiveLink(id) {
  for (const a of navLinks)
    a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
}

function updateActiveLink() {
  const offset = header?.classList.contains('is-hidden')
    ? 0
    : header?.offsetHeight ?? 0;

  let activeId = null;
  for (const section of sections) {
    const top = section.getBoundingClientRect().top;
    const activationLine = offset + 24;
    if (top <= activationLine) activeId = section.id;
  }
  setActiveLink(activeId);
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
