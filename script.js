/* =====================================================================
   PORTFOLIO SCRIPT
   - Terminal boot typing effect
   - Mobile nav toggle
   - Smooth-scroll active link highlighting
   - Scroll-triggered reveals
   - Animated counters + skill bars
   - Skill icon injection (inline SVG masks)
   - Contact form validation (client-side, no backend)
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initNavToggle();
  initSmoothNavClose();
  initSkillIcons();
  initTerminal();
  initScrollReveal();
  initContactForm();
});

/* ---------------------------------------------------------------------
   Footer year
--------------------------------------------------------------------- */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------------
   Mobile nav
--------------------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initSmoothNavClose() {
  const links = document.getElementById('navLinks');
  const toggle = document.getElementById('navToggle');
  if (!links) return;

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------------------
   Skill icons — inline SVG data URIs as CSS mask images
   (keeps the project dependency-free: no icon font, no external requests)
--------------------------------------------------------------------- */
function initSkillIcons() {
  const icons = {
    linux: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c-1.1 0-2 1.3-2 3 0 1.1.4 2 .9 2.7-.6.4-1.4 1-2 1.8-1.2 1.5-2.1 3.6-1.7 5.6.1.6-.1 1-.4 1.4-.5.6-.8 1.3-.6 2 .2.8 1 1.2 1.8 1.3.5 1 1.5 1.7 2.7 1.9.6.5 1.4.8 2.3.8s1.7-.3 2.3-.8c1.2-.2 2.2-.9 2.7-1.9.8-.1 1.6-.5 1.8-1.3.2-.7-.1-1.4-.6-2-.3-.4-.5-.8-.4-1.4.4-2-.5-4.1-1.7-5.6-.6-.8-1.4-1.4-2-1.8.5-.7.9-1.6.9-2.7 0-1.7-.9-3-2-3-.5 0-1 .3-1.3.7-.3-.4-.7-.7-1.2-.7zm-1.5 9.5c.4 0 .8.4.8.9s-.4.9-.8.9-.8-.4-.8-.9.4-.9.8-.9zm3 0c.4 0 .8.4.8.9s-.4.9-.8.9-.8-.4-.8-.9.4-.9.8-.9z"/></svg>',
    docker: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.8 9.5c-.1-.1-.9-.7-2.7-.7-.5 0-.9 0-1.4.1-.3-2.4-2.3-3.6-2.4-3.7l-.5-.3-.3.5c-.4.6-.7 1.4-.8 2.1-.1.6 0 1.2.2 1.7-.4.2-1.1.5-2.1.5H2.1l-.1.4c-.1 1.7.1 3.4 1 4.9.9 1.6 2.3 2.5 4.1 2.5 3.6 0 6.6-1.7 8-5.3 1 0 2.1-.3 2.6-1.2.1-.2.4-.7.2-.9zM5 11.6h1.7v-1.7H5v1.7zm2.4 0h1.7v-1.7H7.4v1.7zm2.4 0h1.7v-1.7H9.8v1.7zm2.4 0h1.7v-1.7h-1.7v1.7zM7.4 9.3h1.7V7.6H7.4v1.7zm2.4 0h1.7V7.6H9.8v1.7zm2.4 0h1.7V7.6h-1.7v1.7zm0-2.3h1.7V5.3h-1.7V7z"/></svg>',
    k8s: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l1.5 1.1 6.4 2.3.9 1.7 1.1 6.7-1 1.6-4.8 5-1.9.6-6.4-.1-1.9-.7-4.6-5.2-.9-1.6 1.4-6.7.9-1.6 6.4-2.2L12 2zm0 2.4L7 6.1l-1.1 5.4 3.7 4.1h4.8l3.7-4.1L17 6.1 12 4.4zm0 3.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z"/></svg>',
    terraform: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3.7l6.4 3.7v7.4L3 11.1V3.7zm7.4 3.7l6.4-3.7v7.4l-6.4 3.7V7.4zM17.8 8l3.2 1.9v7.4L17.8 15.4V8zM10.4 15.5l6.4 3.7v-7.4l-6.4 3.7zM3 19.2l6.4 3.7v-7.4L3 11.8v7.4z"/></svg>',
    aws: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.8 11.3c0 .3 0 .5.1.6.1.1.2.3.4.4.1 0 .1.1.1.2s0 .1-.1.2l-.4.3h-.2c-.1 0-.2 0-.2-.1l-.3-.3c-.1-.1-.2-.3-.2-.4-.5.6-1.2.9-1.9.9-.6 0-1-.2-1.3-.5-.3-.3-.5-.8-.5-1.3 0-.6.2-1.1.6-1.4.4-.4 1-.5 1.7-.5.2 0 .5 0 .7.1.3 0 .5.1.8.1v-.5c0-.5-.1-.8-.3-1-.2-.2-.6-.3-1.1-.3-.2 0-.5 0-.7.1-.2 0-.5.1-.7.2-.1 0-.2.1-.2.1h-.1c-.1 0-.2-.1-.2-.2v-.4c0-.1 0-.2.1-.3 0 0 .1-.1.2-.1.2-.1.5-.2.8-.3.3-.1.7-.1 1.1-.1.8 0 1.4.2 1.8.6.4.4.6.9.6 1.6v2.1zm-2.6 1c.2 0 .5-.1.7-.2.2-.1.4-.3.5-.5.1-.1.1-.3.2-.5 0-.2 0-.4 0-.6v-.3c-.2-.1-.4-.1-.6-.1-.2 0-.4 0-.6 0-.5 0-.8.1-1 .3-.2.2-.3.4-.3.8 0 .3.1.5.2.7.2.2.5.4.9.4zm5.3.6c-.1 0-.2 0-.3-.1-.1-.1-.1-.1-.1-.3v-6.6c0-.1 0-.2.1-.3.1-.1.2-.1.3-.1h.5c.1 0 .2 0 .3.1.1.1.1.1.1.3v.6c.2-.4.5-.6.8-.8.3-.2.7-.3 1.1-.3.8 0 1.4.3 1.8.8.4.5.6 1.3.6 2.2 0 .9-.2 1.7-.7 2.3-.4.6-1 .9-1.8.9-.4 0-.7-.1-1-.2-.3-.1-.5-.3-.8-.6v2.5c0 .1 0 .2-.1.3-.1.1-.2.1-.3.1h-.6zm1.6-3.4c.5 0 .9-.2 1.1-.6.3-.4.4-.9.4-1.5 0-.6-.1-1.1-.4-1.4-.2-.3-.6-.5-1.1-.5-.2 0-.5.1-.7.2-.2.1-.4.3-.6.5v2.7c.1.2.3.3.5.4.2.1.5.2.8.2zm6.5 1.5l-2-6.4c0-.1 0-.2 0-.2 0-.1.1-.2.2-.2h.6c.1 0 .2 0 .3.1.1 0 .1.1.1.2l1.4 5.4 1.3-5.4c0-.1.1-.2.1-.2.1-.1.2-.1.3-.1h.5c.1 0 .2 0 .3.1.1 0 .1.1.1.2l1.3 5.5 1.4-5.5c0-.1.1-.2.1-.2.1-.1.2-.1.3-.1h.6c.1 0 .2 0 .2.1 0 0 .1.1 0 .2v.1l-2 6.4c0 .1-.1.2-.1.2-.1.1-.2.1-.3.1h-.6c-.1 0-.2 0-.3-.1-.1 0-.1-.1-.1-.2l-1.3-5.3-1.3 5.3c0 .1-.1.2-.1.2-.1.1-.2.1-.3.1h-.6c-.1 0-.2-.1-.3-.2z"/></svg>',
    actions: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.5 3.8 8.7 9 12 5.2-3.3 9-6.5 9-12V5l-9-4zm0 2.2l7 3.1v4.7c0 4.2-2.8 6.9-7 9.7-4.2-2.8-7-5.5-7-9.7V6.3l7-3.1zm-1 5.3v3h-2v2h2v3h2v-3h2v-2h-2v-3h-2z"/></svg>'
  };

  document.querySelectorAll('.skill__icon').forEach((el) => {
    const key = el.getAttribute('data-icon');
    const svg = icons[key];
    if (!svg) return;
    const encoded = 'data:image/svg+xml;base64,' + btoa(svg);
    el.style.webkitMaskImage = `url("${encoded}")`;
    el.style.maskImage = `url("${encoded}")`;
  });
}

/* ---------------------------------------------------------------------
   Terminal boot sequence — types out a fake `whoami` / cat session
--------------------------------------------------------------------- */
function initTerminal() {
  const output = document.getElementById('terminalOutput');
  const cursor = document.getElementById('terminalCursor');
  if (!output) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { type: 'cmd', prompt: 'cibistha@devbox', path: '~', text: 'whoami' },
    { type: 'out', text: 'm-v-cibistha · cse student · cloud & devops track' },
    { type: 'cmd', prompt: 'cibistha@devbox', path: '~', text: 'cat focus.txt' },
    { type: 'out', text: 'building reliable infra, one terraform apply at a time.' },
    { type: 'cmd', prompt: 'cibistha@devbox', path: '~', text: 'aws sts get-caller-identity' },
    { type: 'out', text: '{ "Account": "fresher-grade", "Status": "ready" }' },
    { type: 'cmd', prompt: 'cibistha@devbox', path: '~', text: './apply.sh --target=internship' },
    { type: 'okline', text: '✓ plan: 1 to add, 0 to change, 0 to destroy' },
  ];

  if (prefersReducedMotion) {
    // Render instantly, no animation, respecting reduced motion preference
    output.innerHTML = lines.map(renderLineHTML).join('\n');
    if (cursor) cursor.style.display = 'none';
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let renderedHTML = '';

  function typeNext() {
    if (lineIndex >= lines.length) {
      // small pause, then loop back to start for ambient life
      setTimeout(() => {
        lineIndex = 0;
        charIndex = 0;
        renderedHTML = '';
        output.innerHTML = '';
        typeNext();
      }, 3200);
      return;
    }

    const line = lines[lineIndex];
    const fullText = lineTextFor(line);

    if (charIndex === 0 && line.type === 'cmd') {
      // prefix prompt immediately, then type the command text
    }

    charIndex++;
    const partial = fullText.slice(0, charIndex);
    const isDone = charIndex >= fullText.length;

    const linesSoFar = lines.slice(0, lineIndex).map(renderLineHTML).join('\n');
    const currentLineHTML = renderPartialLineHTML(line, partial);

    output.innerHTML = linesSoFar + (linesSoFar ? '\n' : '') + currentLineHTML;

    const speed = line.type === 'cmd' ? 38 : 12;

    if (!isDone) {
      setTimeout(typeNext, speed);
    } else {
      lineIndex++;
      charIndex = 0;
      const pause = line.type === 'cmd' ? 220 : 480;
      setTimeout(typeNext, pause);
    }
  }

  function lineTextFor(line) {
    return line.type === 'cmd' ? line.text : line.text;
  }

  function renderPartialLineHTML(line, partial) {
    if (line.type === 'cmd') {
      return `<span class="prompt">${line.prompt}</span> <span class="path">${line.path}</span> $ <span class="cmd">${escapeHTML(partial)}</span>`;
    }
    if (line.type === 'okline') {
      return `<span class="ok">${escapeHTML(partial)}</span>`;
    }
    return `<span class="out-val">${escapeHTML(partial)}</span>`;
  }

  function renderLineHTML(line) {
    return renderPartialLineHTML(line, lineTextFor(line));
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  typeNext();
}

/* ---------------------------------------------------------------------
   Scroll reveal (IntersectionObserver) for sections, cards, skill rows
   Also triggers counters + skill bar widths when skills section appears.
--------------------------------------------------------------------- */
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    '.about__text, .about__manifest, .project-card, .contact__form, .contact__side, .skills__table'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Counters
  const counters = document.querySelectorAll('.stat__value');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  // Skill bars
  const skillsTable = document.querySelector('.skills__table');
  if (skillsTable) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBars();
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    skillObserver.observe(skillsTable);
  }
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10) || 0;
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(tick);
}

