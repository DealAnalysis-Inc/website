document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  var rv = document.querySelectorAll('.rv');
  rv.forEach(function (el) {
    var sibs = Array.prototype.slice.call(el.parentElement.children)
      .filter(function (c) { return c.classList.contains('rv'); });
    if (sibs.length > 1) el.style.transitionDelay = (sibs.indexOf(el) * 0.06) + 's';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle('in', e.isIntersecting); });
  }, { threshold: 0 });
  rv.forEach(function (el) { io.observe(el); });

  // mobile menu toggle
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', links.classList.toggle('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }
});
