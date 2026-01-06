export function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return null;

  let lastY = window.scrollY;

  function syncHeaderOffset() {
    document.documentElement.style.setProperty(
      '--header-offset',
      `${header.offsetHeight}px`
    );
  }

  window.addEventListener('resize', syncHeaderOffset);
  syncHeaderOffset();

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      const delta = Math.abs(y - lastY);

      if (y < 24) {
        header.classList.remove('is-hidden');
      } else if (goingDown && delta > 6) {
        if (!header.contains(document.activeElement))
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
      if (e.deltaY < -8) header.classList.remove('is-hidden');
      else if (e.deltaY > 12 && window.scrollY > 24)
        header.classList.add('is-hidden');
    },
    { passive: true }
  );

  return header;
}
