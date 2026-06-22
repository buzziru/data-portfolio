// Reveal-on-scroll animation + section-number fade-in.
// Ported from the original inline <script>; loaded once via BaseLayout.

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        const sec = e.target.closest('section');
        sec?.querySelector('.sec-num')?.classList.add('show');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Reveal a section's number as soon as the section itself enters view.
const secObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelector('.sec-num')?.classList.add('show');
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll('section').forEach((s) => secObserver.observe(s));
