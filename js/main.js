const header = document.querySelector('.site-header');
let lastY = window.scrollY;

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
      header.classList.add('is-hidden');
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
