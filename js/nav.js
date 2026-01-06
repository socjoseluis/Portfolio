export function initNav(header) {
  const navLinks = Array.from(
    document.querySelectorAll("header nav a[href^='#']")
  );

  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) return;

  const navToggle = document.querySelector('header nav .nav-toggle');
  const navList = document.getElementById('nav-links');

  let setExpanded = null;

  if (navToggle && navList) {
    setExpanded = (expanded) => {
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (expanded) header?.classList.remove('is-hidden');
    };

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (navToggle.getAttribute('aria-expanded') !== 'true') return;
      setExpanded(false);
      navToggle.focus();
    });

    document.addEventListener('click', (e) => {
      if (navToggle.getAttribute('aria-expanded') !== 'true') return;

      const target = e.target;
      if (!(target instanceof Node)) return;
      if (header.contains(target)) return;

      setExpanded(false);
    });
  }

  for (const a of navLinks) {
    a.addEventListener('click', () => {
      setExpanded?.(false);
      header?.classList.remove('is-hidden');
    });
  }

  function setActiveLink(id) {
    for (const a of navLinks) {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
    }
  }

  function updateActiveLink() {
    const offset = header?.classList.contains('is-hidden')
      ? 0
      : header?.offsetHeight ?? 0;

    const activationLine = offset + 24;

    let activeId = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationLine) {
        activeId = section.id;
      }
    }

    setActiveLink(activeId);
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}