function animateSkillBars() {
  document.querySelectorAll('.skills__row[data-level]').forEach((row) => {
    const level = row.getAttribute('data-level');
    const bar = row.querySelector('.skill__bar');
    if (bar) {
      requestAnimationFrame(() => {
        bar.style.width = level + '%';
      });
    }
  });
}

/* ---------------------------------------------------------------------
   Contact form — client-side only validation + simulated send
   (no backend wired up; replace handleSubmit's fake delay with a real
   fetch() call to your endpoint or form service when ready)
--------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const responseEl = document.getElementById('formResponse');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, nameError, 'name is required');
      valid = false;
    }

    if (!emailInput.value.trim()) {
      setError(emailInput, emailError, 'email is required');
      valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      setError(emailInput, emailError, 'enter a valid email');
      valid = false;
    }

    if (!messageInput.value.trim()) {
      setError(messageInput, messageError, 'message is required');
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, messageError, 'message is too short');
      valid = false;
    }

    if (!valid) {
      responseEl.textContent = '✗ fix the fields above and try again';
      responseEl.classList.add('is-error');
      return;
    }

    submitFakeRequest();
  });

  function setError(input, errorEl, msg) {
    input.classList.add('is-error');
    errorEl.textContent = msg;
  }

  function clearErrors() {
    [nameInput, emailInput, messageInput].forEach((i) => i.classList.remove('is-error'));
    [nameError, emailError, messageError].forEach((e) => (e.textContent = ''));
    responseEl.textContent = '';
    responseEl.classList.remove('is-error');
  }

  function submitFakeRequest() {
    submitBtn.disabled = true;
    submitText.textContent = 'sending...';
    responseEl.classList.remove('is-error');
    responseEl.textContent = '$ POST /contact';

    // Simulated network delay — swap this block for a real fetch() call
    // to your form backend (e.g. Formspree, a Lambda endpoint, etc.)
    setTimeout(() => {
      submitText.textContent = 'Send message';
      submitBtn.disabled = false;
      responseEl.textContent = '✓ 200 OK — message received, I\u2019ll reply within 24h';
      form.reset();
    }, 1100);
  }
}
