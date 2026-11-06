// Highlight the nav link of the section currently in view
const links = document.querySelectorAll('.nav__link');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => s && observer.observe(s));

// Contact form: opens the visitor's email app with the message pre-filled
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    status.textContent = 'Please fill in all fields with a valid email.';
    return;
  }

  const subject = encodeURIComponent('Portfolio inquiry from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = 'mailto:fritzcarreon@gmail.com?subject=' + subject + '&body=' + body;
  status.textContent = 'Opening your email app…';
  form.reset();
});
