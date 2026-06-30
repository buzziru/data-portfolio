const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav.top-nav a'));

// On project detail pages, always highlight the projects link.
if (window.location.pathname.startsWith('/projects/')) {
  navLinks.find(l => l.getAttribute('href') === '/#projects')?.classList.add('active');
} else {
  const sectionIds = ['summary', 'strengths', 'projects', 'skills', 'timeline', 'contact'];

  function updateActive() {
    // A section becomes active when its top crosses 30% down from the viewport top.
    const threshold = window.scrollY + window.innerHeight * 0.3;
    let activeId = '';
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= threshold) activeId = id;
    }
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `/#${activeId}`);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}
